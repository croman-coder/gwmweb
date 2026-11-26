import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { MODELOS, SLIDES_ACTIVOS } from "../src/js/modelos.js";
import imagenes from "../src/js/imagenes-manifest.js";
import { optimizarImagenes, srcsetImagen } from "../src/js/imagenes.js";
import { htmlHeroSlide } from "../src/js/render/catalogo.js";
import { filtrarModelos, modelosDe } from "../src/js/vehiculos.js";
import { interpretarAncla } from "../src/js/navegacion.js";
import { SITIO } from "../src/js/sitio.js";
import {
  interpretarConsentimiento,
  DURACION_CONSENTIMIENTO,
} from "../src/js/cookies.js";
import { PAGINAS } from "../src/js/paginas.js";
import { redireccion, PAGINAS_ANTERIORES } from "../scripts/rutas.js";
import { hashesDeScriptsInline, construirCsp } from "../scripts/csp.js";
import oraEv from "../src/js/tecnica/ora-5-ev.js";
import oraHev from "../src/js/tecnica/ora-5-hev.js";
import { MOTORIZACIONES_ORA5 } from "../src/js/ora5.js";

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

test("ORA 5 presenta las versiones sin mencionar países; el EV usa la ficha oficial local", () => {
  const ev = readFileSync(archivo("/modelos/ora-5-ev"), "utf8");
  // El HEV está oculto hasta su lanzamiento: no tiene página y su URL redirige al EV.
  assert.ok(!existsSync(archivo("/modelos/ora-5-hev")));
  assert.match(readFileSync("dist/nginx-redirects.inc", "utf8"), /rewrite \^\/modelos\/ora-5-hev\/\?\$ \/modelos\/ora-5-ev redirect;/);
  assert.match(ev, /24\.990/);
  assert.doesNotMatch(ev, /Luxury Híbrida/);
  const textoVisible = ev.replace(/<script[^>]*>[\s\S]*?<\/script>/g, "").replace(/<[^>]*>/g, " ");
  assert.doesNotMatch(textoVisible, /m[eé]xico|mexican[ao]s?|uruguay/i);
  assert.doesNotMatch(ev, /Tailandia|Pro y Ultra|versiones internacionales Pro/);
  assert.doesNotMatch(ev, /Especificaciones de referencia internacional ·|Descargar ficha internacional/);
  assert.doesNotMatch(ev, /Premium Gasolina|ORA 5 Gasolina/); // Solo se vende el EV.
  assert.doesNotMatch(ev, /modelos\/undefined|modelos\/ora-5-gasolina/);
  assert.doesNotMatch(ev, /id="motorizaciones"/); // Una sola motorización: sin comparación.
  assert.match(ev, /id="especificaciones"/);
  assert.match(ev, /ora-5-ev\.pdf/);
  assert.doesNotMatch(ev, /ora-5-mexico\.pdf/);
  assert.doesNotMatch(ev, /Estamos preparando la ficha|Consultar según versión/);
  const ficha = ev.slice(ev.indexOf('<article class="ficha">'), ev.indexOf('</main>'));
  assert.doesNotMatch(ficha, /26\.990|449[,.]900|574[,.]900|644[,.]900|MXN/); // No trasladar precios de otros mercados.
  assert.match(ev, /201 HP/);
  assert.match(ev, /430 km \(WLTC\)/);
  assert.match(ev, /58,33 kWh/);
  assert.match(ev, /260 Nm/);
  assert.match(ev, /Explorá el ORA 5 en 3D/);
  assert.doesNotMatch(ev, /219 hp|modelos\/ora-5-hev/); // La comparación de motorizaciones no muestra el HEV oculto.
  const valor = (t, etiqueta) => t.secciones.flatMap(s => s.filas).find(([k]) => k === etiqueta)?.[1];
  assert.equal(oraEv.referencia, undefined);
  assert.equal(valor(oraEv, 'Airbags'), '6');
  assert.equal(valor(oraHev, 'Capacidad del baúl'), '272 litros');
  assert.equal(valor(oraHev, 'Techo panorámico'), false);
  assert.equal(oraHev.referencia.mercado, 'México');
  for (const tecnica of [oraEv, oraHev])
    assert.ok(tecnica.secciones.every(s => s.filas.every(([k,v]) => k && (typeof v === 'string' || typeof v === 'boolean'))));
  // Solo el EV; el HEV vuelve a la comparación cuando se publique (diciembre).
  assert.equal(MOTORIZACIONES_ORA5.length, 1);
  assert.equal(MOTORIZACIONES_ORA5.filter(m => m.slug).length, 1);
  assert.ok(!MODELOS.some(m => m.slug.includes('ora-5-gasolina')));
  for (const pdf of ['ora-5-mexico', 'ora-5-ev', 'ora-03-skin'])
    assert.equal(readFileSync(`public/fichas/${pdf}.pdf`).subarray(0, 5).toString(), '%PDF-');
});

