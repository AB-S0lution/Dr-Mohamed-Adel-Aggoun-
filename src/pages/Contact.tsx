import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Phone, WhatsappLogo, EnvelopeSimple, MapPin, Info } from '@phosphor-icons/react';
import { SITE } from '../data/site';
import { buildMailtoUrl, buildWhatsappUrl, type ContactFormValues } from '../lib/contact-links';
import { buildUpcomingDays, slotsForDay, type SlotOption } from '../lib/scheduler';
import { SPECIALTIES } from '../data/specialties';
import { PREPARATION } from '../data/preparation';
import { Reveal } from '../components/motion/Reveal';
import { Icon } from '../components/ui/Icon';
import { Seo } from '../components/ui/Seo';

const EASE = [0.23, 1, 0.32, 1] as const;

const REASONS = [
  'Première consultation',
  'Suivi habituel',
  ...SPECIALTIES.slice(0, 5).map((s) => s.title),
  'Autre',
];

export default function Contact() {
  const days = useMemo(() => buildUpcomingDays(14), []);
  const firstOpen = days.find((d) => !d.disabled) ?? days[0];

  const [selectedIso, setSelectedIso] = useState(firstOpen.iso);
  const [slotKey, setSlotKey] = useState<SlotOption['key'] | null>(null);
  const [prepSlug, setPrepSlug] = useState(PREPARATION[0].slug);
  const prep = PREPARATION.find((p) => p.slug === prepSlug) ?? PREPARATION[0];
  const [values, setValues] = useState<ContactFormValues>({
    name: '',
    phone: '',
    reason: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({});
  const reduce = useReducedMotion();

  const selectedDay = days.find((d) => d.iso === selectedIso) ?? firstOpen;
  const slots = slotsForDay(selectedDay.hours);
  const selectedSlot = slots.find((s) => s.key === slotKey) ?? null;

  const payload: ContactFormValues = {
    ...values,
    preferredDateLabel: selectedDay.fullLabel,
    preferredSlotLabel: selectedSlot?.label,
  };

  /** Validation côté client : le lien ne s'ouvre pas si le message serait vide de sens. */
  function validate(): boolean {
    const next: typeof errors = {};
    if (!values.name.trim()) next.name = 'Indiquez un nom, pour que le cabinet sache qui rappeler.';
    if (!values.phone.trim()) next.phone = 'Un numéro est nécessaire pour vous rappeler.';
    else if (!/^[\d\s+().-]{8,}$/.test(values.phone.trim())) next.phone = 'Ce numéro semble incomplet.';
    if (!values.reason.trim()) next.reason = 'Choisissez un motif.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function openLink(kind: 'whatsapp' | 'mail') {
    if (!validate()) return;
    const url = kind === 'whatsapp' ? buildWhatsappUrl(payload) : buildMailtoUrl(payload);
    window.open(url, kind === 'whatsapp' ? '_blank' : '_self');
  }

  const set =
    (key: keyof ContactFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [key]: e.target.value }));

  return (
    <>
      <Seo
        title="Contact"
        description={`Contacter le cabinet du ${SITE.practitioner} à ${SITE.city} : téléphone, WhatsApp, e-mail et adresse.`}
        canonicalPath="/contact"
      />

      <header className="page-head">
        <div className="shell">
          <Reveal y={14}>
            <span className="eyebrow">Contact</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="display-xl" style={{ maxWidth: '20ch' }}>
              Préparer sa demande, <span className="accent-word">puis appeler</span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="lede" style={{ marginTop: '1.5rem' }}>
              Ce formulaire n'envoie rien à un serveur et ne réserve aucun créneau. Il compose un
              message que vous envoyez vous-même, par WhatsApp ou par e-mail.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="section">
        <div className="shell">
          <div className="split split--aside">
            {/* ---------- Formulaire ---------- */}
            <Reveal>
              <form
                className="stack stack-md"
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  openLink('whatsapp');
                }}
              >
                <fieldset className="stack stack-md">
                  <legend className="display-md" style={{ marginBottom: '1rem' }}>
                    Vos coordonnées
                  </legend>

                  <div>
                    <label className="field-label" htmlFor="c-name">
                      Nom et prénom
                    </label>
                    <input
                      id="c-name"
                      className="field"
                      type="text"
                      autoComplete="name"
                      value={values.name}
                      onChange={set('name')}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'c-name-err' : undefined}
                    />
                    {errors.name ? (
                      <p id="c-name-err" className="field-error">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label className="field-label" htmlFor="c-phone">
                      Téléphone
                    </label>
                    <input
                      id="c-phone"
                      className="field tnum"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="0X XX XX XX XX"
                      value={values.phone}
                      onChange={set('phone')}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'c-phone-err' : undefined}
                    />
                    {errors.phone ? (
                      <p id="c-phone-err" className="field-error">
                        {errors.phone}
                      </p>
                    ) : null}
                  </div>

                  {/* Choix du motif en groupe de radios stylées : le select
                      natif dessine son propre menu et casse la page. */}
                  <div
                    role="radiogroup"
                    aria-labelledby="c-reason-label"
                    aria-describedby={errors.reason ? 'c-reason-err' : undefined}
                  >
                    <p className="field-label" id="c-reason-label">
                      Motif
                    </p>
                    <div className="filter-bar">
                      {REASONS.map((r) => (
                        <button
                          key={r}
                          type="button"
                          role="radio"
                          aria-checked={values.reason === r}
                          className="filter-chip"
                          onClick={() => setValues((v) => ({ ...v, reason: r }))}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                    {errors.reason ? (
                      <p id="c-reason-err" className="field-error">
                        {errors.reason}
                      </p>
                    ) : null}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="display-md" style={{ marginBottom: '0.5rem' }}>
                    Jour souhaité
                  </legend>
                  <p className="text-muted" style={{ fontSize: '0.86rem', marginBottom: '1rem' }}>
                    Indicatif seulement : la disponibilité réelle se confirme au téléphone.
                  </p>

                  <div className="day-scroller" role="group" aria-label="Choisir un jour">
                    {days.map((d) => {
                      const [dow, num] = d.shortLabel.split(' ');
                      return (
                        <button
                          key={d.iso}
                          type="button"
                          className="day-chip"
                          aria-pressed={d.iso === selectedIso}
                          disabled={d.disabled}
                          onClick={() => {
                            setSelectedIso(d.iso);
                            setSlotKey(null);
                          }}
                        >
                          <span className="day-chip__dow">{dow}</span>
                          <span className="day-chip__num tnum">{num}</span>
                          {d.disabled ? <span className="day-chip__closed">fermé</span> : null}
                        </button>
                      );
                    })}
                  </div>

                  <div style={{ marginTop: '1.25rem' }} aria-live="polite">
                    {slots.length === 0 ? (
                      <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                        Le cabinet est fermé ce jour. Choisissez un autre jour.
                      </p>
                    ) : (
                      <div className="slot-grid" role="group" aria-label="Choisir un créneau">
                        {slots.map((s) => (
                          <button
                            key={s.key}
                            type="button"
                            className="slot-chip"
                            aria-pressed={slotKey === s.key}
                            onClick={() => setSlotKey(slotKey === s.key ? null : s.key)}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </fieldset>

                <div>
                  <label className="field-label" htmlFor="c-message">
                    Précisions (facultatif)
                  </label>
                  <textarea
                    id="c-message"
                    className="field"
                    rows={4}
                    value={values.message}
                    onChange={set('message')}
                    placeholder="Depuis quand, traitements en cours, question précise"
                  />
                  <p className="text-muted" style={{ fontSize: '0.82rem', marginTop: '0.5rem' }}>
                    N'écrivez pas de résultat d'analyse sensible : ce message part par votre propre
                    application de messagerie.
                  </p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <button type="submit" className="btn btn-primary">
                    <WhatsappLogo size={17} weight="light" />
                    Envoyer par WhatsApp
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => openLink('mail')}>
                    <EnvelopeSimple size={17} weight="light" />
                    Envoyer par e-mail
                  </button>
                </div>
              </form>
            </Reveal>

            {/* ---------- Aperçu du message et coordonnées ---------- */}
            <Reveal delay={0.1}>
              <div className="stack stack-md">
                <div className="card stack stack-sm">
                  <p className="fact__label">Aperçu du message</p>
                  <AnimatePresence mode="wait">
                    <motion.pre
                      key={`${values.name}|${values.phone}|${values.reason}|${selectedIso}|${slotKey}`}
                      className="msg-preview"
                      initial={reduce ? { opacity: 0 } : { opacity: 0, transform: 'translateY(0.4rem)' }}
                      animate={{ opacity: 1, transform: 'translateY(0rem)' }}
                      transition={{ duration: 0.26, ease: EASE }}
                    >
                      {`Demande de rendez-vous, ${SITE.brandName}
Nom : ${values.name || '(à compléter)'}
Téléphone : ${values.phone || '(à compléter)'}
Motif : ${values.reason || '(à compléter)'}
Date souhaitée (à confirmer) : ${selectedDay.fullLabel}${
                        selectedSlot ? `\nCréneau souhaité (à confirmer) : ${selectedSlot.label}` : ''
                      }${values.message.trim() ? `\n\n${values.message.trim()}` : ''}`}
                    </motion.pre>
                  </AnimatePresence>
                </div>

                <div className="card stack stack-sm">
                  <p className="fact__label">Coordonnées</p>
                  <ul className="stack stack-sm">
                    <li>
                      <a href={SITE.mobileHref} className="aside-link">
                        <Phone size={16} weight="light" /> {SITE.mobileDisplay}
                      </a>
                    </li>
                    <li>
                      <a href={SITE.landlineHref} className="aside-link">
                        <Phone size={16} weight="light" /> {SITE.landlineDisplay}
                      </a>
                    </li>
                    <li>
                      <a href={SITE.emailHref} className="aside-link">
                        <EnvelopeSimple size={16} weight="light" /> {SITE.email}
                      </a>
                    </li>
                    <li>
                      <a href={SITE.mapsHref} target="_blank" rel="noreferrer" className="aside-link">
                        <MapPin size={16} weight="light" /> {SITE.addressLine}
                      </a>
                    </li>
                  </ul>
                </div>

                <p
                  className="text-muted"
                  style={{ fontSize: '0.84rem', display: 'flex', gap: '0.6rem', lineHeight: 1.6 }}
                >
                  <Info size={18} weight="light" style={{ flex: 'none', marginTop: '0.1rem' }} />
                  <span>
                    En cas d'urgence (malaise, hypoglycémie sévère, vomissements répétés chez une
                    personne diabétique), n'attendez pas de réponse écrite : appelez directement ou
                    rendez-vous au service d'urgences le plus proche.
                  </span>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Ce qu'il faut apporter : la question posée au téléphone presque à
          chaque prise de rendez-vous, répondue une fois pour toutes. */}
      <section className="section" aria-labelledby="preparer-titre" style={{ background: 'var(--bg-sunken)' }}>
        <div className="shell">
          <div className="sec-head">
            <div>
              <Reveal y={12}>
                <span className="eyebrow">Avant de venir</span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 id="preparer-titre" className="display-lg" style={{ maxWidth: '20ch' }}>
                  Ce qu'il faut <span className="accent-word">apporter</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <p className="lede">
                Choisissez le motif le plus proche du vôtre. Ces listes sont indicatives : une
                consultation se tient même s'il manque un document.
              </p>
            </Reveal>
          </div>

          <Reveal y={12}>
            <div className="filter-bar" role="group" aria-label="Choisir un motif de consultation">
              {PREPARATION.map((p) => (
                <button
                  key={p.slug}
                  type="button"
                  className="filter-chip"
                  aria-pressed={prepSlug === p.slug}
                  onClick={() => setPrepSlug(p.slug)}
                >
                  {p.title}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal y={14} delay={0.06}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={prep.slug}
                className="prep-panel"
                style={{ marginTop: '1.75rem' }}
                initial={reduce ? { opacity: 0 } : { opacity: 0, transform: 'translateY(0.6rem)' }}
                animate={{ opacity: 1, transform: 'translateY(0rem)' }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, transform: 'translateY(-0.3rem)' }}
                transition={{ duration: 0.28, ease: EASE }}
              >
                <div className="split split--aside">
                  <div>
                    <h3 className="display-md">{prep.title}</h3>
                    <p className="text-muted" style={{ marginTop: '0.6rem', lineHeight: 1.65 }}>
                      {prep.who}
                    </p>
                    <ul className="prep-items">
                      {prep.items.map((item) => (
                        <li key={item}>
                          <Icon name="check" size={16} className="spec-sign-check" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="stack stack-md">
                    <div>
                      <p className="fact__label">À retenir</p>
                      <p className="text-muted" style={{ marginTop: '0.6rem', lineHeight: 1.65 }}>
                        {prep.note}
                      </p>
                    </div>
                    <a href={SITE.mobileHref} className="btn btn-secondary" style={{ alignSelf: 'flex-start' }}>
                      <Phone size={17} weight="light" />
                      Un doute ? {SITE.mobileDisplay}
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>
      </section>
    </>
  );
}
