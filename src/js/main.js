import 'bootstrap/dist/css/bootstrap.min.css';
// CSS completo de Splide (core + tema por defecto), igual que gwm.com.uy:
// el core solo no trae los estilos de las flechas.
import '@splidejs/splide/css';
import '../css/styles.css';

import { Dropdown, Collapse } from 'bootstrap';
import Splide from '@splidejs/splide';
import { CATEGORIAS, MODELOS, SLIDES_ACTIVOS, formatearPrecio, textoPrecio } from './modelos.js';

const WHATSAPP = '595976955836';

/** Splide reproduce el slide activo; los spots duran ~5 s, de ahí el intervalo. */
const INTERVALO_SLIDER = 6000;

/* ==========================================================================
   Megamenú de modelos (columna de categorías + grilla, como en gwm.com.uy)
   ========================================================================== */
function initMegamenu() {
  const menu = document.querySelector('[data-megamenu]');
  if (!menu) return;

  menu.innerHTML = `
    <div class="d-none d-lg-flex">
      <div class="brand-list text-white text-center py-3" style="flex: 0 0 20%;">
        <ul class="list-group list-group-flush">
          ${CATEGORIAS.map(
            (cat, i) => `
            <li class="list-group-item brand-item${i === 0 ? ' active' : ''}"
                data-brand="${cat.id}" style="width: 100%; cursor: pointer;">
              ${cat.titulo.toUpperCase()}
            </li>`
          ).join('')}
        </ul>
      </div>
      ${CATEGORIAS.map(
        (cat, i) => `
        <section id="menu-${cat.id}" class="header-models-section${i === 0 ? '' : ' d-none'}" style="width: 100%;">
          <div class="bg-light p-3 flex-fill" style="min-height: 210px;">
            ${MODELOS.filter((m) => m.categoria === cat.id)
              .map(
                (m) => `
              <a class="header-model d-inline-block p-3" href="${m.url}" target="_blank" rel="noopener">
                <img class="d-block w-100" src="${m.imagen}" alt="GWM ${m.nombre}" loading="lazy" width="480" height="190">
                <span class="ellipsis">${m.nombre}</span>
              </a>`
              )
              .join('')}
          </div>
        </section>`
      ).join('')}
    </div>

    <!-- En mobile el megamenú se aplana a una lista simple -->
    <div class="d-lg-none bg-black py-2">
      ${CATEGORIAS.map(
        (cat) => `
        <div class="px-3 py-2">
          <div class="text-white fw-bold small text-uppercase mb-1">${cat.titulo}</div>
          ${MODELOS.filter((m) => m.categoria === cat.id)
            .map(
              (m) =>
                `<a class="d-block py-1 text-decoration-none" style="color:#888" href="${m.url}"
                    target="_blank" rel="noopener">${m.nombre}</a>`
            )
            .join('')}
        </div>`
      ).join('')}
    </div>`;

  menu.querySelectorAll('.brand-item').forEach((item) => {
    const mostrar = () => {
      menu.querySelectorAll('.brand-item').forEach((b) => b.classList.toggle('active', b === item));
      menu.querySelectorAll('.header-models-section').forEach((s) =>
        s.classList.toggle('d-none', s.id !== `menu-${item.dataset.brand}`)
      );
    };
    item.addEventListener('mouseenter', mostrar);
    item.addEventListener('click', mostrar);
  });
}

/* ==========================================================================
   Hero — slider Splide con los spots de gwm-mx.com
   ========================================================================== */

/** Capa de video de un slide; sin `src` hasta que el slide se activa. */
function capaVideo(src, poster) {
  if (!src) return '';
  return `<video class="slide-media" muted loop playsinline preload="none"
                 poster="${poster}" data-src="${src}" aria-hidden="true"></video>`;
}

