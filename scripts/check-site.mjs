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
// Cloudflare kuralı livn.tr/win* yolunu yakalar: kökte "win" ile başlayan hiçbir dosya/klasör olmamalı.
for (const name of readdirSync(dist)) if (/^win/i.test(name)) errors.push(`dist/${name}: kökte "win" ile başlayan yol; livn.tr/win* kuralı bu adresi yakalar`);

// 2) İki dilin bölüm sayfaları ve 404
if (!existsSync(join(dist, '404.html'))) errors.push('404.html yok');
for (const [file, lang] of [
  ['index.html', 'tr'], ['en/index.html', 'en'],
  ['referanslar/index.html', 'tr'], ['en/references/index.html', 'en'],
  ['yazilim/index.html', 'tr'], ['en/software/index.html', 'en'],
  ['hakkimda/index.html', 'tr'], ['en/about/index.html', 'en'],
]) {
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
  // JSON-LD veri bloğu çalıştırılmaz (CSP etkilemez) ama geçerli JSON olmalı
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { errors.push(`${rel}: geçersiz JSON-LD`); }
  }
  if (/<script(?![^>]*\bsrc=)(?![^>]*type="application\/ld\+json")[^>]*>/i.test(html)) errors.push(`${rel}: satır içi <script> (CSP engeller)`);
  if (/<style[\s>]/i.test(html)) errors.push(`${rel}: satır içi <style> (CSP engeller)`);
  if (/\sstyle="/i.test(html)) errors.push(`${rel}: style="" özniteliği (CSP engeller)`);
  for (const m of html.matchAll(/<(?:script|link)[^>]+(?:src|href)="(https?:)?\/\/[^"]+"[^>]*>/gi)) {
    if (/rel="(canonical|alternate)"/.test(m[0])) continue;
    errors.push(`${rel}: dış kaynak ${m[0]}`);
  }
  // 4) Erişilebilirlik ve SEO temelleri
  for (const m of html.matchAll(/<img\b[^>]*>/gi)) if (!/\balt="[^"]*"/.test(m[0])) errors.push(`${rel}: alt metni olmayan görsel ${m[0].slice(0, 80)}`);
  if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`${rel}: <title> yok`);
  if (!/<meta name="description" content="[^"]+"/.test(html)) errors.push(`${rel}: description yok`);
  if (!/<meta property="og:image" content="https:\/\/[^"]+"/.test(html)) errors.push(`${rel}: og:image yok`);
  // Cloudflare e-posta gizleme betiği eklenmesin: her mailto <!--email_off--> içinde olmalı (EmailLink bileşeni)
  const bare = html.replace(/<!--email_off-->[\s\S]*?<!--\/email_off-->/g, '');
  if (/href="mailto:/i.test(bare)) errors.push(`${rel}: <!--email_off--> dışında mailto bağlantısı (EmailLink bileşenini kullanın)`);
  // 5) Kırık iç bağlantı
  for (const m of html.matchAll(/\shref="(\/[^"#?]*)/g)) {
    const href = decodeURIComponent(m[1]);
    if (href === '/win' || href.startsWith('/_astro/')) continue;
    const target = join(dist, href);
    const ok = existsSync(target) && (statSync(target).isFile() || existsSync(join(target, 'index.html')));
    if (!ok) errors.push(`${rel}: kırık iç bağlantı ${href}`);
  }
}

// 6) İçeriğin iki dilde karşılığı (uyarı: eksik dilde sayfa gizlenir)
for (const c of ['references', 'software', 'notes']) {
  const dir = new URL(`../src/content/${c}/`, import.meta.url).pathname;
  if (!existsSync(dir)) continue;
  for (const slug of readdirSync(dir)) {
    if (!statSync(join(dir, slug)).isDirectory()) continue;
    for (const l of ['tr', 'en']) if (!existsSync(join(dir, slug, `${l}.md`))) warnings.push(`${c}/${slug}/${l}.md yok (bu dilde gösterilmeyecek)`);
  }
}

for (const w of warnings) console.warn(`UYARI: ${w}`);
if (errors.length) { for (const e of errors) console.error(`HATA: ${e}`); process.exit(1); }
console.log('Site denetimi geçti: /win yönlendirmesi, iki dil, CSP uyumu, alt metin, iç bağlantılar.');
