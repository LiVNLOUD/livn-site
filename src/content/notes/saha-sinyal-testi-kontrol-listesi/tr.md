---
title: "Devreye almadan önce: saha sinyal testi (loop check) kontrol listesi"
date: 2026-10-15
summary: "Proses başlamadan kablo, adres, ölçek ve alarm hatalarını yakalamak için sinyal sinyal izlenecek adımlar."
---

Devreye almanın en ucuz hatası, proses çalışmaya başlamadan bulunan hatadır. Saha sinyal testi (loop check), her I/O noktasını sahadaki cihazdan SCADA ekranındaki metne kadar uçtan uca doğrular. Aşağıdaki liste sahada çıktı alınıp kullanılacak şekilde düzenlendi.

## Hazırlık

- Güncel **I/O listesi** ve elektrik şemaları (revizyon numaralarıyla).
- Enstrüman veri sayfaları ve kalibrasyon sertifikaları (ölçüm aralığı, çıkış tipi).
- Her sinyal için bir satırı olan **test formu**: etiket, adres, beklenen değer, sonuç, imza.
- Sahadaki ekip ile kontrol odası arasında telsiz/telefon; çalışma izni ve gerekiyorsa kilitleme–etiketleme (LOTO).
- 4–20 mA kalibratörü (ölçme + besleme), multimetre, izolasyon test cihazı.

## Dijital girişler

1. Sahada kontağı gerçekten değiştir (şalteri, seviye şalterini, limit switch'i çalıştır); köprüyle değil, mümkünse cihazın kendisiyle.
2. PLC'de doğru giriş bitinin değiştiğini gör.
3. SCADA'da durum rengi ve **alarm metni** doğru mu? Metin, etiket ve ekipman adını içermeli.
4. Normalde açık / normalde kapalı mantığını kontrol et. Güvenlik sinyallerinde kablo kopmasının "güvenli" duruma düşmesi (fail-safe) gerekir.

## Dijital çıkışlar

1. SCADA'dan komut ver → PLC çıkışı → röle/kontaktör → saha cihazı.
2. **Geri bildirim** (çalışıyor/açık) sinyali gelmeli; gelmezse zaman aşımı alarmı oluşmalı.
3. Motorlarda dönüş yönünü mümkünse kaplin ayrıkken kontrol et.

## Analog girişler (4–20 mA)

1. Kalibratörle %0, %25, %50, %75, %100 değerlerini uygula.
2. PLC'de ham değeri izle (S7-1500'de nominal aralık 0–27648) ve mühendislik birimine ölçeklenmiş değeri kontrol et.
3. SCADA'daki değer ve birim aynı mı? Transmitter aralığı ile PLC ölçeği eşleşiyor mu (ör. transmitter 0–10 bar, PLC 0–16 bar ayarlı olmasın)?
4. Hat kopması ve aralık dışı davranışını dene: NAMUR NE 43'e göre 3,6 mA altı ve 21 mA üstü arıza sayılır; PLC bunu alarm olarak görmeli.

## Analog çıkışlar

- Pozisyonere %0, %50, %100 gönder; vananın fiziksel konumunu ve varsa konum geri bildirimini kontrol et.

## Haberleşme ve sürücüler

- Profinet/Profibus cihaz adları ve adresleri listeyle aynı mı? Sürücü parametreleri (nominal akım, rampa süreleri) kayıtlı mı?

## Kayıt ve kapanış

- Her sinyal için formu doldur ve imzalat. Açık kalan maddeleri **punch list**'e yaz; sorumlusu ve tarihi olsun.
- Sık görülen hatalar: ölçek uyuşmazlığı, ters bağlanmış iki telli loop, iki ucundan topraklanmış ekran (shield), yanlış/eksik alarm metni, test sırasında unutulan köprüler.

Test bittiğinde SCADA'daki her etiketin sahada bir karşılığı, sahadaki her cihazın da SCADA'da doğru bir temsili olmalı.
