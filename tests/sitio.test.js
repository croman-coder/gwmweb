import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { MODELOS, SLIDES_ACTIVOS } from "../src/js/modelos.js";
import imagenes from "../src/js/imagenes-manifest.js";
import { optimizarImagenes, srcsetImagen } from "../src/js/imagenes.js";
import { htmlHeroSlide } from "../src/js/render/catalogo.js";
import { filtrarModelos } from "../src/js/vehiculos.js";
import {
  interpretarConsentimiento,
  DURACION_CONSENTIMIENTO,
} from "../src/js/cookies.js";
import { PAGINAS } from "../src/js/paginas.js";
import { redireccion } from "../scripts/rutas.js";

const archivo = (ruta) =>
  ruta === "/" ? "dist/index.html" : `dist${ruta}.html`;

test("el filtro distingue HEV de PHEV y combina búsqueda, carrocería y presupuesto", () => {
  const filtros = filtrarModelos(MODELOS, {
    buscar: "H6",
    motor: "hev",
    carroceria: "suv",
    precio: "25000",
  });
  assert.deepEqual(
    filtros.map((m) => m.slug),
    ["new-h6-hev"],
  );
  assert.ok(
    filtrarModelos(MODELOS, { motor: "phev" }).some(
      (m) => m.slug === "poer-p500",
    ),
  );
  assert.ok(
    filtrarModelos(MODELOS, { precio: "50000" }).every(
      (m) => m.precio !== null,
    ),
  );
  assert.equal(filtrarModelos(MODELOS, { buscar: "no existe" }).length, 0);
});

test("todos los modelos y páginas entregan un único H1, canonical e información sin ejecutar JS", () => {
  const rutas = [
    "/",
    ...Object.keys(PAGINAS),
    ...MODELOS.map((m) => `/modelos/${m.slug}`),
  ];
  for (const ruta of rutas) {
    const html = readFileSync(archivo(ruta), "utf8");
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, ruta);
    assert.match(html, /<link rel="canonical" href="https?:\/\/[^\"]+"/);
    if (ruta !== "/") assert.doesNotMatch(html, /<div id="ficha"><\/div>/);
    const scripts = [
      ...html.matchAll(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
      ),
    ];
    assert.ok(scripts.length, ruta);
    for (const [, datos] of scripts)
      assert.doesNotThrow(() => JSON.parse(datos));
    if (ruta.startsWith("/modelos/")) {
      assert.match(html, /class="ficha-highlights"/);
      assert.doesNotMatch(html, /id="home-titulo"/);
    }
  }
  const h6 = readFileSync(archivo("/modelos/new-h6-hev"), "utf8");
  assert.match(h6, /530 Nm/);
  assert.match(h6, /24\.990/);
  assert.match(h6, /new-h6-hev\.pdf/);
});

test("ORA 5 distingue ambas motorizaciones y atribuye sus datos internacionales", () => {
  const ev = readFileSync(archivo("/modelos/ora-5-ev"), "utf8");
  const hev = readFileSync(archivo("/modelos/ora-5-hev"), "utf8");
  for (const html of [ev, hev]) {
    assert.match(html, /Referencia internacional · GWM Tailandia/);
    assert.match(html, /confirmá|Confirmá/);
    assert.match(html, /id="motorizaciones"/);
    assert.match(html, /id="especificaciones"/);
    assert.match(html, /ora-5-internacional\.pdf/);
    assert.doesNotMatch(html, /Estamos preparando la ficha|Consultar según versión/);
    const ficha = html.slice(html.indexOf('<article class="ficha">'), html.indexOf('</main>'));
    assert.doesNotMatch(ficha, /24\.990|26\.990/); // precios de Uruguay
  }
  assert.match(ev, /150 kW \(204 CV\)/);
  assert.match(ev, /ciclo NEDC/);
  assert.match(ev, /120 kW/);
  assert.match(ev, /Explorá el ORA 5 en 3D/);
  assert.match(hev, /164 kW \(223 CV\)/);
  assert.match(hev, /Automática DHT/);
  assert.match(hev, /1,09 kWh/);
  assert.ok(hev.indexOf('id="especificaciones"') < hev.indexOf('id="diseno"'));
});

test("las direcciones anteriores conservan su modelo y el sitemap no contiene páginas vacías", () => {
  assert.equal(redireccion("/producto/12/new-h6-hev"), "/modelos/new-h6-hev");
  assert.equal(redireccion("/producto/18/poer-plus"), "/modelos/poer-diesel");
  assert.equal(redireccion("/producto/9/jolion-mt"), null);
  assert.equal(redireccion("/modelos/new-h6-hev/"), "/modelos/new-h6-hev");
  const sitemap = readFileSync("dist/sitemap.xml", "utf8");
  const rutas = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    ([, u]) => new URL(u).pathname,
  );
  assert.equal(rutas.length, 28);
  assert.ok(rutas.every((r) => existsSync(archivo(r))));
  assert.match(readFileSync("dist/404.html", "utf8"), /noindex, follow/);
});

