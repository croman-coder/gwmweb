/**
 * Experiencia GWM: "Mundo GWM" y los simuladores de carga y autonomía.
 *
 * Tomado de la lógica de gwmmotors.com.br/pt/experience (relevado el 2026-11-20), adaptado a Paraguay:
 *  - Mundo GWM: pilares globales y submarcas. Se omiten WEY (no se vende acá), el informe de transparencia
 *    salarial (obligación legal de Brasil) y el enlace a empleos de GWM Brasil.
 *  - Simuladores: mismos factores de ajuste que el sitio de Brasil. Solo modelos enchufables vendidos en Paraguay.
 *
 * Datos de cada modelo: por indicación de Marketing (2026-11-20) se usan los del simulador de GWM Brasil para los
 * modelos que Brasil tiene (H6 GT, H7, Ora 03, Ora 5, Tank 300). Los que Brasil no tiene (Tank 400, 500 PHEV, 700)
 * toman batería y autonomía de nuestras fichas y la potencia de carga del Tank 300. Pendiente: datos oficiales de Postventa.
 */
import { esc } from './home/util.js';

/* ---------------------------------------------------------------- Mundo GWM */

export const PILARES = [
  ['Proveedores globales', 'Trabajamos con los principales proveedores del mundo para lograr productos de alta calidad y tecnología de punta.'],
  ['Cooperación global', 'GWM se asocia con marcas líderes de la industria para desarrollar vehículos de nueva energía para el mercado global.'],
  ['Investigación y desarrollo', 'Equipos de I+D en distintos países enfocados en conducción inteligente y vehículos de nueva energía.'],
  ['Producción global', 'Plantas en varios continentes para abastecer la demanda de los mercados donde GWM está presente.'],
];

export const MARCAS = [
  { id: 'haval', titulo: 'HAVAL', imagen: '/img/modelos/new-h6-hev.webp', texto: 'La marca global de SUVs de GWM. Más de 6 millones de vehículos vendidos en más de 60 países, con SUVs urbanos que combinan diseño, tecnología y opciones híbridas.' },
  { id: 'ora', titulo: 'ORA', imagen: '/img/modelos/ora-5.webp', texto: 'La línea urbana SUV de GWM. Diseño con personalidad y el equilibrio justo entre potencia y autonomía para moverte sin combustible.' },
  { id: 'poer', titulo: 'POER', imagen: '/img/modelos/poer-diesel.webp', texto: 'Las pickups de GWM, que fabrica desde 1996. Más de 2 millones de pickups vendidas en el mundo. La "P" de su logo resume su espíritu: Power, Peak y Perfect.' },
  { id: 'tank', titulo: 'TANK', imagen: '/img/modelos/tank-500-hev.webp', texto: 'La marca de todoterrenos de lujo de GWM: robustez y lujo en un mismo vehículo, con tecnología híbrida para ir más lejos.' },
];

export function htmlMundo() {
  return `<section class="exp-bloque responsive__layout" aria-labelledby="pilares-titulo">
      <div class="section-heading"><div><p class="eyebrow">CONOCÉ EL MUNDO GWM</p><h2 id="pilares-titulo">Una marca global.</h2></div><p>Great Wall Motor nació en China en 1984 y hoy vende sus vehículos en mercados de todo el mundo.</p></div>
      <div class="exp-pilares">${PILARES.map(([t, x], i) => `<article class="exp-pilar"><span class="exp-pilar__num">0${i + 1}</span><h3>${esc(t)}</h3><p>${esc(x)}</p></article>`).join('')}</div>
    </section>
    ${htmlMapa()}
    <section class="exp-showcase" data-showcase style="--marcas:${MARCAS.length}" aria-labelledby="marcas-titulo">
      <div class="exp-showcase__sticky">
        <div class="responsive__layout exp-showcase__layout">
          <div class="exp-showcase__textos">
            <p class="eyebrow">NUESTRAS MARCAS</p>
            <h2 id="marcas-titulo" class="visually-hidden">Marcas de GWM</h2>
            ${MARCAS.map((m, i) => `<article class="exp-showcase__item${i === 0 ? ' is-activo' : ''}" data-marca-i="${i}">
              <h3>${esc(m.titulo)}</h3>
              <div class="exp-showcase__cuerpo"><p>${esc(m.texto)}</p><a class="exp-marca__link" href="/modelos?buscar=${encodeURIComponent(m.titulo[0] + m.titulo.slice(1).toLowerCase())}">Ver modelos ${esc(m.titulo[0] + m.titulo.slice(1).toLowerCase())} <span aria-hidden="true">↗</span></a></div>
            </article>`).join('')}
          </div>
          <div class="exp-showcase__media" aria-hidden="true">
            ${MARCAS.map((m, i) => `<figure class="exp-showcase__auto${i === 0 ? ' is-activo' : ''}" data-marca-i="${i}"><span class="exp-showcase__logo">${esc(m.titulo)}</span><img src="${m.imagen}" alt="" width="480" height="190" loading="lazy" decoding="async" /></figure>`).join('')}
          </div>
        </div>
      </div>
    </section>`;
}

