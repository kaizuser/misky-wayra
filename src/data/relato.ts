/**
 * El relato del inicio: el texto principal y las secciones de fotos (Secciones.astro).
 * Cuenta el lugar en tres partes, con las fotos de cámara de los exteriores (noviembre de 2026).
 * Solo fotos tomadas en vertical: las cajas de las composiciones son verticales, y una horizontal
 * pierde casi la mitad de su ancho (queda un pedazo que no se entiende).
 * Misky Wayra, donde empezó todo (trío) → Sumaq Mayu, la que vino después (cinco, con su nombre
 * como titular en escalera) → el parque y los cerros (cruz, con el texto de cierre).
 * Textos de la familia (noviembre de 2026).
 */
import miskyTunas from '../assets/home/relato/misky-tunas.jpg';
import miskyCostado from '../assets/home/relato/misky-costado.jpg';
import miskyJazmin from '../assets/home/relato/misky-jazmin.jpg';
import sumacCupula from '../assets/home/relato/sumac-cupula.jpg';
import sumacFollaje from '../assets/home/relato/sumac-follaje.jpg';
import sumacFrutas from '../assets/home/relato/sumac-frutas.jpg';
import sumacVentanal from '../assets/home/relato/sumac-ventanal.jpg';
import sumacCamino from '../assets/home/relato/sumac-camino.jpg';
import parqueSierras from '../assets/home/relato/parque-sierras.jpg';
import parqueFlores from '../assets/home/relato/parque-flores-naranjas.jpg';
import parqueAlgarrobos from '../assets/home/relato/parque-algarrobos.jpg';
import parquePileta from '../assets/home/relato/parque-pileta.jpg';

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
        src: miskyTunas,
        alt: 'El camino de ladrillo hacia Misky Wayra, entre dos grandes tunas',
        encuadre: '50% 50%',
      },
      {
        src: miskyCostado,
        alt: 'Misky Wayra de costado: la pared redonda de cal, el techo verde y un jazmín en flor',
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
        src: sumacCupula,
        alt: 'La cúpula de Sumaq Mayu sobre la entrada de atrás, con su alero de hierro',
        encuadre: '50% 50%',
      },
      {
        src: sumacFollaje,
        alt: 'El ventanal de Sumaq Mayu entre las ramas y las flores del jardín',
        encuadre: '50% 50%',
      },
      {
        src: sumacVentanal,
        alt: 'El gran ventanal de Sumaq Mayu con el jazmín trepando, sobre un cantero de flores',
        encuadre: '50% 50%',
      },
      {
        src: sumacFrutas,
        alt: 'Frutos verdes en una rama, con Sumaq Mayu y la pileta desenfocadas detrás',
        encuadre: '50% 50%',
      },
      {
        src: sumacCamino,
        alt: 'El camino de piedras por el pasto hacia Sumaq Mayu y la pileta',
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
        src: parquePileta,
        alt: 'La pileta con los escalones de piedra y la pérgola del deck al fondo',
        encuadre: '50% 55%',
      },
      {
        src: parqueSierras,
        alt: 'Las sierras detrás del monte, vistas desde el deck',
        encuadre: '50% 40%',
      },
      {
        src: parqueFlores,
        alt: 'Flores naranjas en primer plano, con el parque desenfocado detrás',
        encuadre: '50% 40%',
      },
      {
        src: parqueAlgarrobos,
        alt: 'Los algarrobos del parque, con Misky Wayra a un lado y Sumaq Mayu al fondo',
        encuadre: '50% 50%',
      },
    ],
  },
];
