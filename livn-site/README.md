# livn.tr

livn.tr web sitesinin kaynağı. Astro ile üretilen, sunucusu olmayan statik bir site. Cloudflare Pages'te yayınlanır. İlk yayın adımları: [YAYINLAMA.md](YAYINLAMA.md).

## İçerik ekleme

Her şey `src/content` altındaki Markdown (`.md`) dosyalarıdır. Türkçe dosya `tr/`, İngilizcesi `en/` klasörüne, **aynı dosya adıyla** konur.

### Yeni proje

`src/content/projects/tr/proje-adi.md` ve `src/content/projects/en/proje-adi.md`:

```markdown
---
title: Proje adı
summary: Tek cümlelik tanıtım.
order: 2                # ana sayfadaki sıra (küçük olan üstte)
status: active          # active | dev | archived
command: irm livn.tr/win | iex   # isteğe bağlı: kopyalanabilir komut kutusu
commandNote: Komutun altındaki kısa açıklama (isteğe bağlı).
links:
  - label: GitHub
    href: https://github.com/...
draft: false            # true ise yayınlanmaz
---

Projenin açıklaması. **Kalın**, `kod`, listeler, bağlantılar, görseller kullanılabilir.
```

### Yeni not / yazı

`src/content/notes/tr/not-adi.md` → `livn.tr/notlar/not-adi/` adresinde yayınlanır ve ana sayfada listelenir.
İngilizcesi `src/content/notes/en/not-adi.md` → `livn.tr/en/notes/not-adi/`. Bir dili boş bırakabilirsiniz.

```markdown
---
title: Not başlığı
date: 2026-10-15
summary: Listede görünen kısa özet (isteğe bağlı).
draft: false
---

Metin...
```

Dosya adı adres olur: küçük harf, Türkçe karakter ve boşluk yerine `-` kullanın (`windows-format-notlari.md`).

Henüz not yokken derlemede `The collection "notes" does not exist or is empty` uyarısı görünür; hata değildir, ilk not eklenince kaybolur.

### Görseller

Görseli `public/img/` klasörüne koyun, Markdown içinde `![Açıklama](/img/dosya.png)` ile kullanın.

### Genel metinler

- Ana sayfa başlığı ve tanıtım cümlesi: `src/site.ts`
- Düğme ve başlık metinleri (Kopyala, Projeler, Notlar…): `src/i18n.ts`
- Renkler ve görünüm: `src/styles/global.css`

## Değişikliği yayınlamak

En kolay yol GitHub'ın web arayüzü: dosyayı GitHub'da açıp düzenleyin veya *Add file* ile ekleyin, *Commit changes* deyin. Cloudflare siteyi birkaç dakika içinde kendiliğinden yeniden derleyip yayınlar. Derleme hata verirse eski site yayında kalır; hata Cloudflare panelinde *Workers & Pages → (proje) → Deployments* altında görünür.

## Bilgisayarda önizleme (isteğe bağlı)

Node.js 22.12 veya üstü gerekir.

```powershell
npm install
npm run dev      # http://localhost:4321 adresinde canlı önizleme
npm run build    # yayın derlemesi + denetim
```

## Dokunulmaması gerekenler

- `public/_redirects` içindeki `/win` satırı: `irm livn.tr/win | iex` komutu buna bağlıdır. Bu satır bozulursa `npm run build` derlemeyi durdurur.
- `src/pages/` altında `win` adında sayfa açmayın (aynı nedenle; denetim bunu da yakalar).
- `public/_headers` sıkı bir güvenlik politikası içerir: sayfalara dışarıdan betik/stil (ör. analitik kodu, Google Fonts) eklenemez; satır içi `<script>` ve `style="..."` çalışmaz. Böyle bir şey gerekirse önce bu dosya güncellenmelidir. Denetim bu durumları da derlemede yakalar.