function initHero() {
  const pista = document.querySelector('[data-slides]');
  if (!pista) return;

  pista.innerHTML = SLIDES_ACTIVOS.map((s) => {
    // Los modelos sin precio confirmado para Paraguay muestran "Consultar".
    const precio = s.precio === null ? null : formatearPrecio(s.precio).replace('USD ', '');
    const bloquePrecio = (clases) =>
      precio === null
        ? `<div class="hero-model-price ${clases}" style="border: none;">
             <div class="hero-model-price-amount">Consultar precio</div>
           </div>`
        : `<div class="hero-model-price ${clases}">
             <span class="d-block" style="margin-top: -12px">Desde</span>
             <div class="hero-model-price-amount">USD <span>${precio}</span></div>
           </div>`;
    return `
      <div class="splide__slide">
        <!-- Desktop: recorte 16:9 -->
        <div class="d-none d-md-flex slide bg align-items-end justify-content-center"
             style="background-image: url('${s.imagen}')">
          ${capaVideo(s.video, s.imagen)}
          <div class="slide-overlay"></div>
          <div class="d-flex flex-wrap justify-content-center align-items-center px-2 py-3 position-relative">
            <div class="hero-model-price text-white ms-3" style="border: none;">
              <div class="hero-model-price-amount"><span>${s.modelo}</span></div>
            </div>
            ${bloquePrecio('ms-3')}
            <a href="${s.url}" target="_blank" rel="noopener" class="btn btn-white ms-4 mt-3 mt-sm-0">
              DESCUBRILO AHORA
            </a>
          </div>
        </div>

        <!-- Mobile: recorte 9:16 -->
        <div class="d-md-none d-flex slide bg align-items-end justify-content-start"
             style="background-image: url('${s.imagenMobile || s.imagen}')">
          ${capaVideo(s.videoMobile, s.imagenMobile || s.imagen)}
          <div class="slide-overlay"></div>
          <div class="d-flex flex-wrap justify-content-start align-items-start px-2 py-3 position-relative"
               style="flex-direction: column;">
            <div class="hero-model-price text-white ms-3" style="border: none;">
              <div class="hero-model-price-amount">${s.modelo}</div>
            </div>
            ${bloquePrecio('mt-2 ms-3')}
            <a href="${s.url}" target="_blank" rel="noopener" class="btn btn-white ms-3 mt-3">
              DESCUBRILO AHORA
            </a>
          </div>
        </div>
      </div>`;
  }).join('');

  const splide = new Splide('#home-slider', {
    type: 'loop',
    autoplay: true,
    interval: INTERVALO_SLIDER,
    pagination: false,
    focus: 'center',
    breakpoints: { 768: { perPage: 1 } },
  });

  // Solo el slide activo reproduce, y de sus dos recortes solo el que está
  // visible en este breakpoint: así nunca se descargan los dos videos a la vez.
  const sincronizarVideos = () => {
    document.querySelectorAll('#home-slider video').forEach((v) => {
      const slide = v.closest('.splide__slide');
      // En modo loop Splide duplica los slides de los extremos: si se aceptaran
      // los clones se reproduciría dos veces el mismo spot.
      const enPantalla =
        slide?.classList.contains('is-active') && !slide.classList.contains('splide__slide--clone');
      if (!enPantalla || v.offsetParent === null) {
        v.pause();
        return;
      }
      if (v.dataset.src) {
        v.src = v.dataset.src;
        delete v.dataset.src;
        // Recién asignado el src todavía no hay datos: reintentar al estar listo.
        v.addEventListener('canplay', () => v.play().catch(() => {}), { once: true });
      }
      v.play().catch(() => {
        /* si el navegador bloquea el autoplay queda el poster */
      });
    });
  };

  // `moved` es el que importa: las clases is-active/is-visible recién quedan
  // firmes al terminar la transición. Los otros eventos solo adelantan la carga.
  splide.on('mounted active move moved resized', sincronizarVideos);
  splide.mount();

  // Referencia accesible desde el DOM para control externo y depuración.
  document.querySelector('#home-slider').splide = splide;
}

/* ==========================================================================
   Video de fondo de la banda de marca
   ========================================================================== */
