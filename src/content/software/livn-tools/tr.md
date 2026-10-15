---
title: Livn Tools
summary: Format öncesi kurtarma, format sonrası kurulum ve günlük bakım için Windows 10 / 11 araç kutusu. Her değişiklik önce gösterilir ve geri alınabilir.
order: 1
status: active
version: 4.0.1
platform: Windows 10 / 11 · PowerShell 5.1
repo: https://github.com/LiVNLOUD/livn-tools
command: irm livn.tr/win | iex
commandNote: PowerShell'i yönetici olarak açıp komutu yapıştırın. Kurucu en son yayımlanmış sürümü indirir ve her dosyayı SHA-256 ile doğrular. Uygulamayı açmak tek başına hiçbir ayarı değiştirmez.
links:
  - label: Son sürüm (ZIP)
    href: https://github.com/LiVNLOUD/livn-tools/releases/latest
  - label: Kurulum betiğini incele
    href: https://raw.githubusercontent.com/LiVNLOUD/livn-tools/main/win.ps1
---

| Formattan önce | Formattan sonra | Günlük kullanım |
|---|---|---|
| Sürücüleri, uygulama listesini ve oyun kayıtlarını USB'ye al | Önce ağ sürücüsünü kur, internetsiz bile | Sistem Kontrolü ile sorunları gör |
| Livn'in kendisini ve ayarlarını kite kopyala | Uygulamaları WinGet ile toplu kur | Silmeden önce temizlenecek alanı gör |
| | Ayarlarını önizleyip yeniden uygula | Ayarları dene, önceki değerlerine dön |

**Neler var:** Sistem Kontrolü, Kurtarma Kiti, Format Sonrası uygulama kurulumu, temizlik ve bakım, güç planları ve oyun ayarları, ağ ölçümü (ping, dalgalanma, DNS), Windows ve gizlilik ayarları, başlangıç uygulamaları ve değişiklik geçmişi. Hazır seçimler (Oyuncu modu, Temel, Gizlilik, Görünüm, Akıcı görünüm, Maksimum performans) yalnız seçim yapar; güvenliği azaltan ayarlar hiçbirine dahil değildir.

**Nasıl çalışır:** her ayar uygulanmadan önce mevcut ve hedef değeri, riski ve yeniden başlatma gereksinimi gösterilir; önceki değer kaydedilir ve işlemden sonra yeniden okunur. Temizlik, uygulama kurulumu ve sürücü kurulumu bu geri alma kapsamında değildir.

**Gereksinimler:** Windows 10 22H2 veya Windows 11 (x64), Windows PowerShell 5.1, yönetici yetkisi. Uygulama kurulumu için WinGet.

**Komut kullanmadan:** son sürümün ZIP'ini indirip ayrı bir klasöre çıkarın, `LivnTools.bat` dosyasını çalıştırın.

**Önce okuyun:** Livn Tools kayıt defteri ve sistem ayarlarını değiştirebilir. Önizlemeyi okumadan uygulamayın ve bir geri yükleme noktası oluşturun. Güvenlik korumalarını (VBS, Spectre/Meltdown azaltmaları gibi) kapatan seçenekler sisteminizi daha savunmasız bırakır. Kullanım sizin sorumluluğunuzdadır.
