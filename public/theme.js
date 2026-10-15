// Tema: sayfa çizilmeden önce kayıtlı tercihi uygular (yanıp sönmeyi önler) ve tema düğmesini bağlar.
// Ayrı dosya olarak yüklenir; böylece katı CSP satır içi betik gerektirmez.
(function () {
  var root = document.documentElement;
  try { var saved = localStorage.getItem('theme'); if (saved === 'light' || saved === 'dark') root.dataset.theme = saved; } catch (e) {}
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.querySelector('.theme-btn');
    if (!btn) return;
    btn.hidden = false;
    btn.addEventListener('click', function () {
      var current = root.dataset.theme || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
      var next = current === 'light' ? 'dark' : 'light';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  });
})();
