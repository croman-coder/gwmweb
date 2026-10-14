/** Formulario de mantenimiento compartido por la portada y su página propia. */
import { CATEGORIAS, MODELOS } from '../modelos.js';
import { SERVICIOS } from '../postventa.js';
import { esc } from '../home/util.js';

function opcionesModelos() {
  return CATEGORIAS.map(cat => `<optgroup label="${esc(cat.titulo)}">${MODELOS.filter(m => m.categoria === cat.id).map(m => `<option value="${esc(m.nombre)}">${esc(m.nombre)}</option>`).join('')}</optgroup>`).join('');
}

export const htmlAgenda = () => `<section class="seccion seccion--blanca" id="postventa" aria-labelledby="postventa-titulo">
        <div class="responsive__layout">
          <header class="seccion__cabecera">
            <p class="seccion__etiqueta">Postventa</p>
            <h2 class="seccion__titulo" id="postventa-titulo">Agendá tu service</h2>
            <p class="seccion__bajada">Completá tus datos y elegí el servicio que necesitás para tu GWM.</p>
            <p class="agenda-privacidad">Tu fecha es una preferencia: el equipo confirma el turno. Consultá cómo usamos tus datos en nuestra <a href="/privacidad">política de privacidad</a>.</p>
          </header>


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
              <legend class="agenda__titulo"><span class="agenda__paso" aria-hidden="true">3</span>¿Qué servicio necesitás?</legend>
              <div class="agenda__opciones" data-servicios>${SERVICIOS.map(servicio => `<label class="agenda__chip"><input type="radio" name="servicio" value="${esc(servicio)}" required /><span>${esc(servicio)}</span></label>`).join('')}</div>
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