test("las páginas del sitio anterior (gwm.com.py en DreamHost) redirigen a su equivalente", () => {
  for (const [vieja, nueva] of Object.entries(PAGINAS_ANTERIORES)) {
    assert.equal(redireccion(vieja), nueva, vieja);
    assert.equal(redireccion(vieja + "/"), nueva, vieja + "/");
    assert.ok(nueva === "/" || existsSync(archivo(nueva)), `${vieja} apunta a una página que no existe: ${nueva}`);
  }
  // Sin destino: el código de cumplimiento es una página propia y el Jolion MT es un modelo dado de baja.
  assert.equal(redireccion("/codigo-de-cumplimiento"), null);
  assert.equal(redireccion("/producto/9/jolion-mt"), null);
  assert.equal(redireccion("/constructor"), null);
  // El nginx de producción lleva exactamente las mismas reglas que el mapa.
  const reglas = readFileSync("dist/nginx-redirects.inc", "utf8");
  for (const [vieja, nueva] of Object.entries(PAGINAS_ANTERIORES))
    assert.ok(reglas.includes(`rewrite ^${vieja}/?$ ${nueva} permanent;`), `falta la regla de nginx para ${vieja}`);
});

test("la CSP no deja ejecutar scripts ajenos, cubre cada script inline con su hash y el contenedor corre sin root", () => {
  const inc = readFileSync("dist/nginx-csp.inc", "utf8");
  const politica = inc.match(/add_header Content-Security-Policy "([^"]+)" always;/)?.[1];
  assert.ok(politica, "dist/nginx-csp.inc debe traer el add_header de la CSP");
  const dir = (nombre) => politica.split("; ").find((d) => d.startsWith(nombre + " ") || d === nombre) ?? "";
  // Scripts: nada de 'unsafe-inline' ni 'unsafe-eval'; solo 'self', WebAssembly (Draco), los hashes y Google Analytics.
  assert.doesNotMatch(dir("script-src"), /'unsafe-inline'|'unsafe-eval'|\s\*(\s|$)/); // 'wasm-unsafe-eval' es otra cosa: solo WebAssembly
  assert.match(dir("script-src"), /'wasm-unsafe-eval'/);
  for (const [nombre, valor] of [["default-src", "'self'"], ["object-src", "'none'"], ["base-uri", "'self'"], ["frame-ancestors", "'self'"], ["form-action", "'self'"]])
    assert.equal(dir(nombre), `${nombre} ${valor}`);
  assert.doesNotMatch(dir("style-src"), /'unsafe-inline'/); // el inline queda solo para atributos style="…"
  assert.equal(dir("style-src-attr"), "style-src-attr 'unsafe-inline'");
  // Cada script inline de cada página está autorizado por hash: si cambia, el build regenera la política.
  const hashes = hashesDeScriptsInline("dist");
  assert.ok(hashes.length >= 1);
  for (const h of hashes) assert.ok(politica.includes(h), `falta ${h}`);
  assert.equal(construirCsp(hashes), politica);
  // Sin root: el contenedor baja al usuario `nginx` y el pid no va a un directorio de root.
  const dockerfile = readFileSync("Dockerfile", "utf8");
  assert.match(dockerfile, /^USER nginx$/m);
  assert.match(dockerfile, /pid \/tmp\/nginx\.pid;/);
  assert.match(readFileSync("nginx-seguridad.inc", "utf8"), /include \/etc\/nginx\/conf\.d\/csp\.inc;/);
});

