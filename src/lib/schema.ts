import { SITE, withYears, type Lang } from '../site';

export function personSchema(lang: Lang, image?: string) {
  return {
    '@type': 'Person',
    '@id': `${SITE.url}/#person`,
    name: SITE.name,
    url: SITE.url,
    ...(image ? { image: new URL(image, SITE.url).href } : {}),
    jobTitle: SITE.jobTitle[lang],
    worksFor: { '@type': 'Organization', name: SITE.employer.legal, url: SITE.employer.url },
    address: { '@type': 'PostalAddress', addressLocality: 'Bursa', addressCountry: 'TR' },
    email: `mailto:${SITE.email}`,
    sameAs: [SITE.linkedin, SITE.github],
    description: withYears(SITE.intro[lang].description),
    knowsAbout: ['PLC', 'SCADA', 'Siemens S7-1500', 'WinCC Runtime Professional', 'Electrical design', 'Commissioning', 'Process automation'],
    knowsLanguage: ['tr', 'en'],
  };
}
