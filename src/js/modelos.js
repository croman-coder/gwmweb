/**
 * Catálogo de modelos GWM Paraguay.
 * Nombres, precios y bajadas tomados del sitio actual www.gwm.com.py.
 * Los precios son "desde", en USD, y se muestran con el asterisco de la nota legal.
 */

export const CATEGORIAS = [
  { id: 'pickups', titulo: 'Pick Ups' },
  { id: 'haval', titulo: 'Haval' },
  { id: 'tank', titulo: 'Tank' },
];

export const MODELOS = [
  // --- Pick Ups ---
  {
    categoria: 'pickups',
    nombre: 'Wingle 7',
    precio: 19990,
    imagen: '/img/modelos/wingle-7.webp',
    bajada: 'La camioneta que conjuga alto rendimiento y estilo.',
    url: 'https://www.gwm.com.py/producto/3/wingle-7',
  },
  {
    categoria: 'pickups',
    nombre: 'Poer',
    precio: 29990,
    imagen: '/img/modelos/poer.webp',
    bajada: 'Tu sueño de una camioneta doble cabina, potente y confiable.',
    url: 'https://www.gwm.com.py/producto/13/poer',
  },
  {
    categoria: 'pickups',
    nombre: 'Poer Plus 2.4T',
    precio: 35990,
    imagen: '/img/modelos/poer-plus-24t.webp',
    bajada: 'Con más poder para dominar cualquier terreno.',
    url: 'https://www.gwm.com.py/producto/18/poer-plus-24t',
  },
  {
    categoria: 'pickups',
    nombre: 'Poer P500',
    precio: 44990,
    imagen: '/img/modelos/poer-p500.webp',
    bajada: 'La pickup híbrida enchufable 4x4 de GWM.',
    url: 'https://www.gwm.com.py/producto/21/poer-p500',
  },

  // --- Haval ---
  {
    categoria: 'haval',
    nombre: 'Jolion MT',
    precio: 15990,
    imagen: '/img/modelos/jolion-mt.webp',
    bajada: 'La SUV familiar que sorprende: sobriedad y performance.',
    url: 'https://www.gwm.com.py/producto/9/jolion-mt',
  },
  {
    categoria: 'haval',
    nombre: 'Jolion Pro HEV',
    precio: 19990,
    imagen: '/img/modelos/jolion-pro-hev.webp',
    bajada: 'El SUV que re-evoluciona tu mundo.',
    url: 'https://www.gwm.com.py/producto/14/jolion-pro-hev',
  },
  {
    categoria: 'haval',
    nombre: 'New H6 HEV',
    precio: 24990,
    imagen: '/img/modelos/new-h6-hev.webp',
    bajada: 'La SUV automática por excelencia se renueva, ahora híbrida.',
    url: 'https://www.gwm.com.py/producto/12/new-h6-hev',
  },
  {
    categoria: 'haval',
    nombre: 'New H6 PHEV',
    precio: 30990,
    imagen: '/img/modelos/new-h6-phev.webp',
    bajada: 'Tecnología y seguridad como nunca antes.',
    url: 'https://www.gwm.com.py/producto/15/new-h6-phev',
  },
  {
    categoria: 'haval',
    nombre: 'H6 GT PHEV',
    precio: 39990,
    imagen: '/img/modelos/h6-gt-phev.webp',
    bajada: 'SUV deportiva de lujo con más autonomía en modo eléctrico.',
    url: 'https://www.gwm.com.py/producto/8/h6-gt-phev',
  },
  {
    categoria: 'haval',
    nombre: 'H9 Diesel 2.4',
    precio: 42990,
    imagen: '/img/modelos/h9-diesel-24.webp',
    bajada: 'La SUV de 3 hileras lista para cualquier aventura.',
    url: 'https://www.gwm.com.py/producto/7/h9-diesel-24',
  },

  // --- Tank ---
  {
    categoria: 'tank',
    nombre: 'Tank 300 PHEV 4x4',
    precio: 39990,
    imagen: '/img/modelos/tank-300-phev.webp',
    bajada: 'Una SUV todoterreno imparable, ahora híbrida enchufable.',
    url: 'https://www.gwm.com.py/producto/5/tank-300-phev-4x4',
  },
  {
    categoria: 'tank',
    nombre: 'Tank 400 PHEV 4x4',
    precio: 50990,
    imagen: '/img/modelos/tank-400-phev.webp',
    bajada: 'El equilibrio perfecto entre poder y elegancia.',
    url: 'https://www.gwm.com.py/producto/16/tank-400-phev-4x4',
  },
  {
    categoria: 'tank',
    nombre: 'Tank 500 HEV 4x4',
    precio: 49990,
    imagen: '/img/modelos/tank-500-hev.webp',
    bajada: 'La potencia expresada en una SUV de máximo lujo.',
    url: 'https://www.gwm.com.py/producto/17/tank-500-hev-4x4',
  },
  {
    categoria: 'tank',
    nombre: 'Tank 700 PHEV 4x4',
    precio: 74990,
    imagen: '/img/modelos/tank-700-phev.webp',
    bajada: 'La máxima expresión de lujo y poder off road de GWM.',
    url: 'https://www.gwm.com.py/producto/22/tank-700-phev-4x4',
  },
];

