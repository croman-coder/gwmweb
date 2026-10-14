/**
 * Ficha de modelo (/modelos/<slug>).
 *
 * Replica la ficha de gwm.com.py: barra de secciones, portada con precio, versiones, bloques de
 * diseño y tecnología, galería, diseño interior y exterior. El contenido sale de fichas.js (se
 * carga recién acá, para que la landing no pague su peso) y el catálogo, de modelos.js.
 *
 * Al final se agrega "Especificaciones técnicas": la tabla completa de la ficha técnica oficial del
 * modelo (src/js/tecnica/<slug>.js, un archivo por modelo que se descarga solo en su ficha).
 *
 * La página es la misma index.html: nginx devuelve index.html para cualquier ruta y main.js llama
 * a initFicha() cuando la ruta es /modelos/<slug>. Cada ficha es una navegación normal: el botón
 * "atrás" y el scroll de la landing los resuelve el navegador.
 */
import Splide from '@splidejs/splide';
import { modeloPorSlug } from './modelos.js';
import { metaFicha } from './sitio.js';
import '../css/ficha.css';

// Un módulo por modelo: Vite los parte en archivos aparte y solo se descarga el de la ficha abierta.
const MODULOS_TECNICA = import.meta.glob('./tecnica/*.js');
// Datos del visor 3D de cada modelo que lo tiene (visor3d/modelos/<slug>.js). El motor (three.js) se
// importa aparte y recién al tocar "Explorar en 3D": ver iniciarVisor3d.
const MODULOS_VISOR = import.meta.glob('./visor3d/modelos/*.js');

import { htmlFicha, htmlNoEncontrada } from './render/ficha.js';

/* ==========================================================================
   Metadatos de la pestaña y de las vistas previas al compartir el enlace
   ========================================================================== */
function ponerMeta(selector, atributo, valor) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(atributo, valor);
}

// El HTML de cada ficha ya sale del build con estos mismos datos (scripts/seo.js); esto los repite en la
// pestaña por si la página se sirvió desde index.html (por ejemplo en el servidor de desarrollo).
function actualizarMeta(modelo, ficha) {
  const { titulo, descripcion, url, imagen } = metaFicha(modelo, ficha);
  document.title = titulo;
  ponerMeta('meta[name="description"]', 'content', descripcion);
  ponerMeta('meta[property="og:title"]', 'content', titulo);
  ponerMeta('meta[property="og:description"]', 'content', descripcion);
  ponerMeta('meta[property="og:url"]', 'content', url);
  ponerMeta('meta[property="og:image"]', 'content', imagen);
  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = url;
}

/* ==========================================================================
   Interacciones
   ========================================================================== */

/** Pestañas de versiones: clic y teclado (flechas, inicio y fin). */
function iniciarVersiones(raiz) {
  const pestanas = [...raiz.querySelectorAll('.ficha-tabs [role="tab"]')];
  if (!pestanas.length) return;
  const mostrar = (i, enfocar = false) => {
    pestanas.forEach((t, k) => {
      const activa = k === i;
      t.setAttribute('aria-selected', String(activa));
      t.tabIndex = activa ? 0 : -1;
      raiz.querySelector(`#${t.getAttribute('aria-controls')}`).hidden = !activa;
    });
    if (enfocar) pestanas[i].focus();
  };
  pestanas.forEach((t, i) => t.addEventListener('click', () => mostrar(i)));
  raiz.querySelector('.ficha-tabs').addEventListener('keydown', (e) => {
    const actual = pestanas.findIndex((t) => t.getAttribute('aria-selected') === 'true');
    const destinos = { ArrowRight: actual + 1, ArrowLeft: actual - 1, Home: 0, End: pestanas.length - 1 };
    if (!(e.key in destinos)) return;
    e.preventDefault();
    mostrar((destinos[e.key] + pestanas.length) % pestanas.length, true);
  });
}

/** Carrusel de la galería: bucle, puntos y arrastre, sin autoplay (como en gwm.com.py). */
function iniciarGaleria(raiz) {
  const el = raiz.querySelector('#ficha-galeria');
  if (!el) return;
  const n = el.querySelectorAll('.splide__slide').length;
  if (n < 2) {
    el.classList.add('ficha-galeria__slider--unica');
    return;
  }
  new Splide(el, {
    type: 'loop',
    perPage: 1,
    arrows: false,
    pagination: true,
    speed: 600,
    i18n: { slide: 'imagen', slideLabel: '%s de %s', first: 'Primera imagen', last: 'Última imagen', prev: 'Anterior', next: 'Siguiente' },
  }).mount();

  // Las slides fuera de pantalla no bajan su imagen hasta estar cerca (loading="lazy"): al acercarse la
  // galería se piden todas, así al pasar de imagen ya están cargadas y no se ve un hueco.
  const pedirTodas = () => el.querySelectorAll('img[loading="lazy"]').forEach((img) => (img.loading = 'eager'));
  if (!('IntersectionObserver' in window)) return pedirTodas();
  const observador = new IntersectionObserver(
    (entradas) => {
      if (!entradas.some((e) => e.isIntersecting)) return;
      pedirTodas();
      observador.disconnect();
    },
    { rootMargin: '800px 0px' }
  );
  observador.observe(el);
}

