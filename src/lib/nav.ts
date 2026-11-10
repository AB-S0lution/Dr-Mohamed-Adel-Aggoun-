// Navigation : menu mobile (sheet plein écran), halo de l'en-tête au
// défilement (via IntersectionObserver sur une sentinelle, jamais de
// listener `scroll`), et marquage de la page active.

export function initHeaderScrollState(bar: HTMLElement | null) {
  if (!bar) return;
  const sentinel = document.createElement('div');
  sentinel.setAttribute('aria-hidden', 'true');
  sentinel.style.position = 'absolute';
  sentinel.style.top = '0';
  sentinel.style.height = '1px';
  sentinel.style.width = '1px';
  document.body.prepend(sentinel);

  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(
    ([entry]) => {
      bar.dataset.scrolled = entry.isIntersecting ? 'false' : 'true';
    },
    { threshold: 0, rootMargin: '-64px 0px 0px 0px' },
  );
  observer.observe(sentinel);
}

export function initMobileNav(opts: {
  toggle: HTMLElement | null;
  panelRoot: HTMLElement | null;
  closeBtn: HTMLElement | null;
}) {
  const { toggle, panelRoot, closeBtn } = opts;
  if (!toggle || !panelRoot) return;
  const toggleEl: HTMLElement = toggle;
  const panelEl: HTMLElement = panelRoot;

  const links = Array.from(panelEl.querySelectorAll<HTMLElement>('.mobile-nav__links a'));
  links.forEach((a, i) => {
    a.style.setProperty('--stagger', `${60 + i * 45}ms`);
  });

  function open() {
    panelEl.dataset.open = 'true';
    toggleEl.setAttribute('aria-expanded', 'true');
    document.body.classList.add('noscroll');
  }
  function close() {
    panelEl.dataset.open = 'false';
    toggleEl.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('noscroll');
  }

  toggleEl.addEventListener('click', () => {
    const isOpen = panelEl.dataset.open === 'true';
    isOpen ? close() : open();
  });
  closeBtn?.addEventListener('click', close);
  panelRoot.querySelector('.mobile-nav__scrim')?.addEventListener('click', close);
  links.forEach((a) => a.addEventListener('click', close));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

export function markActiveNav(root: ParentNode = document) {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  root.querySelectorAll<HTMLAnchorElement>('a[data-nav-link]').forEach((a) => {
    const href = a.getAttribute('href') ?? '';
    const file = href.split('/').pop() || 'index.html';
    if (file === current || (current === '' && file === 'index.html')) {
      a.setAttribute('aria-current', 'page');
    }
  });
}
