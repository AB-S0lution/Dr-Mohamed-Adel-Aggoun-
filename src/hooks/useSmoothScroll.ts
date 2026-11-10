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
        duration: 1.05,
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
