import { MODELOS, nombreCompleto } from "./modelos.js";
import { FICHAS } from "./fichas.js";
import { CIUDADES } from "./concesionarios.js";
import { enlaceWhatsApp } from "./whatsapp.js";
import { esc } from "./home/util.js";
import { medir, campana } from "./medicion.js";

export function initLeads() {
  const dialogo = document.querySelector("#consulta-dialogo");
  if (!dialogo) return;
  const form = dialogo.querySelector("form");
  const modelo = form.elements.modelo;
  const version = form.elements.version;
  const estado = form.querySelector("[data-estado-lead]");
  const boton = form.querySelector('[type="submit"]');
  const endpoint = import.meta.env.VITE_LEADS_ENDPOINT || '/api/lead';
  let requestId = crypto.randomUUID();
  let ultimoCuerpo = '';
  modelo.innerHTML =
    '<option value="">Elegí un modelo</option>' +
    MODELOS.map(
      (m) => `<option value="${m.slug}">${esc(nombreCompleto(m))}</option>`,
    ).join("");
  form.elements.ciudad.innerHTML =
    '<option value="">Elegí tu ciudad de atención</option>' +
    CIUDADES.map((c) => `<option>${esc(c)}</option>`).join("");
  let tipo = "cotizacion";
  let origen = null;
  const versiones = () => {
    const opciones = FICHAS[modelo.value]?.versiones || [];
    version.innerHTML =
      '<option value="">Quiero asesoramiento</option>' +
      opciones.map((v) => `<option>${esc(v.nombre)}</option>`).join("");
    version.closest("label").hidden = !opciones.length;
  };
  modelo.addEventListener("change", versiones);
  const abrir = ({
    tipo: solicitud = "cotizacion",
    slug = "",
    version: elegida = "",
    trigger = null,
  }) => {
    origen = trigger;
    tipo = solicitud;
    form.reset();
    requestId = crypto.randomUUID();
    ultimoCuerpo = '';
    estado.textContent = "";
    boton.disabled = false;
    modelo.value =
      slug || location.pathname.match(/^\/modelos\/([^/]+)/)?.[1] || "";
    versiones();
    if (elegida) version.value = elegida;
    dialogo.querySelector("#consulta-titulo").textContent =
      tipo === "testdrive"
        ? "Conocé tu GWM al volante."
        : "Tu próximo GWM empieza acá.";
    form.elements.fecha.closest("label").hidden = tipo !== "testdrive";
    form.elements.fecha.min = new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000,
    )
      .toISOString()
      .slice(0, 10);
    dialogo.querySelector("[data-lead-canales]").textContent = "Enviá tu solicitud y un asesor GWM de la ciudad elegida te contactará para continuar.";
    boton.textContent = "Enviar solicitud";
    medir("consulta_abierta", { tipo, modelo: modelo.value });
    dialogo.showModal();
  };
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-lead]");
    if (!a) return;
    e.preventDefault();
    abrir({
      tipo: a.dataset.lead,
      slug: a.dataset.modeloSlug,
      version: a.dataset.version,
      trigger: a,
    });
  });
  document.addEventListener("gwm:consulta", (e) => abrir(e.detail));
  const cerrar = () => dialogo.close();
  dialogo
    .querySelector("[data-cerrar-consulta]")
    .addEventListener("click", cerrar);
  dialogo.addEventListener("click", (e) => {
    if (e.target === dialogo) {
      const r = dialogo.getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      )
        cerrar();
    }
  });
  dialogo.addEventListener("close", () => origen?.focus());
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.reportValidity() || boton.disabled) return;
    const datos = Object.fromEntries(new FormData(form));
    const m = MODELOS.find((m) => m.slug === datos.modelo);
    const payload = {
      ...datos,
      tipo,
      modelo: m.nombre,
      slug: m.slug,
      pagina: location.pathname,
      campana: campana(),
      ...(tipo !== "testdrive" ? { fecha: "" } : {}),
    };
    const cuerpo = JSON.stringify(payload);
    if (ultimoCuerpo && ultimoCuerpo !== cuerpo) requestId = crypto.randomUUID();
    ultimoCuerpo = cuerpo;
    payload.requestId = requestId;
    medir("consulta_preparada", {
      tipo,
      modelo: m.slug,
      version: datos.version,
    });
    boton.disabled = true;
    estado.textContent = "Enviando tu solicitud…";
    const controlador = new AbortController();
    const timeout = setTimeout(() => controlador.abort(), 30000);
    try {
      const respuesta = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controlador.signal,
      });
      const recibo = await respuesta.json().catch(() => null);
      if (!respuesta.ok || recibo?.ok !== true) throw new Error("No recibido");
      estado.textContent =
        "Recibimos tu solicitud. Un asesor te contactará para confirmar los detalles. El envío no confirma una reserva ni un turno.";
      medir("consulta_recibida", {
        tipo,
        modelo: m.slug,
        version: datos.version,
      });
      form.reset();
      versiones();
    } catch {
      estado.textContent =
        "No pudimos confirmar la recepción. Probá de nuevo o escribinos por WhatsApp.";
      const enlace = document.createElement("a");
      enlace.href = enlaceWhatsApp(
        `Hola, quiero consultar por el GWM ${nombreCompleto(m)}.`,
      );
      enlace.target = "_blank";
      enlace.rel = "noopener";
      enlace.textContent = " Abrir WhatsApp";
      estado.appendChild(enlace);
    } finally {
      clearTimeout(timeout);
      boton.disabled = false;
    }
  });
}
