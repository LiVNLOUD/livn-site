# İlk yayın: Cloudflare Pages + livn.tr

Mevcut durum (15 Ekim 2026, kullanıcı ölçümü): DNS Cloudflare'de (`iris`/`leonard.ns.cloudflare.com`; önceki: Turhost). `livn.tr/win` Cloudflare kuralıyla 301 → `raw.githubusercontent.com/LiVNLOUD/livn-tools/main/win.ps1`; çalışıyor. `livn.tr/` ve `robots.txt` **522** veriyor: kök kayıt yanıt vermeyen bir sunucuyu (büyük olasılıkla eski Turhost hosting) gösteriyor.

## 1. Kodu GitHub'a koy

Bu klasörü yeni bir depoya yükle (öneri: `LiVNLOUD/livn-site`). `node_modules` ve `dist` yüklenmez (`.gitignore`).

## 2. Pages projesi

Cloudflare paneli → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → depoyu seç.

| Ayar | Değer |
|---|---|
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | boş (ayrı depo). `livn-tools` içinde `site/` klasörü olarak durursa: `site` |
| Ortam değişkeni | `NODE_VERSION` = `22` |

İlk derleme bitince siteyi `https://<proje>.pages.dev` adresinde kontrol et. Bu adreste `/win` de çalışmalı (sitedeki yedek yönlendirme).

## 3. Alan adını bağla

Pages projesi → **Custom domains** → `livn.tr` ekle, ardından `www.livn.tr` ekle.

- Cloudflare mevcut kayıtlarla çakışma olduğunu söylerse: önce **DNS → Records** sayfasının ekran görüntüsünü al (geri dönüş için). Sonra yalnız `livn.tr` ve `www` adlarındaki **A / AAAA / CNAME** kayıtlarını sil ve alan adını tekrar ekle.
- **MX, TXT ve diğer kayıtlara dokunma** (e-posta veya doğrulama kayıtları olabilir).
- `/win` için tanımlı **Redirect Rule / Page Rule'u silme.** Site açıldıktan sonra da istekler önce o kurala uğrar.

## 4. Doğrula (PowerShell, salt okunur)

```powershell
curl.exe -sI https://livn.tr/        # HTTP 200 beklenir
curl.exe -sI https://livn.tr/en/     # HTTP 200
curl.exe -sI https://livn.tr/win     # 301 (veya 302), Location: https://raw.githubusercontent.com/LiVNLOUD/livn-tools/main/win.ps1
(irm livn.tr/win).Substring(0,200)   # betiğin ilk satırları görünmeli
```

Son komut HTML döndürürse `/win` yönlendirmesi çalışmıyor demektir: Custom domain'i kaldırıp eski duruma dön.

## Geri dönüş

Pages → Custom domains → `livn.tr` ve `www.livn.tr`'yi kaldır; silinen DNS kayıtlarını ekran görüntüsündeki değerlerle geri ekle.
