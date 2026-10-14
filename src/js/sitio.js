import { nombreCompleto } from './modelos.js';
/**
 * Datos del sitio que comparten el navegador (ficha.js) y el build (scripts/seo.js): la URL pública y
 * el armado de los metadatos de cada ficha. Sin dependencias del navegador, para que Node pueda importarlo.
 *
 * Si el sitio cambia de dominio hay que tocar SITIO acá y las URL de index.html (canonical, og:url,
 * og:image y el JSON-LD).
 */
export const SITIO = (import.meta.env?.VITE_SITE_URL || (typeof process !== 'undefined' ? process.env.VITE_SITE_URL : '') || 'https://gwmweb.santarosa.lat').replace(/\/$/, '');

/**
 * Título, descripción, URL e imagen con que se comparte la ficha de un modelo. Lo usa ficha.js para
 * ponerlos al abrir la página y scripts/seo.js para dejarlos escritos en el HTML de cada ficha, que es
 * lo único que leen WhatsApp, Facebook y los buscadores que no ejecutan JavaScript.
 */
export function metaFicha(modelo, ficha, origen = SITIO) {
  const nombre = nombreCompleto(modelo);
  const descripcion = ficha.provisoria
    ? `${nombre} en Paraguay: conocé su diseño y consultá versiones, equipamiento y disponibilidad con el equipo GWM. Solicitá una cotización o un test drive.`
    : ficha.referenciaInternacional
    ? `${nombre}: motorización, equipamiento y ficha técnica internacional. Consultá versiones y disponibilidad en Paraguay y solicitá tu test drive.`
    : `${nombre} en Paraguay: versiones, precios de referencia, equipamiento y ficha técnica. Solicitá una cotización o un test drive con el equipo GWM.`;
  return {
    titulo: `${nombre} en Paraguay | GWM`,
    descripcion,
    url: `${origen}/modelos/${modelo.slug}`,
    // JPG de 1200x627 por modelo (scripts/generar-og.py): la portada es WebP y no todas las apps la muestran.
    imagen: `${origen}/img/og/${modelo.slug}.jpg`,
  };
}

/** Evita repetir «Paraguay» y la marca en los títulos de las páginas informativas. */
export function tituloPagina(pagina) {
  return pagina.seoTitulo || (pagina.titulo.includes('GWM') ? pagina.titulo : `${pagina.titulo} | ${pagina.titulo.includes('Paraguay') ? 'GWM' : 'GWM Paraguay'}`);
}
