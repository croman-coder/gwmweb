import { referencia, dimensiones, chasis, equipamiento } from './ora-5-base.js';
export default {
  columnas: [], referencia,
  destacados: [['Motor eléctrico', '150 kW · 204 CV'], ['Torque', '260 Nm'], ['Batería', '58,3 kWh'], ['Autonomía NEDC', 'Hasta 520 km']],
  secciones: [
    { titulo: 'Motorización eléctrica', filas: [['Tipo de motor', 'Eléctrico síncrono de imanes permanentes'], ['Potencia máxima', '150 kW (204 CV)'], ['Torque máximo', '260 Nm'], ['Batería', 'Ion-litio, 58,3 kWh'], ['Autonomía homologada de referencia', 'Hasta 520 km (ciclo NEDC)']] },
    { titulo: 'Carga y energía', filas: [['Carga AC máxima', '6,6 kW'], ['Carga rápida DC máxima', '120 kW'], ['Alimentación de dispositivos V2L', 'Hasta 6 kW'], ['Frenado regenerativo ajustable', true]] },
    dimensiones, chasis, equipamiento,
  ],
};