test("los enlaces locales del HTML de producción tienen un destino publicado", () => {
  const rutas = [
    "/",
    ...Object.keys(PAGINAS),
    ...MODELOS.map((m) => `/modelos/${m.slug}`),
  ];
  for (const ruta of rutas) {
    const html = readFileSync(archivo(ruta), "utf8");
    for (const [, href] of html.matchAll(/href="(\/(?!\/)[^\"]*)"/g)) {
      const pathname = new URL(
        href.replaceAll("&amp;", "&"),
        "https://gwm.example",
      ).pathname;
      assert.ok(
        existsSync(join("dist", pathname)) || existsSync(archivo(pathname)),
        `${ruta} enlaza ${pathname}`,
      );
    }
  }
});

test("la portada muestra solo tres destacados y el catálogo completo permanece en su propia página", () => {
  const home = readFileSync("dist/index.html", "utf8");
  const catalogo = readFileSync("dist/modelos.html", "utf8");
  assert.equal((home.match(/data-catalogo-modelo=/g) || []).length, 3);
  assert.doesNotMatch(home, /data-filtros|data-comparar=/);
  assert.match(home, /Ver todos los modelos/);
  assert.equal(
    (catalogo.match(/data-catalogo-modelo=/g) || []).length,
    MODELOS.length,
  );
  assert.match(catalogo, /data-filtros/);
  assert.match(catalogo, /data-comparador-abrir/);
});

test("las preferencias opcionales nunca se aceptan con datos ausentes, inválidos o vencidos", () => {
  const ahora = Date.now();
  for (const valor of [
    null,
    "",
    "{",
    JSON.stringify({ version: 1, analytics: "true", fecha: ahora }),
    JSON.stringify({
      version: 1,
      analytics: true,
      fecha: ahora - DURACION_CONSENTIMIENTO,
    }),
    JSON.stringify({ version: 1, analytics: true, fecha: ahora + 1000 }),
  ])
    assert.equal(interpretarConsentimiento(valor, ahora), null);
  const necesarias = interpretarConsentimiento(
    JSON.stringify({ version: 1, analytics: false, fecha: ahora }),
    ahora,
  );
  assert.equal(necesarias.analytics, false);
  assert.equal(necesarias.necesarias, true);
});

test("todas las páginas incluyen el menú y el acceso para revisar cookies, independientemente de GA4", () => {
  for (const ruta of ["/", "/modelos", "/modelos/new-h6-hev", "/cookies"]) {
    const html = readFileSync(archivo(ruta), "utf8");
    assert.match(html, /id="cookies-banner"/);
    assert.match(html, /id="cookies-dialogo"/);
    assert.match(html, /data-cookies-necesarias/);
    assert.match(html, /data-cookies-aceptar/);
    assert.match(html, /data-cookies-preferencias/);
  }
});

const origen = process.env.SITE_TEST_URL;
test("las variantes de imagen existen, pesan menos y nunca amplían el original", () => {
  for (const [src, [ancho, alto, variantes]] of Object.entries(imagenes)) {
    assert.ok(ancho > 0 && alto > 0, src);
    const original = statSync(join("public", src));
    for (const candidato of srcsetImagen(src).split(", ")) {
      const [ruta, descriptor] = candidato.split(" ");
      assert.ok(existsSync(join("dist", ruta)), ruta);
      assert.ok(Number.parseInt(descriptor) <= ancho, candidato);
      if (ruta !== src) assert.ok(statSync(join("public", ruta)).size < original.size, ruta);
    }
    assert.ok(variantes.every(w => w < ancho), src);
  }
  const marcado = '<picture><source media="(max-width:767px)" srcset="/img/fichas/ora-5-ev/portada-m.webp" /><img src="/img/fichas/ora-5-ev/portada.webp" alt="ORA" /></picture>';
  const responsive = optimizarImagenes(marcado);
  assert.match(responsive, /480w/);
  assert.match(responsive, /decoding="async"/);
  assert.equal(optimizarImagenes(responsive), responsive);
});

test("la portada prioriza una sola foto y deja los otros modelos y videos sin descargar", () => {
  const slides = SLIDES_ACTIVOS.map(htmlHeroSlide);
  assert.equal((slides.join("").match(/<img src=/g) || []).length, 1);
  assert.match(slides[0], /fetchpriority="high"/);
  assert.ok(slides.slice(1).every(html => html.includes('data-hero-src=')));
  assert.doesNotMatch(slides.join(""), /<video[^>]*\ssrc=/);
  for (const slide of SLIDES_ACTIVOS) assert.ok(existsSync(`public/img/fichas/${slide.slug}/portada-m.webp`));
});

test(
  "el servidor entrega 200 para páginas válidas, 301 para enlaces antiguos y 404 real",
  { skip: !origen },
  async () => {
    for (const ruta of [
      "/",
      "/modelos",
      "/modelos/new-h6-hev",
      "/hibridos",
      "/privacidad",
      "/concesionarios",
    ]) {
      const res = await fetch(origen + ruta);
      assert.equal(res.status, 200, ruta);
      assert.match(await res.text(), /<h1/);
    }
    const redirect = await fetch(origen + "/producto/12/new-h6-hev", {
      redirect: "manual",
    });
    assert.equal(redirect.status, 301);
    assert.equal(redirect.headers.get("location"), "/modelos/new-h6-hev");
    const invalid = await fetch(origen + "/modelos/no-existe");
    assert.equal(invalid.status, 404);
    assert.match(await invalid.text(), /noindex, follow/);
  },
);
