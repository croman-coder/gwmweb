/**
 * Postventa: opciones del agendamiento de service.
 *
 * Las opciones salen del formulario "Agendá tu mantenimiento" del sitio
 * anterior (relevado el 2026-10-05). Se corrigió la ortografía de una:
 * "Mantencion x kilometraje Sábado" → "Mantención por kilometraje (sábado)".
 * El resto se conserva tal cual, incluido "Mantención", que es como lo
 * nombra Postventa.
 */

export const SERVICIOS = [
  'Mantención por kilometraje',
  'Servicio Express',
  'Mantención Flexible',
  'Mantención por kilometraje (sábado)',
  'Reparación',
  'Desabolladura y Pintura',
  'Alerta de seguridad o Recall',
  'Inspección técnica de 25 puntos',
];

/**
 * WhatsApp que recibe los pedidos de agendamiento cuando no hay un backend
 * configurado (VITE_LEADS_ENDPOINT).
 *
 * PENDIENTE: hoy es el mismo número de ventas del sitio. Si Postventa atiende
 * en otra línea, se cambia solo acá.
 */
export const WHATSAPP_POSTVENTA = '595976955836';

/** Talleres autorizados GWM (Grupo Santa Rosa). Datos pasados por Marketing el 2026-11-27. */
const TALLER_BASE = {
  telefono: '0974 77 22 47',
  whatsapp: '595974772247',
  horarios: [['Lun a Vie', '07:30 a 18:00'], ['Sábado', '07:30 a 12:00'], ['Domingo', 'Cerrado']],
};
export const TALLERES = [
  { nombre: 'Taller Casa Central', direccion: 'Cap. Juan Valeriano de Zeballos 1765, Asunción' },
  { nombre: 'Taller Artigas', direccion: 'Villarrica esq. Asunción 1429, Asunción' },
  { nombre: 'Taller Madame Lynch', direccion: 'Av. Madame Lynch casi Profesor Ramón Cardozo, Asunción' },
  { nombre: 'Taller Madame Lynch 2', direccion: 'Av. Madame Lynch 679, Asunción' },
].map((t) => ({ ...TALLER_BASE, ...t }));

/** Canal de reclamos que figura en el pie de la sección Postventa del sitio anterior. */
export const RECLAMOS = {
  telefono: '0973 924 675',
  telHref: 'tel:+595973924675',
  email: 'experienciacliente@santarosa.com.py',
};
