import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Projeler: src/content/projects/<dil>/<ad>.md  — ana sayfada birer bölüm olarak görünür.
const projects = defineCollection({
  loader: glob({ pattern: '*/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number().default(100),
    status: z.enum(['active', 'dev', 'archived']).default('active'),
    // Kopyalanabilir komut kutusu (isteğe bağlı)
    command: z.string().optional(),
    commandNote: z.string().optional(),
    links: z.array(z.object({ label: z.string(), href: z.string().url() })).default([]),
    draft: z.boolean().default(false),
  }),
});

// Notlar: src/content/notes/<dil>/<ad>.md  — her biri kendi sayfasında; ana sayfada son notlar listelenir.
const notes = defineCollection({
  loader: glob({ pattern: '*/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, notes };
