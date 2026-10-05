# GWM Paraguay — Landing

Landing page de la marca GWM (Great Wall Motors) para Paraguay, distribuida por
Grupo Santa Rosa.

## De dónde sale cada cosa

| Fuente | Qué se tomó |
| --- | --- |
| [gwm.com.uy](https://gwm.com.uy) | La estructura y el diseño: mismo marcado Bootstrap 5, mismo slider Splide y las mismas clases propias (`.slide`, `.hero-model-price`, `.model-category-button`, `.model`, `.home-link`, `#footer-links`, `.ws-link`), con la tipografía GWMSans y el acento rojo `#d7000f`. |
| [gwm-mx.com/es](https://www.gwm-mx.com/es) | Los spots de video del hero, en sus dos recortes (16:9 desktop y 9:16 mobile), más el video institucional de la banda de marca. |
| `www.gwm.com.py` | El contenido de partida: catálogo, precios, banners de campaña, logos, favicons y datos de contacto. Todo se descargó y se sirve desde `public/`; el sitio no lo consulta en runtime. |

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
src/js/modelos.js        Catálogo: modelos, categorías y slides del hero
src/js/main.js           Megamenú, slider Splide, filtro por categoría y formulario
public/video/            Spots de gwm-mx.com (16:9 y 9:16) + video institucional
public/img/poster/       Posters de cada video (fallback y primer frame)
public/img/modelos/      Fotos de los 14 modelos (webp)
public/img/hero/         Banners de campaña y de servicios de gwm.com.py
public/img/brand/        Logo GWM, Grupo Santa Rosa e imagen Open Graph
public/fonts/            GWMSans (Light/Regular/Bold), subseteada a latín
public/favicon/          Set de favicons
```

## Cómo editar el catálogo

Todo vive en [`src/js/modelos.js`](src/js/modelos.js): al tocar `MODELOS` se
actualizan a la vez la grilla, el megamenú del nav y el `<select>` del
formulario. Los enlaces del footer sí están escritos a mano en `index.html`.

Para agregar un modelo:

1. Poner la foto en `public/img/modelos/` (480×190, webp, fondo transparente).
2. Sumar la entrada al array `MODELOS` con `categoria`, `nombre`, `precio`,
   `imagen`, `bajada` y `url`.

Para sumar un slide al hero, agregar una entrada a `SLIDES`. Si tiene `video` y
`videoMobile` usa los recortes 16:9 y 9:16; si solo tiene `imagen`, queda como
banner estático.

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

## Formulario de contacto

Por defecto arma el mensaje y lo abre en el WhatsApp oficial
(+595 976 955 836), que es el canal de contacto del sitio.

Si hay un backend que reciba los leads, se configura por variable de entorno y
el formulario pasa a enviarlos por `POST` en JSON:

```bash
cp .env.example .env
# editar VITE_LEADS_ENDPOINT
```

## Optimización de assets

Las imágenes se bajaron de los sitios de origen y se procesaron antes de entrar
al repo:

- Banners del hero: PNG de 1920×1080 (2–4,6 MB cada uno) → WebP calidad 82.
  El total pasó de ~16 MB a ~1,5 MB.
- Fotos de modelos: PNG → WebP calidad 85 con transparencia (872 KB → 111 KB).
- Posters de video: PNG/JPG → WebP (2,9 MB → 156 KB).
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

## Sitio autocontenido

No se referencia ningún dominio externo para funcionar: imágenes, videos,
fuentes y favicons se sirven desde `public/`. Los únicos enlaces que salen del
sitio son los de WhatsApp, las redes sociales y Grupo Santa Rosa.

Como es una sola página, las fichas de producto, concesionarias y posventa no
tienen destino propio: las tarjetas de modelo, el megamenú y los CTA del hero
llevan al formulario de contacto **con el modelo ya seleccionado** (atributo
`data-modelo`, resuelto en `initFormulario`). El emparejamiento tolera que el
hero diga "Haval H6 GT PHEV" y el catálogo "H6 GT PHEV".

Cuando existan las secciones de agendamiento, costos de service y talleres,
esos enlaces pasan a apuntar ahí.

## Notas

- `www_gwm_com_py.html` es el volcado del sitio actual que se usó como fuente de
  contenido y assets. Está en `.gitignore`: sirve como referencia local, no se
  versiona.
- Los precios del catálogo son de referencia en USD y salen del sitio actual;
  conviene revisarlos antes de publicar.
