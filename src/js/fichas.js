/**
 * Fichas de modelo: contenido de cada página /modelos/<slug>.
 *
 * Origen: las fichas de producto de gwm.com.py (textos, precios por versión, imágenes y PDF de
 * ficha técnica), relevadas el 2026-10-06 a partir del HTML que aportó Marketing. Los textos se
 * tomaron tal cual, salvo erratas (tildes y tipeos) corregidas sin cambiar el sentido.
 *
 * Las de Ora (`provisoria: true`) no tenían ficha en el sitio anterior: usan texto e imágenes de
 * gwm.com.uy, sin precios, versiones ni ficha técnica. Falta que Marketing las revise o las reemplace.
 *
 * Todo vive en el repo: imágenes en public/img/fichas/<slug>/ y PDF en public/fichas/<slug>.pdf.
 * Una sección sin datos no se muestra (el Wingle 7, por ejemplo, no tiene "Diseño" ni "Tecnología").
 *
 * Campos de cada ficha: titular (líneas del h1), bajada, portada {escritorio, movil}, versiones
 * [{nombre, precio, especificaciones | descripcion}], diseno / tecnologia {titulo, texto, imagen},
 * galeria [imágenes] (+ galeriaProporcion), interior / exterior {titulo, subtitulo, texto, imagen}
 * fichaTecnica (ruta del PDF) y aviso (texto que reemplaza a las secciones en una ficha mínima).
 */

