/**
 * Cabecera de la landing y de las fichas, con la arquitectura de la de gwm-mx.com.
 *
 * Escritorio: MODELOS abre un panel con filtros (motor y carrocería) a la izquierda y todos los modelos
 * por submarca a la derecha; POSTVENTA abre sus columnas. Se abren con el mouse y con el teclado.
 * Celular: menú hamburguesa que ocupa la pantalla, con MODELOS y POSTVENTA desplegables.
 *
 * El esqueleto está en index.html; los listados de modelos salen del catálogo (modelos.js).
 */
import { CATEGORIAS, MODELOS, TIPOS_MOTOR, CARROCERIAS, formatearPrecio, urlFicha } from '../modelos.js';
import { enlaceWhatsApp } from '../whatsapp.js';
import { esc } from './util.js';

const MAS =
  '<svg class="mas" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M7 2v10M2 7h10" /></svg>';
const textoPrecio = (m) => (m.precio === null ? 'Consultar precio' : `Desde ${formatearPrecio(m.precio)}*`);

/* ==========================================================================
   Marcado
   ========================================================================== */
function htmlFiltro(clave, titulo, opciones) {
  const botones = opciones
    .map((o) => `<li><button type="button" data-filtro="${clave}" data-valor="${o.id}" aria-pressed="false">${o.titulo}</button></li>`)
    .join('');
  return `
    <div class="filter-item">
      <p class="filter-title">${titulo}</p>
      <ul>${botones}</ul>
    </div>`;
}

function htmlGrupo(cat) {
  const tarjetas = MODELOS.filter((m) => m.categoria === cat.id)
    .map(
      (m) => `
      <a class="car-card" href="${urlFicha(m.slug)}" data-slug="${m.slug}">
        <img src="${m.imagen}" alt="" width="480" height="190" loading="lazy" />
        <span class="car-card__nombre">${esc(m.nombre)}</span>
        <span class="car-card__precio">${textoPrecio(m)}</span>
      </a>`
    )
    .join('');
  return `
    <div class="brand-group" data-marca="${cat.id}">
      <p class="brand-title">${cat.titulo.toUpperCase()}</p>
      <div class="brand-cars">${tarjetas}</div>
    </div>`;
}

export function htmlPanelModelos() {
  return `
    <div class="sub-list-container">
      <div class="filter-panel">
        ${htmlFiltro('motor', 'Motor', TIPOS_MOTOR)}
        ${htmlFiltro('carroceria', 'Carrocería', CARROCERIAS)}
        <div class="tools-module">
          <p class="filter-title">Servicios</p>
          <a class="button--tertiary red-arrow fs-button-m fw-bold" href="${enlaceWhatsApp('Hola. Quiero cotizar un GWM')}" target="_blank" rel="noopener">Cotizá tu GWM</a>
          <a class="button--tertiary red-arrow fs-button-m fw-bold" href="/concesionarios">Puntos de venta</a>
        </div>
      </div>
      <div class="secondray-list-panel">
        <p class="panel-title">TODOS LOS MODELOS</p>
        ${CATEGORIAS.map(htmlGrupo).join('')}
        <p class="no-data-text" hidden>No hay modelos con esa combinación.</p>
      </div>
    </div>`;
}

export function htmlMovil() {
  const modelos = CATEGORIAS.map(
    (cat) => `
      <div class="secondray-item">
        <p class="secondray-title">${cat.titulo}</p>
        <ul class="secondray-ul">
          ${MODELOS.filter((m) => m.categoria === cat.id)
            .map((m) => `<li><a class="secondray-link" href="${urlFicha(m.slug)}">${esc(m.nombre)}</a></li>`)
            .join('')}
        </ul>
      </div>`
  ).join('');
  const postventa = `
      <div class="secondray-item">
        <p class="secondray-title">Clientes</p>
        <ul class="secondray-ul">
          <li><a class="secondray-link" href="/#postventa">Agendá tu mantenimiento</a></li>
          <li><a class="secondray-link" href="/#servicios">Servicios de postventa</a></li>
        </ul>
      </div>
      <div class="secondray-item">
        <p class="secondray-title">Contacto</p>
        <ul class="secondray-ul">
          <li><a class="secondray-link" href="/concesionarios">Puntos de venta</a></li>
          <li><a class="secondray-link" href="/#reclamos">Reclamos</a></li>
        </ul>
      </div>`;
  const desplegable = (titulo, contenido) => `
    <div class="list-item">
      <button class="primary-btn-box" type="button" aria-expanded="false">
        <span class="primary-link">${titulo}</span>${MAS}
      </button>
      <div class="secondary-wrapper-full" hidden>${contenido}</div>
    </div>`;
  return `
    <div class="nav-list">
      ${desplegable('MODELOS', modelos)}
      <div class="list-item"><a class="primary-btn-box" href="/concesionarios"><span class="primary-link">PUNTOS DE VENTA</span></a></div>
      ${desplegable('POSTVENTA', postventa)}
    </div>
    <div class="nav-feature-btn">
      <a class="nav-btn--secondary stroke" href="/modelos">Todos los modelos</a>
      <a class="nav-btn--secondary" href="/hibridos">Híbridos HEV y PHEV</a>
      <a class="nav-btn--secondary" href="/electricos">Eléctricos</a>
      <button class="action action--light" type="button" data-lead="cotizacion">Cotizá tu GWM ↗</button>
      <button class="action action--outline" type="button" data-lead="testdrive">Solicitá un test drive</button>
    </div>`;
}

