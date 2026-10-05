/**
 * Puntos de venta de GWM Paraguay.
 *
 * Relevados de la sección "Concesionarias" del sitio anterior el 2026-10-05.
 * El sitio anterior no trae fotos de los locales, así que las tarjetas no
 * llevan imagen.
 *
 * Se normalizó lo que estaba mal escrito en el origen, sin cambiar el dato:
 * - El nombre original se separó en `marca` + `nombre`, con las mismas palabras,
 *   para tener jerarquía en la tarjeta: "Casa Matriz Santa Rosa" pasa a
 *   Santa Rosa / Casa Matriz (la marca va de encabezado).
 * - Las direcciones van sin ", Paraguay" y sin la ciudad repetida, con tildes
 *   corregidas y "Médicos el Chaco" → "Médicos del Chaco" (error de tipeo).
 * - PAMOSA venía con cinco teléfonos pegados en un solo enlace `tel:` inválido;
 *   se separaron. Los cuatro fijos compartían el prefijo +595 21.
 *
 * PENDIENTE de confirmar con Marketing: el horario de Casa Matriz dice solo
 * "de 8 a 19", sin días.
 */

export const DEALERS = [
  {
    ciudad: 'Asunción',
    marca: 'Santa Rosa',
    nombre: 'Casa Matriz',
    tipos: ['Ventas'],
    direccion: 'Dr. Agustín Goiburu 1868, Asunción',
    telefonos: ['021 582 812'],
    horario: 'De 8 a 19 hs.',
    mapa: 'https://maps.app.goo.gl/u1n2jDJqfJaoN7UF9',
  },
  {
    ciudad: 'San Lorenzo',
    marca: 'Santa Rosa',
    nombre: 'Shopping San Lorenzo',
    tipos: ['Ventas'],
    direccion: 'Ruta Mariscal José Félix Estigarribia, San Lorenzo',
    telefonos: ['+595 974 772 246'],
    horario: 'Lunes a sábado de 09:00 a 21:00 y domingos de 10:00 a 21:00 hs.',
    mapa: 'https://maps.app.goo.gl/tRuER9dHJG736nH48',
  },
  {
    ciudad: 'Asunción',
    marca: 'Santa Rosa',
    nombre: 'Sucursal Mcal. López',
    tipos: ['Ventas'],
    direccion: 'Mcal. López entre Bélgica y Nicanor Torales, Asunción',
    telefonos: ['021 582 812'],
    horario: 'Lunes a viernes de 08:00 a 19:00 y sábados de 08:30 a 13:30 hs.',
    mapa: 'https://maps.app.goo.gl/6yEYmGVP3rMi3n968',
  },
  {
    ciudad: 'Asunción',
    marca: 'Dealer autorizado',
    nombre: 'Golden Arrow S.A.',
    tipos: ['Ventas'],
    direccion: 'Calle Caaguazú 1790 entre Médicos del Chaco y Aparipy, Asunción',
    telefonos: ['0984 900 802'],
    horario: 'Lunes a viernes de 08:00 a 18:00 hs. y sábados de 09:00 a 11:00 hs.',
    mapa: 'https://maps.app.goo.gl/a1gPWgh4EougR3kZ9',
  },
  {
    ciudad: 'Asunción',
    marca: 'Dealer autorizado',
    nombre: 'Paraguay Motor S.A. (PAMOSA)',
    tipos: ['Ventas'],
    direccion: 'Avda. Eusebio Ayala Nº 3940 c/ RI.6 Boquerón, Asunción',
    telefonos: ['(021) 604 503', '(021) 662 052', '(021) 602 530', '(021) 604 947', '(0981) 580 078'],
    horario: 'Lunes a viernes de 08:00 a 18:00 hs. y sábados de 09:00 a 12:00 hs.',
    // El origen no traía enlace de mapa para este local: se busca por dirección.
    mapa: null,
  },
  {
    ciudad: 'Ciudad del Este',
    marca: 'GWM',
    nombre: 'Ciudad del Este',
    tipos: ['Ventas'],
    direccion: 'Av. San Blas esquina Abdón Palacios, Ciudad del Este',
    telefonos: ['+595 991 702 176'],
    horario: 'De 8:30 a 18:30 hs.',
    mapa: 'https://maps.app.goo.gl/ctbDU77De3z6Pzr67',
  },
];

/** Ciudades en el orden en que aparecen, para armar el filtro. */
export const CIUDADES = [...new Set(DEALERS.map((d) => d.ciudad))];

/**
 * Enlace `tel:` en formato internacional a partir de cómo se escribe el número
 * en Paraguay: "021 582 812" → +59521582812, "0984 900 802" → +595984900802,
 * "+595 974 772 246" → +595974772246.
 */
export function telHref(numero) {
  const digitos = numero.replace(/\D/g, '');
  const internacional = digitos.startsWith('595') ? digitos : `595${digitos.replace(/^0/, '')}`;
  return `tel:+${internacional}`;
}

/** Enlace de mapa: el del origen si existe y si no, una búsqueda por dirección. */
export function mapaHref(dealer) {
  if (dealer.mapa) return dealer.mapa;
  const consulta = encodeURIComponent(`${dealer.direccion}, Paraguay`);
  return `https://www.google.com/maps/search/?api=1&query=${consulta}`;
}
