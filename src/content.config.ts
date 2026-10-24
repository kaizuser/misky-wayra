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
      comodidades: z.array(z.string()),
      recorrido: z.array(
        z.object({
          titulo: z.string(),
          texto: z.string(),
          fotos: z.array(foto).default([]),
        }),
      ),
    });
  },
});

export const collections = { cabanas };