/* ==========================================================================
   Escritorio: paneles de MODELOS y POSTVENTA
   ========================================================================== */
function iniciarPaneles(header) {
  const items = [...header.querySelectorAll('.header__layout-pc .list-item[data-menu]')];
  const mascara = header.querySelector('.header-mask');
  let cierre = 0;
  let aperturaPorMouse = 0;

  const alternar = (item, abrir) => {
    item.classList.toggle('is-open', abrir);
    item.querySelector('.primary-link').setAttribute('aria-expanded', String(abrir));
  };
  const abrir = (item) => {
    clearTimeout(cierre);
    items.forEach((i) => alternar(i, i === item));
    header.classList.add('is-open');
    mascara.hidden = false;
  };
  const cerrarTodo = () => {
    items.forEach((i) => alternar(i, false));
    header.classList.remove('is-open');
    mascara.hidden = true;
  };

  for (const item of items) {
    const boton = item.querySelector('.primary-link');
    item.addEventListener('pointerenter', (e) => {
      if (e.pointerType !== 'mouse') return;
      aperturaPorMouse = performance.now();
      abrir(item);
    });
    item.addEventListener('pointerleave', (e) => {
      if (e.pointerType === 'mouse') cierre = setTimeout(cerrarTodo, 160);
    });
    // Con el teclado o el dedo: clic alterna. Si el mouse acaba de abrirlo, el clic no lo cierra.
    boton.addEventListener('click', () => {
      if (performance.now() - aperturaPorMouse < 400) return;
      if (item.classList.contains('is-open')) cerrarTodo();
      else abrir(item);
    });
    // Al tabular hacia afuera se cierra. Sin destino (clic en un hueco del panel) no: sigue abierto.
    item.addEventListener('focusout', (e) => {
      if (!e.relatedTarget || item.contains(e.relatedTarget)) return;
      alternar(item, false);
      const quedaAbierto = items.some((i) => i.classList.contains('is-open'));
      header.classList.toggle('is-open', quedaAbierto);
      mascara.hidden = !quedaAbierto;
    });
  }
  mascara.addEventListener('click', cerrarTodo);
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || !header.classList.contains('is-open')) return;
    const abierto = items.find((i) => i.classList.contains('is-open'));
    cerrarTodo();
    abierto?.querySelector('.primary-link').focus();
  });
}

/** Filtros del panel MODELOS: dentro de un grupo suman (Eléctrico o Híbrido), entre grupos se cruzan. */
function iniciarFiltros(panel) {
  const activos = { motor: new Set(), carroceria: new Set() };
  const tarjetas = [...panel.querySelectorAll('[data-slug]')];
  const grupos = [...panel.querySelectorAll('.brand-group')];
  const vacio = panel.querySelector('.no-data-text');

  const aplicar = () => {
    for (const t of tarjetas) {
      const m = MODELOS.find((x) => x.slug === t.dataset.slug);
      t.hidden = !(
        (!activos.motor.size || activos.motor.has(m.motor)) && (!activos.carroceria.size || activos.carroceria.has(m.carroceria))
      );
    }
    for (const g of grupos) g.hidden = !g.querySelector('[data-slug]:not([hidden])');
    vacio.hidden = tarjetas.some((t) => !t.hidden);
  };

  panel.addEventListener('click', (e) => {
    const boton = e.target.closest('[data-filtro]');
    if (!boton) return;
    const grupo = activos[boton.dataset.filtro];
    const encender = !grupo.has(boton.dataset.valor);
    if (encender) grupo.add(boton.dataset.valor);
    else grupo.delete(boton.dataset.valor);
    boton.setAttribute('aria-pressed', String(encender));
    aplicar();
  });
}

/* ==========================================================================
   Celular: menú hamburguesa
   ========================================================================== */
function iniciarMenuMovil(header) {
  const abrirBtn = header.querySelector('.menu-icon');
  const popup = header.querySelector('.menu-popup-container');
  const cerrarBtn = header.querySelector('.back-btn');
  const escritorio = window.matchMedia('(min-width: 1024px)');

  const mostrar = (abrir) => {
    popup.hidden = !abrir;
    abrirBtn.setAttribute('aria-expanded', String(abrir));
    document.documentElement.classList.toggle('menu-abierto', abrir);
    (abrir ? cerrarBtn : abrirBtn).focus();
  };

  abrirBtn.addEventListener('click', () => mostrar(true));
  cerrarBtn.addEventListener('click', () => mostrar(false));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && !popup.hidden && mostrar(false));
  escritorio.addEventListener('change', () => escritorio.matches && !popup.hidden && mostrar(false));

  popup.addEventListener('click', (e) => {
    const desplegable = e.target.closest('button.primary-btn-box');
    if (desplegable) {
      const abierto = desplegable.getAttribute('aria-expanded') !== 'true';
      desplegable.setAttribute('aria-expanded', String(abierto));
      desplegable.nextElementSibling.hidden = !abierto;
      return;
    }
    // Un enlace del menú lleva a otra parte de la página (o a otra página): se cierra el menú.
    if (e.target.closest('a, [data-lead]')) mostrar(false);
  });
}

export function initCabecera() {
  const header = document.querySelector('#header');
  if (!header) return;

  const panel = header.querySelector('[data-menu-modelos]');
  panel.innerHTML = htmlPanelModelos();
  header.querySelector('[data-menu-movil]').innerHTML = htmlMovil();

  iniciarPaneles(header);
  iniciarFiltros(panel);
  iniciarMenuMovil(header);
}