test("el Código de Cumplimiento está publicado, enlazado en el pie y su PDF es el documento real", () => {
  const pagina = readFileSync(archivo("/codigo-de-cumplimiento"), "utf8");
  assert.match(pagina, /<h1[^>]*>Código de Cumplimiento General Global de Great Wall Motor/);
  assert.match(pagina, /href="\/fichas\/codigo-de-cumplimiento-gwm\.pdf"/);
  assert.doesNotMatch(pagina, /Solicitá una cotización/); // página corporativa: sin el llamado comercial
  assert.match(readFileSync("dist/index.html", "utf8"), /href="\/codigo-de-cumplimiento">Código de cumplimiento</);
  assert.ok(readFileSync("dist/sitemap.xml", "utf8").includes("/codigo-de-cumplimiento"));
  const pdf = readFileSync("public/fichas/codigo-de-cumplimiento-gwm.pdf");
  assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
  assert.ok(pdf.length > 100_000 && pdf.length < 200_000, "el PDF pesa unos 137 KB");
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
  assert.equal(rutas.length, 1 + Object.keys(PAGINAS).length + MODELOS.length);
  assert.ok(rutas.every((r) => existsSync(archivo(r))));
  assert.match(readFileSync("dist/404.html", "utf8"), /noindex, follow/);
});

test('cada página tiene metadatos únicos y enlaces públicos sin fragmentos', () => {
  const titulos = new Set(), descripciones = new Set();
  for (const ruta of ['/', ...Object.keys(PAGINAS), ...MODELOS.map(m => `/modelos/${m.slug}`)]) {
    const html = readFileSync(archivo(ruta), 'utf8');
    const titulo = html.match(/<title>(.*?)<\/title>/)[1];
    const descripcion = html.match(/<meta name="description" content="([^"]+)"/)[1];
    assert.ok(!titulos.has(titulo), `Título duplicado: ${ruta}`);
    assert.ok(!descripciones.has(descripcion), `Descripción duplicada: ${ruta}`);
    titulos.add(titulo); descripciones.add(descripcion);
    assert.equal(html.match(/<link rel="canonical" href="([^"]+)"/)[1], SITIO + ruta);
    assert.match(html, /max-image-preview:large/);
    assert.match(html, /name="twitter:image"/);
    for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
      if (href.startsWith('/') || href.startsWith(SITIO)) assert.equal(new URL(href, SITIO).hash, '', `${ruta}: ${href}`);
    }
    for (const [, id] of html.matchAll(/data-scroll="([^"]+)"/g)) assert.ok(html.includes(`id="${id}"`), `${ruta}: sección ${id}`);
    if (PAGINAS[ruta]?.tipo) {
      const listas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(([,j]) => JSON.parse(j));
      assert.deepEqual(listas.find(j => j['@type'] === 'ItemList').itemListElement.map(i => i.url), modelosDe(PAGINAS[ruta].tipo).map(m => `${SITIO}/modelos/${m.slug}`));
    }
  }
  assert.doesNotMatch(readFileSync('dist/sitemap.xml', 'utf8'), /#/);
});

test('los enlaces antiguos a secciones conservan su destino y toleran codificación inválida', () => {
  assert.deepEqual(interpretarAncla('/modelos/ora-5-ev', '#motorizaciones'), { id: 'motorizaciones', destino: null });
  assert.equal(interpretarAncla('/', '#modelos').destino, '/modelos');
  assert.equal(interpretarAncla('/', '#postventa').destino, '/postventa/agendar-service');
  assert.equal(interpretarAncla('/', '#reclamos').destino, '/postventa/reclamos');
  assert.equal(interpretarAncla('/', '#toString').destino, null);
  assert.deepEqual(interpretarAncla('/', '#%E0%A4%A'), { id: '', destino: null });
  assert.equal(redireccion('/index.html'), '/');
  assert.equal(redireccion('/modelos/ora-5-ev.html'), '/modelos/ora-5-ev');
});

