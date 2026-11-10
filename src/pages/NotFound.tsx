import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from '@phosphor-icons/react';
import { SITE } from '../data/site';
import { Reveal } from '../components/motion/Reveal';
import { Seo } from '../components/ui/Seo';

const LINKS = [
  { to: '/le-cabinet', label: 'Le cabinet' },
  { to: '/specialites', label: 'Spécialités' },
  { to: '/conseils-sante', label: 'Conseils santé' },
  { to: '/horaires-acces', label: 'Horaires et accès' },
];

export default function NotFound() {
  return (
    <>
      <Seo title="Page introuvable" description="Cette page n'existe pas ou a été déplacée." />

      <section className="section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <div className="shell">
          <Reveal y={14}>
            <span className="eyebrow">Erreur 404</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="display-xl" style={{ maxWidth: '18ch' }}>
              Cette page n'existe <span className="accent-word">pas</span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="lede" style={{ marginTop: '1.5rem' }}>
              Le lien est peut-être ancien. Voici les pages principales du site.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <ul className="post-list" style={{ marginTop: '2.5rem', maxWidth: '36rem' }}>
              {LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="post-row">
                    <span />
                    <span className="post-row__title">{l.label}</span>
                    <span className="post-row__arrow">
                      Ouvrir
                      <ArrowRight size={15} weight="bold" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.24}>
            <a href={SITE.mobileHref} className="btn btn-primary" style={{ marginTop: '2rem' }}>
              <Phone size={17} weight="light" />
              {SITE.mobileDisplay}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
