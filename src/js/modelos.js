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
 * Cada tarjeta, enlace del megamenú y CTA del hero lleva a la ficha del modelo
 * (/modelos/<slug>); el contenido de las fichas está en fichas.js. El `slug`
 * identifica al modelo y forma parte de su URL: no cambiarlo una vez publicado.
 */

// En orden alfabético (pedido de Marketing, 2026-11-20): así se listan en menús, filtros y catálogo.
export const CATEGORIAS = [
  { id: 'haval', titulo: 'Haval' },
  { id: 'ora', titulo: 'Ora' },
  { id: 'poer', titulo: 'Poer' },
  { id: 'tank', titulo: 'Tank' },
  { id: 'wingle', titulo: 'Wingle' },
];

const TODOS = [
  // Precios de lista (PVP) de "Acciones comerciales noviembre 2026" (Marketing, 2026-11-20).
  // --- Wingle -------------------------------------------------------------
  {
    categoria: 'wingle',
    nombre: 'Wingle 7',
    slug: 'wingle-7',
    precio: 19990,
    imagen: '/img/modelos/wingle-7.webp',
    bajada: 'La pick up que conjuga alto rendimiento y estilo.',
  },

  // --- Haval (orden pedido por Marketing) ---------------------------------
  {
    categoria: 'haval',
    nombre: 'Jolion Pro HEV',
    slug: 'jolion-pro-hev',
    precio: 20990,
    imagen: '/img/modelos/jolion-pro-hev.webp',
    bajada: 'El SUV que re-evoluciona tu mundo.',
  },
  {
    categoria: 'haval',
    nombre: 'New H6 HEV',
    slug: 'new-h6-hev',
    precio: 24990,
    imagen: '/img/modelos/new-h6-hev.webp',
    bajada: 'La SUV automática por excelencia, ahora híbrida.',
  },
  {
    categoria: 'haval',
    nombre: 'New H6 PHEV',
    slug: 'new-h6-phev',
    precio: 30990,
    imagen: '/img/modelos/new-h6-phev.webp',
    bajada: 'Tecnología y seguridad como nunca antes.',
  },
  {
    categoria: 'haval',
    nombre: 'H6 GT PHEV',
    slug: 'h6-gt-phev',
    precio: 39990,
    imagen: '/img/modelos/h6-gt-phev.webp',
    bajada: 'SUV deportiva de lujo con más autonomía en modo eléctrico.',
  },
  {
    categoria: 'haval',
    nombre: 'H7 PHEV',
    slug: 'h7-phev',
    precio: 34990,
    precioAnterior: 35990, // Rebaja (2026-11-27): se muestra tachado. Borrar la línea al terminar la promoción.
    imagen: '/img/modelos/h7-phev.webp',
    bajada: 'El SUV híbrido enchufable que redefine la aventura urbana.',
  },
  {
    categoria: 'haval',
    nombre: 'H9 Diesel 2.4',
    slug: 'h9-diesel-24',
    precio: 41990,
    precioAnterior: 42990, // Rebaja (2026-11-27): se muestra tachado. Borrar la línea al terminar la promoción.
    imagen: '/img/modelos/h9-diesel-24.webp',
    bajada: 'La SUV de 3 hileras lista para cualquier aventura.',
  },

  // --- Ora ----------------------------------------------------------------
  // Precios confirmados por Marketing el 2026-11-11. PENDIENTE: fotos definitivas
  // (las actuales son provisorias, tomadas de gwm.com.uy; ORA 5 EV/HEV comparten foto).
  {
    categoria: 'ora',
    nombre: 'Ora 03 Skin',
    slug: 'ora-03-skin',
    // Retirado de la web por pedido de Marketing (2026-11-23): su URL redirige al Ora 5 EV. Para volver a mostrarlo, borrar `oculto`.
    oculto: { hasta: 'ora-5-ev' },
    precio: 22990,
    imagen: '/img/modelos/ora-03.webp',
    bajada: '100% eléctrico, con un diseño que no pasa desapercibido.',
  },
  {
    categoria: 'ora',
    nombre: 'Ora 5 EV',
    slug: 'ora-5-ev',
    precio: 24990,
    imagen: '/img/modelos/ora-5.webp',
    bajada: 'El SUV urbano 100% eléctrico de GWM.',
  },
  {
    categoria: 'ora',
    nombre: 'Ora 5 HEV',
    slug: 'ora-5-hev',
    // Llega en diciembre de 2026: no se muestra hasta entonces (precio tentativo). Para
    // publicarlo, borrar `oculto` (su URL deja de redirigir al EV en el próximo build).
    oculto: { hasta: 'ora-5-ev' },
    precio: 23990,
    imagen: '/img/modelos/ora-5.webp',
    bajada: 'La versión híbrida del SUV urbano de ORA.',
  },

  // --- Poer ---------------------------------------------------------------
  {
    categoria: 'poer',
    nombre: 'Poer Diesel',
    slug: 'poer-diesel',
    precio: 29990,
    imagen: '/img/modelos/poer-diesel.webp',
    bajada: 'La pick up doble cabina 4x4, potente y confiable.',
    versiones: ['Poer 2.0', 'Poer Plus 2.4'],
  },
  {
    categoria: 'poer',
    nombre: 'Poer P500',
    slug: 'poer-p500',
    precio: 44990,
    imagen: '/img/modelos/poer-p500.webp',
    bajada: 'La pick up híbrida enchufable 4x4 de GWM.',
  },

  // --- Tank ---------------------------------------------------------------
  {
    categoria: 'tank',
    nombre: 'Tank 300 PHEV 4x4',
    slug: 'tank-300-phev-4x4',
    precio: 39990,
    imagen: '/img/modelos/tank-300-phev.webp',
    bajada: 'Una SUV todoterreno imparable, ahora híbrida enchufable.',
  },
  {
    categoria: 'tank',
    nombre: 'Tank 400 PHEV 4x4',
    slug: 'tank-400-phev-4x4',
    precio: 50990,
    imagen: '/img/modelos/tank-400-phev.webp',
    bajada: 'El equilibrio perfecto entre poder y elegancia.',
  },
  {
    categoria: 'tank',
    nombre: 'Tank 500 HEV 4x4',
    slug: 'tank-500-hev-4x4',
    precio: 49990,
    imagen: '/img/modelos/tank-500-hev.webp',
    bajada: 'La potencia expresada en una SUV de máximo lujo.',
  },
  {
    categoria: 'tank',
    nombre: 'Tank 500 PHEV 4x4',
    slug: 'tank-500-phev-4x4',
    // Usa las fotos del Tank 500 HEV (confirmado por Marketing).
    precio: 54990,
    imagen: '/img/modelos/tank-500-hev.webp',
    bajada: 'El lujo del Tank 500 con hasta 105 km de autonomía eléctrica.',
  },
  {
    categoria: 'tank',
    nombre: 'Tank 700 PHEV 4x4',
    slug: 'tank-700-phev-4x4',
    precio: 75990,
    imagen: '/img/modelos/tank-700-phev.webp',
    bajada: 'La máxima expresión de lujo y poder off road de GWM.',
  },
];

