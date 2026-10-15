// A4: Kart → detay geçişinde kartın çizimi ve başlığı detay sayfasının kapağına "morph" olur.
// Adlar yalnız tıklanan karta verilir (sayfada benzersiz olmaları gerekir). Stil, CSSOM ile atanır (CSP uyumlu).
const name = (card: Element | null) => {
  if (!card) return;
  const media = card.querySelector<HTMLElement>('.card-media');
  const title = card.querySelector<HTMLElement>('.h3, h3, h2');
  if (media) media.style.viewTransitionName = 'ref-cover';
  if (title) title.style.viewTransitionName = 'ref-title';
};
const clear = () => document.querySelectorAll<HTMLElement>('.card-media, .card h2, .card h3').forEach((el) => { el.style.viewTransitionName = ''; });

document.addEventListener('click', (e) => {
  const a = (e.target as Element | null)?.closest?.('a');
  if (a && !(e as MouseEvent).ctrlKey && !(e as MouseEvent).metaKey) name(a.closest('.card'));
});

// Detaydan listeye geri dönüşte, gelinen karta aynı adları ver
addEventListener('pagereveal', (e: Event) => {
  const vt = (e as Event & { viewTransition?: { finished: Promise<void> } }).viewTransition;
  const from = (window as unknown as { navigation?: { activation?: { from?: { url?: string } } } }).navigation?.activation?.from?.url;
  if (!vt || !from) return;
  const path = new URL(from).pathname;
  const link = [...document.querySelectorAll<HTMLAnchorElement>('.card a')].find((l) => l.pathname === path);
  if (!link) return;
  name(link.closest('.card'));
  vt.finished.finally(clear);
});
addEventListener('pageshow', clear);
