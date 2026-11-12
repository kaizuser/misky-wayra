/**
 * El relato del inicio: el texto principal y las secciones de fotos (Secciones.astro).
 * Vive aparte de las cabañas: el contenido de cada casa (sus carruseles) ya no lo alimenta.
 * Provisorio: lorem ipsum y grises hasta armar la historia de las dos casas con las fotos.
 */
import adobe from '../assets/cabanas/sumac-mayu/adobe.jpg';

export const principal = {
  frase: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.',
  texto:
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
};

export const paradas = [
  {
    titulo: 'La casa',
    disposicion: 'trio',
    fotos: [
      {
        src: adobe,
        alt: 'Pared de adobe de Sumac Mayu con ménsulas de madera, base de piedra y puerta vidriada',
        encuadre: '50% 50%',
      },
    ],
  },
  {
    titulo: 'Adentro',
    disposicion: 'cinco',
    titular: 'escalera',
    nota: {
      estilo: 'centrada' as const,
      titulo: 'Lorem ipsum dolor sit amet, consectetur adipiscing.',
      subtitulo:
        'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
    },
    fotos: [],
  },
  {
    titulo: 'La cocina',
    disposicion: 'cruz',
    nota: {
      estilo: 'final' as const,
      titulo: 'Lorem ipsum dolor sit amet, consectetur.',
      subtitulo:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    },
    fotos: [],
  },
  { titulo: 'El descanso', disposicion: 'escalones', fotos: [] },
];
