/** Formulario de mantenimiento compartido por la portada y su página propia. */
import { CATEGORIAS, MODELOS } from '../modelos.js';
import { esc } from '../home/util.js';
import { COSTOS_MANTENIMIENTO, KM } from '../mantenimiento.js';

const gs = (n) => `₲ ${n.toLocaleString('es-PY').replace(/,/g, '.')}`;
const celdasKm = (km) => km.map((k) => `<th scope="col">${k} mil km</th>`).join('');

/** Lista de precios de mantenimiento: una fila por modelo, agrupada por línea. */
function htmlCostos() {
  const cuerpo = COSTOS_MANTENIMIENTO.map(({ linea, filas }) =>
    `<tbody><tr class="costos__linea"><th colspan="${KM.length + 1}" scope="rowgroup">${esc(linea)}</th></tr>${filas.map(([modelo, precios, km]) =>
      (km ? `<tr class="costos__km"><td></td>${celdasKm(km)}</tr>` : '') +
      `<tr><th scope="row">${esc(modelo)}</th>${precios.map((p) => `<td>${gs(p)}</td>`).join('')}</tr>`).join('')}</tbody>`).join('');
  return `<div class="costos">
            <h3 class="costos__titulo">Lista de precios de mantenimiento</h3>
            <div class="costos__scroll" tabindex="0" role="region" aria-label="Precios de mantenimiento por modelo y kilometraje">
              <table class="costos__tabla"><thead><tr><th scope="col">Modelo / km</th>${celdasKm(KM)}</tr></thead>${cuerpo}</table>
            </div>
            <p class="costos__nota">Precios en guaraníes por service según kilometraje. Pueden variar: el taller confirma el presupuesto al agendar.</p>
          </div>`;
}


function opcionesModelos() {
  return CATEGORIAS.map(cat => `<optgroup label="${esc(cat.titulo)}">${MODELOS.filter(m => m.categoria === cat.id).map(m => `<option value="${esc(m.nombre)}">${esc(m.nombre)}</option>`).join('')}</optgroup>`).join('');
}

export const htmlAgenda = () => `<section class="seccion seccion--blanca" id="postventa" aria-labelledby="postventa-titulo">
        <div class="responsive__layout">
          <header class="seccion__cabecera">
            <p class="seccion__etiqueta">Postventa</p>
            <h2 class="seccion__titulo" id="postventa-titulo">Agendá tu mantenimiento</h2>
            <p class="seccion__bajada">Mirá cuánto cuesta el mantenimiento de tu GWM y agendá tu turno.</p>
            <p class="agenda-privacidad">Tu fecha es una preferencia: el equipo confirma el turno. Consultá cómo usamos tus datos en nuestra <a href="/privacidad">política de privacidad</a>.</p>
          </header>

          ${htmlCostos()}

          <form class="agenda" id="agenda" data-form-agenda novalidate>
            <fieldset class="agenda__grupo">
              <legend class="agenda__titulo"><span class="agenda__paso" aria-hidden="true">1</span>Tus datos</legend>
              <div class="agenda__fila">
                <div class="agenda__col agenda__col--6">
                  <label class="agenda__label" for="ag-nombre">Nombre y apellido</label>
                  <input class="agenda__campo" id="ag-nombre" name="nombre" type="text" autocomplete="name" required />
                </div>
                <div class="agenda__col agenda__col--6">
                  <label class="agenda__label" for="ag-telefono">Teléfono / celular</label>
                  <input class="agenda__campo" id="ag-telefono" name="telefono" type="tel" autocomplete="tel" required />
                </div>
                <div class="agenda__col agenda__col--12">
                  <label class="agenda__label" for="ag-email">Email</label>
                  <input class="agenda__campo" id="ag-email" name="email" type="email" autocomplete="email" required />
                </div>
              </div>
            </fieldset>

            <fieldset class="agenda__grupo">
              <legend class="agenda__titulo"><span class="agenda__paso" aria-hidden="true">2</span>Tu vehículo</legend>
              <div class="agenda__fila">
                <div class="agenda__col agenda__col--8">
                  <label class="agenda__label" for="ag-modelo">Modelo</label>
                  <select class="agenda__campo" id="ag-modelo" name="modelo" required>
                    <option value="">Seleccioná un modelo...</option>${opcionesModelos()}
                  </select>
                </div>
                <div class="agenda__col agenda__col--4">
                  <label class="agenda__label" for="ag-anio">Año</label>
                  <input class="agenda__campo" id="ag-anio" name="anio" type="number" inputmode="numeric" placeholder="Ej: 2024" required />
                </div>
              </div>
            </fieldset>

            <fieldset class="agenda__grupo">
              <legend class="agenda__titulo"><span class="agenda__paso" aria-hidden="true">3</span>Mantenimiento</legend>
              <input type="hidden" name="servicio" value="Mantenimiento" />
              <div class="agenda__fila">
                <div class="agenda__col agenda__col--6">
                  <label class="agenda__label" for="ag-km">Service de</label>
                  <select class="agenda__campo" id="ag-km" name="kilometraje" required>
                    <option value="">Elegí el kilometraje...</option>${Array.from({ length: 20 }, (_, i) => (i + 1) * 5).map((k) => `<option>${k} mil km</option>`).join('')}<option>Más de 100 mil km</option>
                  </select>
                </div>
              </div>
            </fieldset>

            <fieldset class="agenda__grupo">
              <legend class="agenda__titulo">
                <span class="agenda__paso" aria-hidden="true">4</span>Fecha y comentarios
                <span class="agenda__opcional">opcional</span>
              </legend>
              <div class="agenda__fila">
                <div class="agenda__col agenda__col--4">
                  <label class="agenda__label" for="ag-fecha">Fecha preferida</label>
                  <input class="agenda__campo" id="ag-fecha" name="fecha" type="date" />
                </div>
                <div class="agenda__col agenda__col--8">
                  <label class="agenda__label" for="ag-comentarios">Comentarios</label>
                  <textarea class="agenda__campo" id="ag-comentarios" name="comentarios" rows="3"></textarea>
                </div>
              </div>
            </fieldset>

            <div class="agenda__envio">
              <button class="button--primary size-medium agenda__enviar" type="submit">
                <span class="red-arrow-above fs-button-m fw-bold">Agendar</span>
              </button>
              <p class="agenda__estado" data-estado role="status" aria-live="polite"></p>
            </div>
          </form>

          <p class="agenda__reclamos">¿Tenés un reclamo? <a href="/postventa/reclamos">Contactá a Atención al cliente ↗</a></p>
        </div>
      </section>`;
