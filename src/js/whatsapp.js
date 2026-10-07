/**
 * WhatsApp de ventas y armado de enlaces con el mensaje ya escrito.
 * El de postventa vive aparte (WHATSAPP_POSTVENTA, en postventa.js).
 */
export const WHATSAPP = '595976955836';

export function enlaceWhatsApp(mensaje, numero = WHATSAPP) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}

/**
 * Enlace de WhatsApp de ventas con el modelo (y la versión, si la hay) ya nombrados.
 * `consulta` pide información en vez de una cotización: se usa cuando no hay precio.
 */
export function whatsappModelo(nombre, { version = '', consulta = false } = {}) {
  const accion = consulta ? 'quiero información sobre' : 'quiero cotizar';
  const detalle = version ? ` (versión ${version})` : '';
  return enlaceWhatsApp(`Hola, ${accion} el GWM ${nombre}${detalle}.`);
}
