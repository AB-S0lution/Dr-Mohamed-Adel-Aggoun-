// Données d'exemple (sample data) : lexique des mots qui reviennent sur une
// ordonnance, un compte rendu ou un résultat de laboratoire. Contenu
// pédagogique générique, jamais un seuil à appliquer soi-même ni un avis
// individualisé. Aucune valeur n'est présentée comme un objectif personnel :
// voir PLAN.md §4.

export type GlossaryCategory = 'Diabète' | 'Thyroïde' | 'Analyses' | 'Suivi';

export interface GlossaryTerm {
  term: string;
  /** Sigle ou autre nom courant, affiché à côté du terme. */
  aka?: string;
  category: GlossaryCategory;
  definition: string;
}

export const GLOSSARY_CATEGORIES: GlossaryCategory[] = ['Diabète', 'Thyroïde', 'Analyses', 'Suivi'];

export const GLOSSARY: GlossaryTerm[] = [
  {
    term: 'Hémoglobine glyquée',
    aka: 'HbA1c',
    category: 'Analyses',
    definition:
      'Analyse de sang qui reflète la moyenne des glycémies des deux à trois derniers mois. Elle ne remplace pas l’autosurveillance quotidienne : deux personnes avec la même HbA1c peuvent avoir des journées très différentes.',
  },
  {
    term: 'Glycémie à jeun',
    category: 'Analyses',
    definition:
      'Taux de sucre dans le sang mesuré après une nuit sans manger. C’est souvent le premier examen demandé devant une suspicion de diabète, et il est en général répété avant d’être interprété.',
  },
  {
    term: 'Hyperglycémie provoquée par voie orale',
    aka: 'HGPO',
    category: 'Analyses',
    definition:
      'Examen où la glycémie est mesurée avant puis après l’absorption d’une quantité connue de sucre. Utilisé notamment pour le dépistage du diabète gestationnel.',
  },
  {
    term: 'Microalbuminurie',
    category: 'Analyses',
    definition:
      'Recherche de petites quantités d’albumine dans les urines. C’est l’un des moyens les plus précoces de surveiller le retentissement du diabète sur les reins.',
  },
  {
    term: 'Bilan lipidique',
    category: 'Analyses',
    definition:
      'Dosage du cholestérol et des triglycérides. Il accompagne souvent le suivi du diabète, parce que l’équilibre du sucre et celui des graisses se traitent ensemble.',
  },
  {
    term: 'Peptide C',
    category: 'Analyses',
    definition:
      'Marqueur qui donne une idée de la quantité d’insuline encore fabriquée par le pancréas. Il aide parfois à distinguer un diabète de type 1 d’un diabète de type 2.',
  },
  {
    term: 'TSH',
    category: 'Thyroïde',
    definition:
      'Hormone fabriquée par l’hypophyse qui commande la thyroïde. C’est l’analyse de première intention devant une suspicion de trouble thyroïdien.',
  },
  {
    term: 'T4 libre',
    aka: 'FT4',
    category: 'Thyroïde',
    definition:
      'Forme active circulante de l’hormone thyroïdienne. Elle est en général dosée pour préciser un résultat de TSH inhabituel, pas de façon isolée.',
  },
  {
    term: 'Hypothyroïdie',
    category: 'Thyroïde',
    definition:
      'Fonctionnement ralenti de la thyroïde. Elle se manifeste souvent par une fatigue persistante, une frilosité, une prise de poids ou une peau sèche.',
  },
  {
    term: 'Hyperthyroïdie',
    category: 'Thyroïde',
    definition:
      'Fonctionnement accéléré de la thyroïde, qui peut provoquer palpitations, nervosité, perte de poids malgré un bon appétit et troubles du sommeil.',
  },
  {
    term: 'Goitre',
    category: 'Thyroïde',
    definition:
      'Augmentation du volume de la thyroïde, visible ou palpable à la base du cou. Un goitre n’implique pas automatiquement un dérèglement hormonal.',
  },
  {
    term: 'Nodule thyroïdien',
    category: 'Thyroïde',
    definition:
      'Petite formation arrondie dans la thyroïde. La très grande majorité est bénigne ; la conduite à tenir dépend de la taille, de l’aspect échographique et du bilan hormonal.',
  },
  {
    term: 'Thyroïdite de Hashimoto',
    category: 'Thyroïde',
    definition:
      'Maladie où le système immunitaire s’attaque progressivement à la thyroïde. C’est la cause la plus fréquente d’hypothyroïdie durable.',
  },
  {
    term: 'Maladie de Basedow',
    category: 'Thyroïde',
    definition:
      'Cause fréquente d’hyperthyroïdie, d’origine auto-immune, parfois accompagnée d’une gêne ou d’une protrusion au niveau des yeux.',
  },
  {
    term: 'Diabète de type 1',
    category: 'Diabète',
    definition:
      'Le pancréas ne fabrique plus assez d’insuline. Le traitement repose sur l’insuline, avec un ajustement permanent selon l’alimentation, l’activité et les périodes de la vie.',
  },
  {
    term: 'Diabète de type 2',
    category: 'Diabète',
    definition:
      'L’insuline est encore produite mais agit moins bien, et sa production finit par s’épuiser. Le traitement associe des changements d’habitudes et, souvent, des médicaments.',
  },
  {
    term: 'Diabète gestationnel',
    category: 'Diabète',
    definition:
      'Diabète qui apparaît pendant la grossesse et disparaît le plus souvent après l’accouchement. Il demande une surveillance rapprochée pendant et après la grossesse.',
  },
  {
    term: 'Insulinorésistance',
    category: 'Diabète',
    definition:
      'État dans lequel les cellules répondent moins bien à l’insuline. L’organisme compense en en fabriquant davantage, parfois pendant des années avant tout diagnostic.',
  },
  {
    term: 'Hypoglycémie',
    category: 'Diabète',
    definition:
      'Chute du sucre dans le sang, avec sueurs, tremblements, faim brutale ou confusion. Elle se corrige rapidement par un resucrage, puis se discute en consultation pour en comprendre la cause.',
  },
  {
    term: 'Acidocétose',
    category: 'Diabète',
    definition:
      'Complication aiguë liée à un manque majeur d’insuline, avec nausées, souffle rapide et odeur particulière de l’haleine. Elle relève d’une prise en charge urgente.',
  },
  {
    term: 'Autosurveillance glycémique',
    category: 'Diabète',
    definition:
      'Mesure de la glycémie par la personne elle-même, au doigt ou par capteur. Son intérêt vient autant du carnet relu en consultation que du chiffre affiché sur le moment.',
  },
  {
    term: 'Index glycémique',
    category: 'Diabète',
    definition:
      'Classement des aliments selon la vitesse à laquelle ils font monter la glycémie. Il se lit toujours avec la quantité réellement consommée et le reste du repas.',
  },
  {
    term: 'Rétinopathie diabétique',
    category: 'Suivi',
    definition:
      'Atteinte des petits vaisseaux de la rétine. Elle évolue longtemps sans gêne ressentie, d’où l’examen du fond d’œil demandé de façon régulière.',
  },
  {
    term: 'Néphropathie diabétique',
    category: 'Suivi',
    definition:
      'Atteinte progressive des reins liée au diabète. Elle se surveille par des analyses de sang et d’urines, bien avant tout symptôme.',
  },
  {
    term: 'Neuropathie diabétique',
    category: 'Suivi',
    definition:
      'Atteinte des nerfs, le plus souvent aux pieds : fourmillements, engourdissement, perte de sensibilité. Elle explique pourquoi les pieds sont examinés en consultation.',
  },
  {
    term: 'Pied diabétique',
    category: 'Suivi',
    definition:
      'Ensemble des risques pesant sur les pieds quand la sensibilité ou la circulation diminuent. Une plaie qui ne guérit pas s’examine sans attendre.',
  },
  {
    term: 'Fond d’œil',
    category: 'Suivi',
    definition:
      'Examen de la rétine réalisé par un ophtalmologue. Il fait partie du suivi habituel du diabète, même lorsque la vision paraît normale.',
  },
  {
    term: 'Obésité',
    category: 'Suivi',
    definition:
      'Excès de masse grasse retentissant sur la santé. Elle se discute avec l’histoire de la personne et pas seulement avec un chiffre sur une balance.',
  },
  {
    term: 'Indice de masse corporelle',
    aka: 'IMC',
    category: 'Suivi',
    definition:
      'Rapport entre le poids et le carré de la taille. C’est un repère de population, pas un diagnostic : il ne distingue ni la masse musculaire ni la répartition des graisses.',
  },
  {
    term: 'Syndrome des ovaires polykystiques',
    aka: 'SOPK',
    category: 'Suivi',
    definition:
      'Trouble hormonal fréquent associant cycles irréguliers, signes d’hyperandrogénie et souvent une insulinorésistance.',
  },
  {
    term: 'Ostéoporose',
    category: 'Suivi',
    definition:
      'Fragilisation de l’os qui augmente le risque de fracture. Elle entre dans le champ de l’endocrinologie par ses liens avec les hormones et le métabolisme.',
  },
  {
    term: 'Éducation thérapeutique',
    category: 'Suivi',
    definition:
      'Temps consacré à comprendre sa maladie et son traitement : lire une ordonnance, reconnaître une hypoglycémie, adapter ses repas. C’est une partie du soin, pas un supplément.',
  },
];

/** Lexique trié alphabétiquement, insensible aux accents. */
export const GLOSSARY_SORTED: GlossaryTerm[] = [...GLOSSARY].sort((a, b) =>
  a.term.localeCompare(b.term, 'fr', { sensitivity: 'base' }),
);