/** "Expandir todo / Contraer todo" de las especificaciones (cada grupo es un <details> que funciona solo). */
function iniciarTecnica(raiz) {
  const boton = raiz.querySelector('[data-accion="alternar"]');
  const grupos = [...raiz.querySelectorAll('.ficha-grupo')];
  if (!boton || !grupos.length) return;
  const rotular = () => {
    boton.textContent = grupos.every((g) => g.open) ? 'Contraer todo' : 'Expandir todo';
  };
  boton.addEventListener('click', () => {
    const abrir = !grupos.every((g) => g.open);
    grupos.forEach((g) => (g.open = abrir));
    rotular();
  });
  grupos.forEach((g) => g.addEventListener('toggle', rotular));
  rotular();
}

function hayWebGL() {
  try {
    const c = document.createElement('canvas');
    return Boolean(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * Visor 3D: no se descarga nada hasta que la persona toca "Explorar en 3D". Recién ahí se piden el
 * motor (three.js, en su propio archivo), los datos del modelo y, desde el motor, el GLB y las texturas.
 * Estados en data-estado del visor (los estilos están en ficha.css): reposo, cargando, listo, error,
 * sin-webgl, y cargando-interior / error-interior que pone el propio motor.
 */
function iniciarVisor3d(raiz, slug) {
  const visor = raiz.querySelector('.ficha-3d__visor');
  if (!visor) return;
  const estado = visor.querySelector('.ficha-3d__estado');
  const cargarConfig = MODULOS_VISOR[`./visor3d/modelos/${slug}.js`];
  if (!cargarConfig || !hayWebGL()) {
    visor.dataset.estado = 'sin-webgl';
    estado.textContent = 'Tu navegador no puede mostrar la vista 3D. Probá desde otro navegador o dispositivo.';
    return;
  }
  let activo = null;
  visor.addEventListener('click', async (e) => {
    if (!e.target.closest('[data-accion="iniciar-3d"]') || visor.dataset.estado === 'cargando') return;
    visor.dataset.estado = 'cargando';
    estado.textContent = 'Cargando el modelo 3D…';
    try {
      activo?.destruir();
      const [{ montarVisor }, config] = await Promise.all([import('./visor3d/motor.js'), cargarConfig().then((m) => m.default)]);
      activo = await montarVisor(visor, config);
      visor.dataset.estado = 'listo';
    } catch (error) {
      console.error('No se pudo iniciar el visor 3D', error);
      visor.dataset.estado = 'error';
      estado.textContent = 'No se pudo cargar la vista 3D. Revisá tu conexión e intentá de nuevo.';
    }
  });
}

/** Resalta en la barra la sección que está cruzando el centro de la pantalla. */
function iniciarResaltado(raiz) {
  const enlaces = new Map([...raiz.querySelectorAll('.ficha-nav [data-seccion]')].map((a) => [a.dataset.seccion, a]));
  if (!enlaces.size || !('IntersectionObserver' in window)) return;
  const marcar = (id) => enlaces.forEach((a, k) => a.classList.toggle('activo', k === id));
  marcar([...enlaces.keys()][0]);
  const observador = new IntersectionObserver(
    (entradas) => entradas.forEach((e) => e.isIntersecting && marcar(e.target.id)),
    { rootMargin: '-40% 0px -55% 0px' }
  );
  enlaces.forEach((_, id) => {
    const seccion = raiz.querySelector(`#${id}`);
    if (seccion) observador.observe(seccion);
  });
}

/* ==========================================================================
   Punto de entrada
   ========================================================================== */
export async function initFicha(slug) {
  const contenedor = document.querySelector('#ficha');
  if (!contenedor) return;
  const modelo = modeloPorSlug(slug);
  const cargarTecnica = MODULOS_TECNICA[`./tecnica/${slug}.js`];
  const [{ FICHAS }, tecnica] = await Promise.all([
    import('./fichas.js'),
    // Si las especificaciones no cargan (red), la ficha sale igual, sin esa sección.
    cargarTecnica ? cargarTecnica().then((m) => m.default, () => null) : null,
  ]);
  const ficha = FICHAS[slug];

  if (!modelo || !ficha) {
    document.title = 'Modelo no encontrado | GWM Paraguay';
    contenedor.innerHTML = htmlNoEncontrada();
    return;
  }

  if (!contenedor.querySelector('.ficha')) contenedor.innerHTML = htmlFicha(modelo, ficha, tecnica);
  actualizarMeta(modelo, ficha);
  iniciarVersiones(contenedor);
  iniciarGaleria(contenedor);
  iniciarTecnica(contenedor);
  iniciarVisor3d(contenedor, slug);
  iniciarResaltado(contenedor);

  // El navegador intenta ir al ancla (#versiones) antes de que exista el contenido: se repite ya renderizado.
  if (location.hash.length > 1) {
    document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
  }
}
