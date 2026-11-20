/**
 * Versiona las imágenes del sitio publicado: /img/x.webp → /img/x.webp?v=<hash del archivo>.
 *
 * Cloudflare guarda /img/ en caché 30 días y las fotos se reemplazan con el mismo nombre (ej.: portada.webp),
 * así que sin esto la web sigue mostrando la foto vieja después de un deploy. Con el hash, cada foto nueva
 * tiene otra dirección y se descarga de nuevo; las que no cambian conservan la caché.
 *
 * Corre al final del build sobre dist/ (HTML, JS y CSS). Las rutas armadas en tiempo de ejecución
 * (con ${...}) no se tocan; las páginas se prerenderizan, así que casi todas quedan cubiertas.
 */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const RUTA = /\/img\/[\w./-]+?\.(?:webp|png|jpe?g|svg|avif)(?![\w?])/g;

function archivos(dir, extensiones, lista = []) {
  for (const nombre of readdirSync(dir)) {
    const ruta = join(dir, nombre);
    if (statSync(ruta).isDirectory()) archivos(ruta, extensiones, lista);
    else if (extensiones.some((e) => nombre.endsWith(e))) lista.push(ruta);
  }
  return lista;
}

export function versionarImagenes(dist) {
  const hashes = new Map();
  const hash = (ruta) => {
    if (!hashes.has(ruta)) {
      const archivo = join(dist, ruta);
      hashes.set(ruta, existsSync(archivo) ? createHash('sha1').update(readFileSync(archivo)).digest('hex').slice(0, 8) : null);
    }
    return hashes.get(ruta);
  };
  let cambios = 0;
  for (const archivo of archivos(dist, ['.html', '.js', '.css'])) {
    const texto = readFileSync(archivo, 'utf8');
    const nuevo = texto.replace(RUTA, (ruta) => {
      const h = hash(ruta);
      if (!h) return ruta;
      cambios++;
      return `${ruta}?v=${h}`;
    });
    if (nuevo !== texto) writeFileSync(archivo, nuevo);
  }
  console.log(`versionar-imagenes: ${cambios} referencias a ${[...hashes.values()].filter(Boolean).length} imágenes.`);
}
