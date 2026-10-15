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

### Keşke listesi — 1. aşama (2026-10-15)
- Eğitim bölümü kaldırıldı (kullanıcı isteği).
- İletişim bandı: "Yıldırım Kimya'daki görevimi sürdürüyorum; uygunluğum ölçüsünde teknik destek/danışmanlık" tonu.
- Web Analytics kullanıcı tarafından açıldı; CSP'ye yalnız `static.cloudflareinsights.com` (script) ve `cloudflareinsights.com` (connect) eklendi.
- JSON-LD: ana sayfa WebSite + Person, Hakkımda ProfilePage. Denetim JSON-LD'ye izin verir, geçerliliğini doğrular.
- Kartvizit: `/kaan-akdag.vcf` (fotoğraflı) + Hakkımda'da QR (fotoğrafsız vCard, çevrimdışı çalışır). Telefon yalnız vCard/QR'da.
- Notlar: 3 teknik yazı (loop check, S7-1500 program yapısı, WinCC alarm yönetimi), TR+EN, RSS (`/notlar/rss.xml`, `/en/notes/rss.xml`). Genel mühendislik pratikleri; kullanıcı gözden geçirecek.
- Gizlilik sayfası: `/gizlilik/`, `/en/privacy/` (çerezsiz analitik, barındırma, KVKK md. 11).
- kaan@livn.tr (Email Routing): token yetkisi yok → kullanıcı panelden ya da token'a izin ekleyerek.

### Keşke listesi — 2. aşama: A bölümü (önizleme, onay bekliyor)
- A1 proses hattı: ≥1200 px'te bölümlerin solunda boru; kaydırmaya bağlı dolar (CSS scroll-driven, `@supports`), başlıklarda enstrüman düğümü yanar.
- A2 harita zaman yolculuğu: Oynat/Durdur, yıl kaydırıcısı, sayaç; görünür olunca bir kez kendiliğinden oynar; İzmir'den yurt dışı projelere yay.
- A3 HMI paneli: tank/pompa/vana, LT/FT/PT değerleri, 60 sn trend; "SİMÜLASYON" etiketli; görünmezken durur.
- A4 sayfa geçişleri: cross-document View Transitions; tıklanan kartın çizimi ve başlığı detay kapağına dönüşür (ad CSSOM ile atanır, CSP uyumlu).
- A5 sayaçlar (IntersectionObserver) ve süzülerek giren öğeler (`translate`/`scale`, hover ile çakışmaz).
- A6 14 çizim türü (`schematic` alanı), detay sayfasında devreye alma sırası + "DEVREYE ALINIYOR… → ÇALIŞIYOR".
- A7 ilk ziyaret açılışı: karar `theme.js` içinde (çizimden önce), 1,4 sn, tıkla/tuşla atlanır, CSS ile 2,6 sn'de kendiliğinden kalkar.
- Hepsi `prefers-reduced-motion` ile kapanır. Lighthouse (yerel, mobil): 96–100 / 100 / 100 / 100; CLS ≈ 0, TBT 0 ms.

### E-posta (2026-10-15)
- Email Routing kullanıcı tarafından açıldı (MX ×3, SPF, cf2024-1 DKIM). Hedef akdagkn@gmail.com doğrulanmış; kaan@livn.tr → Gmail kuralı mevcut.
- Eklendi: `_dmarc.livn.tr TXT "v=DMARC1; p=none; rua=mailto:kaan@livn.tr"` (izleme modu). Değişiklik öncesi DNS yedeği alındı.
- Site, vCard ve QR adresi kaan@livn.tr (A bölümüyle birlikte yayına girecek).
- Resend (giden posta): livn.tr alan adı (EU) doğrulandı. Eklenen DNS: `resend._domainkey` TXT (DKIM), `send` CNAME → send.forge.rmta.net, `rsend` CNAME → rsend-euw1.forge.rmta.net (proxy kapalı). Öncesinde DNS yedeği alındı.
- Uçtan uca test: Resend ile kaan@livn.tr → kaan@livn.tr gönderildi, durum "delivered" (Cloudflare yönlendirmesiyle Gmail'e).
- Kalan (kullanıcı): Gmail → "Postaları farklı adresten gönder" (smtp.resend.com:587, kullanıcı `resend`, yeni Sending access anahtarı); sohbette paylaşılan Resend anahtarı silinecek.

### Yayın: A bölümü + kaan@livn.tr (2026-10-15)
- Kullanıcı onayıyla `main` (5ecec40) yayında. Canlı kontrol: tüm bölüm sayfaları 200, 404, www, `/win` 301 (betik içeriği doğrulandı), vCard'da kaan@livn.tr, Cloudflare e-posta gizleme betiği yok.
- Playwright (masaüstü + mobil): yatay kaydırma yok, sayfa hatası yok; açılış kalkıyor, harita zaman yolculuğu 2026'da "21 proje · 4 ülke" ile bitiyor, "Seç" düğmesi komutu seçiyor.
- Lighthouse (canlı, mobil): performans 96–100, erişilebilirlik 100, SEO 100; best-practices 96 yalnız bu ortamın ağının analitik betiğini engellemesinden (gerçek ziyaretçide oluşmaz).
- Kullanıcı Gmail "farklı adresten gönder" ayarını tamamladı.

### Animasyonlar görünmüyordu (2026-10-15)
- Neden: kullanıcının sisteminde "hareketi azalt" (Windows → Animasyon efektleri kapalı) açık; site bu sinyalde tüm animasyonları kapatıyordu.
- Çözüm: `<html class="motion">` sınıfı (public/theme.js): sitedeki "Animasyonlar" düğmesi > sistem ayarı; seçim localStorage'da. CSS'teki tüm hareket kuralları `:root.motion` altında.
- HMI değerleri/trend ve sayaçlar artık her durumda çalışır (veri değişimi, hareket değil). Açılış, akış, dönme, kaydırma animasyonları ve harita otomatik oynatma yalnız `motion` ile.
