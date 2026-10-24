/**
 * Datos estructurados (schema.org) para Google: el complejo como alojamiento
 * y cada cabaña como una unidad dentro de él. Se arman al compilar.
 * La foto (`image`) la agrega Base.astro: es la misma de la vista previa al compartir.
 */
import type { CollectionEntry } from 'astro:content';
import { SITIO, hayWhatsapp, mapsUrl } from '../config';
import { ruta } from './rutas';

const direccion = {
  '@type': 'PostalAddress',
  streetAddress: `${SITIO.calle}, ${SITIO.barrio}`,
  addressLocality: SITIO.ciudad,
  addressRegion: SITIO.provincia,
  addressCountry: 'AR',
};

const idNegocio = (sitio: URL) => new URL(ruta('/#complejo'), sitio).href;

function unidad(cabana: CollectionEntry<'cabanas'>, sitio: URL) {
  const d = cabana.data;
  return {
    '@type': 'Accommodation',
    '@id': new URL(ruta(`/cabanas/${cabana.id}/#casa`), sitio).href,
    name: d.nombre,
    description: d.seoDescription,
    url: new URL(ruta(`/cabanas/${cabana.id}/`), sitio).href,
    floorSize: { '@type': 'QuantitativeValue', value: d.datos.superficie, unitCode: 'MTK' },
    numberOfBedrooms: d.datos.dormitorios,
    amenityFeature: d.comodidades.map((nombre) => ({ '@type': 'LocationFeatureSpecification', name: nombre, value: true })),
  };
}

/** El complejo, con sus dos casas (para el inicio) */
export function negocio(cabanas: CollectionEntry<'cabanas'>[], sitio: URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': idNegocio(sitio),
    name: SITIO.nombre,
    description:
      'Dos cabañas de adobe hechas a mano en Capilla del Monte, Córdoba, en un parque de 3.000 m² con vista al Uritorco.',
    url: new URL(ruta('/'), sitio).href,
    address: direccion,
    hasMap: mapsUrl,
    ...(hayWhatsapp && { telephone: `+${SITIO.whatsapp}` }),
    containsPlace: cabanas.map((c) => unidad(c, sitio)),
  };
}

/** Una cabaña, dentro del complejo (para su página) */
export function alojamiento(cabana: CollectionEntry<'cabanas'>, sitio: URL) {
  return {
    '@context': 'https://schema.org',
    ...unidad(cabana, sitio),
    address: direccion,
    containedInPlace: { '@type': 'LodgingBusiness', '@id': idNegocio(sitio), name: SITIO.nombre },
  };
}
