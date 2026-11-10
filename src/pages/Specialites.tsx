import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Phone } from '@phosphor-icons/react';
import { SITE } from '../data/site';
import { SPECIALTIES, type SpecialtyTag } from '../data/specialties';
import { Reveal } from '../components/motion/Reveal';
import { Icon } from '../components/ui/Icon';
import { Seo } from '../components/ui/Seo';

const EASE = [0.23, 1, 0.32, 1] as const;
const TAGS: SpecialtyTag[] = ['Adulte', 'Enfant', 'Suivi', 'Dépistage'];

export default function Specialites() {
  const [active, setActive] = useState<SpecialtyTag | null>(null);
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const { hash } = useLocation();

  const shown = useMemo(
    () => (active ? SPECIALTIES.filter((s) => s.tag.includes(active)) : SPECIALTIES),
    [active],
  );

  // Un lien d'accueil peut viser une spécialité précise : on l'ouvre.
  const targeted = hash.replace('#', '');
  const expanded = openSlug ?? (targeted || null);

  return (
    <>
      <Seo
        title="Spécialités"
        description="Diabète de type 1 et 2, thyroïde, obésité, dyslipidémies, diabète gestationnel : les motifs de consultation pris en charge au cabinet."
        canonicalPath="/specialites"
      />

      <header className="page-head">
        <div className="shell">
          <Reveal y={14}>
            <span className="eyebrow">Spécialités</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="display-xl" style={{ maxWidth: '22ch' }}>
              {SPECIALTIES.length} motifs de <span className="accent-word">consultation</span>
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="lede" style={{ marginTop: '1.5rem' }}>
              Les signes listés sont informatifs : ils aident à savoir quand prendre rendez-vous, et
              ne permettent pas de poser un diagnostic soi-même.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="section" aria-labelledby="liste-titre">
        <div className="shell">
          <h2 id="liste-titre" className="sr-only-visually">
            Liste des spécialités
          </h2>

          <Reveal y={12}>
            <div className="filter-bar" role="group" aria-label="Filtrer par public">
              <button
                type="button"
                className="filter-chip"
                aria-pressed={active === null}
                onClick={() => setActive(null)}
              >
                Tout ({SPECIALTIES.length})
              </button>
              {TAGS.map((t) => {
                const count = SPECIALTIES.filter((s) => s.tag.includes(t)).length;
                return (
                  <button
                    key={t}
                    type="button"
                    className="filter-chip"
                    aria-pressed={active === t}
                    onClick={() => setActive(active === t ? null : t)}
                  >
                    {t} ({count})
                  </button>
                );
              })}
            </div>
          </Reveal>

          <p className="text-muted" style={{ margin: '1.25rem 0 0', fontSize: '0.88rem' }} aria-live="polite">
            {shown.length} spécialité{shown.length > 1 ? 's' : ''} affichée
            {shown.length > 1 ? 's' : ''}.
          </p>

          <ul className="post-list" style={{ marginTop: '1.5rem' }}>
            <AnimatePresence initial={false} mode="popLayout">
              {shown.map((spec) => {
                const isOpen = expanded === spec.slug;
                return (
                  <motion.li
                    key={spec.slug}
                    id={spec.slug}
                    layout={!reduce}
                    initial={reduce ? false : { opacity: 0, transform: 'translateY(0.75rem)' }}
                    animate={{ opacity: 1, transform: 'translateY(0rem)' }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, transform: 'scale(0.98)' }}
                    transition={{ duration: 0.34, ease: EASE }}
                    className="acc-item"
                  >
                    <h3>
                      <button
                        type="button"
                        className="acc-trigger"
                        aria-expanded={isOpen}
                        aria-controls={`panel-${spec.slug}`}
                        onClick={() => setOpenSlug(isOpen ? '' : spec.slug)}
                      >
                        <span style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                          <span className="spec-card__icon" style={{ width: '2.25rem', height: '2.25rem' }}>
                            <Icon name={spec.icon} size={18} />
                          </span>
                          <span>
                            <span style={{ display: 'block' }}>{spec.title}</span>
                            <span
                              className="text-muted"
                              style={{
                                display: 'block',
                                fontFamily: 'var(--font-sans)',
                                fontWeight: 400,
                                fontSize: '0.9rem',
                                marginTop: '0.3rem',
                                lineHeight: 1.55,
                                maxWidth: '54ch',
                              }}
                            >
                              {spec.summary}
                            </span>
                          </span>
                        </span>
                        {/* Les publics concernés restent lisibles ligne fermée :
                            c'est l'information qu'on cherche en balayant la liste. */}
                        <span className="acc-trigger__tags" aria-hidden="true">
                          {spec.tag.map((t) => (
                            <span key={t} className="chip">
                              {t}
                            </span>
                          ))}
                        </span>
                        <span className="acc-trigger__sign" aria-hidden="true">
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          id={`panel-${spec.slug}`}
                          className="acc-panel"
                          initial={reduce ? { height: 'auto' } : { height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={reduce ? { height: 'auto', opacity: 0 } : { height: 0, opacity: 0 }}
                          transition={{ duration: reduce ? 0.14 : 0.34, ease: EASE }}
                        >
                          <div className="acc-panel__inner split" style={{ gap: '1.5rem' }}>
                            <p>{spec.detail}</p>
                            <div>
                              <p className="fact__label">Motifs fréquents de consultation</p>
                              <ul className="stack stack-sm" style={{ marginTop: '0.75rem' }}>
                                {spec.signs.map((sign) => (
                                  <li key={sign} style={{ display: 'flex', gap: '0.55rem' }}>
                                    <Icon name="check" size={16} className="spec-sign-check" />
                                    <span>{sign}</span>
                                  </li>
                                ))}
                              </ul>
                              <div className="spec-card__tags" style={{ marginTop: '1rem' }}>
                                {spec.tag.map((t) => (
                                  <span key={t} className="chip">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        </div>
      </section>

      <section className="section--tight">
        <div className="shell">
          <Reveal>
            <div className="cta-band on-dark">
              <div className="cta-band__grid">
                <div>
                  <h2 className="display-lg" style={{ maxWidth: '22ch' }}>
                    Un doute sur le motif ? Appelez, on vous orientera
                  </h2>
                  <p className="lede" style={{ color: 'var(--ink-invert-soft)', marginTop: '1rem' }}>
                    Le secrétariat peut dire si votre situation relève du cabinet ou d'un autre
                    spécialiste.
                  </p>
                </div>
                <div className="stack stack-sm">
                  <a href={SITE.mobileHref} className="btn btn-invert">
                    <Phone size={17} weight="light" />
                    {SITE.mobileDisplay}
                  </a>
                  <Link to="/faq" className="btn btn-secondary">
                    Questions fréquentes
                    <span className="btn__icon" aria-hidden="true">
                      <ArrowRight size={14} weight="bold" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
