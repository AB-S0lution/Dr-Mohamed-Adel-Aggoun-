import { SITE } from '../data/site';
import { Reveal } from '../components/motion/Reveal';
import { Seo } from '../components/ui/Seo';

export default function Confidentialite() {
  return (
    <>
      <Seo
        title="Confidentialité"
        description="Ce site ne collecte, ne stocke et ne transmet aucune donnée de santé."
        canonicalPath="/confidentialite"
      />

      <header className="page-head">
        <div className="shell">
          <Reveal y={14}>
            <span className="eyebrow">Informations</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="display-lg">Politique de confidentialité</h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="lede" style={{ marginTop: '1.25rem' }}>
              Ce site est une page statique, sans base de données ni serveur applicatif. Il ne
              collecte, ne stocke et ne transmet aucune donnée de santé.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="section">
        <div className="shell">
          <Reveal>
            <div className="prose">
              <h2>Formulaire de contact</h2>
              <p>
                Le formulaire de la page Contact ne transmet rien à un serveur : il compose un
                message et ouvre votre application WhatsApp ou de messagerie, qui envoie le message
                directement depuis votre appareil.
              </p>

              <h2>Calculateur d'IMC</h2>
              <p>
                La taille et le poids saisis servent au calcul affiché et restent dans la mémoire de
                votre navigateur. Rien n'est enregistré ni transmis.
              </p>

              <h2>Préférence d'affichage</h2>
              <p>
                Le choix du thème clair ou sombre est mémorisé uniquement dans votre navigateur
                (stockage local), afin de se souvenir de votre préférence lors d'une prochaine
                visite. Cette information reste sur votre appareil et n'est jamais transmise.
              </p>

              <h2>Mesure d'audience</h2>
              <p>Aucun outil de suivi ou d'analyse publicitaire n'est utilisé sur ce site.</p>

              <h2>Liens externes</h2>
              <p>
                Les liens vers Google Maps, WhatsApp ou votre application de messagerie vous
                redirigent vers des services tiers soumis à leurs propres règles de confidentialité.
                La carte intégrée à la page Horaires charge un service Google au moment de son
                affichage.
              </p>

              <h2>Contact</h2>
              <p>
                Pour toute question relative à ce site, écrivez à{' '}
                <a href={SITE.emailHref}>{SITE.email}</a>.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
