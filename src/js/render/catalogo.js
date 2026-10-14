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
import { srcsetImagen } from '../imagenes.js';

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
    <div class="section-heading"><div><p class="eyebrow">DESCUBRÍ LA GAMA GWM</p><h2 id="destacados-titulo">Elegí tu próxima historia.</h2></div><p>La ciudad. La rutina. La aventura.<br />Hay un GWM para cada camino.</p></div>
    <p class="home-destacados__hint">Deslizá para descubrir los destacados <span aria-hidden="true">→</span></p>
    <div class="catalogo-grid destacados-grid" role="group" aria-label="Modelos destacados" tabindex="0">${modelos.map((m, i) => `<article class="modelo-card modelo-card--editorial" data-catalogo-modelo="${m.slug}">
      <a class="destacado-media" href="${urlFicha(m.slug)}" tabindex="-1" aria-hidden="true"><img src="/img/fichas/${m.slug}/portada.webp" alt="" width="900" height="600" loading="lazy" /><span class="energy-tag">${esc(tecnologia(m))}</span><span class="destacado-numero">0${i + 1}</span></a>
      <div class="destacado-contenido"><p class="eyebrow">${esc(m.categoria)} · ${esc(carroceria(m))}</p><h3><a href="${urlFicha(m.slug)}">${esc(nombreCompleto(m))}</a></h3><p class="modelo-card__des">${["La ciudad se vive con otra energía.", "Tu día a día, a otro nivel.", "El camino también es parte del plan."][i]}</p><p class="modelo-card__precio">${precioDesdeTexto(m.precio)}</p><div class="modelo-card__acciones"><a href="${urlFicha(m.slug)}">Descubrí el modelo <span aria-hidden="true">↗</span></a><button type="button" data-lead="cotizacion" data-modelo-slug="${m.slug}">${m.precio === null ? "Consultar" : "Cotizar"} <span aria-hidden="true">→</span></button></div></div>
    </article>`).join("")}</div>
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
    : s.imagenMobile || `/img/fichas/${s.slug}/portada-m.webp`;
  const video = (src, poster, clase) =>
    src
      ? `<video class="normal-video video-temp ${clase}" muted loop playsinline preload="none" data-src="${src}" aria-hidden="true"></video>`
      : "";
  return `<div class="splide__slide kvswiper-slide light${!s.videoMobile ? " hero--still" : ""}">
    <div class="video-box"><picture class="car-app-img"><source media="(max-width:767px)" ${i === 0 ? 'srcset' : 'data-hero-srcset'}="${srcsetImagen(fotoMovil)}" sizes="100vw" /><img ${i === 0 ? 'src' : 'data-hero-src'}="${foto}" ${i === 0 ? 'srcset' : 'data-hero-srcset'}="${srcsetImagen(foto)}" sizes="100vw" alt="" width="1920" height="1080" decoding="async" ${i === 0 ? 'fetchpriority="high"' : ''} /></picture>${video(s.video, s.imagen, "video-d")}${video(s.videoMobile, fotoMovil, "video-m")}</div>
    <div class="content-box"><div class="responsive__layout"><div class="kv-swiper-content">
      <p class="hero-eyebrow">GWM PARAGUAY · ${esc(tecnologia(m))}</p>
      <p class="kv-title">${esc(nombreCompleto(m).replace(/\s+(?:HEV|PHEV|EV)(?:\s+4x4)?$/i, ""))}</p>
      <p class="hero-beneficio">${esc(m.bajada)}</p>
      <p class="kv-subtitle">${precioDesdeTexto(m.precio)}</p>
      <div class="hero-actions"><a class="action action--light" href="${urlFicha(m.slug)}">Descubrí el modelo <span aria-hidden="true">↗</span></a><button class="action action--outline" type="button" data-lead="testdrive" data-modelo-slug="${m.slug}">Test drive</button></div>
    </div></div></div>
  </div>`;
}

export function htmlGuiasHome() {
  return `<section class="guias-home responsive__layout" aria-labelledby="guias-titulo"><div class="section-heading"><div><p class="eyebrow">UNA NUEVA FORMA DE MOVERTE</p><h2 id="guias-titulo">El futuro se elige hoy.</h2></div><a class="text-link" href="/hibridos">Conocé la gama híbrida <span aria-hidden="true">↗</span></a></div><div class="guias-grid">
    <a class="guia-card guia-card--principal" href="/guia/hev-vs-phev"><img src="/img/fichas/ora-5-ev/galeria-2.webp" alt="" width="900" height="600" loading="lazy" /><div class="guia-card__texto"><span class="eyebrow">GUÍA DE TECNOLOGÍAS</span><h3>Una nueva energía.<br />La misma libertad.</h3><p>HEV, PHEV o eléctrico: descubrí qué tecnología va con vos.</p><span class="guia-card__link">Explorá la guía <span aria-hidden="true">↗</span></span></div></a>
    <a class="guia-card" href="/guia/carga-en-casa"><img src="/img/fichas/new-h6-phev/galeria-1.webp" alt="" width="900" height="600" loading="lazy" /><div class="guia-card__texto"><span class="eyebrow">TU DÍA A DÍA</span><h3>Tu casa, tu próximo punto de carga.</h3><span class="guia-card__link">Qué necesitás saber <span aria-hidden="true">↗</span></span></div></a>
    <a class="guia-card" href="/guia/h6-hev-vs-phev"><img src="/img/fichas/new-h6-hev/portada.webp" alt="" width="900" height="600" loading="lazy" /><div class="guia-card__texto"><span class="eyebrow">DOS FORMAS DE MOVERTE</span><h3>Haval H6.<br />HEV o PHEV.</h3><span class="guia-card__link">Encontrá tu versión <span aria-hidden="true">↗</span></span></div></a>
  </div></section>`;
}
