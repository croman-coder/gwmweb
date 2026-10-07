/**
 * Especificaciones técnicas de new-h6-hev.
 *
 * Fuente: ficha técnica oficial en PDF (public/fichas/new-h6-hev.pdf), transcripta y revisada contra el documento.
 * Formato: columnas = versiones comparadas en la hoja (vacío si es una sola); cada fila es [etiqueta, valor];
 * valor = texto | true (incluido) | false (no incluido) | [valor por columna] cuando difiere entre versiones.
 * Las filas sin dato o no incluidas en ninguna versión no se listan.
 *
 * Respecto de la hoja:
 *  - La hoja es una sola para el H6 HEV (columna "H6 HEV LUXURY") y el H6 PHEV (columna "H6 PHEV DELUXE"); acá va la columna HEV.
 *  - La hoja no titula el tramo que sigue a "Motor combinado" (frenos, suspensión, dirección): se agrupó como "Chasis y conducción".
 *  - Seis filas al final de "Exterior" (asientos, luz interna, cubre equipaje) repiten o contradicen las de "Interior": parecen restos de otra plantilla y se omitieron.
 *  - Una fila de "Interior" (soporte lumbar del conductor) estaba repetida: se dejó una.
 */
export default {
  columnas: [],
  secciones: [
    {
      titulo: 'Motor y transmisión',
      filas: [
        ['Motorización', 'Híbrida autorrecargable'],
        ['Motor combustión', '1.5T'],
        ['Tracción', '4x2'],
        ['Transmisión', 'DHT'],
        ['Potencia máxima', '147 HP'],
        ['Torque máximo', '224 Nm'],
      ],
    },
    {
      titulo: 'Motor eléctrico',
      filas: [
        ['Potencia máxima', '108 HP'],
        ['Torque máximo', '125 Nm'],
      ],
    },
    {
      titulo: 'Motor combinado',
      filas: [
        ['Potencia máxima', '240 HP'],
        ['Torque máximo', '530 Nm'],
      ],
    },
    {
      titulo: 'Chasis y conducción',
      filas: [
        ['Freno de mano electrónico', true],
        ['Neumático normal', '235/55 R19'],
        ['Discos de freno', 'Delanteros y traseros (delanteros ventilados)'],
        ['Modos de conducción', 'ECO/ Sport/ Estándar/ Nieve'],
        ['Suspensión delantera ind. McPherson', true],
        ['Suspensión trasera ind. multibrazo', true],
        ['Control de par de frenado (BTC)', true],
        ['Dirección asistida eléctrica ajustable', 'Deportivo, confort, ligero'],
        ['Cambio automático de modos de conducción', true],
      ],
    },
    {
      titulo: 'Interior',
      filas: [
        ['Cuadro de instrumentos de 10,25 pulgadas', true],
        ['Comando de voz', true],
        ['Android Auto/ Apple CarPlay', true],
        ['Bluetooth', true],
        ['Pantalla multimedia', '14,6"'],
        ['Puertos USB', '2 adelante/ 2 atrás'],
        ['8 altavoces (HEV de bajo y alto nivel)', true],
        ['Carga inalámbrica (50 W)', true],
        ['Fuente de alimentación de 12 V en el maletero', true],
        ['Luces de lectura/ laterales LED monocromáticas', true],
        ['Volante multifunción de cuero de microfibra ajustable', true],
        ['Visera + espejo de maquillaje + iluminación de maquillaje', true],
        ['Retrovisor interior electrónico antideslumbrante', true],
        ['Un toque para abrir/ cerrar ventanillas', true],
        ['Reposabrazos central delantero', true],
        ['Reposabrazos central de la segunda fila con portavasos', true],
        ['Cortina de cubierta de maletero', true],
        ['Ajuste eléctrico de asiento (6 posiciones conductor/ 4 posiciones pasajero)', true],
        ['Soporte lumbar asiento del conductor ajuste eléctrico de 2 vías', true],
        ['Asiento de cuero con memoria del asiento del conductor', true],
        ['Calefacción/ ventilación de asiento delantero', true],
        ['Asiento de la segunda fila con relación de plegado 6:4', true],
        ['Reposacabezas central del asiento de la segunda fila', true],
        ['Aire automático con filtro N95, desempañado automático / salida en segunda fila', true],
      ],
    },
    {
      titulo: 'Exterior',
      filas: [
        ['Puerta trasera eléctrica', true],
        ['Sensor de apertura del portón trasero', true],
        ['Limpiaparabrisas sin marco con sensor / trasero deshuesado', true],
        ['Techo corredizo panorámico', true],
        ['Portaequipajes de techo', true],
        ['Faros automáticos + follow home', true],
        ['Luces antiniebla traseras / diurna', true],
        ['Alarma de freno de emergencia', true],
        ['Retrovisores laterales con plegado automático/luces/ ajuste eléctrico/ descongelación', true],
        ['Descongelación por hilo caliente (parabrisas trasero)', true],
        ['Cierre automático de ventanas con control remoto', true],
      ],
    },
    {
      titulo: 'Seguridad',
      filas: [
        ['Airbags', '6'],
        ['Cinturones delanteros dobles c/ fuerza limitada', '1ra y 2da fila'],
        ['Recordatorio de cinturón de seguridad desabrochado', '1ra y 2da fila'],
        ['Bloqueo mecánico de seguridad para niños', true],
        ['Sistema de estabilidad del vehículo', true],
        ['Control de tracción (TCS)', true],
        ['Sistema de mitigación de vuelco (RMI)', true],
        ['Asistencia de frenado (BA)', true],
        ['Asistencia de pendientes (HHC/HDC)', true],
        ['Sistema de prioridad de frenado', true],
        ['TPMS', true],
        ['Puerto de alimentación USB de grabadora de conducción', true],
        ['Radar de marcha atrás', true],
        ['Estacionamiento automático', true],
        ['Cámara 360/ chasis transparente', true],
        ['ACC', true],
        ['Asistencia de seguridad para peatones/bicicletas', true],
        ['Curvas / evasión inteligentes', true],
        ['Funciones de asistencia de carril (LDW/LKA/LCK/ ELK)', true],
        ['Reconocimiento de señales de tráfico TSR', true],
        ['Límite de velocidad inteligente IACC', true],
        ['Asistencia de congestión de tráfico TJA', true],
        ['Asistencia de crucero inteligente ICA', true],
        ['Intersección AEB', true],
        ['Advertencia lateral de marcha atrás', true],
        ['Frenado lateral inverso', true],
        ['Advertencia + asistencias contra colisión (RCW/SCM)', true],
        ['Advertencia de apertura de puerta DOW', true],
        ['Monitoreo de fatiga del conductor', true],
        ['EDR (registrador de datos de emergencia)', true],
        ['Alarma de exceso de velocidad', true],
        ['DST (asistencia dinámica de estabilidad)', true],
        ['Sonido de recordatorio de conducción a baja velocidad', true],
        ['Función de desbloqueo automático en caso de colisión', true],
        ['Función de bloqueo automático', true],
        ['Función anti-bloqueo', true],
        ['Sistema de alarma de puerta no cerrada', true],
      ],
    },
  ],
};
