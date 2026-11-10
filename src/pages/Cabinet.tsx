import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Translate, FolderOpen, Info } from '@phosphor-icons/react';
import { SITE } from '../data/site';
import { PROCESS_STEPS } from '../data/process';
import { SPECIALTIES } from '../data/specialties';
import { Reveal, RevealGroup, RevealItem } from '../components/motion/Reveal';
import { RevealPhoto, ParallaxPhoto } from '../components/motion/Photo';
import { Seo } from '../components/ui/Seo';
import stethoPhoto from '../assets/photos/stethoscope.jpg';
import consultationPhoto from '../assets/photos/cabinet-consultation.jpg';

const DOCUMENTS = [
  'Votre carnet de suivi de glycémie, s’il est tenu.',
  'Les derniers résultats d’analyses, même anciens.',
  'La liste des traitements en cours, avec les doses.',
  'Le courrier du médecin qui vous oriente, le cas échéant.',
];

export default function Cabinet() {
  return (
    <>
      <Seo
        title="Le cabinet"
        description={`Consultations de diabétologie et d'endocrinologie à ${SITE.city} par ${SITE.practitioner}. Déroulement d'une consultation, documents à apporter, langues parlées.`}
        canonicalPath="/le-cabinet"
      />

      <header className="page-head">
        <div className="shell">
          <Reveal y={14}>
            <span className="eyebrow">Le cabinet</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="display-xl" style={{ maxWidth: '20ch' }}>
              Comprendre d'abord,{' '}
              <span className="accent-word">traiter ensuite</span>
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="lede" style={{ marginTop: '1.5rem' }}>
              {SITE.practitioner} reçoit à {SITE.city} pour des consultations de diabétologie et
              d'endocrinologie. Chaque rendez-vous sert à expliquer, ajuster le traitement et
              répondre aux questions, en français comme en arabe.
            </p>
          </Reveal>
        </div>
      </header>

      {/* ---------- La spécialité, en clair ---------- */}
      <section className="section" aria-labelledby="specialite-titre">
        <div className="shell">
          <div className="split split--aside">
            <div>
              <Reveal>
                <h2 id="specialite-titre" className="display-lg" style={{ maxWidth: '22ch' }}>
                  La spécialité, en clair
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="prose" style={{ marginTop: '1.5rem' }}>
                  <p>
                    La diabétologie et l'endocrinologie s'occupent de l'équilibre hormonal et
                    métabolique : diabète, thyroïde, poids, croissance, surrénales. Beaucoup de ces
                    troubles évoluent lentement et se suivent dans la durée, avec des ajustements
                    progressifs plutôt que des solutions immédiates.
                  </p>
                  <h2>Une philosophie de soin</h2>
                  <p>
                    Expliquer avant de prescrire, ajuster avec la personne plutôt que pour elle, et
                    garder une approche calme face à des maladies qui demandent de la patience. Le
                    cabinet privilégie l'écoute et la clarté à toute promesse de résultat rapide.
                  </p>
                  <p>
                    Un suivi réussi n'est pas un chiffre parfait sur une analyse. C'est un
                    traitement que vous comprenez, que vous tenez, et qui laisse place à votre vie :
                    le travail, le ramadan, les repas de famille, le sport.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <RevealPhoto
                src={stethoPhoto}
                alt="Stéthoscope posé sur un drap clair, en noir et blanc"
                graded
                caption="Le temps de l'explication fait partie du soin."
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Déroulement : chronologie verticale, filets ---------- */}
      <section className="section" style={{ background: 'var(--bg-sunken)' }} aria-labelledby="etapes-titre">
        <div className="shell">
          <div className="sec-head">
            <Reveal>
              <span className="eyebrow">Déroulement</span>
              <h2 id="etapes-titre" className="display-lg" style={{ maxWidth: '22ch' }}>
                Une consultation, étape par étape
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="lede">
                Le détail peut varier selon le motif, mais l'ordre reste le même : écouter, examiner,
                expliquer, décider ensemble.
              </p>
            </Reveal>
          </div>

          <RevealGroup as="ol" className="post-list">
            {PROCESS_STEPS.map((step) => (
              <RevealItem key={step.index} as="li" className="post-row">
                <span className="post-row__meta tnum">Étape {step.index}</span>
                <span>
                  <span className="post-row__title" style={{ display: 'block' }}>
                    {step.title}
                  </span>
                  <span
                    className="text-muted"
                    style={{ display: 'block', marginTop: '0.5rem', lineHeight: 1.65, maxWidth: '62ch' }}
                  >
                    {step.description}
                  </span>
                </span>
                <span />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---------- Pratique : deux colonnes dissymétriques ---------- */}
      <section className="section" aria-labelledby="pratique-titre">
        <div className="shell">
          <div className="zig zig--flip">
            <div>
              <Reveal>
                <span className="eyebrow">Pratique</span>
                <h2 id="pratique-titre" className="display-lg" style={{ maxWidth: '20ch' }}>
                  Ce qu'il faut savoir avant de venir
                </h2>
              </Reveal>

              <RevealGroup className="stack stack-md" >
                <RevealItem>
                  <div style={{ marginTop: '2rem', display: 'flex', gap: '0.85rem' }}>
                    <Translate size={22} weight="light" style={{ color: 'var(--accent)', flex: 'none' }} />
                    <div>
                      <h3 style={{ fontWeight: 600, marginBottom: '0.3rem' }}>Langues</h3>
                      <p className="text-muted">
                        La consultation se déroule en arabe ou en français, selon ce qui vous met le
                        plus à l'aise.
                      </p>
                    </div>
                  </div>
                </RevealItem>

                <RevealItem>
                  <div style={{ display: 'flex', gap: '0.85rem' }}>
                    <FolderOpen size={22} weight="light" style={{ color: 'var(--accent)', flex: 'none' }} />
                    <div>
                      <h3 style={{ fontWeight: 600, marginBottom: '0.3rem' }}>Documents utiles</h3>
                      <ul className="stack stack-sm text-muted" style={{ marginTop: '0.5rem' }}>
                        {DOCUMENTS.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </RevealItem>

                <RevealItem>
                  <div style={{ display: 'flex', gap: '0.85rem' }}>
                    <Info size={22} weight="light" style={{ color: 'var(--accent)', flex: 'none' }} />
                    <div>
                      <h3 style={{ fontWeight: 600, marginBottom: '0.3rem' }}>Accessibilité</h3>
                      <p className="text-muted">
                        Information à confirmer auprès du cabinet : appelez avant de venir si vous
                        avez besoin d'un accès adapté.
                      </p>
                    </div>
                  </div>
                </RevealItem>

                <RevealItem>
                  <a href={SITE.mobileHref} className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                    <Phone size={17} weight="light" />
                    Appeler le cabinet
                  </a>
                </RevealItem>
              </RevealGroup>
            </div>

            <div className="zig__media">
              <ParallaxPhoto
                src={consultationPhoto}
                alt="Bureau de consultation clair, écran de suivi et balance d'analyse corporelle"
                graded
                distance={40}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Aperçu d'un espace patient : clairement une maquette ---------- */}
      <section className="section--tight" aria-labelledby="espace-titre">
        <div className="shell">
          <Reveal>
            <div className="card" style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
              <div className="split split--aside" style={{ alignItems: 'center' }}>
                <div>
                  <span className="chip">Maquette, non disponible</span>
                  <h2 id="espace-titre" className="display-md" style={{ marginTop: '1rem' }}>
                    À quoi pourrait ressembler un espace patient
                  </h2>
                  <p className="text-muted" style={{ marginTop: '0.75rem', lineHeight: 1.65, maxWidth: '52ch' }}>
                    Historique de suivi, documents partagés, rappels de rendez-vous. Rien de tout
                    cela n'existe aujourd'hui : aucun compte ne peut être créé, aucune donnée de
                    santé n'est hébergée par ce site.
                  </p>
                </div>

                <form
                  className="stack stack-sm"
                  aria-describedby="espace-note"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div>
                    <label className="field-label" htmlFor="espace-id">
                      Identifiant
                    </label>
                    <input id="espace-id" className="field" type="text" disabled placeholder="non actif" />
                  </div>
                  <div>
                    <label className="field-label" htmlFor="espace-pw">
                      Mot de passe
                    </label>
                    <input id="espace-pw" className="field" type="password" disabled placeholder="non actif" />
                  </div>
                  <button type="submit" className="btn btn-secondary" disabled>
                    Bientôt disponible
                  </button>
                  <p id="espace-note" className="text-muted" style={{ fontSize: '0.82rem' }}>
                    Champs désactivés : cette section illustre une évolution possible du site.
                  </p>
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section--tight">
        <div className="shell">
          <Reveal>
            <div className="rule" />
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '2rem',
              }}
            >
              <p className="display-md" style={{ maxWidth: '24ch' }}>
                Les spécialités prises en charge
              </p>
              <Link to="/specialites" className="btn btn-primary">
                Voir les {SPECIALTIES.length} spécialités
                <span className="btn__icon" aria-hidden="true">
                  <ArrowRight size={14} weight="bold" />
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
