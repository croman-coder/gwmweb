# GWM Paraguay — Landing

Landing page de la marca GWM (Great Wall Motors) para Paraguay, distribuida por
Grupo Santa Rosa.

## De dónde sale cada cosa

| Fuente | Qué se tomó |
| --- | --- |
| [gwm-mx.com/es](https://www.gwm-mx.com/es) | **La arquitectura de la home** (desde el 2026-10-14): cabecera inmersiva con megamenú, hero de slides, selector de modelos, tarjetas, slider de postventa, barra de herramientas, banners, "Hello, Tomorrow", tarjetas de dos columnas y pie con columnas, con los mismos nombres de clase (`cmp__*`, `kvswiper-*`, `car-*`, `assemble-item`...) y las medidas tomadas de la página en funcionamiento. Además, los spots de video del hero (16:9 y 9:16) y el video institucional. Ver [Arquitectura de gwm-mx.com](#arquitectura-de-gwm-mxcom-y-cómo-se-adaptó). |
| [gwm-mx.com/mx-vr](https://www.gwm-mx.com/mx-vr/) | El **visor 3D del Ora 5 EV**: el modelo (GLB) y las texturas del interior en 360°. Se descargaron el 2026-10-14 y se sirven desde `public/3d/`. Ver [Visor 3D](#visor-3d). |
| `www.gwm.com.py` | El contenido de partida: catálogo, precios, banners de campaña, logos, favicons y datos de contacto. Y las **fichas de modelo**: sus textos, versiones con precio, imágenes y PDF de ficha técnica, más el diseño de la ficha. Todo se descargó y se sirve desde `public/`; el sitio no lo consulta en runtime. |

La experiencia actual suma catálogo, comparación y consultas comerciales; los detalles
de la arquitectura original se conservan abajo como referencia de los materiales.

## URLs y SEO

Las secciones de cada ficha se recorren con botones sin agregar fragmentos a la URL.
Los enlaces antiguos con `#` se resuelven desde `src/js/navegacion.js`: se conserva
la sección solicitada o se abre su página propia, manteniendo los parámetros de campaña.
Mantenimiento y atención al cliente están en `/postventa/agendar-service` y
`/postventa/reclamos`. El formulario se comparte desde `src/js/render/agenda.js`.

El build entrega 30 páginas completas: un H1 y metadatos propios por URL, canonical,
Open Graph, Twitter, datos estructurados de página, vehículos, categorías y sucursales,
sitemap y robots. Las variantes `.html`, la barra final y los productos antiguos tienen
redirección permanente. `npm run build` y `SITE_TEST_URL=<origen> node tests/sitio.test.js`
comprueban contenido, enlaces, metadatos, redirecciones y 404 real.

## Stack

- **Splide** — el hero (con fundido entre slides) y el slider de concesionarias.
- **three.js** — solo para el [visor 3D](#visor-3d), en un archivo aparte que se baja al usarlo.
- **Vite** — servidor de desarrollo y build.

Sin frameworks de JS: la lógica propia es vanilla. **Ya no se usa Bootstrap**: la
home sigue la arquitectura de gwm-mx.com, que no lo usa, y el CSS pasó de 249 KB
(35 KB comprimido) a 38 KB (8 KB). Lo poco que daba (reset, `[hidden]`, márgenes
de párrafos y listas) está en la sección "Base" de `styles.css`.

## Puesta en marcha

```bash
npm install
npm run dev
```

El sitio queda en `http://localhost:5173`.

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Sirve el build de `dist/` para revisarlo |

## Estructura

```
index.html               Marcado de la landing, con la arquitectura de gwm-mx.com
src/css/styles.css       Base, escala tipográfica y todos los componentes de la home, cabecera y pie
src/css/concesionarios.css  Pestañas de ciudad y tarjetas de los puntos de venta
src/css/ficha.css        Estilos de la ficha de modelo (solo se carga en las fichas)
src/js/home/             Cabecera (megamenú y menú móvil), hero, selector de modelos, destacados, postventa y pie
src/js/modelos.js        Catálogo: modelos (con su slug), categorías y slides del hero
src/js/fichas.js         Contenido de las 16 fichas: textos, versiones, imágenes y PDF
src/js/ficha.js          Arma la página /modelos/<slug> (se carga solo en las fichas)
src/js/tecnica/          Especificaciones técnicas de cada modelo (<slug>.js), de las hojas en PDF
src/js/sitio.js          URL pública y metadatos de cada ficha (los comparten el navegador y el build)
src/js/visor3d/          Visor 3D: motor.js (three.js) y modelos/<slug>.js con los datos de cada modelo
scripts/seo.js           Plugin de Vite: HTML por ficha, sitemap.xml y robots.txt al compilar
scripts/generar-og.py    Genera public/img/og/<slug>.jpg, la imagen con que se comparte cada ficha
nginx.conf               Servidor de producción (fichas, cache, cabeceras de seguridad)
nginx-seguridad.inc      Cabeceras de seguridad, incluidas desde nginx.conf en cada location
src/js/whatsapp.js       WhatsApp de ventas y armado de enlaces con el mensaje
src/js/concesionarios.js Puntos de venta (datos) y helpers de teléfono y mapa
src/js/postventa.js      Servicios del agendamiento, WhatsApp de Postventa y reclamos
src/js/main.js           Puntos de venta, formulario de agendamiento y enrutado (landing o ficha)
public/video/            Spots de gwm-mx.com (16:9 y 9:16) + video institucional
public/img/poster/       Posters de cada video (fallback y primer frame)
public/img/modelos/      Fotos de modelos (webp): 15 archivos para 16 modelos,
                         porque Ora 5 EV y Ora 5 HEV comparten foto
public/img/hero/         Banners de campaña y de servicios de gwm.com.py
public/img/fichas/       Imágenes de las fichas (webp), una carpeta por modelo
public/fichas/           PDF de ficha técnica, uno por modelo (<slug>.pdf)
public/3d/               Modelo 3D y texturas del visor (ora-5-ev/) y decoder Draco (draco/)
public/img/og/           Imagen JPG 1200x627 con que se comparte cada ficha (la genera scripts/generar-og.py)
public/img/brand/        Logo GWM, wordmark de Grupo Santa Rosa e imagen Open Graph.
                         El de Santa Rosa es el original a color de santarosa.com.py:
                         el pie lo muestra en blanco con un filtro CSS (ver index.html)
public/fonts/            GWMSans (Light/Regular/Bold), subseteada a latín
public/favicon/          Set de favicons
```

## Cómo editar el catálogo

Todo vive en [`src/js/modelos.js`](src/js/modelos.js): al tocar `MODELOS` se
actualizan a la vez el selector "Nuestros modelos", el megamenú de la cabecera
(con sus filtros), el menú del celular, las columnas del pie y el `<select>` del
formulario. Los accesos fijos del pie (cotizar, concesionaria, mantenimiento)
están escritos a mano en `index.html`.

Además de los datos de cada modelo, el archivo define:

- **`CLASIFICACION`**: tipo de motor (eléctrico, híbrido, diésel) y carrocería
  (hatchback, SUV, todoterreno, pick up) de cada slug. Son los filtros del
  megamenú; un modelo nuevo se clasifica ahí.
- **`DESTACADOS`**: los slugs de "Modelos destacados" y, el primero, el modelo con
  que arranca el selector. Hoy: Ora 5 EV, New H6 HEV y Tank 500 HEV.
- **`portadaModelo(slug)`**: la imagen de cada modelo en el selector es el banner
  de su ficha (`portada.webp` / `portada-m.webp`).

Para agregar un modelo:

1. Poner la foto en `public/img/modelos/` (480×190, webp). Ojo con el fondo: las
   fotos actuales traen **fondo blanco opaco** (solo las de Ora son
   transparentes), por eso toda zona que las muestra tiene que ser blanca pura.
   Sobre cualquier gris se ven como un recuadro. Con fondo transparente podrían
   ir sobre cualquier color.
2. Sumar la entrada al array `MODELOS` con `categoria`, `nombre`, `slug`,
   `precio`, `imagen` y `bajada`. `precio: null` muestra "Consultar precio";
   `versiones` (opcional) lista las versiones debajo del nombre, como hace Poer
   Diesel. El `slug` forma parte de la URL de la ficha (`/modelos/<slug>`): no
   cambiarlo una vez publicado.
3. Cargar su ficha (ver la sección siguiente).

No hay campo `url`: cada tarjeta, enlace del megamenú y CTA del hero lleva a la
ficha del modelo, `/modelos/<slug>`.

Para sumar un slide al hero, agregar una entrada a `SLIDES`. Si tiene `video` y
`videoMobile` usa los recortes 16:9 y 9:16; si solo tiene `imagen`, queda como
banner estático. El título del slide sale del nombre del modelo; si el banner ya
trae el nombre escrito en la imagen (Tank 400, New H6 HEV, H6 GT PHEV), se marca
`tituloIncrustado: true` y el hero muestra solo el precio y el botón.

## Fichas de modelo

Cada modelo tiene su página en `/modelos/<slug>` (por ejemplo,
`/modelos/new-h6-hev`), que replica la ficha de gwm.com.py: barra de secciones,
portada con precio, versiones, diseño, tecnología, galería, diseño interior y
exterior, las especificaciones técnicas completas y el PDF de ficha técnica. El
menú, el pie y la tipografía son los del sitio.

- **Contenido:** [`src/js/fichas.js`](src/js/fichas.js). Una sección sin datos no
  se muestra: el Wingle 7 no tiene "Diseño" ni "Tecnología", y la ficha de Ora 5
  HEV es una ficha mínima con un aviso (`aviso`).
- **Imágenes:** `public/img/fichas/<slug>/`, en WebP: `portada`, `portada-m`
  (celular), `diseno`, `tecnologia`, `galeria-<n>`, `interior` y `exterior`.
- **PDF de ficha técnica:** `public/fichas/<slug>.pdf`.
- **Especificaciones técnicas:** [`src/js/tecnica/<slug>.js`](src/js/tecnica/). La
  tabla completa de la hoja técnica del modelo, en grupos desplegables (Motor,
  Dimensiones, Exterior, Interior, Seguridad...). Cuando la hoja compara varias
  versiones (Wingle 7, Jolion Pro HEV, Poer Diesel) se muestran lado a lado. Ver
  [Especificaciones técnicas](#especificaciones-técnicas).
- **Precios:** salen de las versiones de cada ficha, en USD y con la nota de
  precios de referencia. El "desde" del catálogo coincide con la versión más
  barata.
- **Cotizar:** los botones abren el WhatsApp de ventas con el modelo (y la
  versión) ya nombrados en el mensaje. Sin precio, el botón dice "Consultar por
  WhatsApp".

Para agregar o cambiar una ficha: sumar el `slug` en `modelos.js`, copiar una
entrada parecida en `fichas.js`, poner las imágenes y el PDF con los nombres de
arriba y correr `npm run build`. La estructura de cada ficha está explicada al
principio de `fichas.js`.

**Cómo funciona la ruta.** El build genera el contenido completo de cada ficha en
`dist/modelos/<slug>.html`, con portada, versiones, tablas técnicas y metadatos.
`src/js/render/ficha.js` comparte el HTML entre el build y el navegador. `ficha.js`
activa las interacciones sin reemplazar el HTML estático; en desarrollo lo genera
si no está presente. nginx devuelve 404 real para una ruta inexistente y redirige
las direcciones antiguas de producto según `scripts/rutas.js`.
`/modelos` ahora es un catálogo con filtros y comparación, con HTML propio.

**Origen del contenido.** Salió de las fichas de gwm.com.py (relevadas el
2026-10-06 a partir del HTML que aportó Marketing). Los textos están tal cual,
salvo erratas (tildes y tipeos) corregidas sin cambiar el sentido. Las tres
fichas de Ora no existían en el sitio anterior: usan texto e imágenes de
gwm.com.uy, **sin precios, versiones ni ficha técnica**, y falta que Marketing
las revise o las reemplace.

### Especificaciones técnicas

Salen de las hojas técnicas oficiales (`public/fichas/<slug>.pdf`, página 2) y
quedan en un archivo por modelo, `src/js/tecnica/<slug>.js`:

```js
export default {
  columnas: ['HIGH (Elite)', 'TOP (Deluxe)'], // vacío si la hoja trae una sola versión
  secciones: [
    { titulo: 'Exterior', filas: [
      ['Faros frontales', 'LED'],               // texto
      ['Antena tipo tiburón', true],            // incluido en todas las versiones
      ['Luz alta inteligente', [false, true]],  // un valor por columna cuando difiere
    ] },
  ],
};
```

Las filas no incluidas en ninguna versión no se listan. Cada archivo lleva al
principio, como comentario, **lo que se corrigió u omitió respecto de la hoja**.
Para cambiar un dato basta con editar ese archivo; el resto se arma solo. Un
modelo sin archivo (las tres Ora, que no tienen hoja técnica) no muestra la sección.

**Cómo se armaron.** Diez de las trece hojas traen texto real: se extrajo con un
intérprete propio del contenido del PDF (texto, puntos de equipamiento y líneas de
cada fila). Las de Poer 2.0T/2.4T, Poer P500 y Tank 700 no traen texto
seleccionable (son imagen): se leyeron con el OCR local de Windows (nada salió del
equipo) y se **revisaron renglón por renglón contra la imagen**. Después se pasó
el corrector ortográfico en español sobre todo el texto. Las 13 tablas suman
1.227 filas.

**Qué se corrigió** (el detalle por modelo está en cada archivo):

- Erratas de las hojas y del OCR ("Intección", "Sequro", "Fatiqa", "espep"...),
  unidades faltantes (mm, kWh, Nm) y separadores de miles.
- Grupos que la hoja mezcla o no titula: se separaron (por ejemplo, el chasis del
  H6 y del H7, que la hoja deja bajo "Motor combinado" y "Exterior").
- Filas repetidas o restos de otra plantilla (H6, Jolion).
- **Datos que conviene confirmar con el fabricante o con Marketing:**
  - *H6 GT PHEV:* en la hoja los valores de "Multimedia" y "Seguridad" están
    corridos una fila. Se reasignaron (Android Auto/CarPlay = inalámbrico,
    pantalla = 12,3", sensores = 12, cámaras = 5, "Desvío inteligente" = aleja el
    coche al adelantar camiones).
  - *Poer 2.0T/2.4T:* "Medidas del vehículo" dice 4160×1947×1886 con una distancia
    entre ejes de 3230 mm (largo imposible): se omitió. "Palanca de cambios
    electrónica" no tiene marca. "Smart Gagde" se dejó como figura.
  - *Tank 300:* dos filas sin marca ("Calefacción de volante", "Calefacción y
    ventilación de asientos delanteros"): se omitieron.
  - *Tank 400:* "Asientos calefaccionados/ventilados" trae un "8" suelto: se marcó
    como incluido. *Tank 500:* "Profundidad de Faro" se rotuló como de vadeo.
  - *H9:* se omitió "Ajuste manual alarmómetro" (sin sentido en la hoja).
  - Varias hojas (Tank 700, Poer) tienen frases de traducción automática
    ("Sombrilla", "Coche teledirigido"...): se dejaron como figuran.
- Las versiones usan los nombres de la página (Jolion: HIGH = Elite y TOP = Deluxe
  en la hoja). La hoja del H6 es una sola para HEV y PHEV: cada ficha toma su columna.

## Visor 3D

La ficha del **Ora 5 EV** (`/modelos/ora-5-ev`) tiene una sección "Vista 3D" (`#visor-3d`):

- **Exterior:** el auto se gira con el mouse o el dedo, con 5 colores de carrocería y botones para
  abrir las puertas y el baúl (son animaciones del propio modelo).
- **Interior:** panorama de 360° del habitáculo con 3 tapizados y dos puntos de vista (primera
  fila y fila trasera). Se recorre arrastrando; Ctrl + rueda (o el pellizco) acerca.
- Las flechas del teclado giran la vista y todos los controles son botones con su estado
  (`aria-pressed`). Sin WebGL, la sección muestra un aviso en lugar del visor.

**Carga bajo demanda.** No se descarga nada hasta que la persona toca "Explorar en 3D": ahí
se pide el motor (`src/js/visor3d/motor.js`, con three.js, ~172 KB comprimido, en su propio
archivo), el modelo `ORA5.glb` (1,3 MB) y el decoder Draco. Las 6 caras del interior bajan
recién al pasar a esa vista (~0,25 MB por tapizado y fila). La landing y las demás fichas no
pagan nada. El visor solo dibuja cuando algo cambia y se pausa fuera de pantalla.

**Origen.** El modelo y las texturas salen del visor oficial de GWM México
(`gwm-mx.com/mx-vr`, variante `ORA5_BEV`, desde `mx-cdn-h5-html.gwmcloud.com`) y se
descargaron el 2026-10-14. Se sirven desde `public/3d/`; el sitio no consulta a México.
**Pendiente:** confirmar con Marketing/GWM que pueden usarse en el sitio de Paraguay, y cuáles
de los 5 colores y 3 tapizados se comercializan acá (la ficha ya los marca como ilustrativos).

**Cómo se prepararon los archivos.**

- `ORA5.glb` se usa tal cual. Trae las tres variantes del Ora 5 (EV, HEV, ICE) con las piezas
  de cada una a escala 0: `visor3d/modelos/ora-5-ev.js` activa las de la EV (`mostrar`).
  La pintura es el material `car_body`; el cielo del archivo (`Sphere_2`) se quita.
- Las caras del interior vienen en JPG de 2600 px y se pasaron a WebP de 1280 px (calidad 80):
  8,2 MB → 1,5 MB. Las fotos de entorno del visor original (montaña y noche) no se usan: el
  fondo es un degradé de estudio en CSS y los reflejos salen de `RoomEnvironment` de three.
- El decoder Draco (`public/3d/draco/`) es copia de `node_modules/three/examples/jsm/libs/draco/gltf/`;
  si se actualiza three, hay que volver a copiarlo.
- **Orientación de las caras.** Las 6 imágenes de cada panorama no siguen el orden de three y
  vienen volteadas verticalmente. Comparando sus bordes (los 12 cantos compartidos coinciden)
  se determinó: 5 = frente, 6 = atrás, 1 = izquierda, 2 = derecha, 4 = techo, 3 = piso. De ahí
  salen `caras: [2, 1, 4, 3, 6, 5]` y `carasVolteadas: true` en la configuración.

**Agregar otro modelo.** El motor es genérico (el visor de México tiene otros: H6 PHEV, P500,
Jolion...). Se necesita el GLB y las caras de su interior; después:

1. Poner los archivos en `public/3d/<slug>/` (WebP para las texturas) y crear
   `src/js/visor3d/modelos/<slug>.js` copiando `ora-5-ev.js`: nombre de la pieza de pintura,
   piezas a mostrar, colores, tapizados, orden de caras y clips de animación.
2. Sumar `visor3d: { titulo, texto, poster, aviso }` a la ficha en `fichas.js`.

El Ora 5 HEV no tiene visor: su ficha es mínima. Con este mismo GLB sería otro archivo de
configuración (`mostrar: ['SKYLIGHT_TAG00', '10_black_color_HEV', '49_car_trunk_mirror_HEV']`)
y las caras `noSunroof` del visor de México.

## SEO, contenido y conversión

La portada muestra únicamente los tres modelos de `DESTACADOS`, sin filtros ni
comparador. El catálogo completo y sus herramientas están en `/modelos`.

`npm run build` genera 28 páginas con contenido y metadatos completos, además de
`404.html`, `sitemap.xml`, `robots.txt` y las redirecciones de nginx. Las fichas
entregan tablas técnicas y enlaces sin ejecutar JavaScript. Cada página tiene un
único H1, canonical, Open Graph y JSON-LD; las fichas incluyen Product/Car y
BreadcrumbList, y `/concesionarios` incluye las seis ubicaciones AutoDealer.
No se inventan stock, reseñas ni horarios que no estén confirmados.

- `/modelos`, `/hibridos`, `/electricos` y `/pickups`: catálogo filtrable por
  tecnología (HEV y PHEV separados), carrocería y presupuesto, con búsqueda y
  comparación de hasta tres modelos. Un precio desconocido se excluye del filtro
  de presupuesto. La comparación se conserva solo en sessionStorage.
- `/guia/hev-vs-phev`, `/guia/carga-en-casa`, `/guia/h6-hev-vs-phev`: guías de compra.
- `/concesionarios`: direcciones y contactos de Paraguay.
- `/postventa`: orientación sobre garantía y mantenimiento, sin trasladar plazos
  de otro país. `/privacidad`: información de formularios y medición opcional. `/cookies`: política de cookies y acceso a configuración.
- ORA 5 EV y HEV incluyen las cifras oficiales de GWM Tailandia, identificadas
  como referencia internacional, con comparación de motorizaciones y PDF original.
  El precio y la configuración comercial de Paraguay quedan a confirmar.
  ORA 03 sigue siendo ilustrativo y se conserva el visor 3D de ORA 5 EV.

Las imágenes para compartir siguen en `public/img/og/<slug>.jpg` (1200×627).
Si se agrega una portada: `python3 scripts/generar-og.py` (requiere Pillow).

### Configuración del dominio y los servicios

Copiar `.env.example` a `.env` para desarrollo o configurar argumentos de build
con los mismos nombres para Docker/Coolify. Son valores públicos del navegador:
**no colocar tokens ni secretos en variables `VITE_*`**.

- `VITE_SITE_URL`: origen definitivo sin barra final. Actualiza todos los
  canonical, sitemap, Open Graph y JSON-LD. Se conserva `https://gwmweb.santarosa.lat`
  hasta definir otro dominio. Para trasladar el sitio a `www.gwm.com.py`, cambiar
  este valor, recompilar y dirigir el dominio al despliegue.
- `VITE_NOINDEX=true`: entorno de pruebas público; añade noindex a todas las
  páginas. Mantiene el rastreo habilitado para que el buscador vea esa indicación.
- `VITE_LEADS_ENDPOINT`: receptor alternativo POST JSON. Las solicitudes
  comerciales usan `/api/lead` por defecto. Si se configura otro dominio debe
  admitir CORS y devolver un 2xx con `{"ok":true}` al confirmar recepción.
  No confirma turno ni reserva.
  Los datos incluyen modelo, versión, ciudad, contacto, página y campaña UTM.
  El servidor receptor debe validar, limitar envíos y gestionar la retención.
  El agendamiento de service continúa en WhatsApp si no se configura un receptor
  alternativo; la persona todavía debe enviar el mensaje allí.
- `VITE_GA_ID`: ID público GA4 `G-…`. Sin ID no se carga ninguna analítica externa.
  El menú de cookies se muestra siempre en la primera visita, incluso sin ID.
  Con ID, GA4 solo se carga tras permitir las cookies analíticas. La preferencia
  se guarda en la cookie propia `gwm_cookie_consent` durante hasta 180 días y se
  puede revisar en Configurar cookies en el pie. Rechazar o revocar el permiso
  desactiva el envío mediante `ga-disable-<ID>`, revoca el consentimiento y elimina
  las cookies de GA legibles. No se atribuyen campañas UTM sin permiso analítico. Los campos personales del formulario no entran a analítica.

Eventos: `consulta_abierta`, `consulta_preparada`, `consulta_recibida` (solo tras
respuesta 2xx), `whatsapp_click`, `ficha_descarga`, `llamada_click`, `mapa_click`,
`catalogo_filtrado` y `comparacion_abierta`. Se exponen también mediante el evento
DOM `gwm:evento`. Los identificadores y el receptor comercial no se han inventado:
requieren la configuración real de la empresa.

### Servidor y verificaciones

nginx sirve solo archivos y páginas existentes, devuelve 404/noindex para lo
inexistente y hace 301 de las rutas antiguas con destinos relativos compatibles
con un proxy HTTPS. El contenedor copia `nginx-redirects.inc` del build a
`/etc/nginx/conf.d/rutas.inc` y lo retira de la carpeta pública. Una instalación
manual debe copiar ese archivo al mismo destino.

```bash
npm run build
npm run check
SITE_TEST_URL=http://localhost:4180 npm run check
```

La última variante comprueba también respuestas HTTP, redirecciones y 404 en el
servidor indicado. No manda consultas reales a WhatsApp ni al equipo comercial.

## Videos

Los spots se sirven desde `public/video/` (~12,6 MB en total, ~5 s cada uno,
H.264 1920×1080 y 1080×1920). Para que no pesen en la carga inicial:

- Cada `<video>` arranca con `preload="none"` y sin `src`; el `src` se asigna
  recién cuando el slide se activa.
- De los dos recortes de un slide solo se carga el visible en ese breakpoint,
  nunca los dos.
- El video de "Hello, Tomorrow" se carga con un `IntersectionObserver`, al
  entrar en pantalla.

Si el repositorio empieza a pesar demasiado, estos archivos son los candidatos
naturales para mover a Git LFS o a un CDN.

## Puntos de venta y postventa

**Puntos de venta** (`#concesionarios`): slider de tarjetas con filtro por
ciudad. Los datos están en [`src/js/concesionarios.js`](src/js/concesionarios.js);
para agregar o cambiar un local se edita ese array y el filtro, las tarjetas y
los enlaces de teléfono y mapa se generan solos.

- Los datos se relevaron del sitio anterior el 2026-10-05. Ese sitio no trae
  fotos de los locales, así que las tarjetas no llevan imagen.
- "Cómo llegar" usa el enlace de mapa del origen o, si no hay (PAMOSA), una
  búsqueda por dirección en Google Maps. Es el único enlace externo nuevo.
- Escritorio: 3 tarjetas por página, todas del mismo alto. Tablet: 2. Celular: 1
  con la siguiente asomando, y cada tarjeta conserva su propio alto.
- Con un filtro que deja una sola tarjeta, se centra y desaparecen los controles.

**Postventa** (`#postventa`): formulario de agendamiento con datos del cliente,
vehículo, uno de los 8 servicios del sitio anterior y fecha y comentarios
opcionales. Las opciones están en [`src/js/postventa.js`](src/js/postventa.js).

Pendiente de confirmar: el horario de Casa Matriz (en el origen dice solo
"de 8 a 19", sin días) y a qué WhatsApp deben llegar los pedidos de postventa
(hoy es el mismo número de ventas, `WHATSAPP_POSTVENTA`).

**Todavía no existe** el panel para que Postventa vea y gestione los turnos: eso
requiere un backend. Hasta que lo haya, los pedidos llegan por WhatsApp o al
endpoint que se configure.

## Formulario de agendamiento

Es el único formulario del sitio (`#postventa`). La lógica de envío está en
`enviarSolicitud`, en `main.js`. Por defecto arma el mensaje y lo abre en el
WhatsApp de `WHATSAPP_POSTVENTA`.

Si hay un backend que reciba las solicitudes, se configura por variable de
entorno y el formulario pasa a enviarlas por `POST` en JSON, con un campo
`tipo` (hoy siempre `"agendamiento"`) que identifica el formulario de origen:

```bash
cp .env.example .env
# editar VITE_LEADS_ENDPOINT
```

Si el envío falla, el formulario conserva lo que la persona escribió.

## Optimización de assets

Las imágenes se bajaron de los sitios de origen y se procesaron antes de entrar
al repo:

- Banners del hero: PNG de 1920×1080 (2–4,6 MB cada uno) → WebP calidad 82.
  El total pasó de ~16 MB a ~1,5 MB.
- Fotos de modelos: PNG → WebP calidad 85 (872 KB → 111 KB). Las de origen
  traen fondo blanco opaco, así que el WebP queda sin canal alfa; solo `ora-03`
  y `ora-5`, que vienen del sitio de Uruguay, son transparentes.
- Posters de video: PNG/JPG → WebP (2,9 MB → 156 KB).
- Imágenes de las fichas: PNG/JPG → WebP calidad 82 (96 MB → 11,4 MB para las 13
  fichas de Paraguay).
- PDF de ficha técnica: de 170,6 MB a 12,7 MB. Los originales traen la portada
  a 300 dpi sin comprimir y, además, los datos privados de Illustrator
  (`/PieceInfo`: el archivo editable embebido, 20 a 50 MB por PDF). Se recomprimió
  la foto de portada a ~200 dpi en JPEG calidad 80 y se quitó `/PieceInfo`; el
  texto de la tabla de especificaciones no se tocó. Si se reemplazan los PDF por
  otros nuevos, conviene repetir ese proceso antes de subirlos.
- GWMSans: las fuentes originales pesan ~1,5 MB cada una porque incluyen glifos
  CJK. Se subsetearon a latín + latín extendido con `fonttools`, quedando en
  ~7,5 KB por peso.

Comando usado para las fuentes:

```bash
python -m fontTools.subset GWMSans-Regular.woff2 \
  --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD" \
  --layout-features="kern,liga,clig,calt" --flavor=woff2 \
  --output-file=public/fonts/GWMSans-Regular.woff2
```

## Arquitectura original de gwm-mx.com y cómo se adaptó

La home sigue, sección por sección y en el mismo orden, la arquitectura de la
página de México. De ese sitio solo se tenía el HTML guardado (sin CSS ni JS): el
marcado y los nombres de clase son los suyos, los estilos son propios y se
midieron en la página en funcionamiento (escala tipográfica 112/56/32/24/16/14/12,
ancho de 1200 px, tarjetas con borde de 8 px, botones negros de 3 px con flecha roja
`#D7000F`, fondos `#f3f3f1`, `#f2f2f7` y negro). Cada sección usa solo datos reales
de Paraguay: donde México muestra algo que acá no existe, se puso lo equivalente
que sí hay.

| México | Paraguay |
| --- | --- |
| Cabecera inmersiva (`cmp__header`): MODELOS con filtros y lista, OFERTA, POST VENTA, EXPLORA, "Encuentra a tu distribuidor" y "Agenda prueba de manejo" | MODELOS (filtros de motor y carrocería + modelos por submarca), PUNTOS DE VENTA, POSTVENTA (Clientes / Contacto) y los accesos "Encontrá tu concesionaria" y "Agendá tu mantenimiento". Sin OFERTA ni EXPLORA: no hay ofertas ni páginas corporativas para mostrar. |
| Hero `kvswiper`: 6 slides con título, subtítulo y botón, puntos con avance y pausa | Los slides de `SLIDES_ACTIVOS` (spots en video o banners), con precio como subtítulo |
| "Nuestros modelos" (`car-swiper`) | Los 16 modelos; el escenario es el banner de la ficha y la lista de abajo se desliza |
| "Ofertas destacadas este mes" (`car-models-custom`) | **"Modelos destacados"**: no hay ofertas cargadas (ver Pendientes) |
| "GWM CARE" (`immersive-slider`) | **"Postventa GWM"**: mantenimiento, servicios y puntos de venta, con los datos reales del agendamiento y las concesionarias. No hay garantías ni asistencia que contar todavía. |
| "¿Cómo te podemos ayudar?" (`tools-bar`) | Cotizá por WhatsApp, concesionarias y agendamiento |
| Banner "APP GWM" (`banner-image-simple-b`) | "Vive el futuro: desarrollo tecnológico de vanguardia adaptado a ti", el texto de gwm.com.py (no hay app) |
| "¡Estrena hoy un GWM!" (`image-card`) | Igual, con el llamado a cotizar por WhatsApp |
| "Hello, TOMORROW" (`full-video-scroll-card`) | Igual, con el video institucional (autoplay al entrar en pantalla; el original lo avanza con el scroll) |
| "Diseñando el futuro" (`simple-card-a`) | Seguridad y tecnología / Nueva energía |
| Botones fijos: Test Drive, Cotizar, Top | WhatsApp y Top |
| Pie (`cmp__footer`): accesos, 4 columnas, país, redes, legales | Accesos, 4 columnas (Modelos, Compra, Postventa, Grupo Santa Rosa), país, redes y el aviso de imágenes ilustrativas |

El sitio actual incorpora un menú propio de cookies con configuración por
categoría y páginas de cookies y privacidad. No utiliza Usercentrics ni muestra
sellos de ese proveedor. No se incorporó el asistente de chat. Propios de Paraguay, y por eso fuera de la arquitectura de
México: los puntos de venta con filtro por ciudad, el agendamiento de service, las
fichas de modelo y el visor 3D.

- **Comportamiento de la cabecera**: igual que en México, no es fija: se va con el
  scroll y no hay `scroll-padding`. En las fichas es negra y la barra de secciones
  de la ficha se pega al borde de la pantalla.
- **Tipografía**: México usa GWMSans en 100 a 900; acá hay Light, Regular y Bold.
  El "black" de los títulos del hero se aproxima engrosando el Bold (`.fw-black`).
  Para igualarlo exacto hay que sumar esos pesos a `public/fonts/`.
- **Intervalo del hero**: 6 s, porque los spots duran ~5 s.
- **Pestañas de ciudad**: conservan el estilo subrayado del sitio anterior
  (`.model-category-button`), sobre el fondo claro de la sección.

## Sitio autocontenido

### CRM Bitrix y reparto de consultas

El formulario comercial envía a `/api/lead`, servido por Node en `127.0.0.1:3001`
detrás de nginx dentro del mismo contenedor. El único puerto público sigue siendo
el 80. El webhook `BITRIX_WEBHOOK_URL` se configura **solo en runtime** en Coolify,
sin disponibilidad durante el build. Nunca se incorpora al navegador ni a Git.

Reutiliza el esquema de las webs de Santa Rosa y SOUEAST, documentado en Obsidian
en «Infraestructura y Conexiones → Reparto de leads web por marca y sucursal».
Marca Bitrix: `UF_CRM_1775591500778=297`; origen compartido: `WEB_SR_GWM`.
El servidor determina el asesor; el formulario no puede enviar un responsable:

| Ciudad | Pool GWM | Respaldo |
|---|---|---|
| Asunción / San Lorenzo | 43, 79, 113, 117, 119, 123, 125, 127, 44489, 44493 | 45 |
| Ciudad del Este | 121, 42415, 42413 | 21707 |

Se consultan asesores activos y se elige a quien hace más tiempo no recibe un
lead del origen compartido. Las solicitudes se serializan dentro de la instancia.
Un identificador de envío guardado en `ORIGINATOR_ID/ORIGIN_ID` permite detectar
reintentos después de una respuesta perdida o un reinicio. El nombre, teléfono,
email opcional, modelo, versión, ciudad, fecha preferida, consulta, página y UTM
se conservan en el CRM. Las reglas automáticas del portal pueden ejecutar
acciones posteriores al alta.

`GET /api/health` comprueba el proceso; `GET /api/lead?check=1` comprueba una lectura
de Bitrix y devuelve `bitrix: "ok"`, sin exponer credenciales. `tests/leads.test.js`
prueba reparto, asesores inactivos, reservas, simultaneidad, duplicados y errores
contra un CRM simulado, sin crear prospectos reales. En desarrollo se puede usar
`GWM_DEV_API_PORT` para elegir un receptor local de prueba.

### Fuentes de ORA 5

La comparación y las tablas EV/HEV se transcribieron y cotejaron visualmente con
[la tabla oficial de GWM Tailandia](https://www.gwm.co.th/content/dam/gwm/pages/th/en/model/ora-5/ORA%205-EN.pdf)
el 14/10/2026. Se conserva sin modificar en `public/fichas/ora-5-internacional.pdf`.
Los módulos `tecnica/ora-5-ev.js`, `tecnica/ora-5-hev.js` y `tecnica/ora-5-base.js`
separan potencia eléctrica y combinada, baterías, carga y equipamiento por versión.
NEDC se etiqueta como ciclo de ensayo; no se mezcla con autonomía WLTP.
No se trasladaron precios ni garantías de otros mercados a Paraguay.

### Hero, menú y experiencia móvil (octubre de 2026)

El hero y el menú visual por marcas toman como referencia
[GWM Brasil](https://www.gwmmotors.com.br/pt). El H7 usa el clip original
`haval-h7-banner-home-gwm.mov` del sitio oficial de Brasil, servido localmente
como `public/video/h7-original-1080.mp4`: se cambió el contenedor a MP4 sin
recomprimir el video de 1920 × 1080. El poster conserva esa resolución.
Los precios y los datos comerciales siguen siendo los del catálogo de Paraguay.

En celular el hero muestra una foto adaptada y navegación manual; no descarga
los videos. Solo la imagen del primer slide tiene prioridad de carga. Los demás
se solicitan al seleccionarlos. Las fichas separan texto y foto y la galería
respeta las proporciones originales para evitar estirar archivos pequeños.

`python3 scripts/optimizar-imagenes.py` (requiere Pillow) genera variantes WebP
de 480 y 960 píxeles, sin ampliar ni sobrescribir originales. Descarta las que
pesan más que la fuente y actualiza `src/js/imagenes-manifest.js`.
El HTML estático y las vistas interactivas comparten `srcset` para que el navegador
elija la resolución según pantalla y densidad. `mobile.css` contiene los ajustes
de navegación táctil, formularios, cookies y ventanas con teclado abierto.

Imágenes, videos, fuentes y favicons se sirven desde `public/`. El receptor
comercial conecta con Bitrix desde el servidor; GA4 es opcional. Los enlaces que salen del
sitio son los de WhatsApp, las redes sociales, Grupo Santa Rosa y Google Maps
(el botón "Cómo llegar" de cada punto de venta).

Las tarjetas de modelo, el megamenú y los CTA del hero llevan a la ficha del
modelo (`/modelos/<slug>`). Los botones comerciales abren un formulario de cotización o test drive con el
modelo elegido. El botón flotante de WhatsApp (`.ws-link`) conserva su acceso
directo. El envío se configura como se explica en la sección SEO, contenido y conversión.

Los accesos de concesionarios y postventa (menú, "¿Cómo podemos ayudarte?", slider
de postventa y pie) llevan a sus secciones. Cuando existan los costos
de service y los talleres autorizados, se les suma su propia sección.

Un enlace con `data-modelo="<slug>"` (el banner de Haval, las tarjetas finales y las
columnas del pie) elige ese modelo en el selector "Nuestros modelos" y lleva a la
sección.

La cabecera no es fija, así que al ir a una sección no hace falta dejar lugar
arriba (en las fichas, `ficha.css` reserva el de su barra de secciones).

El menú y el pie apuntan a `/#seccion` (no a `#seccion`) para que también
funcionen desde una ficha. Al llegar a la landing con un ancla, las secciones se
arman por JS y el salto del navegador quedaba corto; `alinearConAncla` (en
`main.js`) lo repite una vez armadas.

## Notas

- `www_gwm_com_py.html` es el volcado del sitio actual que se usó como fuente de
  contenido y assets. Está en `.gitignore`: sirve como referencia local, no se
  versiona.
- Los precios del catálogo son de referencia en USD y salen del sitio actual;
  conviene revisarlos antes de publicar. El del Jolion Pro HEV se actualizó a
  USD 20.990 el 2026-10-14 (el HTML de Paraguay lo traía así).

## Pendientes

Datos que no existen en el repo ni en el HTML de Paraguay y que hay que pedirle a
Marketing; sin ellos las secciones correspondientes no se pueden completar:

- **Ora 5 EV / HEV**: precio, versiones, hoja técnica y fotos oficiales de Paraguay.
  Ya se publica la ficha internacional de Tailandia con su procedencia visible.
- **Ofertas**: si hay promociones, se suma la sección "Ofertas destacadas" de México
  (`car-models-custom`) con sus datos; la portada muestra tres modelos destacados y enlaza al catálogo completo, sin promociones inventadas.
- **Garantía, repuestos, red de talleres, cotizador, código de cumplimiento y
  "Santa Rosa"**: el HTML de Paraguay solo trae los enlaces a esas páginas de
  gwm.com.py, sin su contenido. Con el texto, cada una puede ser una sección o un
  acordeón del slider de postventa.
- **Permiso de uso del modelo 3D** y qué colores y tapizados se venden en Paraguay
  (ver [Visor 3D](#visor-3d)).
- **Pesos de GWMSans** (Medium y Black) para igualar la tipografía de México.
