import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Info } from '@phosphor-icons/react';
import {
  BMI_CATEGORIES,
  BMI_ERROR_MESSAGES,
  computeBmi,
  validateBmiInputs,
  type BmiResult,
} from '../../lib/bmi';

const EASE = [0.23, 1, 0.32, 1] as const;

/**
 * Outil informatif : tout est calculé dans le navigateur, rien n'est
 * envoyé. Pas de diagnostic, pas de conseil personnalisé (PLAN.md §4) :
 * le résultat renvoie vers une consultation, jamais vers une conclusion.
 */
export function BmiTool() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<BmiResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const reduce = useReducedMotion();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const h = Number(height.replace(',', '.'));
    const w = Number(weight.replace(',', '.'));
    const invalid = validateBmiInputs(h, w);
    if (invalid) {
      setError(BMI_ERROR_MESSAGES[invalid]);
      setResult(null);
      return;
    }
    setError(null);
    setResult(computeBmi(h, w));
  }

  return (
    <form onSubmit={onSubmit} noValidate className="stack stack-md">
      <div className="split" style={{ gap: '1rem' }}>
        <div>
          <label className="field-label" htmlFor="bmi-height">
            Taille (cm)
          </label>
          <input
            id="bmi-height"
            className="field tnum"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            placeholder="170"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? 'bmi-error' : undefined}
          />
        </div>
        <div>
          <label className="field-label" htmlFor="bmi-weight">
            Poids (kg)
          </label>
          <input
            id="bmi-weight"
            className="field tnum"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            placeholder="72"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? 'bmi-error' : undefined}
          />
        </div>
      </div>

      <div aria-live="polite">
        {error ? (
          <p id="bmi-error" style={{ color: 'var(--c-signal-high)', fontSize: '0.9rem' }}>
            {error}
          </p>
        ) : null}
      </div>

      <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
        Calculer
        <span className="btn__icon" aria-hidden="true">
          <ArrowRight size={14} weight="bold" />
        </span>
      </button>

      <AnimatePresence mode="wait">
        {result ? (
          <motion.div
            key={result.value}
            className="card stack stack-md"
            initial={reduce ? { opacity: 0 } : { opacity: 0, transform: 'translateY(0.9rem)' }}
            animate={{ opacity: 1, transform: 'translateY(0rem)' }}
            transition={{ duration: 0.42, ease: EASE }}
            role="status"
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', flexWrap: 'wrap' }}>
              <p className="result-value tnum">{result.value.toFixed(1).replace('.', ',')}</p>
              <p style={{ fontWeight: 600 }}>{result.category.label}</p>
            </div>

            <div>
              <div className="gauge" role="presentation">
                <span
                  className="gauge__needle"
                  style={{ left: `calc(${(result.gaugePosition * 100).toFixed(1)}% - var(--nudge) / 2)` }}
                  aria-hidden="true"
                />
              </div>
              <ul
                className="text-muted tnum"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.72rem',
                  marginTop: '0.75rem',
                  gap: '0.5rem',
                }}
              >
                {BMI_CATEGORIES.filter((_, i) => i % 2 === 0).map((c) => (
                  <li key={c.key}>{c.range}</li>
                ))}
              </ul>
            </div>

            <p className="text-muted" style={{ fontSize: '0.88rem', display: 'flex', gap: '0.5rem' }}>
              <Info size={18} weight="light" style={{ flex: 'none', marginTop: '0.1rem' }} />
              <span>
                L'IMC est un repère de population, pas un diagnostic. Il ne distingue pas la masse
                musculaire de la masse grasse et ne vaut pas pour l'enfant, la femme enceinte ou le
                sportif. Seule une consultation permet d'interpréter ce chiffre dans votre situation.
              </span>
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </form>
  );
}
