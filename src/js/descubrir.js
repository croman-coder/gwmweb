import { MODELOS, nombreCompleto, textoPrecio } from "./modelos.js";
import { modelosDe, filtrarModelos, datosClave, carga } from "./vehiculos.js";
import { esc } from "./home/util.js";
import { medir } from "./medicion.js";

export function initDescubrir() {
  const raiz = document.querySelector("[data-catalogo]");
  if (!raiz) return;
  const form = raiz.querySelector("[data-filtros]");
  const base = modelosDe(raiz.dataset.catalogo);
  const elegidos = new Set();
  const barra = raiz.querySelector(".comparador-bar");
  let enCatalogo = false;
  const dialogo = document.querySelector("#comparacion-dialogo");
  const contenido = dialogo.querySelector("[data-comparacion]");
  const abrir = barra.querySelector("[data-comparador-abrir]");
  let ultimoBoton = null;
  try {
    JSON.parse(sessionStorage.getItem("gwm-comparacion") || "[]")
      .filter((s) => MODELOS.some((m) => m.slug === s))
      .slice(0, 3)
      .forEach((s) => elegidos.add(s));
  } catch {}
  const actualizarComparacion = () => {
    raiz
      .querySelectorAll("[data-comparar]")
      .forEach((c) => (c.checked = elegidos.has(c.dataset.comparar)));
    barra.hidden = !elegidos.size || !enCatalogo;
    abrir.disabled = elegidos.size < 2;
    barra.querySelector("[data-comparador-cantidad]").textContent =
      `${elegidos.size} de 3 seleccionados`;
    barra.querySelector("[data-comparador-nombres]").textContent = [...elegidos]
      .map((s) => MODELOS.find((m) => m.slug === s).nombre)
      .join(" · ");
    try {
      sessionStorage.setItem("gwm-comparacion", JSON.stringify([...elegidos]));
    } catch {}
  };
  const aplicar = () => {
    const filtros = Object.fromEntries(new FormData(form));
    const visibles = new Set(filtrarModelos(base, filtros).map((m) => m.slug));
    raiz
      .querySelectorAll("[data-catalogo-modelo]")
      .forEach(
        (card) => (card.hidden = !visibles.has(card.dataset.catalogoModelo)),
      );
    raiz.querySelector("[data-resultados]").textContent =
      `${visibles.size} ${visibles.size === 1 ? "modelo disponible" : "modelos para descubrir"}`;
    raiz.querySelector(".catalogo-vacio").hidden = visibles.size > 0;
  };
  form.addEventListener("submit", (e) => e.preventDefault());
  form.addEventListener("input", aplicar);
  form.addEventListener("change", () => {
    const f = Object.fromEntries(new FormData(form));
    medir("catalogo_filtrado", {
      motor: f.motor,
      carroceria: f.carroceria,
      presupuesto: f.precio,
    });
  });
  form.addEventListener("reset", () => queueMicrotask(aplicar));
  raiz
    .querySelector("[data-limpiar]")
    .addEventListener("click", () => form.reset());
  raiz.addEventListener("change", (e) => {
    const checkbox = e.target.closest("[data-comparar]");
    if (!checkbox) return;
    barra.querySelector("[data-comparador-estado]").textContent = "";
    if (checkbox.checked && elegidos.size >= 3) {
      checkbox.checked = false;
      barra.querySelector("[data-comparador-estado]").textContent =
        "Podés comparar hasta 3 modelos. Quitá uno para agregar otro.";
      return;
    }
    if (checkbox.checked) elegidos.add(checkbox.dataset.comparar);
    else elegidos.delete(checkbox.dataset.comparar);
    actualizarComparacion();
  });
  barra
    .querySelector("[data-comparador-limpiar]")
    .addEventListener("click", () => {
      elegidos.clear();
      actualizarComparacion();
    });
  const tecnicas = import.meta.glob("./tecnica/*.js");
  abrir.addEventListener("click", async () => {
    ultimoBoton = abrir;
    contenido.innerHTML = '<p role="status">Preparando la comparación…</p>';
    dialogo.showModal();
    const modelos = [...elegidos].map((s) => MODELOS.find((m) => m.slug === s));
    const datos = await Promise.all(
      modelos.map(async (m) => {
        const cargar = tecnicas[`./tecnica/${m.slug}.js`];
        return datosClave(
          m,
          cargar
            ? await cargar().then(
                (v) => v.default,
                () => null,
              )
            : null,
        );
      }),
    );
    contenido.innerHTML = `<div class="comparison-scroll"><table class="comparison-table"><caption class="visually-hidden">Comparación de vehículos GWM</caption><thead><tr><th scope="col">Tu próximo GWM</th>${modelos.map((m) => `<th scope="col"><img src="${m.imagen}" alt="" width="240" height="95" /><a href="/modelos/${m.slug}">${esc(nombreCompleto(m))} ↗</a></th>`).join("")}</tr></thead><tbody><tr><th scope="row">Precio de referencia</th>${modelos.map((m) => `<td>${textoPrecio(m.precio)}</td>`).join("")}</tr>${datos[0].map(([label], i) => `<tr><th scope="row">${label}</th>${datos.map((d) => `<td>${esc(d[i][1])}</td>`).join("")}</tr>`).join("")}<tr><th scope="row">Energía y recarga</th>${modelos.map((m) => `<td>${esc(carga(m))}</td>`).join("")}</tr><tr><th scope="row">Siguiente paso</th>${modelos.map((m) => `<td><button class="action action--dark" type="button" data-cotizar-comparacion="${m.slug}">Cotizar</button></td>`).join("")}</tr></tbody></table></div><p class="catalogo-nota">Los datos pueden variar según versión. Revisá el detalle y el PDF en cada ficha. Precio y disponibilidad a confirmar en Paraguay.</p>`;
    medir("comparacion_abierta", { cantidad: modelos.length });
  });
  dialogo
    .querySelector("[data-cerrar-comparacion]")
    .addEventListener("click", () => dialogo.close());
  dialogo.addEventListener("close", () => ultimoBoton?.focus());
  contenido.addEventListener("click", (e) => {
    const b = e.target.closest("[data-cotizar-comparacion]");
    if (!b) return;
    dialogo.close();
    document.dispatchEvent(
      new CustomEvent("gwm:consulta", {
        detail: {
          tipo: "cotizacion",
          slug: b.dataset.cotizarComparacion,
          trigger: abrir,
        },
      }),
    );
  });
  const parametros = new URLSearchParams(location.search);
  ["buscar", "motor", "carroceria", "precio"].forEach((k) => {
    if (parametros.has(k))
      form.elements[k].value = parametros.get(k).slice(0, 128);
  });
  new IntersectionObserver(
    ([e]) => {
      enCatalogo = e.isIntersecting;
      barra.hidden = !elegidos.size || !enCatalogo;
    },
    { threshold: 0 },
  ).observe(raiz);
  actualizarComparacion();
  aplicar();
}
