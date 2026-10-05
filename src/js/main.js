import 'bootstrap/dist/css/bootstrap.min.css';
// CSS completo de Splide (core + tema por defecto), igual que gwm.com.uy:
// el core solo no trae los estilos de las flechas.
import '@splidejs/splide/css';
import '../css/styles.css';

import { Dropdown, Collapse } from 'bootstrap';
import Splide from '@splidejs/splide';
import { CATEGORIAS, MODELOS, SLIDES_ACTIVOS, formatearPrecio, textoPrecio } from './modelos.js';
import { DEALERS, CIUDADES, telHref, mapaHref } from './concesionarios.js';
import { SERVICIOS, WHATSAPP_POSTVENTA, RECLAMOS } from './postventa.js';

const WHATSAPP = '595976955836';

/** WhatsApp de ventas con el modelo ya nombrado en el mensaje. */
const whatsappModelo = (nombre) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hola, quiero información sobre el GWM ${nombre}.`)}`;

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
          <div class="bg-white p-3 flex-fill" style="min-height: 210px;">
            ${MODELOS.filter((m) => m.categoria === cat.id)
              .map(
                (m) => `
              <a class="header-model d-inline-block p-3" href="${whatsappModelo(m.nombre)}" target="_blank" rel="noopener"
                 title="Consultar por WhatsApp">
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
                `<a class="d-block py-1 text-decoration-none" style="color:#888"
                    href="${whatsappModelo(m.nombre)}" target="_blank" rel="noopener">${m.nombre}</a>`
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
            <a href="${whatsappModelo(s.modelo)}" target="_blank" rel="noopener" title="Consultar por WhatsApp"
               class="btn btn-white ms-4 mt-3 mt-sm-0">
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
            <a href="${whatsappModelo(s.modelo)}" target="_blank" rel="noopener" title="Consultar por WhatsApp"
               class="btn btn-white ms-3 mt-3">
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
    <button class="model-category-button${i === 0 ? ' active' : ''}" type="button"
            data-category="${cat.id}" aria-pressed="${i === 0}">${cat.titulo}</button>`
  ).join('');

  grilla.innerHTML = MODELOS.map(
    (m) => `
    <a href="${whatsappModelo(m.nombre)}" target="_blank" rel="noopener" title="Consultar por WhatsApp"
       class="model text-black" data-category="${m.categoria}">
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

  marcarDesborde(barra);
  mostrarCategoria(CATEGORIAS[0].id);
}

/**
 * Marca un contenedor de pestañas con `hay-mas-izq` / `hay-mas-der` según tenga
 * pestañas ocultas por scroll, para que el CSS dibuje un degradé de aviso.
 */
function marcarDesborde(contenedor) {
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

/* ==========================================================================
   Envío de solicitudes de formulario (hoy, el de agendamiento de service)
   ========================================================================== */

/**
 * Con backend configurado (VITE_LEADS_ENDPOINT) la solicitud se envía por POST
 * en JSON, con un campo `tipo` que identifica el formulario de origen. Sin
 * backend se abre el WhatsApp indicado con el mensaje ya armado.
 *
 * En la rama de WhatsApp no hay ningún `await` antes de `window.open`, así que
 * la apertura sigue contando como gesto del usuario y los navegadores móviles
 * no la bloquean.
 */
async function enviarSolicitud({ form, datos, whatsapp, mensaje, textos }) {
  const estado = form.querySelector('[data-estado]');
  const endpoint = import.meta.env.VITE_LEADS_ENDPOINT;

  if (endpoint) {
    estado.textContent = 'Enviando...';
    try {
      const respuesta = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      });
      if (!respuesta.ok) throw new Error(respuesta.statusText);
      estado.textContent = textos.ok;
      form.reset();
    } catch {
      estado.textContent = textos.error;
    }
    return;
  }

  window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(mensaje)}`, '_blank', 'noopener');
  estado.textContent = textos.whatsapp;
}

