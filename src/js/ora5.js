/** Referencias oficiales internacionales. No son una homologación para Paraguay. */
export const ORA5_PDF = '/fichas/ora-5-internacional.pdf';
export const ORA5_FUENTE = 'https://www.gwm.co.th/content/dam/gwm/pages/th/en/model/ora-5/ORA%205-EN.pdf';
export const ORA5_AVISO = 'Referencia internacional · GWM Tailandia. Confirmá con un asesor las versiones, el equipamiento y la disponibilidad para Paraguay.';
export const MOTORIZACIONES_ORA5 = [
  {
    slug: 'ora-5-ev', nombre: 'ORA 5 EV', etiqueta: '100% eléctrico',
    descripcion: 'Se recarga por conexión eléctrica. Sin motor a combustión.',
    datos: [['Motor eléctrico', '150 kW (204 CV)'], ['Torque', '260 Nm'], ['Batería', '58,3 kWh'], ['Autonomía de referencia', 'Hasta 520 km NEDC']],
  },
  {
    slug: 'ora-5-hev', nombre: 'ORA 5 HEV', etiqueta: 'Híbrido sin enchufe',
    descripcion: 'Combina un motor 1.5 turbo con uno eléctrico. Recupera energía al conducir.',
    datos: [['Sistema', '1.5 turbo + eléctrico'], ['Potencia combinada', '164 kW (223 CV)'], ['Torque combinado', '476 Nm'], ['Batería híbrida', '1,09 kWh']],
  },
];
