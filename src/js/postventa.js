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
export const TALLERES_PROPIOS = [
  { ciudad: 'Asunción', nombre: 'Taller Casa Central', direccion: 'Cap. Juan Valeriano de Zeballos 1765, Asunción' },
  { ciudad: 'Asunción', nombre: 'Taller Artigas', direccion: 'Villarrica esq. Asunción 1429, Asunción' },
  { ciudad: 'Asunción', nombre: 'Taller Madame Lynch', direccion: 'Av. Madame Lynch casi Profesor Ramón Cardozo, Asunción' },
  { ciudad: 'Asunción', nombre: 'Taller Madame Lynch 2', direccion: 'Av. Madame Lynch 679, Asunción' },
].map((t) => ({ ...TALLER_BASE, ...t }));

/**
 * Red de talleres autorizados GWM (planilla de Postventa, 2026-11-27).
 * Solo datos públicos: nombre, dirección, teléfono del taller y mapa. Quedaron fuera Taller San Pedro
 * (dado de baja), Garage 59 (cerró) y PAMOSA (convenio vencido el 20-08-2026; sumarlo si se renueva).
 * Sin horarios: la planilla no los trae.
 */
export const TALLERES_RED = [
  { ciudad: 'Asunción', nombre: 'Golden Arrow', direccion: 'Calle Caaguazú 1790, Asunción', telefono: '0983 411 370' },
  { ciudad: 'Asunción', nombre: 'Silent Car', direccion: 'Yaguarón casi PY03, Asunción', telefono: '0982 453 328', mapa: 'https://www.google.com/maps/place/Silent+Car/@-25.2524812,-57.5553926,18z' },
  { ciudad: 'Caaguazú', nombre: 'CDV Automotores', direccion: '15 de Agosto y Gral. Eugenio A. Garay, Caaguazú', telefono: '0983 607 230', mapa: 'https://www.google.com/maps/place/CDV+Automotores/@-25.470639,-56.0155216,19z' },
  { ciudad: 'Ciudad del Este', nombre: 'Gotze Autocentro', direccion: 'Coronel Sánchez 388 casi Coronel Giménez, Ciudad del Este', telefono: '0983 682 278', mapa: 'https://www.google.com/maps/place/Gotze+Autocentro/@-25.5031468,-54.6342028,16z' },
  { ciudad: 'Ciudad del Este', nombre: 'Os-Car Automecánica', direccion: 'Abdón Palacios c/ General Juan B. Ayala, Ciudad del Este', telefono: '0986 566 961', mapa: 'https://www.google.com/maps/place/Os-Car+Automec%C3%A1nica/@-25.5086987,-54.6236829,17z' },
  { ciudad: 'Concepción', nombre: 'Servicar', direccion: 'Pai Pérez, Concepción', telefono: '0981 156 997', mapa: 'https://maps.app.goo.gl/W6oCbwQVFgtbBtqz7' },
  { ciudad: 'Coronel Oviedo', nombre: 'Grupo J.S.', direccion: 'Independencia Nacional c/ Padre Molas, Coronel Oviedo', telefono: '0521 203 064' },
  { ciudad: 'Curuguaty', nombre: 'Taller El Amigo', direccion: 'Ruta 13, Curuguaty', telefono: '0993 286 216', mapa: 'https://www.google.com/maps/search/?api=1&query=-24.4805031,-55.6881943' },
  { ciudad: 'Dr. Juan E. Estigarribia', nombre: 'Car Center', direccion: 'Ruta 2 Mcal. José Félix Estigarribia km 212, Dr. Juan Eulogio Estigarribia', telefono: '0984 407 634' },
  { ciudad: 'Encarnación', nombre: 'Nisur', direccion: 'Ruta 6, km 1, Encarnación', telefono: '0981 351 143', mapa: 'https://goo.gl/maps/pxjkav7Nj5Pm4pZR7' },
  { ciudad: 'Filadelfia', nombre: 'Taller Industrial Chaco (TIC)', direccion: 'Calle Industrial 119, Filadelfia', telefono: '0981 445 669', mapa: 'https://www.google.com/maps/search/?api=1&query=-22.3567498,-60.0338555' },
  { ciudad: 'Hohenau', nombre: 'Automotores Enrique', direccion: 'Ruta 6 km 38 y Boquerón, Hohenau', telefono: '0985 786 043', mapa: 'https://www.google.com/maps/place/Automotores+Enrique+S.R.L./@-27.0761839,-55.6433085,16z' },
  { ciudad: 'Katueté', nombre: 'Auto Diesel Paraná', direccion: 'Calle Perpetuo Socorro c/ Moisés Bertoni, Katueté', telefono: '0983 195 155', mapa: 'https://www.google.com/maps/search/?api=1&query=-24.2478465,-54.7636411' },
  { ciudad: 'Pedro Juan Caballero', nombre: 'Norte Autos', direccion: 'Benjamín Aceval c/ Teniente Herrero, Pedro Juan Caballero', telefono: '0981 297 353', mapa: 'https://www.google.com/maps/place/Norte+Autos/@-22.5612337,-55.7232586,17z' },
  { ciudad: 'San Estanislao', nombre: 'Taller Santaní', direccion: 'Mauricio José Troche c/ calle 14, San Estanislao', telefono: '0981 243 560', mapa: 'https://goo.gl/maps/STiULEX43tnFGnyR9' },
  { ciudad: 'Santa Rita', nombre: 'Kady Centro Automotivo', direccion: 'Ruta 6, Fracción Alexandrino, Santa Rita', telefono: '0983 602 981' },
  { ciudad: 'Santa Rosa del Aguaray', nombre: 'Taller Fogasa', direccion: 'Ruta PY08, Santa Rosa del Aguaray', telefono: '0984 401 200', mapa: 'https://www.google.com/maps/search/?api=1&query=-23.8021456,-56.503827' },
];

/** Canal de reclamos que figura en el pie de la sección Postventa del sitio anterior. */
export const RECLAMOS = {
  telefono: '0973 924 675',
  telHref: 'tel:+595973924675',
  email: 'experienciacliente@santarosa.com.py',
};