/* Presencia global: proyección equirectangular igual a la de public/img/experiencia/mapa-mundo.svg
   (generado de Natural Earth 110m con world-atlas: ancho 1000, latitudes de 80 a -58). */
const MAPA = { ancho: 1000, norte: 80, sur: -58 };
MAPA.alto = (MAPA.ancho * (MAPA.norte - MAPA.sur)) / 360;
const punto = (lon, lat) => [((lon + 180) / 360) * MAPA.ancho, ((MAPA.norte - lat) / (MAPA.norte - MAPA.sur)) * MAPA.alto];

/** Sedes de la lámina "disposición global de producción e I+D" de GWM. tipo: id (I+D), planta (proceso completo), ckd (SKD/CKD). */
export const SEDES = [
  { nombre: 'Baoding, China (casa matriz)', tipo: 'sede', lon: 115.46, lat: 38.87 },
  { nombre: 'Alemania', tipo: 'id', lon: 11.58, lat: 48.14 },
  { nombre: 'India', tipo: 'id', lon: 77.59, lat: 12.97 },
  { nombre: 'Japón', tipo: 'id', lon: 139.64, lat: 35.44 },
  { nombre: 'China: 10 plantas', tipo: 'planta', lon: 112, lat: 30.5 },
  { nombre: 'Eurasia (Tula)', tipo: 'planta', lon: 37.6, lat: 54.2 },
  { nombre: 'Rayong, Tailandia', tipo: 'planta', lon: 101.25, lat: 12.68 },
  { nombre: 'Iracemápolis, Brasil', tipo: 'planta', lon: -47.52, lat: -22.58 },
  { nombre: 'Almaty, Kazajistán', tipo: 'ckd', lon: 76.9, lat: 43.24 },
  { nombre: 'Jizzakh, Uzbekistán', tipo: 'ckd', lon: 67.84, lat: 40.12 },
  { nombre: 'Lahore, Pakistán', tipo: 'ckd', lon: 74.35, lat: 31.55 },
  { nombre: 'Sadat, Egipto', tipo: 'ckd', lon: 30.5, lat: 30.4 },
  { nombre: 'Accra, Ghana', tipo: 'ckd', lon: -0.19, lat: 5.6 },
  { nombre: 'Kampala, Uganda', tipo: 'ckd', lon: 32.58, lat: 0.35 },
  { nombre: 'Kuliyapitiya, Sri Lanka', tipo: 'ckd', lon: 80.04, lat: 7.47 },
  { nombre: 'Yakarta, Indonesia', tipo: 'ckd', lon: 106.85, lat: -6.2 },
  { nombre: 'Malaca, Malasia', tipo: 'ckd', lon: 102.25, lat: 2.19 },
  { nombre: 'Ambato, Ecuador', tipo: 'ckd', lon: -78.62, lat: -1.24 },
];

const LEYENDA = [['id', 'Centro de I+D'], ['planta', 'Planta de proceso completo'], ['ckd', 'Planta de ensamblaje SKD/CKD']];

