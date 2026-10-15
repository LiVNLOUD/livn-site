// Ana sayfa sahnesi: tek seviye değeri dört katmanda aynı anda gösterilir.
// OTO: seviye kendiliğinden dolar/boşalır (simülasyon). MAN: ziyaretçi tankı sürükler ya da ok tuşlarını kullanır.
// Değer değişimi hareket sayılmaz; "hareketi azalt" açıkken de çalışır. Akış ve açılış animasyonları yalnız CSS'te (:root.motion).

const RAW_MAX = 27648; // S7 analog giriş: 4 mA = 0, 20 mA = 27648

function stage(root: HTMLElement) {
  const input = root.querySelector<HTMLInputElement>('[data-input]');
  if (!input) return;
  const $ = (k: string) => root.querySelector<HTMLElement>(`[data-out="${k}"]`);
  const out = { ma: $('ma'), raw: $('raw'), pv: $('pv'), pv2: $('pv2'), al: $('al') };
  const alarm = root.querySelector<HTMLElement>('[data-alarm]');
  const rungHi = root.querySelector('[data-rung="hi"]');
  const rungLo = root.querySelector('[data-rung="lo"]');
  const modes = [...root.querySelectorAll<HTMLButtonElement>('[data-mode]')];
  const HI = Number(root.dataset.hi ?? 80);
  const LO = Number(root.dataset.lo ?? 20);
  const label = { ok: root.dataset.lOk ?? '', hi: root.dataset.lHi ?? '', lo: root.dataset.lLo ?? '' };

  let v = Number(input.value);
  let auto = true;
  let dir = 1;
  let target = 86;
  let last = '';

  const render = () => {
    const pv = v.toFixed(1);
    root.style.setProperty('--lvl', String(v / 100));
    if (out.ma) out.ma.textContent = (4 + (16 * v) / 100).toFixed(2);
    if (out.raw) out.raw.textContent = String(Math.round((RAW_MAX * v) / 100));
    if (out.pv) out.pv.textContent = pv;
    if (out.pv2) out.pv2.textContent = pv;
    input.setAttribute('aria-valuetext', `${pv} %`);
    const state = v >= HI ? 'hi' : v <= LO ? 'lo' : 'ok';
    if (state === last) return;
    last = state;
    root.classList.toggle('is-hi', state === 'hi');
    root.classList.toggle('is-lo', state === 'lo');
    rungHi?.classList.toggle('on', state === 'hi');
    rungLo?.classList.toggle('on', state === 'lo');
    if (alarm) alarm.textContent = label[state];
    if (out.al) out.al.textContent = state === 'ok' ? 'null' : `"${state.toUpperCase()}"`;
  };

  const setMode = (a: boolean) => {
    auto = a;
    root.classList.toggle('is-man', !a);
    modes.forEach((b) => b.setAttribute('aria-pressed', String((b.dataset.mode === 'auto') === a)));
  };

  input.addEventListener('input', () => { setMode(false); v = Number(input.value); render(); });
  modes.forEach((b) => b.addEventListener('click', () => setMode(b.dataset.mode === 'auto')));

  // Görünmezken ya da sekme arka plandayken simülasyon durur
  let visible = true;
  if ('IntersectionObserver' in window) new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(root);

  const rand = (a: number, b: number) => a + Math.random() * (b - a);
  window.setInterval(() => {
    if (!auto || document.hidden || !visible) return;
    // Hedefe doğru rampa + küçük gürültü; hedefe varınca yön değişir (ara sıra alarm sınırlarını aşar)
    v += dir * rand(0.35, 0.8) + (Math.random() - 0.5) * 0.3;
    if (dir > 0 && v >= target) { dir = -1; target = rand(12, 34); }
    else if (dir < 0 && v <= target) { dir = 1; target = rand(70, 90); }
    v = Math.min(100, Math.max(0, v));
    input.value = String(v);
    render();
  }, 380);

  render();
}

const root = document.querySelector<HTMLElement>('[data-stage]');
if (root) stage(root);
