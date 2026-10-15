import { readFileSync } from 'node:fs';
import { SITE, type Lang } from '../site';

// vCard 3.0 metni. withPhoto=false → QR kod için kısa sürüm (fotoğrafsız).
export function vcard(lang: Lang, withPhoto: boolean) {
  const esc = (s: string) => s.replace(/([,;\\])/g, '\\$1');
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Akdağ;Kaan;;;',
    `FN:${SITE.name}`,
    `ORG:${esc(SITE.employer.name)}`,
    `TITLE:${esc(SITE.jobTitle[lang])}`,
    `TEL;TYPE=CELL:${SITE.phone}`,
    `EMAIL;TYPE=INTERNET:${SITE.email}`,
    `URL:${SITE.url}`,
    `X-SOCIALPROFILE;TYPE=linkedin:${SITE.linkedin}`,
    `ADR;TYPE=WORK:;;;Bursa;;;${lang === 'tr' ? 'Türkiye' : 'Türkiye'}`,
  ];
  if (withPhoto) {
    try {
      const b64 = readFileSync(new URL('../assets/portre.jpg', import.meta.url)).toString('base64');
      lines.push(`PHOTO;ENCODING=b;TYPE=JPEG:${b64}`);
    } catch { /* portre yoksa fotoğrafsız */ }
  }
  lines.push('END:VCARD');
  // 75 karakterden uzun satırlar katlanır (RFC 2425)
  const fold = (l: string) => l.length <= 75 ? l : l.match(/.{1,74}/g)!.join('\r\n ');
  return lines.map(fold).join('\r\n') + '\r\n';
}
