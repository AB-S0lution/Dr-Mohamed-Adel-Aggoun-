import { useEffect } from 'react';

/**
 * Défilement fluide léger (Lenis), branché sur le ticker de GSAP pour que
 * la scène épinglée et le défilement lissé lisent la même position à la
 * même frame.
 *
 * Les deux librairies sont importées après le premier rendu : la page
 * s'affiche et défile nativement d'abord, le lissage s'installe ensuite.
 * Sous prefers-reduced-motion, rien n'est chargé du tout.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let dispose: (() => void) | null = null;
    let cancelled = false;

    (async () => {
      const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;

      const lenis = new Lenis({
        // `lerp` (poursuite image par image, compensée par le delta de temps)
        // plutôt que `duration` : avec duration, chaque coup de molette lance
        // un fondu d'une seconde vers la cible, et la page continue de glisser
        // longtemps après l'arrêt du geste, ce qui se lit comme de la latence.
        // 0.12 rattrape l'essentiel en ~150 ms : lissé, mais qui répond.
        lerp: 0.12,
        smoothWheel: true,
        syncTouch: false, // le toucher natif reste plus agréable sur mobile
      });

      const onScroll = () => ScrollTrigger.update();
      lenis.on('scroll', onScroll);

      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      dispose = () => {
        lenis.off('scroll', onScroll);
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    })();

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);
}
