// A2: Harita üzerinde kariyer zaman yolculuğu. JavaScript yoksa harita son hâliyle görünür.
const fig = document.querySelector<HTMLElement>('.map');
const ctrl = document.querySelector<HTMLElement>('[data-map-ctrl]');
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (fig && ctrl) {
  const input = ctrl.querySelector<HTMLInputElement>('[data-year-input]')!;
  const out = ctrl.querySelector<HTMLOutputElement>('[data-year-out]')!;
  const count = ctrl.querySelector<HTMLElement>('[data-count-out]')!;
  const play = ctrl.querySelector<HTMLButtonElement>('[data-play]')!;
  const dots = [...fig.querySelectorAll<SVGAElement>('.map-dot')];
  const arcs = [...fig.querySelectorAll<SVGPathElement>('.map-arc')];
  const min = Number(input.min);
  const max = Number(input.max);
  // Sayaç metni dil dosyasındaki kalıptan: "0 proje · 0 ülke" → sayılar yerine konur
  const tpl = count.dataset.tplP ?? '';
  const fmt = (p: number, c: number) => { let i = 0; return tpl.replace(/\d+/g, () => String(i++ === 0 ? p : c)); };

  const show = (year: number) => {
    let projects = 0;
    const countries = new Set<string>();
    for (const d of dots) {
      const ys = (d.dataset.years ?? '').split(',').map(Number);
      const n = ys.filter((y) => y <= year).length;
      d.classList.toggle('is-off', n === 0);
      d.classList.toggle('is-new', ys.includes(year));
      const label = d.querySelector('.map-n');
      if (label) label.textContent = n > 1 ? String(n) : '';
      projects += n;
      if (n) countries.add(d.dataset.cc ?? '');
    }
    for (const a of arcs) a.classList.toggle('is-on', Number(a.dataset.year) <= year);
    out.value = String(year);
    count.textContent = fmt(projects, countries.size);
  };

  let timer = 0;
  const stop = () => { window.clearInterval(timer); timer = 0; play.textContent = play.dataset.labelPlay ?? ''; play.setAttribute('aria-pressed', 'false'); };
  const start = () => {
    if (Number(input.value) >= max) input.value = String(min);
    play.textContent = play.dataset.labelPause ?? ''; play.setAttribute('aria-pressed', 'true');
    show(Number(input.value));
    timer = window.setInterval(() => {
      const y = Number(input.value) + 1;
      if (y > max) { stop(); return; }
      input.value = String(y); show(y);
    }, 650);
  };
  play.addEventListener('click', () => (timer ? stop() : start()));
  input.addEventListener('input', () => { stop(); show(Number(input.value)); });

  ctrl.hidden = false;
  fig.classList.add('map-timeline');
  show(max);

  // Harita ilk kez görünür olduğunda bir kez kendiliğinden oynar
  if (!calm && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      input.value = String(min);
      start();
    }, { threshold: 0.55 });
    io.observe(fig);
  }
}
