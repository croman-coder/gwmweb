/**
 * Especificaciones técnicas de tank-300-phev-4x4.
 *
 * Fuente: ficha técnica oficial en PDF (public/fichas/tank-300-phev-4x4.pdf), transcripta y revisada contra el documento.
 * Formato: columnas = versiones comparadas en la hoja (vacío si es una sola); cada fila es [etiqueta, valor];
 * valor = texto | true (incluido) | false (no incluido) | [valor por columna] cuando difiere entre versiones.
 * Las filas sin dato o no incluidas en ninguna versión no se listan.
 *
 * Respecto de la hoja:
 *  - Dos filas del final de "Interior" ("Calefacción de volante" y "Calefacción y ventilación de asientos delanteros") no tienen punto ni valor en la hoja: se omitieron. Confirmar si corresponden a esta versión.
 *  - La hoja trae dos fotos (Gray y Black) con los colores disponibles.
 */
export default {
  columnas: [],
  secciones: [
    {
      titulo: 'Motor',
      filas: [
        ['Tipo motor', 'Híbrido enchufable'],
        ['Motor combustión', '2.0T GDI'],
        ['Tracción', 'AWD Inteligente + 4L'],
        ['Transmisión', '9HAT'],
        ['Potencia máxima combinada (HP)', '402'],
        ['Torque combinado', '750 Nm'],
        ['Potencia del motor eléctrico (HP)', '161'],
        ['Torque eléctrico', '400 Nm'],
        ['Potencia del motor (HP)', '248'],
        ['Torque combustión', '385 Nm'],
      ],
    },
    {
      titulo: 'Batería',
      filas: [
        ['Tipo', 'Litio-ion'],
        ['Capacidad (kWh)', '37,1 kWh'],
      ],
    },
    {
      titulo: 'Suspensión y dirección',
      filas: [
        ['Suspensión delantera', 'Doble horquilla'],
        ['Suspensión trasera', 'Eje rígido'],
        ['Dirección electro-asistida (EPS)', true],
      ],
    },
    {
      titulo: 'Dimensiones',
      filas: [
        ['Largo', '4.760 mm'],
        ['Ancho', '1.930 mm'],
        ['Alto', '1.903 mm'],
        ['Despeje del suelo', '224 mm'],
        ['Distancia entre ejes', '2.750 mm'],
      ],
    },
    {
      titulo: 'Capacidades',
      filas: [
        ['Tanque de combustible', '75 L'],
        ['Capacidad de baulera', '400 L'],
        ['Capacidad de arrastre', '750 kg'],
      ],
    },
    {
      titulo: 'Exterior',
      filas: [
        ['Antena de tiburón', true],
        ['Espejos laterales abatibles eléctricamente', true],
        ['Espejos laterales con luz direccional LED', true],
        ['Espejos laterales con sistema desempañante', true],
        ['Espejos laterales con memoria', true],
        ['Estribos laterales fijos', true],
        ['Faros de niebla delantero y trasero', true],
        ['Faros LED con función de encendido y apagado automático', true],
        ['Limpia parabrisas con encendido automático', true],
        ['Luces de acompañamiento', true],
        ['Luces de asistencia en giro', true],
        ['Luces de conducción diurna LED (DRL)', true],
        ['Vidrio trasero con limpiador y autodesempañante', true],
        ['Puerta trasera manual con ayuda hidráulica', true],
        ['Rieles en el techo', true],
        ['Techo solar', true],
        ['Preparación para tirón de remolque', true],
        ['Arnés de 12 pines para remolque', true],
      ],
    },
    {
      titulo: 'Interior',
      filas: [
        ['Aire acondicionado con control automático doble zona', true],
        ['Cargador inalámbrico de smartphone', true],
        ['Espejo retrovisor interior con ajuste manual', true],
        ['Espejos de vanidad iluminados con cubierta para conductor y copiloto', true],
        ['Llave inteligente con botón de encendido', true],
        ['Luces ambientales de 64 colores', true],
      ],
    },
    {
      titulo: 'Multimedia',
      filas: [
        ['Apple CarPlay™ y Android Auto™ inalámbrico o por cable', true],
        ['Bluetooth®', true],
        ['Controles de audio montados al volante', true],
        ['Pantalla táctil a color de 12,3"', true],
        ['Puertos USB A y USB C carga (delanteros)', true],
        ['Puertos USB A carga (2 traseros)', true],
        ['Sistema de audio HD/AM/FM con 8 bocinas + subwoofer', true],
        ['Sistema de audio premium marca Infinity', true],
      ],
    },
    {
      titulo: 'Seguridad',
      filas: [
        ['Asientos traseros con anclaje para silla de bebé (ISOFIX)', true],
        ['Asistencia de ascenso y descenso en pendientes (HAC/HDC)', true],
        ['Airbags', '8'],
        ['Control dinámico de estabilidad (ESC), sistema anti-volcaduras (RMI)', true],
        ['Frenos de disco delanteros y traseros', true],
        ['Llanta de refacción tamaño completo con cubierta', true],
        ['Sistema de control de tracción (TCS)', true],
        ['Sistema de frenado antibloqueo (ABS), asistencia de frenado (BAS)', true],
        ['Sistema de monitoreo de presión de llantas (TPMS)', true],
      ],
    },
    {
      titulo: 'Asistencia de conducción',
      filas: [
        ['Advertencia de apertura de puertas (DOW)', true],
        ['Alerta de cambio de carril (LDW)', true],
        ['Alerta de frenado de emergencia', true],
        ['Alerta de límite de velocidad (SWS)', true],
        ['Alerta y asistencia de punto ciego (BSW/BCA)', true],
        ['Asistente de estacionamiento autónomo (PAS)', true],
        ['Asistente de mantenimiento de carril (LKA)', true],
        ['Asistente de rebase de camiones (Smart dodge)', true],
        ['Asistente de seguimiento de carril (LFA/ LCA)', true],
        ['Asistente de tráfico cruzado (RCTA)', true],
        ['Control crucero adaptativo (ACC)', true],
        ['Frenado automático de emergencia (AEB) incluye peatones y ciclistas', true],
        ['Reconocimiento de señales de tránsito (TSR)', true],
        ['Sistema de control de luces de carretera (HBC)', true],
        ['Sistema de monitoreo de cansancio del conductor (DAA)', true],
      ],
    },
  ],
};
