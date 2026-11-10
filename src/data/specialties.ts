// Données d'exemple (sample data) : descriptions informatives des motifs de
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
  /** Signes qui amènent habituellement à consulter : informatif, pas un outil d’auto-diagnostic. */
  signs: string[];
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
    signs: [
      'Soif inhabituelle et urines très fréquentes',
      'Perte de poids rapide sans explication',
      'Fatigue marquée, vision trouble passagère',
      'Diabète de type 1 déjà diagnostiqué, suivi à ajuster',
    ],
    icon: 'curve',
  },
  {
    slug: 'diabete-type-2',
    title: 'Diabète de type 2',
    tag: ['Adulte', 'Suivi'],
    summary: 'Prise en charge du diabète de type 2, hygiène de vie et ajustement thérapeutique.',
    detail:
      'La consultation fait le point sur l’équilibre glycémique, le poids, la tension et le bilan lipidique, et accompagne les ajustements progressifs du traitement en lien avec l’alimentation et l’activité physique.',
    signs: [
      'Glycémie élevée découverte lors d’un bilan',
      'Antécédents familiaux de diabète de type 2',
      'Surpoids associé à une fatigue inhabituelle',
      'Traitement oral à réévaluer ou à ajuster',
    ],
    icon: 'wave',
  },
  {
    slug: 'diabete-gestationnel',
    title: 'Diabète gestationnel',
    tag: ['Adulte', 'Suivi'],
    summary: 'Surveillance de la glycémie pendant la grossesse, en lien avec le suivi obstétrical.',
    detail:
      'Un diabète qui apparaît ou se révèle pendant la grossesse nécessite une surveillance rapprochée de la glycémie, des conseils alimentaires adaptés et une coordination avec le suivi de grossesse.',
    signs: [
      'Test de dépistage du diabète gestationnel positif',
      'Grossesse avec antécédent de diabète gestationnel',
      'Prise de poids importante pendant la grossesse',
    ],
    icon: 'leaf',
  },
  {
    slug: 'thyroide-nodules',
    title: 'Nodules thyroïdiens',
    tag: ['Adulte', 'Dépistage'],
    summary: 'Évaluation clinique des nodules de la thyroïde et orientation vers les examens adaptés.',
    detail:
      'Un nodule thyroïdien, souvent découvert à la palpation ou lors d’une échographie, est évalué cliniquement avant d’orienter, si besoin, vers les examens complémentaires appropriés.',
    signs: [
      'Gonflement ou nodule visible ou palpé au niveau du cou',
      'Nodule découvert lors d’une échographie',
      'Gêne à la déglutition ou sensation de pression au cou',
    ],
    icon: 'node',
  },
  {
    slug: 'hypothyroidie',
    title: 'Hypothyroïdie',
    tag: ['Adulte', 'Suivi'],
    summary: 'Diagnostic et suivi biologique d’une thyroïde qui fonctionne au ralenti.',
    detail:
      'Fatigue, prise de poids, frilosité : ces signes peuvent évoquer une hypothyroïdie. Le suivi associe un bilan biologique régulier et l’ajustement du traitement substitutif si nécessaire.',
    signs: [
      'Fatigue persistante et frilosité inhabituelle',
      'Prise de poids progressive sans changement d’habitudes',
      'Constipation ou peau sèche installées depuis plusieurs semaines',
    ],
    icon: 'anchor',
  },
  {
    slug: 'hyperthyroidie',
    title: 'Hyperthyroïdie',
    tag: ['Adulte', 'Suivi'],
    summary: 'Prise en charge d’une thyroïde trop active : palpitations, perte de poids, nervosité.',
    detail:
      'Une thyroïde hyperactive peut se traduire par palpitations, amaigrissement ou nervosité. La consultation oriente vers un bilan adapté et un suivi thérapeutique régulier.',
    signs: [
      'Palpitations ou nervosité inhabituelle',
      'Perte de poids malgré un appétit conservé',
      'Tremblements des mains, transpiration excessive',
    ],
    icon: 'pulse',
  },
  {
    slug: 'obesite-surpoids',
    title: 'Surpoids et obésité',
    tag: ['Adulte', 'Suivi'],
    summary: 'Accompagnement métabolique du surpoids, sans jugement ni promesse de résultat.',
    detail:
      'L’excès de poids est abordé comme un enjeu métabolique global : recherche de causes hormonales éventuelles, bilan du retentissement (glycémie, tension, lipides) et accompagnement progressif.',
    signs: [
      'Indice de masse corporelle élevé constaté',
      'Souhait d’un accompagnement médical du poids',
      'Prise de poids associée à de la fatigue ou des troubles du cycle',
    ],
    icon: 'scale',
  },
  {
    slug: 'syndrome-metabolique',
    title: 'Syndrome métabolique',
    tag: ['Adulte', 'Dépistage'],
    summary: 'Dépistage conjoint du tour de taille, de la tension, de la glycémie et des lipides.',
    detail:
      'L’association tour de taille élevé, tension limite, glycémie et triglycérides perturbés définit le syndrome métabolique, un terrain à dépister et à surveiller dans la durée.',
    signs: [
      'Tour de taille élevé associé à une tension limite',
      'Bilan sanguin montrant glycémie et triglycérides perturbés',
      'Antécédents familiaux cardiovasculaires ou de diabète',
    ],
    icon: 'compass',
  },
  {
    slug: 'surrenales',
    title: 'Pathologies des surrénales',
    tag: ['Adulte'],
    summary: 'Évaluation des troubles hormonaux d’origine surrénalienne (fatigue, tension, poids).',
    detail:
      'Les glandes surrénales régulent plusieurs hormones essentielles. Une fatigue inhabituelle, une tension artérielle instable ou une prise de poids localisée peuvent justifier un bilan ciblé.',
    signs: [
      'Fatigue persistante malgré un repos suffisant',
      'Tension artérielle instable ou difficile à équilibrer',
      'Prise de poids localisée (visage, nuque) inhabituelle',
    ],
    icon: 'shield',
  },
  {
    slug: 'croissance-enfant',
    title: 'Retard ou avance de croissance',
    tag: ['Enfant'],
    summary: 'Évaluation endocrinienne d’une croissance qui s’écarte de la courbe habituelle.',
    detail:
      'Quand la taille ou le poids d’un enfant s’écarte nettement de sa courbe de croissance, un avis endocrinien permet de rechercher une cause hormonale et d’orienter la prise en charge.',
    signs: [
      'Infléchissement net de la courbe de croissance du carnet de santé',
      'Taille nettement inférieure à celle attendue pour l’âge',
      'Croissance très rapide et précoce par rapport aux camarades',
    ],
    icon: 'seed',
  },
  {
    slug: 'puberte',
    title: 'Puberté précoce ou retardée',
    tag: ['Enfant'],
    summary: 'Repérage et orientation en cas de développement pubertaire atypique dans son rythme.',
    detail:
      'Une puberté qui démarre très tôt ou qui tarde à s’installer peut avoir une origine hormonale. La consultation évalue le stade pubertaire et propose, si besoin, un bilan complémentaire.',
    signs: [
      'Premiers signes pubertaires avant l’âge habituel',
      'Absence de signes pubertaires alors que l’âge habituel est dépassé',
      'Questionnement des parents sur le rythme pubertaire de l’enfant',
    ],
    icon: 'sun',
  },
  {
    slug: 'bilan-hormonal',
    title: 'Bilan hormonal général',
    tag: ['Adulte', 'Dépistage'],
    summary: 'Point d’étape hormonal à la demande du patient ou sur orientation d’un autre médecin.',
    detail:
      'Fatigue persistante, troubles du cycle, chute de cheveux inexpliquée : un bilan hormonal de première intention permet souvent d’orienter la suite de la prise en charge.',
    signs: [
      'Fatigue persistante sans cause évidente',
      'Troubles du cycle menstruel inexpliqués',
      'Orientation par un autre médecin pour un bilan hormonal',
    ],
    icon: 'drop',
  },
];

export function findSpecialty(slug: string): Specialty | undefined {
  return SPECIALTIES.find((s) => s.slug === slug);
}
