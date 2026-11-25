/**
 * El relato del inicio: el texto principal y las secciones de fotos (Secciones.astro).
 * Cuenta el lugar en tres partes, con las fotos de cámara de los exteriores (noviembre de 2026).
 * Solo fotos tomadas en vertical: las cajas de las composiciones son verticales, y una horizontal
 * pierde casi la mitad de su ancho (queda un pedazo que no se entiende).
 * Misky Wayra, donde empezó todo (trío) → Sumaq Mayu, la que vino después (cinco, con su nombre
 * como titular en escalera) → el parque y los cerros (cruz, con el texto de cierre).
 * Textos de la familia (noviembre de 2026).
 */
import miskyAzulejos from '../assets/home/relato/misky-azulejos-2x3.jpg';
import miskyParrilla from '../assets/home/relato/misky-parrilla-2x3.jpg';
import miskyAzulejosEntera from '../assets/cabanas/misky-wayra/misky-azulejos.jpg';
import miskyParrillaEntera from '../assets/cabanas/misky-wayra/misky-parrilla.jpg';
import miskyJazmin from '../assets/home/relato/misky-jazmin.jpg';
// Sumaq: las fotos que mejor muestran su tamaño y sus formas
import sumacAlero from '../assets/cabanas/sumac-mayu/sumac_frente_01.jpg';
import sumacFlores from '../assets/cabanas/sumac-mayu/sumac-flores.jpg';
import sumacDesdeLaPileta from '../assets/cabanas/sumac-mayu/pileta_04.jpg';
import sumacEntreArboles from '../assets/galeria/jardin_09.jpg';
import sumacPileta from '../assets/galeria/pileta_02.jpg';
// El parque: su amplitud, el cerro y sus colores
import parqueUritorco from '../assets/galeria/jardin_11.jpg';
import parqueSendero from '../assets/galeria/jardin_12.jpg';
import parqueLilas from '../assets/galeria/jardin_06.jpg';
import parqueAlgarrobos from '../assets/home/relato/parque-algarrobos.jpg';

export const principal = {
  frase:
    'Desde lo profundo del Valle de Punilla, los invitamos a descubrir nuestro pequeño proyecto: Misky Wayra y Sumaq Mayu, dos eco\u2011cabañas pensadas para conectar con la naturaleza en las sierras cordobesas.',
  texto:
    'Todo comienza con un simple designio: escapar de la caótica ciudad y empezar una nueva vida en la montaña. Menos ostentosa, quizás, pero más plena en lo que verdaderamente importa.',
};

export const paradas = [
  {
    // Trío: izquierda, centro (la más alta) y derecha
    titulo: 'Misky Wayra',
    disposicion: 'trio',
    fotos: [
      {
        src: miskyAzulejos,
        completa: miskyAzulejosEntera,
        alt: 'La galería de Misky Wayra: la pared de azulejos y la mesa de campo, bajo la rama de un algarrobo',
        encuadre: '50% 50%',
      },
      {
        src: miskyParrilla,
        completa: miskyParrillaEntera,
        alt: 'La galería curva de Misky Wayra con la mesa de campo, frente al parque',
        encuadre: '50% 50%',
      },
      {
        src: miskyJazmin,
        alt: 'La galería de Misky Wayra con la mesa de madera, enmarcada por un jazmín en flor',
        encuadre: '50% 50%',
      },
    ],
  },
  {
    // Cinco: tres arriba y dos abajo; el nombre de la casa como titular en escalera
    titulo: 'Conocenos',
    disposicion: 'cinco',
    titular: 'escalera',
    piezas: ['Cono', 'ce', 'nos'],
    nota: {
      estilo: 'centrada' as const,
      titulo: 'Construir con adobe es, en cierto sentido, construir con el propio paisaje',
      subtitulo:
        'Ambas casas están hechas de adobe, retomando una tradición arquitectónica precolombina. Esta técnica tiene excelentes propiedades térmicas, logrando que las cabañas sean frescas en verano y cálidas durante el invierno. A la hora de levantar los cimientos de Sumaq Mayu, decidimos utilizar neumáticos para darle una base firme y sólida.',
    },
    fotos: [
      {
        src: sumacAlero,
        alt: 'Los aleros ondulados de Sumaq Mayu sobre la base de piedra, con el sendero que la rodea',
        encuadre: '50% 50%',
      },
      {
        src: sumacFlores,
        alt: 'Sumaq Mayu entera detrás de un colchón de flores amarillas',
        encuadre: '50% 50%',
      },
      {
        src: sumacDesdeLaPileta,
        alt: 'El ventanal en arco de Sumaq Mayu visto desde el borde de la pileta, bajo el alero',
        encuadre: '50% 50%',
      },
      {
        src: sumacEntreArboles,
        alt: 'Sumaq Mayu entre los árboles del parque, con flores lilas en primer plano',
        encuadre: '50% 50%',
      },
      {
        src: sumacPileta,
        alt: 'La pileta con Sumaq Mayu detrás, un día de sol',
        encuadre: '50% 60%',
      },
    ],
  },
  {
    // Cruz: izquierda, centro arriba, centro abajo, derecha
    titulo: 'El parque',
    disposicion: 'cruz',
    nota: {
      estilo: 'final' as const,
      titulo: '3.000 metros cuadrados de parque para disfrutar y reconectar',
      subtitulo:
        'Las cabañas cuentan con un amplio parque, cuidadosamente mantenido. El espacio dispone de una pérgola, mesas al aire libre y un fogón, ideales para compartir un momento en familia o simplemente contemplar el paisaje.\n\nGracias a nuestra ubicación, muy cerca de la ladera de la montaña, las vistas hacia los cerros son excelentes. Además, el entorno nos permite estar en contacto con la fauna autóctona: zorros, liebres y cuis que, con un poco de suerte, pueden aparecer durante el día.',
    },
    fotos: [
      {
        src: parqueUritorco,
        alt: 'El Cerro Uritorco detrás de la pileta y su muro de piedra',
        encuadre: '50% 50%',
      },
      {
        src: parqueSendero,
        alt: 'Sendero de piedras entre el pasto y los canteros con flores, a la sombra de los árboles del parque',
        encuadre: '50% 50%',
      },
      {
        src: parqueLilas,
        alt: 'Flores lilas frente a la pileta, con las sierras al fondo',
        encuadre: '50% 55%',
      },
      {
        src: parqueAlgarrobos,
        alt: 'Los algarrobos del parque, con Misky Wayra a un lado y Sumaq Mayu al fondo',
        encuadre: '50% 50%',
      },
    ],
  },
];
