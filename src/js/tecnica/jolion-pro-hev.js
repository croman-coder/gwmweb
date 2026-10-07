/**
 * Especificaciones técnicas de jolion-pro-hev.
 *
 * Fuente: ficha técnica oficial en PDF (public/fichas/jolion-pro-hev.pdf), transcripta y revisada contra el documento.
 * Formato: columnas = versiones comparadas en la hoja (vacío si es una sola); cada fila es [etiqueta, valor];
 * valor = texto | true (incluido) | false (no incluido) | [valor por columna] cuando difiere entre versiones.
 * Las filas sin dato o no incluidas en ninguna versión no se listan.
 *
 * Respecto de la hoja:
 *  - La hoja nombra las versiones Elite y Deluxe; en la página se llaman HIGH y TOP (mismo orden de precio y equipamiento).
 *  - La hoja trae "Motor combustión", "Motor eléctrico" y el conjunto en un solo bloque: se separaron en tres grupos.
 *  - "Puertos USB delanteros" figura dos veces, idéntico, en la hoja: se dejó una.
 */
export default {
  columnas: ['HIGH (Elite)', 'TOP (Deluxe)'],
  secciones: [
    {
      titulo: 'Motor de combustión',
      filas: [
        ['Aspiración', 'Aspirado'],
        ['Cilindrada (cc)', '1.500'],
        ['Potencia máxima (HP)', '94'],
        ['Torque máximo (Nm)', '125'],
        ['Norma de emisión', 'Euro V+'],
      ],
    },
    {
      titulo: 'Motor eléctrico',
      filas: [
        ['Potencia máxima (kW)', '115'],
        ['Torque máximo (Nm)', '250'],
        ['Tipo de batería', 'Ion litio'],
        ['Capacidad de la batería (kWh)', '1,67'],
      ],
    },
    {
      titulo: 'Sistema híbrido y transmisión',
      filas: [
        ['Potencia combinada (HP)', '188'],
        ['Torque combinado (Nm)', '377'],
        ['Transmisión', 'DHT, automática dedicada al híbrido, 2 velocidades'],
        ['Tracción', '4x2'],
      ],
    },
    {
      titulo: 'Suspensión y dirección',
      filas: [
        ['Suspensión delantera', 'McPherson'],
        ['Suspensión trasera', 'Barra de torsión'],
        ['Tipo de dirección', 'Electro-asistida (EPS)'],
      ],
    },
    {
      titulo: 'Dimensiones',
      filas: [
        ['Largo (mm)', '4.472'],
        ['Ancho (mm)', '1.841'],
        ['Alto (mm)', '1.626'],
        ['Distancia entre ejes (mm)', '2.700'],
      ],
    },
    {
      titulo: 'Capacidades',
      filas: [
        ['Tanque de combustible (L)', '55'],
        ['Baulera (L)', '390'],
      ],
    },
    {
      titulo: 'Exterior',
      filas: [
        ['Faros frontales', 'LED'],
        ['Faros frontales ajustables en altura', true],
        ['Luces de conducción diurna', 'LED'],
        ['Luz alta inteligente', [false, true]],
        ['Faros traseros', 'LED'],
        ['Luces automáticas', true],
        ['Neumáticos de aleación', ['215/60 R17', '225/55 R18']],
        ['Antena tipo tiburón', true],
        ['Sensor de lluvia', true],
      ],
    },
    {
      titulo: 'Interior',
      filas: [
        ['Volante forrado en cuero', true],
        ['Arranque a botón', true],
        ['Levas en el volante', true],
        ['Volante ajustable en profundidad y altura', true],
        ['Panel instrumental digital', 'LCD 7"'],
        ['Cargador inalámbrico', [false, true]],
        ['Apoyabrazos', true],
        ['Asientos forrados en cuero', true],
        ['Ajuste de asientos', ['Manual', 'Eléctrico']],
        ['Asientos rebatibles 60/40', true],
        ['Asientos calefactables', [false, true]],
        ['Luz interna', 'LED'],
        ['Techo solar panorámico', true],
      ],
    },
    {
      titulo: 'Multimedia',
      filas: [
        ['Android Auto / CarPlay', true],
        ['Pantalla', ['10,25"', '12,3"']],
        ['Bluetooth', true],
        ['Mandos en el volante', true],
        ['Puertos USB delanteros', true],
        ['Parlantes', '6'],
      ],
    },
    {
      titulo: 'Seguridad',
      filas: [
        ['Airbags frontales', true],
        ['Airbags laterales', true],
        ['Airbags de cortina', true],
        ['ABS + EBD + ESC', true],
        ['Control de tracción', true],
        ['Sistema de arranque y descenso en pendiente', true],
        ['Sistema de frenado de emergencia', true],
        ['Sensores de estacionamiento', [true, false]],
        ['Cámara de reversa', [true, false]],
        ['Cámara 360°', [false, true]],
        ['ISOFIX', true],
        ['Llave inteligente', true],
        ['Inmovilizador', true],
      ],
    },
    {
      titulo: 'Asistencia de conducción',
      filas: [
        ['Advertencia de apertura de puertas (DOW)', [false, true]],
        ['Radar frontal', [false, true]],
        ['Asistente en tráfico pesado (TJA)', [false, true]],
        ['Control crucero', [true, false]],
        ['Control crucero adaptativo inteligente (ACC)', [false, true]],
        ['Alerta de colisión frontal (FCW)', [false, true]],
        ['Frenado automático de emergencia (AEB) incluye peatones y ciclistas', [false, true]],
        ['Alerta y monitor de punto ciego (BSW+BSM)', [false, true]],
        ['Alerta y asistencia de seguimiento de carril (LDW+LKA+LCA)', [false, true]],
        ['Alerta de colisión trasera (RCW)', [false, true]],
      ],
    },
  ],
};
