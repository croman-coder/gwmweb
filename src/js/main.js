// CSS completo de Splide (core + tema por defecto): el core solo no trae los estilos de las flechas.
import '@splidejs/splide/css';
import '../css/styles.css';

import Splide from '@splidejs/splide';
import { CATEGORIAS, MODELOS } from './modelos.js';
import { DEALERS, CIUDADES, telHref, mapaHref } from './concesionarios.js';
import { SERVICIOS, WHATSAPP_POSTVENTA, RECLAMOS } from './postventa.js';
import { initCabecera } from './home/cabecera.js';
import { initHero } from './home/hero.js';
import { initCatalogo } from './home/catalogo.js';
import { initPie } from './home/pie.js';
import { marcarDesborde } from './home/util.js';
import '../css/mejoras.css';
import '../css/diseno.css';
import { htmlDestacadosHome, htmlGuiasHome } from './render/catalogo.js';
import { initDescubrir } from './descubrir.js';
import { initLeads } from './leads.js';
import { initMedicion, medir, campana } from './medicion.js';

/*
 * La cabecera, el hero, el selector de modelos, los destacados, postventa y el pie siguen la
 * arquitectura de gwm-mx.com y viven en ./home/. Acá quedan las secciones propias de Paraguay
 * (puntos de venta y agendamiento de service) y el arranque.
 */

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
      medir('consulta_recibida', { tipo: datos.tipo });
      form.reset();
    } catch {
      estado.textContent = textos.error;
    }
    return;
  }

  window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(mensaje)}`, '_blank', 'noopener');
  medir('whatsapp_click', { tipo: datos.tipo });
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

  // Pestañas con subrayado, con el mismo patrón que el selector de modelos de gwm-mx.com.
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

    const datos = { tipo: 'agendamiento', ...Object.fromEntries(new FormData(form)), pagina: location.pathname, campana: campana() };
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
   Arranque. La landing vive en "/" y cada ficha de modelo en "/modelos/<slug>":
   nginx devuelve el HTML de la ficha (o index.html; ver nginx.conf) y acá se decide
   qué se arma. En las fichas un script del <head> ya ocultó la landing.
   ========================================================================== */
/**
 * Llegada a la landing con "#seccion" (por ejemplo desde el menú de una ficha). El navegador salta al ancla
 * apenas la encuentra, cuando las secciones armadas por JS todavía no tienen su alto: queda corto. Se vuelve
 * a alinear ya armadas, y de nuevo al terminar de cargar, salvo que la persona ya haya empezado a moverse.
 */
function alinearConAncla() {
  const id = decodeURIComponent(location.hash.slice(1));
  const raiz = document.documentElement;
  if (!id) return;
  let movida = false;
  const alinear = () => document.getElementById(id)?.scrollIntoView();
  const terminar = () => {
    if (!movida) alinear();
    raiz.classList.remove('llegada-con-ancla');
  };
  ['wheel', 'touchstart', 'keydown'].forEach((e) => window.addEventListener(e, () => (movida = true), { once: true, passive: true }));
  alinear();
  if (document.readyState === 'complete') terminar();
  else window.addEventListener('load', terminar, { once: true });
}

const rutaFicha = location.pathname.match(/^\/modelos\/([^/]+)\/?$/);

// La cabecera y el pie son los mismos en la landing y en las fichas.
initCabecera();
initPie();
initMedicion();
initLeads();

if (rutaFicha) {
  // La ficha (y su contenido y estilos) se baja aparte: la landing no paga su peso.
  import('./ficha.js')
    .then(({ initFicha }) => initFicha(decodeURIComponent(rutaFicha[1])))
    .catch(() => {
      document.querySelector('#ficha').innerHTML =
        '<p style="padding: 96px 24px; text-align: center">No pudimos cargar la ficha. Probá recargar la página.</p>';
    });
} else if (location.pathname !== '/') {
  import('./paginas.js').then(async ({ PAGINAS, htmlPagina }) => {
    const ruta = location.pathname.replace(/\/$/, '');
    const p = PAGINAS[ruta];
    const contenedor = document.querySelector('#ficha');
    if (!contenedor.hasChildNodes()) contenedor.innerHTML = htmlPagina(ruta);
    if (p) {
      const { SITIO } = await import('./sitio.js');
      document.title = `${p.titulo} | GWM Paraguay`;
      document.querySelector('meta[name="description"]').content = p.descripcion;
      document.querySelector('link[rel="canonical"]').href = SITIO + ruta;
    } else {
      document.title = 'Página no encontrada | GWM Paraguay';
      document.querySelector('meta[name="robots"]').content = 'noindex, follow';
    }
    initDescubrir();
  });
} else {
  const catalogo = document.querySelector('[data-catalogo-home]');
  if (catalogo) catalogo.outerHTML = htmlDestacadosHome();
  const guias = document.querySelector('[data-guias-home]');
  if (guias) guias.outerHTML = htmlGuiasHome();
  initHero();
  initCatalogo();
  initDescubrir();
  initConcesionarios();
  initAgenda();
  alinearConAncla();
}
