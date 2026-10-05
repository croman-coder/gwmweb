/**
 * Catálogo de modelos GWM Paraguay.
 *
 * Lineup y precios relevados del sitio anterior el 2026-10-02, con los
 * ajustes pedidos por Marketing: submarcas Wingle / Haval / Ora / Poer / Tank,
 * POER unificada en "Poer Diesel" con sus dos versiones, Jolion MT dada de
 * baja, H7 PHEV incorporada y la línea ORA agregada.
 *
 * Los precios son "desde", en USD. `precio: null` muestra "Consultar precio":
 * se usa para los modelos cuyo precio de Paraguay todavía no está confirmado.
 *
 * El sitio es autocontenido: no se enlaza a ningún dominio externo salvo
 * WhatsApp. Cada tarjeta, cada enlace del megamenú y cada CTA del hero abren el
 * WhatsApp de ventas con el modelo ya nombrado en el mensaje.
 */

export const CATEGORIAS = [
  { id: 'wingle', titulo: 'Wingle' },
  { id: 'haval', titulo: 'Haval' },
  { id: 'ora', titulo: 'Ora' },
  { id: 'poer', titulo: 'Poer' },
  { id: 'tank', titulo: 'Tank' },
];

export const MODELOS = [
  // --- Wingle -------------------------------------------------------------
  {
    categoria: 'wingle',
    nombre: 'Wingle 7',
    precio: 19990,
    imagen: '/img/modelos/wingle-7.webp',
    bajada: 'La pick up que conjuga alto rendimiento y estilo.',
  },

  // --- Haval (orden pedido por Marketing) ---------------------------------
  {
    categoria: 'haval',
    nombre: 'Jolion Pro HEV',
    precio: 19990,
    imagen: '/img/modelos/jolion-pro-hev.webp',
    bajada: 'El SUV que re-evoluciona tu mundo.',
  },
  {
    categoria: 'haval',
    nombre: 'New H6 HEV',
    precio: 24990,
    imagen: '/img/modelos/new-h6-hev.webp',
    bajada: 'La SUV automática por excelencia, ahora híbrida.',
  },
  {
    categoria: 'haval',
    nombre: 'New H6 PHEV',
    precio: 30990,
    imagen: '/img/modelos/new-h6-phev.webp',
    bajada: 'Tecnología y seguridad como nunca antes.',
  },
  {
    categoria: 'haval',
    nombre: 'H6 GT PHEV',
    precio: 39990,
    imagen: '/img/modelos/h6-gt-phev.webp',
    bajada: 'SUV deportiva de lujo con más autonomía en modo eléctrico.',
  },
  {
    categoria: 'haval',
    nombre: 'H7 PHEV',
    precio: 35990,
    imagen: '/img/modelos/h7-phev.webp',
    bajada: 'El SUV híbrido enchufable que redefine el off road urbano.',
  },
  {
    categoria: 'haval',
    nombre: 'H9 Diesel 2.4',
    precio: 42990,
    imagen: '/img/modelos/h9-diesel-24.webp',
    bajada: 'La SUV de 3 hileras lista para cualquier aventura.',
  },

  // --- Ora ----------------------------------------------------------------
  // PENDIENTE: fotos definitivas y precios de Paraguay. Las imágenes actuales
  // son provisorias (tomadas de gwm.com.uy) y ORA 5 EV/HEV comparten foto.
  {
    categoria: 'ora',
    nombre: 'Ora 03 Skin',
    precio: null,
    imagen: '/img/modelos/ora-03.webp',
    bajada: '100% eléctrico, con un diseño que no pasa desapercibido.',
  },
  {
    categoria: 'ora',
    nombre: 'Ora 5 EV',
    precio: null,
    imagen: '/img/modelos/ora-5.webp',
    bajada: 'El SUV urbano 100% eléctrico de GWM.',
  },
  {
    categoria: 'ora',
    nombre: 'Ora 5 HEV',
    precio: null,
    imagen: '/img/modelos/ora-5.webp',
    bajada: 'La versión híbrida del SUV urbano de ORA.',
  },

  // --- Poer ---------------------------------------------------------------
  {
    categoria: 'poer',
    nombre: 'Poer Diesel',
    precio: 29990,
    imagen: '/img/modelos/poer-diesel.webp',
    bajada: 'La pick up doble cabina 4x4, potente y confiable.',
    versiones: ['Poer 2.0', 'Poer Plus 2.4'],
  },
  {
    categoria: 'poer',
    nombre: 'Poer P500',
    precio: 44990,
    imagen: '/img/modelos/poer-p500.webp',
    bajada: 'La pick up híbrida enchufable 4x4 de GWM.',
  },

  // --- Tank ---------------------------------------------------------------
  {
    categoria: 'tank',
    nombre: 'Tank 300 PHEV 4x4',
    precio: 39990,
    imagen: '/img/modelos/tank-300-phev.webp',
    bajada: 'Una SUV todoterreno imparable, ahora híbrida enchufable.',
  },
  {
    categoria: 'tank',
    nombre: 'Tank 400 PHEV 4x4',
    precio: 50990,
    imagen: '/img/modelos/tank-400-phev.webp',
    bajada: 'El equilibrio perfecto entre poder y elegancia.',
  },
  {
    categoria: 'tank',
    nombre: 'Tank 500 HEV 4x4',
    precio: 49990,
    imagen: '/img/modelos/tank-500-hev.webp',
    bajada: 'La potencia expresada en una SUV de máximo lujo.',
  },
  {
    categoria: 'tank',
    nombre: 'Tank 700 PHEV 4x4',
    precio: 74990,
    imagen: '/img/modelos/tank-700-phev.webp',
    bajada: 'La máxima expresión de lujo y poder off road de GWM.',
  },
];

