/**
 * Especificaciones técnicas de ora-03-skin.
 *
 * Fuente: ficha técnica oficial en PDF (public/fichas/ora-03-skin.pdf), transcripta y revisada contra el documento.
 * Formato: ver src/js/tecnica/new-h6-hev.js.
 *
 * Respecto de la hoja:
 *  - La suspensión trasera figura como "Barra de torsión" en la tabla básica y "Eje semi rígido" en Chasis: se unificó.
 *  - Las filas de "Chasis y suspensión" que repiten la tabla básica (suspensiones, TPMS) se omitieron; "atranque" se corrigió a "arranque".
 *  - La hoja dice "1 kW" de carga AC: Marketing confirmó que es 11 kW (2026-11-20).
 */
export default {
  columnas: [],
  secciones: [
    {
      titulo: 'Motor y batería',
      filas: [
        ['Potencia máxima', '126 kW · 169 HP'],
        ['Torque máximo', '250 Nm'],
        ['Capacidad de batería', '57,7 kWh'],
        ['Autonomía WLTP', '400 km'],
        ['Autonomía NEDC', '480 km'],
        ['Consumo mixto', '16,7 kWh/100 km'],
        ['Velocidad máxima', '160 km/h'],
        ['Aceleración 0–100 km/h', '8,2 segundos'],
      ],
    },
    {
      titulo: 'Carga',
      nota: 'Los tiempos de carga varían con la temperatura, la carga inicial y la potencia del equipo.',
      filas: [
        ['Tipo de conector', 'CCS2'],
        ['Potencia máxima de carga AC', '11 kW'],
        ['Potencia máxima de carga DC', '80 kW'],
        ['Carga AC del 15 al 80%', '5,5 horas'],
        ['Carga DC del 20 al 80%', '40 minutos'],
      ],
    },
    {
      titulo: 'Dimensiones y capacidad',
      filas: [
        ['Largo', '4.235 mm'],
        ['Ancho', '1.825 mm'],
        ['Alto', '1.603 mm'],
        ['Distancia entre ejes', '2.650 mm'],
        ['Despeje', '120 mm'],
        ['Peso en vacío', '1.540 kg'],
        ['Capacidad del baúl', '228 a 858 litros'],
      ],
    },
    {
      titulo: 'Chasis y suspensión',
      filas: [
        ['Tracción', '4x2'],
        ['Transmisión', 'Automática'],
        ['Suspensión delantera', 'MacPherson'],
        ['Suspensión trasera', 'Eje semirrígido con barra de torsión'],
        ['Frenos', 'Disco en las cuatro ruedas'],
        ['Neumáticos', '215/50 R18'],
        ['Llantas de aleación', '18 pulgadas'],
        ['Nivel de regeneración ajustable', true],
        ['Conducción One Pedal', true],
        ['Modos de manejo', 'Standard, ECO, Sport, Auto y ECO+'],
        ['Dirección asistida eléctricamente', 'Configurable: Ligero, Confort y Sport'],
        ['Columna de dirección', 'Ajustable en 4 direcciones'],
        ['Auto Hold', true],
      ],
    },
    {
      titulo: 'Exterior',
      filas: [
        ['Pack estético standard', true],
        ['Antena tipo aleta de tiburón', true],
        ['Manijas de puerta color carrocería', true],
        ['Portón con apertura manual', true],
        ['Mordazas de freno plateadas', true],
      ],
    },
    {
      titulo: 'Asientos',
      filas: [
        ['Tapizado de cuero', true],
        ['Asiento del conductor eléctrico con memoria', '6 direcciones'],
        ['Apoyabrazos central trasero con portavasos', true],
      ],
    },
    {
      titulo: 'Vidrios y espejos',
      filas: [
        ['Levantavidrios de un toque con antipinzamiento', 'En las cuatro puertas'],
        ['Espejos exteriores', 'Ajuste y plegado eléctricos, desempañador y luz de giro'],
        ['Sensor de lluvia', true],
        ['Desempañador de luneta', true],
      ],
    },
    {
      titulo: 'Seguridad',
      filas: [
        ['Airbags', '7: doble frontal, laterales, de cortina y central'],
        ['Airbag del acompañante desactivable', true],
        ['Cinturones delanteros con pretensores y limitador de carga', true],
        ['Cinturones traseros laterales con pretensores y limitador de carga', true],
        ['Anclajes ISOFIX', true],
        ['Recordatorio de cinturón de seguridad', true],
        ['Mitigación de segunda colisión', 'SCM'],
        ['Frenado y estabilidad', 'ABS, EBD, TCS, RMI y ESC'],
        ['Freno de mano eléctrico', 'EPB'],
        ['Asistencia de arranque en pendiente', 'HAC'],
      ],
    },
    {
      titulo: 'Conducción inteligente',
      nota: 'Las asistencias apoyan al conductor; requieren su atención y no sustituyen el control del vehículo.',
      filas: [
        ['Arranque rápido inteligente', true],
        ['Llave inteligente', '2 unidades'],
        ['Acceso sin llave', true],
        ['Bloqueo automático de puertas', true],
        ['Bloqueo de puertas para niños', true],
        ['Desbloqueo automático de puertas ante colisión', true],
        ['Alerta de colisión frontal y frenado autónomo de emergencia', 'FCW + AEB, con detección de peatones y ciclistas'],
        ['Frenado de emergencia en intersecciones', 'AEB-JA'],
        ['Lector de señales de tránsito y aviso de velocidad', 'TSR'],
        ['Asistente de cambio de carril', 'LCA'],
        ['Sensores de proximidad traseros', 'Con alerta y frenado de tráfico cruzado'],
        ['Alerta de colisión trasera', 'RCW'],
        ['Alerta al abrir puertas', 'DOW'],
        ['Alerta de exceso de velocidad', true],
        ['Crucero adaptativo', 'ACC, ICA, TJA y control de giro inteligente ATC'],
        ['Asistencias de carril', 'LDW, LKA, ELK y esquiva inteligente IE'],
        ['Monitoreo de presión de neumáticos', 'TPMS'],
        ['Cámara 360°', true],
        ['Frenado de emergencia en maniobras', 'MEB'],
      ],
    },
    {
      titulo: 'Multimedia',
      filas: [
        ['Tablero de instrumentos', '10,25 pulgadas'],
        ['Pantalla multimedia', '10,25 pulgadas'],
        ['Bluetooth', true],
        ['Puertos USB delanteros y traseros', '3'],
        ['Parlantes', '6'],
        ['Apple CarPlay / Android Auto', 'Inalámbricos'],
        ['Toma de 12 V', true],
      ],
    },
    {
      titulo: 'Climatización',
      filas: [
        ['Climatizador automático', true],
        ['Desempañador automático', true],
        ['Indicador de temperatura exterior', true],
      ],
    },
    {
      titulo: 'Iluminación',
      filas: [
        ['Faros LED con ajuste de altura', true],
        ['Sensor crepuscular', true],
        ['Follow me home', true],
        ['Luces altas automáticas', 'HMA'],
        ['Luz de niebla trasera', true],
        ['Tercera luz de freno LED', true],
        ['Luces diurnas', 'DRL'],
        ['Luz de bienvenida', true],
      ],
    },
    {
      titulo: 'Interior',
      filas: [
        ['Volante forrado en cuero', true],
        ['Parasoles con espejo de cortesía', true],
        ['Espejo retrovisor interior electrocrómico', true],
        ['Agarraderas de techo', true],
        ['Cobertor de baúl', true],
        ['Entradas USB frontales', '2'],
      ],
    },
  ],
};
