/**
 * Especificaciones técnicas de ora-5-ev.
 *
 * Fuente: ficha técnica oficial en PDF (public/fichas/ora-5-ev.pdf), transcripta y revisada contra el documento.
 * Formato: ver src/js/tecnica/new-h6-hev.js.
 *
 * Respecto de la hoja:
 *  - "EPB+AUTO MOON" se interpretó como freno de estacionamiento eléctrico con Auto Hold.
 *  - Las filas de ADAS agrupan varias funciones y repiten el tráfico cruzado frontal: se separaron y se dejó una vez cada función.
 */
export default {
  columnas: [],
  destacados: [['Potencia', '201 HP'], ['Torque', '260 Nm'], ['Batería', '58,33 kWh'], ['Autonomía WLTC', 'Hasta 430 km']],
  secciones: [
    {
      titulo: 'Especificaciones básicas',
      nota: 'La autonomía corresponde al ciclo WLTC; la real varía con el uso, la temperatura y la carga.',
      filas: [['Tracción', '4x2'], ['Transmisión', 'Automática'], ['Largo', '4.471 mm'], ['Ancho', '1.833 mm'], ['Alto', '1.641 mm'], ['Distancia entre ejes', '2.720 mm'], ['Autonomía eléctrica', '430 km (WLTC)'], ['Capacidad de la batería', '58,33 kWh'], ['Potencia', '201 HP'], ['Torque', '260 Nm']],
    },
    {
      titulo: 'Chasis',
      filas: [['Suspensión delantera', 'MacPherson'], ['Suspensión trasera', 'Multibrazo'], ['Frenos delanteros / traseros', 'Discos / discos'], ['Frenado integrado', 'IBC'], ['Freno de estacionamiento', 'Eléctrico EPB con Auto Hold'], ['Modos de conducción', 'ECO, Ciudad, Normal y Sport'], ['Neumáticos', '225/60 R18'], ['Kit de reparación de neumáticos', true], ['Monitoreo de presión de neumáticos', 'TPMS']],
    },
    {
      titulo: 'Exterior',
      filas: [['Limpialuneta', true], ['Limpiaparabrisas automáticos', true], ['Barras de techo', true], ['Portón trasero eléctrico', true], ['Faros LED', true], ['Luces traseras LED', true], ['Luces diurnas', true], ['Follow me home', true], ['Ajuste eléctrico de altura de faros', true], ['Faros automáticos', true], ['Levantavidrios de un toque con antipinzamiento', 'En todas las ventanillas'], ['Espejos exteriores', 'Ajuste y plegado eléctricos'], ['Plegado automático de espejos al cerrar', true], ['Alimentación de dispositivos V2L', true]],
    },
    {
      titulo: 'Interior',
      filas: [['Volante de cuero calefaccionado', 'Ajustable en 4 posiciones'], ['Parasoles con espejo iluminado', true], ['Carga inalámbrica rápida de celular', true], ['Asientos de cuero', true], ['Asientos eléctricos', 'Conductor en 6 posiciones; acompañante en 4'], ['Ventilación y calefacción en asientos delanteros', true], ['Memoria del asiento del conductor', true], ['Apoyabrazos central trasero', true], ['Desempañador de luneta', true], ['Desempañador de espejos exteriores', true], ['Tablero de instrumentos', '10,25 pulgadas'], ['Pantalla multimedia', '14,6 pulgadas'], ['Apple CarPlay / Android Auto', 'Inalámbricos'], ['Volumen sensible a la velocidad', true], ['Puertos USB', 'Delanteros tipo A y C; trasero tipo C'], ['Parlantes', '6'], ['Retrovisor interior antideslumbrante automático', true], ['Luces de lectura', true], ['Luces laterales de techo', true], ['Iluminación ambiental', true], ['Climatización automática con filtro CN95', true], ['Salidas de aire traseras', true]],
    },
    {
      titulo: 'Seguridad',
      filas: [['Airbags', '6'], ['Cinturones delanteros con limitador de fuerza', true], ['Cinturones traseros con bloqueo de emergencia', true], ['Recordatorio de cinturón delantero y trasero', true], ['Frenos antibloqueo', 'ABS'], ['Distribución electrónica de frenado', 'EBD'], ['Control de tracción', 'TCS'], ['Asistencia de arranque en pendiente', 'HHC'], ['Bloqueo automático de puertas en marcha', true], ['Desbloqueo automático de puertas tras una colisión', true]],
    },
    {
      titulo: 'Asistencias avanzadas de conducción',
      nota: 'Las asistencias apoyan al conductor; requieren su atención y no sustituyen el control del vehículo.',
      filas: [['Radar', true], ['Cámara 360°', true], ['Crucero adaptativo', true], ['Alerta de colisión frontal y frenado automático de emergencia', 'Con asistencia para peatones y ciclistas'], ['Reconocimiento de señales de tránsito', 'Con aviso de exceso y asistencia inteligente de velocidad'], ['Asistencias de carril', 'Aviso de salida, mantenimiento, centrado y evasión de emergencia'], ['Asistencia en intersecciones', 'AEB con frenado ante peatones y ciclistas que vienen de frente'], ['Asistente de cambio de carril', true], ['Detección de punto ciego', true], ['Alerta al abrir puertas', true], ['Mantenimiento de carril de emergencia', true], ['Alerta de colisión trasera', true], ['Tráfico cruzado trasero', 'Alerta'], ['Tráfico cruzado delantero', 'Alerta y frenado']],
    },
    {
      titulo: 'Colores',
      nota: 'Las imágenes son ilustrativas. Consultá disponibilidad de colores con un asesor.',
      filas: [['Colores', 'Black, Matte Grey, Mountain Grey, Green y White']],
    },
  ],
};
