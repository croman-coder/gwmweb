/** HTML completo y metadatos por ruta. Comparte los renderers y los datos con el navegador. */
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  readdirSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { pathToFileURL } from "node:url";
import { MODELOS, SLIDES_ACTIVOS, nombreCompleto } from "../src/js/modelos.js";
import { FICHAS } from "../src/js/fichas.js";
import { DEALERS, telHref, mapaHref } from "../src/js/concesionarios.js";
import { SITIO, metaFicha, tituloPagina } from "../src/js/sitio.js";
import { htmlAgenda } from "../src/js/render/agenda.js";
import { modelosDe } from "../src/js/vehiculos.js";
import { htmlFicha } from "../src/js/render/ficha.js";
import {
  htmlDestacadosHome,
  htmlGuiasHome,
  htmlHeroSlide,
} from "../src/js/render/catalogo.js";
import { htmlPanelModelos, htmlMovil } from "../src/js/home/cabecera.js";
import { htmlPostventa } from "../src/js/home/catalogo.js";
import { htmlMenuPie } from "../src/js/home/pie.js";
import { htmlPagina, PAGINAS } from "../src/js/paginas.js";
import { esc } from "../src/js/home/util.js";
import { PRODUCTOS_ANTERIORES, redireccion } from "./rutas.js";
import { optimizarImagenes } from "../src/js/imagenes.js";

const jsonLd = (datos) =>
  `<script type="application/ld+json">${JSON.stringify(datos).replace(/</g, "\\u003c")}</script>`;
let sitio = SITIO;
const url = (ruta) => sitio + ruta;
const conocidas = new Set([
  "/",
  ...Object.keys(PAGINAS),
  ...MODELOS.map((m) => `/modelos/${m.slug}`),
]);
const noindex = () => process.env.VITE_NOINDEX === "true";

function metadata(
  html,
  { titulo, descripcion, ruta, imagen },
  extra = [],
  error = false,
) {
  const direccion = url(ruta);
  const foto = imagen || url("/img/brand/og-gwm.jpg");
  html = html
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(titulo)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${esc(descripcion)}" />`,
    )
    .replace(
      /<meta name="robots"[^>]*>/,
      `<meta name="robots" content="${noindex() || error ? "noindex, follow" : "index, follow, max-image-preview:large"}" />`,
    )
    .replace(
      /<link rel="canonical"[^>]*>/,
      error ? "" : `<link rel="canonical" href="${esc(direccion)}" />`,
    );
  for (const [key, value] of Object.entries({
    "og:title": titulo,
    "og:description": descripcion,
    "og:url": direccion,
    "og:image": foto,
  })) {
    html = html.replace(
      new RegExp(`<meta\\s+property="${key}"\\s+content="[^"]*"\\s*/?>`),
      `<meta property="${key}" content="${esc(value)}" />`,
    );
  }
  html = html.replace('</head>', `<meta name="twitter:title" content="${esc(titulo)}" />\n<meta name="twitter:description" content="${esc(descripcion)}" />\n<meta name="twitter:image" content="${esc(foto)}" />\n<meta property="og:image:alt" content="${esc(titulo)}" />\n</head>`);
  html = html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/g,
    "",
  );
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": url("/#organizacion"),
    name: "GWM Paraguay",
    url: url("/"),
    telephone: "+595976955836",
    logo: url("/img/brand/gwm-blanco.png"),
    parentOrganization: { "@type": "Organization", name: "Grupo Santa Rosa" },
    sameAs: [
      "https://www.facebook.com/GreatWallPamosa/",
      "https://www.instagram.com/gwmpy/",
    ],
  };
  return optimizarImagenes(html.replace(
    "</head>",
    `${[organization, ...(!error ? [{
      '@context': 'https://schema.org',
      '@type': ruta === '/postventa/reclamos' ? 'ContactPage' : 'WebPage',
      url: direccion,
      name: titulo,
      description: descripcion,
      inLanguage: 'es-PY',
      isPartOf: { '@type': 'WebSite', name: 'GWM Paraguay', url: url('/') },
      publisher: { '@id': url('/#organizacion') },
    }] : []), ...extra].map(jsonLd).join("\n")}\n</head>`,
  ));
}

