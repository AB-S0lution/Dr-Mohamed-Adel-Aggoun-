import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlass, Phone, ArrowRight } from '@phosphor-icons/react';
import { FAQ, type FaqItem } from '../data/faq';
import { SITE } from '../data/site';
import { Reveal } from '../components/motion/Reveal';
import { ParallaxPhoto } from '../components/motion/Photo';
import cabinet from '../assets/photos/cabinet-consultation.jpg';
import { AccordionItem } from '../components/ui/Accordion';
import { Seo } from '../components/ui/Seo';

const CATEGORIES = Array.from(new Set(FAQ.map((f) => f.category))) as FaqItem['category'][];

export default function Faq() {
  const [query, setQuery] = useState('');

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = FAQ.filter(
      (f) => !q || f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q),
    );
    return CATEGORIES.map((c) => ({
      category: c,
      items: matches.filter((f) => f.category === c),
    })).filter((g) => g.items.length > 0);
  }, [query]);

  const total = grouped.reduce((n, g) => n + g.items.length, 0);

  return (
    <>
      <Seo
        title="Questions fréquentes"
        description="Rendez-vous, déroulement de la consultation, documents à apporter : les réponses aux questions les plus posées au cabinet."
        canonicalPath="/faq"
      />

      <header className="page-head">
        <div className="shell">
          <div className="split split--aside" style={{ alignItems: 'end' }}>
            <div>
              <Reveal y={14}>
                <span className="eyebrow">FAQ</span>
              </Reveal>
              <Reveal delay={0.06}>
                <h1 className="display-xl" style={{ maxWidth: '18ch' }}>
                  Les questions <span className="accent-word">qui reviennent</span>
                </h1>
              </Reveal>
            </div>
            <Reveal delay={0.12}>
              <div className="search-field">
                <MagnifyingGlass size={18} weight="light" aria-hidden="true" />
                <label className="sr-only-visually" htmlFor="faq-search">
                  Rechercher dans la FAQ
                </label>
                <input
                  id="faq-search"
                  type="search"
                  className="field"
                  placeholder="Rechercher une question"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </header>

      <section className="section" aria-labelledby="faq-titre">
        <div className="shell">
          <h2 id="faq-titre" className="sr-only-visually">
            Réponses par thème
          </h2>
          <p className="text-muted" style={{ fontSize: '0.88rem' }} aria-live="polite">
            {total} question{total > 1 ? 's' : ''} sur {FAQ.length}.
          </p>

          {grouped.length === 0 ? (
            <div className="card" style={{ marginTop: '2rem', textAlign: 'center', padding: '3rem 1.5rem' }}>
              <p className="display-md">Pas de réponse à cette recherche</p>
              <p className="text-muted" style={{ marginTop: '0.75rem', maxWidth: '44ch', marginInline: 'auto' }}>
                Le cabinet répond au téléphone aux questions qui ne figurent pas ici.
              </p>
              <a href={SITE.mobileHref} className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
                <Phone size={17} weight="light" />
                {SITE.mobileDisplay}
              </a>
            </div>
          ) : (
            <div className="stack" style={{ gap: 'clamp(2.5rem, 5vw, 4rem)', marginTop: '2rem' }}>
              {grouped.map((group) => (
                <div key={group.category}>
                  <Reveal y={14}>
                    <div className="split split--narrow-first" style={{ gap: '2rem', alignItems: 'start' }}>
                      <div className="faq-group-head">
                        <h3 className="display-md">{group.category}</h3>
                        <p className="text-muted" style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                          {group.items.length} question{group.items.length > 1 ? 's' : ''}
                        </p>
                      </div>
                      <div>
                        {group.items.map((item, i) => (
                          <AccordionItem
                            key={item.question}
                            question={item.question}
                            defaultOpen={Boolean(query) || i === 0}
                          >
                            <p>{item.answer}</p>
                          </AccordionItem>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Une respiration entre la liste de questions et l'appel à contacter :
          la page est longue et entièrement textuelle sans elle. */}
      <section className="section--tight" aria-hidden="true" style={{ paddingBottom: 0 }}>
        <div className="shell">
          <Reveal y={16}>
            <ParallaxPhoto
              src={cabinet}
              alt=""
              graded
              distance={48}
              className="faq-break"
            />
          </Reveal>
        </div>
      </section>

      <section className="section--tight">
        <div className="shell">
          <Reveal>
            <div className="cta-band on-dark">
              <div className="cta-band__grid">
                <div>
                  <h2 className="display-lg" style={{ maxWidth: '22ch' }}>
                    Votre question n'est pas ici
                  </h2>
                  <p className="lede" style={{ color: 'var(--ink-invert-soft)', marginTop: '1rem' }}>
                    Appelez le cabinet, ou préparez votre demande par écrit avant d'appeler.
                  </p>
                </div>
                <div className="stack stack-sm">
                  <a href={SITE.mobileHref} className="btn btn-invert">
                    <Phone size={17} weight="light" />
                    {SITE.mobileDisplay}
                  </a>
                  <Link to="/contact" className="btn btn-secondary">
                    Préparer sa demande
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