function initVideoFondo() {
  const video = document.querySelector('[data-video-fondo]');
  if (!video || !('IntersectionObserver' in window)) return;

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

/* ==========================================================================
   Modelos por categoría
   ========================================================================== */
function initModelos() {
  const barra = document.querySelector('[data-categorias]');
  const grilla = document.querySelector('[data-modelos]');
  if (!barra || !grilla) return;

  barra.innerHTML = CATEGORIAS.map(
    (cat, i) => `
    <button class="model-category-button text-black${i === 0 ? ' active' : ''}" type="button"
            data-category="${cat.id}" aria-pressed="${i === 0}">${cat.titulo}</button>`
  ).join('');

  grilla.innerHTML = MODELOS.map(
    (m) => `
    <a href="${m.url}" target="_blank" rel="noopener" class="model text-black" data-category="${m.categoria}">
      <div class="model-name d-flex align-items-center">
        ${m.nombre}
        <span class="icon-plus fw-normal text-white ms-2" aria-hidden="true">✚</span>
      </div>
      <div class="model-price">${textoPrecio(m.precio)}</div>
      ${m.versiones ? `<div class="model-versiones">${m.versiones.join(' · ')}</div>` : ''}
      <img class="model-foto w-100 pt-3" src="${m.imagen}" alt="GWM ${m.nombre}" loading="lazy" width="480" height="190">
    </a>`
  ).join('');

  function mostrarCategoria(id) {
    barra.querySelectorAll('.model-category-button').forEach((b) => {
      const activo = b.dataset.category === id;
      b.classList.toggle('active', activo);
      b.setAttribute('aria-pressed', String(activo));
    });
    grilla.querySelectorAll('.model').forEach((m) => {
      m.classList.toggle('d-none', m.dataset.category !== id);
    });
  }

  barra.addEventListener('click', (evento) => {
    const boton = evento.target.closest('.model-category-button');
    if (boton) mostrarCategoria(boton.dataset.category);
  });

  mostrarCategoria(CATEGORIAS[0].id);
}

/* ==========================================================================
   Formulario de contacto
   ========================================================================== */
function initFormulario() {
  const form = document.querySelector('#contact');
  if (!form) return;

  const select = form.querySelector('[name="model"]');
  select.insertAdjacentHTML(
    'beforeend',
    CATEGORIAS.map(
      (cat) =>
        `<optgroup label="${cat.titulo}">` +
        MODELOS.filter((m) => m.categoria === cat.id)
          .map((m) => `<option value="${m.nombre}">${m.nombre}</option>`)
          .join('') +
        '</optgroup>'
    ).join('')
  );

  const estado = form.querySelector('[data-estado]');

  form.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    if (!form.reportValidity()) return;

    const datos = Object.fromEntries(new FormData(form));
    const endpoint = import.meta.env.VITE_LEADS_ENDPOINT;

    // Con backend configurado el lead se envía por POST; si no, se deriva al
    // WhatsApp oficial, que es el canal de contacto del sitio.
    if (endpoint) {
      estado.textContent = 'Enviando...';
      try {
        const respuesta = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datos),
        });
        if (!respuesta.ok) throw new Error(respuesta.statusText);
        estado.textContent = 'Gracias, recibimos tu consulta. Te contactamos a la brevedad.';
        form.reset();
      } catch {
        estado.textContent = 'No pudimos enviar tu consulta. Escribinos por WhatsApp.';
      }
      return;
    }

    const mensaje = [
      'Hola, quiero recibir información de GWM.',
      `Nombre: ${datos.name}`,
      `Teléfono: ${datos.phone}`,
      `Email: ${datos.email}`,
      `Modelo de interés: ${datos.model}`,
      datos.message ? `Consulta: ${datos.message}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`, '_blank', 'noopener');
    estado.textContent = 'Abrimos WhatsApp con tu consulta lista para enviar.';
  });
}

/* ==========================================================================
   Arranque
   ========================================================================== */
initMegamenu();
initHero();
initVideoFondo();
initModelos();
initFormulario();

// Al elegir una sección desde el menú mobile, cerrar el desplegable.
const navColapsable = document.querySelector('#navbarSupportedContent');
if (navColapsable) {
  const colapso = Collapse.getOrCreateInstance(navColapsable, { toggle: false });
  navColapsable.querySelectorAll('a[href^="#"]').forEach((enlace) => {
    enlace.addEventListener('click', () => colapso.hide());
  });
}

// Bootstrap se importa entero para el dropdown del megamenú.
document.querySelectorAll('[data-bs-toggle="dropdown"]').forEach((el) => new Dropdown(el));
