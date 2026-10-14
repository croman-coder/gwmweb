/**
 * Motor del visor 3D de las fichas (three.js).
 *
 * ficha.js lo importa recién cuando la persona toca "Explorar en 3D", así que three.js, el modelo y
 * las texturas no pesan en la landing ni en las demás fichas. Los datos de cada modelo (archivo,
 * colores, tapizados, piezas del GLB) están en ./modelos/<slug>.js.
 *
 * Dos vistas:
 *  - Exterior: el GLB (Draco) con OrbitControls, cambio de color de la pintura y puertas y baúl que
 *    se abren con los clips del propio archivo. El fondo es transparente (lo pone el CSS) y la luz y
 *    los reflejos salen de un estudio neutro (RoomEnvironment), sin descargar ninguna foto.
 *  - Interior: panorama de 360° armado con un cubemap (6 caras) por tapizado y por fila de asientos,
 *    que se baja recién al entrar a esa vista.
 *
 * Todo se sirve desde public/3d/: el decoder Draco es el de three (examples/jsm/libs/draco/gltf).
 */
import {
  ACESFilmicToneMapping,
  AnimationMixer,
  Box3,
  CubeTextureLoader,
  LoopOnce,
  MathUtils,
  PMREMGenerator,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  Spherical,
  Vector3,
  WebGLRenderer,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const esc = (texto) => String(texto).replace(/[&<>"']/g, (c) => ESCAPES[c]);

const reducirMovimiento = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const esTactil = () => window.matchMedia('(pointer: coarse)').matches;

/* ==========================================================================
   Panel de controles (se arma con los datos del modelo)
   ========================================================================== */
function htmlPanel(config) {
  const colores = config.colores
    .map(
      (c, i) => `
      <button type="button" class="ficha-3d__color" data-color="${i}" style="--muestra:${esc(c.valor)}"
              aria-pressed="${i === 0}" aria-label="${esc(c.nombre)}" title="${esc(c.nombre)}"></button>`
    )
    .join('');
  const interiores = config.interiores
    .map(
      (t) => `
      <button type="button" class="ficha-3d__color ficha-3d__color--doble" data-interior="${esc(t.id)}"
              style="--muestra:${esc(t.muestra[0])};--muestra-2:${esc(t.muestra[1])}"
              aria-pressed="false" aria-label="${esc(t.nombre)}" title="${esc(t.nombre)}"></button>`
    )
    .join('');
  const filas = config.filas
    .map((f, i) => `<button type="button" data-fila="${esc(f.id)}" aria-pressed="${i === 0}">${esc(f.nombre)}</button>`)
    .join('');
  const ayuda = esTactil()
    ? 'Deslizá para girar · Pellizcá para acercar'
    : 'Arrastrá para girar · Ctrl + rueda para acercar · Flechas del teclado';
  return `
    <div class="ficha-3d__segmentos" role="group" aria-label="Vista">
      <button type="button" data-vista="exterior" aria-pressed="true">Exterior</button>
      <button type="button" data-vista="interior" aria-pressed="false">Interior</button>
    </div>
    <div class="ficha-3d__opciones" data-panel="exterior">
      <div class="ficha-3d__colores" role="group" aria-label="Color de la carrocería">${colores}</div>
      <p class="ficha-3d__nombre" data-nombre="color" aria-live="polite">${esc(config.colores[0].nombre)}</p>
      <div class="ficha-3d__acciones">
        <button type="button" data-alternar="puertas" aria-pressed="false">Abrir puertas</button>
        <button type="button" data-alternar="baul" aria-pressed="false">Abrir baúl</button>
      </div>
    </div>
    <div class="ficha-3d__opciones" data-panel="interior" hidden>
      <div class="ficha-3d__colores" role="group" aria-label="Tapizado">${interiores}</div>
      <p class="ficha-3d__nombre" data-nombre="interior" aria-live="polite"></p>
      <div class="ficha-3d__acciones ficha-3d__acciones--filas" role="group" aria-label="Fila de asientos">${filas}</div>
    </div>
    <p class="ficha-3d__ayuda">${ayuda}</p>`;
}

/* ==========================================================================
   Montaje
   ========================================================================== */
export async function montarVisor(visor, config) {
  const canvas = visor.querySelector('.ficha-3d__canvas');
  const escenario = visor.querySelector('.ficha-3d__escenario');
  const estado = visor.querySelector('.ficha-3d__estado');
  const panel = visor.querySelector('.ficha-3d__panel');
  const url = (archivo) => `${config.base}${archivo}`;

  // Fondo transparente: el degradé del escenario es CSS (ficha.css) y el auto se apoya en su sombra del GLB.
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;

  const escena = new Scene();
  // Lente larga (campo de visión corto): perspectiva de foto de producto, sin que el costado más cercano se agrande.
  const camara = new PerspectiveCamera(24, 16 / 9, 0.1, 500);
  const escenaInterior = new Scene();
  const camaraInterior = new PerspectiveCamera(75, 16 / 9, 0.05, 50);

  // Luz y reflejos de un estudio neutro: no hace falta bajar ninguna foto de entorno.
  const pmrem = new PMREMGenerator(renderer);
  escena.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  /* --- Modelo ---------------------------------------------------------- */
  const decoder = new DRACOLoader().setDecoderPath(config.decoder);
  const cargador = new GLTFLoader().setDRACOLoader(decoder);
  const alProgreso = (e) => {
    if (e.lengthComputable && e.total) estado.textContent = `Cargando el modelo 3D… ${Math.round((e.loaded / e.total) * 100)}%`;
  };
  estado.textContent = 'Cargando el modelo 3D…';
  const gltf = await new Promise((resolver, rechazar) => cargador.load(url(config.modelo), resolver, alProgreso, rechazar));
  decoder.dispose();

  const auto = gltf.scene;
  for (const nombre of config.quitar ?? []) auto.getObjectByName(nombre)?.removeFromParent();
  for (const nombre of config.mostrar ?? []) auto.getObjectByName(nombre)?.scale.setScalar(1);
  escena.add(auto);
  auto.updateMatrixWorld(true);

  const pinturas = new Set();
  auto.traverse((o) => {
    if (o.isMesh) [].concat(o.material).forEach((m) => m.name === config.pintura && pinturas.add(m));
  });

  /* --- Encuadre: independiente de las unidades del archivo ------------- */
  const caja = new Box3().setFromObject(auto.getObjectByName(config.referencia) ?? auto);
  const centro = caja.getCenter(new Vector3());
  const tamano = caja.getSize(new Vector3());
  const largo = Math.max(tamano.x, tamano.z);
  const mayor = Math.max(largo, tamano.y);
  camara.near = mayor / 100;
  camara.far = mayor * 100;

  // Distancia a la que el auto entra a lo ancho y a lo alto del escenario, con aire alrededor. A lo ancho se
  // usa la diagonal del auto (de tres cuartos ocupa más que su largo).
  const diagonal = Math.hypot(tamano.x, tamano.z);
  function distanciaDeEncuadre() {
    const tan = Math.tan(MathUtils.degToRad(camara.fov / 2));
    return Math.max((diagonal * 1.12) / (2 * tan * camara.aspect), (tamano.y * 2.5) / (2 * tan));
  }

  let distancia = distanciaDeEncuadre();
  camara.position.setFromSpherical(new Spherical(distancia, MathUtils.degToRad(78), MathUtils.degToRad(config.azimut ?? 35))).add(centro);

  let modo = 'exterior';
  let pendiente = 3; // cuadros por dibujar: se dibuja solo cuando algo cambió (ver pedir)
  let zoomManual = false; // la persona acercó o alejó el interior con Ctrl + rueda: el ajuste automático ya no lo pisa

  // Registrado antes que OrbitControls: la rueda sin Ctrl deja pasar el scroll de la página.
  canvas.addEventListener(
    'wheel',
    (e) => {
      if (!(e.ctrlKey || e.metaKey)) return e.stopImmediatePropagation();
      if (modo === 'interior') {
        e.preventDefault();
        zoomManual = true;
        camaraInterior.fov = MathUtils.clamp(camaraInterior.fov + e.deltaY * 0.05, 40, 105);
        camaraInterior.updateProjectionMatrix();
        pedir();
      }
    },
    { capture: true, passive: false }
  );

  const controles = new OrbitControls(camara, canvas);
  controles.target.copy(centro);
  controles.enableDamping = true;
  controles.dampingFactor = 0.08;
  controles.enablePan = false;
  controles.minPolarAngle = MathUtils.degToRad(25);
  controles.maxPolarAngle = MathUtils.degToRad(88);
  controles.autoRotate = !reducirMovimiento();
  controles.autoRotateSpeed = 0.9;
  let yaInteractuo = false;
  controles.addEventListener('start', () => {
    controles.autoRotate = false;
    yaInteractuo = true;
  });
  controles.addEventListener('change', () => pedir());
  controles.update();

  /* --- Animaciones del GLB (puertas, baúl) ----------------------------- */
  const mezclador = new AnimationMixer(auto);
  const acciones = { puertas: [], baul: [] };
  for (const [grupo, nombres] of Object.entries(config.animaciones ?? {})) {
    for (const nombre of nombres) {
      const clip = gltf.animations.find((c) => c.name === nombre);
      if (!clip) continue;
      const accion = mezclador.clipAction(clip);
      accion.setLoop(LoopOnce, 1);
      accion.clampWhenFinished = true;
      acciones[grupo].push(accion);
    }
  }
  const abiertos = { puertas: false, baul: false };
  function alternarAnimacion(grupo) {
    abiertos[grupo] = !abiertos[grupo];
    for (const accion of acciones[grupo]) {
      const duracion = accion.getClip().duration;
      accion.enabled = true;
      accion.paused = false;
      accion.timeScale = abiertos[grupo] ? 1 : -1;
      if (abiertos[grupo] && accion.time >= duracion - 1e-3) accion.time = 0;
      if (!abiertos[grupo] && accion.time <= 1e-3) accion.time = duracion;
      accion.play();
    }
    pedir();
    return abiertos[grupo];
  }

  /* --- Color e interior ------------------------------------------------- */
  function pintar(color) {
    pinturas.forEach((m) => {
      m.color.set(color.valor);
      m.emissive?.set(color.emisivo ?? '#000000');
    });
    pedir();
  }

  const cubos = new Map();
  function cargarCubo(interior, fila) {
    const clave = `${interior}/${fila}`;
    if (!cubos.has(clave)) {
      const caras = (config.caras ?? [1, 2, 3, 4, 5, 6]).map((n) => url(`interior/${interior}/${fila}/${n}.webp`));
      const promesa = new CubeTextureLoader().loadAsync(caras).then((t) => {
        t.colorSpace = SRGBColorSpace;
        t.flipY = Boolean(config.carasVolteadas); // se sube a la GPU recién en el primer dibujo, ya con este valor
        return t;
      });
      promesa.catch(() => cubos.delete(clave)); // un fallo de red no queda guardado: se puede reintentar
      cubos.set(clave, promesa);
    }
    return cubos.get(clave);
  }

  /* --- Estado de la interfaz ------------------------------------------- */
  let indiceColor = 0;
  let interiorActual = config.colores[0].interior;
  let filaActual = config.filas[0].id;
  let yaw = config.interiorYaw ?? 0;
  let pitch = 0;
  let ticket = 0; // descarta respuestas viejas si la persona cambia de vista mientras se carga

  panel.innerHTML = htmlPanel(config);
  const $ = (selector) => panel.querySelector(selector);
  const $$ = (selector) => [...panel.querySelectorAll(selector)];
  const marcar = (botones, activo) => botones.forEach((b) => b.setAttribute('aria-pressed', String(activo(b))));

  function mostrarInterior() {
    const mio = ++ticket;
    const tapizado = config.interiores.find((t) => t.id === interiorActual);
    $('[data-nombre="interior"]').textContent = tapizado?.nombre ?? '';
    marcar($$('[data-interior]'), (b) => b.dataset.interior === interiorActual);
    marcar($$('[data-fila]'), (b) => b.dataset.fila === filaActual);
    visor.dataset.estado = 'cargando-interior';
    estado.textContent = 'Cargando el interior…';
    cargarCubo(interiorActual, filaActual).then(
      (cubo) => {
        if (mio !== ticket) return;
        escenaInterior.background = cubo;
        visor.dataset.estado = 'listo';
        pedir();
      },
      () => {
        if (mio !== ticket) return;
        visor.dataset.estado = 'error-interior';
        estado.textContent = 'No se pudo cargar el interior. Probá de nuevo.';
      }
    );
  }

  function cambiarVista(nueva) {
    modo = nueva;
    ticket++;
    marcar($$('[data-vista]'), (b) => b.dataset.vista === nueva);
    $$('[data-panel]').forEach((p) => (p.hidden = p.dataset.panel !== nueva));
    controles.enabled = nueva === 'exterior';
    visor.dataset.vista = nueva;
    if (nueva === 'interior') mostrarInterior();
    else visor.dataset.estado = 'listo';
    pedir();
  }

  panel.addEventListener('click', (e) => {
    const boton = e.target.closest('button');
    if (!boton) return;
    if (boton.dataset.vista) cambiarVista(boton.dataset.vista);
    else if (boton.dataset.color !== undefined) {
      indiceColor = Number(boton.dataset.color);
      const color = config.colores[indiceColor];
      interiorActual = color.interior;
      marcar($$('[data-color]'), (b) => Number(b.dataset.color) === indiceColor);
      $('[data-nombre="color"]').textContent = color.nombre;
      pintar(color);
    } else if (boton.dataset.interior) {
      interiorActual = boton.dataset.interior;
      mostrarInterior();
    } else if (boton.dataset.fila) {
      filaActual = boton.dataset.fila;
      mostrarInterior();
    } else if (boton.dataset.alternar === 'puertas' || boton.dataset.alternar === 'baul') {
      const grupo = boton.dataset.alternar;
      const abierto = alternarAnimacion(grupo);
      boton.setAttribute('aria-pressed', String(abierto));
      boton.textContent = `${abierto ? 'Cerrar' : 'Abrir'} ${grupo === 'puertas' ? 'puertas' : 'baúl'}`;
    }
  });

  /* --- Mirar alrededor del interior y teclado -------------------------- */
  let arrastre = null;
  canvas.addEventListener('pointerdown', (e) => {
    if (modo !== 'interior') return;
    arrastre = { x: e.clientX, y: e.clientY };
    canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener('pointermove', (e) => {
    if (modo !== 'interior' || !arrastre) return;
    const k = MathUtils.degToRad(camaraInterior.fov) / canvas.clientHeight;
    mirar((e.clientX - arrastre.x) * k, (e.clientY - arrastre.y) * k);
    arrastre = { x: e.clientX, y: e.clientY };
  });
  const soltar = () => (arrastre = null);
  canvas.addEventListener('pointerup', soltar);
  canvas.addEventListener('pointercancel', soltar);

  function mirar(dYaw, dPitch) {
    yaw += dYaw;
    pitch = MathUtils.clamp(pitch + dPitch, -1.4, 1.4);
    camaraInterior.rotation.set(pitch, yaw, 0, 'YXZ');
    pedir();
  }
  camaraInterior.rotation.set(pitch, yaw, 0, 'YXZ');

  canvas.addEventListener('keydown', (e) => {
    const paso = 0.1;
    const dx = { ArrowLeft: -1, ArrowRight: 1 }[e.key] ?? 0;
    const dy = { ArrowUp: -1, ArrowDown: 1 }[e.key] ?? 0;
    if (!dx && !dy) return;
    e.preventDefault();
    if (modo === 'interior') return mirar(-dx * paso, -dy * paso);
    const esf = new Spherical().setFromVector3(camara.position.clone().sub(controles.target));
    esf.theta += dx * paso;
    esf.phi = MathUtils.clamp(esf.phi + dy * paso, controles.minPolarAngle, controles.maxPolarAngle);
    camara.position.setFromSpherical(esf).add(controles.target);
    controles.autoRotate = false;
    controles.update();
  });

  /* --- Tamaño y bucle de dibujo ---------------------------------------- */
  function pedir() {
    pendiente = Math.max(pendiente, 2);
  }
  function ajustarTamano() {
    const { clientWidth: ancho, clientHeight: alto } = escenario;
    if (!ancho || !alto) return;
    renderer.setSize(ancho, alto, false);
    camara.aspect = camaraInterior.aspect = ancho / alto;
    camara.updateProjectionMatrix();
    // En un escenario vertical (celular) el campo de visión del interior se abre para que se vea algo más que el volante.
    if (!zoomManual) {
      const abierto = MathUtils.radToDeg(2 * Math.atan(Math.tan(MathUtils.degToRad(40)) / camaraInterior.aspect));
      camaraInterior.fov = MathUtils.clamp(abierto, 75, 105);
    }
    camaraInterior.updateProjectionMatrix();
    encuadrar();
    pedir();
  }
  // Con otro tamaño de escenario (giro del celular, ventana) el auto vuelve a entrar entero.
  function encuadrar() {
    distancia = distanciaDeEncuadre();
    controles.minDistance = distancia * 0.55;
    controles.maxDistance = distancia * 1.5;
    if (yaInteractuo) return; // no se le mueve la cámara a quien ya la acomodó
    const direccion = camara.position.clone().sub(controles.target).normalize();
    camara.position.copy(direccion.multiplyScalar(distancia)).add(controles.target);
  }
  const observadorTamano = new ResizeObserver(ajustarTamano);
  observadorTamano.observe(escenario);
  ajustarTamano();

  let cuadro = 0;
  let visible = true;
  let anterior = performance.now();
  const hayAnimacion = () => Object.values(acciones).some((lista) => lista.some((a) => a.isRunning()));
  function bucle() {
    cuadro = requestAnimationFrame(bucle);
    const ahora = performance.now();
    const dt = Math.min((ahora - anterior) / 1000, 0.1); // tope: tras una pausa no salta de golpe
    anterior = ahora;
    mezclador.update(dt); // también en el interior: una puerta que se estaba cerrando termina de cerrarse
    if (modo === 'exterior') {
      controles.update(dt);
      if (controles.autoRotate || hayAnimacion()) pedir();
      if (pendiente > 0) renderer.render(escena, camara);
    } else if (pendiente > 0) {
      renderer.render(escenaInterior, camaraInterior);
    }
    if (pendiente > 0) pendiente--;
  }
  const arrancar = () => {
    if (!cuadro && visible && !document.hidden) {
      anterior = performance.now();
      cuadro = requestAnimationFrame(bucle);
    }
  };
  const parar = () => {
    cancelAnimationFrame(cuadro);
    cuadro = 0;
  };
  const observadorVisible = new IntersectionObserver((entradas) => {
    visible = entradas.some((e) => e.isIntersecting);
    if (visible) arrancar();
    else parar();
  });
  observadorVisible.observe(escenario);
  const alCambiarVisibilidad = () => (document.hidden ? parar() : arrancar());
  document.addEventListener('visibilitychange', alCambiarVisibilidad);

  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    parar();
    visor.dataset.estado = 'error';
  });

  pintar(config.colores[0]);
  visor.dataset.vista = 'exterior';
  arrancar();

  return {
    destruir() {
      parar();
      observadorTamano.disconnect();
      observadorVisible.disconnect();
      document.removeEventListener('visibilitychange', alCambiarVisibilidad);
      controles.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
