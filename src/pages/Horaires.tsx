import { Link } from 'react-router-dom';
import { Phone, MapPin, NavigationArrow, Warning, ArrowRight } from '@phosphor-icons/react';
import { SITE } from '../data/site';
import { HOURS, HOURS_TODO_NOTE, getTodayHours } from '../data/hours';
import { Reveal, RevealGroup, RevealItem } from '../components/motion/Reveal';
import { StatusPill } from '../components/ui/StatusPill';
import { Seo } from '../components/ui/Seo';

const LANDMARKS = [
  {
    title: 'Repère principal',
    text: 'Le cabinet se trouve route de Tazoult, juste à côté de la mosquée Omar Ibn Al-Aas.',
  },
  {
    title: 'Depuis Batna',
    text: 'Prendre la route de Tazoult vers le sud-est ; le cabinet est sur l’axe principal, en entrant dans Tazoult.',
  },
  {
    title: 'Avant de venir',
    text: 'Un appel évite le déplacement inutile : les consultations se font sur rendez-vous.',
  },
];

export default function Horaires() {
  const today = getTodayHours();

  return (
    <>
      <Seo
        title="Horaires et accès"
        description={`Horaires d'ouverture du cabinet et itinéraire vers ${SITE.addressLine}, ${SITE.city}, wilaya de ${SITE.wilaya}.`}
        canonicalPath="/horaires-acces"
      />

      <header className="page-head">
        <div className="shell">
          <Reveal y={14}>
            <span className="eyebrow">Horaires et accès</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="display-xl" style={{ maxWidth: '20ch' }}>
              Quand venir, <span className="accent-word">comment venir</span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <div style={{ marginTop: '1.5rem' }}>
              <StatusPill />
            </div>
          </Reveal>
        </div>
      </header>

      <section className="section" aria-labelledby="horaires-titre">
        <div className="shell">
          <div className="split split--aside">
            <Reveal>
              <h2 id="horaires-titre" className="display-lg">
                Horaires d'ouverture
              </h2>
              <table className="hours-table tnum" style={{ marginTop: '1.5rem' }}>
                <caption>Semaine type</caption>
                <tbody>
                  {HOURS.map((h) => (
                    <tr key={h.day} data-today={h.isoIndex === today.isoIndex}>
                      <th scope="row">{h.day}</th>
                      <td>{h.closed ? 'Fermé' : `${h.open} à ${h.close}`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p
                className="text-muted"
                style={{ marginTop: '1.25rem', fontSize: '0.86rem', display: 'flex', gap: '0.6rem' }}
              >
                <Warning size={18} weight="light" style={{ flex: 'none', marginTop: '0.1rem' }} />
                <span>{HOURS_TODO_NOTE}</span>
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="stack stack-md">
                <div className="card stack stack-sm">
                  <p className="fact__label">Adresse</p>
                  <p style={{ lineHeight: 1.6 }}>{SITE.addressFull}</p>
                  <a href={SITE.mapsHref} target="_blank" rel="noreferrer" className="btn btn-primary">
                    <NavigationArrow size={17} weight="light" />
                    Itinéraire Google Maps
                  </a>
                  <a href={SITE.mobileHref} className="btn btn-secondary">
                    <Phone size={17} weight="light" />
                    Appeler avant de venir
                  </a>
                </div>

                <div className="map-frame">
                  <iframe
                    src={SITE.mapsEmbedSrc}
                    title={`Carte de localisation du ${SITE.brandName}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <p className="text-muted" style={{ fontSize: '0.82rem' }}>
                  Carte fournie par Google Maps. L'ouvrir charge un service tiers.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-sunken)' }} aria-labelledby="acces-titre">
        <div className="shell">
          <div className="sec-head">
            <Reveal>
              <span className="eyebrow">Repères</span>
              <h2 id="acces-titre" className="display-lg" style={{ maxWidth: '20ch' }}>
                Trouver le cabinet sans GPS
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="lede">
                Les indications ci-dessous reprennent les repères donnés par le cabinet. Elles ne
                remplacent pas un appel en cas de doute.
              </p>
            </Reveal>
          </div>

          <RevealGroup as="ol" className="post-list">
            {LANDMARKS.map((l, i) => (
              <RevealItem key={l.title} as="li" className="post-row">
                <span className="post-row__meta tnum">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span className="post-row__title" style={{ display: 'block' }}>
                    {l.title}
                  </span>
                  <span
                    className="text-muted"
                    style={{ display: 'block', marginTop: '0.5rem', lineHeight: 1.65, maxWidth: '60ch' }}
                  >
                    {l.text}
                  </span>
                </span>
                <span>
                  {i === 0 ? (
                    <span className="post-row__arrow">
                      <MapPin size={15} weight="bold" />
                      {SITE.city}
                    </span>
                  ) : null}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <Link to="/contact" className="btn btn-secondary" style={{ marginTop: '2rem' }}>
              Préparer sa demande de rendez-vous
              <span className="btn__icon" aria-hidden="true">
                <ArrowRight size={14} weight="bold" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
