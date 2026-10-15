---
title: "S7-1500 projelerinde okunabilir bir program yapısı"
date: 2026-10-15
summary: "OB, FB ve DB katmanları, ekipman blokları, analog işleme ve sürüm takibiyle bakımı kolay bir TIA Portal projesi."
---

Bir PLC programı yıllarca yaşar ve onu yazan kişiden çok, gece vardiyasında arıza arayan kişi okur. Bu yüzden iyi bir yapı, "çalışıyor" olmaktan daha önemlidir. TIA Portal ve S7-1500 ile çalışırken izlenebilecek bir düzen:

## Katmanlar

- **OB1** yalnızca çağrı yapar; mantık içermez. Okuyan kişi programın haritasını tek bakışta görür.
- Sabit periyot gerektiren işler (PID, sayaçlar, debi toplamları) **döngüsel kesme OB'sinde** (ör. OB30) çalışır; böylece çevrim süresinden bağımsız olur.
- Her **ekipman tipi** için bir FB: motor, vana, analog ölçüm, PID döngüsü. Her ekipman kendi örnek (instance) DB'sini kullanır.
- Ekipmanların HMI'a açılan arayüzü bir **UDT** ile tanımlanır (komut, durum, alarm, ayar). HMI tarafında aynı yapı faceplate olarak tekrar kullanılır.

## Adlandırma

- Etiketler P&ID'deki numaralarla aynı olmalı (`LT101`, `P101`, `FV203`). Sahadaki levha, şema ve programdaki ad aynıysa arıza ararken çeviri yapılmaz.
- Blok ve değişken adları tek bir kurala uyar; Türkçe/İngilizce karışık adlardan kaçınılır.

## Analog işleme

- Tek bir analog FB: ölçekleme (`NORM_X` / `SCALE_X`), hat kopması tespiti, alarm limitleri (histerezisli), simülasyon/bakım modu.
- Ham değer (0–27648) ve mühendislik değeri ayrı tutulur; ikisi de HMI'da teşhis için görülebilir.

## Test ve sürüm takibi

- Devreye almadan önce **PLCSIM Advanced** ile mantık ve HMI bağlantıları masada denenir.
- Proje arşivleri tarih ve kısa açıklamayla saklanır; daha düzenli ekipler için TIA Portal'ın sürüm kontrol arayüzü (Version Control Interface) Git ile birlikte kullanılabilir.
- Her değişiklik için kısa bir not: ne, neden, kim, ne zaman.

## Kısaca

Mantığı ekipman bloklarına koy, OB'leri yalnızca çağrı için kullan, adları P&ID ile eşle, analogları tek yerde işle. Program büyüse de okuması kolay kalır.
