// Données d'exemple (sample data) — descriptions informatives des motifs de
// consultation les plus courants en diabétologie et endocrinologie. Contenu
// générique à visée pédagogique, non spécifique à un patient. Aucune mention
// de prix, de résultats garantis ou de comparaison : voir PLAN.md §4.

export type SpecialtyTag = 'Adulte' | 'Enfant' | 'Suivi' | 'Dépistage';

export interface Specialty {
  slug: string;
  title: string;
  tag: SpecialtyTag[];
  summary: string;
  detail: string;
  icon: 'curve' | 'leaf' | 'drop' | 'scale' | 'sun' | 'pulse' | 'shield' | 'seed' | 'wave' | 'node' | 'compass' | 'anchor';
}

export const SPECIALTIES: Specialty[] = [
  {
    slug: 'diabete-type-1',
    title: 'Diabète de type 1',
    tag: ['Adulte', 'Enfant', 'Suivi'],
    summary: 'Équilibre glycémique, adaptation de l’insulinothérapie et accompagnement au long cours.',
    detail:
      'Le diabète de type 1 demande un ajustement régulier du traitement selon l’activité, l’alimentation et les périodes de la vie (croissance, grossesse, Ramadan). Le suivi porte sur l’équilibre glycémique global, la prévention des hypoglycémies et l’éducation à l’autosurveillance.',
    icon: 'curve',
  },
  {
    slug: 'diabete-type-2',
    title: 'Diabète de type 2',
    tag: ['Adulte', 'Suivi'],
    summary: 'Prise en charge du diabète de type 2, hygiène de vie et ajustement thérapeutique.',
    detail:
      'La consultation fait le point sur l’équilibre glycémique, le poids, la tension et le bilan lipidique, et accompagne les ajustements progressifs du traitement en lien avec l’alimentation et l’activité physique.',
    icon: 'wave',
  },
  {
    slug: 'diabete-gestationnel',
    title: 'Diabète gestationnel',
    tag: ['Adulte', 'Suivi'],
    summary: 'Surveillance de la glycémie pendant la grossesse, en lien avec le suivi obstétrical.',
    detail:
      'Un diabète qui apparaît ou se révèle pendant la grossesse nécessite une surveillance rapprochée de la glycémie, des conseils alimentaires adaptés et une coordination avec le suivi de grossesse.',
    icon: 'leaf',
  },
  {
    slug: 'thyroide-nodules',
    title: 'Nodules thyroïdiens',
    tag: ['Adulte', 'Dépistage'],
    summary: 'Évaluation clinique des nodules de la thyroïde et orientation vers les examens adaptés.',
    detail:
      'Un nodule thyroïdien, souvent découvert à la palpation ou lors d’une échographie, est évalué cliniquement avant d’orienter, si besoin, vers les examens complémentaires appropriés.',
    icon: 'node',
  },
  {
    slug: 'hypothyroidie',
    title: 'Hypothyroïdie',
    tag: ['Adulte', 'Suivi'],
    summary: 'Diagnostic et suivi biologique d’une thyroïde qui fonctionne au ralenti.',
    detail:
      'Fatigue, prise de poids, frilosité : ces signes peuvent évoquer une hypothyroïdie. Le suivi associe un bilan biologique régulier et l’ajustement du traitement substitutif si nécessaire.',
    icon: 'anchor',
  },
  {
    slug: 'hyperthyroidie',
    title: 'Hyperthyroïdie',
    tag: ['Adulte', 'Suivi'],
    summary: 'Prise en charge d’une thyroïde trop active : palpitations, perte de poids, nervosité.',
    detail:
      'Une thyroïde hyperactive peut se traduire par palpitations, amaigrissement ou nervosité. La consultation oriente vers un bilan adapté et un suivi thérapeutique régulier.',
    icon: 'pulse',
  },
  {
    slug: 'obesite-surpoids',
    title: 'Surpoids et obésité',
    tag: ['Adulte', 'Suivi'],
    summary: 'Accompagnement métabolique du surpoids, sans jugement ni promesse de résultat.',
    detail:
      'L’excès de poids est abordé comme un enjeu métabolique global : recherche de causes hormonales éventuelles, bilan du retentissement (glycémie, tension, lipides) et accompagnement progressif.',
    icon: 'scale',
  },
  {
    slug: 'syndrome-metabolique',
    title: 'Syndrome métabolique',
    tag: ['Adulte', 'Dépistage'],
    summary: 'Dépistage conjoint du tour de taille, de la tension, de la glycémie et des lipides.',
    detail:
      'L’association tour de taille élevé, tension limite, glycémie et triglycérides perturbés définit le syndrome métabolique, un terrain à dépister et à surveiller dans la durée.',
    icon: 'compass',
  },
  {
    slug: 'surrenales',
    title: 'Pathologies des surrénales',
    tag: ['Adulte'],
    summary: 'Évaluation des troubles hormonaux d’origine surrénalienne (fatigue, tension, poids).',
    detail:
      'Les glandes surrénales régulent plusieurs hormones essentielles. Une fatigue inhabituelle, une tension artérielle instable ou une prise de poids localisée peuvent justifier un bilan ciblé.',
    icon: 'shield',
  },
  {
    slug: 'croissance-enfant',
    title: 'Retard ou avance de croissance',
    tag: ['Enfant'],
    summary: 'Évaluation endocrinienne d’une croissance qui s’écarte de la courbe habituelle.',
    detail:
      'Quand la taille ou le poids d’un enfant s’écarte nettement de sa courbe de croissance, un avis endocrinien permet de rechercher une cause hormonale et d’orienter la prise en charge.',
    icon: 'seed',
  },
  {
    slug: 'puberte',
    title: 'Puberté précoce ou retardée',
    tag: ['Enfant'],
    summary: 'Repérage et orientation en cas de développement pubertaire atypique dans son rythme.',
    detail:
      'Une puberté qui démarre très tôt ou qui tarde à s’installer peut avoir une origine hormonale. La consultation évalue le stade pubertaire et propose, si besoin, un bilan complémentaire.',
    icon: 'sun',
  },
  {
    slug: 'bilan-hormonal',
    title: 'Bilan hormonal général',
    tag: ['Adulte', 'Dépistage'],
    summary: 'Point d’étape hormonal à la demande du patient ou sur orientation d’un autre médecin.',
    detail:
      'Fatigue persistante, troubles du cycle, chute de cheveux inexpliquée : un bilan hormonal de première intention permet souvent d’orienter la suite de la prise en charge.',
    icon: 'drop',
  },
];

export function findSpecialty(slug: string): Specialty | undefined {
  return SPECIALTIES.find((s) => s.slug === slug);
}
