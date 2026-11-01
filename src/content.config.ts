import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Cada cabaña es un archivo .md en src/content/cabanas/. Sumar una cabaña = sumar un archivo. */
const cabanas = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/cabanas' }),
  schema: ({ image }) => {
    const foto = z.object({
      src: image(),
      alt: z.string().min(10, 'Cada foto necesita un texto alternativo descriptivo'),
      encuadre: z.string().default('50% 50%'), // object-position al recortar
      epigrafe: z.string().optional(), // texto al verla en grande (si falta, se usa el alt)
    });

    return z.object({
      nombre: z.string(),
      significado: z.string(),
      tema: z.enum(['mayu', 'wayra']),
      orden: z.number(),
      seoTitle: z.string().max(60),
      seoDescription: z.string().max(160),
      frase: z.string(),
      foto,
      datos: z.object({
        superficie: z.number(),
        huespedes: z.string(),
        dormitorios: z.number(),
        camas: z.string(),
      }),
      /** lo que solo tiene esta casa, en una línea (fila "Lo propio" del inicio) */
      propio: z.string(),
      comodidades: z.array(z.string()),
      /**
       * Cómo se muestra el recorrido:
       * - camino: la línea sobre el eje con una parada por foto (el formato original)
       * - secciones: una sección por parada, con 3–4 fotos en una composición propia y casi sin texto
       */
      formato: z.enum(['camino', 'secciones']).default('camino'),
      /** El texto principal después del hero (formato secciones): una frase grande y un párrafo */
      principal: z.object({ frase: z.string(), texto: z.string() }).optional(),
      recorrido: z.array(
        z.object({
          titulo: z.string(),
          texto: z.string(),
          /** La composición de fotos de la parada (formato secciones) */
          disposicion: z.enum(['trio', 'cinco', 'fila', 'cruz', 'panoramica', 'par']).optional(),
          /** Título expresivo antes de las fotos (formato secciones): la palabra como forma */
          titular: z.enum(['escalera']).optional(),
          /** Texto corto centrado debajo de las fotos (formato secciones): un título y un subtítulo */
          nota: z.object({ titulo: z.string(), subtitulo: z.string() }).optional(),
          fotos: z.array(foto).default([]),
        }),
      ),
    });
  },
});

export const collections = { cabanas };
