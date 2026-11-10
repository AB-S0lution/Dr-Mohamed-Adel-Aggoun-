// Mouvement additionnel pour les pages secondaires (spécialités, conseils
// santé, FAQ, contact) — mêmes règles que reveal.ts / process-pin.ts :
// transform/opacity uniquement, GSAP + ScrollTrigger, désactivé sous
// prefers-reduced-motion, écran étroit traité avec la même prudence que le
// pin existant (pas de pin sur mobile, juste le scrub léger).

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function reduceMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Parallax discret sur une illustration décorative pendant qu'elle traverse l'écran. */
export function initIllustrationParallax(selector: string) {
  const el = document.querySelector<HTMLElement>(selector);
  if (!el || reduceMotion()) return;
  gsap.to(el, {
    yPercent: 10,
    ease: 'none',
    scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
  });
}

/** Révélation scrubée d'un élément (ex. motif décoratif) pendant qu'il entre dans la vue. */
export function initScrubReveal(selector: string, opts: { yFrom?: number } = {}) {
  const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
  if (!els.length || reduceMotion()) return;
  els.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0.4, y: opts.yFrom ?? 22 },
      {
        opacity: 1,
        y: 0,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom-=40', end: 'top center', scrub: 0.4 },
      },
    );
  });
}
