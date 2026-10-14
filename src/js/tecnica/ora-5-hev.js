import { referencia, seccionesLuxury } from './ora-5-base.js';
export default {
  columnas: [], referencia: referencia('Luxury Híbrida'),
  destacados: [['Sistema híbrido', '1.5 turbo + eléctrico'], ['Potencia combinada', '219 hp'], ['Torque combinado', '351 lb-ft · ≈ 476 Nm'], ['Transmisión', 'DHT']],
  secciones: [
    {
      titulo: 'Motorización híbrida · Luxury Híbrida',
      nota: 'La potencia combinada es la del sistema. Las equivalencias del torque en Nm son aproximadas; los valores originales se expresan en lb-ft.',
      filas: [['Motor a combustión', '1.5 L turbo'], ['Potencia del motor a combustión', '147 hp a 6.000 rpm'], ['Torque del motor a combustión', '177 lb-ft a 4.000 rpm (aprox. 240 Nm)'], ['Potencia del motor eléctrico', '140 kW'], ['Torque del motor eléctrico', '174 lb-ft (aprox. 236 Nm)'], ['Potencia combinada del sistema', '219 hp'], ['Torque combinado del sistema', '351 lb-ft (aprox. 476 Nm)'], ['Tracción', 'Delantera'], ['Transmisión', 'DHT'], ['Aceleración 0–100 km/h de referencia', '7,7 segundos']],
    },
    {
      titulo: 'Batería, combustible y rendimiento',
      nota: 'El rendimiento publicado por GWM México se calculó con la batería al máximo de carga; varía según el nivel de batería y la conducción. La aceleración se midió en condiciones controladas y a nivel del mar.',
      filas: [['Tipo de batería híbrida', 'Litio ternaria'], ['Capacidad de la batería', '1,09 kWh'], ['Recarga', 'Sin enchufe; recuperación de energía al conducir'], ['Consumo combinado de referencia', '22,7 km/l'], ['Emisiones combinadas declaradas en México', '102 g/km de CO₂']],
    },
    ...seccionesLuxury(false),
  ],
};
