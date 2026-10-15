/** HTML compartido entre el build y el navegador: la ficha completa se entrega sin depender de JS. */
import { formatearPrecio, nombreCompleto } from "../modelos.js";
import { whatsappModelo } from "../whatsapp.js";
import { datosClave } from "../vehiculos.js";

const NOTA_PRECIOS =
  "* Precios de referencia en dólares americanos, sujetos a cambio sin previo aviso. Las imágenes son ilustrativas y pueden no corresponder a la versión comercializada.";

const ESCAPES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};
const esc = (texto) => String(texto).replace(/[&<>"']/g, (c) => ESCAPES[c]);
const parrafos = (lineas = []) =>
  lineas.map((l) => `<p>${esc(l)}</p>`).join("");

const FLECHA =
  '<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true" focusable="false"><path d="M5.5 2.5 11 8l-5.5 5.5"/></svg>';

/* ==========================================================================
   Piezas de la ficha
   ========================================================================== */

function menuSecciones(ficha, tecnica) {
  const items = [];
  if (ficha.motorizaciones?.length) items.push({ id: 'motorizaciones', texto: 'Motorizaciones' });
  if (ficha.referenciaInternacional && tecnica) items.push({ id: 'especificaciones', texto: 'Especificaciones' });
  if (ficha.versiones?.length)
    items.push({ id: "versiones", texto: "Versiones" });
  if (ficha.diseno) items.push({ id: "diseno", texto: ficha.diseno.enlace || ficha.diseno.titulo });
  if (ficha.tecnologia)
    items.push({ id: "tecnologia", texto: ficha.tecnologia.enlace || ficha.tecnologia.titulo });
  if (ficha.visor3d) items.push({ id: "visor-3d", texto: "Vista 3D" });
  if (ficha.galeria?.length) items.push({ id: "galeria", texto: "Galería" });
  if (tecnica && !ficha.referenciaInternacional)
    items.push({ id: "especificaciones", texto: "Especificaciones" });
  return items;
}

function htmlBarra(modelo, ficha, tecnica) {
  const enlaces = menuSecciones(ficha, tecnica)
    .map((s) => `<button type="button" data-scroll="${s.id}" data-seccion="${s.id}" aria-controls="${s.id}">${esc(s.texto)}</button>`)
    .join("");
  const pdf = ficha.fichaTecnica
    ? `<a href="${esc(ficha.fichaTecnica)}" target="_blank" rel="noopener">${ficha.referenciaInternacional ? 'Ficha internacional (PDF)' : 'Ficha técnica'}</a>`
    : "";
  return `
    <nav class="ficha-nav" aria-label="Secciones de ${esc(modelo.nombre)}">
      <div class="ficha-nav__inicio">
        <button class="ficha-nav__modelo" type="button" data-scroll="ficha-inicio" aria-controls="ficha-inicio">${esc(modelo.nombre)}</button>
      </div>
      <div class="ficha-nav__items">${enlaces}${pdf}</div>
    </nav>`;
}

function precioDesde(modelo, ficha) {
  if (ficha.versiones?.length)
    return Math.min(...ficha.versiones.map((v) => v.precio));
  return modelo.precio;
}

function htmlPortada(modelo, ficha) {
  const precio = precioDesde(modelo, ficha);
  const tienePrecio = precio !== null && precio !== undefined;
  const bloquePrecio = tienePrecio
    ? `<p class="ficha-portada__precio"><span>Desde</span><strong>${formatearPrecio(precio)}*</strong></p>`
    : '<p class="ficha-portada__precio"><strong>Consultar precio</strong></p>';
  const boton = tienePrecio ? "Cotizar ahora" : "Consultar por WhatsApp";
  const enlace = whatsappModelo(modelo.nombre, { consulta: !tienePrecio });
  const movil = ficha.portada.movil
    ? `<source media="(max-width: 767px)" srcset="${esc(ficha.portada.movil)}" />`
    : "";
  return `
    <header class="ficha-portada" id="ficha-inicio">
      <picture>
        ${movil}
        <img class="ficha-portada__imagen" src="${esc(ficha.portada.escritorio)}" alt="GWM ${esc(modelo.nombre)}" fetchpriority="high" />
      </picture>
      <div class="ficha-portada__contenido">
        <p class="eyebrow">GWM PARAGUAY · ${esc(modelo.categoria)}</p>
        <h1>${esc(nombreCompleto(modelo))}</h1>
        <p class="ficha-portada__bajada">${esc(modelo.bajada)}</p>
        ${bloquePrecio}
        <div class="hero-actions"><button class="action action--light" type="button" data-lead="cotizacion" data-modelo-slug="${modelo.slug}">${tienePrecio ? "Cotizá este modelo" : "Consultá disponibilidad"} ↗</button><button class="action action--outline" type="button" data-lead="testdrive" data-modelo-slug="${modelo.slug}">Solicitá un test drive</button></div>
        <a class="ficha-whatsapp" href="${enlace}" target="_blank" rel="noopener">También podés escribirnos por WhatsApp ↗</a>
      </div>
    </header>`;
}

function htmlEspecificaciones(v) {
  if (v.descripcion) return `<p>${esc(v.descripcion)}</p>`;
  return (v.especificaciones || [])
    .map((e) =>
      Array.isArray(e)
        ? `<p><strong>${esc(e[0])}:</strong> ${esc(e[1])}</p>`
        : `<p>${esc(e)}</p>`,
    )
    .join("");
}

function htmlVersiones(modelo, ficha) {
  const versiones = ficha.versiones;
  const pestanas = versiones
    .map(
      (v, i) => `
        <li role="presentation">
          <button type="button" role="tab" id="ficha-tab-${i}" aria-controls="ficha-panel-${i}"
                  aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${esc(v.nombre)}</button>
        </li>`,
    )
    .join("");
  const paneles = versiones
    .map(
      (v, i) => `
      <div class="ficha-version" role="tabpanel" id="ficha-panel-${i}" aria-labelledby="ficha-tab-${i}"${i === 0 ? "" : " hidden"}>
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
          <button class="ficha-btn ficha-btn--oscuro" type="button" data-lead="cotizacion" data-modelo-slug="${modelo.slug}" data-version="${esc(v.nombre)}">Cotizá esta versión ${FLECHA}</button>
          ${
            ficha.fichaTecnica
              ? `<a class="ficha-btn ficha-btn--contorno" href="${esc(ficha.fichaTecnica)}" target="_blank" rel="noopener">Ficha técnica</a>`
              : ""
          }
        </div>
      </div>`,
    )
    .join("");
  return `
    <section class="ficha-versiones" id="versiones">
      <h2>Elegí tu ${esc(modelo.nombre)}</h2>
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

/** Visor 3D: queda el póster con un botón hasta que la persona lo pide (el modelo y las texturas pesan ~2 MB). */
function htmlVisor3d(modelo, ficha) {
  const v = ficha.visor3d;
  return `
    <section class="ficha-3d" id="visor-3d">
      <div class="ficha-3d__cabecera">
        <p class="ficha-etiqueta">Vista 3D</p>
        <h2>${esc(v.titulo)}</h2>
        ${parrafos(v.texto)}
      </div>
      <div class="ficha-3d__visor" data-estado="reposo">
        <div class="ficha-3d__escenario">
          <img class="ficha-3d__poster" src="${esc(v.poster)}" alt="GWM ${esc(modelo.nombre)}" loading="lazy" />
          <canvas class="ficha-3d__canvas" tabindex="0" role="img"
                  aria-label="Vista 3D interactiva del GWM ${esc(modelo.nombre)}. Con las flechas del teclado se gira."></canvas>
          <div class="ficha-3d__inicio">
            <button type="button" class="ficha-btn ficha-btn--claro" data-accion="iniciar-3d">Explorar en 3D</button>
            <small>Se descargan unos 2 MB</small>
          </div>
          <p class="ficha-3d__estado" role="status"></p>
          <button type="button" class="ficha-btn ficha-btn--claro ficha-3d__reintentar" data-accion="iniciar-3d">Reintentar</button>
        </div>
        <div class="ficha-3d__panel"></div>
        ${v.aviso ? `<p class="ficha-3d__aviso">${esc(v.aviso)}</p>` : ""}
      </div>
    </section>`;
}

function htmlGaleria(modelo, ficha) {
  const imagenes = ficha.galeria;
  const slides = imagenes
    .map(
      (src, i) =>
        `<li class="splide__slide"><img src="${esc(src)}" alt="GWM ${esc(modelo.nombre)}, imagen ${i + 1} de ${imagenes.length}" loading="lazy" /></li>`,
    )
    .join("");
  return `
    <section class="ficha-galeria" id="galeria">
      <h2>Galería de imágenes</h2>
      <div class="splide ficha-galeria__slider" id="ficha-galeria" aria-label="Galería de imágenes"
           style="--ficha-proporcion: ${esc(ficha.galeriaProporcion || "12 / 5")}">
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
          ${bloque.subtitulo ? `<p class="ficha-subtitulo">${esc(bloque.subtitulo)}</p>` : ""}
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
        ${bloque.subtitulo ? `<p class="ficha-subtitulo">${esc(bloque.subtitulo)}</p>` : ""}
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

function htmlCeldaTecnica(valor, atributos = "") {
  if (valor === true)
    return `<td class="ficha-si"${atributos}><span class="visually-hidden">Incluido</span>${ICONO_SI}</td>`;
  if (valor === false)
    return `<td class="ficha-no"${atributos}><span class="visually-hidden">No incluido</span><span aria-hidden="true">—</span></td>`;
  return `<td${atributos}>${esc(valor)}</td>`;
}

function htmlFilaTecnica([etiqueta, valor], columnas) {
  const n = columnas.length;
  let celdas;
  if (Array.isArray(valor))
    celdas = valor.map((v) => htmlCeldaTecnica(v)).join("");
  else if (n > 1 && typeof valor === "string")
    celdas = htmlCeldaTecnica(valor, ` colspan="${n}"`); // el mismo texto en todas las versiones
  else
    celdas = Array.from({ length: Math.max(n, 1) }, () =>
      htmlCeldaTecnica(valor),
    ).join("");
  return `<tr><th scope="row">${esc(etiqueta)}</th>${celdas}</tr>`;
}

function htmlGrupoTecnica(grupo, columnas, abierto) {
  const encabezado = columnas.length
    ? `<thead><tr><th scope="col"><span class="visually-hidden">Característica</span></th>${columnas.map((c) => `<th scope="col">${esc(c)}</th>`).join("")}</tr></thead>`
    : "";
  return `
    <details class="ficha-grupo"${abierto ? " open" : ""}>
      <summary><span class="ficha-grupo__titulo">${esc(grupo.titulo)}</span><span class="ficha-grupo__cantidad" aria-hidden="true">${grupo.filas.length}</span></summary>
      ${grupo.nota ? `<p class="ficha-grupo__nota">${esc(grupo.nota)}</p>` : ""}
      <table class="ficha-tabla${columnas.length > 1 ? " ficha-tabla--versiones" : ""}">
        <caption class="visually-hidden">${esc(grupo.titulo)}</caption>
        ${encabezado}
        <tbody>${grupo.filas.map((f) => htmlFilaTecnica(f, columnas)).join("")}</tbody>
      </table>
    </details>`;
}

function htmlTecnica(modelo, ficha, tecnica) {
  const pdf = ficha.fichaTecnica
    ? `<a class="ficha-tecnica__pdf" href="${esc(ficha.fichaTecnica)}" target="_blank" rel="noopener">Descargar ficha ${tecnica.referencia ? 'internacional' : 'técnica'} (PDF)</a>`
    : "<span></span>";
  const bajada =
    tecnica.referencia
      ? `Datos oficiales de GWM ${esc(tecnica.referencia.mercado)}${tecnica.referencia.version ? ` · ${esc(tecnica.referencia.version)}` : ""}. Confirmá con un asesor el equipamiento y la disponibilidad para Paraguay.`
      : tecnica.columnas.length > 1
      ? `Datos de la ficha técnica oficial del GWM ${esc(modelo.nombre)}, con las versiones lado a lado.`
      : `Datos de la ficha técnica oficial del GWM ${esc(modelo.nombre)}.`;
  return `
    <section class="ficha-tecnica" id="especificaciones">
      <div class="ficha-tecnica__contenido">
        <h2>Especificaciones técnicas</h2>
        <p class="ficha-tecnica__bajada">${bajada}</p>
        ${tecnica.referencia ? `<p class="ficha-tecnica__fuente"><a href="${esc(tecnica.referencia.fuente)}" target="_blank" rel="noopener">Ficha oficial · GWM ${esc(tecnica.referencia.mercado)} ↗</a>${tecnica.referencia.pagina ? ` · <a href="${esc(tecnica.referencia.pagina)}" target="_blank" rel="noopener">Ver el modelo en GWM ${esc(tecnica.referencia.mercado)} ↗</a>` : ''}</p>` : ''}
        <div class="ficha-tecnica__acciones">
          ${pdf}
          <button type="button" class="ficha-tecnica__todo" data-accion="alternar">Expandir todo</button>
        </div>
        ${tecnica.secciones.map((g, i) => htmlGrupoTecnica(g, tecnica.columnas, i === 0)).join("")}
      </div>
    </section>`;
}

function htmlMotorizaciones(modelo, ficha) {
  return `<section class="ficha-motores responsive__layout" id="motorizaciones" aria-labelledby="motores-titulo">
    <div class="section-heading"><div><p class="eyebrow">GAMA ORA 5 · REFERENCIA MÉXICO</p><h2 id="motores-titulo">Tu energía. Tu camino.</h2></div><p>Eléctrico, híbrido o a gasolina.<br />Conocé qué distingue a cada motorización.</p></div>
    <div class="ficha-motores__grid${ficha.motorizaciones.length === 3 ? " ficha-motores__grid--tres" : ""}">${ficha.motorizaciones.map(m => `<article class="ficha-motor${m.slug === modelo.slug ? ' ficha-motor--activo' : ''}">
      <div class="ficha-motor__cabecera"><span class="energy-tag">${esc(m.etiqueta)}</span>${m.slug === modelo.slug ? '<span class="ficha-motor__actual">Estás viendo este modelo</span>' : ''}</div>
      ${m.imagen ? `<figure class="ficha-motor__media"><img src="${esc(m.imagen)}" alt="${esc(m.imagenAlt || m.nombre)}" loading="lazy" decoding="async" width="700" height="500" data-image-sizes="(max-width:767px) calc(100vw - 82px), 350px" /></figure>` : ''}
      <h3>${esc(m.nombre)}</h3>${m.version ? `<p class="ficha-motor__version">${esc(m.version)}</p>` : ""}<p>${esc(m.descripcion)}</p>
      <dl>${m.datos.map(([k,v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
      ${m.slug === modelo.slug ? '<button class="action action--line" type="button" data-scroll="especificaciones" aria-controls="especificaciones">Ver especificaciones <span aria-hidden="true">↗</span></button>' : m.slug ? `<a class="action action--dark" href="/modelos/${m.slug}">Conocé el ${esc(m.nombre)} <span aria-hidden="true">↗</span></a>` : `<a class="action action--line" href="${esc(ficha.fichaTecnica)}" target="_blank" rel="noopener">Ficha de referencia (PDF) <span aria-hidden="true">↗</span></a>`}
    </article>`).join('')}</div>
    ${ficha.motorizacionesNota ? `<p class="ficha-motores__nota">${esc(ficha.motorizacionesNota)}</p>` : ""}
  </section>`;
}

export function htmlFicha(modelo, ficha, tecnica) {
  // Los ORA sin documentación técnica validada conservan solo el material ilustrativo.
  if (ficha.provisoria)
    ficha = {
      ...ficha,
      diseno: null,
      tecnologia: null,
      interior: null,
      exterior: null,
      aviso:
        "Consultá las versiones y la disponibilidad para Paraguay. Las imágenes y el visor son ilustrativos; el equipamiento, los colores y los tapizados pueden variar según el mercado y la versión.",
    };
  const hayPrecios =
    Boolean(ficha.versiones?.length) ||
    (modelo.precio !== null && modelo.precio !== undefined);
  return `
    <article class="ficha">
      ${htmlBarra(modelo, ficha, tecnica)}
      ${htmlPortada(modelo, ficha)}
      ${ficha.referenciaInternacional ? `<section class="ficha-aviso ficha-aviso--referencia"><p>${esc(ficha.aviso)}</p></section>` : ''}
      <dl class="ficha-highlights">${(tecnica?.destacados || datosClave(modelo, tecnica))
        .map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`)
        .join("")}</dl>
      ${ficha.aviso && !ficha.referenciaInternacional ? `<section class="ficha-aviso"><p>${esc(ficha.aviso)}</p></section>` : ""}
      ${ficha.motorizaciones?.length ? htmlMotorizaciones(modelo, ficha) : ''}
      ${tecnica && ficha.referenciaInternacional ? htmlTecnica(modelo, ficha, tecnica) : ''}
      ${ficha.versiones?.length ? htmlVersiones(modelo, ficha) : ""}
      ${ficha.diseno ? htmlBloque("diseno", ficha.diseno, modelo.nombre) : ""}
      ${ficha.tecnologia ? htmlBloque("tecnologia", ficha.tecnologia, modelo.nombre) : ""}
      ${ficha.visor3d ? htmlVisor3d(modelo, ficha) : ""}
      ${ficha.galeria?.length ? htmlGaleria(modelo, ficha) : ""}
      ${ficha.interior ? htmlInterior(modelo, ficha.interior) : ""}
      ${ficha.exterior ? htmlExterior(modelo, ficha.exterior) : ""}
      ${tecnica && !ficha.referenciaInternacional ? htmlTecnica(modelo, ficha, tecnica) : ""}
      ${hayPrecios ? `<p class="ficha-nota">${esc(NOTA_PRECIOS)}</p>` : ""}
      <section class="ficha-next"><div><p class="eyebrow">TU PRÓXIMO PASO</p><h2>Conocelo al volante.</h2><p>Coordiná una prueba y consultá las condiciones de tu versión en Paraguay.</p></div><div><button class="action action--dark" type="button" data-lead="testdrive" data-modelo-slug="${modelo.slug}">Solicitá un test drive ↗</button><a class="action action--line" href="/postventa">Garantía y mantenimiento</a></div></section>
      <p class="ficha-volver"><a href="/modelos">Ver todos los modelos ↗</a></p>
    </article>`;
}

export function htmlNoEncontrada() {
  return `
    <section class="ficha-vacia">
      <h1>No encontramos ese modelo</h1>
      <p>Puede que el enlace esté desactualizado. Podés ver todos los modelos de GWM desde el listado.</p>
      <a class="ficha-btn ficha-btn--oscuro" href="/modelos">Ver modelos</a>
    </section>`;
}
