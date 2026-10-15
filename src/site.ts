// Sitenin genel bilgileri. Metinleri buradan değiştirebilirsiniz.
export const SITE = {
  name: 'Livn',
  url: 'https://livn.tr',
  github: 'https://github.com/LiVNLOUD',
  // Ana sayfa başlığı ve kısa tanıtım (dil başına)
  intro: {
    tr: {
      title: 'Livn',
      lead: 'Kendi kullandığım araçlar, projeler ve notlar.',
    },
    en: {
      title: 'Livn',
      lead: 'Tools I use, projects and notes.',
    },
  },
} as const;

export type Lang = 'tr' | 'en';
