/**
 * Pie de página, botón "Top" y video de la banda "Hello, Tomorrow".
 *
 * El pie (cmp__footer en gwm-mx.com) tiene sus columnas de enlaces armadas desde el catálogo: en
 * escritorio van todas abiertas y en celular cada una es un acordeón. Corre en la landing y en las fichas.
 */
import { CATEGORIAS, MODELOS } from '../modelos.js';
import { enlaceWhatsApp } from '../whatsapp.js';
import { esc, reducirMovimiento } from './util.js';

const CHEVRON =
  '<svg class="dropdown-btns" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m3 5.5 4 4 4-4" /></svg>';

function columnas() {
  return [
    {
      titulo: 'MODELOS',
      enlaces: [
        { texto: 'Todos los vehículos', href: '/modelos' },
        { texto: 'Híbridos HEV y PHEV', href: '/hibridos' },
        { texto: 'Eléctricos ORA', href: '/electricos' },
        { texto: 'Pickups Wingle y Poer', href: '/pickups' },
      ],
    },
    {
      titulo: 'COMPRA',
      enlaces: [
        { texto: 'Cotizá por WhatsApp', href: enlaceWhatsApp('Hola. Quiero cotizar un GWM'), externo: true },
        { texto: 'Puntos de venta', href: '/concesionarios' },
        { texto: 'HEV, PHEV o eléctrico', href: '/guia/hev-vs-phev' },
        { texto: 'Carga en casa', href: '/guia/carga-en-casa' },
      ],
    },
    {
      titulo: 'POSTVENTA',
      enlaces: [
        { texto: 'Agendá tu mantenimiento', href: '/#postventa' },
        { texto: 'Servicios', href: '/#servicios' },
        { texto: 'Reclamos', href: '/#reclamos' },
        { texto: 'Garantía y mantenimiento', href: '/postventa' },
      ],
    },
    {
      titulo: 'GRUPO SANTA ROSA',
      enlaces: [
        { texto: 'Santa Rosa', href: 'https://www.santarosa.com.py/', externo: true },
        { texto: 'Instagram', href: 'https://www.instagram.com/gwmpy/', externo: true },
        { texto: 'Facebook', href: 'https://www.facebook.com/GreatWallPamosa/', externo: true },
      ],
    },
  ];
}

function htmlColumna(col, i) {
  const enlaces = col.enlaces
    .map((e) => {
      const atributos = [
        `href="${esc(e.href)}"`,
        e.modelo ? `data-modelo="${esc(e.modelo)}"` : '',
        e.externo ? 'target="_blank" rel="noopener"' : '',
      ]
        .filter(Boolean)
        .join(' ');
      return `<li class="menu-dd fs-button-m fw-bold"><a ${atributos}>${esc(e.texto)}</a></li>`;
    })
    .join('');
  return `
    <div class="menu-item">
      <button class="menu-dt fs-button-m fw-bold" type="button" aria-expanded="false" aria-controls="pie-${i}">
        ${col.titulo}${CHEVRON}
      </button>
      <ul class="menu-dd-lista" id="pie-${i}">${enlaces}</ul>
    </div>`;
}

export const htmlMenuPie = () => columnas().map(htmlColumna).join('');

function initMenuPie() {
  const caja = document.querySelector('[data-menu-pie]');
  if (!caja) return;
  caja.innerHTML = htmlMenuPie();

  // Escritorio: todo abierto y los títulos no son botones. Celular: acordeón.
  const celular = window.matchMedia('(max-width: 767px)');
  const botones = [...caja.querySelectorAll('.menu-dt')];
  const ajustar = () => {
    botones.forEach((b) => {
      b.disabled = !celular.matches;
      b.setAttribute('aria-expanded', String(!celular.matches));
      b.parentElement.classList.toggle('is-open', !celular.matches);
    });
  };
  celular.addEventListener('change', ajustar);
  ajustar();

  caja.addEventListener('click', (e) => {
    const boton = e.target.closest('.menu-dt');
    if (!boton || !celular.matches) return;
    const abrir = boton.getAttribute('aria-expanded') !== 'true';
    boton.setAttribute('aria-expanded', String(abrir));
    boton.parentElement.classList.toggle('is-open', abrir);
  });
}

/** Botón "Top": aparece al bajar una pantalla y vuelve al principio. */
function initTop() {
  const caja = document.querySelector('.cmp__gotop');
  const boton = caja?.querySelector('.top-btn');
  if (!boton) return;
  const actualizar = () => (caja.hidden = window.scrollY < window.innerHeight * 0.8);
  window.addEventListener('scroll', actualizar, { passive: true });
  actualizar();
  boton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reducirMovimiento() ? 'auto' : 'smooth' }));
}

/** El video de "Hello, Tomorrow" no se descarga hasta que entra en pantalla, y se pausa al salir. */
function initVideoFondo() {
  const video = document.querySelector('[data-video-fondo]');
  if (!video || !('IntersectionObserver' in window) || reducirMovimiento() || navigator.connection?.saveData || window.matchMedia('(max-width: 767px)').matches) return;

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) {
          video.pause();
          return;
        }
        if (video.dataset.src) {
          video.src = video.dataset.src;
          delete video.dataset.src;
        }
        video.play().catch(() => {});
      });
    },
    { threshold: 0.25 }
  );
  observador.observe(video);
}

export function initPie() {
  initMenuPie();
  initTop();
  initVideoFondo();
}
