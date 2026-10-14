import { initCookies } from "./cookies.js";

/** Nunca se envían campos del formulario a analítica. Sin ID configurado no hay petición externa. */
const CAMPOS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
];
let habilitada = false;
let consentimientoAnalitica = false;

export function campana() {
  if (!consentimientoAnalitica) return {};
  try {
    const query = new URLSearchParams(location.search);
    if (CAMPOS.some((k) => query.has(k)))
      sessionStorage.setItem(
        "gwm-campana",
        JSON.stringify(
          Object.fromEntries(
            CAMPOS.filter((k) => query.has(k)).map((k) => [
              k,
              query.get(k).slice(0, 128),
            ]),
          ),
        ),
      );
    return JSON.parse(sessionStorage.getItem("gwm-campana") || "{}");
  } catch {
    return {};
  }
}

export function medir(evento, detalle = {}) {
  const permitidos = [
    "modelo",
    "version",
    "tipo",
    "destino",
    "cantidad",
    "motor",
    "carroceria",
    "presupuesto",
  ];
  const datos = Object.fromEntries(
    Object.entries(detalle).filter(([k]) => permitidos.includes(k)),
  );
  document.dispatchEvent(
    new CustomEvent("gwm:evento", { detail: { evento, ...datos } }),
  );
  if (habilitada) window.gtag?.("event", evento, datos);
}

/** Retira las cookies de analítica legibles del sitio cuando se revoca su uso. */
function retirarCookiesAnaliticas() {
  const nombres = document.cookie
    .split(";")
    .map((c) => c.trim().split("=")[0])
    .filter((n) => /^(_ga(?:_|$)|_gid$|_gat(?:_|$))/.test(n));
  const partes = location.hostname.split(".");
  const dominios = [];
  for (let i = 0; i < partes.length - 1; i++)
    dominios.push(partes.slice(i).join("."));
  for (const nombre of nombres) {
    document.cookie = `${nombre}=; Max-Age=0; Path=/`;
    for (const dominio of dominios)
      document.cookie = `${nombre}=; Max-Age=0; Path=/; Domain=${dominio}`;
  }
}

export function initMedicion() {
  const id = import.meta.env.VITE_GA_ID;
  const valido = /^G-[A-Z0-9]+$/.test(id || "");
  let inicializada = false;
  const denegado = {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  };
  if (valido) window[`ga-disable-${id}`] = true;

  initCookies((preferencias) => {
    consentimientoAnalitica = preferencias.analytics === true;
    habilitada = valido && consentimientoAnalitica;
    if (valido) window[`ga-disable-${id}`] = !habilitada;
    if (!consentimientoAnalitica) {
      try {
        sessionStorage.removeItem("gwm-campana");
      } catch {
        /* almacenamiento restringido */
      }
      if (preferencias.fecha) retirarCookiesAnaliticas();
      window.gtag?.("consent", "update", denegado);
      return;
    }
    campana();
    if (!valido) return;
    window.dataLayer ||= [];
    window.gtag ||= function () {
      window.dataLayer.push(arguments);
    };
    if (!inicializada) window.gtag("consent", "default", denegado);
    window.gtag("consent", "update", {
      ...denegado,
      analytics_storage: "granted",
    });
    if (!inicializada) {
      window.gtag("js", new Date());
      window.gtag("config", id, {
        page_location: location.origin + location.pathname,
        page_referrer: document.referrer.split("?")[0],
        cookie_domain: location.hostname,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      });
      inicializada = true;
    }
    if (!document.querySelector("[data-gwm-analytics]")) {
      const script = document.createElement("script");
      script.async = true;
      script.dataset.gwmAnalytics = "";
      script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      document.head.appendChild(script);
    }
  });
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a) return;
    const url = new URL(a.href, location.origin);
    const modelo = location.pathname.match(/^\/modelos\/([^/]+)/)?.[1] || "";
    if (url.hostname === "wa.me") medir("whatsapp_click", { modelo });
    else if (a.pathname.endsWith(".pdf")) medir("ficha_descarga", { modelo });
    else if (a.protocol === "tel:") medir("llamada_click", { modelo });
    else if (/maps/.test(url.hostname)) medir("mapa_click");
  });
}
