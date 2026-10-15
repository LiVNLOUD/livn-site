// Sitenin genel bilgileri. Metinleri buradan değiştirebilirsiniz.
export const SITE = {
  name: 'Kaan Akdağ',
  url: 'https://livn.tr',
  github: 'https://github.com/LiVNLOUD',
  linkedin: 'https://www.linkedin.com/in/akdag-kaan/',
  email: 'kaan@livn.tr',
  // Telefon: yalnız kartvizitte (vCard / QR) kullanılır, sayfalarda gösterilmez
  phone: '+905321310733',
  phoneDisplay: '+90 532 131 07 33',
  employer: { name: 'Yıldırım Kimya', legal: 'Yıldırım Tuz Kimya San. ve Tic. A.Ş.', url: 'https://www.yildirimkimya.com.tr' },
  jobTitle: { tr: 'Elektrik ve Otomasyon Sorumlusu', en: 'Electrical & Automation Lead' },
  // Kariyer başlangıcı: metinlerdeki {years} (deneyim yılı) buradan hesaplanır
  since: 2011,
  location: { tr: 'Bursa', en: 'Bursa, Türkiye' },
  // Ana sayfa karşılama metni (dil başına)
  intro: {
    tr: {
      eyebrow: 'Elektrik ve otomasyon',
      title: 'Sahada devreye alınan otomasyon.',
      lead: 'Ben Kaan Akdağ. {years} yıldır su ve atıksu arıtma, enerji ve kimya tesislerinde elektrik ve otomasyon sistemlerini tasarlıyor, kuruyor ve devreye alıyorum. Bugün Yıldırım Kimya’da elektrik ve otomasyon sorumlusuyum.',
      description: 'Kaan Akdağ — elektrik ve otomasyon. {years} yıllık saha deneyimi; su ve atıksu arıtma, enerji ve kimya tesislerinde PLC, SCADA ve elektrik sistemleri, tasarımdan devreye almaya.',
    },
    en: {
      eyebrow: 'Electrical & automation',
      title: 'Automation, commissioned on site.',
      lead: 'I’m Kaan Akdağ. For {years} years I have designed, installed and commissioned electrical and automation systems for water and wastewater treatment, power and chemical plants. Today I am the electrical & automation lead at Yıldırım Kimya.',
      description: 'Kaan Akdağ — electrical and automation. {years} years in the field; PLC, SCADA and electrical systems for water and wastewater treatment, power and chemical plants, from design to commissioning.',
    },
  },
} as const;

// {years} yer tutucusunu deneyim yılıyla değiştirir
export const withYears = (text: string) => text.replaceAll('{years}', String(new Date().getFullYear() - SITE.since));

export type Lang = 'tr' | 'en';
export const LANGS: readonly Lang[] = ['tr', 'en'];
export const otherLang = (lang: Lang): Lang => (lang === 'tr' ? 'en' : 'tr');
