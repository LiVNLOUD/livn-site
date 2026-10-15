import type { Lang } from './site';

// Arayüz metinleri. Yeni bir metin eklerken iki dili de doldurun.
export const UI = {
  tr: {
    htmlLang: 'tr',
    locale: 'tr-TR',
    nav: { references: 'Referanslar', software: 'Yazılım', notes: 'Notlar', about: 'Hakkımda' },
    menu: 'Ana menü',
    switchLang: 'English',
    switchLangShort: 'EN',
    themeToggle: 'Açık / koyu tema',
    skip: 'İçeriğe geç',
    home: 'Ana sayfa',
    // Ana sayfa
    ctaReferences: 'Referansları incele',
    ctaContact: 'İletişime geç',
    logTitle: 'Proje kaydı',
    statReferences: 'referans proje',
    statSectors: 'sektör',
    statCountries: 'ülke',
    statSince: 'sahada',
    whatTitle: 'Ne yapıyorum',
    featuredTitle: 'Öne çıkan referanslar',
    allReferences: 'Tüm referanslar',
    sectorsTitle: 'Sektörler',
    projectsCount: (n: number) => `${n} proje`,
    softwareTitle: 'Yazılım',
    softwareLead: 'Sahada ihtiyaç duyduğum araçları kendim de yazıyorum.',
    contactTitle: 'Teknik destek ve iş birliği',
    contactLead: 'Yıldırım Kimya’da elektrik ve otomasyon sorumlusu olarak görevimi sürdürüyorum. Bunun yanında, uygunluğum ölçüsünde PLC/SCADA, elektrik projelendirme ve devreye alma konularında teknik destek ve danışmanlık verebilirim. Ayrıntılar için e-posta ya da LinkedIn üzerinden ulaşabilirsiniz.',
    // Referanslar
    referencesTitle: 'Otomasyon referansları',
    referencesLead: 'Katıldığım projeler, en yeniden eskiye. Fotoğrafı olmayan projelerde tesis türünün şematik çizimi gösterilir.',
    filterLabel: 'Sektöre göre süz',
    filterAll: 'Tümü',
    year: 'Tarih',
    location: 'Yer',
    sector: 'Sektör',
    scope: 'Kapsam',
    role: 'Rol',
    client: 'Müşteri',
    technologies: 'Teknolojiler',
    gallery: 'Görseller',
    schematic: 'ŞEMATİK ÇİZİM',
    mapTitle: 'Proje haritası',
    mapLead: 'Türkiye’den Romanya, Azerbaycan ve Özbekistan’a; çalıştığım tesislerin yerleri.',
    placeFilter: (p: string) => `${p} konumundaki projeler`,
    backToReferences: 'Tüm referanslar',
    nextReference: 'Daha eski',
    prevReference: 'Daha yeni',
    // Yazılım
    softwareListTitle: 'Yazılım projeleri',
    softwareListLead: 'GitHub’da geliştirdiğim, açık kaynak araçlar.',
    version: 'Sürüm',
    status: 'Durum',
    platform: 'Platform',
    install: 'Kurulum',
    source: 'Kaynak kod',
    backToSoftware: 'Tüm yazılımlar',
    select: 'Seç',
    selected: 'Komut seçildi. Ctrl+C ile kopyalayın (telefonda: Kopyala).',
    statusActive: 'Aktif',
    statusDev: 'Geliştiriliyor',
    statusArchived: 'Arşiv',
    details: 'Ayrıntılar',
    // Notlar
    notesTitle: 'Notlar',
    notesLead: 'Sahadan ve atölyeden kısa notlar.',
    notesEmpty: 'Henüz yayımlanmış not yok.',
    published: 'Yayın',
    backToNotes: 'Tüm notlar',
    // Hakkımda
    experience: 'Deneyim',
    tools: 'Araçlar ve yazılımlar',
    education: 'Eğitim',
    languages: 'Diller',
    contact: 'İletişim',
    present: 'Günümüz',
    email: 'E-posta',
    vcard: 'Rehbere ekle (vCard)',
    vcardTitle: 'Kartvizit',
    vcardHint: 'Telefonunuzun kamerasıyla okutun; iletişim bilgilerim rehberinize eklenir.',
    privacy: 'Gizlilik',
    rss: 'RSS',
    // 404
    notFoundTitle: 'Sayfa bulunamadı',
    notFoundText: 'Aradığınız sayfa yok veya taşınmış.',
  },
  en: {
    htmlLang: 'en',
    locale: 'en-GB',
    nav: { references: 'References', software: 'Software', notes: 'Notes', about: 'About' },
    menu: 'Main menu',
    switchLang: 'Türkçe',
    switchLangShort: 'TR',
    themeToggle: 'Light / dark theme',
    skip: 'Skip to content',
    home: 'Home',
    ctaReferences: 'View references',
    ctaContact: 'Get in touch',
    logTitle: 'Project log',
    statReferences: 'reference projects',
    statSectors: 'sectors',
    statCountries: 'countries',
    statSince: 'in the field',
    whatTitle: 'What I do',
    featuredTitle: 'Featured references',
    allReferences: 'All references',
    sectorsTitle: 'Sectors',
    projectsCount: (n: number) => (n === 1 ? '1 project' : `${n} projects`),
    softwareTitle: 'Software',
    softwareLead: 'I also write the tools I need in the field.',
    contactTitle: 'Technical support & collaboration',
    contactLead: 'I continue in my role as electrical & automation lead at Yıldırım Kimya. Alongside it, as my availability allows, I can provide technical support and consulting on PLC/SCADA, electrical design and commissioning. Reach me by email or on LinkedIn for details.',
    referencesTitle: 'Automation references',
    referencesLead: 'Projects I have worked on, newest first. Where there is no photo, a schematic of the plant type is shown.',
    filterLabel: 'Filter by sector',
    filterAll: 'All',
    year: 'Date',
    location: 'Location',
    sector: 'Sector',
    scope: 'Scope',
    role: 'Role',
    client: 'Client',
    technologies: 'Technologies',
    gallery: 'Images',
    schematic: 'SCHEMATIC',
    mapTitle: 'Project map',
    mapLead: 'From Türkiye to Romania, Azerbaijan and Uzbekistan: where the plants I worked on are.',
    placeFilter: (p: string) => `Projects in ${p}`,
    backToReferences: 'All references',
    nextReference: 'Older',
    prevReference: 'Newer',
    softwareListTitle: 'Software projects',
    softwareListLead: 'Open-source tools I develop on GitHub.',
    version: 'Version',
    status: 'Status',
    platform: 'Platform',
    install: 'Install',
    source: 'Source code',
    backToSoftware: 'All software',
    select: 'Select',
    selected: 'Command selected. Press Ctrl+C to copy (on a phone: Copy).',
    statusActive: 'Active',
    statusDev: 'In development',
    statusArchived: 'Archived',
    details: 'Details',
    notesTitle: 'Notes',
    notesLead: 'Short notes from the field and the workbench.',
    notesEmpty: 'No notes published yet.',
    published: 'Published',
    backToNotes: 'All notes',
    experience: 'Experience',
    tools: 'Tools and software',
    education: 'Education',
    languages: 'Languages',
    contact: 'Contact',
    present: 'Present',
    email: 'Email',
    vcard: 'Add to contacts (vCard)',
    vcardTitle: 'Business card',
    vcardHint: 'Scan with your phone camera to add my contact details.',
    privacy: 'Privacy',
    rss: 'RSS',
    notFoundTitle: 'Page not found',
    notFoundText: 'The page you are looking for does not exist or has moved.',
  },
} as const;