/* --- Clasificación de los modelos (filtros del menú Modelos) -----------------
   Tipo de motor y carrocería de cada uno, de sus fichas. Se agregan a cada entrada de MODELOS
   para que un modelo nuevo se clasifique en un solo lugar. */
export const TIPOS_MOTOR = [
  { id: 'electrico', titulo: 'Eléctrico' },
  { id: 'hev', titulo: 'Híbrido' },
  { id: 'phev', titulo: 'Híbrida Enchufable' },
  { id: 'diesel', titulo: 'Diésel' },
];

export const CARROCERIAS = [
  { id: 'hatchback', titulo: 'Hatchback' },
  { id: 'suv', titulo: 'SUV' },
  { id: 'todoterreno', titulo: 'Todoterreno' },
  { id: 'pickup', titulo: 'Pick up' },
];

const CLASIFICACION = {
  'wingle-7': ['diesel', 'pickup'],
  'jolion-pro-hev': ['hibrido', 'suv'],
  'new-h6-hev': ['hibrido', 'suv'],
  'new-h6-phev': ['hibrido', 'suv'],
  'h6-gt-phev': ['hibrido', 'suv'],
  'h7-phev': ['hibrido', 'suv'],
  'h9-diesel-24': ['diesel', 'suv'],
  'ora-03-skin': ['electrico', 'hatchback'],
  'ora-5-ev': ['electrico', 'suv'],
  'ora-5-hev': ['hibrido', 'suv'],
  'poer-diesel': ['diesel', 'pickup'],
  'poer-p500': ['hibrido', 'pickup'],
  'tank-300-phev-4x4': ['hibrido', 'todoterreno'],
  'tank-400-phev-4x4': ['hibrido', 'todoterreno'],
  'tank-500-hev-4x4': ['hibrido', 'todoterreno'],
  'tank-500-phev-4x4': ['hibrido', 'todoterreno'],
  'tank-700-phev-4x4': ['hibrido', 'todoterreno'],
};

