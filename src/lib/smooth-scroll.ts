// Défilement fluide léger (Lenis). Désactivé entièrement si la personne a
// demandé moins de mouvement — le défilement natif reste disponible.
import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export function initSmoothScroll(): Lenis | null {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return null;

  const lenis = new Lenis({
    duration: 1.05,
    smoothWheel: true,
    syncTouch: false, // keep native touch scroll feel on mobile
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  lenisInstance = lenis;
  return lenis;
}

export function getLenis() {
  return lenisInstance;
}
