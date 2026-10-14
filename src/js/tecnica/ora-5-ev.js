import { referencia, seccionesLuxury } from './ora-5-base.js';
export default {
  columnas: [], referencia: referencia('Luxury EV'),
  destacados: [['Motor eléctrico', '150 kW · 201 hp'], ['Batería LFP', '58,33 kWh'], ['Carga rápida 10–80%', '30 min de referencia'], ['Autonomía NEDC', 'Hasta 520 km']],
  secciones: [
    {
      titulo: 'Motorización eléctrica · Luxury EV',
      nota: 'La ficha mexicana expresa el torque en lb-ft. La equivalencia en Nm es aproximada. La aceleración se obtuvo en condiciones controladas y a nivel del mar.',
      filas: [['Tipo de motor', 'Eléctrico síncrono de imanes permanentes'], ['Potencia del motor eléctrico', '150 kW'], ['Potencia máxima declarada', '201 hp a 6.320 rpm'], ['Torque declarado', '191 lb-ft (aprox. 259 Nm)'], ['Tracción', 'Delantera'], ['Transmisión', 'Reductora de 1 velocidad'], ['Aceleración 0–100 km/h de referencia', '7,7 segundos']],
    },
    {
      titulo: 'Batería, carga y energía',
      nota: 'Los 520 km corresponden al ciclo NEDC. La autonomía real y el tiempo de carga varían con el uso, la temperatura, la carga inicial y la potencia del equipo.',
      filas: [['Tipo de batería', 'Fosfato de hierro y litio (LFP)'], ['Capacidad', '58,33 kWh'], ['Autonomía homologada de referencia', 'Hasta 520 km (ciclo NEDC)'], ['Carga rápida del 10 al 80%', '30 minutos de referencia'], ['Alimentación de dispositivos V2L', true]],
    },
    ...seccionesLuxury(true),
  ],
};
