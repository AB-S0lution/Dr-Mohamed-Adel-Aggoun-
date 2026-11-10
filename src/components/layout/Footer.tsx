import { Link } from 'react-router-dom';
import { Phone, WhatsappLogo, EnvelopeSimple, MapPin } from '@phosphor-icons/react';
import { SITE, SITE_STATUS_NOTICE } from '../../data/site';
import { HOURS } from '../../data/hours';
import { Logo } from '../ui/Logo';

export function Footer() {
  return (
    <footer className="on-dark site-footer">
      <div className="shell">
        <div className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Logo />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem' }}>
                {SITE.brandName}
              </span>
            </div>
            <p className="text-muted" style={{ marginTop: '0.9rem', fontSize: '0.9rem', maxWidth: '30ch' }}>
              {SITE.practitioner}. {SITE.specialtyFull}.
            </p>
          </div>

          <nav aria-label="Navigation de pied de page">
            <h2 className="footer-heading">Navigation</h2>
            <ul className="footer-list">
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/le-cabinet">Le cabinet</Link></li>
              <li><Link to="/specialites">Spécialités</Link></li>
              <li><Link to="/conseils-sante">Conseils santé</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/horaires-acces">Horaires & accès</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>

          <div>
            <h2 className="footer-heading">Contact</h2>
            <ul className="footer-list">
              <li>
                <a href={SITE.mobileHref}><Phone size={15} weight="light" /> {SITE.mobileDisplay}</a>
              </li>
              <li>
                <a href={SITE.landlineHref}><Phone size={15} weight="light" /> {SITE.landlineDisplay}</a>
              </li>
              <li>
                <a href={SITE.whatsappHref} target="_blank" rel="noreferrer">
                  <WhatsappLogo size={15} weight="light" /> WhatsApp
                </a>
              </li>
              <li>
                <a href={SITE.emailHref}><EnvelopeSimple size={15} weight="light" /> {SITE.email}</a>
              </li>
              <li>
                <a href={SITE.mapsHref} target="_blank" rel="noreferrer">
                  <MapPin size={15} weight="light" /> {SITE.addressLine}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="footer-heading">Horaires</h2>
            <ul className="footer-hours">
              {HOURS.map((h) => (
                <li key={h.day}>
                  <span>{h.day}</span>
                  <span className={h.closed ? 'text-muted' : undefined}>
                    {h.closed ? 'Fermé' : `${h.open} - ${h.close}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="footer-notice">{SITE_STATUS_NOTICE}</p>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {SITE.brandName}. Site de démonstration.</p>
          <p className="footer-bottom__links">
            <Link to="/mentions-legales">Mentions légales</Link>
            <Link to="/confidentialite">Confidentialité</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
