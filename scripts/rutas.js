/** URLs relevadas del HTML del sitio anterior. Los modelos retirados sin equivalente dan 404. */
export const PRODUCTOS_ANTERIORES = {
  3: "wingle-7",
  5: "tank-300-phev-4x4",
  7: "h9-diesel-24",
  8: "h6-gt-phev",
  10: "h7-phev",
  12: "new-h6-hev",
  13: "poer-diesel",
  14: "jolion-pro-hev",
  15: "new-h6-phev",
  16: "tank-400-phev-4x4",
  17: "tank-500-hev-4x4",
  18: "poer-diesel",
  21: "poer-p500",
  22: "tank-700-phev-4x4",
};
/**
 * Páginas del sitio anterior (gwm.com.py en DreamHost) y su destino en este sitio. Se relevaron del HTML
 * del sitio viejo el 2026-11-24. Sin esto, cada enlace guardado en Google, WhatsApp o avisos daría 404 el
 * día que el dominio apunte acá. Las redirecciones de nginx salen de este mismo mapa (scripts/seo.js).
 *
 * Sin destino a propósito: `/codigo-de-cumplimiento` (el sitio nuevo no tiene ese documento todavía:
 * se publica cuando el proveedor lo entregue) y `/producto/9/jolion-mt` (modelo dado de baja).
 */
export const PAGINAS_ANTERIORES = {
  '/index': '/',
  '/agendar': '/postventa/agendar-service',
  '/mantenimiento': '/postventa',
  '/garantia': '/postventa',
  '/talleres': '/postventa',
  '/repuesto': '/postventa',
  '/cotizador': '/modelos',
  '/contacto': '/concesionarios',
  '/nosotros': '/',
  '/santa-rosa': '/',
};
export function redireccion(ruta) {
  if (ruta === '/index.html') return '/';
  const sinBarra = ruta.length > 1 && ruta.endsWith('/') ? ruta.slice(0, -1) : ruta;
  if (Object.hasOwn(PAGINAS_ANTERIORES, sinBarra)) return PAGINAS_ANTERIORES[sinBarra];
  if (ruta.endsWith('.html') && ruta !== '/404.html') return ruta.slice(0, -5);
  const producto = ruta.match(/^\/producto\/(\d+)(?:\/[^/]+)?\/?$/);
  if (producto && PRODUCTOS_ANTERIORES[producto[1]])
    return `/modelos/${PRODUCTOS_ANTERIORES[producto[1]]}`;
  if (ruta.endsWith("/") && ruta !== "/") return ruta.slice(0, -1);
  return null;
}
