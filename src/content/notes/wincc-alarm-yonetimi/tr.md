---
title: "WinCC Runtime Professional'da alarm yönetimi: az ama anlamlı alarm"
date: 2026-10-15
summary: "Alarm selini önlemek için sınıflar, gecikme ve histerezis, duruma göre bastırma ve anlaşılır alarm metinleri."
---

Bir tesiste alarm sayısı arttıkça operatörün kritik alarmı görme olasılığı azalır. ISA-18.2 ve EEMUA 191 gibi alarm yönetimi standartlarının ortak fikri basittir: **her alarm, operatörün yapması gereken bir eylemi göstermelidir.** Eylem gerektirmeyen bilgi alarm değil, olay kaydıdır.

## Sınıflandırma

- WinCC'de alarm sınıflarını (ör. arıza, uyarı, sistem) ve onay (acknowledge) kurallarını baştan belirle.
- Önceliği sonuca göre ver: güvenlik ve ekipman hasarı en üstte, bilgi amaçlı mesajlar alarm listesinde değil olay arşivinde.

## Gürültüyü azaltmak

- **Gecikme:** kısa süreli dalgalanmaların alarm üretmemesi için açılma gecikmesi kullan.
- **Histerezis:** analog limitlerde ölü bant olmadan değer sınırda gidip gelir ve alarm "çatırdar".
- **Duruma göre bastırma:** pompa dururken "düşük debi" alarmı anlamsızdır; bu koşulu PLC mantığında çöz.
- S7-1500'de alarmları PLC'de `Program_Alarm` ile üretmek, zaman damgasının olayın gerçekleştiği yerde atılmasını sağlar.

## Alarm metni

İyi bir metin üç soruya cevap verir: **nerede, ne oldu, ne yapmalı?**

- Zayıf: `Pompa arızası`
- İyi: `P-101 Besleme pompası: termik attı — sahada termik röleyi kontrol edin`

## Düzenli gözden geçirme

- Alarm arşivinden en sık gelen 10 alarmı belirli aralıklarla incele. Çoğu zaman listenin büyük kısmını birkaç "kötü" alarm oluşturur.
- Sürekli aktif kalan (stale) alarmları ve operatörün alışkanlıkla onayladığı alarmları ayıkla.

Hedef, normal işletmede alarm ekranının sakin olması ve bir alarm geldiğinde operatörün ne yapacağını hemen bilmesidir.
