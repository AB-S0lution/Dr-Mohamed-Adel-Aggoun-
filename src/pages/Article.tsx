import { Link, useParams } from 'react-router-dom';
import { motion, useReducedMotion, useScroll } from 'motion/react';
import { ArrowLeft, ArrowRight, Phone } from '@phosphor-icons/react';
import { ARTICLES_BY_DATE, findArticle } from '../data/articles';
import { SITE } from '../data/site';
import { Reveal } from '../components/motion/Reveal';
import { RevealPhoto } from '../components/motion/Photo';
import { imageForCategory } from '../lib/article-images';
import { Seo } from '../components/ui/Seo';
import NotFound from './NotFound';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function Article() {
  const { slug } = useParams();
  const article = slug ? findArticle(slug) : undefined;
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  if (!article) return <NotFound />;

  const index = ARTICLES_BY_DATE.findIndex((a) => a.slug === article.slug);
  const next = ARTICLES_BY_DATE[(index + 1) % ARTICLES_BY_DATE.length];
  const related = ARTICLES_BY_DATE.filter(
    (a) => a.category === article.category && a.slug !== article.slug,
  ).slice(0, 3);
  const image = imageForCategory(article.category);

  return (
    <>
      <Seo
        title={article.title}
        description={article.excerpt}
        canonicalPath={`/conseils-sante/${article.slug}`}
      />

      {reduce ? null : (
        <motion.div className="read-bar" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      )}

      <header className="page-head">
        <div className="shell">
          <Reveal y={12}>
            <Link to="/conseils-sante" className="back-link">
              <ArrowLeft size={15} weight="bold" />
              Tous les conseils
            </Link>
          </Reveal>
          <Reveal delay={0.06}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginTop: '1.5rem' }}>
              <span className="chip">{article.category}</span>
              <span className="post-row__meta tnum">
                {formatDate(article.date)} · {article.readTime} min de lecture
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <h1 className="display-lg" style={{ marginTop: '1.25rem', maxWidth: '26ch' }}>
              {article.title}
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="lede" style={{ marginTop: '1.25rem' }}>
              {article.excerpt}
            </p>
          </Reveal>
        </div>
      </header>

      <section className="section">
        <div className="shell">
          {/* Image de thème, pas de l'article : la légende le dit. */}
          <RevealPhoto
            src={image.src}
            alt={image.alt}
            graded
            className="article-cover"
            caption={`Image d'illustration, thème « ${article.category} ».`}
          />

          <div className="split split--aside" style={{ marginTop: 'clamp(2rem, 4vw, 3.5rem)' }}>
            <Reveal>
              <div className="prose">
                {article.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}

                <div className="card" style={{ marginTop: '2.5rem' }}>
                  <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Information générale</p>
                  <p className="text-muted" style={{ fontSize: '0.92rem', lineHeight: 1.65 }}>
                    Ce texte décrit des situations courantes. Il ne constitue pas un avis médical sur
                    votre cas et ne remplace pas une consultation. En cas de symptôme inquiétant,
                    appelez le cabinet ou consultez sans attendre.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="sticky-col">
              <aside className="article-aside">
                <div className="card stack stack-sm">
                  <p className="fact__label">Prendre rendez-vous</p>
                  <p className="text-muted" style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>
                    Une question sur votre suivi se traite en consultation, pas par écrit.
                  </p>
                  <a href={SITE.mobileHref} className="btn btn-primary">
                    <Phone size={17} weight="light" />
                    {SITE.mobileDisplay}
                  </a>
                </div>

                {related.length > 0 ? (
                  <div style={{ marginTop: '1.5rem' }}>
                    <p className="fact__label">Dans le même thème</p>
                    <ul className="stack stack-sm" style={{ marginTop: '0.85rem' }}>
                      {related.map((r) => (
                        <li key={r.slug}>
                          <Link to={`/conseils-sante/${r.slug}`} className="aside-link">
                            {r.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section--tight">
        <div className="shell">
          <div className="rule" />
          <Reveal>
            <Link to={`/conseils-sante/${next.slug}`} className="next-post">
              <span className="fact__label">Article suivant</span>
              <span className="display-md" style={{ maxWidth: '28ch', marginTop: '0.5rem', display: 'block' }}>
                {next.title}
              </span>
              <span className="post-row__arrow" style={{ marginTop: '1rem' }}>
                Continuer la lecture
                <ArrowRight size={15} weight="bold" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
