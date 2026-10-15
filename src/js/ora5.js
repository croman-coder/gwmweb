/** Ficha oficial de GWM México. La configuración para Paraguay se confirma con un asesor. */
export const ORA5_PDF = '/fichas/ora-5-mexico.pdf';
export const ORA5_FUENTE = 'https://www.gwm-mx.com/content/dam/gwm/pages/mx/es/pdf/gwm-ora5-ficha-tecnica.pdf';
export const ORA5_PAGINA = 'https://www.gwm-mx.com/es/models/ora-5';
export const ORA5_AVISO = 'Referencia internacional · GWM México. Las versiones y el equipamiento corresponden a ese mercado. Confirmá con un asesor la configuración y la disponibilidad para Paraguay.';
export const ORA5_NOTA = 'Gama de referencia de México: Premium Gasolina, Luxury Híbrida y Luxury EV. La versión a gasolina se muestra como referencia internacional. Imágenes técnicas ilustrativas de GWM México. Autonomía NEDC, aceleración, consumo y tiempo de carga son valores de ensayo; varían según conducción, clima, batería y equipo de carga. La potencia combinada del HEV es la del sistema, no la suma de sus motores.';
export const MOTORIZACIONES_ORA5 = [
  {
    imagen: '/img/fichas/ora-5-ev/motor-electrico-mexico.webp',
    imagenAlt: 'Conjunto de propulsión eléctrico del ORA 5 EV, ilustración oficial de GWM México',
    slug: 'ora-5-ev', nombre: 'ORA 5 EV', version: 'Luxury EV · México', etiqueta: '100% eléctrico',
    descripcion: 'Motor eléctrico y batería recargable. Admite carga rápida y alimentación de dispositivos con V2L.',
    datos: [['Potencia', '150 kW · 201 hp'], ['Batería LFP', '58,33 kWh'], ['Autonomía NEDC', 'Hasta 520 km'], ['Carga rápida 10–80%', '30 min de referencia'], ['Transmisión', 'Reductora de 1 velocidad']],
  },
  {
    imagen: '/img/fichas/ora-5-ev/motor-hibrido-mexico.webp',
    imagenAlt: 'Motor a combustión del sistema híbrido ORA 5 HEV, ilustración oficial de GWM México',
    slug: 'ora-5-hev', nombre: 'ORA 5 HEV', version: 'Luxury Híbrida · México', etiqueta: 'Híbrido sin enchufe',
    descripcion: 'El motor a gasolina trabaja junto al eléctrico. La batería recupera energía durante la conducción.',
    datos: [['Potencia combinada', '219 hp'], ['Torque combinado', '351 lb-ft · ≈ 476 Nm'], ['Motor a combustión', '1.5 L turbo'], ['Transmisión', 'DHT'], ['Consumo de referencia', '22,7 km/l']],
  },
  {
    imagen: '/img/fichas/ora-5-ev/motor-gasolina-mexico.webp',
    imagenAlt: 'Motor a gasolina 1.5 turbo del ORA 5, ilustración oficial de GWM México',
    nombre: 'ORA 5 Gasolina', version: 'Premium Gasolina · México', etiqueta: 'Gasolina · referencia México',
    descripcion: 'Motorización a gasolina de la gama mexicana. Consultá su disponibilidad para Paraguay.',
    datos: [['Potencia', '140 hp'], ['Torque', '154 lb-ft · ≈ 209 Nm'], ['Motor', '1.5 L turbo'], ['Transmisión', '7DCT'], ['Consumo de referencia', '14,5 km/l']],
  },
];
