/** Pequeñas piezas que comparten los módulos de la landing. */

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Escapa texto para meterlo en un template HTML. */
export const esc = (texto) => String(texto).replace(/[&<>"']/g, (c) => ESCAPES[c]);

/**
 * Marca un contenedor de pestañas con `hay-mas-izq` / `hay-mas-der` según tenga
 * pestañas ocultas por scroll, para que el CSS dibuje un degradé de aviso.
 */
export function marcarDesborde(contenedor) {
  const actualizar = () => {
    contenedor.classList.toggle('hay-mas-izq', contenedor.scrollLeft > 4);
    contenedor.classList.toggle(
      'hay-mas-der',
      contenedor.scrollLeft + contenedor.clientWidth < contenedor.scrollWidth - 4
    );
  };
  contenedor.addEventListener('scroll', actualizar, { passive: true });
  window.addEventListener('resize', actualizar);
  actualizar();
}

/** ¿La persona pidió menos movimiento? (sin autoplay ni transiciones largas) */
export const reducirMovimiento = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
