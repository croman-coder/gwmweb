import {
  MODELOS,
  DESTACADOS,
  TIPOS_MOTOR,
  CARROCERIAS,
  nombreCompleto,
  textoPrecio as precioDesdeTexto,
  urlFicha,
} from "../modelos.js";
import { esc } from "../home/util.js";
import { tecnologia, carroceria, modelosDe } from "../vehiculos.js";

export function tarjetaModelo(m, { comparar = true } = {}) {
  return `<article class="modelo-card" data-catalogo-modelo="${m.slug}">
    <div class="modelo-card__top"><span class="energy-tag">${esc(tecnologia(m))}</span>${comparar ? `<label class="compare-check"><input type="checkbox" data-comparar="${m.slug}" aria-label="Comparar ${esc(m.nombre)}" /><span>Comparar</span></label>` : ""}</div>
    <a class="modelo-card__foto" href="${urlFicha(m.slug)}" tabindex="-1" aria-hidden="true"><img src="${m.imagen}" alt="" width="480" height="190" loading="lazy" /></a>
    <p class="eyebrow">${esc(m.categoria)} · ${esc(carroceria(m))}</p>
    <h3><a href="${urlFicha(m.slug)}">${esc(nombreCompleto(m))}</a></h3>
    <p class="modelo-card__des">${esc(m.bajada)}</p>
    <p class="modelo-card__precio">${precioDesdeTexto(m.precio)}</p>
    <div class="modelo-card__acciones"><a href="${urlFicha(m.slug)}">Ver modelo <span aria-hidden="true">↗</span></a><button type="button" data-lead="cotizacion" data-modelo-slug="${m.slug}">${m.precio === null ? "Consultar" : "Cotizar"} <span aria-hidden="true">→</span></button></div>
  </article>`;
}

export function htmlCatalogo(
  tipo = "todos",
  titulo = "Encontrá tu próximo GWM",
  etiqueta = "LA GAMA GWM",
) {
  const modelos = modelosDe(tipo);
  const opciones = (lista) =>
    lista.map((o) => `<option value="${o.id}">${o.titulo}</option>`).join("");
  return `<section class="catalogo" id="modelos" data-catalogo="${tipo}" aria-labelledby="catalogo-titulo">
    <div class="responsive__layout">
      <div class="section-heading"><div><p class="eyebrow">${etiqueta}</p><h2 id="catalogo-titulo">${titulo}</h2></div><p>Tu día a día tiene un GWM.<br />Explorá, compará y elegí el tuyo.</p></div>
      <form class="catalogo-filtros" aria-label="Filtrar vehículos" data-filtros>
        <label>Buscá un modelo<input name="buscar" type="search" placeholder="H6, Tank, Poer…" autocomplete="off" /></label>
        <label>Tecnología<select name="motor"><option value="">Todas las tecnologías</option>${opciones(TIPOS_MOTOR)}</select></label>
        <label>Carrocería<select name="carroceria"><option value="">Todas las carrocerías</option>${opciones(CARROCERIAS)}</select></label>
        <label>Presupuesto<select name="precio"><option value="">Todos los precios</option><option value="25000">Hasta USD 25.000</option><option value="35000">Hasta USD 35.000</option><option value="50000">Hasta USD 50.000</option></select></label>
        <button type="reset" class="reset-filtros">Limpiar filtros</button>
      </form>
      <div class="catalogo-resultados"><p role="status" aria-live="polite" data-resultados>${modelos.length} modelos para descubrir</p><a href="/guia/hev-vs-phev">¿HEV, PHEV o eléctrico? <span aria-hidden="true">↗</span></a></div>
      <div class="catalogo-grid">${modelos.map((m) => tarjetaModelo(m)).join("")}</div>
      <div class="catalogo-vacio" hidden><h3>No encontramos esa combinación</h3><p>Probá ampliar tu presupuesto o cambiar la tecnología.</p><button type="button" data-limpiar>Ver todos los modelos</button></div>
      <p class="catalogo-nota">* Precios de referencia en USD, sujetos a cambio. Versiones, equipamiento y disponibilidad a confirmar con un asesor en Paraguay. Los modelos sin precio confirmado quedan fuera del filtro de presupuesto.</p>
      <aside class="comparador-bar" hidden aria-label="Modelos seleccionados para comparar"><div><strong data-comparador-cantidad>0 de 3 seleccionados</strong><p data-comparador-nombres></p><span role="status" data-comparador-estado></span></div><div><button type="button" data-comparador-limpiar>Limpiar</button><button type="button" class="action action--light" data-comparador-abrir disabled>Comparar modelos <span aria-hidden="true">↗</span></button></div></aside>
    </div>
  </section>`;
}