export const FICHAS = {
  'wingle-7': {
    titular: ['WINGLE 7: UNA PICK UP RUDA Y VERSÁTIL', 'EN SU VERSIÓN 2026'],
    bajada: 'La camioneta que conjuga alto rendimiento y estilo.',
    portada: {
      escritorio: '/img/fichas/wingle-7/portada.webp',
      movil: '/img/fichas/wingle-7/portada-m.webp',
    },
    versiones: [
      {
        nombre: 'WINGLE 7 4x2',
        precio: 19990,
        especificaciones: ['4x2 · 2.0 Diesel'],
      },
      {
        nombre: 'WINGLE 7 4x4',
        precio: 21990,
        especificaciones: ['4x4 · Diesel 2.0'],
      },
    ],
    galeria: ['/img/fichas/wingle-7/galeria-1.webp', '/img/fichas/wingle-7/galeria-2.webp'],
    interior: {
      titulo: 'WINGLE 7',
      subtitulo: 'LA CAMIONETA QUE EXPERIMENTA LA FUSIÓN ENTRE ESTILO Y TECNOLOGÍA EN CADA TRAMO DEL CAMINO',
      texto: [
        'Su interior se caracteriza por ser cómodo y espacioso para sus 5 plazas.',
        'Además para la comodidad del conductor cuenta con un asiento regulable eléctricamente en 6 posiciones, volante multifunción revestido en Eco Cuero, al igual que todos los asientos.',
        'A su vez tiene un gran equipamiento interior incluyendo control crucero, alza-cristales y espejos eléctricos, radio MP5, 6 parlantes, bluetooth, 10 airbags, entre otros.',
      ],
      imagen: '/img/fichas/wingle-7/interior.webp',
    },
    exterior: {
      titulo: 'EXPLORA EL DISEÑO EXTERIOR DEL WINGLE 7',
      subtitulo: 'Sumérgete en la expresión distintiva de Wingle 7',
      texto: [
        'La Wingle 7 tiene un atractivo diseño, moderno y con excelentes terminaciones.',
        'En su exterior se presenta con una parrilla frontal cromada, faros delanteros eléctricos ajustables en altura, espejos retrovisores del color de la carrocería ajustables eléctricamente con luz de giro, protector de caja, barra antivuelco negra y llantas de aleación 16”',
      ],
      imagen: '/img/fichas/wingle-7/exterior.webp',
    },
    fichaTecnica: '/fichas/wingle-7.pdf',
  },
  'jolion-pro-hev': {
    titular: ['El SUV que Re-evoluciona tu mundo'],
    bajada: 'Experimenta la fusión perfecta entre estilo y rendimiento',
    portada: {
      escritorio: '/img/fichas/jolion-pro-hev/portada.webp',
      movil: '/img/fichas/jolion-pro-hev/portada-m.webp',
    },
    versiones: [
      {
        nombre: 'HIGH',
        precio: 19990,
        especificaciones: [
          ['Motor', 'Híbrido autorrecargable (motor de combustión 1.5 + motor eléctrico)'],
          ['Transmisión', 'Automática (AT)'],
          ['Potencia', '188 HP · Torque 377 Nm'],
        ],
      },
      {
        nombre: 'TOP',
        precio: 21990,
        especificaciones: [
          ['Motor', 'Híbrido autorrecargable (motor de combustión 1.5 + motor eléctrico)'],
          ['Transmisión', 'Automática (AT)'],
          ['Potencia', '188 HP · Torque 377 Nm'],
        ],
      },
    ],
    diseno: {
      titulo: 'Diseño',
      texto: ['Una SUV donde la innovación y el rendimiento se fusionan'],
      imagen: '/img/fichas/jolion-pro-hev/diseno.webp',
    },
    tecnologia: {
      titulo: 'Tecnología',
      texto: [
        'La JOLION PRO es un híbrido auto-recargable que fusiona eficiencia y autonomía. Este innovador modelo marca el camino hacia una conducción sostenible, ofreciendo una experiencia única y eficaz para tus desplazamientos diarios.',
      ],
      imagen: '/img/fichas/jolion-pro-hev/tecnologia.webp',
    },
    galeria: ['/img/fichas/jolion-pro-hev/galeria-1.webp'],
    interior: {
      titulo: 'JOLION PRO HEV',
      subtitulo: 'El JOLION PRO, con su diseño innovador y características de vanguardia.',
      texto: ['Se erige como un SUV que no solo domina cualquier terreno, sino que redefine la experiencia de conducción.'],
      imagen: '/img/fichas/jolion-pro-hev/interior.webp',
    },
    exterior: {
      titulo: 'Diseño innovador y características de vanguardia',
      subtitulo: 'El SUV donde la innovación y el rendimiento se fusionan',
      texto: [],
      imagen: '/img/fichas/jolion-pro-hev/exterior.webp',
    },
    fichaTecnica: '/fichas/jolion-pro-hev.pdf',
  },
  'new-h6-hev': {
    titular: [
      'La SUV Automática por Excelencia se renueva',
      'Vos también podés ser parte de la nueva era. Conducí una SUV híbrida.',
    ],
    bajada: 'Descubrí a la nueva Haval H6 Híbrida.',
    portada: {
      escritorio: '/img/fichas/new-h6-hev/portada.webp',
      movil: '/img/fichas/new-h6-hev/portada-m.webp',
    },
    versiones: [
      {
        nombre: 'H6 Híbrida High',
        precio: 24990,
        especificaciones: [
          ['Motor', '1.5 Turbo'],
          ['Transmisión', 'DHT'],
          ['Potencia motor ICE', '147 HP @ 5500-6000'],
          ['Potencia motor eléctrico', '108 HP @ 5500-6000'],
          ['Potencia combinada', '240 HP @ 5500-6000'],
        ],
      },
    ],
    diseno: {
      titulo: 'Diseño',
      texto: [
        'Descubrí la elegancia moderna de la Haval H6 HEV.',
        'Sumergite en los detalles únicos de la nueva Haval H6 HEV: techo panorámico, spoiler trasero, barras de techo, llantas de aleación y mucho más.',
        'Sofisticación ecológica que destaca en cada elemento.',
      ],
      imagen: '/img/fichas/new-h6-hev/diseno.webp',
    },
    tecnologia: {
      titulo: 'Tecnología',
      texto: [
        'El Haval New H6 HEV está equipado con avanzadas tecnologías de asistencia al conductor, incluyendo frenado de emergencia autónomo, control de crucero adaptativo, asistente de cambio de carril y detección de punto ciego.',
        'Además, cuenta con una pantalla táctil compatible con Android Auto y Apple Car Play, proporcionando una conectividad y entretenimiento sin igual.',
      ],
      imagen: '/img/fichas/new-h6-hev/tecnologia.webp',
    },
    galeria: [
      '/img/fichas/new-h6-hev/galeria-1.webp',
      '/img/fichas/new-h6-hev/galeria-2.webp',
      '/img/fichas/new-h6-hev/galeria-3.webp',
      '/img/fichas/new-h6-hev/galeria-4.webp',
    ],
    interior: {
      titulo: 'NEW H6 HEV',
      subtitulo: 'LA MEJOR SUV CON NUEVO LOOK',
      texto: [
        'Explora la sofisticación del HAVAL NEW H6 HEV. Su diseño interior respira confort: amplio espacio, materiales de calidad, y un sistema de infoentretenimiento intuitivo. El viaje es una experiencia única en este SUV.',
      ],
      imagen: '/img/fichas/new-h6-hev/interior.webp',
    },
    exterior: {
      titulo: 'DESCUBRE LA ELEGANCIA MODERNA DE LA HAVAL NEW H6',
      subtitulo: 'ESTILO QUE MARCA LA DIFERENCIA',
      texto: [
        'Sumérgete en la elegancia del SUV automático HAVAL NEW H6 HEV con detalles únicos y totalmente Renovada en el diseño.',
      ],
      imagen: '/img/fichas/new-h6-hev/exterior.webp',
    },
    fichaTecnica: '/fichas/new-h6-hev.pdf',
  },
  'new-h6-phev': {
    titular: ['HAVAL NEW H6 PHEV', 'Tecnología y seguridad como nunca antes'],
    portada: {
      escritorio: '/img/fichas/new-h6-phev/portada.webp',
      movil: '/img/fichas/new-h6-phev/portada-m.webp',
    },
    versiones: [
      {
        nombre: 'PHEV DELUXE',
        precio: 30990,
        especificaciones: [
          ['Motor', '1.5 Turbo híbrido enchufable'],
          ['Transmisión', 'DHT'],
          ['Autonomía', 'hasta 120 km promedio en modo eléctrico'],
          ['Potencia combinada', '322 HP'],
        ],
      },
    ],
    diseno: {
      titulo: 'Diseño',
      texto: [
        'Elegante y moderno, cuidando cada detalle para renovar completamente la HAVAL NEW H6 PHEV.',
        'Desde las líneas exteriores, faros y parrilla, hasta cada material seleccionado para el interior, pensado para satisfacer las expectativas de cualquiera.',
      ],
      imagen: '/img/fichas/new-h6-phev/diseno.webp',
    },
    tecnologia: {
      titulo: 'Tecnología',
      texto: [
        'Sistemas ADAS que garantizan una conducción segura para todos los pasajeros del vehículo.',
        'Android Auto y Apple CarPlay inalámbricos, una pantalla multimedia de 14.6 pulgadas y una de instrumentos de 10.25 pulgadas para información de conducción y del vehículo.',
        'Tecnología de punta asegurada en la SUV más equipada del segmento.',
      ],
      imagen: '/img/fichas/new-h6-phev/tecnologia.webp',
    },
    galeria: ['/img/fichas/new-h6-phev/galeria-1.webp', '/img/fichas/new-h6-phev/galeria-2.webp'],
    interior: {
      titulo: 'NEW H6 PHEV',
      subtitulo: 'Diseñado para ofrecer una experiencia de conducción premium, con materiales de alta calidad, un diseño elegante y detalles sofisticados.',
      texto: [
        'Disfrute de un sistema de navegación intuitivo, asistentes de conducción avanzados y conectividad inteligente con Android Auto y Apple Carplay inalámbricos. Cada detalle ha sido pensado para garantizar comodidad, seguridad y practicidad para usted y su familia.',
      ],
      imagen: '/img/fichas/new-h6-phev/interior.webp',
    },
    exterior: {
      titulo: 'EXTERIOR AGRESIVO Y MODERNO',
      subtitulo: 'Una nueva era de innovación ha llegado. HAVAL NEW H6 PHEV, el híbrido enchufable más sofisticado y tecnológico del mercado, se renueva para adaptarse a las nuevas tendencias',
      texto: [],
      imagen: '/img/fichas/new-h6-phev/exterior.webp',
    },
    fichaTecnica: '/fichas/new-h6-phev.pdf',
  },
  'h6-gt-phev': {
    titular: [
      'Una SUV deportiva de lujo y muy ecológica gracias a su sistema híbrido enchufable para más autonomía únicamente en modo eléctrico.',
    ],
    bajada: 'Disfruta de una movilidad de lujo con el SUV H6 GT PHEV',
    portada: {
      escritorio: '/img/fichas/h6-gt-phev/portada.webp',
      movil: '/img/fichas/h6-gt-phev/portada-m.webp',
    },
    versiones: [
      {
        nombre: 'H6 GT PHEV 2026',
        precio: 39990,
        especificaciones: [
          ['Motor', '1.5 Turbo + 2 motores eléctricos'],
          ['Transmisión', 'Automática'],
          ['Potencia combinada', '430 HP'],
          ['Autonomía', 'hasta 170 km en modo eléctrico'],
        ],
      },
    ],
    diseno: {
      titulo: 'Diseño',
      texto: [
        'Descubrí el cautivador diseño de la Haval H6 GT PHEV',
        'Un SUV grande que enamora con detalles deportivos, además de una apariencia dinámica y juvenil sin perder la elegancia.',
      ],
      imagen: '/img/fichas/h6-gt-phev/diseno.webp',
    },
    tecnologia: {
      titulo: 'Tecnología',
      texto: [
        'Conecta tu mundo al HAVAL H6 GT con Apple CarPlay y Android Auto en su pantalla Touch.',
        'Accede a tus aplicaciones favoritas de forma intuitiva para un viaje más conectado y placentero.',
        'Disfruta de la plataforma tecnológica modular del SUV H6 GT: flexible, potente, segura y ligera.',
      ],
      imagen: '/img/fichas/h6-gt-phev/tecnologia.webp',
    },
    galeria: ['/img/fichas/h6-gt-phev/galeria-1.webp'],
    interior: {
      titulo: 'H6 GT PHEV',
      subtitulo: 'UN SUV DEPORTIVO CÓMODO Y AMPLIO QUE ENRIQUECE LA EXPERIENCIA DEL VIAJE',
      texto: [
        'Explorá el interior de Haval H6 GT PHEV, amplio y lujoso, con espacio para cinco adultos.',
        'Materiales de alta calidad y equipamiento tecnológico avanzado elevan el viaje en este SUV grande a nuevos niveles de comodidad y sofisticación.',
      ],
      imagen: '/img/fichas/h6-gt-phev/interior.webp',
    },
    exterior: {
      titulo: 'HAVAL H6 GT PHEV',
      subtitulo: 'EL SUV QUE CONJUGA ELEGANCIA, DEPORTIVIDAD Y POTENCIA EN CADA LÍNEA',
      texto: [
        'La Haval H6 GT PHEV luce un diseño cautivador. Una SUV grande que enamora con detalles deportivos, además de una apariencia dinámica y juvenil.',
      ],
      imagen: '/img/fichas/h6-gt-phev/exterior.webp',
    },
    fichaTecnica: '/fichas/h6-gt-phev.pdf',
  },
  'h7-phev': {
    titular: ['LA AVENTURA DESDE UNA SUV HÍBRIDA ENCHUFABLE'],
    bajada: 'El punto de inflexión entre diseño y tecnología para un mundo mejor.',
    portada: {
      escritorio: '/img/fichas/h7-phev/portada.webp',
      movil: '/img/fichas/h7-phev/portada-m.webp',
    },
    versiones: [
      {
        nombre: 'H7 PHEV 4x2',
        precio: 35990,
        especificaciones: [
          ['Motor', 'Híbrido enchufable (1.5 Turbo + eléctrico)'],
          ['Transmisión', 'Automática'],
          ['Potencia', '322 HP / 540 Nm'],
        ],
      },
    ],
    diseno: {
      titulo: 'Diseño',
      texto: [
        'La nueva H7 PHEV cuida al máximo las líneas de diseño, tanto en interior como exterior.',
        'Además, el foco siempre puesto en la experiencia del usuario, desde la comodidad y el confort hasta la máxima seguridad para todos los pasajeros.',
      ],
      imagen: '/img/fichas/h7-phev/diseno.webp',
    },
    tecnologia: {
      titulo: 'Tecnología',
      texto: [
        'El HAVAL H7 PHEV cuenta con tecnología tanto en exterior como en interior.',
        'Equipado con una pantalla táctil de 15.6” compatible con Android Auto y Apple Car Play.',
        'Ajustes de asientos en 6 posiciones, 8 altavoces, 4 modos de conducción.',
      ],
      imagen: '/img/fichas/h7-phev/tecnologia.webp',
    },
    interior: {
      titulo: 'H7 PHEV',
      subtitulo: 'SUV GRANDE, DISEÑO INTERIOR ELEGANTE, CONFORT INIGUALABLE',
      texto: [
        'El interior de la Haval H7 PHEV destaca por su nivel de tecnología y terminaciones. Incorpora una central multimedia con pantalla táctil a color de 15,0” compatible de forma inalámbrica con Apple CarPlay y Android Auto, tablero digital de 12,3” y sistema Head-Up Display (W-HUD) proyectado en el parabrisas. Además, suma cargador inalámbrico de 50W, sistema de audio prémium con hasta 10 altavoces y subwoofer, techo solar panorámico y asientos de cuero eléctricos con ventilación.',
      ],
      imagen: '/img/fichas/h7-phev/interior.webp',
    },
    exterior: {
      titulo: 'CONOCE LA ROBUSTEZ DE LA HAVAL H7 PHEV',
      subtitulo: 'ENAMÓRATE A PRIMERA VISTA',
      texto: [
        'Diseñada para proteger a todos los ocupantes, viene equipada con 6 airbags, frenado autónomo de emergencia (AEB) y un completo paquete de asistencias avanzadas a la conducción (ADAS). Incluye control de crucero adaptativo, mantenimiento y centrado de carril, detector de punto ciego y alerta de tráfico cruzado. Para estacionar y maniobrar con facilidad, dispone de cámara 360° con vista transparente del chasis y sensores delanteros y traseros',
      ],
      imagen: '/img/fichas/h7-phev/exterior.webp',
    },
    fichaTecnica: '/fichas/h7-phev.pdf',
  },
  'h9-diesel-24': {
    titular: ['HAVAL H9 DIESEL: La SUV 3 hileras lista para cualquier aventura'],
    bajada: 'Sé parte de la nueva era, conducí una Haval H9 DIESEL',
    portada: {
      escritorio: '/img/fichas/h9-diesel-24/portada.webp',
      movil: '/img/fichas/h9-diesel-24/portada-m.webp',
    },
    versiones: [
      {
        nombre: 'H9 Diesel 4x4',
        precio: 42990,
        especificaciones: [['Motor', '2.4 Turbodiesel 4x4'], ['Transmisión', '9AT'], ['Potencia', '184 HP / 480 Nm de torque']],
      },
    ],
    diseno: {
      titulo: 'Diseño',
      texto: [
        'Experimentá nuevas sensaciones con la nueva HAVAL H9 DIESEL.',
        'Un SUV poderoso que te hará sentir único.',
        'Apto para cualquier terreno.',
      ],
      imagen: '/img/fichas/h9-diesel-24/diseno.webp',
    },
    tecnologia: {
      titulo: 'Tecnología',
      texto: [
        'El GWM HAVAL H9 2.4 Diesel está equipado con la mayor tecnología para brindarte toda la experiencia',
        'Además, cuenta con una pantalla táctil de 14.6" compatible con Android Auto y Apple Car Play, proporcionando una conectividad y entretenimiento sin igual.',
      ],
      imagen: '/img/fichas/h9-diesel-24/tecnologia.webp',
    },
    galeria: [
      '/img/fichas/h9-diesel-24/galeria-1.webp',
      '/img/fichas/h9-diesel-24/galeria-2.webp',
      '/img/fichas/h9-diesel-24/galeria-3.webp',
      '/img/fichas/h9-diesel-24/galeria-4.webp',
    ],
    interior: {
      titulo: 'H9 DIESEL 2.4',
      subtitulo: 'INTERIOR DE LUJO SIN PERDER LA COMODIDAD',
      texto: [
        'Descubre la nueva Haval H9: una SUV robusta y sofisticada con capacidad para 7 pasajeros, ideal para familias que buscan comodidad sin renunciar a la emoción. Equipado con tecnología de alta seguridad y un diseño off-road, está listo para llevarte más lejos, en cualquier terreno y con total confianza.',
      ],
      imagen: '/img/fichas/h9-diesel-24/interior.webp',
    },
    exterior: {
      titulo: 'DISEÑO DISCRETO CON TODO EL PODER DE UNA 4X4',
      subtitulo: 'Y DESCUBRE UN SUV 3 HILERAS CON ESTILO Y TECNOLOGÍA EN CADA KILÓMETRO',
      texto: ['El exterior agresivo de una SUV 4x4 con todo el poder de un motor turbodiesel 2.4 para cualquier aventura'],
      imagen: '/img/fichas/h9-diesel-24/exterior.webp',
    },
    fichaTecnica: '/fichas/h9-diesel-24.pdf',
  },
  'ora-03-skin': {
    provisoria: true,
    titular: ['Redefiniendo el estilo'],
    bajada: 'El ORA 03 es un eléctrico con un encanto distintivo.',
    portada: {
      escritorio: '/img/fichas/ora-03-skin/portada.webp',
      movil: '/img/fichas/ora-03-skin/portada-m.webp',
    },
    diseno: {
      titulo: 'Diseño',
      texto: [
        'Experimentá la fusión perfecta entre la innovación del futuro y la elegancia atemporal con el ORA 03, un auto eléctrico con un encanto distintivo.',
        'ORA 03 cuenta con espejos laterales abatibles eléctricamente y luces LED con encendido automático.',
        'Cuenta con techo solar panorámico y un sorprendente diseño retro-futurista.',
        'Consultar equipamiento según versión.',
      ],
      imagen: '/img/fichas/ora-03-skin/diseno.webp',
    },
    tecnologia: {
      titulo: 'Tecnología',
      texto: [
        'ORA 03 cuenta con una propuesta de tecnología completa que mejorarán tu experiencia en cada viaje. Según la versión, cuenta con cargador inalámbrico, para teléfono celular, sistema de estacionamiento asistido y cámara 360° son algunas de las tecnologías avanzadas que el ORA 03 te ofrece.',
      ],
      imagen: '/img/fichas/ora-03-skin/tecnologia.webp',
    },
    galeria: [
      '/img/fichas/ora-03-skin/galeria-1.webp',
      '/img/fichas/ora-03-skin/galeria-2.webp',
      '/img/fichas/ora-03-skin/galeria-3.webp',
      '/img/fichas/ora-03-skin/galeria-4.webp',
      '/img/fichas/ora-03-skin/galeria-5.webp',
    ],
    galeriaProporcion: '16 / 9',
    interior: {
      titulo: 'ORA 03',
      subtitulo: 'Retro-futurista, con tecnología y confort',
      texto: [
        'El interior del ORA 03 combina un diseño retro-futurista con tecnología y confort en todas sus versiones, ofreciendo dos pantallas digitales de 10,25”, conectividad inalámbrica, volante multifunción en cuero, cámara 360°, múltiples airbags, acabados de calidad y un amplio espacio trasero. En la versión SR y GT, además, se destacan los asientos delanteros eléctricos con calefacción, ventilación y función de masaje y techo panorámico, que elevan aún más la experiencia de confort.',
      ],
      imagen: '/img/fichas/ora-03-skin/interior.webp',
    },
  },
  'ora-5-ev': {
    provisoria: true,
    titular: ['El SUV 100% eléctrico para las familias de hoy'],
    bajada: 'Descubrí el nuevo GWM ORA 5.',
    portada: {
      escritorio: '/img/fichas/ora-5-ev/portada.webp',
      movil: '/img/fichas/ora-5-ev/portada-m.webp',
    },
    diseno: {
      titulo: 'Diseño',
      texto: [
        'El ORA 5 destaca por su diseño inspirado en la naturaleza, premiado en los London Design Awards. En su interior, ofrece una experiencia digital completa con un tablero de instrumentos de 10.25 pulgadas y una pantalla multimedia central de 14.6 pulgadas, con conectividad inalámbrica para smartphones.',
      ],
      imagen: '/img/fichas/ora-5-ev/diseno.webp',
    },
    tecnologia: {
      titulo: 'Seguridad',
      texto: [
        'Equipado para garantizar una conducción tranquila. El ORA 5 incluye 6 airbags y +20 asistencias avanzadas a la conducción (ADAS). Cuenta con cámara de visión periférica 360°, control de crucero adaptativo (ACC), frenado autónomo de emergencia, detector de punto ciego y alerta de colisión frontal, entre otros.',
      ],
      imagen: '/img/fichas/ora-5-ev/tecnologia.webp',
    },
    galeria: [
      '/img/fichas/ora-5-ev/galeria-1.webp',
      '/img/fichas/ora-5-ev/galeria-2.webp',
      '/img/fichas/ora-5-ev/galeria-3.webp',
      '/img/fichas/ora-5-ev/galeria-4.webp',
      '/img/fichas/ora-5-ev/galeria-5.webp',
      '/img/fichas/ora-5-ev/galeria-6.webp',
    ],
    galeriaProporcion: '16 / 9',
    interior: {
      titulo: 'ORA 5',
      subtitulo: 'Más kilómetros, más espacio',
      texto: [
        'Viajá sin preocupaciones con una autonomía de hasta 520 km (NEDC) y carga rápida en solo 20 minutos. Cuenta con un baúl de 422L y 1120L con asientos rebatidos, rueda de repuesto y asientos rebatibles que amplían la capacidad para adaptarse a cada viaje.',
      ],
      imagen: '/img/fichas/ora-5-ev/interior.webp',
    },
  },
  'ora-5-hev': {
    provisoria: true,
    titular: ['ORA 5 HEV'],
    bajada: 'La versión híbrida del SUV urbano de ORA.',
    portada: {
      escritorio: '/img/fichas/ora-5-ev/portada.webp',
      movil: '/img/fichas/ora-5-ev/portada-m.webp',
    },
    aviso: 'Estamos preparando la ficha completa de este modelo. Escribinos por WhatsApp y te pasamos toda la información.',
  },
  'poer-diesel': {
    titular: ['NUEVA POER DIESEL 4X4'],
    bajada: 'CON MÁS PODER PARA DOMINAR CUALQUIER TERRENO',
    portada: {
      escritorio: '/img/fichas/poer-diesel/portada.webp',
      movil: '/img/fichas/poer-diesel/portada-m.webp',
    },
    versiones: [
      {
        nombre: 'POER 2.0T',
        precio: 29990,
        especificaciones: [['Motor', 'Diesel 2.0 Turbo'], ['Transmisión', 'Automática'], ['Potencia', '161 HP | 400 Nm']],
      },
      {
        nombre: 'POER PLUS 2.4T',
        precio: 35990,
        especificaciones: [['Motor', 'Diesel 2.4 Turbodiesel'], ['Transmisión', 'Automática'], ['Potencia', '181 HP | 480 Nm']],
      },
    ],
    diseno: {
      titulo: 'Diseño',
      texto: [
        'Conocé todo lo que la funcionalidad y el estilo combinados pueden ofrecerte con armonía entre la estética e ingeniería que te ofrece la POER PLUS',
      ],
      imagen: '/img/fichas/poer-diesel/diseno.webp',
    },
    tecnologia: {
      titulo: 'Tecnología',
      texto: [
        'Con el panel de instrumentos de 7”, toda la información a bordo necesaria y clave para una conducción sencilla',
      ],
      imagen: '/img/fichas/poer-diesel/tecnologia.webp',
    },
    galeria: [
      '/img/fichas/poer-diesel/galeria-1.webp',
      '/img/fichas/poer-diesel/galeria-2.webp',
      '/img/fichas/poer-diesel/galeria-3.webp',
      '/img/fichas/poer-diesel/galeria-4.webp',
      '/img/fichas/poer-diesel/galeria-5.webp',
      '/img/fichas/poer-diesel/galeria-6.webp',
      '/img/fichas/poer-diesel/galeria-7.webp',
      '/img/fichas/poer-diesel/galeria-8.webp',
      '/img/fichas/poer-diesel/galeria-9.webp',
    ],
    interior: {
      titulo: 'POER DIESEL 4x4',
      subtitulo: 'UNA CAMIONETA QUE TE ACOMPAÑA CON TODAS LAS COMODIDADES Y DISEÑO DE LUJO.',
      texto: [
        'Tapiz de eco cuero con amplio espacio interior, detalles meticulosos, acabados elegantes, todos los comandos para facilitar la integración con la conducción, Conectividad con Apple CarPlay y Android Auto, la POER DIESEL se integra con tu dispositivo a través de la pantalla multimedia de 12.3”',
      ],
      imagen: '/img/fichas/poer-diesel/interior.webp',
    },
    exterior: {
      titulo: 'DESTACANDO EL DISEÑO EXTERIOR AGRESIVO Y A LA VEZ SUTIL DE LA POER DIESEL',
      subtitulo: 'EL PODER DE LA POER DIESEL TENIA QUE VERSE ASÍ DE BIEN',
      texto: [
        'Con un diseño agresivo, llantas de Aluminio, capacidad de Carga de 1050Kg, con escalera en la parte trasera para facilitar la carga de la carrocería',
      ],
      imagen: '/img/fichas/poer-diesel/exterior.webp',
    },
    fichaTecnica: '/fichas/poer-diesel.pdf',
  },
  'poer-p500': {
    titular: ['NUEVA POER P500 PHEV'],
    bajada: 'LA PICKUP HÍBRIDA ENCHUFABLE 4X4 DE GWM',
    portada: {
      escritorio: '/img/fichas/poer-p500/portada.webp',
      movil: '/img/fichas/poer-p500/portada-m.webp',
    },
    versiones: [
      {
        nombre: 'POER P500 PHEV 4X4 HIGH',
        precio: 44990,
        especificaciones: ['4x4 2.0 Híbrida enchufable'],
      },
    ],
    diseno: {
      titulo: 'Diseño agresivo y destacado',
      texto: [
        'Creado meticulosamente para entregar gran estilo, funcionalidad y potencia, ofreciendo un rendimiento, versatilidad y capacidad para todos los desafíos imaginables',
      ],
      imagen: '/img/fichas/poer-p500/diseno.webp',
    },
    tecnologia: {
      titulo: 'Potencia eficiente, energía inteligente',
      texto: [
        'La Tecnología Hi4-T Combina de manera eficiente un motor de combustión y uno eléctrico en modo paralelo, lo que permite un aporte constante y equilibrado de potencia, optimizando el rendimiento, suavizando la conducción y reduciendo el consumo de combustible',
      ],
      imagen: '/img/fichas/poer-p500/tecnologia.webp',
    },
    galeria: [
      '/img/fichas/poer-p500/galeria-1.webp',
      '/img/fichas/poer-p500/galeria-2.webp',
      '/img/fichas/poer-p500/galeria-3.webp',
      '/img/fichas/poer-p500/galeria-4.webp',
      '/img/fichas/poer-p500/galeria-5.webp',
    ],
    interior: {
      titulo: 'POER P500',
      subtitulo: 'DETALLES QUE TRANSFORMAN CADA VIAJE EN UNA EXPERIENCIA ÚNICA',
      texto: [
        'Control total al alcance de tus dedos con la gran pantalla táctil que integra navegación, Apple CarPlay y Android Auto para que siempre estés conectado y entretenido. Disfruta cada viaje con asientos delanteros que se ajustan eléctricamente, con calefacción, ventilación y masaje para un confort inigualable. Diseñado para el máximo confort, ideal para que tú y tus acompañantes viajen con total comodidad en cada aventura.',
      ],
      imagen: '/img/fichas/poer-p500/interior.webp',
    },
    exterior: {
      titulo: 'LA NUEVA POER P500 PHEV CON TECNOLOGÍA HI4-T',
      subtitulo: 'con un motor más poderoso y nueva energía, diseñada para dominar cualquier terreno y superar todo desafío',
      texto: [
        'Con tracción 4x4 avanzada, alta capacidad de carga y tecnología de última generación, está diseñada para superar todo desafío con robustez y precisión.',
      ],
      imagen: '/img/fichas/poer-p500/exterior.webp',
    },
    fichaTecnica: '/fichas/poer-p500.pdf',
  },
  'tank-300-phev-4x4': {
    titular: ['UNA SUV TODOTERRENO IMPARABLE', 'AHORA TAMBIÉN HÍBRIDA ENCHUFABLE'],
    bajada: 'La Tank 300 4X4 Híbrida enchufable es la descripción perfecta de poder y capacidad para llegar a donde quieras.',
    portada: {
      escritorio: '/img/fichas/tank-300-phev-4x4/portada.webp',
      movil: '/img/fichas/tank-300-phev-4x4/portada-m.webp',
    },
    versiones: [
      {
        nombre: '4x4 Híbrida enchufable',
        precio: 39990,
        descripcion: 'Experimentá el lujo de la Tank 300 4X4 Híbrida enchufable, con una autonomía eléctrica de más de 100 Kilómetros, donde el diseño ergonómico se une a las innovaciones de última generación. Viví la máxima comodidad para conductor y pasajeros, en un espacio que respira estilo y tecnología de vanguardia.',
      },
    ],
    diseno: {
      titulo: 'Diseño',
      texto: [
        'Experimentá el lujo de la Tank 300 4X4 Híbrida, donde el diseño ergonómico se une a las innovaciones de última generación.',
        'Viví la máxima comodidad para conductor y pasajeros, en un espacio que respira estilo y tecnología de vanguardia.',
      ],
      imagen: '/img/fichas/tank-300-phev-4x4/diseno.webp',
    },
    tecnologia: {
      titulo: 'Tecnología',
      texto: [
        'Desempeño Off-Road:',
        'El GWM Tank 300 PHEV es un verdadero vehículo off-road, gracias a su chasis reforzado y bloqueo de diferencial, preparado para enfrentar terrenos extremos.',
        'Su plataforma todoterreno con capacidades 4x4, incluyendo bloqueo de diferencial delantero y trasero, asegura una tracción superior y estabilidad en las condiciones más desafiantes.',
        'Este diseño robusto y técnico lo convierte en la elección ideal para los amantes de la aventura que no quieren sacrificar el lujo ni la comodidad',
      ],
      imagen: '/img/fichas/tank-300-phev-4x4/tecnologia.webp',
    },
    galeria: ['/img/fichas/tank-300-phev-4x4/galeria-1.webp'],
    interior: {
      titulo: 'TANK 300 PHEV 4X4',
      subtitulo: 'Un SUV premium y todo terreno',
      texto: [
        'El GWM Tank 300 PHEV ofrece un interior premium, diseñado para maximizar el confort y la tecnología.',
        'Con asientos de cuero que incorporan calefacción, ventilación y función de masaje, el vehículo asegura una experiencia de conducción lujosa.',
        'El techo panorámico y el sistema de reducción de ruido NVH garantizan un ambiente silencioso y placentero en todos los viajes.',
      ],
      imagen: '/img/fichas/tank-300-phev-4x4/interior.webp',
    },
    exterior: {
      titulo: 'TANK 300',
      subtitulo: 'LUJO Y TECNOLOGÍA EN UN INTERIOR MODERNO PARA UNA EXPERIENCIA DE MANEJO INCREÍBLE',
      texto: [
        'El diseño exterior de la GWM Tank 300 PHEV es robusto y elegante, ideal tanto para la ciudad como para la naturaleza.',
        'Destaca su parrilla frontal innovadora, faros LED automáticos y rines de aluminio de 18 pulgadas con cubiertas AT listas para cualquier desafío, que añaden un toque de sofisticación y funcionalidad.',
      ],
      imagen: '/img/fichas/tank-300-phev-4x4/exterior.webp',
    },
    fichaTecnica: '/fichas/tank-300-phev-4x4.pdf',
  },
  'tank-400-phev-4x4': {
    titular: ['POTENTE Y ELEGANTE'],
    bajada: 'La Tank 400 4x4 PHEV es el equilibrio perfecto entre poder y elegancia',
    portada: {
      escritorio: '/img/fichas/tank-400-phev-4x4/portada.webp',
      movil: '/img/fichas/tank-400-phev-4x4/portada-m.webp',
    },
    versiones: [
      {
        nombre: '4x4 Híbrida enchufable',
        precio: 50990,
        descripcion: 'Prepárate para conocer el equilibrio perfecto entre Potencia y elegancia con la Tank 400 4X4 Híbrida Enchufable, con lo mejor de dos mundos para una mejor experiencia',
      },
    ],
    diseno: {
      titulo: 'Diseño',
      texto: [
        'La conjunción entre agresiva y lujosa se refleja en los detalles de la Tank 400 4x4 Híbrida Enchufable',
        'La comodidad es máxima para conductor y pasajeros, en un espacio imponente y de máximo confort',
      ],
      imagen: '/img/fichas/tank-400-phev-4x4/diseno.webp',
    },
    tecnologia: {
      titulo: 'Tecnología',
      texto: [
        'El Tank 400 PHEV destaca por toda la tecnología de vanguardia. Con el sistema ADAS de conducción asistida, y gracias a su tecnología de híbrido enchufable que te da una autonomía en eléctrico de hasta 107 km.',
        'Con una pantalla de 16,2 pulgadas, para disfrutar al máximo y con una de instrumentos de información de 12,3 pulgadas',
      ],
      imagen: '/img/fichas/tank-400-phev-4x4/tecnologia.webp',
    },
    galeria: [
      '/img/fichas/tank-400-phev-4x4/galeria-1.webp',
      '/img/fichas/tank-400-phev-4x4/galeria-2.webp',
      '/img/fichas/tank-400-phev-4x4/galeria-3.webp',
      '/img/fichas/tank-400-phev-4x4/galeria-4.webp',
      '/img/fichas/tank-400-phev-4x4/galeria-5.webp',
      '/img/fichas/tank-400-phev-4x4/galeria-6.webp',
      '/img/fichas/tank-400-phev-4x4/galeria-7.webp',
      '/img/fichas/tank-400-phev-4x4/galeria-8.webp',
      '/img/fichas/tank-400-phev-4x4/galeria-9.webp',
      '/img/fichas/tank-400-phev-4x4/galeria-10.webp',
    ],
    interior: {
      titulo: 'TANK 400 PHEV 4X4',
      subtitulo: 'Ofrece el Interior premium perfecto para conductor y pasajeros y generar una experiencia',
      texto: [
        'Con Asientos de Cuero, calefactor en los asientos delanteros para un mayor confort y masajeador al conductor para una experiencia de mayor satisfacción.',
      ],
      imagen: '/img/fichas/tank-400-phev-4x4/interior.webp',
    },
    exterior: {
      titulo: 'TANK 400 PHEV 4X4',
      subtitulo: 'LUJO Y TECNOLOGÍA EN UN INTERIOR MODERNO PARA UNA EXPERIENCIA DE MANEJO INCREÍBLE',
      texto: [
        'El diseño exterior del GWM Tank 400 PHEV es robusto y elegante, ideal tanto para la ciudad como para la naturaleza.',
        'Destaca su parrilla frontal innovadora, faros LED automáticos y rines de aluminio de 18 pulgadas, que añaden un toque de sofisticación y funcionalidad.',
      ],
      imagen: '/img/fichas/tank-400-phev-4x4/exterior.webp',
    },
    fichaTecnica: '/fichas/tank-400-phev-4x4.pdf',
  },
  'tank-500-hev-4x4': {
    titular: ['EL LUJO Y LA POTENCIA'],
    bajada: 'La Tank 500 4x4 Híbrida es la potencia expresada en una SUV de máximo lujo',
    portada: {
      escritorio: '/img/fichas/tank-500-hev-4x4/portada.webp',
      movil: '/img/fichas/tank-500-hev-4x4/portada-m.webp',
    },
    versiones: [
      {
        nombre: '4x4 Híbrida',
        precio: 49990,
        descripcion: 'Descubre el SUV de lujo Tank 500, donde la aventura se une a innovaciones de última generación y el lujo. El SUV de 3 hileras que destaca por su elegancia y modernidad.',
      },
    ],
    diseno: {
      titulo: 'Diseño',
      texto: [
        'La máxima elegancia en un auto de Lujo con una potencia que capaz de superar cualquier desafío.',
        'Inspirada en el diseño de un Palacio de arquitectura China, Representa un Palacio en movimiento, máxima comodidad con una cara imponente.',
      ],
      imagen: '/img/fichas/tank-500-hev-4x4/diseno.webp',
    },
    tecnologia: {
      titulo: 'Tecnología',
      texto: [
        'El Tank 500 Híbrido cuenta con toda la tecnología de vanguardia. Con el sistema ADAS de conducción asistida, y toda la potencia necesaria para un mejor desempeño en cualquier situación.',
        'Con una pantalla de 14,6 pulgadas, para disfrutar al máximo y facilitar la conducción confortable.',
      ],
      imagen: '/img/fichas/tank-500-hev-4x4/tecnologia.webp',
    },
    galeria: [
      '/img/fichas/tank-500-hev-4x4/galeria-1.webp',
      '/img/fichas/tank-500-hev-4x4/galeria-2.webp',
      '/img/fichas/tank-500-hev-4x4/galeria-3.webp',
      '/img/fichas/tank-500-hev-4x4/galeria-4.webp',
      '/img/fichas/tank-500-hev-4x4/galeria-5.webp',
      '/img/fichas/tank-500-hev-4x4/galeria-6.webp',
      '/img/fichas/tank-500-hev-4x4/galeria-7.webp',
      '/img/fichas/tank-500-hev-4x4/galeria-8.webp',
      '/img/fichas/tank-500-hev-4x4/galeria-9.webp',
    ],
    interior: {
      titulo: 'TANK 500 HEV 4x4',
      subtitulo: 'Cuenta con toda la tecnología de vanguardia',
      texto: [
        'Con el sistema ADAS de conducción asistida, y toda la potencia necesaria para un mejor desempeño en cualquier situación.',
        'Con una pantalla de 14,6 pulgadas, para disfrutar al máximo y facilitar la conducción confortable.',
      ],
      imagen: '/img/fichas/tank-500-hev-4x4/interior.webp',
    },
    exterior: {
      titulo: 'TANK 500',
      subtitulo: 'LUJO Y TECNOLOGÍA EN UN INTERIOR MODERNO PARA UNA EXPERIENCIA DE MANEJO INCREÍBLE',
      texto: [
        'El diseño exterior del GWM Tank 500 HEV es robusto y elegante, ideal tanto para la ciudad como para la naturaleza.',
        'Destaca su parrilla frontal innovadora, faros LED automáticos y rines de aluminio de 18 pulgadas, que añaden un toque de sofisticación y funcionalidad.',
      ],
      imagen: '/img/fichas/tank-500-hev-4x4/exterior.webp',
    },
    fichaTecnica: '/fichas/tank-500-hev-4x4.pdf',
  },
  'tank-700-phev-4x4': {
    titular: ['EL MÁXIMO LUJO OFF ROAD'],
    bajada: 'Tank 700 4x4 PHEV, la máxima expresión de lujo y poder de GWM',
    portada: {
      escritorio: '/img/fichas/tank-700-phev-4x4/portada.webp',
      movil: '/img/fichas/tank-700-phev-4x4/portada-m.webp',
    },
    versiones: [
      {
        nombre: 'Tank 700 PHEV 4X4',
        precio: 74990,
        especificaciones: ['Híbrida enchufable', '517 HP / 800 Nm', 'Motor V6 3.0 L + motor eléctrico', '9AT 4WD'],
      },
    ],
    interior: {
      titulo: 'TANK 700 PHEV 4X4',
      subtitulo: 'CUIDANDO HASTA EL ÚLTIMO DETALLE DEL INTERIOR PARA UNA EXPERIENCIA DE LUJO COMPLETA',
      texto: [
        'Los detalles más cuidados para que la experiencia no sea solo en lo que se ve, sino en lo que se siente, la máxima seguridad para todos con detalles de cuero, alcantara y acabados exclusivos',
      ],
      imagen: '/img/fichas/tank-700-phev-4x4/interior.webp',
    },
    exterior: {
      titulo: 'TANK 700 PHEV 4X4',
      subtitulo: 'IMPONENTE Y ROBUSTA DESDE DONDE SE LA MIRE',
      texto: [
        'Con los detalles cuidados al más fino detalle, y completando la línea de diseño, el Tank 700 PHEV 4x4 habla desde sus expresiones para dejar en claro que ningun terreno es imposible para el',
      ],
      imagen: '/img/fichas/tank-700-phev-4x4/exterior.webp',
    },
    fichaTecnica: '/fichas/tank-700-phev-4x4.pdf',
  },
};
