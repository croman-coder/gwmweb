/**
 * Especificaciones técnicas de tank-400-phev-4x4.
 *
 * Fuente: ficha técnica oficial en PDF (public/fichas/tank-400-phev-4x4.pdf), transcripta y revisada contra el documento.
 * Formato: columnas = versiones comparadas en la hoja (vacío si es una sola); cada fila es [etiqueta, valor];
 * valor = texto | true (incluido) | false (no incluido) | [valor por columna] cuando difiere entre versiones.
 * Las filas sin dato o no incluidas en ninguna versión no se listan.
 *
 * Respecto de la hoja:
 *  - "Asientos delanteros calefaccionados/ventilados" trae un "8" suelto, sin unidad ni significado claro: se marcó como incluido.
 */
export default {
  columnas: [],
  secciones: [
    {
      titulo: 'Motor y transmisión',
      filas: [
        ['Tipo de motor', 'Híbrido enchufable'],
        ['Tipo de combustible', 'Gasolina'],
        ['Cilindrada', '2.0T'],
        ['Potencia máxima (HP)', '241'],
        ['Torque máximo (Nm)', '380'],
      ],
    },
    {
      titulo: 'Motor eléctrico',
      filas: [
        ['Potencia motor eléctrico (HP)', '161'],
        ['Torque motor eléctrico (Nm)', '400'],
        ['Capacidad de la batería (kWh)', '37,1'],
      ],
    },
    {
      titulo: 'Sistema híbrido',
      filas: [
        ['Potencia combinada (HP)', '402'],
        ['Torque combinado (Nm)', '750'],
        ['Transmisión', '9HAT'],
        ['Tracción', '4x4'],
        ['Autonomía eléctrica máxima (km)', '105'],
      ],
    },
    {
      titulo: 'Suspensión y dirección',
      filas: [
        ['Suspensión delantera', 'Suspensión independiente de doble horquilla'],
        ['Suspensión trasera', 'Suspensión no independiente de múltiples enlaces'],
        ['Tipo de dirección', 'Electro-asistida'],
        ['Dirección multimodo', true],
        ['Freno de disco trasero', true],
        ['Freno de estacionamiento electrónico EPB', true],
        ['Auto Hold', true],
        ['Especificaciones de los neumáticos delanteros/traseros', '265/65 R18'],
        ['Neumáticos de carretera (HT)', true],
      ],
    },
    {
      titulo: 'Dimensiones',
      filas: [
        ['Largo × ancho × alto', '4.985 × 1.960 × 1.900 mm'],
        ['Distancia entre ejes', '2.850 mm'],
        ['Altura mínima al suelo', '224 mm'],
        ['Ángulo de aproximación / salida', '33° / 30°'],
        ['Número de puertas', '5 puertas'],
        ['Número de asientos', '5 asientos'],
      ],
    },
    {
      titulo: 'Capacidades',
      filas: [
        ['Tanque de combustible', '70 L'],
      ],
    },
    {
      titulo: 'Exterior',
      filas: [
        ['Faros frontales LED', true],
        ['Función "follow me home"', true],
        ['Luces antiniebla delanteros/traseros', true],
        ['Luces diurnas LED', true],
        ['Espejos exteriores eléctricos', true],
        ['Espejos exteriores plegables eléctricamente', true],
        ['Espejos exteriores calefaccionados', true],
        ['Función de memoria de los retrovisores exteriores', true],
        ['Faros automáticos', true],
        ['Barra de techos', true],
        ['Escalones laterales eléctricos', true],
        ['Baulera eléctrica por succión', true],
        ['Parabrisas delantero insonorizado', true],
        ['Vidrios delanteros/traseros/parabrisas insonorizados', true],
        ['Cristal de privacidad', true],
        ['Limpiaparabrisas con sensor de lluvia', true],
      ],
    },
    {
      titulo: 'Interior',
      filas: [
        ['Techo panorámico', true],
        ['Volante con ajuste manual de cuatro posiciones', true],
        ['Volante calefaccionado', true],
        ['Cortina solar en la segunda fila', true],
        ['Toma corrientes de 220 V', true],
        ['Material del asiento', 'Cuero Napa'],
        ['Asiento del conductor con ajuste eléctrico de 6 posiciones', true],
        ['Memoria del asiento del conductor (con función de bienvenida)', true],
        ['Asiento del pasajero con ajuste eléctrico de 4 posiciones', true],
        ['Masaje en asiento de conductor', true],
        ['Asientos delanteros calefaccionados/ventilados', true],
        ['Apoyabrazos central trasero', true],
        ['Reducción activa de ruido ANC', true],
        ['Aire acondicionado automático', true],
        ['Filtro N95', true],
        ['Indicador de temperatura exterior', true],
      ],
    },
    {
      titulo: 'Tecnología',
      filas: [
        ['Acceso sin llave y arranque con botón', true],
        ['HUD', true],
        ['Panel de instrumentos digital', '12,3"'],
        ['Pantalla multimedia', '16,2"'],
        ['Cámara 540°', true],
        ['Iluminación ambiental interior', true],
        ['Carga inalámbrica para teléfonos móviles', true],
        ['Android Auto / CarPlay', true],
        ['Parlantes', '10'],
      ],
    },
    {
      titulo: 'Seguridad',
      filas: [
        ['Airbags frontales/laterales/cortina', true],
        ['Pretensores de los cinturones delanteros', true],
        ['Recordatorio de cinturón de seguridad delantero desabrochado', true],
        ['Sensores de estacionamiento delantero y trasero', '4 / 4'],
        ['EBD, TCS, TPMS', true],
        ['LDW (alerta salida carril)', true],
        ['FCW (alerta colisión frontal)', true],
        ['LKA, LCK (asist. mantenimiento y centrado carril)', true],
        ['AEB (frenado autónomo emergencia)', true],
        ['ACC (control crucero adaptativo)', true],
        ['ICA (asist. conducción integrada)', true],
        ['Alarma de exceso de velocidad', true],
        ['Monitor de punto ciego / RCW / DOW / ELK', true],
      ],
    },
    {
      titulo: 'Off-road',
      filas: [
        ['Tracción 4x4 inteligente', true],
        ['Bloqueo del diferencial trasero electrónico', true],
        ['Sistema de control todoterreno', true],
        ['CCO creep mode', true],
        ['TAB tank turning', true],
        ['Pantalla de información off-road exterior', true],
      ],
    },
  ],
};
