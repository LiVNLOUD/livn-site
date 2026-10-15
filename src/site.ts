// Sitenin genel bilgileri. Metinleri buradan değiştirebilirsiniz.
export const SITE = {
  name: 'Kaan Akdağ',
  url: 'https://livn.tr',
  github: 'https://github.com/LiVNLOUD',
  linkedin: 'https://www.linkedin.com/in/akdag-kaan/',
  email: 'akdagkn@gmail.com',
  // Kariyer başlangıcı: "… yıldan beri" ifadesi buradan hesaplanır
  since: 2013,
  location: { tr: 'İzmir', en: 'Izmir, Türkiye' },
  // Ana sayfa karşılama metni (dil başına)
  intro: {
    tr: {
      eyebrow: 'Elektrik ve otomasyon',
      title: 'Sahada devreye alınan otomasyon.',
      lead: 'Ben Kaan Akdağ. 2013’ten bu yana su ve atıksu arıtma, enerji ve proses tesislerinde elektrik ve otomasyon sistemlerini tasarlıyor, kuruyor ve devreye alıyorum.',
      description: 'Kaan Akdağ — elektrik ve otomasyon. Su ve atıksu arıtma, enerji ve proses tesislerinde PLC, SCADA ve elektrik sistemleri; tasarımdan devreye almaya.',
    },
    en: {
      eyebrow: 'Electrical & automation',
      title: 'Automation, commissioned on site.',
      lead: 'I’m Kaan Akdağ. Since 2013 I have designed, installed and commissioned electrical and automation systems for water and wastewater treatment, power and process plants.',
      description: 'Kaan Akdağ — electrical and automation. PLC, SCADA and electrical systems for water and wastewater treatment, power and process plants, from design to commissioning.',
    },
  },
} as const;

export type Lang = 'tr' | 'en';
export const LANGS: readonly Lang[] = ['tr', 'en'];
export const otherLang = (lang: Lang): Lang => (lang === 'tr' ? 'en' : 'tr');