test('mantenimiento y reclamos tienen contenido propio disponible sin JavaScript', () => {
  const agenda = readFileSync(archivo('/postventa/agendar-service'), 'utf8');
  assert.match(agenda, /data-form-agenda/);
  assert.match(agenda, /Lista de precios de mantenimiento/);
  assert.match(agenda, /Tank 700 PHEV<\/th><td>₲ 840\.000<\/td>/);
  assert.match(agenda, /value="Ora 5 EV"/);
  assert.match(agenda, /equipo confirma el turno/);
  const reclamos = readFileSync(archivo('/postventa/reclamos'), 'utf8');
  assert.match(reclamos, /tel:\+595973924675/);
  assert.match(reclamos, /mailto:experienciacliente@santarosa.com.py/);
  assert.match(reclamos, /ContactPage/);
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
  for (const slide of SLIDES_ACTIVOS) assert.ok(existsSync(`public${slide.imagenMobile && !slide.tituloIncrustado ? slide.imagenMobile : `/img/fichas/${slide.slug}/portada-m.webp`}`), slide.slug);
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
      "/postventa/agendar-service",
      "/postventa/reclamos",
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
    for (const [antigua, limpia] of [['/index.html', '/'], ['/modelos/ora-5-ev.html', '/modelos/ora-5-ev'], ['/postventa/agendar-service/', '/postventa/agendar-service']]) {
      const respuesta = await fetch(origen + antigua + '?utm_source=prueba', { redirect: 'manual' });
      assert.equal(respuesta.status, 301, antigua);
      assert.equal(respuesta.headers.get('location'), limpia + '?utm_source=prueba', antigua);
    }
    for (const [vieja, nueva] of Object.entries(PAGINAS_ANTERIORES)) {
      const respuesta = await fetch(origen + vieja + '?utm_source=prueba', { redirect: 'manual' });
      assert.equal(respuesta.status, 301, vieja);
      assert.equal(respuesta.headers.get('location'), nueva + '?utm_source=prueba', vieja);
    }
    const codigo = await fetch(origen + '/codigo-de-cumplimiento');
    assert.equal(codigo.status, 200);
    assert.match(await codigo.text(), /Código de Cumplimiento General Global de Great Wall Motor[\s\S]*\/fichas\/codigo-de-cumplimiento-gwm\.pdf/);
    assert.equal((await fetch(origen + '/fichas/codigo-de-cumplimiento-gwm.pdf')).headers.get('content-type'), 'application/pdf');
    const invalid = await fetch(origen + "/modelos/no-existe");
    assert.equal(invalid.status, 404);
    assert.match(await invalid.text(), /noindex, follow/);
    if (new URL(origen).hostname === '127.0.0.1') {
      // Reproduce el proxy HTTPS de Cloudflare y su salto HTTP hacia Coolify.
      for (const [headers, status] of [
        [{ 'X-Forwarded-Proto': 'http' }, 301],
        [{ 'X-Forwarded-Proto': 'https' }, 200],
        [{ 'CF-Visitor': '{"scheme":"https"}', 'X-Forwarded-Proto': 'http' }, 200],
        [{ 'CF-Visitor': '{ "scheme": "http" }', 'X-Forwarded-Proto': 'https' }, 301],
      ]) {
        const res = await fetch(origen + '/modelos/ora-5-ev?utm_source=prueba', { headers, redirect: 'manual' });
        assert.equal(res.status, status, JSON.stringify(headers));
        if (status === 301) assert.equal(res.headers.get('location'), 'https://127.0.0.1/modelos/ora-5-ev?utm_source=prueba');
      }
      // HSTS: solo cuando la visita llegó por HTTPS (también en la página de error); la comprobación interna por HTTP no lo recibe.
      const hsts = (res) => res.headers.get('strict-transport-security');
      for (const ruta of ['/', '/modelos/ora-5-ev', '/modelos/no-existe', '/robots.txt'])
        assert.equal(hsts(await fetch(origen + ruta, { headers: { 'X-Forwarded-Proto': 'https' } })), 'max-age=15552000', ruta);
      assert.equal(hsts(await fetch(origen + '/')), null);
      // CSP en todos los location (también en la página de error, en el robots y en la API).
      for (const ruta of ['/', '/modelos/ora-5-ev', '/modelos/no-existe', '/robots.txt', '/api/health'])
        assert.match((await fetch(origen + ruta)).headers.get('content-security-policy') ?? '', /^default-src 'self'; script-src 'self' 'wasm-unsafe-eval' 'sha256-[A-Za-z0-9+/=]+'/, ruta);
      assert.equal(hsts(await fetch(origen + '/', { headers: { 'CF-Visitor': '{"scheme":"https"}', 'X-Forwarded-Proto': 'http' } })), 'max-age=15552000');
    }
  },
);
