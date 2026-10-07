/**
 * Especificaciones técnicas de tank-500-hev-4x4.
 *
 * Fuente: ficha técnica oficial en PDF (public/fichas/tank-500-hev-4x4.pdf), transcripta y revisada contra el documento.
 * Formato: columnas = versiones comparadas en la hoja (vacío si es una sola); cada fila es [etiqueta, valor];
 * valor = texto | true (incluido) | false (no incluido) | [valor por columna] cuando difiere entre versiones.
 * Las filas sin dato o no incluidas en ninguna versión no se listan.
 *
 * Respecto de la hoja:
 *  - "Profundidad de Faro" se rotuló "Profundidad de vadeo" (700 mm): la hoja dice "Faro", evidente error por "vado".
 *  - Los textos "(frontales)" y "(frontales y traseros)" de los asientos se muestran como valor.
 *  - Grupos reordenados: la hoja los reparte en dos columnas sin orden temático.
 */
export default {
  columnas: [],
  secciones: [
    {
      titulo: 'Motor y transmisión',
      filas: [
        ['Motor combustión', 'Turbo, 2.000 cc, 241 HP, 280 Nm, Euro V'],
        ['Motor eléctrico', '104 kW, 197 Nm, batería ion litio (1,76 kWh)'],
        ['Potencia combinada', '346 HP'],
        ['Torque combinado', '648 Nm'],
        ['Transmisión', '9HAT'],
        ['Tracción', '4x4 con reductora'],
      ],
    },
    {
      titulo: 'Suspensión y dirección',
      filas: [
        ['Suspensión delantera', 'Doble horquilla'],
        ['Suspensión trasera', 'Eje rígido multilink'],
        ['Dirección', 'Electro-asistida (EPS)'],
      ],
    },
    {
      titulo: 'Dimensiones',
      filas: [
        ['Largo / ancho / alto', '5.078 / 1.934 / 1.905 mm'],
        ['Despeje del suelo', '224 mm'],
        ['Distancia entre ejes', '2.850 mm'],
        ['Tanque de combustible', '80 L'],
        ['Capacidad baúl', '795 L (expandible a 1.489 L)'],
        ['Capacidad de arrastre (con / sin freno)', '2.500 kg / 750 kg'],
        ['Ángulo de ataque / salida', '30° / 24°'],
        ['Profundidad de vadeo', '700 mm'],
      ],
    },
    {
      titulo: 'Exterior',
      filas: [
        ['Faros frontales LED', true],
        ['Faros ajustables', true],
        ['Luces diurnas LED', true],
        ['Faros traseros LED', true],
        ['Luces automáticas', true],
        ['Sensor de lluvia', true],
        ['Estriberas eléctricas', true],
        ['Retrovisores eléctricos', true],
        ['Neumáticos', '265/55 R19'],
        ['Antena tipo tiburón', true],
        ['Baulera eléctrica', true],
        ['Apertura manos libres', true],
        ['Cubre cárter / auxilio', true],
        ['Toma eléctrica para tráiler', true],
      ],
    },
    {
      titulo: 'Interior',
      filas: [
        ['Techo panorámico', true],
        ['Volante de cuero', true],
        ['Head-Up Display', true],
        ['Panel instrumentos', '12,3" digital'],
        ['Climatización bizona', true],
        ['Climatizador trasero independiente', true],
        ['Asientos de cuero Napa', true],
        ['Asientos eléctricos', true],
        ['Asientos calefactables', 'Frontales'],
        ['Asientos ventilados', 'Frontales y traseros'],
        ['Asientos con masajes', 'Frontales'],
      ],
    },
    {
      titulo: 'Multimedia',
      filas: [
        ['Pantalla', '14,6"'],
        ['Android Auto & CarPlay', 'Inalámbrico'],
        ['Bluetooth', true],
        ['Cargador inalámbrico', true],
        ['Parlantes Infinity', '12'],
        ['Amplificador independiente', true],
        ['Toma 220 V', true],
        ['Wi-fi', true],
        ['Llamada de emergencia', true],
      ],
    },
    {
      titulo: 'Seguridad',
      filas: [
        ['Airbags frontales', true],
        ['Airbags laterales', true],
        ['Airbags cortina (B y C)', true],
        ['ABS + EBD + ESC', true],
        ['Control de tracción', true],
        ['Freno de mano electrónico', true],
        ['Autohold', true],
        ['Sensores de estacionamiento', true],
        ['Cámara 360°', true],
        ['ISOFIX & Top Tether', true],
        ['Llave inteligente', true],
        ['Inmovilizador', true],
      ],
    },
    {
      titulo: 'Asistencia de conducción',
      filas: [
        ['Alerta cambio de carril', true],
        ['Asistente mantenimiento carril', true],
        ['Radar frontal', true],
        ['Frenado automático (AEB)', true],
        ['Alerta punto ciego', true],
        ['Asistente tráfico cruzado', true],
        ['Control luces de carretera', true],
        ['Monitoreo de cansancio', true],
      ],
    },
    {
      titulo: 'Asistencia off-road',
      filas: [
        ['Modo experto off-road', true],
        ['Bloqueo electrónico del diferencial', true],
        ['Tank Turn', true],
        ['Control crucero off-road', true],
      ],
    },
  ],
};
