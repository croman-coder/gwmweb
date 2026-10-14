/** Tarjetas de servicios de postventa. El catálogo completo vive en descubrir.js. */
import { DEALERS } from '../concesionarios.js';
import { SERVICIOS } from '../postventa.js';
import { esc } from './util.js';

function initPostventa() {
  const caja = document.querySelector('[data-postventa]');
  if (!caja) return;
  const ciudades = new Set(DEALERS.map((d) => d.ciudad)).size;
  const tarjetas = [
    {
      titulo: 'Mantenimiento',
      subtitulo: 'Agendá tu turno online.',
      texto: 'Elegí el servicio que necesita tu GWM y completá el formulario: te contactamos a la brevedad.',
      enlace: '/#postventa',
      cta: 'Agendar',
      imagen: '/img/hero/agenda-mantenimiento.jpg',
      alt: 'Un técnico revisando un GWM en el taller',
    },
    {
      titulo: `${SERVICIOS.length} servicios`,
      subtitulo: 'Para cada necesidad de tu GWM.',
      texto: `${SERVICIOS.slice(0, 4).join(', ')} y más.`,
      enlace: '/#postventa',
      cta: 'Ver servicios',
      imagen: '/img/poster/hello-tomorrow.webp',
      alt: 'Un taller de GWM',
    },
    {
      titulo: `${DEALERS.length} puntos de venta`,
      subtitulo: `En ${ciudades} ciudades de Paraguay.`,
      texto: 'Encontrá la concesionaria GWM más cercana, con su dirección, teléfonos y horarios.',
      enlace: '/concesionarios',
      cta: 'Encontrar',
      imagen: '/img/hero/puntos-de-venta.webp',
      alt: 'Un Haval frente a una concesionaria',
    },
  ];
  caja.innerHTML = tarjetas
    .map(
      (t) => `
      <div class="msl-swiper-item">
        <div class="item-box">
          <div class="source-box">
            <img src="${t.imagen}" alt="${esc(t.alt)}" loading="lazy" />
          </div>
          <div class="context">
            <div class="context-box">
              <p class="title fs-title-h2 fw-bold">${esc(t.titulo)}</p>
              <div class="subtitle fs-title-h3 fw-bold">${esc(t.subtitulo)}</div>
              <p class="des fs-text-body">${esc(t.texto)}</p>
              <a class="context-btn button--primary size-medium light" href="${t.enlace}">
                <span class="red-arrow-above fs-button-m fw-bold">${esc(t.cta)}</span>
              </a>
            </div>
          </div>
        </div>
      </div>`
    )
    .join('');
}

export function initCatalogo() {
  initPostventa();
}
