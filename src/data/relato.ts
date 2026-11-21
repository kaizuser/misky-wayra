/**
 * El relato del inicio: el texto principal y las secciones de fotos (Secciones.astro).
 * Cuenta el lugar en tres partes, con las fotos de cámara de los exteriores (noviembre de 2026):
 * Misky Wayra, donde empezó todo (trío) → Sumac Mayu, la que vino después (cinco, con su nombre
 * como titular en escalera) → el parque y los cerros (cruz, con el texto de cierre).
 * Los textos siguen en lorem ipsum hasta que lleguen los de la familia.
 */
import miskyTunas from '../assets/home/relato/misky-tunas.jpg';
import miskyFrente from '../assets/home/relato/misky-frente.jpg';
import miskyJazmin from '../assets/home/relato/misky-jazmin.jpg';
import sumacCupula from '../assets/home/relato/sumac-cupula.jpg';
import sumacFollaje from '../assets/home/relato/sumac-follaje.jpg';
import sumacAlero from '../assets/home/relato/sumac-alero.jpg';
import sumacFrutas from '../assets/home/relato/sumac-frutas.jpg';
import sumacVentanal from '../assets/home/relato/sumac-ventanal.jpg';
import parqueCamino from '../assets/home/relato/parque-camino.jpg';
import parqueSierras from '../assets/home/relato/parque-sierras.jpg';
import parqueFlores from '../assets/home/relato/parque-flores.jpg';
import parquePileta from '../assets/home/relato/parque-pileta.jpg';

export const principal = {
  frase: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.',
  texto:
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
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
        src: miskyFrente,
        alt: 'Misky Wayra de frente: la casa redonda de techo verde, la pérgola de hierro y el camino de ladrillo',
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
    titulo: 'Sumac Mayu',
    disposicion: 'cinco',
    titular: 'escalera',
    nota: {
      estilo: 'centrada' as const,
      titulo: 'Lorem ipsum dolor sit amet, consectetur adipiscing.',
      subtitulo:
        'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
    },
    fotos: [
      {
        src: sumacCupula,
        alt: 'La cúpula de Sumac Mayu sobre la entrada de atrás, con su alero de hierro',
        encuadre: '50% 50%',
      },
      {
        src: sumacFollaje,
        alt: 'El ventanal de Sumac Mayu entre las ramas y las flores del jardín',
        encuadre: '50% 50%',
      },
      {
        src: sumacAlero,
        alt: 'El alero ondulado de Sumac Mayu de cerca, con las ménsulas de madera y la base de piedra',
        encuadre: '30% 50%',
      },
      {
        src: sumacFrutas,
        alt: 'Frutos verdes en una rama, con Sumac Mayu y la pileta desenfocadas detrás',
        encuadre: '50% 50%',
      },
      {
        src: sumacVentanal,
        alt: 'El gran ventanal de Sumac Mayu con el jazmín trepando, sobre un cantero de flores',
        encuadre: '50% 50%',
      },
    ],
  },
  {
    // Cruz: izquierda, centro arriba, centro abajo, derecha
    titulo: 'El parque',
    disposicion: 'cruz',
    nota: {
      estilo: 'final' as const,
      titulo: 'Lorem ipsum dolor sit amet, consectetur.',
      subtitulo:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    },
    fotos: [
      {
        src: parqueCamino,
        alt: 'El camino de piedras por el pasto hacia Sumac Mayu y la pileta',
        encuadre: '50% 50%',
      },
      {
        src: parqueSierras,
        alt: 'Las sierras detrás del monte, vistas desde el deck',
        encuadre: '50% 55%',
      },
      {
        src: parqueFlores,
        alt: 'Flores amarillas silvestres en el pasto del parque',
        encuadre: '50% 60%',
      },
      {
        src: parquePileta,
        alt: 'La pileta con los escalones de piedra y la pérgola del deck al fondo',
        encuadre: '50% 50%',
      },
    ],
  },
];
