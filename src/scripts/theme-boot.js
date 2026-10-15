// Tema ve hareket tercihi: sayfa çizilmeden önce uygulanır (yanıp sönmeyi önler).
// Ayrı dosya olarak yüklenir; böylece katı CSP satır içi betik gerektirmez.
(function () {
  var root = document.documentElement;
  var get = function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } };
  var set = function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} };

  var saved = get('theme');
  if (saved === 'light' || saved === 'dark') root.dataset.theme = saved;

  // Animasyonlar: kullanıcının sitedeki seçimi > işletim sisteminin "hareketi azalt" ayarı
  var m = get('motion');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var motion = m === 'on' || (m !== 'off' && !reduce);
  if (motion) root.classList.add('motion');


  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.querySelector('.theme-btn:not(.motion-btn)');
    if (btn) {
      btn.hidden = false;
      btn.addEventListener('click', function () {
        var current = root.dataset.theme || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
        var next = current === 'light' ? 'dark' : 'light';
        root.dataset.theme = next;
        set('theme', next);
      });
    }
    var mb = document.querySelector('.motion-btn');
    if (mb) {
      mb.hidden = false;
      mb.setAttribute('aria-pressed', String(motion));
      mb.addEventListener('click', function () {
        set('motion', motion ? 'off' : 'on');
        location.reload();
      });
    }
  });
})();
