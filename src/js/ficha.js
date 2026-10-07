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
import { modeloPorSlug, formatearPrecio } from './modelos.js';
import { whatsappModelo } from './whatsapp.js';
import '../css/ficha.css';

// Un módulo por modelo: Vite los parte en archivos aparte y solo se descarga el de la ficha abierta.
const MODULOS_TECNICA = import.meta.glob('./tecnica/*.js');

const SITIO = 'https://gwmweb.santarosa.lat';
const NOTA_PRECIOS =
  '* Precios de referencia en dólares americanos, sujetos a cambio sin previo aviso. Las imágenes son ilustrativas y pueden no corresponder a la versión comercializada.';

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const esc = (texto) => String(texto).replace(/[&<>"']/g, (c) => ESCAPES[c]);
const parrafos = (lineas = []) => lineas.map((l) => `<p>${esc(l)}</p>`).join('');

const FLECHA =
  '<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true" focusable="false"><path d="M5.5 2.5 11 8l-5.5 5.5"/></svg>';

/* ==========================================================================
   Piezas de la ficha
   ========================================================================== */

function menuSecciones(ficha, tecnica) {
  const items = [];
  if (ficha.versiones?.length) items.push({ id: 'versiones', texto: 'Versiones' });
  if (ficha.diseno) items.push({ id: 'diseno', texto: ficha.diseno.titulo });
  if (ficha.tecnologia) items.push({ id: 'tecnologia', texto: ficha.tecnologia.titulo });
  if (ficha.galeria?.length) items.push({ id: 'galeria', texto: 'Galería' });
  if (tecnica) items.push({ id: 'especificaciones', texto: 'Especificaciones' });
  return items;
}

function htmlBarra(modelo, ficha, tecnica) {
  const enlaces = menuSecciones(ficha, tecnica)
    .map((s) => `<a href="#${s.id}" data-seccion="${s.id}">${esc(s.texto)}</a>`)
    .join('');
  const pdf = ficha.fichaTecnica
    ? `<a href="${esc(ficha.fichaTecnica)}" target="_blank" rel="noopener">Ficha técnica</a>`
    : '';
  return `
    <nav class="ficha-nav" aria-label="Secciones de ${esc(modelo.nombre)}">
      <div class="ficha-nav__inicio">
        <a class="ficha-nav__modelo" href="#ficha-inicio">${esc(modelo.nombre)}</a>
      </div>
      <div class="ficha-nav__items">${enlaces}${pdf}</div>
    </nav>`;
}

function precioDesde(modelo, ficha) {
  if (ficha.versiones?.length) return Math.min(...ficha.versiones.map((v) => v.precio));
  return modelo.precio;
}

function htmlPortada(modelo, ficha) {
  const precio = precioDesde(modelo, ficha);
  const tienePrecio = precio !== null && precio !== undefined;
  const bloquePrecio = tienePrecio
    ? `<p class="ficha-portada__precio"><span>Desde</span><strong>${formatearPrecio(precio)}*</strong></p>`
    : '<p class="ficha-portada__precio"><strong>Consultar precio</strong></p>';
  const boton = tienePrecio ? 'Cotizar ahora' : 'Consultar por WhatsApp';
  const enlace = whatsappModelo(modelo.nombre, { consulta: !tienePrecio });
  const movil = ficha.portada.movil ? `<source media="(max-width: 767px)" srcset="${esc(ficha.portada.movil)}" />` : '';
  return `
    <header class="ficha-portada" id="ficha-inicio">
      <picture>
        ${movil}
        <img class="ficha-portada__imagen" src="${esc(ficha.portada.escritorio)}" alt="GWM ${esc(modelo.nombre)}" fetchpriority="high" />
      </picture>
      <div class="ficha-portada__contenido">
        <h1>${ficha.titular.map(esc).join('<br />')}</h1>
        ${ficha.bajada ? `<p class="ficha-portada__bajada">${esc(ficha.bajada)}</p>` : ''}
        ${bloquePrecio}
        <a class="ficha-btn ficha-btn--claro" href="${enlace}" target="_blank" rel="noopener">${boton}</a>
      </div>
    </header>`;
}

function htmlEspecificaciones(v) {
  if (v.descripcion) return `<p>${esc(v.descripcion)}</p>`;
  return (v.especificaciones || [])
    .map((e) => (Array.isArray(e) ? `<p><strong>${esc(e[0])}:</strong> ${esc(e[1])}</p>` : `<p>${esc(e)}</p>`))
    .join('');
}

function htmlVersiones(modelo, ficha) {
  const versiones = ficha.versiones;
  const pestanas = versiones
    .map(
      (v, i) => `
        <li role="presentation">
          <button type="button" role="tab" id="ficha-tab-${i}" aria-controls="ficha-panel-${i}"
                  aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${esc(v.nombre)}</button>
        </li>`
    )
    .join('');
  const paneles = versiones
    .map(
      (v, i) => `
      <div class="ficha-version" role="tabpanel" id="ficha-panel-${i}" aria-labelledby="ficha-tab-${i}"${i === 0 ? '' : ' hidden'}>
        <div class="ficha-version__specs">${htmlEspecificaciones(v)}</div>
        <div class="ficha-version__nombre">
          <small>Versión</small>
          <strong>${esc(v.nombre)}</strong>
        </div>
        <div class="ficha-version__precio">
          <span>Precio desde:</span>
          <strong>${formatearPrecio(v.precio)}*</strong>
        </div>
        <div class="ficha-version__acciones">
          <a class="ficha-btn ficha-btn--oscuro" href="${whatsappModelo(modelo.nombre, { version: v.nombre })}" target="_blank" rel="noopener">Cotizá ahora ${FLECHA}</a>
          ${
            ficha.fichaTecnica
              ? `<a class="ficha-btn ficha-btn--contorno" href="${esc(ficha.fichaTecnica)}" target="_blank" rel="noopener">Ficha técnica</a>`
              : ''
          }
        </div>
      </div>`
    )
    .join('');
  return `
    <section class="ficha-versiones" id="versiones">
      <h2>Elige tu ${esc(modelo.nombre)}</h2>
      <ul class="ficha-tabs" role="tablist" aria-label="Versiones">${pestanas}</ul>
      ${paneles}
    </section>`;
}

function htmlBloque(id, bloque, nombre) {
  return `
    <section class="ficha-bloque" id="${id}">
      <div class="ficha-bloque__texto">
        <h2>${esc(bloque.titulo)}</h2>
        <div class="ficha-bloque__cuerpo">${parrafos(bloque.texto)}</div>
      </div>
      <div class="ficha-bloque__imagen">
        <img src="${esc(bloque.imagen)}" alt="${esc(bloque.titulo)} del GWM ${esc(nombre)}" loading="lazy" />
      </div>
    </section>`;
}

function htmlGaleria(modelo, ficha) {
  const imagenes = ficha.galeria;
  const slides = imagenes
    .map((src, i) => `<li class="splide__slide"><img src="${esc(src)}" alt="GWM ${esc(modelo.nombre)}, imagen ${i + 1} de ${imagenes.length}" loading="lazy" /></li>`)
    .join('');
  return `
    <section class="ficha-galeria" id="galeria">
      <h2>Galería de imágenes</h2>
      <div class="splide ficha-galeria__slider" id="ficha-galeria" aria-label="Galería de imágenes"
           style="--ficha-proporcion: ${esc(ficha.galeriaProporcion || '12 / 5')}">
        <div class="splide__track"><ul class="splide__list">${slides}</ul></div>
      </div>
    </section>`;
}

function htmlInterior(modelo, bloque) {
  return `
    <section class="ficha-interior" id="interior">
      <div class="ficha-interior__grilla">
        <div class="ficha-interior__texto">
          <p class="ficha-etiqueta">Diseño interior</p>
          <h2>${esc(bloque.titulo)}</h2>
          ${bloque.subtitulo ? `<p class="ficha-subtitulo">${esc(bloque.subtitulo)}</p>` : ''}
          ${parrafos(bloque.texto)}
        </div>
        <img src="${esc(bloque.imagen)}" alt="Diseño interior del GWM ${esc(modelo.nombre)}" loading="lazy" />
      </div>
    </section>`;
}

function htmlExterior(modelo, bloque) {
  return `
    <section class="ficha-exterior" id="exterior">
      <div class="ficha-exterior__cuerpo">
        <p class="ficha-etiqueta">Diseño exterior</p>
        <h2>${esc(bloque.titulo)}</h2>
        ${bloque.subtitulo ? `<p class="ficha-subtitulo">${esc(bloque.subtitulo)}</p>` : ''}
        ${parrafos(bloque.texto)}
      </div>
      <img src="${esc(bloque.imagen)}" alt="Diseño exterior del GWM ${esc(modelo.nombre)}" loading="lazy" />
    </section>`;
}

/* --- Especificaciones técnicas ------------------------------------------------
   tecnica = { columnas: [versiones], secciones: [{ titulo, filas: [[etiqueta, valor]] }] }
   valor: texto | true (incluido) | false (no incluido) | [un valor por columna] si difiere entre versiones.
   Un texto o un "incluido" común a todas las versiones llega como valor simple. */
const ICONO_SI =
  '<svg class="ficha-si__icono" viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m4.5 10.5 3.5 3.5 7.5-8"/></svg>';

function htmlCeldaTecnica(valor, atributos = '') {
  if (valor === true) return `<td class="ficha-si"${atributos}><span class="visually-hidden">Incluido</span>${ICONO_SI}</td>`;
  if (valor === false) return `<td class="ficha-no"${atributos}><span class="visually-hidden">No incluido</span><span aria-hidden="true">—</span></td>`;
  return `<td${atributos}>${esc(valor)}</td>`;
}

function htmlFilaTecnica([etiqueta, valor], columnas) {
  const n = columnas.length;
  let celdas;
  if (Array.isArray(valor)) celdas = valor.map((v) => htmlCeldaTecnica(v)).join('');
  else if (n > 1 && typeof valor === 'string') celdas = htmlCeldaTecnica(valor, ` colspan="${n}"`); // el mismo texto en todas las versiones
  else celdas = Array.from({ length: Math.max(n, 1) }, () => htmlCeldaTecnica(valor)).join('');
  return `<tr><th scope="row">${esc(etiqueta)}</th>${celdas}</tr>`;
}

function htmlGrupoTecnica(grupo, columnas, abierto) {
  const encabezado = columnas.length
    ? `<thead><tr><th scope="col"><span class="visually-hidden">Característica</span></th>${columnas.map((c) => `<th scope="col">${esc(c)}</th>`).join('')}</tr></thead>`
    : '';
  return `
    <details class="ficha-grupo"${abierto ? ' open' : ''}>
      <summary><span class="ficha-grupo__titulo">${esc(grupo.titulo)}</span><span class="ficha-grupo__cantidad" aria-hidden="true">${grupo.filas.length}</span></summary>
      <table class="ficha-tabla${columnas.length > 1 ? ' ficha-tabla--versiones' : ''}">
        <caption class="visually-hidden">${esc(grupo.titulo)}</caption>
        ${encabezado}
        <tbody>${grupo.filas.map((f) => htmlFilaTecnica(f, columnas)).join('')}</tbody>
      </table>
    </details>`;
}

function htmlTecnica(modelo, ficha, tecnica) {
  const pdf = ficha.fichaTecnica
    ? `<a class="ficha-tecnica__pdf" href="${esc(ficha.fichaTecnica)}" target="_blank" rel="noopener">Descargar ficha técnica (PDF)</a>`
    : '<span></span>';
  const bajada = tecnica.columnas.length > 1
    ? `Datos de la ficha técnica oficial del GWM ${esc(modelo.nombre)}, con las versiones lado a lado.`
    : `Datos de la ficha técnica oficial del GWM ${esc(modelo.nombre)}.`;
  return `
    <section class="ficha-tecnica" id="especificaciones">
      <div class="ficha-tecnica__contenido">
        <h2>Especificaciones técnicas</h2>
        <p class="ficha-tecnica__bajada">${bajada}</p>
        <div class="ficha-tecnica__acciones">
          ${pdf}
          <button type="button" class="ficha-tecnica__todo" data-accion="alternar">Expandir todo</button>
        </div>
        ${tecnica.secciones.map((g, i) => htmlGrupoTecnica(g, tecnica.columnas, i === 0)).join('')}
      </div>
    </section>`;
}

function htmlFicha(modelo, ficha, tecnica) {
  const hayPrecios = Boolean(ficha.versiones?.length) || (modelo.precio !== null && modelo.precio !== undefined);
  return `
    <article class="ficha">
      ${htmlBarra(modelo, ficha, tecnica)}
      ${htmlPortada(modelo, ficha)}
      ${ficha.aviso ? `<section class="ficha-aviso"><p>${esc(ficha.aviso)}</p></section>` : ''}
      ${ficha.versiones?.length ? htmlVersiones(modelo, ficha) : ''}
      ${ficha.diseno ? htmlBloque('diseno', ficha.diseno, modelo.nombre) : ''}
      ${ficha.tecnologia ? htmlBloque('tecnologia', ficha.tecnologia, modelo.nombre) : ''}
      ${ficha.galeria?.length ? htmlGaleria(modelo, ficha) : ''}
      ${ficha.interior ? htmlInterior(modelo, ficha.interior) : ''}
      ${ficha.exterior ? htmlExterior(modelo, ficha.exterior) : ''}
      ${tecnica ? htmlTecnica(modelo, ficha, tecnica) : ''}
      ${hayPrecios ? `<p class="ficha-nota">${esc(NOTA_PRECIOS)}</p>` : ''}
      <p class="ficha-volver"><a href="/#modelos">Ver todos los modelos</a></p>
    </article>`;
}

function htmlNoEncontrada() {
  return `
    <section class="ficha-vacia">
      <h1>No encontramos ese modelo</h1>
      <p>Puede que el enlace esté desactualizado. Podés ver todos los modelos de GWM desde el listado.</p>
      <a class="ficha-btn ficha-btn--oscuro" href="/#modelos">Ver modelos</a>
    </section>`;
}

/* ==========================================================================
   Metadatos de la pestaña y de las vistas previas al compartir el enlace
   ========================================================================== */
function ponerMeta(selector, atributo, valor) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(atributo, valor);
}

function actualizarMeta(modelo, ficha) {
  const titulo = `${modelo.nombre} | GWM Paraguay`;
  const descripcion = [ficha.bajada, ...ficha.titular].filter(Boolean)[0];
  const url = `${SITIO}/modelos/${modelo.slug}`;
  const imagen = SITIO + ficha.portada.escritorio;
  document.title = titulo;
  ponerMeta('meta[name="description"]', 'content', descripcion);
  ponerMeta('meta[property="og:title"]', 'content', titulo);
  ponerMeta('meta[property="og:description"]', 'content', descripcion);
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

  contenedor.innerHTML = htmlFicha(modelo, ficha, tecnica);
  actualizarMeta(modelo, ficha);
  iniciarVersiones(contenedor);
  iniciarGaleria(contenedor);
  iniciarTecnica(contenedor);
  iniciarResaltado(contenedor);

  // El navegador intenta ir al ancla (#versiones) antes de que exista el contenido: se repite ya renderizado.
  if (location.hash.length > 1) {
    document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
  }
}
