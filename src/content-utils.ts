import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from './site';

// Kimlik "<kısa-ad>/<dil>" biçimindedir (ör. "livn-tools/tr").
export function langOf(id: string): Lang { return id.endsWith('/en') ? 'en' : 'tr'; }
export function slugOf(id: string): string { return id.split('/')[0]; }

type Folder = 'references' | 'software' | 'notes';

async function published<C extends Folder>(c: C, lang: Lang): Promise<CollectionEntry<C>[]> {
  return (await getCollection(c, (e: CollectionEntry<C>) => langOf(e.id) === lang && !e.data.draft)) as CollectionEntry<C>[];
}

// Bir içeriğin diğer dildeki karşılığı (yoksa undefined → dil bağlantısı o dilin listesine gider)
export async function twinOf<C extends Folder>(c: C, entry: CollectionEntry<C>, lang: Lang) {
  return (await published(c, lang)).find((e) => slugOf(e.id) === slugOf(entry.id));
}

// TR ve EN dosyalarında dilden bağımsız alanlar aynı olmalı; değilse derleme durur.
const SHARED_REFERENCE_FIELDS = ['year', 'month', 'country', 'coords', 'sector', 'scope', 'featured', 'draft'] as const;
let checked = false;
async function checkReferenceTwins() {
  if (checked) return;
  checked = true;
  const all = await getCollection('references');
  const bySlug = new Map<string, CollectionEntry<'references'>[]>();
  for (const e of all) bySlug.set(slugOf(e.id), [...(bySlug.get(slugOf(e.id)) ?? []), e]);
  const problems: string[] = [];
  for (const [slug, pair] of bySlug) {
    if (pair.length < 2) continue;
    const [a, b] = pair;
    for (const k of SHARED_REFERENCE_FIELDS) {
      if (JSON.stringify(a.data[k]) !== JSON.stringify(b.data[k])) problems.push(`references/${slug}: "${k}" tr.md ve en.md dosyalarında farklı`);
    }
    if ((a.data.gallery.length) !== (b.data.gallery.length)) problems.push(`references/${slug}: galeri görsel sayısı iki dilde farklı`);
    if (!!a.data.cover !== !!b.data.cover) problems.push(`references/${slug}: kapak görseli bir dilde var, diğerinde yok`);
  }
  if (problems.length) throw new Error(`İçerik tutarsız:\n- ${problems.join('\n- ')}`);
}

const sortKey = (r: CollectionEntry<'references'>) => r.data.year * 100 + (r.data.month ?? 0);

export async function getReferences(lang: Lang) {
  await checkReferenceTwins();
  return (await published('references', lang)).sort((a, b) => sortKey(b) - sortKey(a) || a.data.title.localeCompare(b.data.title));
}

export async function getSoftware(lang: Lang) {
  return (await published('software', lang)).sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}

// Henüz not yokken koleksiyonu sorgulamamak, derlemedeki "boş koleksiyon" uyarısını önler.
const NOTE_FILES = Object.keys(import.meta.glob('./content/notes/*/{tr,en}.md'));

export async function getNotes(lang: Lang) {
  if (NOTE_FILES.length === 0) return [];
  return (await published('notes', lang)).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
