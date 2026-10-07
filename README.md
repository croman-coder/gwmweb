# GWM Paraguay — Landing

Landing page de la marca GWM (Great Wall Motors) para Paraguay, distribuida por
Grupo Santa Rosa.

## De dónde sale cada cosa

| Fuente | Qué se tomó |
| --- | --- |
| [gwm.com.uy](https://gwm.com.uy) | La estructura y el diseño: mismo marcado Bootstrap 5, mismo slider Splide y las mismas clases propias (`.slide`, `.hero-model-price`, `.model-category-button`, `.model`, `.home-link`, `#footer-links`, `.ws-link`), con la tipografía GWMSans y el acento rojo `#d7000f`. |
| [gwm-mx.com/es](https://www.gwm-mx.com/es) | Los spots de video del hero, en sus dos recortes (16:9 desktop y 9:16 mobile), más el video institucional de la banda de marca. |
| `www.gwm.com.py` | El contenido de partida: catálogo, precios, banners de campaña, logos, favicons y datos de contacto. Y las **fichas de modelo**: sus textos, versiones con precio, imágenes y PDF de ficha técnica, más el diseño de la ficha. Todo se descargó y se sirve desde `public/`; el sitio no lo consulta en runtime. |

## Stack

- **Bootstrap 5** — el marcado de gwm.com.uy es Bootstrap, así que se usa el mismo.
- **Splide** — el mismo slider del hero, con las opciones del sitio de Uruguay
  (`type: loop`, `focus: center`, sin paginación).
- **Vite** — servidor de desarrollo y build.

Sin frameworks de JS: la lógica propia es vanilla.

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
index.html               Marcado de la landing, con la estructura de gwm.com.uy
src/css/styles.css       @font-face de GWMSans y las clases propias del sitio de Uruguay
src/css/ficha.css        Estilos de la ficha de modelo (solo se carga en las fichas)
src/js/modelos.js        Catálogo: modelos (con su slug), categorías y slides del hero
src/js/fichas.js         Contenido de las 16 fichas: textos, versiones, imágenes y PDF
src/js/ficha.js          Arma la página /modelos/<slug> (se carga solo en las fichas)
src/js/tecnica/          Especificaciones técnicas de cada modelo (<slug>.js), de las hojas en PDF
src/js/whatsapp.js       WhatsApp de ventas y armado de enlaces con el mensaje
src/js/concesionarios.js Puntos de venta (datos) y helpers de teléfono y mapa
src/js/postventa.js      Servicios del agendamiento, WhatsApp de Postventa y reclamos
src/js/main.js           Megamenú, sliders Splide, filtros, formulario de agendamiento y enrutado
public/video/            Spots de gwm-mx.com (16:9 y 9:16) + video institucional
public/img/poster/       Posters de cada video (fallback y primer frame)
public/img/modelos/      Fotos de modelos (webp): 15 archivos para 16 modelos,
                         porque Ora 5 EV y Ora 5 HEV comparten foto
public/img/hero/         Banners de campaña y de servicios de gwm.com.py
public/img/fichas/       Imágenes de las fichas (webp), una carpeta por modelo
public/fichas/           PDF de ficha técnica, uno por modelo (<slug>.pdf)
public/img/brand/        Logo GWM, Grupo Santa Rosa e imagen Open Graph
public/fonts/            GWMSans (Light/Regular/Bold), subseteada a latín
public/favicon/          Set de favicons
```

## Cómo editar el catálogo

Todo vive en [`src/js/modelos.js`](src/js/modelos.js): al tocar `MODELOS` se
actualizan a la vez la grilla, el megamenú del nav y el `<select>` del
formulario. Los enlaces del footer sí están escritos a mano en `index.html`.

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
banner estático.

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

**Cómo funciona la ruta.** Es la misma `index.html`: nginx devuelve `index.html`
para cualquier ruta (`try_files`) y `main.js` arma la ficha cuando la ruta es
`/modelos/<slug>`, cargando `ficha.js`, `fichas.js`, `ficha.css` y el archivo de
especificaciones del modelo aparte, de modo que la landing no paga su peso. Cada ficha es una navegación normal: el botón
"atrás" y la posición de la landing los resuelve el navegador. Un script del
`<head>` marca `<html>` con `vista-ficha` para ocultar la landing desde el primer
pintado. Un slug inexistente muestra "No encontramos ese modelo" y `/modelos` lleva
al listado de la landing.

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

**Limitación conocida.** El título, la descripción y la imagen de vista previa
(Open Graph) de cada ficha se ponen con JavaScript. Los buscadores que ejecutan JS
los ven; WhatsApp y las redes, que leen solo el HTML estático, muestran la vista
previa de la landing. Si hace falta una por modelo, hay que prerenderizar las
fichas.

## Videos

Los spots se sirven desde `public/video/` (~12,6 MB en total, ~5 s cada uno,
H.264 1920×1080 y 1080×1920). Para que no pesen en la carga inicial:

- Cada `<video>` arranca con `preload="none"` y sin `src`; el `src` se asigna
  recién cuando el slide se activa.
- De los dos recortes de un slide solo se carga el visible en ese breakpoint,
  nunca los dos.
- El video de la banda de marca se carga con un `IntersectionObserver`, al
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

## Diferencias deliberadas con gwm.com.uy

- **Intervalo del slider**: Uruguay usa 3 s. Acá son 6 s, porque los spots duran
  ~5 s y con 3 s se cortarían por la mitad.
- **Grilla de Instagram**: Uruguay muestra sus últimas publicaciones. No hay un
  set equivalente para Paraguay, así que queda solo la banda con el enlace al
  perfil.
- **Categorías**: Uruguay usa Hatch / SUV / Todo terreno / Pickup. Acá se usan
  las submarcas definidas por Marketing: Wingle / Haval / Ora / Poer / Tank.
- **Ficha de modelo**: Uruguay muestra una página por modelo con otro diseño
  (portada con precio y botones "Ficha técnica" y "Test Drive", secciones
  flotantes). Acá se replica la ficha de gwm.com.py con sus datos de Paraguay; la
  de Uruguay solo se usó como fuente para Ora, que no tenía ficha en Paraguay.
- **Selector de submarcas**: Uruguay usa pestañas colgantes de la banda negra,
  con bordes redondeados y la activa en negro. Con cinco submarcas dejaban
  muescas en las uniones y en celular se comprimían a 76 px cada una. Acá es un
  selector subrayado: texto en mayúsculas, indicador rojo en la activa y hover
  gris. Entra sin scroll desde 320 px de ancho. Se conserva el nombre de clase
  `.model-category-button`, pero el estilo es propio.

## Sitio autocontenido

No se referencia ningún dominio externo para funcionar: imágenes, videos,
fuentes y favicons se sirven desde `public/`. Los únicos enlaces que salen del
sitio son los de WhatsApp, las redes sociales, Grupo Santa Rosa y Google Maps
(el botón "Cómo llegar" de cada punto de venta).

Las tarjetas de modelo, el megamenú y los CTA del hero llevan a la ficha del
modelo (`/modelos/<slug>`). No hay sección ni formulario de contacto: los botones
de cotizar de la ficha y el botón flotante de WhatsApp (`.ws-link`) abren el
WhatsApp de ventas, con el modelo ya nombrado en el mensaje cuando corresponde
(`whatsappModelo`, en `whatsapp.js`).

Los accesos de concesionarios y postventa (menú, banda de accesos, tarjetas de
servicios y footer) llevan a sus secciones. Cuando existan los costos
de service y los talleres autorizados, se les suma su propia sección.

El `scroll-padding-top` del `<html>` (80 px, el alto de la barra fija) evita que
el título de una sección quede tapado al llegar desde el menú.

El menú y el pie apuntan a `/#seccion` (no a `#seccion`) para que también
funcionen desde una ficha. Al llegar a la landing con un ancla, las secciones se
arman por JS y el salto del navegador quedaba corto; `alinearConAncla` (en
`main.js`) lo repite una vez armadas.

## Notas

- `www_gwm_com_py.html` es el volcado del sitio actual que se usó como fuente de
  contenido y assets. Está en `.gitignore`: sirve como referencia local, no se
  versiona.
- Los precios del catálogo son de referencia en USD y salen del sitio actual;
  conviene revisarlos antes de publicar.
