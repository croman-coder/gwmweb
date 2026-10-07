/**
 * Especificaciones técnicas de wingle-7.
 *
 * Fuente: ficha técnica oficial en PDF (public/fichas/wingle-7.pdf), transcripta y revisada contra el documento.
 * Formato: columnas = versiones comparadas en la hoja (vacío si es una sola); cada fila es [etiqueta, valor];
 * valor = texto | true (incluido) | false (no incluido) | [valor por columna] cuando difiere entre versiones.
 * Las filas sin dato o no incluidas en ninguna versión no se listan.
 *
 * Respecto de la hoja:
 *  - Las filas de iluminación y espejos que la hoja ubica al final de "Equipamiento multimedia" se pasaron a "Exterior".
 *  - Se corrigieron erratas de la hoja ("Intección", "DIstancia", "Termica", "ABS + EDB" por EBD, un paréntesis sin cerrar).
 */
export default {
  columnas: ['Luxury 4x2', 'Luxury 4x4'],
  secciones: [
    {
      titulo: 'Motor 4D20D turbo',
      filas: [
        ['Combustible', 'Diesel'],
        ['Transmisión', '6MT'],
        ['Cilindrada (L)', '2.0 L'],
        ['Cilindros', '4'],
        ['Potencia (HP / rpm)', '140/4000'],
        ['Torque (Nm @ rpm)', '315 @ 1400-2800'],
        ['Inyección electrónica', true],
      ],
    },
    {
      titulo: 'Chasis, dirección y tracción',
      filas: [
        ['Dirección asistida hidráulicamente', true],
        ['Columna de dirección ajustable', true],
        ['TSC: Control de tracción', true],
        ['ESP (control de estabilidad y tracción)', true],
      ],
    },
    {
      titulo: 'Dimensiones y pesos',
      filas: [
        ['Largo / ancho / alto (mm)', '5.350 × 2.150 × 1.750'],
        ['Largo / ancho / alto (mm) caja', '1.680 × 1.460 × 480'],
        ['Distancia entre ejes (mm)', '3.350'],
        ['Peso bruto vehicular (Kg)', ['1.880', '1.992']],
        ['Capacidad de carga de caja (Kg)', '1.000'],
        ['Distancia mínima al suelo (mm)', '213'],
      ],
    },
    {
      titulo: 'Exterior',
      filas: [
        ['Rueda con llanta auxiliar de acero 16”', true],
        ['Llantas de aleación de 16”', true],
        ['Neumáticos 235 / 70R16', true],
        ['Parrilla frontal cromada', true],
        ['Protector de caja', true],
        ['Luneta térmica', true],
        ['Barra antivuelco negra', true],
        ['Espejo retrovisor del color de la carrocería ajustable eléctricamente con luz de giro', true],
        ['Faros antiniebla delanteros y traseros', true],
        ['Luces de circulación diurna (DLR)', true],
        ['Faros delanteros eléctricos ajustables en altura', true],
      ],
    },
    {
      titulo: 'Interior',
      filas: [
        ['Paneles interiores Eco cuero', true],
        ['Aire acondicionado automático', true],
        ['Volante con control de audio + Bluetooth + control crucero', true],
        ['Tablero de instrumentos con brillo ajustable', true],
        ['Toma de corriente de 12 V', true],
        ['Control crucero', true],
        ['Barra de protección lateral', true],
        ['Encendedor', true],
        ['Estuche de gafas (asiento del conductor)', true],
        ['Tapizado en Eco cuero', true],
        ['Asiento del conductor con ajuste eléctrico de 6 posiciones', true],
        ['Asiento de pasajero ajustable manualmente de 4 posiciones', true],
        ['Alzacristales eléctricos', true],
      ],
    },
    {
      titulo: 'Seguridad activa y pasiva',
      filas: [
        ['ABS + EBD', true],
        ['BA (asistente de frenado)', true],
        ['Frenos de disco ventilado (4 ruedas)', true],
        ['TPMS (sistema de monitoreo de presión de neumáticos)', true],
        ['Radares de reversa', true],
        ['Cámara de reversa', true],
        ['Airbags laterales delanteros', true],
        ['Airbag de cortina lateral', true],
        ['Airbags frontales', true],
        ['Cinturones de seguridad de 3 puntas en todas las plazas (5)', true],
        ['Recordatorio de cinturón asientos delanteros', true],
        ['Reposacabezas central trasero', true],
        ['Cerradura de seguridad para niños de puerta trasera', true],
        ['Bloqueo central de la puerta con detección de velocidad (bloqueo automáticamente a 15 km/h)', true],
        ['Función de desbloqueo automático ante colisión', true],
        ['Anclajes ISOFIX', true],
        ['Toma USB (EDR)', true],
        ['Inmovilizador de motor', true],
      ],
    },
    {
      titulo: 'Multimedia',
      filas: [
        ['MP5', true],
        ['6 parlantes', true],
      ],
    },
  ],
};
