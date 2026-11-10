// Illustrations SVG originales — art maison, pas de photo ni de stock.
// Traits continus cohérents avec le jeu d'icônes (icons.ts) et le motif de
// la courbe d'équilibre déjà établi. Toutes les couleurs viennent des
// jetons existants (currentColor / var(--token)) : aucune teinte nouvelle
// n'est introduite ici, pour rester neutre si la palette change plus tard.

/**
 * Scène « équilibre » : un cadran/orbite autour de la courbe signature,
 * entourée de motifs cliniques abstraits (goutte, feuille, pilule) —
 * évoque le suivi métabolique sans dessiner de personnage ni de clinique
 * littérale. Utilisée en grand format (hero, page Le Cabinet).
 */
export function equilibriumScene(): string {
  return `
  <svg viewBox="0 0 520 420" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="width:100%;height:100%;">
    <circle cx="260" cy="210" r="168" stroke="var(--line-strong)" stroke-width="1" opacity="0.6"/>
    <circle cx="260" cy="210" r="124" stroke="var(--line)" stroke-width="1" stroke-dasharray="2 6" opacity="0.7"/>

    <!-- orbite des motifs -->
    <g opacity="0.85">
      <circle cx="260" cy="42" r="19" fill="var(--bg-raised)" stroke="var(--line-strong)" stroke-width="1.2"/>
      <path d="M260 33s7 8 7 13a7 7 0 0 1-14 0c0-5 7-13 7-13Z" stroke="var(--accent)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <g opacity="0.85">
      <circle cx="424" cy="210" r="19" fill="var(--bg-raised)" stroke="var(--line-strong)" stroke-width="1.2"/>
      <path d="M416 217c0-6 3-11 8-13 5 2 8 7 8 13a8 8 0 0 1-16 0Z" stroke="var(--accent)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <g opacity="0.85">
      <circle cx="260" cy="378" r="19" fill="var(--bg-raised)" stroke="var(--line-strong)" stroke-width="1.2"/>
      <path d="M252 384c0-5 3-9 8-13 5 4 8 8 8 13a8 8 0 0 1-16 0Z" stroke="var(--accent)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <g opacity="0.85">
      <circle cx="96" cy="210" r="19" fill="var(--bg-raised)" stroke="var(--line-strong)" stroke-width="1.2"/>
      <path d="M89 217a7 7 0 0 1 14 0c0 5-3 8-7 11-4-3-7-6-7-11Z" stroke="var(--accent)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    </g>

    <!-- courbe d'équilibre centrale, traversant tout le cadran -->
    <path class="curve-draw" data-reveal-skip pathLength="1" d="M60 230c24 0 24-66 48-66s26 72 50 72 22-70 46-70 24 64 48 64 22-58 44-58 24 50 46 50 22-44 40-44" stroke="var(--accent)" stroke-width="2.6" stroke-linecap="round" fill="none"/>

    <circle cx="260" cy="210" r="4" fill="var(--accent)"/>
  </svg>`;
}

/**
 * Silhouette des Aurès (ligne de crêtes stylisée) + lever de soleil —
 * ancrage régional discret (Tazoult/Batna), jamais figuratif à l'excès.
 */
export function auresSkyline(): string {
  return `
  <svg viewBox="0 0 640 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="width:100%;height:100%;" preserveAspectRatio="xMidYMax slice">
    <circle cx="500" cy="70" r="30" stroke="var(--accent)" stroke-width="1.4" opacity="0.5"/>
    <path d="M470 70a30 30 0 0 0 30 30" stroke="var(--accent)" stroke-width="1.4" opacity="0.8" stroke-linecap="round"/>
    <path d="M0 150 L70 90 L120 128 L185 55 L250 130 L300 100 L350 150 L410 70 L460 140 L520 95 L580 150 L640 110 L640 180 L0 180 Z"
      fill="var(--bg-sunken)" opacity="0.9"/>
    <path d="M0 150 L70 90 L120 128 L185 55 L250 130 L300 100 L350 150 L410 70 L460 140 L520 95 L580 150 L640 110"
      stroke="var(--line-strong)" stroke-width="1.3" fill="none"/>
  </svg>`;
}

/**
 * Motif décoratif de fond pour les cartes (spécialités, articles) — reprise
 * discrète de la courbe à grande échelle, en filigrane, jamais au premier
 * plan du texte (pointer-events: none, opacité faible).
 */
export function cardMotif(variant: 0 | 1 | 2 = 0): string {
  const paths = [
    'M-10 70c20 0 20-48 40-48s18 52 38 52 18-50 38-50 20 46 40 46',
    'M-10 40c16 10 16 40 36 40s14-44 34-44 16 48 36 48 14-38 34-38',
    'M-10 60c24-6 24 44 48 44s20-56 44-56 22 48 46 48',
  ];
  return `
  <svg class="card-motif" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="position:absolute;right:-10px;top:-8px;width:120px;height:90px;opacity:0.16;pointer-events:none;">
    <path d="${paths[variant % paths.length]}" stroke="var(--ink)" stroke-width="2.2" stroke-linecap="round" fill="none"/>
  </svg>`;
}
