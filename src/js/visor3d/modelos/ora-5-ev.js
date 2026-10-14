/**
 * Visor 3D del Ora 5 EV: datos que necesita motor.js.
 *
 * Origen: el visor oficial de GWM México (gwm-mx.com/mx-vr, variante ORA5_BEV). El modelo y las
 * texturas se descargaron el 2026-10-14 y se sirven desde public/3d/ora-5-ev/; el sitio no consulta
 * a México en runtime. Ver "Visor 3D" en el README para el detalle de cómo se prepararon.
 *
 * Los cinco colores y tres tapizados son los de esa configuración. Falta confirmar con Marketing
 * cuáles se comercializan en Paraguay (el aviso de la ficha ya los marca como ilustrativos).
 */
export default {
  nombre: 'ORA 5 EV',
  base: '/3d/ora-5-ev/',
  modelo: 'ORA5.glb',
  decoder: '/3d/draco/',

  // El GLB trae piezas de las tres variantes (EV, HEV, ICE) con escala 0: estas son las de la EV.
  mostrar: ['SKYLIGHT_TAG01', '10_black_color_EV', '49_car_trunk_mirror_EV'],
  // Cielo propio del GLB (una esfera con fotos de montañas): se quita, el fondo es un estudio oscuro.
  quitar: ['Sphere_2'],
  // Ángulo inicial de la cámara alrededor del auto, en grados: 0 = de costado; el frente del modelo
  // queda hacia los negativos, así que -38 es una vista de tres cuartos desde adelante.
  azimut: -38,
  // Pieza usada para encuadrar la cámara (el GLB también trae un plano de sombra más grande).
  referencia: '01_car_body',
  // Material de la pintura de la carrocería.
  pintura: 'car_body',

  // Cada color lleva el tapizado con el que sale de fábrica: al pasar a "Interior" se abre ese.
  colores: [
    { id: 'verde-esmeralda', nombre: 'Verde esmeralda', valor: '#00422E', emisivo: '#040F0C', interior: 'brownRice' },
    { id: 'azul-glaciar', nombre: 'Azul glaciar', valor: '#09A3AA', emisivo: '#042B30', interior: 'grayRice' },
    { id: 'blanco-marfil', nombre: 'Blanco marfil', valor: '#C3C0B6', emisivo: '#6F6C67', interior: 'grayRice' },
    { id: 'gris-mate', nombre: 'Gris mate', valor: '#D2DBDB', emisivo: '#000000', interior: 'darkGray' },
    { id: 'negro', nombre: 'Negro', valor: '#000000', emisivo: '#000000', interior: 'brownRice' },
  ],

  // id = carpeta en public/3d/ora-5-ev/interior/<id>/<fila>/<1-6>.webp
  interiores: [
    { id: 'brownRice', nombre: 'Marrón y crema', muestra: ['#5a3e2c', '#d9cdb8'] },
    { id: 'grayRice', nombre: 'Gris oscuro y crema', muestra: ['#3b3d40', '#d9cdb8'] },
    { id: 'darkGray', nombre: 'Gris oscuro', muestra: ['#2b2c2e', '#4a4c50'] },
  ],
  filas: [
    { id: 'frontRow', nombre: 'Primera fila' },
    { id: 'backRow', nombre: 'Fila trasera' },
  ],
  // Las seis imágenes de cada panorama vienen numeradas 1 a 6 con un orden y una orientación propios
  // (relevados uniendo sus bordes): 5 = frente, 6 = atrás, 1 = izquierda, 2 = derecha, 4 = techo, 3 = piso,
  // y todas volteadas verticalmente. Este es el orden que espera three (+x, -x, +y, -y, +z, -z).
  caras: [2, 1, 4, 3, 6, 5],
  carasVolteadas: true,

  // Clips del GLB que se reproducen al abrir / cerrar.
  animaciones: {
    puertas: ['02_car_LF_door', '04_car_RF_door', '03_car_LB_door', '05_car_RB_door'],
    baul: ['06_car_trunk'],
  },
};
