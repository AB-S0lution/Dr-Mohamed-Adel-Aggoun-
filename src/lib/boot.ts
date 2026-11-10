// Amorçage commun à toutes les pages : thème, en-tête, menu mobile,
// révélations au défilement, courbe d'équilibre, défilement fluide, année
// de pied de page. Les scripts de page appellent `bootCommon()` puis
// ajoutent leur propre logique spécifique.
import { initThemeToggle } from './theme';
import { initHeaderScrollState, initMobileNav, markActiveNav } from './nav';
import { initReveal, initCurveDraw } from './reveal';
import { initSmoothScroll } from './smooth-scroll';
import { renderFooter } from './footer';

export function bootCommon() {
  renderFooter();
  initThemeToggle(document.getElementById('theme-toggle'));
  initHeaderScrollState(document.querySelector('[data-header-bar]'));
  initMobileNav({
    toggle: document.getElementById('menu-toggle'),
    panelRoot: document.getElementById('mobile-nav'),
    closeBtn: document.getElementById('mobile-nav-close'),
  });
  markActiveNav();
  initSmoothScroll();

  const year = document.getElementById('footer-year');
  if (year) year.textContent = String(new Date().getFullYear());

  // Defer non-critical visual enhancements until the browser is idle, so
  // first paint and input responsiveness are never blocked by them.
  const run = () => {
    initReveal();
    initCurveDraw();
  };
  if ('requestIdleCallback' in window) {
    (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(run);
  } else {
    setTimeout(run, 0);
  }
}