for (const modelo of TODOS) {
  [modelo.motor, modelo.carroceria] = CLASIFICACION[modelo.slug] ?? [];
  if (modelo.motor === 'hibrido') modelo.motor = modelo.slug.includes('phev') || modelo.slug === 'poer-p500' ? 'phev' : 'hev';
}

/** Modelos publicados. Los marcados `oculto` no aparecen en ningún lado del sitio. */
/** Orden de los modelos en todo el sitio: por línea (alfabético) y, dentro de cada una, del más barato al más caro;
 *  los que no tienen precio van al final de su línea. */
const ordenLinea = (m) => CATEGORIAS.findIndex((c) => c.id === m.categoria);
export const MODELOS = TODOS.filter((m) => !m.oculto).sort(
  (a, b) => ordenLinea(a) - ordenLinea(b) || (a.precio ?? Infinity) - (b.precio ?? Infinity),
);

/** Modelos ocultos y a qué ficha redirige su URL mientras tanto: { slug: slugDestino }. */
export const OCULTOS = Object.fromEntries(TODOS.filter((m) => m.oculto).map((m) => [m.slug, m.oculto.hasta]));

export const nombreCompleto = (modelo) => modelo.categoria === 'haval' ? `Haval ${modelo.nombre}` : modelo.nombre;

/** Modelos de la sección "Modelos destacados" de la landing, en este orden. */
export const DESTACADOS = ['ora-5-ev', 'new-h6-hev', 'tank-500-hev-4x4'];

/**
 * Banner de una ficha (1600x700, y 900x394 para celular): es la imagen de cada modelo en el selector
 * de la landing. El Ora 5 HEV todavía no tiene fotos propias y usa las del EV.
 */
export function portadaModelo(slug) {
  const carpeta = slug === 'ora-5-hev' ? 'ora-5-ev' : slug;
  return { escritorio: `/img/fichas/${carpeta}/portada.webp`, movil: `/img/fichas/${carpeta}/portada-m.webp` };
}

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
/** Los dos recortes del spot de un modelo. */
const spot = (nombre) => ({ video: `/video/${nombre}-16x9.mp4`, videoMobile: `/video/${nombre}-9x16.mp4` });

