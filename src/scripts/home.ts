// Ana sayfa etkileşimleri: açılış (ilk ziyaret), sayaçlar, HMI simülasyonu.
// Açılış yalnız <html class="motion"> iken çalışır (bkz. src/scripts/theme-boot.js).
// HMI değerleri ve sayaçlar hareket değil veri değişimidir; her durumda çalışır.

// --- A7: İlk ziyarette kısa "devreye alma" açılışı ---
function boot() {
  const html = document.documentElement;
  const el = document.querySelector<HTMLElement>('[data-boot]');
  if (!el) return;
  if (!html.classList.contains('boot-pending')) { el.remove(); return; }
  try { localStorage.setItem('livn-boot', '1'); } catch { /* yok say */ }
  const done = () => {
    el.classList.add('boot-out');
    window.setTimeout(() => { html.classList.remove('boot-pending'); el.remove(); }, 420);
  };
  el.addEventListener('click', done, { once: true });
  addEventListener('keydown', done, { once: true });
  window.setTimeout(done, 1400);
}

// --- A5: Sayaçlar görünür olunca sıfırdan sayar ---
function counters() {
  const els = [...document.querySelectorAll<HTMLElement>('[data-count]')];
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      io.unobserve(e.target);
      const el = e.target as HTMLElement;
      const target = Number(el.dataset.count);
      const t0 = performance.now();
      const step = (now: number) => {
        const k = Math.min(1, (now - t0) / 1300);
        el.textContent = String(Math.round(target * (1 - Math.pow(1 - k, 3))));
        if (k < 1) requestAnimationFrame(step);
      };
      el.textContent = '0';
      requestAnimationFrame(step);
    }
  }, { threshold: 0.6 });
  els.forEach((el) => io.observe(el));
}

// --- A3: HMI simülasyonu (değerler gerçek değildir; panel "SİMÜLASYON" etiketlidir) ---
function hmi() {
  const root = document.querySelector<HTMLElement>('[data-hmi]');
  if (!root) return;
  const level = root.querySelector<SVGRectElement>('[data-level]');
  const line = root.querySelector<SVGPolylineElement>('[data-trend]');
  const v = (k: string) => root.querySelector<SVGTSpanElement>(`[data-v="${k}"]`);
  const out = { lvl: v('lvl'), flow: v('flow'), p: v('p') };
  const st = { lvl: 62.4, flow: 18.6, p: 3.42, dir: 1 };
  const walk = (x: number, mean: number, k: number, noise: number) => x + (mean - x) * k + (Math.random() - 0.5) * noise;
  // Trend, son 60 örnekle dolu başlar (boş çizgi görünmesin)
  const hist: number[] = [];
  for (let i = 0, f = 18.6; i < 60; i++) { f = walk(f, 18.6, 0.15, 0.9); hist.push(f); }
  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(root);
  root.classList.add('hmi-live');
  const tick = () => {
    if (document.hidden || !visible) return;
    // Seviye yavaşça dolar/boşalır; debi ve basınç küçük dalgalanır
    st.lvl += st.dir * (0.4 + Math.random() * 0.5);
    if (st.lvl > 82) st.dir = -1;
    if (st.lvl < 38) st.dir = 1;
    st.flow = walk(st.flow, 18 + (st.dir > 0 ? 1.2 : -1.2), 0.15, 0.9);
    st.p = walk(st.p, 3.4, 0.2, 0.06);
    hist.push(st.flow); hist.shift();
    if (level) { const h = 96 * st.lvl / 100; level.setAttribute('y', String(30 + 96 - h)); level.setAttribute('height', String(h)); }
    if (out.lvl) out.lvl.textContent = st.lvl.toFixed(1);
    if (out.flow) out.flow.textContent = st.flow.toFixed(1);
    if (out.p) out.p.textContent = st.p.toFixed(2);
    if (line) line.setAttribute('points', hist.map((y, i) => `${(i * 360 / 59).toFixed(1)},${(64 - (y - 14) * 64 / 10).toFixed(1)}`).join(' '));
  };
  tick();
  window.setInterval(tick, 600);
}

boot();
counters();
hmi();
