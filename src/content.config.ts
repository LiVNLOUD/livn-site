import { defineCollection, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Her içerik bir klasördür: src/content/<koleksiyon>/<kısa-ad>/tr.md ve en.md
// Klasör adı adres olur (livn.tr/referanslar/<kısa-ad>/). Görseller aynı klasöre konur.
const folderLoader = (base: string) =>
  glob({
    pattern: '*/{tr,en}.md',
    base,
    // Kimlik: "<kısa-ad>/tr" — dil dosya adından, kısa ad klasörden gelir.
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  });

// Görsel: dosya yolu (./kapak.jpg) + zorunlu açıklama (alt metin)
const picture = ({ image }: SchemaContext) =>
  z.object({
    src: image(),
    alt: z.string().min(3, 'Görsel açıklaması (alt) en az 3 karakter olmalı'),
  });

export const SECTORS = ['water', 'energy', 'process', 'mining', 'oil-gas', 'food'] as const;
export const SCHEMATICS = ['wastewater', 'drinking', 'pumping', 'power', 'demi', 'geothermal', 'nitrate', 'salt', 'acid', 'granulation', 'pneumatic', 'oil', 'feed', 'poultry'] as const;
export const SCOPES = [
  'electrical',
  'automation',
  'plc',
  'scada',
  'hmi',
  'instrumentation',
  'panel',
  'engineering',
  'commissioning',
  'monitoring',
  'modernization',
  'subcontract',
] as const;

// Otomasyon referansları
const references = defineCollection({
  loader: folderLoader('./src/content/references'),
  schema: (ctx) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      year: z.number().int().min(1990).max(2100),
      month: z.number().int().min(1).max(12).optional(),
      location: z.string(),
      // ISO ülke kodu: TR, AZ, RO, UZ…
      country: z.string().regex(/^[A-Z]{2}$/, 'country iki büyük harf olmalı (TR, AZ…)'),
      // Harita konumu: [enlem, boylam] (ör. [38.42, 27.14] İzmir). Boşsa haritada görünmez.
      coords: z.tuple([z.number().min(-90).max(90), z.number().min(-180).max(180)]).optional(),
      sector: z.enum(SECTORS),
      // Fotoğraf yoksa gösterilecek şematik çizim türü (boşsa sektörün varsayılanı)
      schematic: z.enum(SCHEMATICS).optional(),
      scope: z.array(z.enum(SCOPES)).min(1),
      // Kullanılan ürün/yazılım adları (marka logosu değil, yalnız ad)
      technologies: z.array(z.string()).default([]),
      role: z.string().optional(),
      // Müşteri adı: yalnız müşterinin izni varsa yazın. Boşsa sitede görünmez.
      client: z.string().optional(),
      featured: z.boolean().default(false),
      cover: picture(ctx).optional(),
      gallery: z.array(picture(ctx)).default([]),
      draft: z.boolean().default(false),
    }),
});

// Yazılım projeleri (GitHub)
const software = defineCollection({
  loader: folderLoader('./src/content/software'),
  schema: (ctx) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      order: z.number().default(100),
      status: z.enum(['active', 'dev', 'archived']).default('active'),
      version: z.string().optional(),
      platform: z.string().optional(),
      repo: z.string().url().optional(),
      // Kopyalanabilir kurulum komutu (isteğe bağlı)
      command: z.string().optional(),
      commandNote: z.string().optional(),
      links: z.array(z.object({ label: z.string(), href: z.string().url() })).default([]),
      cover: picture(ctx).optional(),
      gallery: z.array(picture(ctx)).default([]),
      draft: z.boolean().default(false),
    }),
});

// Notlar / yazılar
const notes = defineCollection({
  loader: folderLoader('./src/content/notes'),
  schema: (ctx) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      summary: z.string().optional(),
      cover: picture(ctx).optional(),
      draft: z.boolean().default(false),
    }),
});

// Hakkımda sayfası (src/content/about/tr.md, en.md)
const about = defineCollection({
  loader: glob({ pattern: '{tr,en}.md', base: './src/content/about', generateId: ({ entry }) => entry.replace(/\.md$/, '') }),
  schema: z.object({
    title: z.string(),
    lead: z.string(),
    experience: z.array(
      z.object({
        // Başlangıç bilinmiyorsa boş bırakılabilir
        from: z.string().regex(/^\d{4}(-\d{2})?$/).optional(),
        to: z.string().regex(/^\d{4}(-\d{2})?$/).optional(),
        role: z.string(),
        company: z.string().optional(),
        url: z.string().url().optional(),
        location: z.string().optional(),
        points: z.array(z.string()).default([]),
      }),
    ),
    tools: z.array(z.string()).default([]),
    education: z.array(z.object({ period: z.string(), title: z.string(), note: z.string().optional() })).default([]),
    languages: z.array(z.object({ name: z.string(), level: z.string() })).default([]),
  }),
});

export const collections = { references, software, notes, about };
