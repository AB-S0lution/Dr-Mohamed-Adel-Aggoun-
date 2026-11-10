import { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, MapPin, Clock, WhatsappLogo } from '@phosphor-icons/react';
import { SITE } from '../data/site';
import { getTodayHours } from '../data/hours';
import { SPECIALTIES } from '../data/specialties';
import { ARTICLES, ARTICLES_BY_DATE } from '../data/articles';
import { Reveal, RevealGroup, RevealItem } from '../components/motion/Reveal';
import { RevealPhoto, ParallaxPhoto } from '../components/motion/Photo';
import { StatusPill } from '../components/ui/StatusPill';
import { Icon } from '../components/ui/Icon';
import { Seo } from '../components/ui/Seo';
import { BmiTool } from '../components/sections/BmiTool';

// La scène épinglée embarque GSAP : elle est loin sous la ligne de
// flottaison, donc son code arrive après le premier rendu.
const ProcessPin = lazy(() =>
  import('../components/sections/ProcessPin').then((m) => ({ default: m.ProcessPin })),
);
import heroPhoto from '../assets/photos/cabinet-consultation.jpg';
import cabinetPhoto from '../assets/photos/accompagnement-mains.jpg';
import nutritionPhoto from '../assets/photos/legumes-nutrition.jpg';

/** Les six spécialités mises en avant sur l'accueil, le reste sur sa page. */
const FEATURED = SPECIALTIES.slice(0, 6);
const LATEST = ARTICLES_BY_DATE.slice(0, 4);

// Pavage exact d'une grille de six colonnes, en trois tailles : une
// cellule haute, une large, deux petites, deux moyennes. Aucune rangée
// n'a la même découpe que la précédente, et il ne reste aucun trou.
const CELL_CLASS = [
  'bento__cell bento__cell--lead',
  'bento__cell bento__cell--wide',
  'bento__cell',
  'bento__cell',
  'bento__cell bento__cell--half',
  'bento__cell bento__cell--half',
];