/** <optgroup> por submarca con todos los modelos del catálogo. */
function opcionesModelos() {
  return CATEGORIAS.map(
    (cat) =>
      `<optgroup label="${cat.titulo}">` +
      MODELOS.filter((m) => m.categoria === cat.id)
        .map((m) => `<option value="${m.nombre}">${m.nombre}</option>`)
        .join('') +
      '</optgroup>'
  ).join('');
}

/* ==========================================================================
   Puntos de venta: slider de concesionarias con filtro por ciudad
   ========================================================================== */
const ICONOS = {
  pin: '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false"><path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/><path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/></svg>',
  phone:
    '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false"><path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/></svg>',
  clock:
    '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false"><path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/></svg>',
};

function tarjetaDealer(d) {
  const telefonos = d.telefonos.map((t) => `<a href="${telHref(t)}">${t}</a>`).join('');
  const tipos = d.tipos.map((t) => `<li>${t}</li>`).join('');
  const nombreCompleto = `${d.marca} ${d.nombre}`;

  return `
    <li class="splide__slide">
      <article class="dealer">
        <header class="dealer__cabecera">
          <span class="dealer__ciudad">${d.ciudad}</span>
          <p class="dealer__marca">${d.marca}</p>
          <h3 class="dealer__nombre">${d.nombre}</h3>
          <span class="dealer__deco">${ICONOS.pin}</span>
        </header>
        <div class="dealer__cuerpo">
          <ul class="dealer__tipos">${tipos}</ul>
          <ul class="dealer__datos">
            <li><span class="dealer__icono">${ICONOS.pin}</span><span>${d.direccion}</span></li>
            <li><span class="dealer__icono">${ICONOS.phone}</span><span class="dealer__telefonos">${telefonos}</span></li>
            <li><span class="dealer__icono">${ICONOS.clock}</span><span>${d.horario}</span></li>
          </ul>
          <div class="dealer__acciones">
            <a class="dealer__boton dealer__boton--solido" href="${mapaHref(d)}" target="_blank" rel="noopener"
               aria-label="Cómo llegar a ${nombreCompleto} (se abre en una pestaña nueva)">Cómo llegar</a>
            <a class="dealer__boton" href="${telHref(d.telefonos[0])}"
               aria-label="Llamar a ${nombreCompleto}">Llamar</a>
          </div>
        </div>
      </article>
    </li>`.trim();
}

function initConcesionarios() {
  const raiz = document.querySelector('#dealers-slider');
  const filtro = document.querySelector('[data-ciudades]');
  const lista = raiz?.querySelector('[data-dealers]');
  if (!raiz || !filtro || !lista) return;

  const dealersDe = (ciudad) => DEALERS.filter((d) => ciudad === 'todas' || d.ciudad === ciudad);

  lista.innerHTML = dealersDe('todas').map(tarjetaDealer).join('');

  const splide = new Splide(raiz, {
    perPage: 3,
    gap: '1.5rem',
    speed: 500,
    easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
    breakpoints: {
      1100: { perPage: 2 },
      700: { perPage: 1, gap: '1rem', padding: { right: '12%' } },
    },
    i18n: {
      prev: 'Anterior',
      next: 'Siguiente',
      first: 'Ir al primero',
      last: 'Ir al último',
      slideX: 'Ir a la diapositiva %s',
      pageX: 'Ir a la página %s',
      slide: 'diapositiva',
      slideLabel: '%s de %s',
      carousel: 'carrusel',
      select: 'Elegir una diapositiva para mostrar',
    },
  }).mount();

  // En celular (una tarjeta por página) el track toma el alto de la tarjeta
  // activa, en lugar del de la más alta. Ver el comentario en el CSS.
  const movil = window.matchMedia('(max-width: 700px)');
  const track = raiz.querySelector('.splide__track');
  function seguirAlto(indice = splide.index) {
    if (!movil.matches) {
      track.style.height = '';
      return;
    }
    const slide = splide.Components.Slides.getAt(indice)?.slide;
    if (!slide) return;
    const estilo = getComputedStyle(track);
    const relleno = parseFloat(estilo.paddingTop) + parseFloat(estilo.paddingBottom);
    track.style.height = `${slide.offsetHeight + relleno}px`;
  }
  splide.on('move refresh resized', seguirAlto);
  movil.addEventListener('change', () => seguirAlto());
  document.fonts?.ready.then(() => seguirAlto()); // la tipografía cambia los altos
  seguirAlto();

  // Mismo patrón de pestañas que el selector de modelos.
  filtro.innerHTML = ['Todos', ...CIUDADES]
    .map(
      (ciudad, i) => `
      <button class="model-category-button${i === 0 ? ' active' : ''}" type="button"
              data-ciudad="${i === 0 ? 'todas' : ciudad}" aria-pressed="${i === 0}">${ciudad}</button>`
    )
    .join('');
  marcarDesborde(filtro);

  filtro.addEventListener('click', (evento) => {
    const boton = evento.target.closest('.model-category-button');
    if (!boton) return;

    // En celular las cuatro pestañas no entran: la elegida se centra.
    boton.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });

    filtro.querySelectorAll('.model-category-button').forEach((b) => {
      const activo = b === boton;
      b.classList.toggle('active', activo);
      b.setAttribute('aria-pressed', String(activo));
    });

    splide.remove('.splide__slide');
    splide.add(dealersDe(boton.dataset.ciudad).map(tarjetaDealer));
    splide.go(0);
    seguirAlto(0);
  });
}

