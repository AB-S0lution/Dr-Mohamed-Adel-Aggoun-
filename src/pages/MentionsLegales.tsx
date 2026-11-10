import { SITE } from '../data/site';
import { Reveal } from '../components/motion/Reveal';
import { Seo } from '../components/ui/Seo';

export default function MentionsLegales() {
  return (
    <>
      <Seo
        title="Mentions légales"
        description="Nature du site, praticien présenté, hébergement et propriété du contenu."
        canonicalPath="/mentions-legales"
      />

      <header className="page-head">
        <div className="shell">
          <Reveal y={14}>
            <span className="eyebrow">Informations</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="display-lg">Mentions légales</h1>
          </Reveal>
        </div>
      </header>

      <section className="section">
        <div className="shell">
          <Reveal>
            <div className="prose">
              <h2>Nature du site</h2>
              <p>
                Ce site est une démonstration indépendante, réalisée à titre de proposition pour le{' '}
                {SITE.brandName} ({SITE.practitioner}). Il n'est pas encore validé ni officiellement
                publié par le praticien.
              </p>

              <h2>Praticien présenté</h2>
              <p>
                {SITE.practitioner}, {SITE.specialtyShort.toLowerCase()}, {SITE.addressFull}.
              </p>

              <h2>Contact</h2>
              <p>
                Téléphone : <a href={SITE.mobileHref}>{SITE.mobileDisplay}</a>. E-mail :{' '}
                <a href={SITE.emailHref}>{SITE.email}</a>.
              </p>

              <h2>Hébergement</h2>
              <p>Ce site est hébergé gratuitement par GitHub Pages (GitHub, Inc.).</p>

              <h2>Contenu</h2>
              <p>
                Les informations de spécialité et de pratique médicale présentées sont générales et
                à visée informative. Les articles du site ne constituent pas un avis médical
                individualisé et ne remplacent pas une consultation.
              </p>

              <h2>Images</h2>
              <p>
                Les photographies du site proviennent d'Unsplash et sont utilisées sous licence
                Unsplash. Elles illustrent la consultation de façon générique : aucune ne montre le
                praticien, son équipe, ses patients ou ses locaux. Le logo, les icônes et les
                illustrations sont dessinés pour ce site.
              </p>

              <h2>Propriété</h2>
              <p>
                Les textes, visuels et le code de ce site resteront la propriété du {SITE.brandName}{' '}
                une fois validés. Aucune photographie ou donnée réelle non vérifiée n'est publiée ;
                voir la page Confidentialité pour le traitement des données.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
