/** Ficha oficial de GWM México (referencia para HEV y Gasolina). El EV usa la ficha oficial local: public/fichas/ora-5-ev.pdf. */
export const ORA5_PDF = '/fichas/ora-5-mexico.pdf';
export const ORA5_FUENTE = 'https://www.gwm-mx.com/content/dam/gwm/pages/mx/es/pdf/gwm-ora5-ficha-tecnica.pdf';
export const ORA5_PAGINA = 'https://www.gwm-mx.com/es/models/ora-5';
export const ORA5_AVISO = 'Especificaciones de referencia internacional. Confirmá con un asesor las versiones, el equipamiento y la disponibilidad para Paraguay.';
export const ORA5_NOTA = 'ORA 5 EV: datos de la ficha técnica oficial. Premium Gasolina: especificaciones de referencia internacional; consultá su disponibilidad con un asesor. Las imágenes son ilustrativas. Autonomía y consumo son valores de ensayo; varían según conducción, clima y batería.';
const TODAS_ORA5 = [
  {
    imagen: '/img/fichas/ora-5-ev/motor-electrico-mexico.webp',
    imagenAlt: 'Conjunto de propulsión eléctrico del ORA 5 EV, ilustración técnica',
    slug: 'ora-5-ev', nombre: 'ORA 5 EV', version: 'Luxury EV', etiqueta: '100% eléctrico',
    descripcion: 'Motor eléctrico y batería recargable. Admite alimentación de dispositivos con V2L.',
    datos: [['Potencia', '201 HP'], ['Torque', '260 Nm'], ['Batería', '58,33 kWh'], ['Autonomía WLTC', 'Hasta 430 km']],
  },
  {
    imagen: '/img/fichas/ora-5-ev/motor-hibrido-mexico.webp',
    imagenAlt: 'Motor a combustión del sistema híbrido ORA 5 HEV, ilustración técnica',
    slug: 'ora-5-hev', nombre: 'ORA 5 HEV', version: 'Luxury Híbrida', etiqueta: 'Híbrido sin enchufe',
    descripcion: 'El motor a gasolina trabaja junto al eléctrico. La batería recupera energía durante la conducción.',
    datos: [['Potencia combinada', '219 hp'], ['Torque combinado', '351 lb-ft · ≈ 476 Nm'], ['Motor a combustión', '1.5 L turbo'], ['Transmisión', 'Automática'], ['Consumo de referencia', '22,7 km/l']],
  },
  {
    imagen: '/img/fichas/ora-5-ev/motor-gasolina-mexico.webp',
    imagenAlt: 'Motor a gasolina 1.5 turbo del ORA 5, ilustración técnica',
    nombre: 'ORA 5 Gasolina', pdf: ORA5_PDF, version: 'Premium Gasolina', etiqueta: 'Gasolina',
    descripcion: 'Motor 1.5 turbo con caja de doble embrague. Consultá disponibilidad con un asesor.',
    datos: [['Potencia', '140 hp'], ['Torque', '154 lb-ft · ≈ 209 Nm'], ['Motor', '1.5 L turbo'], ['Transmisión', 'Automática'], ['Consumo de referencia', '14,5 km/l']],
  },
];

// En Paraguay se vende solo el EV (pedido de Marketing, 2026-11-20): la versión Gasolina no se muestra.
// El HEV llega en diciembre: mientras esté oculto en modelos.js tampoco se muestra.
// Con una sola motorización no hay comparación y la sección no se renderiza (ver fichas.js).
// Al publicar el HEV, devolver a ORA5_NOTA "Luxury Híbrida" y la aclaración de su potencia combinada.
export const MOTORIZACIONES_ORA5 = TODAS_ORA5.filter((m) => m.slug !== 'ora-5-hev' && m.etiqueta !== 'Gasolina');
