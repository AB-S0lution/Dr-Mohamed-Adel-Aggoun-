# Cabinet Saha, Dr Mohamed Adel Aggoun (démo)

Source de vérité du contenu : `PLAN.md` (faits vérifiés avec sources, direction de design §7,
crédits photo §7b, zones d'ombre en `TODO` §8). Brief de build : `../BUILD_BRIEF.md`.

- **Stack** : **React 19 + Vite 8 en SPA** (React Router 7), TypeScript strict, Tailwind v4 via
  `@tailwindcss/vite`, `motion/react` pour les révélations et transitions, GSAP ScrollTrigger pour
  l'unique scène épinglée, Lenis pour le défilement doux. Base `/Dr-Mohamed-Adel-Aggoun-/`.
  `404.html` est **émis par un plugin Vite** (copie de `index.html`) : c'est ce qui fait marcher les
  liens profonds sur GitHub Pages. Ne pas recréer de `*.html` à la racine, il n'y en a plus qu'un.
- **Concept** : « clinique éditorial ». Palette bleu clinique et blanc (accent unique
  `--c-blue-700`), typographie Cabinet Grotesk (titres) + Satoshi (texte), **auto-hébergées** dans
  `src/assets/fonts/` : aucun lien vers un CDN de polices, la page ne dépend de personne.
- **Mouvement** : visible mais jamais spectaculaire. **Une seule scène épinglée dans tout le site**
  (`src/components/sections/ProcessPin.tsx`, défilement horizontal des étapes de consultation sur
  l'accueil), désactivée sous `prefers-reduced-motion` et sous 900px (`src/lib/breakpoints.ts`), où
  la même liste s'empile. Transform et opacité uniquement, jamais de listener `scroll`
  (`useScroll`/`useMotionValueEvent` ou `whileInView`).
- **Seuil de révélation** : `Reveal`/`RevealPhoto` déclenchent sur une **marge** de viewport, pas sur
  un pourcentage de l'élément. Un bloc plus haut que l'écran (formulaire de contact) n'atteindrait
  jamais `amount: 0.25` et resterait invisible pour toujours — bug déjà rencontré et corrigé.
- **Vérifier** : `npm run typecheck && npm run build`, puis `npm run preview` et les captures
  Playwright à 390 px et 1440 px, plusieurs positions de défilement, plus l'état reduced-motion.
  Le contrôle de contraste tourne **contre le serveur de preview**, pas en `file://` (les entrées
  Vite ne rendent pas sous `file://`) : 11 routes × 2 thèmes, seuil WCAG AA.
- **Portes automatiques (plugin ux-ui-agent-skills, bloquantes à l'écriture)** :
  - aucune valeur en dur dans le CSS ni dans les styles inline (px, hex, durées) : tout passe par un
    jeton de `main.css`. Les blocs qui définissent les primitives portent `ds-allow-hardcode`
    (`:root`) ou `ds-allow-hardcode:start` / `:end` (les `@font-face`).
  - **aucun tiret cadratin ni demi-cadratin (`—`, `–`) nulle part**, y compris en commentaire :
    virgule, deux-points, ou « à » pour une plage d'heures.
  - pas de `<select>` natif : groupe de boutons `role="radio"` à la place.
- **Règles de contenu médical (strictes, voir `PLAN.md` §4)** : aucun prix, aucune offre ni urgence
  commerciale, aucun témoignage ni note en étoiles, aucun avant/après, aucune comparaison avec
  d'autres praticiens, aucune promesse de résultat, aucune réservation en ligne réelle (seulement
  `tel:`, `mailto:`, `wa.me` pré-remplis via `src/lib/contact-links.ts`).
- **Ne jamais inventer** : second numéro de ligne fixe, horaire exact du mardi (conflit entre
  sources, voir `HOURS_TODO_NOTE` dans `src/data/hours.ts`), diplômes, années d'expérience,
  équipement du cabinet, avis clients nommés. Lacunes listées dans `PLAN.md` §8.
- **Compter depuis les données, jamais en toutes lettres.** Les articles sont 19 et les questions 19,
  pas 12 et 15 : écrire `{ARTICLES.length}` dans la copie, sinon le texte ment dès qu'une donnée
  bouge (erreur déjà commise).
- **Données** : `src/data/*.ts`, typées, en-tête « sample data ». Spécialités (12), articles conseils
  santé, FAQ (3 catégories), étapes de consultation (5) sont des exemples en caractère avec le
  cabinet ; identité, adresse, téléphone, horaires, e-mail sont réels et sourcés dans `PLAN.md`.
- **Photos** : cinq images Unsplash dans `src/assets/photos/`, créditées en `PLAN.md` §7b, sujets
  génériques de consultation et de nutrition. **Jamais de portrait de stock** : un visage de banque
  d'images sur le site d'un médecin nommé se lit comme une photo de lui. Vérifier chaque image en la
  regardant (contact sheet ffmpeg) avant de l'intégrer : une photo retenue portait un badge
  « UROLOGIC ONCOLOGY BRANCH » parfaitement lisible.
- **Icônes** : SVG originales faites main pour les douze spécialités (`src/lib/icons.ts`, rendues par
  `src/components/ui/Icon.tsx`) ; Phosphor pour l'interface générique (téléphone, enveloppe, menu).
- **Cascade CSS** : ne jamais mettre `grid-template-columns` en style inline sur un conteneur — un
  bug déjà rencontré venait d'inline styles qui battaient les classes externes. Les colonnes vivent
  dans `main.css`. Un enfant de grille a `min-width: auto` : sans `min-width: 0`, un défileur
  horizontal pousse sa colonne hors de la page (bug déjà rencontré sur la page Contact).
- **Git** : ne jamais committer ni pousser sans demande explicite. Laisser l'arbre modifié.
- `rg` peut corrompre le texte affiché dans cet environnement : si un résultat semble incohérent
  avec le fichier, relancer avec `grep -rn` et faire confiance à ce résultat.