/**
 * Slides del hero, con la jerarquía de gwm.com.uy: modelo | Desde USD X | CTA.
 *
 * Los slides con `video` usan los spots institucionales de gwm-mx.com en sus dos
 * recortes (16:9 para desktop, 9:16 para mobile), igual que el home de México.
 * Los que solo tienen `imagen` usan los banners de campaña de gwm.com.py.
 */
export const SLIDES = [
  {
    modelo: 'Tank 500 HEV 4x4',
    precio: 49990,
    url: 'https://www.gwm.com.py/producto/17/tank-500-hev-4x4',
    imagen: '/img/poster/tank-500.webp',
    video: '/video/tank-500-16x9.mp4',
    videoMobile: '/video/tank-500-9x16.mp4',
  },
  {
    modelo: 'Haval H9 Diesel',
    precio: 42990,
    url: 'https://www.gwm.com.py/producto/7/h9-diesel-24',
    imagen: '/img/hero/h9-diesel.webp',
    imagenMobile: '/img/hero/h9-diesel.webp',
  },
  {
    modelo: 'Tank 300 PHEV 4x4',
    precio: 39990,
    url: 'https://www.gwm.com.py/producto/5/tank-300-phev-4x4',
    imagen: '/img/poster/tank-300.webp',
    video: '/video/tank-300-16x9.mp4',
    videoMobile: '/video/tank-300-9x16.mp4',
  },
  {
    modelo: 'Poer P500',
    precio: 44990,
    url: 'https://www.gwm.com.py/producto/21/poer-p500',
    imagen: '/img/poster/poer.webp',
    video: '/video/poer-500-16x9.mp4',
    videoMobile: '/video/poer-500-9x16.mp4',
  },
  {
    modelo: 'Haval New H6 PHEV',
    precio: 30990,
    url: 'https://www.gwm.com.py/producto/15/new-h6-phev',
    imagen: '/img/poster/h6-phev.webp',
    video: '/video/h6-phev-16x9.mp4',
    videoMobile: '/video/h6-phev-9x16.mp4',
  },
  {
    modelo: 'Poer',
    precio: 29990,
    url: 'https://www.gwm.com.py/producto/13/poer',
    imagen: '/img/poster/poer.webp',
    video: '/video/poer-16x9.mp4',
    videoMobile: '/video/poer-9x16.mp4',
  },
];

/** Formatea un precio USD al estilo del sitio: USD 42.990 */
export function formatearPrecio(valor) {
  return `USD ${valor.toLocaleString('es-PY')}`;
}