function htmlMapa() {
  const marcas = SEDES.map((s, i) => {
    const [x, y] = punto(s.lon, s.lat);
    return `<g class="exp-mapa__sede exp-mapa__sede--${s.tipo}" style="--i:${i}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><circle r="${s.tipo === 'sede' ? 7 : 5}" /><title>${esc(s.nombre)}</title></g>`;
  }).join('');
  return `<section class="exp-bloque responsive__layout exp-mapa" data-mapa aria-labelledby="mapa-titulo">
      <div class="section-heading"><div><p class="eyebrow">PRESENCIA GLOBAL</p><h2 id="mapa-titulo">Producción e I+D de GWM en el mundo.</h2></div></div>
      <div class="exp-mapa__layout">
        <div class="exp-mapa__texto">
          <p>GWM tiene un sistema global de investigación y desarrollo, con centros en China, Alemania, India y Japón. Produce vehículos de proceso completo en 10 plantas en China y 3 en el exterior (Eurasia, Tailandia y Brasil), y ensambla en plantas SKD/CKD de países como Ecuador, Malasia y Pakistán.</p>
          <ul class="exp-mapa__leyenda">${LEYENDA.map(([t, x]) => `<li><span class="exp-mapa__punto exp-mapa__punto--${t}"></span>${esc(x)}</li>`).join('')}</ul>
          <ul class="exp-mapa__lista">${SEDES.map((s) => `<li class="exp-mapa__item--${s.tipo}">${esc(s.nombre)}</li>`).join('')}</ul>
        </div>
        <figure class="exp-mapa__figura">
          <svg viewBox="0 0 ${MAPA.ancho} ${MAPA.alto.toFixed(1)}" role="img" aria-label="Mapa con los centros de I+D y las plantas de GWM en el mundo">
            <image href="/img/experiencia/mapa-mundo.svg" width="${MAPA.ancho}" height="${MAPA.alto.toFixed(1)}" />
            ${marcas}
          </svg>
        </figure>
      </div>
    </section>`;
}

/** Animaciones del Mundo GWM: marcas que cambian al hacer scroll (como gwmmotors.com.br) y puntos del mapa que aparecen. */
export function initMundo(raiz = document) {
  const mapa = raiz.querySelector('[data-mapa]');
  if (mapa) {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { mapa.classList.add('is-visible'); io.disconnect(); } }, { threshold: 0.3 });
      io.observe(mapa);
    } else mapa.classList.add('is-visible');
  }

  const show = raiz.querySelector('[data-showcase]');
  if (!show) return;
  const items = [...show.querySelectorAll('.exp-showcase__item')];
  const autos = [...show.querySelectorAll('.exp-showcase__auto')];
  let actual = 0;
  const activar = (i) => {
    if (i === actual) return;
    actual = i;
    for (const el of [...items, ...autos]) el.classList.toggle('is-activo', Number(el.dataset.marcaI) === i);
  };
  const enScroll = () => {
    const r = show.getBoundingClientRect();
    const recorrido = show.offsetHeight - window.innerHeight;
    if (recorrido <= 0) return;
    const progreso = Math.min(0.999, Math.max(0, -r.top / recorrido));
    activar(Math.floor(progreso * items.length));
  };
  let pendiente = false;
  window.addEventListener('scroll', () => {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(() => { pendiente = false; enScroll(); });
  }, { passive: true });
  // Tocar una marca la muestra (y sirve con teclado y en celular).
  items.forEach((it, i) => it.querySelector('h3').addEventListener('click', () => activar(i)));
  enScroll();
}

/* ---------------------------------------------------------------- Simuladores */

/**
 * ac/dc: potencia máxima de carga del vehículo (kW). bateria: kWh. autonomia: km eléctricos de la ficha.
 * ciudad/ruta: % que se descuenta de la autonomía según el tipo de manejo (valores de GWM Brasil;
 * para modelos que Brasil no tiene se usó 3 / 12). ref: dato de referencia de GWM Brasil, no de nuestra ficha.
 */
