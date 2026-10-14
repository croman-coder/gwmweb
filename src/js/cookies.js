/** Preferencias propias del sitio; no requiere un servicio externo de consentimiento. */
export const COOKIE_CONSENTIMIENTO = "gwm_cookie_consent";
export const DURACION_CONSENTIMIENTO = 180 * 24 * 60 * 60 * 1000;

export function interpretarConsentimiento(valor, ahora = Date.now()) {
  try {
    const datos = JSON.parse(valor);
    if (
      datos?.version !== 1 ||
      typeof datos.analytics !== "boolean" ||
      !Number.isFinite(datos.fecha) ||
      datos.fecha > ahora ||
      ahora - datos.fecha >= DURACION_CONSENTIMIENTO
    )
      return null;
    return {
      version: 1,
      necesarias: true,
      analytics: datos.analytics,
      fecha: datos.fecha,
    };
  } catch {
    return null;
  }
}

function leerConsentimiento() {
  const cookie = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${COOKIE_CONSENTIMIENTO}=`));
  try {
    return cookie
      ? interpretarConsentimiento(
          decodeURIComponent(cookie.slice(COOKIE_CONSENTIMIENTO.length + 1)),
        )
      : null;
  } catch {
    return null;
  }
}

export function initCookies(alCambiar) {
  const banner = document.querySelector("#cookies-banner");
  const dialogo = document.querySelector("#cookies-dialogo");
  if (!banner || !dialogo) return;
  const analitica = dialogo.querySelector('[name="analytics"]');
  let preferencias = leerConsentimiento();
  let activador = null;
  const estado = document.querySelector("[data-cookies-estado]");

  const mostrarBanner = (mostrar) => {
    banner.hidden = !mostrar;
    document.body.classList.toggle("cookies-pendientes", mostrar);
  };
  const guardar = (analytics) => {
    preferencias = {
      version: 1,
      necesarias: true,
      analytics,
      fecha: Date.now(),
    };
    const seguro = location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${COOKIE_CONSENTIMIENTO}=${encodeURIComponent(JSON.stringify(preferencias))}; Max-Age=${DURACION_CONSENTIMIENTO / 1000}; Path=/; SameSite=Lax${seguro}`;
    // La preferencia anterior solo existía cuando se configuraba analítica. Se sustituye por este menú.
    try {
      localStorage.removeItem("gwm-medicion");
    } catch {
      /* almacenamiento restringido */
    }
    alCambiar(preferencias);
    mostrarBanner(false);
    if (dialogo.open) dialogo.close();
    estado.textContent = analytics
      ? "Preferencias guardadas: cookies necesarias y analíticas permitidas."
      : "Preferencias guardadas: solo cookies necesarias.";
    if (activador?.isConnected) activador.focus();
  };
  const configurar = (trigger) => {
    activador = trigger;
    analitica.checked = preferencias?.analytics === true;
    dialogo.showModal();
  };

  document.addEventListener("click", (e) => {
    const configurarBoton = e.target.closest("[data-cookies-preferencias]");
    if (configurarBoton) {
      e.preventDefault();
      configurar(configurarBoton);
      return;
    }
    const aceptar = e.target.closest("[data-cookies-aceptar]");
    const necesarias = e.target.closest("[data-cookies-necesarias]");
    if (aceptar || necesarias) {
      activador = null;
      guardar(Boolean(aceptar));
    }
  });
  dialogo.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    guardar(analitica.checked);
  });
  dialogo
    .querySelector("[data-cookies-cerrar]")
    .addEventListener("click", () => dialogo.close());
  dialogo.addEventListener("close", () => {
    if (activador?.isConnected) activador.focus();
  });
  alCambiar(preferencias || { necesarias: true, analytics: false });
  mostrarBanner(!preferencias);
}