export function t(lang: Lang) {
  return UI[lang];
}

export const SECTOR_LABELS = {
  tr: { water: 'Su ve atıksu', energy: 'Enerji', process: 'Kimya ve proses', mining: 'Madencilik', 'oil-gas': 'Petrol ve gaz', food: 'Gıda ve yem' },
  en: { water: 'Water & wastewater', energy: 'Power', process: 'Chemical & process', mining: 'Mining', 'oil-gas': 'Oil & gas', food: 'Food & feed' },
} as const;

export const SCOPE_LABELS = {
  tr: {
    electrical: 'Elektrik', automation: 'Otomasyon', plc: 'PLC', scada: 'SCADA', hmi: 'HMI', instrumentation: 'Enstrümantasyon',
    panel: 'Pano', engineering: 'Mühendislik', commissioning: 'Devreye alma', monitoring: 'Uzaktan izleme', modernization: 'Modernizasyon', subcontract: 'Alt yüklenici',
  },
  en: {
    electrical: 'Electrical', automation: 'Automation', plc: 'PLC', scada: 'SCADA', hmi: 'HMI', instrumentation: 'Instrumentation',
    panel: 'Panels', engineering: 'Engineering', commissioning: 'Commissioning', monitoring: 'Remote monitoring', modernization: 'Modernisation', subcontract: 'Subcontractor',
  },
} as const;

const COUNTRY_NAMES: Record<Lang, Record<string, string>> = {
  tr: { TR: 'Türkiye', AZ: 'Azerbaycan', RO: 'Romanya', UZ: 'Özbekistan' },
  en: { TR: 'Türkiye', AZ: 'Azerbaijan', RO: 'Romania', UZ: 'Uzbekistan' },
};
export const countryName = (code: string, lang: Lang) => COUNTRY_NAMES[lang][code] ?? code;

// Dil başına yollar. Kökte "win" ile başlayan yol AÇMAYIN (livn.tr/win* kurulum yönlendirmesi).
export const PATHS = {
  tr: {
    home: '/',
    references: '/referanslar/',
    reference: (slug: string) => `/referanslar/${slug}/`,
    software: '/yazilim/',
    softwareItem: (slug: string) => `/yazilim/${slug}/`,
    notes: '/notlar/',
    note: (slug: string) => `/notlar/${slug}/`,
    about: '/hakkimda/',
    privacy: '/gizlilik/',
    rss: '/notlar/rss.xml',
  },
  en: {
    home: '/en/',
    references: '/en/references/',
    reference: (slug: string) => `/en/references/${slug}/`,
    software: '/en/software/',
    softwareItem: (slug: string) => `/en/software/${slug}/`,
    notes: '/en/notes/',
    note: (slug: string) => `/en/notes/${slug}/`,
    about: '/en/about/',
    privacy: '/en/privacy/',
    rss: '/en/notes/rss.xml',
  },
} as const;

export function formatDate(d: Date, lang: Lang) {
  return d.toLocaleDateString(UI[lang].locale, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

export function formatMonth(year: number, month: number | undefined, lang: Lang) {
  if (!month) return String(year);
  return new Date(Date.UTC(year, month - 1, 1)).toLocaleDateString(UI[lang].locale, { year: 'numeric', month: 'long', timeZone: 'UTC' });
}

// "2018-07" → "Tem 2018"
export function formatPeriod(p: string, lang: Lang) {
  const [y, m] = p.split('-').map(Number);
  if (!m) return String(y);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString(UI[lang].locale, { year: 'numeric', month: 'short', timeZone: 'UTC' });
}