export const VEHICULOS_CARGA = [
  { slug: 'new-h6-phev', nombre: 'Haval New H6 PHEV', bateria: 19, ac: 6.6, dc: 33, autonomia: 113, ciudad: 3, ruta: 13, ref: ['brasil'] }, // "H6 PHEV19" de GWM Brasil
  { slug: 'h6-gt-phev', nombre: 'Haval H6 GT PHEV', bateria: 34, ac: 6.6, dc: 48, autonomia: 113, ciudad: 3, ruta: 10, ref: ['brasil'] },
  { slug: 'h7-phev', nombre: 'Haval H7 PHEV', bateria: 27.5, ac: 6.6, dc: 41, autonomia: 119, ciudad: 4, ruta: 12, ref: ['brasil'] },
  { slug: 'ora-5-ev', nombre: 'Ora 5 EV', bateria: 58, ac: 11, dc: 120, autonomia: 430, ciudad: 4, ruta: 12, ref: ['brasil'] },
  { slug: 'tank-300-phev-4x4', nombre: 'Tank 300 PHEV', bateria: 37.1, ac: 6.6, dc: 50, autonomia: 106, ciudad: 3, ruta: 14, ref: ['brasil'] },
  { slug: 'tank-400-phev-4x4', nombre: 'Tank 400 PHEV', bateria: 37.1, ac: 6.6, dc: 50, autonomia: 105, ciudad: 3, ruta: 14, ref: ['ac', 'dc'] },
  { slug: 'tank-500-phev-4x4', nombre: 'Tank 500 PHEV', bateria: 37.11, ac: 6.6, dc: 50, autonomia: 105, ciudad: 3, ruta: 14, ref: ['ac'] },
  { slug: 'tank-700-phev-4x4', nombre: 'Tank 700 PHEV', bateria: 37.1, ac: 6.6, dc: 50, autonomia: null, ciudad: 3, ruta: 14, ref: ['ac', 'dc'] },
];

/** Cargadores: tipo, potencias disponibles y % extra de tiempo por pérdidas (AC 3%, DC 15%, como GWM Brasil). */
export const CARGADORES = [
  { id: 'portatil', titulo: 'Portátil', corriente: 'AC', potencias: [1, 2.8], ajuste: 3 },
  { id: 'wallbox', titulo: 'Wallbox', corriente: 'AC', potencias: [7, 11], ajuste: 3 },
  { id: 'rapido', titulo: 'Carga rápida', corriente: 'DC', potencias: [30, 50, 60, 100, 120], ajuste: 15 },
];

export const MANEJO = [{ id: 'ciudad', titulo: 'Ciudad' }, { id: 'ruta', titulo: 'Ruta' }];
export const AIRE = [{ id: 'no', titulo: 'Apagado', ajuste: 0 }, { id: 'si', titulo: 'Encendido', ajuste: 7 }];
export const OCUPANTES = [
  { id: '1', titulo: 'Solo conductor', ajuste: 3 },
  { id: '2', titulo: '2 personas', ajuste: 5 },
  { id: '4', titulo: '4 personas', ajuste: 9 },
  { id: '4c', titulo: '4 personas + equipaje', ajuste: 12 },
];

/** Horas para cargar de `desde`% a `hasta`% con un cargador de `potencia` kW. */
export function tiempoCarga(v, cargador, potencia, desde, hasta) {
  const maxAuto = cargador.corriente === 'DC' ? v.dc : v.ac;
  const efectiva = Math.min(potencia, maxAuto);
  const energia = (v.bateria * Math.max(0, hasta - desde)) / 100;
  return { horas: (energia / efectiva) * (1 + cargador.ajuste / 100), efectiva, limitada: potencia > maxAuto, maxAuto };
}

/** Km estimados: autonomía de la ficha menos los % de manejo, aire y ocupantes. */
export function autonomiaEstimada(v, manejo, aire, ocupantes) {
  const descuento = v[manejo] + aire.ajuste + ocupantes.ajuste;
  return Math.max(0, Math.round(v.autonomia * (1 - descuento / 100)));
}

export function formatoHoras(h) {
  const min = Math.max(1, Math.round(h * 60));
  const hh = Math.floor(min / 60), mm = min % 60;
  return hh ? `${hh} h${mm ? ` ${mm} min` : ''}` : `${mm} min`;
}