export function htmlDestacadosHome() {
  const modelos = DESTACADOS.map((slug) => MODELOS.find((m) => m.slug === slug))
    .filter(Boolean)
    .slice(0, 3);
  return `<section class="home-destacados" id="modelos" aria-labelledby="destacados-titulo"><div class="responsive__layout">
    <div class="section-heading"><div><p class="eyebrow">DESCUBRÍ LA GAMA GWM</p><h2 id="destacados-titulo">Tu próximo camino empieza acá.</h2></div><p>Tres formas de vivir GWM.<br />Encontrá la que va con vos.</p></div>
    <p class="home-destacados__hint">Deslizá para descubrir los destacados <span aria-hidden="true">→</span></p>
    <div class="catalogo-grid" role="group" aria-label="Modelos destacados" tabindex="0">${modelos.map((m) => tarjetaModelo(m, { comparar: false })).join("")}</div>
    <div class="home-destacados__cierre"><p>Hay un GWM para cada plan.</p><a class="action action--dark" href="/modelos">Ver todos los modelos <span aria-hidden="true">↗</span></a></div>
    <p class="catalogo-nota">* Precios de referencia en USD. Versiones y disponibilidad a confirmar con un asesor en Paraguay.</p>
  </div></section>`;
}

export function htmlHeroSlide(s, i) {
  const m = MODELOS.find((m) => m.slug === s.slug);
  const esBanner = Boolean(s.tituloIncrustado);
  // Las fotos de ficha no tienen títulos incrustados: permiten recortes legibles en cualquier pantalla.
  const foto = esBanner ? `/img/fichas/${s.slug}/portada.webp` : s.imagen;
  const fotoMovil = esBanner
    ? `/img/fichas/${s.slug}/portada-m.webp`
    : s.imagenMobile || foto;
  const video = (src, poster, clase) =>
    src
      ? `<video class="normal-video video-temp ${clase}" muted loop playsinline preload="none" poster="${poster}" data-src="${src}" aria-hidden="true"></video>`
      : "";
  return `<div class="splide__slide kvswiper-slide light${!s.videoMobile ? " hero--still" : ""}">
    <div class="video-box"><picture class="car-app-img"><source media="(max-width:767px)" srcset="${fotoMovil}" /><img src="${foto}" alt="" width="1600" height="700" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} /></picture>${video(s.video, s.imagen, "video-d")}${video(s.videoMobile, fotoMovil, "video-m")}</div>
    <div class="content-box"><div class="responsive__layout"><div class="kv-swiper-content">
      <p class="hero-eyebrow">GWM PARAGUAY · ${esc(tecnologia(m))}</p>
      <p class="kv-title">${esc(nombreCompleto(m))}</p>
      <p class="hero-beneficio">${esc(m.bajada)}</p>
      <p class="kv-subtitle">${precioDesdeTexto(m.precio)}</p>
      <div class="hero-actions"><a class="action action--light" href="${urlFicha(m.slug)}">Explorá el modelo <span aria-hidden="true">↗</span></a><button class="action action--outline" type="button" data-lead="testdrive" data-modelo-slug="${m.slug}">Solicitá un test drive</button></div>
    </div></div></div>
    <span class="hero-number" aria-hidden="true">0${i + 1} / 06</span>
  </div>`;
}

export function htmlGuiasHome() {
  return `<section class="guias-home responsive__layout" aria-labelledby="guias-titulo"><div class="section-heading"><div><p class="eyebrow">ELEGÍ CON MÁS INFORMACIÓN</p><h2 id="guias-titulo">El futuro, más cerca.</h2></div><a href="/hibridos">Descubrí la gama híbrida ↗</a></div><div class="guias-grid">
    <a class="guia-card" href="/guia/hev-vs-phev"><span class="eyebrow">TECNOLOGÍA</span><h3>HEV, PHEV o eléctrico.<br />¿Cuál va con vos?</h3><p>Entendé cómo funciona cada uno y qué cambia en tu rutina.</p><span aria-hidden="true">↗</span></a>
    <a class="guia-card" href="/guia/carga-en-casa"><span class="eyebrow">TU DÍA A DÍA</span><h3>Tu próximo punto de carga puede estar en casa.</h3><p>Qué consultar antes de instalar un cargador para tu GWM.</p><span aria-hidden="true">↗</span></a>
    <a class="guia-card" href="/guia/h6-hev-vs-phev"><span class="eyebrow">DOS FORMAS DE MOVERTE</span><h3>Haval H6 HEV<br />y H6 PHEV.</h3><p>Conocé las diferencias y compará las versiones de Paraguay.</p><span aria-hidden="true">↗</span></a>
  </div></section>`;
}
