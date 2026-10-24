export const SITIO = {
  nombre: 'Misky Wayra',
  whatsapp: '549XXXXXXXXXX',
  direccion: 'Los Alazanes 1077, Barrio Valentí',
  localidad: 'Capilla del Monte, Córdoba',
};

export const whatsappUrl = (mensaje: string) =>
  `https://wa.me/${SITIO.whatsapp}?text=${encodeURIComponent(mensaje)}`;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${SITIO.direccion}, ${SITIO.localidad}, Argentina`,
)}`;