const radios = (nombre, opciones, elegido) =>
  opciones.map((o) => `<label class="exp-chip"><input type="radio" name="${nombre}" value="${o.id}"${o.id === elegido ? ' checked' : ''} /><span>${esc(o.titulo)}</span></label>`).join('');
const selectVehiculo = (id, lista) =>
  `<label class="exp-campo"><span>Elegí tu GWM</span><select id="${id}" name="vehiculo">${lista.map((v) => `<option value="${v.slug}">${esc(v.nombre)}</option>`).join('')}</select></label>`;

export function htmlSimuladores() {
  const conAutonomia = VEHICULOS_CARGA.filter((v) => v.autonomia);
  return `<section class="exp-bloque responsive__layout" id="simulador-carga" aria-labelledby="sim-carga-titulo">
      <div class="section-heading"><div><p class="eyebrow">SIMULADOR</p><h2 id="sim-carga-titulo">Tiempo de carga</h2></div><p>Calculá cuánto tarda en cargarse tu GWM según el cargador que uses.</p></div>
      <form class="exp-sim" data-sim-carga>
        <div class="exp-sim__controles">
          ${selectVehiculo('sim-carga-vehiculo', VEHICULOS_CARGA)}
          <fieldset class="exp-grupo"><legend>Tipo de cargador</legend><div class="exp-chips">${radios('cargador', CARGADORES, 'wallbox')}</div></fieldset>
          <fieldset class="exp-grupo"><legend>Potencia del cargador</legend><div class="exp-chips" data-potencias></div></fieldset>
          <fieldset class="exp-grupo"><legend>Nivel de batería</legend>
            <label class="exp-rango"><span>Desde <output data-desde-valor>20%</output></span><input type="range" name="desde" min="0" max="95" step="5" value="20" /></label>
            <label class="exp-rango"><span>Hasta <output data-hasta-valor>80%</output></span><input type="range" name="hasta" min="5" max="100" step="5" value="80" /></label>
          </fieldset>
        </div>
        <div class="exp-sim__resultado" aria-live="polite">
          <p class="exp-sim__etiqueta">Tiempo de carga aproximado</p>
          <p class="exp-sim__valor" data-resultado>—</p>
          <p class="exp-sim__detalle" data-detalle></p>
          <p class="exp-sim__nota">Valor aproximado. Depende de la red eléctrica, del cargador, de la temperatura de la batería y de otros factores.</p>
        </div>
      </form>
    </section>
    <section class="exp-bloque responsive__layout" id="simulador-autonomia" aria-labelledby="sim-aut-titulo">
      <div class="section-heading"><div><p class="eyebrow">SIMULADOR</p><h2 id="sim-aut-titulo">Autonomía eléctrica</h2></div><p>Estimá cuántos kilómetros recorrés en modo eléctrico según cómo manejás.</p></div>
      <form class="exp-sim" data-sim-autonomia>
        <div class="exp-sim__controles">
          ${selectVehiculo('sim-aut-vehiculo', conAutonomia)}
          <fieldset class="exp-grupo"><legend>Tipo de manejo</legend><div class="exp-chips">${radios('manejo', MANEJO, 'ciudad')}</div></fieldset>
          <fieldset class="exp-grupo"><legend>Aire acondicionado</legend><div class="exp-chips">${radios('aire', AIRE, 'no')}</div></fieldset>
          <fieldset class="exp-grupo"><legend>Ocupantes</legend><div class="exp-chips">${radios('ocupantes', OCUPANTES, '1')}</div></fieldset>
        </div>
        <div class="exp-sim__resultado" aria-live="polite">
          <p class="exp-sim__etiqueta">Autonomía estimada</p>
          <p class="exp-sim__valor" data-resultado>—</p>
          <p class="exp-sim__detalle" data-detalle></p>
          <p class="exp-sim__nota">Estimación teórica sobre la autonomía eléctrica de la ficha técnica. Varía según la forma de manejo, el clima, el estado de la batería y otras condiciones.</p>
        </div>
      </form>
    </section>`;
}

