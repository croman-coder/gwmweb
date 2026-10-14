/** Navegación por secciones sin cambiar la dirección pública de la página. */
import { reducirMovimiento } from './home/util.js';

const ANCLAS_HOME = {
  modelos: '/modelos',
  concesionarios: '/concesionarios',
  postventa: '/postventa/agendar-service',
  servicios: '/postventa',
  reclamos: '/postventa/reclamos',
};

export function interpretarAncla(ruta, hash) {
  let id = '';
  try { id = decodeURIComponent(hash.replace(/^#/, '')); } catch { /* Enlaces antiguos mal codificados. */ }
  return { id, destino: ruta === '/' && Object.hasOwn(ANCLAS_HOME, id) ? ANCLAS_HOME[id] : null };
}

let llegada = '';
function consumirAncla() {
  if (!location.hash && !location.href.endsWith('#')) return;
  const { id, destino } = interpretarAncla(location.pathname, location.hash);
  if (destino) {
    location.replace(destino + location.search);
    return;
  }
  llegada = id;
  // Conserva los parámetros de campaña y la entrada actual del historial.
  history.replaceState(history.state, '', location.pathname + location.search);
}

function irASeccion(id, suave = false, enfocar = false) {
  const objetivo = document.getElementById(id);
  if (!objetivo) return;
  if (enfocar) {
    if (!objetivo.hasAttribute('tabindex')) objetivo.tabIndex = -1;
    objetivo.focus({ preventScroll: true });
  }
  objetivo.scrollIntoView({ behavior: suave && !reducirMovimiento() ? 'smooth' : 'instant', block: 'start' });
}

export function alinearLlegada() {
  if (!llegada) return;
  const id = llegada;
  llegada = '';
  let movida = false;
  const cancelar = () => { movida = true; };
  const eventos = ['wheel', 'touchstart', 'keydown', 'pointerdown'];
  eventos.forEach(e => window.addEventListener(e, cancelar, { passive: true, once: true }));
  const terminar = () => {
    if (!movida) irASeccion(id);
    eventos.forEach(e => window.removeEventListener(e, cancelar));
  };
  irASeccion(id);
  if (document.readyState === 'complete') terminar();
  else window.addEventListener('load', terminar, { once: true });
}

export function initNavegacion() {
  consumirAncla();
  document.addEventListener('click', evento => {
    const control = evento.target.closest('[data-scroll]');
    if (!control) return;
    evento.preventDefault();
    irASeccion(control.dataset.scroll, true, true);
  });
  window.addEventListener('hashchange', () => { consumirAncla(); alinearLlegada(); });
}