/* ==========================================================================
   Postventa: agendamiento de service
   ========================================================================== */
function initAgenda() {
  const form = document.querySelector('[data-form-agenda]');
  if (!form) return;

  form.querySelector('[name="modelo"]').insertAdjacentHTML('beforeend', opcionesModelos());

  form.querySelector('[data-servicios]').innerHTML = SERVICIOS.map(
    (servicio) => `
      <label class="agenda__chip">
        <input type="radio" name="servicio" value="${servicio}" required />
        <span>${servicio}</span>
      </label>`
  ).join('');

  // Límites que dependen de la fecha de hoy: el año del vehículo no puede ser
  // futuro (se admite el del año próximo, porque los modelos salen antes) y no
  // se agenda para un día que ya pasó.
  const hoy = new Date();
  const anio = form.querySelector('[name="anio"]');
  anio.min = 2000;
  anio.max = hoy.getFullYear() + 1;
  const hoyIso = new Date(hoy.getTime() - hoy.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  form.querySelector('[name="fecha"]').min = hoyIso;

  const reclamos = document.querySelector('[data-reclamos]');
  if (reclamos) {
    reclamos.innerHTML = `¿Tenés un reclamo? Contactá a Customer Experience:
      <a href="${RECLAMOS.telHref}">${RECLAMOS.telefono}</a> ·
      <a href="mailto:${RECLAMOS.email}">${RECLAMOS.email}</a>`;
  }

  form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    if (!form.reportValidity()) return;

    const datos = { tipo: 'agendamiento', ...Object.fromEntries(new FormData(form)) };
    const fecha = datos.fecha ? datos.fecha.split('-').reverse().join('/') : '';
    const mensaje = [
      'Hola, quiero agendar un service para mi GWM.',
      `Nombre: ${datos.nombre}`,
      `Teléfono: ${datos.telefono}`,
      `Email: ${datos.email}`,
      `Modelo: ${datos.modelo}`,
      `Año: ${datos.anio}`,
      `Servicio: ${datos.servicio}`,
      fecha ? `Fecha preferida: ${fecha}` : '',
      datos.comentarios ? `Comentarios: ${datos.comentarios}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    enviarSolicitud({
      form,
      datos,
      whatsapp: WHATSAPP_POSTVENTA,
      mensaje,
      textos: {
        ok: 'Gracias, recibimos tu solicitud de service. Te contactamos a la brevedad.',
        error: 'No pudimos enviar tu solicitud. Escribinos por WhatsApp.',
        whatsapp: 'Abrimos WhatsApp con tu solicitud lista para enviar.',
      },
    });
  });
}

/* ==========================================================================
   Arranque
   ========================================================================== */
initMegamenu();
initHero();
initVideoFondo();
initModelos();
initConcesionarios();
initAgenda();

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
