/** Páginas editoriales y locales compartidas por el HTML estático y la vista de desarrollo. */
import { htmlCatalogo } from "./render/catalogo.js";
import { DEALERS, mapaHref, telHref } from "./concesionarios.js";
import { esc } from "./home/util.js";

export const PAGINAS = {
  "/modelos": {
    titulo: "Todos los modelos GWM en Paraguay",
    descripcion:
      "Explorá precios de referencia, filtrá por tecnología y carrocería y compará SUVs, pickups y eléctricos de GWM Paraguay.",
    tipo: "todos",
    etiqueta: "ENCONTRÁ EL TUYO",
  },
  "/hibridos": {
    titulo: "Autos y SUVs híbridos GWM en Paraguay",
    descripcion:
      "Conocé los GWM HEV y PHEV en Paraguay. Compará tecnologías, precios y versiones Haval, Tank y Poer.",
    tipo: "hibridos",
    etiqueta: "DOS TECNOLOGÍAS, MÁS POSIBILIDADES",
    bloques: [
      [
        "Híbrido HEV: sin enchufe",
        "Combina un motor de combustión y uno eléctrico. La batería recupera energía al conducir y al frenar: no necesitás conectarlo a un cargador.",
      ],
      [
        "Híbrido PHEV: también se enchufa",
        "Combina combustión y electricidad y permite recargar la batería desde una fuente externa. Su autonomía eléctrica depende del modelo, la carga y las condiciones de uso.",
      ],
      [
        "Elegí según tu rutina",
        "Si tenés dónde cargar habitualmente, explorá los PHEV. Si preferís conducir sin organizar recargas, conocé los HEV. Un asesor puede ayudarte a revisar qué versión se adapta a vos.",
      ],
    ],
  },
  "/electricos": {
    titulo: "Vehículos eléctricos GWM ORA en Paraguay",
    descripcion:
      "Descubrí la gama eléctrica ORA, cómo funciona su recarga y qué consultar sobre versiones y disponibilidad en Paraguay.",
    tipo: "electricos",
    etiqueta: "UNA NUEVA FORMA DE MOVERTE",
    bloques: [
      [
        "Conducción 100% eléctrica",
        "Un vehículo eléctrico utiliza energía almacenada en su batería y se recarga mediante una conexión eléctrica. No necesita combustible para mover su motor.",
      ],
      [
        "Pensá dónde vas a cargar",
        "Revisá las opciones de recarga cerca de tus recorridos y la posibilidad de instalar un cargador en casa. Compatibilidad, potencia y tiempos se confirman para cada versión.",
      ],
      [
        "Información para Paraguay",
        "Consultá versiones, conectores, autonomía homologada, garantía de batería y disponibilidad local. Las imágenes y el visor 3D son ilustrativos y pueden mostrar equipamiento de otro mercado.",
      ],
    ],
  },
  "/pickups": {
    titulo: "Pickups GWM Wingle y Poer en Paraguay",
    descripcion:
      "Compará las pickups Wingle 7, Poer Diesel y Poer P500 de GWM Paraguay. Consultá versiones, precios de referencia y opciones 4x4.",
    tipo: "pickups",
    etiqueta: "PARA TU TRABAJO. PARA TUS PLANES.",
    bloques: [
      [
        "Una pickup para cada uso",
        "Compará Wingle y Poer según el trabajo que hacés, tus recorridos y el equipamiento que necesitás. Revisá la capacidad de carga y remolque en la ficha técnica de la versión elegida.",
      ],
      [
        "Diésel o híbrida enchufable",
        "La gama incluye alternativas diésel y la Poer P500 PHEV. Elegí teniendo en cuenta el tipo de recorrido y el acceso a una fuente de recarga.",
      ],
    ],
  },
  "/concesionarios": {
    titulo: "Concesionarias GWM en Paraguay",
    descripcion:
      "Encontrá direcciones, teléfonos y horarios de los puntos de venta GWM en Asunción, San Lorenzo y Ciudad del Este.",
    etiqueta: "CERCA DE VOS",
  },
  "/guia/hev-vs-phev": {
    titulo: "HEV, PHEV o eléctrico: ¿qué GWM elegir?",
    descripcion:
      "Conocé las diferencias entre un híbrido HEV, un híbrido enchufable PHEV y un eléctrico y elegí según tu rutina en Paraguay.",
    etiqueta: "GUÍA DE TECNOLOGÍAS",
    bloques: [
      [
        "¿Qué es un híbrido HEV?",
        "Un HEV combina un motor de combustión con asistencia eléctrica. Recupera energía durante la marcha y el frenado y no requiere enchufarse. Es una alternativa para quienes quieren conocer la conducción híbrida sin depender de un punto de carga.",
      ],
      [
        "¿Qué cambia en un PHEV?",
        "Un PHEV también tiene motor de combustión, pero su batería admite recarga externa. Para aprovechar su conducción eléctrica conviene contar con un lugar de carga habitual. Al agotarse la carga utilizable, el funcionamiento depende de la gestión híbrida del vehículo.",
      ],
      [
        "¿Cómo funciona un eléctrico?",
        "Un eléctrico utiliza un motor alimentado por su batería y necesita recarga externa. Para elegirlo, revisá la autonomía de la versión, el tipo de conector y las alternativas de recarga para tus trayectos.",
      ],
      [
        "¿Cuál conviene para mi rutina?",
        "Considerá cuánto recorrés, dónde podrías cargar, qué viajes largos hacés y cuántas personas viajan con vos. Pedí una prueba de manejo y confirmá el equipamiento local antes de decidir. El consumo y la autonomía varían con el uso: una cifra homologada no es una garantía de rendimiento en todos los recorridos.",
      ],
    ],
    relacionados: ["/hibridos", "/electricos", "/guia/carga-en-casa"],
  },
  "/guia/carga-en-casa": {
    titulo: "Cómo preparar la carga de tu GWM en casa",
    descripcion:
      "Qué revisar sobre instalación eléctrica, cargadores, conectores y tiempos antes de cargar un GWM eléctrico o PHEV en casa.",
    etiqueta: "GUÍA DE RECARGA",
    bloques: [
      [
        "Primero, confirmá la versión",
        "Consultá el conector, la potencia de carga admitida y los accesorios incluidos en el GWM que vas a comprar. No todos los modelos ni las versiones aceptan las mismas opciones de recarga.",
      ],
      [
        "Revisá la instalación",
        "Pedí a un profesional electricista que evalúe tu instalación, las protecciones, la puesta a tierra y el circuito que requiere el cargador. Seguí las instrucciones del vehículo y del equipo; evitá improvisar adaptadores o extensiones.",
      ],
      [
        "¿Cuánto tarda la carga?",
        "El tiempo depende de la capacidad de la batería, el nivel inicial, la potencia disponible, los límites del vehículo y la temperatura. Solicitá los tiempos y condiciones indicados para la versión comercializada en Paraguay.",
      ],
      [
        "¿Qué consulto antes de comprar?",
        "Preguntá si el cargador y su instalación están incluidos, quién los instala, qué garantía tiene el equipo y qué asistencia se ofrece. Para un edificio o condominio, revisá también los permisos de instalación.",
      ],
    ],
    relacionados: ["/electricos", "/hibridos", "/guia/hev-vs-phev"],
  },
  "/guia/h6-hev-vs-phev": {
    titulo: "Haval H6 HEV vs H6 PHEV en Paraguay",
    descripcion:
      "Compará el Haval New H6 HEV y New H6 PHEV: tecnología, forma de recarga, precios de referencia y versiones de Paraguay.",
    etiqueta: "ELEGÍ TU H6",
    bloques: [
      [
        "New H6 HEV: híbrido sin enchufe",
        "El New H6 HEV utiliza una motorización híbrida autorrecargable. Su batería recibe energía del sistema híbrido al conducir: no necesitás conectarlo a una fuente externa.",
      ],
      [
        "New H6 PHEV: híbrido enchufable",
        "El New H6 PHEV permite recargar desde una fuente externa y conducir en modo eléctrico según la carga disponible y las condiciones de uso. Es importante revisar dónde vas a cargar habitualmente.",
      ],
      [
        "Compará las versiones locales",
        "La diferencia no termina en la batería. Revisá transmisión, tracción, seguridad y equipamiento en las fichas de Paraguay. Compará ambos modelos en el catálogo y consultá el precio actualizado con un asesor.",
      ],
      [
        "Probá cuál va con vos",
        "Pedí un test drive de la versión que te interesa. La disponibilidad de unidades y horarios se coordina con la concesionaria; enviar la solicitud no confirma un turno.",
      ],
    ],
    relacionados: ["/modelos/new-h6-hev", "/modelos/new-h6-phev", "/hibridos"],
  },
  "/postventa": {
    titulo: "Garantía y mantenimiento GWM en Paraguay",
    descripcion:
      "Consultá las condiciones de garantía de tu GWM, solicitá mantenimiento y encontrá los canales de atención de Grupo Santa Rosa en Paraguay.",
    etiqueta: "TE ACOMPAÑAMOS EN CADA KILÓMETRO",
    bloques: [
      [
        "La garantía de tu versión",
        "Las condiciones dependen del vehículo, su versión y su documentación de entrega. Consultá la cobertura, el plazo, el límite de kilómetros y las condiciones de batería si corresponde. Las garantías publicadas en otros países no determinan la cobertura en Paraguay.",
      ],
      [
        "Tu plan de mantenimiento",
        "Revisá el manual y el plan de servicio de tu vehículo. El intervalo puede depender del tiempo, el kilometraje y las condiciones de uso. Nuestro canal de atención puede ayudarte a coordinar el servicio que necesitás.",
      ],
      [
        "Solicitá tu mantenimiento",
        "Completá el formulario de service con tus datos, modelo, año y el servicio requerido. La fecha elegida es una preferencia: el equipo confirma la disponibilidad y el turno.",
      ],
      [
        "Repuestos y atención",
        "Para consultar repuestos o coberturas, tené a mano el modelo, año y versión. El asesor puede solicitar el número de chasis en el canal de atención para identificar el vehículo.",
      ],
    ],
    relacionados: ["/concesionarios", "/#postventa", "/#reclamos"],
  },
  "/privacidad": {
    titulo: "Privacidad y uso de tus datos",
    descripcion:
      "Información sobre los formularios, los enlaces de WhatsApp, los datos de contacto y las preferencias de medición en la web de GWM Paraguay.",
    etiqueta: "INFORMACIÓN PARA VOS",
    bloques: [
      [
        "Datos de tus consultas",
        "Los formularios solicitan datos de contacto y la información necesaria para atender una cotización, una solicitud de test drive o un servicio. El correo y los comentarios de la consulta comercial son opcionales. Evitá incluir contraseñas, documentos o datos bancarios.",
      ],
      [
        "Cómo se envía una solicitud",
        "Antes de enviar, el formulario indica si la solicitud se recibirá desde la web o si continuará en WhatsApp. Cuando continúa en WhatsApp, debés enviar el mensaje allí para que el equipo lo reciba. La apertura de WhatsApp por sí sola no confirma la recepción ni una reserva.",
      ],
      [
        "Finalidad y atención",
        "La información de la solicitud se utiliza para responder tu consulta y coordinar la atención con el equipo correspondiente de GWM y Grupo Santa Rosa en Paraguay. Podés consultar sobre tus datos o solicitar su actualización a experienciacliente@santarosa.com.py.",
      ],
      [
        "Preferencias y medición",
        "El sitio conserva durante la sesión los modelos que elegís para comparar. El menú de cookies guarda tu elección de privacidad durante hasta 180 días. La medición opcional de navegación requiere tu permiso y no incluye los datos personales que completás en los formularios. Podés cambiar tu elección desde Configurar cookies en el pie.",
      ],
      [
        "Servicios externos",
        "Los enlaces a WhatsApp, mapas y redes sociales abren servicios de terceros, con sus propias políticas de privacidad. El visor 3D y las imágenes de los vehículos se sirven desde este sitio.",
      ],
    ],
  },
  "/cookies": {
    titulo: "Política de cookies",
    descripcion:
      "Conocé qué almacenamiento utiliza GWM Paraguay y elegí tus preferencias de cookies necesarias y analíticas.",
    etiqueta: "TU PRIVACIDAD, TU ELECCIÓN",
    bloques: [
      [
        "Cookies y almacenamiento del navegador",
        "Las cookies son pequeños archivos que un sitio guarda en tu navegador. Este sitio también utiliza almacenamiento de sesión para mantener funciones que solicitás. Podés elegir qué almacenamiento opcional permitís desde el menú de cookies.",
      ],
      [
        "Cookies necesarias",
        "La cookie propia gwm_cookie_consent guarda tu elección de privacidad, su fecha y la versión de estas preferencias durante hasta 180 días. No contiene tu nombre ni tus datos de contacto. Durante la sesión, gwm-comparacion conserva los vehículos que seleccionás para comparar.",
      ],
      [
        "Cookies analíticas",
        "Solo se permite la medición opcional cuando la aceptás. Si Google Analytics está habilitado en el sitio, puede usar cookies de la familia _ga para medir navegación; sus plazos dependen de la configuración del servicio. La atribución de campaña gwm-campana se conserva durante la sesión únicamente si permitís esta categoría. No se envían a analítica los datos personales de tus formularios.",
      ],
      [
        "Tu elección",
        "Aceptar cookies permite las categorías necesarias y analíticas. Solo cookies necesarias desactiva la medición opcional. Configuración te permite decidir sobre la categoría analítica. No usamos categorías publicitarias ni de personalización. Cerrar la configuración sin guardar no cambia tu elección.",
      ],
      [
        "Cambiar o retirar el permiso",
        "Podés abrir Configurar cookies desde el pie en cualquier momento. Al desactivar la categoría analítica se detiene el envío de eventos a Google Analytics y se retiran las cookies de analítica del sitio que pueden eliminarse desde el navegador. También podés gestionar o borrar el almacenamiento desde los ajustes de tu navegador.",
      ],
      [
        "Consultas",
        "Para consultar sobre privacidad o tus datos, escribí a experienciacliente@santarosa.com.py. Los enlaces a WhatsApp, mapas y redes sociales abren servicios externos con sus propias políticas.",
      ],
    ],
  },
};

