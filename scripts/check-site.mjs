// Derleme sonrası denetim: Cloudflare'de derleme bu denetim geçmezse yayınlanmaz.
// En önemli kural: livn.tr/win kurulum yönlendirmesi asla bozulmamalı.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const errors = [];
const warnings = [];
const read = (p) => readFileSync(join(dist, p), 'utf8');

// 1) /win yönlendirmesi
const WIN = '/win  https://raw.githubusercontent.com/LiVNLOUD/livn-tools/main/win.ps1  302';
if (!existsSync(join(dist, '_redirects'))) errors.push('_redirects yok');
else {
  const lines = read('_redirects').split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
  const win = lines.filter((l) => l.split(/\s+/)[0] === '/win');
  if (win.length !== 1 || win[0].replace(/\s+/g, ' ') !== WIN.replace(/\s+/g, ' ')) errors.push(`/win satırı beklenenden farklı: ${JSON.stringify(win)}`);
}
if (existsSync(join(dist, 'win')) || existsSync(join(dist, 'win.html')) || existsSync(join(dist, 'win', 'index.html'))) errors.push('/win adında bir sayfa üretilmiş; kurulum komutunu gölgeler');

// 2) İki dilin ana sayfası
for (const [file, lang] of [['index.html', 'tr'], ['en/index.html', 'en']]) {
  if (!existsSync(join(dist, file))) { errors.push(`${file} yok`); continue; }
  if (!read(file).includes(`<html lang="${lang}"`)) errors.push(`${file}: html lang="${lang}" değil`);
}

// 3) CSP uyumu: satır içi betik/stil yok, dış kaynaktan betik/stil yok
function* htmlFiles(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* htmlFiles(p);
    else if (name.endsWith('.html')) yield p;
  }
}
for (const f of htmlFiles(dist)) {
  const html = readFileSync(f, 'utf8');
  const rel = f.slice(dist.length);
  if (/<script(?![^>]*\bsrc=)[^>]*>/i.test(html)) errors.push(`${rel}: satır içi <script> (CSP engeller)`);
  if (/<style[\s>]/i.test(html)) errors.push(`${rel}: satır içi <style> (CSP engeller)`);
  if (/\sstyle="/i.test(html)) errors.push(`${rel}: style="" özniteliği (CSP engeller)`);
  for (const m of html.matchAll(/<(?:script|link)[^>]+(?:src|href)="(https?:)?\/\/[^"]+"[^>]*>/gi)) {
    if (/rel="(canonical|alternate)"/.test(m[0])) continue;
    errors.push(`${rel}: dış kaynak ${m[0]}`);
  }
}

// 4) Proje dosyalarının iki dilde karşılığı (uyarı)
const src = new URL('../src/content/projects/', import.meta.url).pathname;
const list = (l) => (existsSync(join(src, l)) ? readdirSync(join(src, l)).filter((n) => n.endsWith('.md')) : []);
const tr = new Set(list('tr')), en = new Set(list('en'));
for (const n of tr) if (!en.has(n)) warnings.push(`projects/en/${n} yok (İngilizce sayfada görünmeyecek)`);
for (const n of en) if (!tr.has(n)) warnings.push(`projects/tr/${n} yok (Türkçe sayfada görünmeyecek)`);

for (const w of warnings) console.warn(`UYARI: ${w}`);
if (errors.length) { for (const e of errors) console.error(`HATA: ${e}`); process.exit(1); }
console.log('Site denetimi geçti: /win yönlendirmesi, iki dil, CSP uyumu.');