export const SLIDES = [
  // Spots de 5 s entregados por la agencia el 2026-11-19 (Drive "VIDEOS"): uno 16:9 y uno 9:16 por modelo.
  // El de H6 sirve para HEV y PHEV (mismo diseño). Están en public/video/<slug>-16x9.mp4 y -9x16.mp4.
  { modelo: 'Haval H7 PHEV', slug: 'h7-phev', precio: 34990, imagen: '/img/poster/h7-original-1080.webp', imagenMobile: '/img/fichas/h7-phev/portada-m.webp', ...spot('h7-phev') },
  { modelo: 'Tank 400 PHEV 4x4', slug: 'tank-400-phev-4x4', precio: 50990, imagen: '/img/hero/tank-400.webp', tituloIncrustado: true, ...spot('tank-400-phev-4x4') },
  { modelo: 'Tank 700 PHEV 4x4', slug: 'tank-700-phev-4x4', precio: 75990, imagen: '/img/fichas/tank-700-phev-4x4/portada.webp', ...spot('tank-700-phev-4x4') },
  { modelo: 'Haval New H6 PHEV', slug: 'new-h6-phev', precio: 30990, imagen: '/img/poster/h6-phev.webp', ...spot('new-h6') },
  { modelo: 'Haval New H6 HEV', slug: 'new-h6-hev', precio: 24990, imagen: '/img/hero/new-h6-hev.webp', tituloIncrustado: true, ...spot('new-h6') },
  { modelo: 'Poer Diesel', slug: 'poer-diesel', precio: 29990, imagen: '/img/poster/poer.webp', ...spot('poer-diesel') },
  { modelo: 'Haval H6 GT PHEV', slug: 'h6-gt-phev', precio: 39990, imagen: '/img/hero/h6-gt-phev.webp', tituloIncrustado: true, ...spot('h6-gt-phev') },
  { modelo: 'Jolion Pro HEV', slug: 'jolion-pro-hev', precio: 20990, imagen: '/img/fichas/jolion-pro-hev/portada.webp', ...spot('jolion-pro-hev') },
  { modelo: 'Ora 5', slug: 'ora-5-ev', precio: 24990, imagen: '/img/poster/ora-5.webp', ...spot('ora-5') },
  // Resto de la gama (pedido de Marketing, 2026-11-20: el carrusel muestra todos los modelos).
  { modelo: 'Ora 03 Skin', slug: 'ora-03-skin', imagen: '/img/fichas/ora-03-skin/portada.webp' },
  { modelo: 'Haval H9 Diesel', slug: 'h9-diesel-24', imagen: '/img/fichas/h9-diesel-24/portada.webp', ...spot('h9-diesel-24') },
  { modelo: 'Poer P500', slug: 'poer-p500', imagen: '/img/fichas/poer-p500/portada.webp', ...spot('poer-p500') },
  { modelo: 'Tank 300 PHEV 4x4', slug: 'tank-300-phev-4x4', imagen: '/img/fichas/tank-300-phev-4x4/portada.webp', ...spot('tank-300-phev-4x4') },
  { modelo: 'Tank 500 HEV 4x4', slug: 'tank-500-hev-4x4', imagen: '/img/fichas/tank-500-hev-4x4/portada.webp', ...spot('tank-500-hev-4x4') },
  { modelo: 'Tank 500 PHEV 4x4', slug: 'tank-500-phev-4x4', imagen: '/img/fichas/tank-500-hev-4x4/portada.webp', imagenMobile: '/img/fichas/tank-500-hev-4x4/portada-m.webp', ...spot('tank-500-hev-4x4') },
  { modelo: 'Wingle 7', slug: 'wingle-7', imagen: '/img/fichas/wingle-7/portada.webp', ...spot('wingle-7') },
];

/** Slides con material listo: líneas en orden alfabético y, dentro de cada una, por nombre del modelo con los números
 *  en orden (H6, H7, H9…; Tank 300, 400, 500 HEV, 500 PHEV, 700). Pedido de Marketing, 2026-11-20. */
export const nombreCorto = (modelo) => modelo.replace(/^Haval (?:New )?/, '').replace(/\s+4x4$/i, '');
const linea = (s) => CATEGORIAS.findIndex((c) => c.id === MODELOS.find((m) => m.slug === s.slug)?.categoria);
export const SLIDES_ACTIVOS = SLIDES.filter((s) => !s.pendiente && linea(s) >= 0).sort(
  (a, b) => linea(a) - linea(b) || nombreCorto(a.modelo).localeCompare(nombreCorto(b.modelo), 'es', { numeric: true }),
);

/** Formatea un precio USD al estilo del sitio: USD 42.990 */
export function formatearPrecio(valor) {
  return `USD ${valor.toLocaleString('es-PY')}`;
}

/** Precio anterior tachado de una rebaja (vacío si no hay rebaja). */
export function htmlPrecioAntes(anterior, actual) {
  if (!anterior || actual === null || anterior <= actual) return '';
  return `<s class="precio-antes"><span class="visually-hidden">Antes </span>${formatearPrecio(anterior)}</s> `;
}

/** Precio de una tarjeta ("Desde USD …*"), con el anterior tachado y el nuevo animado si hay rebaja. Devuelve HTML. */
export function textoPrecio(valor, anterior = null) {
  if (valor === null) return 'Consultar precio';
  const antes = htmlPrecioAntes(anterior, valor);
  return antes
    ? `<span class="precio-rebaja">${antes}<span class="precio-ahora">Desde ${formatearPrecio(valor)}*</span></span>`
    : `Desde ${formatearPrecio(valor)}*`;
}

/** Ruta de la ficha de un modelo. */
export function urlFicha(slug) {
  return `/modelos/${slug}`;
}

/** Modelo del catálogo por su slug (undefined si no existe). */
export function modeloPorSlug(slug) {
  return MODELOS.find((m) => m.slug === slug);
}
