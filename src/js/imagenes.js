import imagenes from './imagenes-manifest.js';

export function srcsetImagen(src) {
  const datos = imagenes[src];
  if (!datos) return src;
  const [ancho, , variantes] = datos;
  const base = src.replace('/img/', '/img/responsive/').replace(/\.[^.]+$/, '');
  return [...variantes.map(w => `${base}-${w}.webp ${w}w`), `${src} ${ancho}w`].join(', ');
}

/** Mismo marcado en HTML estático y en vistas interactivas. Nunca amplía el archivo original. */
export function optimizarImagenes(html) {
  return html.replace(/<source\b[^>]*>/g, tag => {
    const src = tag.match(/\ssrcset="(\/img\/[^" ,]+)"/);
    return src && imagenes[src[1]] ? tag.replace(src[0], ` srcset="${srcsetImagen(src[1])}" sizes="100vw"`) : tag;
  }).replace(/<img\b[^>]*>/g, tag => {
    const src = tag.match(/\ssrc="(\/img\/[^" ]+)"/);
    if (!src || !imagenes[src[1]] || /\ssrcset=/.test(tag)) return tag;
    const [w,h] = imagenes[src[1]];
    const sizes = /ficha-portada__imagen/.test(tag) ? '(max-width:767px) 100vw, 60vw' :
      tag.match(/data-image-sizes="([^"]+)"/)?.[1] || '(max-width:767px) calc(100vw - 40px), (max-width:1023px) 50vw, 800px';
    let attrs = ` srcset="${srcsetImagen(src[1])}" sizes="${sizes}"`;
    if (!/\swidth=/.test(tag)) attrs += ` width="${w}"`;
    if (!/\sheight=/.test(tag)) attrs += ` height="${h}"`;
    if (!/\sdecoding=/.test(tag)) attrs += ' decoding="async"';
    return tag.replace(/\s*\/?>(?=$)/, attrs + ' />');
  });
}