export default function Home() {
  const today = getTodayHours();

  return (
    <>
      <Seo
        title={SITE.specialtyShort}
        description={`Cabinet de diabétologie et d'endocrinologie à ${SITE.city}, wilaya de ${SITE.wilaya}. Suivi du diabète, de la thyroïde et des maladies métaboliques. Prise de rendez-vous par téléphone.`}
        canonicalPath="/"
      />

      {/* ---------- Héros : photo plein cadre, titre désaxé, faits à droite ---------- */}
      <section className="hero on-dark" aria-labelledby="accueil-titre">
        <div className="hero__bg" aria-hidden="true">
          <img src={heroPhoto} alt="" loading="eager" decoding="async" fetchPriority="high" />
        </div>
        <div className="hero__veil" aria-hidden="true" />

        <div className="hero__inner">
          <div className="shell">
            <div className="hero__grid">
              <div>
                <Reveal y={16}>
                  <StatusPill />
                </Reveal>

                <Reveal delay={0.08}>
                  <h1 id="accueil-titre" className="display-xl hero__title" style={{ marginTop: '1.5rem' }}>
                    Le diabète se suit.{' '}
                    <span className="accent-word" style={{ color: 'var(--c-blue-400)' }}>
                      Pas seul.
                    </span>
                  </h1>
                </Reveal>

                <Reveal delay={0.16}>
                  <p className="lede" style={{ color: 'var(--ink-invert-soft)', marginTop: '1.5rem' }}>
                    {SITE.practitioner}, {SITE.specialtyFull.toLowerCase()}. Consultations à{' '}
                    {SITE.city}, wilaya de {SITE.wilaya}, pour les adultes et les enfants.
                  </p>
                </Reveal>

                <Reveal delay={0.24}>
                  <div className="hero__actions">
                    <a href={SITE.mobileHref} className="btn btn-invert">
                      <Phone size={17} weight="light" />
                      {SITE.mobileDisplay}
                    </a>
                    <a
                      href={SITE.whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-secondary"
                    >
                      <WhatsappLogo size={17} weight="light" />
                      Écrire sur WhatsApp
                    </a>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.3} className="hero__aside">
                <div className="hero__aside-row">
                  <MapPin size={18} weight="light" />
                  <span>{SITE.addressFull}</span>
                </div>
                <div className="hero__aside-row">
                  <Clock size={18} weight="light" />
                  <span className="tnum">
                    {today.closed
                      ? `${today.day} : fermé`
                      : `${today.day} : ${today.open} à ${today.close}`}
                  </span>
                </div>
                <div className="hero__aside-row">
                  <Icon name="curve" size={18} />
                  <span>Diabète de type 1 et 2, thyroïde, obésité, suivi de grossesse diabétique</span>
                </div>
              </Reveal>
            </div>

            <span className="scroll-cue" aria-hidden="true">
              Défiler
            </span>
          </div>
        </div>
      </section>

      {/* ---------- Faits : filets, pas de cartes ---------- */}
      <section className="shell" aria-label="Informations pratiques">
        <RevealGroup className="fact-row">
          <RevealItem className="fact">
            <p className="fact__label">Praticien</p>
            <p className="fact__value">{SITE.practitioner}</p>
            <p className="fact__note">{SITE.practitionerArabic}</p>
          </RevealItem>
          <RevealItem className="fact">
            <p className="fact__label">Adresse</p>
            <p className="fact__value">{SITE.city}</p>
            <p className="fact__note">{SITE.addressLine}</p>
          </RevealItem>
          <RevealItem className="fact">
            <p className="fact__label">Rendez-vous</p>
            <p className="fact__value tnum">{SITE.mobileDisplay}</p>
            <p className="fact__note">Par téléphone ou WhatsApp</p>
          </RevealItem>
          <RevealItem className="fact">
            <p className="fact__label">Langues</p>
            <p className="fact__value">Arabe, français</p>
            <p className="fact__note">Consultation adulte et enfant</p>
          </RevealItem>
        </RevealGroup>
      </section>

      {/* ---------- Le cabinet : éditorial en zig-zag ---------- */}
      <section className="section" aria-labelledby="cabinet-titre">
        <div className="shell">
          <div className="zig">
            <div>
              <Reveal>
                <span className="eyebrow">Le cabinet</span>
                <h2 id="cabinet-titre" className="display-lg" style={{ maxWidth: '20ch' }}>
                  Une maladie chronique demande un rythme, pas une urgence
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="stack stack-md" style={{ marginTop: '1.5rem' }}>
                  <p className="lede">
                    Le diabète et les troubles hormonaux se jouent sur des années. Ce qui compte
                    n'est pas le chiffre d'un jour, mais la courbe : ce qu'elle dit de votre
                    traitement, de votre alimentation, de votre fatigue.
                  </p>
                  <p style={{ color: 'var(--ink-soft)', lineHeight: 1.7, maxWidth: '54ch' }}>
                    Le cabinet reçoit sur rendez-vous à {SITE.city}, à côté de la mosquée Omar Ibn
                    Al-Aas. Chaque consultation part de vos documents : carnet de glycémie, bilans,
                    ordonnances en cours.
                  </p>
                  <Link to="/le-cabinet" className="btn btn-secondary" style={{ alignSelf: 'flex-start' }}>
                    Découvrir le cabinet
                    <span className="btn__icon" aria-hidden="true">
                      <ArrowRight size={14} weight="bold" />
                    </span>
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="zig__media">
              <ParallaxPhoto
                src={cabinetPhoto}
                alt="Mains d'un soignant posées sur celles d'un patient pendant un entretien"
                graded
                distance={44}
              />
              <Reveal delay={0.12} className="zig__badge">
                <p style={{ fontWeight: 600, marginBottom: '0.35rem' }}>Sur rendez-vous</p>
                <p className="text-muted">
                  Appelez pour fixer un créneau. Pensez à apporter vos derniers bilans et votre
                  carnet de suivi.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Spécialités : bento asymétrique ---------- */}
      <section className="section" style={{ background: 'var(--bg-sunken)' }} aria-labelledby="spec-titre">
        <div className="shell">
          <div className="sec-head">
            <Reveal>
              <span className="eyebrow">Spécialités</span>
              <h2 id="spec-titre" className="display-lg" style={{ maxWidth: '24ch' }}>
                Ce qui est pris en charge au cabinet
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="lede">
                {SPECIALTIES.length} domaines de l'endocrinologie et du métabolisme, de
                l'équilibre du diabète au suivi de la thyroïde.
              </p>
            </Reveal>
          </div>

          <RevealGroup className="bento">
            {FEATURED.map((spec, i) => (
              <RevealItem key={spec.slug} className={CELL_CLASS[i]}>
                <Link
                  to={`/specialites#${spec.slug}`}
                  className={`spec-card ${i === 0 ? 'spec-card--lead' : ''}`}
                >
                  <span className="spec-card__icon">
                    <Icon name={spec.icon} size={22} />
                  </span>
                  <div>
                    <h3
                      className="display-md"
                      style={{ fontSize: i === 0 ? 'clamp(1.4rem, 2.4vw, 1.9rem)' : '1.1rem' }}
                    >
                      {spec.title}
                    </h3>
                    <p
                      className="text-muted"
                      style={{ marginTop: '0.6rem', lineHeight: 1.6, fontSize: '0.92rem' }}
                    >
                      {spec.summary}
                    </p>
                  </div>
                  <div className="spec-card__tags">
                    {spec.tag.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <Link to="/specialites" className="btn btn-primary" style={{ marginTop: '2rem' }}>
              Les {SPECIALTIES.length} spécialités
              <span className="btn__icon" aria-hidden="true">
                <ArrowRight size={14} weight="bold" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- La seule scène épinglée du site ---------- */}
      <Suspense fallback={<div className="on-dark" style={{ minHeight: '100dvh' }} aria-hidden="true" />}>
        <ProcessPin />
      </Suspense>

      {/* ---------- Outil IMC : moitié photo, moitié formulaire ---------- */}
      <section className="section" aria-labelledby="imc-titre">
        <div className="shell">
          <div className="zig zig--flip">
            <div>
              <Reveal>
                <span className="eyebrow">Repère</span>
                <h2 id="imc-titre" className="display-lg" style={{ maxWidth: '20ch' }}>
                  Calculer son IMC, puis en parler
                </h2>
                <p className="lede" style={{ marginTop: '1.25rem' }}>
                  Le calcul reste dans votre navigateur. Rien n'est envoyé, rien n'est conservé.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div style={{ marginTop: '2rem' }}>
                  <BmiTool />
                </div>
              </Reveal>
            </div>

            <div className="zig__media">
              <RevealPhoto
                src={nutritionPhoto}
                alt="Étal de légumes et de crudités préparés, en portions séparées"
                graded
                caption="L'équilibre alimentaire fait partie du traitement, pas à côté."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Conseils : liste éditoriale, filets ---------- */}
      <section className="section" style={{ background: 'var(--bg-sunken)' }} aria-labelledby="conseils-titre">
        <div className="shell">
          <div className="sec-head">
            <Reveal>
              <span className="eyebrow">Conseils santé</span>
              <h2 id="conseils-titre" className="display-lg" style={{ maxWidth: '22ch' }}>
                Des réponses écrites aux questions qui reviennent
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="lede">
                {ARTICLES.length} textes sur le quotidien du diabète, de la thyroïde et du
                métabolisme. À lire avant ou après la consultation.
              </p>
            </Reveal>
          </div>

          <RevealGroup className="post-list" as="ul">
            {LATEST.map((a) => (
              <RevealItem key={a.slug} as="li">
                <Link to={`/conseils-sante/${a.slug}`} className="post-row">
                  <span className="post-row__meta tnum">
                    {new Date(a.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
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
                  </span>
                  <span className="post-row__arrow">
                    Lire ({a.readTime} min)
                    <ArrowRight size={15} weight="bold" />
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <Link to="/conseils-sante" className="btn btn-secondary" style={{ marginTop: '2rem' }}>
              Tous les conseils
              <span className="btn__icon" aria-hidden="true">
                <ArrowRight size={14} weight="bold" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- Bande de contact ---------- */}
      <section className="section--tight" aria-labelledby="contact-titre">
        <div className="shell">
          <Reveal>
            <div className="cta-band on-dark">
              <div className="cta-band__grid">
                <div>
                  <h2 id="contact-titre" className="display-lg" style={{ maxWidth: '20ch' }}>
                    Prendre rendez-vous se fait au téléphone
                  </h2>
                  <p className="lede" style={{ color: 'var(--ink-invert-soft)', marginTop: '1rem' }}>
                    Pas de réservation en ligne : le créneau se fixe de voix à voix, pour tenir
                    compte de l'urgence réelle de chaque situation.
                  </p>
                </div>
                <div className="stack stack-sm">
                  <a href={SITE.mobileHref} className="btn btn-invert">
                    <Phone size={17} weight="light" />
                    {SITE.mobileDisplay}
                  </a>
                  <a href={SITE.landlineHref} className="btn btn-secondary">
                    <Phone size={17} weight="light" />
                    {SITE.landlineDisplay}
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
