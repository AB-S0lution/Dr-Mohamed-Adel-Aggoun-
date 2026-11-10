# Cabinet Saha, Dr Mohamed Adel Aggoun (site de démonstration)

Site vitrine de démonstration pour le cabinet du Dr Mohamed Adel Aggoun, diabétologie et
endocrinologie, route de Tazoult, wilaya de Batna, Algérie. Front end statique uniquement :
Vite + TypeScript + Tailwind v4, aucun backend, aucune base de données. Déployé sur GitHub
Pages (`https://ab-s0lution.github.io/Dr-Mohamed-Adel-Aggoun-/`, base `/Dr-Mohamed-Adel-Aggoun-/`).

Source de vérité du contenu : [`PLAN.md`](./PLAN.md) (faits vérifiés avec sources, zones d'ombre
marquées `TODO`, direction de design, concept « Équilibre »).

Ce site est une proposition indépendante et non officielle, en attente de relecture et de
validation par le Dr Aggoun avant toute mise en ligne définitive (bandeau visible dans le
pied de page de chaque page).

## Concept : « Équilibre »

Une courbe sinusoïdale (le motif de la balance hormonale et métabolique) traverse le héros de
l'accueil et sert de fil conducteur discret du site. Palette chaude pin/sable/terracotta,
association Fraunces (titres) + une sans-serif Fontshare (texte courant). Mouvement calme et
confiant, jamais spectaculaire : une seule scène épinglée (le déroulement d'une consultation),
le reste en révélations douces au défilement.

## Pages (10 routes + 404)

| Route | Contenu |
| --- | --- |
| `/` (`index.html`) | Héros avec courbe dessinée au scroll, infos rapides (horaires, téléphone, WhatsApp), motifs de consultation fréquents, bandeau d'accès |
| `/le-cabinet.html` | Philosophie du cabinet, section épinglée « Ce qui se passe, étape par étape » (5 étapes, GSAP ScrollTrigger) |
| `/specialites.html` | 12 motifs de consultation filtrables, fiches `<details>` accessibles |
| `/conseils-sante.html` | 12 articles de conseils santé, filtrables par catégorie |
| `/faq.html` | 15 questions regroupées en 3 catégories, accordéon |
| `/horaires-acces.html` | Tableau des horaires (jour courant mis en évidence), carte Google Maps |
| `/contact.html` | Formulaire qui compose un message WhatsApp ou e-mail prêt à envoyer (aucune réservation automatique) |
| `/mentions-legales.html`, `/confidentialite.html` | Pages légales (`noindex`) |
| `404.html` | Page d'erreur GitHub Pages, chemins absolus |

## Pile technique

- Vite 8 (build multi-pages), TypeScript strict, Tailwind CSS v4 via `@tailwindcss/vite`.
- **GSAP** + ScrollTrigger pour l'unique scène épinglée du site ; **Lenis** pour le défilement
  doux (désactivé sous `prefers-reduced-motion`). Révélations au scroll via `IntersectionObserver`.
  Courbe du héros dessinée en CSS `animation-timeline: view()` avec repli `IntersectionObserver`.
- Pas de framework : pages HTML statiques + modules `src/pages/<nom>.ts`.
- Polices chargées via Google Fonts (Fraunces) et Fontshare (sans-serif), avec `preconnect`.

## Données

`src/data/*.ts`, typées, chaque fichier commence par un commentaire « sample data ». Réel et
vérifié (voir `PLAN.md`) : identité du praticien, adresse, téléphone, horaires, coordonnées
WhatsApp/e-mail. Exemple, à remplacer plus tard par le praticien : les 12 motifs de consultation,
les 12 articles de conseils santé, les 15 questions FAQ, les 5 étapes de consultation.

Règles de contenu propres à un site médical, appliquées strictement : aucun prix, aucune offre
ni urgence commerciale, aucun témoignage ni note en étoiles, aucun avant/après, aucune
comparaison avec d'autres praticiens, aucune promesse de résultat médical, aucune réservation
en ligne réelle (seulement `tel:`, `mailto:`, `wa.me` pré-remplis).

## Lancer et vérifier

```bash
npm install
npm run dev        # serveur de développement
npm run typecheck   # tsc --noEmit
npm run build        # tsc --noEmit && vite build
npm run preview      # sert dist/ avec la base /Dr-Mohamed-Adel-Aggoun-/
```

Avant toute mise en ligne : `npm run typecheck && npm run build`, puis le contrôle de chemins
racine de `.github/workflows/ci.yml` (aucun `src|href="/..."` hors `/Dr-Mohamed-Adel-Aggoun-/`).

## Ce qui reste à confirmer par le praticien

Voir `PLAN.md` §8 pour la liste complète : second numéro de ligne fixe et conflit sur l'horaire
du mardi, logo et photos réelles du cabinet, diplômes/qualifications et années de pratique,
langues parlées, présence déjà existante sur Google Maps/Facebook, et le circuit de prise de
rendez-vous souhaité (WhatsApp, e-mail ou téléphone uniquement). L'accessibilité du cabinet aux
personnes à mobilité réduite n'a pas non plus été confirmée (signalé sur la page Le Cabinet).
