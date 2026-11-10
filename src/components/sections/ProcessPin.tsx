import { PROCESS_STEPS } from '../../data/process';
import { Reveal } from '../motion/Reveal';

/**
 * Les étapes de la consultation restent dans le flux normal du document.
 * Une version épinglée et synchronisée avec Lenis rendait la position
 * visuelle instable : la section sombre pouvait rester seule à l'écran
 * pendant que son contenu sortait du viewport. La liste empilée est plus
 * calme, plus lisible et fiable sur tous les navigateurs.
 */
export function ProcessPin() {
  return (
    <section className="on-dark" aria-labelledby="parcours-titre">
      <div className="section">
        <div className="shell">
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

            <div className="pin-content">
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
            </div>
          </div>
        </div>
    </section>
  );
}
