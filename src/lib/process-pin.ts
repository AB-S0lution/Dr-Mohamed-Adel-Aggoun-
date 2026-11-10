// Section épinglée « Déroulement d'une consultation » — unique scène
// épinglée du site (on évite d'en empiler plusieurs, cf. consigne de
// sobriété du mouvement). GSAP + ScrollTrigger, transform/opacity uniquement,
// désactivée sous prefers-reduced-motion.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initProcessPin(wrapSelector: string) {
  const wrap = document.querySelector<HTMLElement>(wrapSelector);
  if (!wrap) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isNarrow = window.matchMedia('(max-width: 899px)').matches;

  const steps = Array.from(wrap.querySelectorAll<HTMLElement>('.process-step'));
  const dots = Array.from(wrap.querySelectorAll<HTMLElement>('.process-dot'));
  if (reduceMotion || isNarrow || steps.length < 2) {
    // Calm fallback: plain stacked list, no pin, no scrub, no overlap.
    const stepsContainer = wrap.querySelector<HTMLElement>('#process-steps');
    if (stepsContainer) stepsContainer.style.minHeight = '0';
    steps.forEach((s, i) => {
      s.style.opacity = '1';
      s.style.transform = 'none';
      s.style.position = 'static';
      s.style.marginBottom = i < steps.length - 1 ? '2.5rem' : '0';
    });
    const dotsWrap = wrap.querySelector<HTMLElement>('.process-dot')?.parentElement;
    if (dotsWrap) dotsWrap.style.display = 'none';
    return;
  }

  const ctx = gsap.context(() => {
    steps.forEach((step, i) => {
      if (i === 0) return;
      gsap.set(step, { opacity: 0, y: 28 });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrap,
        start: 'top top+=72',
        end: () => `+=${steps.length * 300}`,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
      },
    });

    steps.forEach((step, i) => {
      if (i > 0) {
        tl.to(steps[i - 1], { opacity: 0, y: -24, duration: 0.4, ease: 'none' }, i);
        tl.to(step, { opacity: 1, y: 0, duration: 0.4, ease: 'none' }, i);
      }
      if (dots[i]) {
        tl.set(dots, { opacity: 0.35 }, i)
          .set(dots[i], { opacity: 1 }, i);
      }
    });
  }, wrap);

  return () => ctx.revert();
}