export function htmlExperiencia() {
  return `<section class="exp-bloque responsive__layout"><div class="exp-modulos">
      <a class="exp-modulo" href="/experiencia/mundo-gwm"><img src="/img/hero/vive-el-futuro.webp" alt="" width="897" height="480" loading="lazy" /><div><p class="eyebrow">MÓDULO 01</p><h2>Mundo GWM</h2><p>Conocé la historia de GWM, su presencia global y sus marcas: Haval, Ora, Poer y Tank.</p><span class="exp-marca__link">Explorar <span aria-hidden="true">↗</span></span></div></a>
      <a class="exp-modulo" href="/experiencia/simuladores"><img src="/img/fichas/ora-5-ev/galeria-2.webp" alt="" width="900" height="600" loading="lazy" /><div><p class="eyebrow">MÓDULO 02</p><h2>Simuladores</h2><p>Calculá el tiempo de carga y la autonomía eléctrica de tu GWM híbrido enchufable o eléctrico.</p><span class="exp-marca__link">Simular <span aria-hidden="true">↗</span></span></div></a>
    </div></section>`;
}

export function initSimuladores(raiz = document) {
  const carga = raiz.querySelector('[data-sim-carga]');
  if (carga) {
    const potencias = carga.querySelector('[data-potencias]');
    const vehiculo = () => VEHICULOS_CARGA.find((v) => v.slug === carga.elements.vehiculo.value);
    const cargador = () => CARGADORES.find((c) => c.id === carga.elements.cargador.value);
    const pintarPotencias = () => {
      const c = cargador(), v = vehiculo();
      const lista = c.potencias.filter((p) => c.corriente === 'AC' || p <= 100 || p <= v.dc); // 120 kW solo para quien lo admite (Ora 5), como en GWM Brasil.
      const previa = Number(carga.elements.potencia?.value);
      const elegida = lista.includes(previa) ? previa : lista[Math.min(1, lista.length - 1)];
      potencias.innerHTML = lista.map((p) => `<label class="exp-chip"><input type="radio" name="potencia" value="${p}"${p === elegida ? ' checked' : ''} /><span>${String(p).replace('.', ',')} kW</span></label>`).join('');
    };
    const calcular = () => {
      const v = vehiculo(), c = cargador();
      let desde = Number(carga.elements.desde.value), hasta = Number(carga.elements.hasta.value);
      if (hasta <= desde) { hasta = Math.min(100, desde + 5); carga.elements.hasta.value = hasta; }
      carga.querySelector('[data-desde-valor]').textContent = `${desde}%`;
      carga.querySelector('[data-hasta-valor]').textContent = `${hasta}%`;
      const r = tiempoCarga(v, c, Number(carga.elements.potencia.value), desde, hasta);
      carga.querySelector('[data-resultado]').textContent = formatoHoras(r.horas);
      carga.querySelector('[data-detalle]').textContent = r.limitada
        ? `El ${v.nombre} admite hasta ${String(r.maxAuto).replace('.', ',')} kW en carga ${c.corriente}: el cálculo usa esa potencia.`
        : `Batería de ${String(v.bateria).replace('.', ',')} kWh, del ${desde}% al ${hasta}%.`;
    };
    carga.addEventListener('change', (e) => {
      if (e.target.name === 'vehiculo' || e.target.name === 'cargador') pintarPotencias();
      calcular();
    });
    carga.addEventListener('input', (e) => { if (e.target.type === 'range') calcular(); });
    carga.addEventListener('submit', (e) => e.preventDefault());
    pintarPotencias();
    calcular();
  }

  const aut = raiz.querySelector('[data-sim-autonomia]');
  if (aut) {
    const calcular = () => {
      const v = VEHICULOS_CARGA.find((x) => x.slug === aut.elements.vehiculo.value);
      const km = autonomiaEstimada(v, aut.elements.manejo.value, AIRE.find((a) => a.id === aut.elements.aire.value), OCUPANTES.find((o) => o.id === aut.elements.ocupantes.value));
      aut.querySelector('[data-resultado]').textContent = `${km} km`;
      aut.querySelector('[data-detalle]').textContent = `Autonomía eléctrica de ficha: hasta ${v.autonomia} km.`;
    };
    aut.addEventListener('change', calcular);
    aut.addEventListener('submit', (e) => e.preventDefault());
    calcular();
  }
}
