import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getNotes, slugOf } from '../../content-utils';
import { PATHS, t } from '../../i18n';
import { SITE } from '../../site';

export async function GET(context: APIContext) {
  const notes = await getNotes('tr');
  return rss({
    title: `${SITE.name} — ${t('tr').notesTitle}`,
    description: t('tr').notesLead,
    site: context.site ?? SITE.url,
    items: notes.map((n) => ({ title: n.data.title, pubDate: n.data.date, description: n.data.summary, link: PATHS.tr.note(slugOf(n.id)) })),
    customData: '<language>tr</language>',
  });
}
