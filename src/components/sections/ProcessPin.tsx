import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROCESS_STEPS } from '../../data/process';
import { MQ_PIN_SCENE } from '../../lib/breakpoints';
import { Reveal } from '../motion/Reveal';

gsap.registerPlugin(ScrollTrigger);

/**
 * La seule scène épinglée du site (règle du projet : une seule). Les
 * étapes de la consultation défilent horizontalement pendant que la
 * section reste fixe. Sous reduced-motion ou sur petit écran, pas de
 * pin, pas de scrub : la même liste, empilée, lisible d'un coup.
 */
export function ProcessPin() {
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(MQ_PIN_SCENE);
    const sync = () => setEnabled(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!enabled || !stage.current || !track.current) return;

    const ctx = gsap.context(() => {
      const el = track.current;
      if (!el) return;
      const distance = () => el.scrollWidth - el.parentElement!.clientWidth;

      gsap.to(el, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: stage.current,
          start: 'top top',
          end: () => `+=${PROCESS_STEPS.length * 300}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, stage);

    return () => ctx.revert();
  }, [enabled]);

  return (
    <section className="on-dark" aria-labelledby="parcours-titre">
      <div ref={stage} className="pin-stage">
        <div className={enabled ? 'pin-viewport' : 'section'}>
          <div className="shell" style={{ width: '100%' }}>
            <Reveal>
              <span className="eyebrow" style={{ color: 'var(--c-blue-400)' }}>
                Déroulement
              </span>
              <h2 id="parcours-titre" className="display-lg" style={{ maxWidth: '22ch' }}>
                Ce qui se passe pendant une <span className="accent-word" style={{ color: 'var(--c-blue-400)' }}>consultation</span>
              </h2>
              <p className="lede" style={{ color: 'var(--ink-invert-soft)', marginTop: '1rem' }}>
                Cinq temps, du motif de la visite au rythme de suivi. Savoir à quoi s'attendre
                enlève une part de l'appréhension.
              </p>
            </Reveal>

            <div style={{ marginTop: 'clamp(2rem, 4vw, 3rem)', overflow: 'clip' }}>
              {enabled ? (
                <div ref={track} className="pin-track">
                  {PROCESS_STEPS.map((step) => (
                    <article key={step.index} className="pin-step">
                      <p className="pin-step__num tnum" aria-hidden="true">
                        {String(step.index).padStart(2, '0')}
                      </p>
                      <h3 className="display-md" style={{ fontSize: '1.15rem', marginBottom: '0.6rem' }}>
                        {step.title}
                      </h3>
                      <p style={{ color: 'var(--ink-invert-soft)', lineHeight: 1.65, fontSize: '0.95rem' }}>
                        {step.description}
                      </p>
                    </article>
                  ))}
                </div>
              ) : (
                <ol className="pin-fallback">
                  {PROCESS_STEPS.map((step) => (
                    <li key={step.index} className="pin-step">
                      <p className="pin-step__num tnum" aria-hidden="true">
                        {String(step.index).padStart(2, '0')}
                      </p>
                      <h3 className="display-md" style={{ fontSize: '1.15rem', marginBottom: '0.6rem' }}>
                        {step.title}
                      </h3>
                      <p style={{ color: 'var(--ink-invert-soft)', lineHeight: 1.65, fontSize: '0.95rem' }}>
                        {step.description}
                      </p>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
