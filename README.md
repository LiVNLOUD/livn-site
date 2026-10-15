# livn.tr

Kaan Akdağ'ın kişisel sitesi: otomasyon referansları, yazılım projeleri, notlar ve hakkımda. Astro ile üretilen, sunucusu olmayan statik bir site. Cloudflare Pages (`livn` projesi) bu depodaki `main` dalını her değişiklikte kendiliğinden derleyip yayınlar. Kararlar ve durum: [WORKLOG.md](WORKLOG.md).

| Bölüm | Türkçe | English | İçerik klasörü |
|---|---|---|---|
| Ana sayfa | `/` | `/en/` | `src/site.ts` (karşılama metni) |
| Referanslar | `/referanslar/` | `/en/references/` | `src/content/references/` |
| Yazılım | `/yazilim/` | `/en/software/` | `src/content/software/` |
| Notlar | `/notlar/` | `/en/notes/` | `src/content/notes/` |
| Hakkımda | `/hakkimda/` | `/en/about/` | `src/content/about/` |

## İçerik ekleme (GitHub web arayüzünden)

Her içerik **bir klasördür**. Klasör adı adres olur: küçük harf, Türkçe karakter ve boşluk yerine `-` (ör. `izmir-pompa-istasyonu`). Klasörde Türkçe metin `tr.md`, İngilizcesi `en.md` dosyasındadır. Görseller aynı klasöre konur.

- Bir dili yazmazsanız sayfa o dilde **gösterilmez** (derleme uyarı verir, hata vermez).
- Bir alanı yanlış yazarsanız (eksik başlık, geçersiz sektör, açıklamasız görsel…) **derleme durur** ve eski site yayında kalır. Hata, Cloudflare panelinde *Workers & Pages → livn → Deployments* altında görünür.

### Yeni referans: adım adım

1. GitHub'da `src/content/references/` klasörünü açın → **Add file → Create new file**.
2. Ad kutusuna `yeni-proje/tr.md` yazın (`/` yazınca klasör oluşur). Var olan bir referansın `tr.md` dosyasını kopyalayıp değiştirmek en kolayıdır.
3. **Commit changes**. Aynısını `yeni-proje/en.md` için tekrarlayın.
4. Görsel için klasöre girin → **Add file → Upload files** → fotoğrafları sürükleyin (ör. `kapak.jpg`, `1.jpg`, `2.jpg`) → **Commit changes**.
5. `tr.md` ve `en.md` içinde `cover:` / `gallery:` satırlarını açıp (baştaki `#` işaretini silip) dosya adlarını ve açıklamalarını yazın.

```yaml
---
title: "Atıksu arıtma tesisi"              # Sitede görünen ad (müşteri adı izinsiz yazılmaz)
summary: "Tek cümlelik özet."
year: 2024
month: 8                                  # isteğe bağlı (1–12)
location: "İzmir"
country: TR                               # TR, AZ, RO, UZ… (iki büyük harf)
sector: water                             # water | energy | process | mining | oil-gas | food
scope: [plc, scada, commissioning]        # electrical, automation, plc, scada, hmi, instrumentation,
                                          # panel, engineering, commissioning, monitoring, modernization, subcontract
technologies: ["Siemens S7-1500", "WinCC"] # isteğe bağlı; yalnız ad, logo yok
role: "Otomasyon uzmanı"                   # isteğe bağlı
client: "Müşteri A.Ş."                      # İSTEĞE BAĞLI — yalnız müşterinin izni varsa
featured: true                            # ana sayfada öne çıkar (en fazla 6 gösterilir)
cover: { src: ./kapak.jpg, alt: "Pano içinden genel görünüm" }
gallery:
  - { src: ./1.jpg, alt: "SCADA genel bakış ekranı" }
  - { src: ./2.jpg, alt: "Saha enstrümanları" }
draft: false                              # true ise yayınlanmaz
---

İsteğe bağlı açıklama metni: projenin amacı, yapılan iş, zorluklar, sonuç…
```

