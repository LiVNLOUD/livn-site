import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from './site';

// Kimlik "tr/livn-tools" biçimindedir; dil klasörden, kısa ad dosya adından gelir.
export function langOf(id: string): Lang { return id.split('/')[0] === 'en' ? 'en' : 'tr'; }
export function slugOf(id: string): string { return id.split('/').slice(1).join('/'); }

export async function getProjects(lang: Lang): Promise<CollectionEntry<'projects'>[]> {
  const all = await getCollection('projects', (e) => langOf(e.id) === lang && !e.data.draft);
  return all.sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}

export async function getNotes(lang: Lang): Promise<CollectionEntry<'notes'>[]> {
  const all = await getCollection('notes', (e) => langOf(e.id) === lang && !e.data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
