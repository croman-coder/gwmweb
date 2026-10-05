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

/** Canal de reclamos que figura en el pie de la sección Postventa del sitio anterior. */
export const RECLAMOS = {
  telefono: '0973 924 675',
  telHref: 'tel:+595973924675',
  email: 'experienciacliente@santarosa.com.py',
};
