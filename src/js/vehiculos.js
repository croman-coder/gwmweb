/** Datos de comparación derivados del catálogo y de las mismas hojas técnicas de las fichas. */
import { MODELOS, TIPOS_MOTOR, CARROCERIAS } from "./modelos.js";

export const tecnologia = (m) =>
  TIPOS_MOTOR.find((t) => t.id === m.motor)?.titulo || "Consultar";
export const carroceria = (m) =>
  CARROCERIAS.find((t) => t.id === m.carroceria)?.titulo || "Consultar";
export const carga = (m) =>
  ({
    hev: "Sin enchufe: recupera energía al conducir",
    phev: "Se puede enchufar y también usa combustible",
    electrico: "Recarga mediante conexión eléctrica",
    diesel: "Combustible diésel",
  })[m.motor];

export function filtrarModelos(modelos, filtros = {}) {
  const q = (filtros.buscar || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
  return modelos.filter(
    (m) =>
      (!q || `${m.nombre} ${m.categoria}`.toLowerCase().includes(q)) &&
      (!filtros.motor || m.motor === filtros.motor) &&
      (!filtros.carroceria || m.carroceria === filtros.carroceria) &&
      (!filtros.precio ||
        (m.precio !== null && m.precio <= Number(filtros.precio))),
  );
}

export function datosClave(modelo, tecnica) {
  const filas = tecnica?.secciones.flatMap((s) => s.filas) || [];
  const encontrar = (patron) => {
    const f = filas.find(
      ([k, v]) => patron.test(k) && (typeof v === "string" || Array.isArray(v)),
    );
    if (!f) return "Consultar según versión";
    return Array.isArray(f[1])
      ? [...new Set(f[1].filter((v) => typeof v === "string"))].join(" / ") ||
          "Consultar según versión"
      : f[1];
  };
  return [
    ["Tecnología", tecnologia(modelo)],
    ["Carrocería", carroceria(modelo)],
    ["Tracción", encontrar(/^Tracción$/i)],
    ["Transmisión", encontrar(/^(Transmisión|Caja de cambios)$/i)],
  ];
}

export const modelosDe = (tipo) =>
  MODELOS.filter((m) =>
    tipo === "hibridos"
      ? ["hev", "phev"].includes(m.motor)
      : tipo === "electricos"
        ? m.motor === "electrico"
        : tipo === "pickups"
          ? m.carroceria === "pickup"
          : true,
  );
