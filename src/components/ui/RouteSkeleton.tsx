/**
 * Attente d'une route chargée à la demande. Reprend la forme réelle de la
 * page qui arrive (en-tête, titre, deux colonnes) au lieu d'un rond qui
 * tourne : l'oeil n'a pas à se recadrer quand le contenu apparaît.
 */
export function RouteSkeleton() {
  return (
    <div aria-busy="true" aria-live="polite">
      <span className="sr-only-visually">Chargement de la page</span>

      <header className="page-head">
        <div className="shell">
          <span className="skel skel--eyebrow" />
          <span className="skel skel--title" />
          <span className="skel skel--lede" />
        </div>
      </header>

      <section className="section">
        <div className="shell">
          <div className="split split--aside">
            <div className="stack stack-sm">
              <span className="skel skel--line" />
              <span className="skel skel--line" />
              <span className="skel skel--line skel--short" />
              <span className="skel skel--line" />
              <span className="skel skel--line skel--short" />
            </div>
            <span className="skel skel--block" />
          </div>
        </div>
      </section>
    </div>
  );
}