function navegacion(base) {
  return base
    .replace(
      /(<div[^>]*data-menu-modelos>)[\s\S]*?(<\/div>)/,
      (_, a, b) => a + htmlPanelModelos() + b,
    )
    .replace(
      /(<div[^>]*data-menu-movil>)[\s\S]*?(<\/div>)/,
      (_, a, b) => a + htmlMovil() + b,
    )
    .replace(
      /(<div[^>]*data-menu-pie>)[\s\S]*?(<\/div>)/,
      (_, a, b) => a + htmlMenuPie() + b,
    );
}
function interior(base, contenido) {
  return base
    .replace('<html lang="es">', '<html lang="es" class="vista-ficha">')
    .replace(/<!-- HOME_START -->[\s\S]*?<!-- HOME_END -->/, "")
    .replace(
      '<div id="ficha"></div>',
      () => `<div id="ficha">${contenido}</div>`,
    );
}
function migas(ruta, nombre) {
  const padre = ruta.startsWith('/modelos/') ? { name: 'Modelos', item: url('/modelos') }
    : ruta.startsWith('/postventa/') ? { name: 'Postventa', item: url('/postventa') } : null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: url("/") },
      ...(padre
        ? [
            {
              "@type": "ListItem",
              position: 2,
              ...padre,
            },
          ]
        : []),
      {
        "@type": "ListItem",
        position: padre ? 3 : 2,
        name: nombre,
        item: url(ruta),
      },
    ],
  };
}
function dealersLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: DEALERS.map((d, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "AutoDealer",
        "@id": url(`/concesionarios#local-${i + 1}`),
        name: `${d.marca} ${d.nombre}`,
        url: url('/concesionarios'),
        telephone: telHref(d.telefonos[0]).replace("tel:", ""),
        hasMap: mapaHref(d),
        address: {
          "@type": "PostalAddress",
          streetAddress: d.direccion.replace(
            /, (Asunción|San Lorenzo|Ciudad del Este)$/,
            "",
          ),
          addressLocality: d.ciudad,
          addressCountry: "PY",
        },
      },
    })),
  };
}
export function seo() {
  let salida, root;
  const middleware =
    (servidor, preview = false) =>
    (req, res, next) => {
      let ruta;
      try {
        ruta = decodeURIComponent(
          new URL(req.url, "http://localhost").pathname,
        );
      } catch {
        res.statusCode = 400;
        res.end("Dirección inválida");
        return;
      }
      if (ruta.startsWith("//") || /[\u0000-\u001f\u007f]/.test(ruta)) {
        res.statusCode = 400;
        res.end("Dirección inválida");
        return;
      }
      if (!["GET", "HEAD"].includes(req.method)) return next();
      const destino = redireccion(ruta);
      if (destino) {
        res.statusCode = 301;
        res.setHeader(
          "Location",
          destino +
            (req.url.includes("?")
              ? "?" + req.url.split("?").slice(1).join("?")
              : ""),
        );
        res.end();
        return;
      }
      if (preview && conocidas.has(ruta) && ruta !== "/") {
        req.url =
          ruta +
          ".html" +
          (req.url.includes("?") ? "?" + req.url.split("?")[1] : "");
        return next();
      }
      if (ruta.endsWith(".inc")) {
        res.statusCode = 404;
        res.end();
        return;
      }
      if (
        conocidas.has(ruta) ||
        /\.[a-z0-9]+$/i.test(ruta) ||
        /^\/(src|node_modules|@|__)/.test(ruta)
      )
        return next();
      const responder = (html) => {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.end(req.method === "HEAD" ? "" : html);
      };
      if (preview) {
        responder(readFileSync(join(salida, "404.html"), "utf8"));
        return;
      }
      const base = readFileSync(join(root, "index.html"), "utf8");
      servidor
        .transformIndexHtml(
          ruta,
          metadata(
            interior(base, htmlPagina("404")),
            {
              titulo: "Página no encontrada | GWM Paraguay",
              descripcion: "Explorá la gama GWM en Paraguay.",
              ruta,
            },
            [],
            true,
          ),
        )
        .then(responder, next);
    };
  return {
    name: "gwm-seo",
    configResolved(config) {
      root = config.root;
      salida = join(root, config.build.outDir);
      sitio = (config.env.VITE_SITE_URL || SITIO).replace(/\/$/, "");
      if (!/^https?:\/\/[^/]+$/.test(sitio))
        throw new Error(
          "VITE_SITE_URL debe ser un origen http(s), sin ruta ni barra final.",
        );
      process.env.VITE_NOINDEX = config.env.VITE_NOINDEX || "false";
    },
    configureServer(server) {
      server.middlewares.use(middleware(server));
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware(server, true));
    },
    transformIndexHtml(html) { return optimizarImagenes(html); },
    async closeBundle() {
      if (!existsSync(join(salida, "index.html"))) return;
      const original = readFileSync(join(salida, "index.html"), "utf8");
      const base = navegacion(original);
      const rutas = ["/"];
      let home = base
        .replace('<html lang="es">', '<html lang="es" class="home-ssg">')
        .replace(/<!-- CATALOG_START -->[\s\S]*?<!-- CATALOG_END -->/, () =>
          htmlDestacadosHome(),
        )
        .replace(/<!-- GUIDES_START -->[\s\S]*?<!-- GUIDES_END -->/, () =>
          htmlGuiasHome(),
        )
        .replace(/(<div[^>]*data-postventa[^>]*>)[\s\S]*?(<\/div>)/, (_, a, b) => a + htmlPostventa() + b)
        .replace(/<!-- AGENDA_START -->[\s\S]*?<!-- AGENDA_END -->/, () => htmlAgenda())
        .replace(
          /(<div[^>]*data-slides>)[\s\S]*?(<\/div>)/,
          (_, a, b) => a + SLIDES_ACTIVOS.map(htmlHeroSlide).join("") + b,
        );
      home = metadata(home, {
        titulo: "GWM Paraguay | SUVs, pickups, híbridos y eléctricos",
        descripcion:
          "Conocé la gama GWM en Paraguay. Compará SUVs, pickups, híbridos y eléctricos. Consultá precios, versiones y solicitá tu test drive.",
        ruta: "/",
      });
      writeFileSync(join(salida, "index.html"), home);
      const cssFicha = readdirSync(join(salida, "assets")).find((f) =>
        /^ficha-.*\.css$/.test(f),
      );
      for (const m of MODELOS) {
        const ficha = FICHAS[m.slug];
        if (!ficha) throw new Error(`Falta ficha de ${m.slug}`);
        const archivo = join(root, "src/js/tecnica", m.slug + ".js");
        const tecnica = existsSync(archivo)
          ? (await import(pathToFileURL(archivo).href)).default
          : null;
        const meta = metaFicha(m, ficha, sitio);
        const ruta = `/modelos/${m.slug}`;
        const producto = {
          "@context": "https://schema.org",
          "@type": ["Product", "Car"],
          name: `GWM ${nombreCompleto(m)}`,
          description: meta.descripcion,
          image: meta.imagen,
          url: url(ruta),
          brand: { "@type": "Brand", name: "GWM" },
          model: nombreCompleto(m),
        };
        if (ficha.versiones?.length)
          producto.offers = ficha.versiones.map((v) => ({
            "@type": "Offer",
            name: v.nombre,
            price: v.precio,
            priceCurrency: "USD",
            url: url(ruta),
            seller: { "@id": url("/#organizacion") },
          }));
        let html = metadata(
          interior(base, htmlFicha(m, ficha, tecnica)),
          {
            titulo: meta.titulo,
            descripcion: meta.descripcion,
            ruta,
            imagen: meta.imagen,
          },
          [producto, migas(ruta, nombreCompleto(m))],
        );
        if (cssFicha)
          html = html.replace(
            '<link rel="stylesheet"',
            `<link rel="stylesheet" href="/assets/${cssFicha}" />\n<link rel="stylesheet"`,
          );
        const destino = join(salida, ruta.slice(1) + ".html");
        mkdirSync(dirname(destino), { recursive: true });
        writeFileSync(destino, html);
        rutas.push(ruta);
      }
      for (const [ruta, p] of Object.entries(PAGINAS)) {
        const html = metadata(
          interior(base, htmlPagina(ruta)),
          {
            titulo: tituloPagina(p),
            descripcion: p.descripcion,
            ruta,
          },
          [
            migas(ruta, p.titulo),
            ...(ruta === "/concesionarios" ? [dealersLd()] : []),
            ...(p.tipo ? [{
              '@context': 'https://schema.org', '@type': 'ItemList',
              name: p.titulo,
              itemListElement: modelosDe(p.tipo).map((m, i) => ({
                '@type': 'ListItem', position: i + 1, name: nombreCompleto(m), url: url(`/modelos/${m.slug}`),
              })),
            }] : []),
          ],
        );
        const destino = join(salida, ruta.slice(1) + ".html");
        mkdirSync(dirname(destino), { recursive: true });
        writeFileSync(destino, html);
        rutas.push(ruta);
      }
      writeFileSync(
        join(salida, "404.html"),
        metadata(
          interior(base, htmlPagina("404")),
          {
            titulo: "Página no encontrada | GWM Paraguay",
            descripcion: "Esta página no está disponible. Explorá la gama GWM.",
            ruta: "/404",
          },
          [],
          true,
        ),
      );
      writeFileSync(
        join(salida, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rutas.map((r) => `<url><loc>${esc(url(r))}</loc></url>`).join("\n")}\n</urlset>`,
      );
      writeFileSync(
        join(salida, "robots.txt"),
        `User-agent: *\nAllow: /\n\nSitemap: ${sitio}/sitemap.xml\n`,
      );
      writeFileSync(
        join(salida, "nginx-redirects.inc"),
        Object.entries(PRODUCTOS_ANTERIORES)
          .map(
            ([id, slug]) =>
              `rewrite ^/producto/${id}(/[^/]+)?/?$ /modelos/${slug} permanent;`,
          )
          .join("\n") + "\n",
      );
      console.log(
        `seo: ${rutas.length} páginas con contenido completo, sitemap y 404.`,
      );
    },
  };
}
export default seo;