export function htmlDealers() {
  return `<section class="locales responsive__layout"><h2>Elegí tu punto de venta</h2><p>Contactá al local para confirmar sus horarios y la disponibilidad del vehículo que querés conocer.</p><div class="locales-grid">${DEALERS.map((d, i) => `<article class="local-card" id="local-${i + 1}"><p class="eyebrow">${esc(d.ciudad)}</p><h3>${esc(d.marca)} · ${esc(d.nombre)}</h3><address>${esc(d.direccion)}</address><p>${esc(d.horario)}</p><p>${d.telefonos.map((t) => `<a href="${telHref(t)}">${esc(t)}</a>`).join("<br />")}</p><a class="action action--dark" href="${esc(mapaHref(d))}" target="_blank" rel="noopener">Cómo llegar ↗</a></article>`).join("")}</div></section>`;
}

export function htmlPagina(ruta) {
  const p = PAGINAS[ruta];
  if (!p)
    return `<section class="page-intro responsive__layout"><p class="eyebrow">ERROR 404</p><h1>No encontramos esta página</h1><p>Podés volver al inicio o explorar los vehículos GWM.</p><a class="action action--dark" href="/modelos">Ver modelos ↗</a></section>`;
  const fotos = {
    "/modelos": "/img/fichas/tank-500-hev-4x4/portada.webp",
    "/hibridos": "/img/fichas/new-h6-hev/portada.webp",
    "/electricos": "/img/fichas/ora-5-ev/portada.webp",
    "/pickups": "/img/fichas/poer-diesel/portada.webp",
  };
  const foto = fotos[ruta];
  return `<article class="content-page"><header class="page-intro responsive__layout${foto ? " page-intro--visual" : ""}"><div class="page-intro__texto"><nav class="breadcrumb" aria-label="Ubicación"><a href="/">Inicio</a><span aria-hidden="true">/</span><span aria-current="page">${esc(p.etiqueta)}</span></nav><p class="eyebrow">${p.etiqueta}</p><h1>${esc(p.titulo)}</h1><p>${esc(p.descripcion)}</p></div>${foto ? `<div class="page-intro__media"><img src="${foto}" alt="" width="1000" height="650" fetchpriority="high" /></div>` : ""}</header>
    ${p.bloques ? `<div class="editorial responsive__layout">${p.bloques.map(([titulo, texto]) => `<section><h2>${esc(titulo)}</h2><p>${esc(texto)}</p></section>`).join("")}</div>` : ""}
    ${p.tipo ? htmlCatalogo(p.tipo, "Explorá los modelos", "TU PRÓXIMO GWM") : ""}
    ${ruta === "/concesionarios" ? htmlDealers() : ""}
    ${!["/privacidad", "/cookies"].includes(ruta) ? `<section class="page-cta responsive__layout"><div><p class="eyebrow">DA EL PRÓXIMO PASO</p><h2>Conocé tu GWM de cerca.</h2><p>Un asesor te ayuda a elegir la versión para vos.</p></div><div><button class="action action--dark" type="button" data-lead="cotizacion">Solicitá una cotización ↗</button><button class="action action--line" type="button" data-lead="testdrive">Solicitá un test drive</button>${ruta === "/postventa" ? '<a class="action action--line" href="/#postventa">Solicitá mantenimiento</a>' : ""}</div></section>` : ""}
    ${ruta === "/cookies" ? '<div class="cookies-policy-control responsive__layout"><button class="action action--dark" type="button" data-cookies-preferencias>Configurar cookies</button><a href="/privacidad">Privacidad y uso de tus datos ↗</a></div>' : ""}
    ${p.relacionados ? `<nav class="related-pages responsive__layout" aria-label="Seguí explorando">${p.relacionados.map((href) => `<a href="${href}">${esc(PAGINAS[href]?.titulo || { "/#postventa": "Solicitá mantenimiento", "/#reclamos": "Atención al cliente" }[href] || (href.includes("phev") ? "Haval New H6 PHEV" : "Haval New H6 HEV"))} ↗</a>`).join("")}</nav>` : ""}
  </article>`;
}
