import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { MODELOS } from "../src/js/modelos.js";
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

test("los modelos ORA no publican cifras de otro mercado como si fueran datos de Paraguay", () => {
  const html = readFileSync(archivo("/modelos/ora-5-ev"), "utf8");
  assert.match(
    html,
    /Consultá las versiones y la disponibilidad para Paraguay/,
  );
  assert.doesNotMatch(html, /520 km|solo 20 minutos/);
  assert.match(html, /Explorá el ORA 5 en 3D/);
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
test(
  "el servidor entrega 200 para páginas válidas, 301 para enlaces antiguos y 404 real",
  { skip: !origen },
  async () => {
    for (const ruta of [
      "/",
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
