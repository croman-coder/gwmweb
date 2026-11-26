/**
 * Content-Security-Policy del sitio, generada en cada build.
 *
 * Los scripts inline (hoy uno: la clase `vista-ficha` que evita el parpadeo de la landing) no se permiten
 * con 'unsafe-inline': se calcula el hash SHA-256 de cada uno al construir, así que si ese script cambia la
 * política se actualiza sola y no queda una versión vieja bloqueando la página.
 *
 * El resultado es dist/nginx-csp.inc (una línea `add_header`), que el Dockerfile instala como
 * /etc/nginx/conf.d/csp.inc y que nginx-seguridad.inc incluye en todos los `location`.
 */
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

function listarHtml(carpeta) {
  return readdirSync(carpeta, { withFileTypes: true }).flatMap((e) => {
    const ruta = join(carpeta, e.name);
    if (e.isDirectory()) return listarHtml(ruta);
    return e.name.endsWith(".html") ? [ruta] : [];
  });
}

/** Hashes (`'sha256-…'`) de los scripts inline ejecutables de todas las páginas, sin repetidos. */
export function hashesDeScriptsInline(carpeta) {
  const hashes = new Set();
  for (const archivo of listarHtml(carpeta)) {
    const html = readFileSync(archivo, "utf8");
    for (const [, atributos, cuerpo] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
      if (/\bsrc\s*=/.test(atributos)) continue; // script externo: lo cubre 'self'
      if (/type\s*=\s*["']application\/ld\+json["']/i.test(atributos)) continue; // datos, no se ejecuta
      hashes.add(`'sha256-${createHash("sha256").update(cuerpo).digest("base64")}'`);
    }
  }
  return [...hashes].sort();
}

/** Google Analytics solo se carga con consentimiento y con VITE_GA_ID (src/js/medicion.js). */
const GA_SCRIPT = "https://www.googletagmanager.com";
const GA_RED = "https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com";

export function construirCsp(hashes) {
  return [
    "default-src 'self'",
    // 'wasm-unsafe-eval': el decodificador Draco del visor 3D es WebAssembly (no habilita eval de JS).
    `script-src 'self' 'wasm-unsafe-eval' ${hashes.join(" ")} ${GA_SCRIPT}`.replace(/\s+/g, " "),
    // Los atributos style="…" del marcado y de los componentes necesitan 'unsafe-inline', pero solo como
    // atributo: las hojas <style> y los estilos externos siguen limitados a 'self'.
    "style-src 'self'",
    "style-src-attr 'unsafe-inline'",
    `img-src 'self' data: blob: ${GA_RED}`,
    "font-src 'self'",
    "media-src 'self'",
    // blob: y data: los usa el visor 3D para cargar el modelo y sus texturas.
    `connect-src 'self' blob: data: ${GA_RED}`,
    "worker-src 'self' blob:",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "upgrade-insecure-requests",
  ].join("; ");
}

export function escribirCsp(carpeta) {
  const hashes = hashesDeScriptsInline(carpeta);
  const politica = construirCsp(hashes);
  writeFileSync(join(carpeta, "nginx-csp.inc"), `add_header Content-Security-Policy "${politica}" always;\n`);
  return { hashes, politica };
}
