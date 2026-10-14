import http from 'node:http';
import { pathToFileURL } from 'node:url';
import { handle } from './lead.js';

export function crearServidor(env = process.env, deps = {}) {
  const server = http.createServer(async (req, res) => {
    try {
      const chunks = [];
      let size = 0;
      for await (const chunk of req) {
        size += chunk.length;
        if (size > 20000) {
          res.writeHead(413, { 'Content-Type': 'application/json', Connection: 'close' });
          res.end(JSON.stringify({ ok: false, detail: 'Solicitud demasiado grande' }));
          return;
        }
        chunks.push(chunk);
      }
      const request = new Request(`http://${req.headers.host || 'localhost'}${req.url}`, {
        method: req.method, headers: req.headers,
        body: ['GET', 'HEAD'].includes(req.method) ? undefined : Buffer.concat(chunks),
      });
      const result = await handle(request, env, deps);
      res.writeHead(result.status, Object.fromEntries(result.headers));
      res.end(Buffer.from(await result.arrayBuffer()));
    } catch {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, detail: 'No se pudo registrar la solicitud' }));
    }
  });
  server.requestTimeout = 35000;
  server.headersTimeout = 10000;
  return server;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const server = crearServidor();
  server.listen(3001, '127.0.0.1', () => console.log('GWM: receptor de consultas iniciado'));
  for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(() => process.exit(0)));
}
