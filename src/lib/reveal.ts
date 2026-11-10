// Révélation au défilement : discrète, légère, jamais bloquante.
// IntersectionObserver uniquement — jamais de listener `scroll`.

export function initReveal(root: ParentNode = document) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  // Stagger siblings that share a group, in document order.
  const groups = new Map<string, HTMLElement[]>();
  items.forEach((el) => {
    const group = el.dataset.revealGroup ?? '__solo__' + Math.random();
    const list = groups.get(group) ?? [];
    list.push(el);
    groups.set(group, list);
  });
  groups.forEach((list) => {
    list.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i * 60, 360)}ms`;
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
  );

  items.forEach((el) => observer.observe(el));
}

export function initCurveDraw(root: ParentNode = document) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const curves = Array.from(root.querySelectorAll<SVGPathElement>('.curve-draw'));
  if (reduceMotion || !('IntersectionObserver' in window)) {
    curves.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const scrubSupported =
    typeof CSS !== 'undefined' && CSS.supports && CSS.supports('animation-timeline: view()');
  curves.forEach((el) => {
    if (scrubSupported) el.dataset.scrub = 'true';
  });

  const toObserve = curves.filter((el) => el.dataset.scrub !== 'true');
  if (!toObserve.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 },
  );
  toObserve.forEach((el) => observer.observe(el));
}
