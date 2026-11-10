// Accordéon FAQ — hauteur animée via transform/opacity-friendly technique
// (on anime `height` uniquement ici, seule exception tolérée car il n'existe
// pas d'équivalent transform pour un dévoilement de contenu de hauteur
// variable ; voir skill `animate`, règle accordéon).

export function initAccordions(root: ParentNode = document) {
  const items = Array.from(root.querySelectorAll<HTMLElement>('.accordion-item'));
  items.forEach((item) => {
    const trigger = item.querySelector<HTMLButtonElement>('.accordion-trigger');
    const panel = item.querySelector<HTMLElement>('.accordion-panel');
    if (!trigger || !panel) return;
    const inner = panel.firstElementChild as HTMLElement | null;

    item.dataset.open = 'false';
    panel.style.height = '0px';

    trigger.addEventListener('click', () => {
      const isOpen = item.dataset.open === 'true';
      if (isOpen) {
        panel.style.height = `${panel.scrollHeight}px`;
        requestAnimationFrame(() => {
          panel.style.height = '0px';
        });
        item.dataset.open = 'false';
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        // close siblings within the same accordion group for focus clarity
        const group = item.closest('[data-accordion-group]');
        group?.querySelectorAll<HTMLElement>('.accordion-item[data-open="true"]').forEach((sib) => {
          if (sib === item) return;
          const sibPanel = sib.querySelector<HTMLElement>('.accordion-panel');
          const sibTrigger = sib.querySelector<HTMLButtonElement>('.accordion-trigger');
          if (sibPanel) sibPanel.style.height = '0px';
          sib.dataset.open = 'false';
          sibTrigger?.setAttribute('aria-expanded', 'false');
        });

        panel.style.height = `${inner?.scrollHeight ?? panel.scrollHeight}px`;
        item.dataset.open = 'true';
        trigger.setAttribute('aria-expanded', 'true');
      }
    });

    panel.addEventListener('transitionend', (e) => {
      if (e.propertyName === 'height' && item.dataset.open === 'true') {
        panel.style.height = 'auto';
      }
    });
  });

  window.addEventListener('resize', () => {
    items.forEach((item) => {
      if (item.dataset.open !== 'true') return;
      const panel = item.querySelector<HTMLElement>('.accordion-panel');
      if (panel) panel.style.height = 'auto';
    });
  });
}
