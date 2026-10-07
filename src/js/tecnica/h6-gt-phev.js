/**
 * Especificaciones técnicas de h6-gt-phev.
 *
 * Fuente: ficha técnica oficial en PDF (public/fichas/h6-gt-phev.pdf), transcripta y revisada contra el documento.
 * Formato: columnas = versiones comparadas en la hoja (vacío si es una sola); cada fila es [etiqueta, valor];
 * valor = texto | true (incluido) | false (no incluido) | [valor por columna] cuando difiere entre versiones.
 * Las filas sin dato o no incluidas en ninguna versión no se listan.
 *
 * Respecto de la hoja:
 *  - En la hoja los valores de "Multimedia" y "Seguridad" están corridos una fila respecto de sus etiquetas (el título de cada grupo lleva el valor del primer renglón).
 *  - Se reasignaron así: Android Auto / CarPlay = Inalámbrico, Pantalla = 12,3 pulgadas, Sensores de estacionamiento = 12 y Cámaras = 5
 *  - (en la hoja "12" y "5" aparecen junto a "Control de descenso" y "Sensores"), y "Desvío inteligente" = "Aleja el coche al adelantar camiones hasta 30 cm".
 *  - CONFIRMAR con el fabricante o con la ficha original antes de difundir esos valores.
 */