/**
 * Slides de la portada: la selección pedida por Marketing.
 *
 * Cada slide usa el spot en sus dos recortes (16:9 desktop, 9:16 mobile).
 * Los que todavía no tienen video quedan con `pendiente: true` y NO entran a
 * la rotación: apenas llegue el material se borra esa línea y se completan
 * `video` / `videoMobile`, sin tocar nada más.
 *
 * Especificación del material: ver README, sección "Videos".
 */
export const SLIDES = [
  {
    modelo: 'Tank 400 PHEV 4x4',
    precio: 50990,
    imagen: '/img/hero/tank-400.webp',
  },
  {
    modelo: 'Tank 700 PHEV 4x4',
    precio: 74990,
    imagen: '/img/modelos/tank-700-phev.webp',
    pendiente: true, // falta banner y spot
  },
  {
    modelo: 'Haval New H6 HEV',
    precio: 24990,
    imagen: '/img/hero/new-h6-hev.webp',
  },
  {
    modelo: 'Haval New H6 PHEV',
    precio: 30990,
    imagen: '/img/poster/h6-phev.webp',
    video: '/video/h6-phev-16x9.mp4',
    videoMobile: '/video/h6-phev-9x16.mp4',
  },
  {
    modelo: 'Poer Diesel',
    precio: 29990,
    imagen: '/img/poster/poer.webp',
    video: '/video/poer-16x9.mp4',
    videoMobile: '/video/poer-9x16.mp4',
  },
  {
    modelo: 'Haval H7 PHEV',
    precio: 35990,
    imagen: '/img/modelos/h7-phev.webp',
    pendiente: true, // falta banner y spot
  },
  {
    modelo: 'Haval H6 GT PHEV',
    precio: 39990,
    imagen: '/img/hero/h6-gt-phev.webp',
  },
  {
    modelo: 'Jolion Pro HEV',
    precio: 19990,
    imagen: '/img/modelos/jolion-pro-hev.webp',
    pendiente: true, // falta banner y spot
  },
  {
    modelo: 'Ora 5',
    precio: null,
    imagen: '/img/poster/ora-5.webp',
    video: '/video/ora-5-16x9.mp4',
    videoMobile: '/video/ora-5-9x16.mp4',
  },
];

/** Slides con material listo, en el orden pedido. */
export const SLIDES_ACTIVOS = SLIDES.filter((s) => !s.pendiente);

/** Formatea un precio USD al estilo del sitio: USD 42.990 */
export function formatearPrecio(valor) {
  return `USD ${valor.toLocaleString('es-PY')}`;
}

/** Texto de precio de una tarjeta, contemplando los que están por confirmar. */
export function textoPrecio(valor) {
  return valor === null ? 'Consultar precio' : `Desde ${formatearPrecio(valor)}*`;
}
