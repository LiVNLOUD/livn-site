import type { Lang } from './site';

// Arayüz metinleri. Yeni bir metin eklerken iki dili de doldurun.
export const UI = {
  tr: {
    htmlLang: 'tr',
    projects: 'Projeler',
    notes: 'Notlar',
    allNotes: 'Tüm notlar',
    copy: 'Kopyala',
    copied: 'Kopyalandı',
    copyFailed: 'Kopyalanamadı; komutu elle seçin',
    statusActive: 'Aktif',
    statusDev: 'Geliştiriliyor',
    statusArchived: 'Arşiv',
    switchLang: 'English',
    backHome: 'Ana sayfa',
    notFoundTitle: 'Sayfa bulunamadı',
    notFoundText: 'Aradığınız sayfa yok veya taşınmış.',
    skip: 'İçeriğe geç',
    published: 'Yayın',
  },
  en: {
    htmlLang: 'en',
    projects: 'Projects',
    notes: 'Notes',
    allNotes: 'All notes',
    copy: 'Copy',
    copied: 'Copied',
    copyFailed: 'Copy failed; select the command manually',
    statusActive: 'Active',
    statusDev: 'In development',
    statusArchived: 'Archived',
    switchLang: 'Türkçe',
    backHome: 'Home',
    notFoundTitle: 'Page not found',
    notFoundText: 'The page you are looking for does not exist or has moved.',
    skip: 'Skip to content',
    published: 'Published',
  },
} as const;

export function t(lang: Lang) {
  return UI[lang];
}

// Dil başına yollar
export const PATHS = {
  tr: { home: '/', note: (slug: string) => `/notlar/${slug}/` },
  en: { home: '/en/', note: (slug: string) => `/en/notes/${slug}/` },
} as const;

export function formatDate(d: Date, lang: Lang) {
  return d.toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}
