/**
 * Rutas internas con la base del sitio. En la máquina y en el dominio final la base es "/";
 * en la vista previa de GitHub Pages es "/misky-wayra/". Todo link interno pasa por acá.
 */
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** ruta('/cabanas/sumac-mayu/') → '/cabanas/sumac-mayu/' o '/misky-wayra/cabanas/sumac-mayu/' */
export const ruta = (camino: string) => `${base}${camino}`;

/** Vista previa para revisar: no se indexa en Google (VISTA_PREVIA=1 al compilar) */
export const esVistaPrevia = import.meta.env.VISTA_PREVIA === '1';