export default {
  columnas: [],
  secciones: [
    {
      titulo: 'General',
      filas: [
        ['Nombre del producto', 'Haval H6 GT 2026 PHEV'],
        ['Tipo de producto', 'SUV Coupé'],
        ['Tipo de energía', 'Híbrido enchufable'],
      ],
    },
    {
      titulo: 'Dimensiones',
      filas: [
        ['Largo', '4.727 mm'],
        ['Ancho', '1.940 mm'],
        ['Alto', '1.729 mm'],
        ['Despeje del suelo', '172 mm'],
        ['Ángulo de ataque', '19,8°'],
        ['Ángulo de salida', '24,9°'],
      ],
    },
    {
      titulo: 'Garantía',
      filas: [
        ['Duración de la garantía', '5 años o 150.000 km (lo que ocurra primero)'],
        ['Garantía de la batería de tracción', '8 años'],
      ],
    },
    {
      titulo: 'Especificaciones técnicas',
      filas: [
        ['Peso', '2.050 kg'],
        ['Tanque de combustible', '55 litros'],
        ['Baulera', '515 / 1.390 litros'],
      ],
    },
    {
      titulo: 'Motor y transmisión',
      filas: [
        ['Motor (combustión)', '1.5 turbo inyección directa a gasolina'],
        ['Válvulas', '16'],
        ['Cilindros', '4'],
        ['Motores eléctricos', '2 (1 delantero y 1 trasero)'],
        ['Batería (kWh)', '34'],
        ['Tiempo de carga AC', '0 a 100% en 5 h (aprox.)'],
        ['Tiempo de carga DC', '10 a 80% en 29 min (aprox.)'],
        ['Autonomía modo 100% eléctrico', 'Hasta 170 km'],
        ['Potencia combinada (HP)', '430'],
        ['Torque (Nm)', '762'],
        ['Transmisión', '2 velocidades'],
        ['Tracción', 'Integral en las 4 ruedas'],
        ['Velocidad máxima', '180 km/h (limitada electrónicamente)'],
      ],
    },
    {
      titulo: 'Exterior',
      filas: [
        ['Faros frontales', 'Full-LED de alta performance con ajuste de altura'],
        ['Faros ajustables en altura', true],
        ['Luces de conducción diurna', true],
        ['Luz alta inteligente', true],
        ['“Follow Me Home”', true],
        ['Luces de frenado en emergencia', true],
        ['Faros traseros', 'Full-LED'],
        ['Luces automáticas', true],
        ['Neumáticos', 'Michelin 235/55 R19'],
        ['Antena tipo tiburón', true],
        ['Sensor de lluvia', true],
        ['Techo solar panorámico eléctrico', true],
        ['Retrovisores externos', 'Rebatimiento automático'],
        ['Detalles con acabado exterior', 'Negro piano'],
        ['Faros ahumados', true],
      ],
    },
    {
      titulo: 'Interior',
      filas: [
        ['Volante forrado en cuero', 'Con ajuste de altura y profundidad'],
        ['Arranque a botón', true],
        ['Panel instrumental digital', 'LCD de 10,25 pulgadas'],
        ['Retrovisor interno antirreflejante automático', true],
        ['Ventanas con función “one-touch” y con seguridad antiaplastamiento', true],
        ['Cierre de ventanas por control remoto', true],
        ['Cargador inalámbrico', '15 W'],
        ['Apoyabrazos', 'Con compartimento para objetos'],
        ['Asientos forrados en cuero y detalles alcántara', 'Con logo GT bordado'],
        ['Ajuste de asientos', 'Eléctrico, ventilación y ajuste de lumbar para el conductor'],
        ['Asientos rebatibles 60/40', true],
        ['Asientos calefactables', true],
        ['Luz interna', 'LED'],
        ['AC “dual zone” (conductor y pasajero)', true],
        ['Salida trasera de AC', true],
        ['Control de calidad de AC automático con filtro CN95', true],
        ['Purificador de AC ionizado integrado', true],
        ['Luz en la guantera', true],
        ['Reconocimiento facial', true],
      ],
    },
    {
      titulo: 'Multimedia',
      filas: [
        ['Android Auto / CarPlay', 'Inalámbrico'],
        ['Pantalla', '12,3 pulgadas'],
        ['Bluetooth', true],
        ['Mandos en el volante', true],
        ['Puertos USB delanteros', true],
        ['Wi-Fi 4G con función “hotspot”', true],
        ['Actualización de software OTA', true],
        ['Modos de conducción', '7 (Eco/Normal/Deportivo/Lodo/Nieve/AWD/Arena)'],
        ['Modos de asistente de dirección', '3 (Confort/Normal/Deportivo)'],
        ['Head up Display', 'Proyecta en el parabrisas información de llamada, navegación e “Intelligent Drive”'],
      ],
    },
    {
      titulo: 'Seguridad',
      filas: [
        ['Airbags frontales', true],
        ['Airbags laterales', true],
        ['Airbags de cortina', true],
        ['ABS + EBD', true],
        ['Control de tracción (TCS)', true],
        ['Sistema de mitigación de colisión (SCM)', true],
        ['Smart cornering', true],
        ['Asistencia de frenado (Brake assist)', true],
        ['Control de descenso en pendientes (Hill descent control)', true],
        ['Sensores de estacionamiento', '12'],
        ['Cámaras', '5'],
        ['Radares frontal y trasero', true],
        ['Frenado autónomo de emergencia para bajas velocidades', true],
        ['Cámara 360º con función capó invisible y 8 visualizaciones', true],
        ['Sistema activo de estacionamiento (“Full parking assist”)', true],
        ['Asistencia de reversa adaptativa (“Auto reverse assistance”)', true],
        ['Control crucero adaptativo con función “Stop & GO”', true],
        ['Alerta y frenado de emergencia autónoma (reconoce peatones, motos y bicicletas)', true],
        ['Alerta y frenado de emergencia de tráfico cruzado', true],
        ['Asistencia de mantenimiento y centralización de carril', true],
        ['Conducción semiautónoma nivel 2+', true],
        ['Asistencia de punto ciego con aviso de apertura de puertas', true],
        ['Alerta y frenado autónomo de tráfico cruzado en reversa', true],
        ['Desvío inteligente', 'Aleja el coche al adelantar camiones hasta 30 cm'],
        ['Cámara de reconocimiento facial', 'Monitorea comportamiento del conductor (fatiga y distracción)'],
        ['Registro de datos del evento (EDR)', 'Graba comportamiento de dirección'],
        ['Reconocimiento de placas de velocidad con aviso de límite de velocidad', true],
        ['Llave inteligente (“Smart key”)', true],
        ['Alarma antirrobo', true],
        ['Cierre automático de puertas programable (15 o 30 km/h)', true],
        ['Desbloqueo automático de puertas en caso de accidente', true],
        ['E-call', 'Llama a los bomberos'],
        ['Llave con función pánico', true],
      ],
    },
  ],
};
