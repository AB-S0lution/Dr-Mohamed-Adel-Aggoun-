// Données d'exemple (sample data) : listes de préparation avant une
// consultation, par motif. Contenu pratique et générique, destiné à montrer
// la structure du site. Aucune consigne de jeûne, de dosage ou d'arrêt de
// traitement n'y figure : ce sont des décisions médicales individuelles, voir
// PLAN.md §4.

export interface PreparationList {
  slug: string;
  title: string;
  /** Pour qui cette liste est pensée, en une ligne. */
  who: string;
  items: string[];
  /** Précision affichée sous la liste, toujours la même logique : appeler en cas de doute. */
  note: string;
}

export const PREPARATION: PreparationList[] = [
  {
    slug: 'premiere-consultation',
    title: 'Première consultation',
    who: 'Vous venez au cabinet pour la première fois, avec ou sans diagnostic posé.',
    items: [
      'Une pièce d’identité et, le cas échéant, votre carte d’assuré',
      'Le courrier du médecin qui vous adresse, s’il y en a un',
      'Toutes vos analyses de sang récentes, même celles qui vous paraissent normales',
      'Les comptes rendus d’échographie, de radiologie ou d’hospitalisation en votre possession',
      'La liste écrite de vos traitements en cours, avec les dosages',
      'Les noms des maladies présentes dans votre famille proche, si vous les connaissez',
      'Les questions que vous voulez poser, notées à l’avance',
    ],
    note: 'Si un document manque, venez quand même : la consultation se tient, et le dossier se complète ensuite.',
  },
  {
    slug: 'suivi-diabete',
    title: 'Suivi de diabète',
    who: 'Consultation de contrôle, que le traitement soit stable ou en cours d’ajustement.',
    items: [
      'Votre carnet d’autosurveillance ou le relevé de votre capteur',
      'Votre lecteur de glycémie, pour vérifier ensemble les réglages',
      'La dernière hémoglobine glyquée et le dernier bilan rénal',
      'Vos ordonnances en cours, y compris celles d’autres médecins',
      'Les épisodes d’hypoglycémie des dernières semaines, avec l’heure et le contexte',
      'Les changements dans votre vie quotidienne : travail, sommeil, activité, repas',
    ],
    note: 'Un carnet incomplet reste utile. Il vaut mieux des relevés irréguliers et honnêtes qu’un carnet reconstitué.',
  },
  {
    slug: 'bilan-thyroidien',
    title: 'Bilan thyroïdien',
    who: 'Première évaluation ou contrôle d’un trouble de la thyroïde déjà connu.',
    items: [
      'Les dosages hormonaux les plus récents, avec les valeurs de référence du laboratoire',
      'Le compte rendu et, si possible, les images de l’échographie cervicale',
      'Les résultats antérieurs, pour comparer l’évolution dans le temps',
      'Le traitement thyroïdien en cours, avec l’heure habituelle de prise',
      'Les signes que vous remarquez : sommeil, poids, température, humeur, cycle',
    ],
    note: 'Gardez vos anciens résultats même périmés : c’est la courbe qui informe, pas le dernier chiffre seul.',
  },
  {
    slug: 'suivi-grossesse',
    title: 'Suivi de grossesse',
    who: 'Diabète connu avant la grossesse, ou diabète apparu pendant la grossesse.',
    items: [
      'Votre carnet de grossesse et le calendrier de vos échographies',
      'Les coordonnées du gynécologue ou de la sage-femme qui vous suit',
      'Vos relevés de glycémie des dernières semaines',
      'Les analyses demandées lors de la consultation précédente',
      'La liste de tout ce que vous prenez, y compris vitamines et compléments',
    ],
    note: 'Le suivi se fait à plusieurs. Les coordonnées de vos autres soignants font gagner du temps à tout le monde.',
  },
  {
    slug: 'consultation-enfant',
    title: 'Consultation d’un enfant',
    who: 'Croissance, puberté, poids ou diabète chez l’enfant et l’adolescent.',
    items: [
      'Le carnet de santé, avec les courbes de taille et de poids',
      'Les analyses et comptes rendus déjà réalisés',
      'Le carnet de glycémies s’il y a un diabète connu',
      'Ce qui a été observé à la maison et à l’école, décrit simplement',
      'Les traitements en cours, y compris ceux pris de façon ponctuelle',
    ],
    note: 'Le carnet de santé est la pièce la plus utile : les courbes anciennes disent souvent plus qu’un examen récent.',
  },
];
