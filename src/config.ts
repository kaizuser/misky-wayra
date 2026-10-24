const calle = 'Los Alazanes 1077';
const barrio = 'Barrio Valentí';
const ciudad = 'Capilla del Monte';
const provincia = 'Córdoba';

export const SITIO = {
  nombre: 'Misky Wayra',
  whatsapp: '549XXXXXXXXXX', // provisorio: sin el número real no se publica en los datos para Google
  calle,
  barrio,
  ciudad,
  provincia,
  direccion: `${calle}, ${barrio}`,
  localidad: `${ciudad}, ${provincia}`,
};

/** El número ya está cargado (no es el provisorio) */
export const hayWhatsapp = !SITIO.whatsapp.includes('X');

export const whatsappUrl = (mensaje: string) =>
  `https://wa.me/${SITIO.whatsapp}?text=${encodeURIComponent(mensaje)}`;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${SITIO.direccion}, ${SITIO.localidad}, Argentina`,
)}`;
