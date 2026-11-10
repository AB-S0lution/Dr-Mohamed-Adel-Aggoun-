# Cabinet Saha, Dr Mohamed Adel Aggoun (démo)

Source de vérité du contenu : `PLAN.md` (faits vérifiés avec sources, concept « Équilibre »,
palette §7, zones d'ombre en `TODO`). Brief de build : `../BUILD_BRIEF.md`.

- **Stack** : Vite 8 (build multi-pages, pas de routeur), TypeScript strict, Tailwind v4 via
  `@tailwindcss/vite`. Pas de framework JS. Base `/Dr-Mohamed-Adel-Aggoun-/`.
- **Concept** : « Équilibre », courbe sinusoïdale (balance hormonale/métabolique) dessinée au
  scroll dans le héros (`.curve-draw`, `animation-timeline: view()` + repli IntersectionObserver).
  Palette chaude pin/sable/terracotta (primitives dans `src/styles/main.css`, bloc marqué
  `ds-allow-hardcode`). Typographie : Fraunces (titres) + sans-serif Fontshare (texte).
- **Mouvement** : restreint, jamais spectaculaire. Une seule scène épinglée dans tout le site
  (`src/lib/process-pin.ts`, GSAP ScrollTrigger, étapes de consultation sur `le-cabinet.html`),
  scroll distance `steps.length * 300`px. Repli calme sous `prefers-reduced-motion` ou
  `max-width: 899px` : liste statique empilée, pas de pin, pas de scrub. Lenis pour le défilement
  doux, désactivé sous reduced-motion. Révélations via `IntersectionObserver`
  (`src/lib/reveal.ts`), jamais de listener `scroll`. Transform/opacity uniquement.
- **Vérifier** : `npm run typecheck && npm run build`, puis `npm run preview` (base
  `/Dr-Mohamed-Adel-Aggoun-/`) et le contrôle de chemins racine de `.github/workflows/ci.yml`
  (aucun `src|href="/..."` hors `/Dr-Mohamed-Adel-Aggoun-/` — `404.html` est l'exception
  volontaire, chemins absolus car servi depuis n'importe quelle profondeur d'URL GitHub Pages).
- **Règles de contenu médical (strictes, voir `PLAN.md` §4)** : aucun prix, aucune offre ni
  urgence commerciale, aucun témoignage/note en étoiles, aucun avant/après, aucune comparaison
  avec d'autres praticiens, aucune promesse de résultat, aucune réservation en ligne réelle
  (seulement `tel:`, `mailto:`, `wa.me` pré-remplis via `src/lib/contact-links.ts`).
- **Ne jamais inventer** : second numéro de ligne fixe, horaire exact du mardi (conflit entre
  sources, voir `HOURS_TODO_NOTE` dans `src/data/hours.ts`), diplômes, années d'expérience,
  équipement du cabinet, avis clients nommés. Lacunes listées dans `PLAN.md` §8.
- **Données** : `src/data/*.ts`, typées, en-tête « sample data ». Spécialités (12), articles
  conseils santé (12, texte intégral), FAQ (15, 3 catégories), étapes de consultation (5) sont
  des exemples en caractère avec le cabinet ; identité, adresse, téléphone, horaires, e-mail sont
  réels et sourcés dans `PLAN.md`.
- **Icônes** : SVG originales faites main dans `src/lib/icons.ts`, pas de bibliothèque générique.
- **Pied de page** : rendu par JS (`src/lib/footer.ts` → `renderFooter()`) depuis `site.ts` et
  `hours.ts`, injecté dans `<footer id="site-footer">` sur chaque page ; inclut le bandeau
  « démonstration indépendante, non validée par le praticien ».
- **Cascade CSS** : ne jamais mettre `grid-template-columns` en style inline sur un conteneur —
  un bug déjà rencontré (grilles multi-colonnes bloquées en une colonne à toutes les largeurs)
  venait d'inline styles qui battaient les classes externes. Les colonnes vivent dans
  `main.css` (`.quick-info-grid`, `.specialty-grid`, `.articles-grid`, `.md-2col`).
- **Git** : ne jamais committer ni pousser sans demande explicite. Laisser l'arbre modifié.
- `rg` peut corrompre le texte affiché dans cet environnement : si un résultat semble incohérent
  avec le fichier, relancer avec `grep -rn` et faire confiance à ce résultat.