**Kurallar:** `year`, `month`, `country`, `sector`, `scope`, `featured`, `draft` alanları ve görsel sayısı `tr.md` ile `en.md`'de aynı olmalıdır (farklıysa derleme durur). Yalnız metinler (`title`, `summary`, `location`, `role`, `alt`, gövde) çevrilir.

### Görseller

- Biçim: JPG, PNG veya WebP. Telefon fotoğrafı olduğu gibi yüklenebilir; site derlenirken küçültülür, AVIF/WebP'ye çevrilir ve gerekene kadar yüklenmez.
- Her görselin `alt` açıklaması **zorunludur** (görme engelliler ve arama motorları için; en az 3 karakter).
- Önerilen kapak oranı 16:9. Kapak yoksa sektörün çizimi gösterilir.
- Telifli görsel, marka ya da müşteri logosu kullanmayın. Fotoğrafta müşteri adı, plaka veya kişi yüzü görünüyorsa önce kırpın.
- Referansın kapağı, sosyal medyada paylaşıldığında önizleme görseli de olur.

### Yeni yazılım projesi

`src/content/software/<ad>/tr.md` ve `en.md`. Örnek: `src/content/software/livn-tools/`. Alanlar: `title`, `summary`, `order`, `status` (active | dev | archived), `version`, `platform`, `repo` (GitHub adresi), `command` + `commandNote` (kopyalanabilir kurulum komutu), `links`, `cover`, `gallery`.

### Yeni not / yazı

`src/content/notes/<ad>/tr.md` (ve isteğe bağlı `en.md`):

```yaml
---
title: Not başlığı
date: 2026-10-15
summary: Listede görünen kısa özet (isteğe bağlı).
draft: false
---

Metin… **kalın**, `kod`, listeler, bağlantılar, tablolar kullanılabilir.
```

İlk not eklenince menüde **Notlar** kendiliğinden görünür. Not yokken derlemede `No files found matching "*/{tr,en}.md" in directory "src/content/notes"` uyarısı çıkar; hata değildir.

### Hakkımda, portre, iletişim

- Metin, deneyim, araçlar, eğitim ve diller: `src/content/about/tr.md` ve `en.md`.
- Portre: `src/assets/portre.jpg` adıyla yükleyin; Hakkımda sayfasında kendiliğinden görünür.
- E-posta, LinkedIn, GitHub, şehir ve ana sayfa karşılama metni: `src/site.ts`.
- Düğme ve başlık metinleri: `src/i18n.ts`. Renkler ve görünüm: `src/styles/global.css`.

## Bilgisayarda önizleme (isteğe bağlı)

Node.js 22.12 veya üstü gerekir.

```powershell
npm install
npm run dev      # http://localhost:4321 canlı önizleme
npm run build    # yayın derlemesi + denetim
npx wrangler pages dev dist   # Cloudflare'deki gibi: _headers (CSP) ve _redirects dahil
```

## Dokunulmaması gerekenler

- `public/_redirects` içindeki `/win` satırı: `irm livn.tr/win | iex` komutu buna bağlıdır (asıl yönlendirme Cloudflare'deki `livn.tr/win*` Page Rule'dur, bu satır yedektir).
- Kökte `win` ile başlayan sayfa, klasör veya dosya açmayın (`/windows-notlari` gibi): Cloudflare kuralı `livn.tr/win*` ile başlayan **her** adresi kurulum betiğine yönlendirir. Alt klasörlerde sorun yoktur (`/notlar/windows-…` güvenli).
- `public/_headers` sıkı bir güvenlik politikası (CSP) içerir: dışarıdan betik/stil/yazı tipi eklenemez; satır içi `<script>` ve `style="…"` çalışmaz. Yazı tipleri siteyle birlikte sunulur.

`npm run build` sonundaki `scripts/check-site.mjs` denetimi bunları her derlemede doğrular ve bozulursa yayını durdurur: `/win` satırı, kökte `win*` yolu olmaması, iki dilin bölüm sayfaları ve 404, CSP uyumu, görsellerde alt metin, başlık/açıklama/og:image, kırık iç bağlantılar.
