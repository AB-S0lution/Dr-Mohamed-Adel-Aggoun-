// Données d'exemple (sample data) : repères de rythme du suivi, présentés
// comme une illustration de ce à quoi ressemble une année de suivi. Ce ne
// sont pas des prescriptions : la fréquence réelle est fixée par le
// praticien, pour chaque personne. Aucune valeur cible n'est affichée, voir
// PLAN.md §4.

export type FollowUpRhythm = 'À chaque consultation' | 'Plusieurs fois par an' | 'Une fois par an';

export interface FollowUpItem {
  label: string;
  rhythm: FollowUpRhythm;
  why: string;
}

export const FOLLOW_UP_RHYTHMS: FollowUpRhythm[] = [
  'À chaque consultation',
  'Plusieurs fois par an',
  'Une fois par an',
];

export const FOLLOW_UP: FollowUpItem[] = [
  {
    label: 'Relecture du carnet de glycémies',
    rhythm: 'À chaque consultation',
    why: 'C’est la trace de la vie réelle entre deux rendez-vous, y compris les journées qui se sont mal passées.',
  },
  {
    label: 'Poids et tension artérielle',
    rhythm: 'À chaque consultation',
    why: 'Deux mesures simples dont l’évolution se lit mieux sur une série que sur un chiffre isolé.',
  },
  {
    label: 'Examen des pieds',
    rhythm: 'À chaque consultation',
    why: 'La sensibilité peut diminuer sans que la personne s’en aperçoive ; l’examen ne prend que quelques minutes.',
  },
  {
    label: 'Revue des traitements en cours',
    rhythm: 'À chaque consultation',
    why: 'Pour vérifier ce qui est réellement pris, repérer les oublis et les effets mal supportés.',
  },
  {
    label: 'Hémoglobine glyquée',
    rhythm: 'Plusieurs fois par an',
    why: 'Elle résume les deux à trois derniers mois et sert de point de repère pour ajuster, pas de note à obtenir.',
  },
  {
    label: 'Bilan rénal et microalbuminurie',
    rhythm: 'Une fois par an',
    why: 'L’atteinte des reins débute sans aucun signe ressenti, et se repère uniquement sur les analyses.',
  },
  {
    label: 'Bilan lipidique',
    rhythm: 'Une fois par an',
    why: 'L’équilibre des graisses se traite avec celui du sucre, pas séparément.',
  },
  {
    label: 'Fond d’œil',
    rhythm: 'Une fois par an',
    why: 'Réalisé par un ophtalmologue. La rétine peut être atteinte alors que la vision paraît normale.',
  },
  {
    label: 'Bilan hormonal thyroïdien',
    rhythm: 'Une fois par an',
    why: 'Demandé selon le contexte, notamment en cas de thyroïdite connue ou de diabète de type 1.',
  },
  {
    label: 'Point sur les habitudes et le quotidien',
    rhythm: 'Plusieurs fois par an',
    why: 'Le travail, le sommeil, le Ramadan ou un déménagement changent le traitement autant qu’une analyse.',
  },
];
