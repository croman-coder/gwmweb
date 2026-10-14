/** Tablas y dotación Luxury de la ficha oficial mexicana, pp. 2–9; revisión visual 14/10/2026. */
import { ORA5_FUENTE, ORA5_PAGINA } from '../ora5.js';
export const referencia = version => ({ mercado: 'México', version, fuente: ORA5_FUENTE, pagina: ORA5_PAGINA });

export function seccionesLuxury(ev) {
  return [
    {
      titulo: 'Dimensiones y capacidad',
      filas: [['Largo', '4.471 mm'], ['Ancho', '1.833 mm'], ['Alto', '1.641 mm'], ['Distancia entre ejes', '2.720 mm'], ['Capacidad del baúl', ev ? '362 litros' : '272 litros'], ...(!ev ? [['Tanque de combustible', '55 litros']] : []), ['Neumáticos', '225/60 R18'], ['Llantas', 'Aluminio de 18 pulgadas'], ['Rueda de auxilio', 'Temporal']],
    },
    {
      titulo: 'Chasis y dirección',
      filas: [['Tracción', 'Delantera'], ['Suspensión delantera', 'Independiente MacPherson'], ['Suspensión trasera', 'Independiente multibrazo'], ['Dirección', 'Asistencia eléctrica EPS'], ['Ajuste de dirección', 'Suave, Confort y Sport'], ['Frenos delanteros / traseros', 'Discos / discos'], ['Frenado regenerativo', true]],
    },
    {
      titulo: 'Exterior e iluminación',
      filas: [['Faros LED automáticos', true], ['Luces diurnas LED', true], ['Antiniebla trasero', true], ['Espejos con plegado eléctrico', true], ['Espejos con desempañador y guiños LED', true], ['Limpialuneta y desempañador trasero', true], ['Barras de techo', true], ['Techo panorámico', ev], ['Antena tipo aleta', true]],
    },
    {
      titulo: 'Interior y confort',
      filas: [['Climatización automática', true], ['Portón eléctrico', 'Apertura y cierre desde la pantalla; altura ajustable'], ['Carga inalámbrica de celular', '50 W'], ['Iluminación ambiental', '64 colores, con efectos de ritmo y movimiento'], ['Llave inteligente', true], ['Luz de cortesía en el baúl', true], ['Espejo de cortesía iluminado', true], ['Levantavidrios delanteros de un toque', true], ['Volante regulable', 'Altura y profundidad']],
    },
    {
      titulo: 'Asientos y terminaciones',
      filas: [['Asiento eléctrico del conductor', '6 posiciones'], ['Memoria del conductor y función de bienvenida', true], ['Asiento eléctrico del acompañante', '4 posiciones'], ['Calefacción en asientos delanteros', true], ['Ventilación en asientos delanteros', true], ['Respaldo trasero abatible', '60/40'], ['Tapizado', 'Cuero sintético'], ['Volante revestido', 'Microfibra'], ['Consola con apoyabrazos y portavasos', true]],
    },
    {
      titulo: 'Pantallas, conectividad y audio',
      filas: [['Pantalla multimedia táctil', '14,6 pulgadas'], ['Tablero digital', '10,25 pulgadas'], ['Apple CarPlay / Android Auto', 'Inalámbricos'], ['Bluetooth', true], ['Puertos delanteros de carga', 'USB-A y USB-C'], ['Sistema de audio', '9 parlantes'], ['Mandos de audio en el volante', true], ['Control de funciones por voz', true]],
    },
    {
      titulo: 'Tecnología de conducción',
      filas: [['Cámara panorámica', '360°, con función a baja velocidad'], ['Visualización de chasis transparente', true], ['Freno de estacionamiento', 'Eléctrico EPB con Auto Hold'], ['Modos de conducción', 'Eco, Normal, Sport y Well Being'], ...(ev ? [['Modos de ambientación EV', 'Descanso, Ausente, Inmersivo y Acampar']] : [])],
    },
    {
      titulo: 'Seguridad y protección',
      filas: [['Airbags', '7: dos frontales, dos laterales, dos de cortina y uno central delantero'], ['Anclajes infantiles ISOFIX', true], ['Asistencia en pendientes', 'Ascenso HAC y descenso HDC'], ['Control de estabilidad y antivuelco', 'ESC y RMI'], ['Control de tracción', 'TCS'], ['Frenado ABS y distribución electrónica', 'ABS y EBD'], ['Monitoreo de presión de neumáticos', 'TPMS']],
    },
    {
      titulo: 'Asistencias avanzadas de conducción',
      nota: 'Las asistencias apoyan al conductor; requieren su atención y no sustituyen el control del vehículo.',
      filas: [['Alerta al abrir puertas', 'DOW'], ['Aviso de salida de carril y corrección de emergencia', 'LDW / ELK'], ['Alertas de colisión frontal y trasera', 'FCW / RCW'], ['Tráfico cruzado delantero y trasero', 'Alertas y frenado FCTA / FCTB / RCTA / RCTB'], ['Asistencia para cambiar de carril', 'LCA'], ['Asistencia en intersecciones', 'IJA'], ['Mantenimiento de carril', 'LKA'], ['Asistencia en tráfico denso', 'TJA'], ['Cambio automático de luces', 'HMA'], ['Crucero adaptativo', 'ACC'], ['Control inteligente en curvas', 'ICC'], ['Detección de punto ciego', 'BSD'], ['Frenado autónomo de emergencia', 'AEB, con detección de peatones y ciclistas'], ['Reconocimiento de señales de tránsito', 'TSR']],
    },
    {
      titulo: 'My GWM App · referencia México',
      nota: 'Servicios descritos para México. Consultá compatibilidad, conectividad, planes y disponibilidad en Paraguay.',
      filas: [['Acciones remotas', 'Puertas, climatización, luces y bocina'], ['Alertas del vehículo', 'Accesos, ventanillas y batería'], ['Información remota', 'Ubicación, autonomía y estado de neumáticos'], ['Servicios a bordo', 'Hotspot Wi-Fi, navegación y aplicaciones; sujetos a disponibilidad regional']],
    },
    {
      titulo: 'Colores y acabados · referencia México',
      nota: 'La combinación de exterior y tapizado depende de la versión y del mercado. Las imágenes son ilustrativas.',
      filas: [['Colores del folleto', 'Black, Mate Grey, Emerald Green, Blue Gracier e Ivory White'], ['Material de los asientos', 'Cuero sintético']],
    },
  ];
}
