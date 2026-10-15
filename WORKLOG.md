# WORKLOG — livn.tr

## 2026-10-15

### Devir
- Bundle'daki `publish` dalı (4d60232, dosyaları depo köküne taşır) alındı, temiz kurulumla derlendi, `claude/tender-faraday-att229` dalına gönderildi.
- Cloudflare durumu okundu ve yedeklendi (oturum dışında, depoya yazılmadı): Pages `livn` → `root_dir = "livn-site"`, build `npm run build` → `dist`, `NODE_VERSION=22`; DNS `livn.tr` ve `www` → CNAME `livn.pages.dev` (proxied); Page Rule `livn.tr/win*` → 301 `raw.githubusercontent.com/LiVNLOUD/livn-tools/main/win.ps1` (active).
- **Bekliyor:** `root_dir` boşaltma + `main`'e gönderme (canlı yayın; kullanıcı onayı bekleniyor).

### Tasarım kararları
- **Kimlik:** "Sahada devreye alınan otomasyon." Koyu antrasit zemin, sinyal turuncusu vurgu (koyu `#ff8a3d`, açık `#a8470a`), durum ışığı için yeşil. IBM Plex Sans (değişken) + IBM Plex Mono; siteyle birlikte sunulur (CSP değişmedi). Açık/koyu tema: sistem tercihi + düğme (`public/theme.js`, harici dosya).
- **Bölümler:** Referanslar (sektör süzgeci, `?sector=`), Yazılım, Notlar (not yokken menüde gizli), Hakkımda (+ iletişim). Kökte `win*` yolu yok.
- **İçerik yapısı:** her içerik bir klasör (`<koleksiyon>/<ad>/{tr,en}.md` + görseller). Şema derlemede doğrulanır; görsellerde `alt` zorunlu; dilden bağımsız alanlar iki dilde farklıysa derleme durur. Eksik dildeki içerik o dilde gizlenir.
- **Hareket:** karşılama metni ve proje kaydı satırları kısa giriş animasyonu; `prefers-reduced-motion` ile tamamen kapanır.
- **Görselsiz içerik:** sektör çizimi (sitenin kendi SVG'si). Varsayılan Open Graph görseli `public/og.png`; kapağı olan sayfada kapak kullanılır.
- **Denetim (`scripts/check-site.mjs`) genişletildi:** kökte `win*` yolu, iki dilde bölüm sayfaları, 404, alt metin, title/description/og:image, kırık iç bağlantılar.

### İçerik kaynağı ve yer tutucular
- 20 referans `KAAN_AKDAG_EN.pdf` (CV) "Projects" listesinden. **Müşteri adları yazılmadı** (izin gelene kadar); başlıklar tesis türü + yer. Tarihler CV'deki ay/yıl.
- `role` alanı, projenin tarihine denk gelen CV pozisyonundan türetildi (Espro 2013-05–2018-07, Geotek 2018-07–2019-11, Sistemas 2020-10–). MAP tesisi (2020-02) iki iş arasına düştüğü için rolü boş.
- Öne çıkan 6 referans (büyüklük/uluslararası): Ürgenç 5 t/h tuz, Çanakkale asit geri kazanım, Turda 12 t/h tuz, Alaşehir 12,30 MWe JES, Ağsu yem fabrikası, Kırıkkale 840 MW santral.
- Hakkımda metni CV'den çevrildi; kişisel bilgiler (doğum tarihi, medeni hal, telefon) yayınlanmadı.
- **Kullanıcıdan beklenen:** referans fotoğrafları ve kapsam ayrıntıları (PLC/SCADA markaları, I/O sayısı vb.), müşteri adı izinleri, portre, rol doğrulaması, deneyim yılı ifadesi (prompt 15 yıl, CV 10 yıl; sitede 2013'ten hesaplanıyor: "13+ yıl").

### Kullanıcı yanıtı sonrası (aynı gün)
- Deneyim: 15 yıl → `SITE.since = 2011`; metinlerde `{years}` ile hesaplanır. Konum: Bursa.
- Şu an: Yıldırım Kimya (Yıldırım Tuz Kimya San. ve Tic. A.Ş., Bursa) — elektrik ve otomasyon sorumlusu. Sistemas'taki son proje CN/MN granül ve pastil üretim tesisi (müşteri Yıldırım Kimya) referanslara eklendi (21 proje).
- Müşteri adları kullanıcı izniyle eklendi (CV'de geçenler): TPAO, Eti Maden, Atlas Enerji, Gama & Idom, İZSU, Hamitabat A.Ş., Wabag, AgroPark, Şenpiliç, İÇDAŞ, Yıldırım Kimya.
- Marka belirtilmeyen tüm projelere kullanıcı talimatıyla "Siemens S7-1500" + "WinCC Runtime Professional"; kapsamlara PLC, SCADA, devreye alma eklendi.
- MAP tesisi (CV'de 2020-02, Geotek–Sistemas arası boşlukta): kullanıcı "yalnız tarihi düzenle" dedi → ay kaldırıldı, yıl 2020, rol Sistemas.
- İşveren siteleri: Sistemas → sistemasteknoloji.com (arama motorunda güncel), Yıldırım Kimya → yildirimkimya.com.tr. Geotek (geotekotomasyon.com) ve Espro (esprootomasyon.com.tr) yayında olduğu doğrulanamadı → bağlantı konmadı. Bu ortamdan dış sitelere erişim kapalı.
- LinkedIn: ağ politikası engelli (linkedin.com, media.licdn.com); profil ve portre alınamadı.
- Fotoğraf yerine: projeye özel SCADA mimik tarzı şematik çizim (`Mimic.astro`, 6 sektör, etiketli) + derlemede üretilen proje haritası (`ProjectMap.astro`, Natural Earth/world-atlas, d3-geo; betik yok). Referans listesinde `?place=` ile konum süzgeci.
- Tarihler kullanıcıdan: Sistemas 2020-10 – 2026-02, Yıldırım Kimya 2026-02 –; CN/MN projesi 2026 (ay belirtilmedi).
- Geotek dönemi (Ağsu, Şenpiliç): Mitsubishi Electric PLC (kullanıcı onayı). Portre kullanıcıdan (src/assets/portre.jpg).
- Lighthouse (yerel, mobil): /, /referanslar/, detay → 95–100 / 100 / 100 / 100.

### Yayın (2026-10-15)
- Kullanıcı onayıyla Pages `root_dir` boşaltıldı, `main`'e gönderildi; Cloudflare derlemesi başarılı. Canlı kontrol: `/`, `/en/`, `/referanslar/`, detay sayfaları, 404, `www`, `/win` (301 → win.ps1, betik içeriği doğrulandı), CSP başlığı; Playwright mobil/masaüstü ekran görüntüleri incelendi.
- Cloudflare "Email Address Obfuscation" mailto bağlantılarını değiştirip betik ekliyordu; betik SVG bağlantılarında hata veriyordu → `EmailLink` bileşeni (`<!--email_off-->`), denetime kural eklendi. Zone ayarına dokunulmadı.
- Şematik çizimlerde eksi etiket numarası hatası düzeltildi (işaretsiz kaydırma).
- uBlock Origin "ClickFix" uyarısı: "Kopyala" düğmesi `irm … | iex` komutunu betikle panoya yazıyordu (kötü amaçlı sitelerin yöntemi). Düğme artık yalnız komutu seçiyor ("Seç"), kullanıcı Ctrl+C ile kopyalıyor; betikle panoya yazma yok.
- Web Analytics: token'da Account Analytics yetkisi yok (API 10000) → açılmadı.
