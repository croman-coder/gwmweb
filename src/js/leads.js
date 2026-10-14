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
  const endpoint = import.meta.env.VITE_LEADS_ENDPOINT;
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
    dialogo.querySelector("[data-lead-canales]").textContent = endpoint
      ? "Recibimos tu solicitud desde esta web. Un asesor te contactará para continuar."
      : "Prepará tu consulta y continuá en WhatsApp. El equipo recibe tu solicitud cuando enviás el mensaje allí.";
    boton.textContent = endpoint ? "Enviar solicitud" : "Continuar en WhatsApp";
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
    medir("consulta_preparada", {
      tipo,
      modelo: m.slug,
      version: datos.version,
    });
    if (!endpoint) {
      const mensaje = [
        `Hola, ${tipo === "testdrive" ? "quiero solicitar un test drive" : "quiero una cotización"} del GWM ${nombreCompleto(m)}.`,
        `Nombre: ${datos.nombre}`,
        `Teléfono: ${datos.telefono}`,
        `Ciudad: ${datos.ciudad}`,
        datos.version ? `Versión: ${datos.version}` : "",
        datos.email ? `Email: ${datos.email}` : "",
        tipo === "testdrive" && datos.fecha
          ? `Fecha preferida: ${datos.fecha}`
          : "",
        datos.comentarios ? `Consulta: ${datos.comentarios}` : "",
      ]
        .filter(Boolean)
        .join("\n");
      const enlace = enlaceWhatsApp(mensaje);
      window.open(enlace, "_blank", "noopener");
      estado.innerHTML = `Continuá en WhatsApp y enviá el mensaje para que recibamos tu solicitud. <a href="${esc(enlace)}" target="_blank" rel="noopener">Abrir WhatsApp</a>`;
      medir("whatsapp_click", { tipo, modelo: m.slug });
      return;
    }
    boton.disabled = true;
    estado.textContent = "Enviando tu solicitud…";
    const controlador = new AbortController();
    const timeout = setTimeout(() => controlador.abort(), 15000);
    try {
      const respuesta = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controlador.signal,
      });
      if (!respuesta.ok) throw new Error("No recibido");
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
