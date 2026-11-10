// Données d'exemple (sample data) : articles « Conseils santé ». Contenu
// d'information générale grand public sur le diabète, la thyroïde et le
// métabolisme, rédigé de façon générique (jamais attribué personnellement au
// praticien), sans promesse de résultat ni avis médical individualisé. Voir
// PLAN.md §4.

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  category: string;
  readTime: number;
  date: string; // ISO
}

export const ARTICLES: Article[] = [
  {
    slug: 'diabete-et-ramadan',
    title: 'Diabète et Ramadan : ce qu’il faut anticiper',
    excerpt:
      'Le jeûne modifie les besoins en traitement et les repas. Quelques repères pour en parler avec son médecin avant le mois sacré.',
    category: 'Diabète',
    readTime: 6,
    date: '2026-09-26',
    body: [
      'Le jeûne du Ramadan change le rythme des repas, du sommeil et de l’activité physique, ce qui modifie les besoins en traitement pour une personne diabétique. Dans beaucoup de cas, un ajustement des horaires ou des doses est nécessaire avant le début du mois sacré, et non une fois le jeûne commencé.',
      'Un avis médical en amont permet d’évaluer si le jeûne est envisageable selon le type de diabète, l’ancienneté de la maladie et les traitements en cours. Certaines situations (hypoglycémies fréquentes, diabète mal équilibré, grossesse) demandent une attention particulière.',
      'À Cabinet Saha, on explique aux patients volontaires pour jeûner les signes d’alerte à surveiller : sueurs, tremblements, vision trouble, fatigue inhabituelle. Rompre le jeûne en cas d’hypoglycémie n’est pas un échec, c’est une mesure de sécurité.',
      'Le repas du iftar et celui du suhoor méritent une attention particulière : répartir les glucides plutôt que les concentrer sur un seul repas aide à limiter les pics glycémiques et les hypoglycémies nocturnes.',
    ],
  },
  {
    slug: 'comprendre-hba1c',
    title: 'Comprendre l’HbA1c, la mémoire du sucre dans le sang',
    excerpt:
      'Ce dosage sanguin reflète l’équilibre glycémique des deux ou trois derniers mois. Comment le lire sans paniquer.',
    category: 'Diabète',
    readTime: 5,
    date: '2026-09-11',
    body: [
      'L’hémoglobine glyquée, ou HbA1c, mesure la proportion de sucre fixée sur l’hémoglobine des globules rouges. Comme ces cellules vivent environ trois mois, ce dosage donne une image moyenne de la glycémie sur cette période, plutôt qu’une photo instantanée comme la glycémie capillaire.',
      'Un résultat exprimé en pourcentage permet de situer l’équilibre global du diabète. L’objectif n’est pas le même pour tout le monde : il dépend de l’âge, de l’ancienneté du diabète et des autres maladies éventuelles, d’où l’intérêt d’en discuter individuellement plutôt que de viser un chiffre universel.',
      'Un seul dosage ne raconte pas toute l’histoire : des hypoglycémies fréquentes peuvent coexister avec une HbA1c en apparence correcte. C’est pourquoi ce dosage se lit toujours avec le carnet de surveillance et le ressenti du patient.',
    ],
  },
  {
    slug: 'alimentation-locale-diabete',
    title: 'Semoule, pain et légumineuses : adapter l’alimentation locale',
    excerpt:
      'Pas besoin d’un régime importé : les plats de tous les jours peuvent s’adapter avec quelques ajustements simples.',
    category: 'Nutrition',
    readTime: 7,
    date: '2026-08-29',
    body: [
      'Couscous, chorba, pain traditionnel, légumineuses : la cuisine de tous les jours dans la région peut tout à fait s’intégrer à une alimentation adaptée au diabète, sans renoncer aux plats familiaux.',
      'La notion d’index glycémique aide à comprendre pourquoi deux portions de glucides équivalentes n’ont pas le même effet sur la glycémie : une légumineuse comme les pois chiches ou les lentilles élève la glycémie plus lentement qu’une semoule très raffinée.',
      'Quelques habitudes simples font une vraie différence : privilégier les légumes verts en accompagnement, modérer les portions de pain, et répartir les glucides sur la journée plutôt que de les concentrer au dîner.',
      'L’huile d’olive, les fruits secs à coque et le poisson, présents dans l’alimentation locale, ont toute leur place dans une assiette équilibrée pour le cœur et les artères, particulièrement surveillés chez la personne diabétique.',
    ],
  },
  {
    slug: 'signes-hypoglycemie',
    title: 'Reconnaître une hypoglycémie et savoir réagir',
    excerpt:
      'Tremblements, sueurs, faim brutale : des signes à connaître pour agir vite et sans attendre.',
    category: 'Diabète',
    readTime: 4,
    date: '2026-08-13',
    body: [
      'Une hypoglycémie correspond à une baisse du taux de sucre dans le sang en dessous du seuil habituel. Elle peut se manifester par des tremblements, des sueurs, une pâleur, une sensation de faim brutale ou des difficultés de concentration.',
      'La réaction immédiate consiste à resucrer rapidement : un verre de jus de fruit, quelques morceaux de sucre, puis vérifier la glycémie si un lecteur est disponible. Il est utile d’avoir toujours sur soi de quoi resucrer en cas de besoin.',
      'Si les hypoglycémies se répètent, elles ne doivent jamais être considérées comme normales : elles signalent souvent qu’un ajustement du traitement, de l’alimentation ou de l’activité physique est nécessaire, et méritent d’être évoquées en consultation.',
    ],
  },
  {
    slug: 'activite-physique-diabete',
    title: 'Marche, jardinage, escaliers : l’activité physique qui compte vraiment',
    excerpt:
      'Pas besoin de salle de sport : les gestes du quotidien contribuent déjà à l’équilibre glycémique.',
    category: 'Mode de vie',
    readTime: 5,
    date: '2026-08-01',
    body: [
      'L’activité physique améliore la sensibilité à l’insuline, aide à réguler le poids et protège le cœur. Elle ne se résume pas à une salle de sport : marcher d’un bon pas, monter les escaliers, jardiner ou faire le ménage comptent aussi.',
      'L’objectif raisonnable souvent cité est d’environ trente minutes d’activité modérée la plupart des jours de la semaine, avec la possibilité de fractionner en plusieurs courtes sessions si une seule longue séance n’est pas possible.',
      'Pour une personne sous insuline ou sous certains traitements, il est utile de discuter en consultation du moment le plus sûr pour faire de l’exercice, afin d’éviter une hypoglycémie pendant ou après l’effort.',
    ],
  },
  {
    slug: 'thyroide-fatigue',
    title: 'Fatigue persistante : penser à la thyroïde',
    excerpt:
      'Une fatigue qui dure, une prise de poids inexpliquée, une frilosité nouvelle : des signes à ne pas négliger.',
    category: 'Thyroïde',
    readTime: 5,
    date: '2026-07-16',
    body: [
      'La thyroïde, petite glande à la base du cou, régule une grande partie du métabolisme. Quand elle fonctionne au ralenti, la fatigue, la prise de poids, la frilosité ou la constipation peuvent s’installer progressivement, parfois sans qu’on fasse le lien avec la thyroïde.',
      'Ces signes restent non spécifiques : ils peuvent avoir d’autres causes. Un dosage sanguin simple (TSH) permet souvent d’orienter rapidement le diagnostic et d’éviter de attribuer ces symptômes uniquement au stress ou à la fatigue de fin d’année.',
      'Quand un trouble thyroïdien est confirmé, le traitement, lorsqu’il est nécessaire, demande un suivi biologique régulier pour ajuster la dose au plus juste, ni trop ni trop peu.',
    ],
  },
  {
    slug: 'enfant-croissance-signes',
    title: 'Croissance de l’enfant : quand s’interroger',
    excerpt:
      'Un carnet de santé bien rempli aide à repérer tôt un ralentissement de la courbe de croissance.',
    category: 'Pédiatrie',
    readTime: 6,
    date: '2026-07-04',
    body: [
      'Le carnet de santé de l’enfant contient des courbes de poids et de taille qui, suivies régulièrement, permettent de repérer un ralentissement ou une accélération inhabituelle de la croissance.',
      'Un enfant nettement plus petit que ses camarades du même âge, ou dont la courbe s’infléchit nettement sur plusieurs mesures, justifie un avis médical pour rechercher une cause éventuelle, hormonale ou non.',
      'Il ne s’agit pas de comparer un enfant à la moyenne d’une classe, mais de surveiller sa propre courbe dans le temps : c’est la régularité de l’évolution qui compte le plus.',
    ],
  },
  {
    slug: 'surpoids-sans-jugement',
    title: 'Parler du poids sans culpabiliser',
    excerpt:
      'Le surpoids a souvent des causes multiples. L’accompagnement vise à comprendre, pas à juger.',
    category: 'Mode de vie',
    readTime: 5,
    date: '2026-06-22',
    body: [
      'Le poids résulte de nombreux facteurs : génétique, hormonal, habitudes alimentaires, sommeil, stress, parfois certains traitements. Réduire la question à « manger moins, bouger plus » ignore cette complexité et peut décourager plutôt qu’aider.',
      'Une consultation centrée sur le poids cherche d’abord à comprendre le contexte de chaque personne, à repérer d’éventuelles causes hormonales, puis à construire des objectifs progressifs et tenables plutôt qu’un changement radical et temporaire.',
      'Perdre du poids trop vite n’est pas toujours souhaitable : un rythme progressif, associé à un suivi du retentissement sur la glycémie, la tension et les lipides, donne généralement des résultats plus durables.',
    ],
  },
  {
    slug: 'pied-diabetique-prevention',
    title: 'Pieds et diabète : les gestes de prévention au quotidien',
    excerpt:
      'Une petite plaie négligée peut s’aggraver rapidement en cas de diabète. Quelques réflexes simples protègent.',
    category: 'Diabète',
    readTime: 4,
    date: '2026-06-07',
    body: [
      'Le diabète, surtout quand il est ancien ou mal équilibré, peut diminuer la sensibilité des pieds et ralentir la cicatrisation. Une petite plaie ou une ampoule négligée peut alors s’aggraver plus vite que chez une personne non diabétique.',
      'Quelques gestes simples réduisent nettement ce risque : inspecter ses pieds chaque jour, même rapidement, porter des chaussures bien ajustées, éviter de marcher pieds nus, et couper les ongles avec précaution.',
      'Toute plaie qui ne cicatrise pas en quelques jours, ou qui s’accompagne de rougeur ou de chaleur locale, doit être montrée sans attendre plutôt que surveillée seul à la maison.',
    ],
  },
  {
    slug: 'sommeil-metabolisme',
    title: 'Le sommeil, un allié méconnu du métabolisme',
    excerpt:
      'Mal dormir perturbe la glycémie et l’appétit. Un sommeil régulier fait partie du traitement.',
    category: 'Mode de vie',
    readTime: 5,
    date: '2026-05-24',
    body: [
      'Un sommeil insuffisant ou de mauvaise qualité modifie la régulation de la glycémie et peut augmenter la sensation de faim le lendemain, en particulier l’envie d’aliments sucrés ou gras.',
      'Les personnes qui ronflent fort ou qui se sentent fatiguées malgré une nuit complète peuvent présenter un trouble respiratoire du sommeil, plus fréquent en cas de surpoids ou de diabète de type 2, et qui mérite d’être évoqué en consultation.',
      'Des horaires de coucher réguliers, une chambre sombre et calme, et la limitation des écrans avant le coucher restent les mesures les plus simples et les plus efficaces pour améliorer la qualité du sommeil.',
    ],
  },
  {
    slug: 'cholesterol-et-diabete',
    title: 'Cholestérol et diabète : un duo à surveiller ensemble',
    excerpt:
      'Le diabète fragilise aussi les artères. Pourquoi le bilan lipidique fait partie du suivi, au même titre que la glycémie.',
    category: 'Nutrition',
    readTime: 5,
    date: '2026-05-06',
    body: [
      'Le diabète n’agit pas seul sur les artères : il s’associe souvent à un déséquilibre du cholestérol, avec un LDL (le « mauvais » cholestérol) plus facilement oxydé et un HDL (le « bon » cholestérol) parfois abaissé. Cette combinaison augmente le risque cardiovasculaire plus que chaque facteur pris isolément.',
      'C’est pourquoi un bilan lipidique régulier fait partie du suivi habituel du diabète, au même titre que l’HbA1c, même en l’absence de symptôme. Les artères peuvent se fragiliser progressivement sans aucun signe perceptible pendant des années.',
      'Les mesures qui aident sont souvent les mêmes que pour la glycémie : réduire les graisses saturées (viennoiseries, fritures, charcuterie), privilégier l’huile d’olive et les poissons gras, et maintenir une activité physique régulière. Un traitement spécifique est parfois nécessaire en complément.',
    ],
  },
  {
    slug: 'stress-chronique-hormones',
    title: 'Stress chronique : quel effet sur les hormones et la glycémie ?',
    excerpt:
      'Le stress prolongé agit directement sur le cortisol, l’appétit et la glycémie. Un facteur souvent sous-estimé.',
    category: 'Mode de vie',
    readTime: 6,
    date: '2026-04-18',
    body: [
      'Face à un stress ponctuel, le corps libère du cortisol et de l’adrénaline, utiles pour réagir rapidement. Mais quand le stress devient chronique, cette même réponse hormonale peut maintenir la glycémie plus haute que nécessaire et favoriser le stockage des graisses, en particulier au niveau abdominal.',
      'Le stress chronique modifie aussi le comportement alimentaire : il pousse souvent vers des aliments riches en sucre ou en graisse, et perturbe le sommeil, ce qui aggrave encore le déséquilibre métabolique dans un cercle qui s’entretient lui-même.',
      'Il n’existe pas de solution unique : activité physique régulière, sommeil suffisant, moments de détente identifiés et, si besoin, un accompagnement spécifique contribuent à limiter cet impact. En consultation, le contexte de vie fait partie des éléments pris en compte, pas seulement les chiffres.',
    ],
  },
  {
    slug: 'insulinotherapie-type-2',
    title: 'Diabète de type 2 : pourquoi l’insuline peut devenir nécessaire',
    excerpt:
      'Passer à l’insuline n’est pas un échec personnel. C’est une étape du traitement, parfois nécessaire quand les autres options ne suffisent plus.',
    category: 'Diabète',
    readTime: 6,
    date: '2026-11-06',
    body: [
      'Le diabète de type 2 évolue dans le temps : le pancréas peut progressivement produire moins d’insuline, même quand l’alimentation et l’activité physique restent adaptées. Dans ce cas, les comprimés seuls ne suffisent plus toujours à maintenir un bon équilibre glycémique.',
      'Beaucoup de patients associent l’insuline à une aggravation ou à un échec personnel. Ce n’est pas le cas : il s’agit d’une évolution naturelle de la maladie chez une partie des personnes diabétiques, pas d’une punition pour ne pas avoir assez fait d’efforts.',
      'Le passage à l’insuline se prépare : apprentissage du geste d’injection, adaptation des doses selon les repas et l’activité, reconnaissance des hypoglycémies. Cet apprentissage se fait progressivement, avec un suivi rapproché au début.',
      'Un schéma insulinique n’est jamais figé : il est réévalué et ajusté régulièrement selon les résultats de la glycémie, le mode de vie et les éventuels effets ressentis.',
    ],
  },
  {
    slug: 'thyroide-grossesse-depistage',
    title: 'Thyroïde et grossesse : pourquoi un dépistage précoce est utile',
    excerpt:
      'Les besoins de la thyroïde augmentent pendant la grossesse. Un déséquilibre non repéré peut avoir des conséquences, d’où l’intérêt d’un dépistage précoce.',
    category: 'Thyroïde',
    readTime: 5,
    date: '2026-10-24',
    body: [
      'Pendant la grossesse, les besoins en hormones thyroïdiennes augmentent, en particulier au premier trimestre, pour accompagner le développement du bébé. La thyroïde de la future mère doit s’adapter rapidement à cette demande accrue.',
      'Une hypothyroïdie ou, plus rarement, une hyperthyroïdie non repérée pendant la grossesse peut avoir des répercussions sur son déroulement. C’est pourquoi un dosage de la TSH est souvent proposé tôt, en particulier en cas d’antécédent personnel ou familial de maladie thyroïdienne.',
      'Les femmes déjà suivies pour un trouble thyroïdien avant la grossesse ont généralement besoin d’un ajustement de dose dès que la grossesse est confirmée, puis d’un suivi biologique plus rapproché que d’habitude pendant les neuf mois.',
      'Après l’accouchement, les besoins reviennent progressivement à la normale : un nouveau contrôle biologique permet d’adapter le traitement à cette nouvelle étape.',
    ],
  },
  {
    slug: 'vitamine-d-metabolisme',
    title: 'Vitamine D et métabolisme : un rôle qui va au-delà des os',
    excerpt:
      'Connue pour les os, la vitamine D intervient aussi dans la régulation du métabolisme et de l’immunité. Un déficit est fréquent, surtout l’hiver.',
    category: 'Nutrition',
    readTime: 4,
    date: '2026-10-14',
    body: [
      'La vitamine D est surtout connue pour son rôle dans la solidité des os, mais elle intervient aussi dans la régulation de l’immunité et semble jouer un rôle dans la sensibilité à l’insuline, bien que ce dernier lien reste étudié.',
      'La principale source de vitamine D est la synthèse cutanée sous l’effet du soleil, et non l’alimentation seule. Une exposition solaire limitée, une peau très couverte ou un hiver prolongé peuvent favoriser un déficit, fréquent dans la population générale.',
      'Un déficit en vitamine D se traduit rarement par des symptômes nets : fatigue diffuse ou douleurs musculaires peuvent exister, mais le plus souvent, c’est un dosage sanguin qui le révèle. Une supplémentation, quand elle est utile, se fait selon un schéma adapté à chaque situation plutôt qu’en automédication prolongée.',
    ],
  },
  {
    slug: 'tension-arterielle-diabete',
    title: 'Tension artérielle et diabète : une surveillance qui va de pair',
    excerpt:
      'Une tension élevée aggrave le risque cardiovasculaire déjà présent avec le diabète. Elle se mesure et se traite avec la même rigueur que la glycémie.',
    category: 'Mode de vie',
    readTime: 5,
    date: '2026-10-02',
    body: [
      'Le diabète et l’hypertension artérielle coexistent fréquemment, et leur association multiplie le risque sur le cœur, les reins et les artères par rapport à chacun pris séparément. C’est pourquoi la tension artérielle est mesurée à chaque consultation de suivi du diabète, pas seulement en cas de symptôme.',
      'Une tension élevée ne donne le plus souvent aucun signe ressenti : ni mal de tête systématique, ni vertige fiable pour la détecter. Seule une mesure régulière, au cabinet ou à domicile avec un appareil validé, permet de la repérer.',
      'Réduire le sel ajouté, maintenir une activité physique régulière et surveiller le poids contribuent à la fois à la tension et à la glycémie. Un traitement médicamenteux est ajouté quand ces mesures ne suffisent pas, avec un objectif de tension défini individuellement.',
    ],
  },
  {
    slug: 'diabete-voyage-organisation',
    title: 'Diabète et voyage : ce qu’il faut préparer avant de partir',
    excerpt:
      'Changement de climat, de fuseau horaire, de repas : voyager avec un diabète demande une préparation simple mais utile.',
    category: 'Mode de vie',
    readTime: 5,
    date: '2026-09-19',
    body: [
      'Voyager avec un diabète ne pose généralement pas de problème particulier, à condition d’anticiper quelques points : quantité suffisante de traitement et de matériel d’autosurveillance pour toute la durée, plus une marge en cas de retard ou d’imprévu.',
      'L’insuline doit être transportée à température raisonnable, à l’abri de la chaleur excessive ou du gel, idéalement en bagage à main lors d’un trajet en avion, avec une trousse isotherme simple si le trajet est long.',
      'Un changement de fuseau horaire important peut nécessiter d’ajuster les horaires d’injection ou de prise de comprimés ; ce point mérite d’être anticipé en consultation avant un long voyage plutôt que décidé sur place.',
      'Une ordonnance récente et, si possible, un courrier médical mentionnant le traitement en cours facilitent les démarches en cas de contrôle ou de besoin de renouvellement sur place.',
    ],
  },
  {
    slug: 'resistance-insuline-comprendre',
    title: 'Comprendre la résistance à l’insuline, en amont du diabète',
    excerpt:
      'Avant l’apparition du diabète de type 2, les cellules peuvent déjà moins bien répondre à l’insuline. Un mécanisme clé, souvent silencieux.',
    category: 'Diabète',
    readTime: 6,
    date: '2026-09-05',
    body: [
      'L’insuline permet au glucose du sang d’entrer dans les cellules pour y être utilisé comme énergie. Quand les cellules répondent moins bien à ce signal, on parle de résistance à l’insuline : le pancréas compense en produisant plus d’insuline, parfois pendant des années, avant que la glycémie elle-même ne s’élève.',
      'La résistance à l’insuline est favorisée par l’excès de graisse abdominale, la sédentarité et certains facteurs génétiques. Elle précède souvent de plusieurs années le diagnostic de diabète de type 2, sans donner de symptôme particulier.',
      'Un tour de taille élevé, une tension limite ou un bilan lipidique perturbé peuvent être des indices évocateurs, même avec une glycémie encore normale. C’est tout l’intérêt d’un dépistage régulier plutôt que d’attendre l’apparition de symptômes.',
      'Activité physique régulière et perte de poids modeste, quand elle est pertinente, restent les leviers les plus efficaces pour améliorer la sensibilité à l’insuline à ce stade précoce.',
    ],
  },
  {
    slug: 'enfants-sucre-habitudes',
    title: 'Enfants et sucre : construire de bonnes habitudes sans interdire',
    excerpt:
      'Plutôt que l’interdiction stricte, une approche progressive aide les enfants à construire une relation saine avec les aliments sucrés.',
    category: 'Pédiatrie',
    readTime: 5,
    date: '2026-08-23',
    body: [
      'Interdire totalement le sucre chez un enfant crée souvent l’effet inverse : une envie renforcée et, parfois, des prises cachées. Une approche plus progressive, centrée sur la régularité des repas et la modération, donne généralement de meilleurs résultats sur la durée.',
      'Associer systématiquement un aliment sucré à une récompense ou, au contraire, à une punition renforce son pouvoir émotionnel. Le présenter simplement comme un aliment parmi d’autres, à certains moments plutôt qu’à volonté, aide à désamorcer cette charge.',
      'Pour un enfant suivi pour un surpoids ou un diabète, ces principes restent valables : l’objectif est une alimentation globalement équilibrée et des repères stables, pas une liste d’aliments strictement interdits qui isole l’enfant de ses camarades.',
    ],
  },
];

/** Du plus récent au plus ancien. Toute liste du site consomme cet ordre. */
export const ARTICLES_BY_DATE: Article[] = [...ARTICLES].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export function findArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
