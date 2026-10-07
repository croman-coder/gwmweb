/**
 * Especificaciones técnicas de poer-diesel.
 *
 * Fuente: ficha técnica oficial en PDF (public/fichas/poer-diesel.pdf), transcripta y revisada contra el documento.
 * Formato: columnas = versiones comparadas en la hoja (vacío si es una sola); cada fila es [etiqueta, valor];
 * valor = texto | true (incluido) | false (no incluido) | [valor por columna] cuando difiere entre versiones.
 * Las filas sin dato o no incluidas en ninguna versión no se listan.
 *
 * Respecto de la hoja:
 *  - Hoja sin texto (solo imagen): leída con OCR local y corregida a mano contra la imagen.
 *  - Columnas: "2.0T 4x4 Deluxe" y "2.4T 4x4 Deluxe" en la hoja; en la página, POER 2.0T y POER PLUS 2.4T.
 *  - Se omitió "Medidas del vehículo": la hoja dice 4160*1947*1886 con una distancia entre ejes de 3230 mm, un largo imposible (error de la hoja).
 *  - "Palanca de cambios electrónica" no tiene marca en ninguna de las dos versiones: se omitió. "Smart Gagde" se dejó tal como figura (no se pudo confirmar el nombre).
 */
export default {
  columnas: ['2.0T', 'Plus 2.4T'],
  secciones: [
    {
      titulo: 'Motor',
      filas: [
        ['Motor combustión', 'Turbo Diesel'],
        ['Cilindrada (cc)', ['2.000', '2.400']],
        ['Potencia máxima (HP)', ['161', '181']],
        ['Torque máximo (Nm)', ['400', '480']],
        ['Transmisión', '9AT'],
        ['Tanque de combustible', '80 L'],
      ],
    },
    {
      titulo: 'Suspensión y dirección',
      filas: [
        ['Suspensión delantera', 'Independiente de doble horquilla con barra estabilizadora'],
        ['Suspensión trasera', 'Eje rígido con paquete de resortes'],
        ['Tipo de dirección', 'Asistida electrónicamente'],
        ['Dirección multimodo', true],
        ['Freno de disco trasero / delantero', 'Discos ventilados'],
        ['Auto Hold', true],
        ['Neumáticos delanteros / traseros', '265/60 R18'],
        ['Bloqueo de diferencial', true],
      ],
    },
    {
      titulo: 'Dimensiones',
      filas: [
        ['Distancia entre ejes', '3.230 mm'],
        ['Medidas de la caja de carga', '1.520 × 1.520 × 540 mm'],
        ['Cabina', 'Doble'],
      ],
    },
    {
      titulo: 'Seguridad',
      filas: [
        ['Airbags', '6'],
        ['Columna de dirección colapsable', true],
        ['Frenos', 'ABS + EBD'],
        ['Control de estabilidad (ESP)', true],
        ['Control de tracción (TCS)', true],
        ['Sistema anti-vuelco (RMI)', true],
        ['Asistencia de frenado en colisión secundaria (SCM)', true],
        ['Asistencia de frenado (BAS)', true],
        ['Asistencia de partida en pendiente (HHC)', true],
        ['Control de descenso (HDC)', true],
        ['Monitoreo de presión de neumáticos (TPMS)', true],
        ['Sensores de estacionamiento', 'Delanteros/ Traseros'],
        ['Cámaras 360° de alta definición', true],
        ['Cinturones de seguridad con pretensor y limitador de fuerza', true],
        ['Cinturones de 3 puntas en asientos traseros', '3'],
        ['Anclaje ISOFIX en asientos traseros (2)', true],
        ['Seguro para niños en puertas traseras', true],
        ['Cierre automático de seguro de puertas', true],
        ['Advertencia de fatiga de conductor', true],
        ['Aviso de puertas abiertas', true],
        ['Alarma de exceso de velocidad (ajustable)', true],
        ['Inmovilizador antirrobo', true],
        ['Corte automático de combustible ante colisión', true],
        ['Desbloqueo de puertas automático ante colisión', true],
        ['Señalizadores en frenado de emergencia', true],
      ],
    },
    {
      titulo: 'Asistencia de conducción',
      filas: [
        ['Control crucero adaptativo', true],
        ['Aviso de abandono de carril', true],
        ['Asistencia de mantenimiento en carril', true],
        ['Mantenimiento de carril de emergencia', true],
        ['Smart Gagde', true],
        ['Advertencia de colisión delantera (RFW) / trasera (RCW)', true],
        ['Frenado automático de emergencia', true],
        ['Monitoreo de puntos ciegos (BSM)', true],
        ['Advertencia de puertas abiertas (DOW)', true],
        ['Aviso de tráfico trasero en frenado automático', true],
        ['Reconocimiento de señales de tránsito con alerta de velocidad', true],
      ],
    },
    {
      titulo: 'Interior',
      filas: [
        ['Aire acondicionado con climatizador', true],
        ['Salida de aire acondicionado en asientos traseros', true],
        ['Indicador de temperatura exterior', true],
        ['Levanta vidrios con función one-touch, anti atrape y cerrado a distancia', true],
        ['Cierre centralizado', true],
        ['Botón keyless de encendido y apagado de motor', true],
        ['Panel digital de instrumentos', '7 pulgadas'],
        ['Regulación de luz del tablero', true],
        ['Ajuste eléctrico de luces', true],
        ['Comando por voz', true],
        ['Pantalla multimedia', '12,3 pulgadas'],
        ['Apple CarPlay/ Android Auto inalámbrico', true],
        ['Puerto USB', '2 tradicionales / 1 Tipo C'],
        ['Sistema de audio', '6 parlantes'],
        ['Cargador inalámbrico', true],
        ['Freno de mano eléctrico', true],
        ['Asistencia de frenado en detención', true],
        ['Modos de conducción', 'Estándar/ Económico/ Deportivo'],
        ['Calefactor/ ventilación de asientos delanteros', true],
        ['Apoyabrazos delantero con compartimiento refrigerado', true],
        ['Caja de anteojos lado conductor', true],
        ['Luces interiores', 'Techo / lectura segunda fila'],
        ['Espejo retrovisor antiencandilamiento', 'Automático'],
        ['Asas de acceso', true],
        ['Interruptores para puntos de conexión', true],
        ['Toma de corriente 12 V', true],
        ['Selector electrónico de 4L', true],
        ['Volante con control de radio y teléfono', true],
        ['Paletas de cambios al volante', true],
        ['Asientos de conductor / copiloto con regulación eléctrica', 'Conductor: 6 posiciones / copiloto: 4 posiciones'],
        ['Techo solar', [false, true]],
      ],
    },
    {
      titulo: 'Exterior',
      filas: [
        ['Faros frontales LED', true],
        ['Luces altas inteligentes', true],
        ['Sensor de encendido automático de luces delanteras', true],
        ['Neblineros delanteros con encendido al girar', true],
        ['Neblineros traseros', true],
        ['Espejos laterales con ajuste eléctrico y plegables', true],
        ['Señalizador de viraje en espejos laterales', true],
        ['Vidrio trasero con defroster', true],
        ['Vidrios traseros tinteados', true],
        ['Limpiaparabrisas con sensor de lluvia', true],
        ['Sunproof con comando eléctrico', true],
        ['Protector de Pick up tipo Bedliner', true],
        ['Ganchos de amarre en el interior', true],
        ['Pisaderas laterales', true],
        ['Llantas bitono de aleación aro 18"', true],
        ['Antena tipo aleta con amplificador de señal', true],
        ['Rueda de repuesto tamaño normal con candado de seguridad', true],
        ['Parrilla frontal', 'Contorno cromado + Fume'],
      ],
    },
  ],
};
