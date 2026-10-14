import { referencia, dimensiones, chasis, equipamiento } from './ora-5-base.js';
export default {
  columnas: [], referencia,
  destacados: [['Sistema híbrido', '1.5 turbo + eléctrico'], ['Potencia combinada', '164 kW · 223 CV'], ['Torque combinado', '476 Nm'], ['Transmisión', 'Automática DHT']],
  secciones: [
    { titulo: 'Motorización híbrida', filas: [['Motor a combustión', '1.499 cm³, 4 cilindros, 16 válvulas, turbo'], ['Potencia del motor a combustión', '110 kW (150 CV) a 5.500–6.000 rpm'], ['Torque del motor a combustión', '240 Nm a 1.800–4.000 rpm'], ['Motor eléctrico', 'Síncrono de imanes permanentes'], ['Potencia del motor eléctrico', '140 kW (190 CV)'], ['Torque del motor eléctrico', '236 Nm'], ['Potencia combinada del sistema', '164 kW (223 CV)'], ['Torque combinado del sistema', '476 Nm'], ['Transmisión', 'Automática DHT']] },
    { titulo: 'Batería y combustible', filas: [['Batería híbrida', 'Ion-litio, 1,09 kWh'], ['Recarga', 'Sin enchufe; recuperación de energía al conducir'], ['Tanque de combustible', '55 litros'], ['Frenado regenerativo ajustable', true]] },
    dimensiones, chasis, equipamiento,
  ],
};
