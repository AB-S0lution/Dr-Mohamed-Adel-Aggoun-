import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, MagnifyingGlass } from '@phosphor-icons/react';
import { ARTICLES, ARTICLES_BY_DATE } from '../data/articles';
import { Reveal } from '../components/motion/Reveal';
import { RevealPhoto } from '../components/motion/Photo';
import { Seo } from '../components/ui/Seo';
import { imageForCategory } from '../lib/article-images';

const EASE = [0.23, 1, 0.32, 1] as const;

const CATEGORIES = Array.from(new Set(ARTICLES.map((a) => a.category)));

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function Conseils() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ARTICLES_BY_DATE.filter((a) => {
      const matchesCategory = !category || a.category === category;
      const matchesQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const [lead, ...rest] = shown;
  const leadImage = lead ? imageForCategory(lead.category) : null;

  return (
    <>
      <Seo
        title="Conseils santé"
        description="Articles d'information sur le diabète, la thyroïde, l'alimentation et le métabolisme, écrits pour les patients du cabinet."
        canonicalPath="/conseils-sante"
      />

      <header className="page-head">
        <div className="shell">
          <Reveal y={14}>
            <span className="eyebrow">Conseils santé</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="display-xl" style={{ maxWidth: '20ch' }}>
              Lire avant, <span className="accent-word">retenir après</span>
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="lede" style={{ marginTop: '1.5rem' }}>
              {ARTICLES.length} textes d'information générale. Ils ne remplacent pas une
              consultation et ne valent pas avis médical sur votre situation.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="section" aria-labelledby="articles-titre">
        <div className="shell">
          <h2 id="articles-titre" className="sr-only-visually">
            Tous les articles
          </h2>

          <Reveal y={12}>
            <div className="split split--aside" style={{ alignItems: 'end', gap: '1.5rem' }}>
              <div className="filter-bar" role="group" aria-label="Filtrer par thème">
                <button
                  type="button"
                  className="filter-chip"
                  aria-pressed={category === null}
                  onClick={() => setCategory(null)}
                >
                  Tous les thèmes
                </button>
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className="filter-chip"
                    aria-pressed={category === c}
                    onClick={() => setCategory(category === c ? null : c)}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="search-field">
                <MagnifyingGlass size={18} weight="light" aria-hidden="true" />
                <label className="sr-only-visually" htmlFor="article-search">
                  Rechercher un article
                </label>
                <input
                  id="article-search"
                  type="search"
                  className="field"
                  placeholder="Rechercher un sujet"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>
          </Reveal>

          <p className="text-muted" style={{ marginTop: '1.25rem', fontSize: '0.88rem' }} aria-live="polite">
            {shown.length} article{shown.length > 1 ? 's' : ''}.
          </p>

          {shown.length === 0 ? (
            <div className="card" style={{ marginTop: '2rem', textAlign: 'center', padding: '3rem 1.5rem' }}>
              <p className="display-md">Aucun article ne correspond</p>
              <p className="text-muted" style={{ marginTop: '0.75rem' }}>
                Essayez un mot plus court, ou revenez à tous les thèmes.
              </p>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ marginTop: '1.5rem' }}
                onClick={() => {
                  setQuery('');
                  setCategory(null);
                }}
              >
                Réinitialiser la recherche
              </button>
            </div>
          ) : (
            <>
              {/* Article en tête : traité différemment du reste de la liste. */}
              <Reveal delay={0.06}>
                <Link to={`/conseils-sante/${lead.slug}`} className="lead-post">
                  <div className="lead-post__media">
                    <RevealPhoto
                      src={leadImage!.src}
                      alt={leadImage!.alt}
                      graded
                    />
                  </div>
                  <div className="lead-post__body">
                    <span className="chip">{lead.category}</span>
                    <h3 className="display-lg" style={{ marginTop: '1rem', maxWidth: '24ch' }}>
                      {lead.title}
                    </h3>
                    <p className="text-muted" style={{ marginTop: '1rem', lineHeight: 1.65, maxWidth: '54ch' }}>
                      {lead.excerpt}
                    </p>
                    <p className="post-row__arrow" style={{ marginTop: '1.5rem' }}>
                      Lire l'article ({lead.readTime} min)
                      <ArrowRight size={15} weight="bold" />
                    </p>
                  </div>
                </Link>
              </Reveal>

              <ul className="post-list" style={{ marginTop: 'clamp(2rem, 4vw, 3rem)' }}>
                <AnimatePresence initial={false} mode="popLayout">
                  {rest.map((a) => (
                    <motion.li
                      key={a.slug}
                      layout={!reduce}
                      initial={reduce ? false : { opacity: 0, transform: 'translateY(0.75rem)' }}
                      animate={{ opacity: 1, transform: 'translateY(0rem)' }}
                      exit={reduce ? { opacity: 0 } : { opacity: 0, transform: 'scale(0.98)' }}
                      transition={{ duration: 0.32, ease: EASE }}
                    >
                      <Link to={`/conseils-sante/${a.slug}`} className="post-row">
                        <span className="post-row__meta tnum">{formatDate(a.date)}</span>
                        <span>
                          <span className="post-row__title" style={{ display: 'block' }}>
                            {a.title}
                          </span>
                          <span
                            className="text-muted"
                            style={{ display: 'block', marginTop: '0.5rem', lineHeight: 1.6, maxWidth: '58ch' }}
                          >
                            {a.excerpt}
                          </span>
                          <span className="chip" style={{ marginTop: '0.75rem' }}>
                            {a.category}
                          </span>
                        </span>
                        <span className="post-row__arrow">
                          Lire ({a.readTime} min)
                          <ArrowRight size={15} weight="bold" />
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </>
          )}
        </div>
      </section>
    </>
  );
}
