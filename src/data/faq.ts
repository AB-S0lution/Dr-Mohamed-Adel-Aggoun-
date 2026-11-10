// Données d'exemple (sample data) : questions fréquentes pratiques. Pas de
// prix ni d'information médicale individualisée. Voir PLAN.md §4 et §5.

export interface FaqItem {
  question: string;
  answer: string;
  category: 'Rendez-vous' | 'Consultation' | 'Pratique';
}

export const FAQ: FaqItem[] = [
  {
    category: 'Rendez-vous',
    question: 'Comment demander un rendez-vous ?',
    answer:
      'Depuis la page Contact, vous pouvez appeler directement le cabinet, envoyer un message WhatsApp pré-rempli ou envoyer un e-mail. Il ne s’agit pas d’une prise de rendez-vous instantanée : le cabinet vous recontacte pour confirmer un horaire.',
  },
  {
    category: 'Rendez-vous',
    question: 'Peut-on prendre rendez-vous en ligne, directement sur le site ?',
    answer:
      'Non. Ce site ne propose pas de réservation en ligne automatisée. Les formulaires ouvrent un message prêt à envoyer par WhatsApp ou par e-mail, auquel le cabinet répond pour fixer l’horaire.',
  },
  {
    category: 'Rendez-vous',
    question: 'Quel est le délai habituel pour obtenir un rendez-vous ?',
    answer:
      'Le délai dépend du jour et de l’affluence du moment. Le plus simple reste d’appeler le cabinet pour connaître les disponibilités actuelles.',
  },
  {
    category: 'Consultation',
    question: 'Faut-il être à jeun pour la consultation ?',
    answer:
      'Cela dépend du bilan prévu. Si une prise de sang à jeun est nécessaire, le cabinet vous l’indique au préalable. En l’absence de consigne particulière, il n’est pas nécessaire d’être à jeun pour une consultation standard.',
  },
  {
    category: 'Consultation',
    question: 'Que faut-il apporter le jour de la consultation ?',
    answer:
      'Votre carnet de suivi ou carnet de santé, vos derniers résultats d’analyses, la liste de vos traitements en cours (ou les boîtes de médicaments) et, si vous en possédez, votre lecteur de glycémie ou son carnet de relevés.',
  },
  {
    category: 'Consultation',
    question: 'La consultation est-elle adaptée aux enfants ?',
    answer:
      'Les questions de croissance, de puberté et certains troubles hormonaux de l’enfant entrent dans le champ de l’endocrinologie. Les parents sont invités à apporter le carnet de santé avec les courbes de croissance.',
  },
  {
    category: 'Consultation',
    question: 'Peut-on consulter pendant la grossesse ?',
    answer:
      'Oui, en particulier en cas de diabète gestationnel ou de trouble thyroïdien connu pendant la grossesse. Le suivi se fait en lien avec le médecin ou la sage-femme qui suit la grossesse.',
  },
  {
    category: 'Pratique',
    question: 'Le cabinet accepte-t-il la carte CNAS ou une prise en charge de sécurité sociale ?',
    answer:
      'Cette information n’a pas encore été confirmée par le cabinet pour ce site de démonstration. Merci de vous renseigner directement par téléphone.',
  },
  {
    category: 'Pratique',
    question: 'Quelles langues sont parlées au cabinet ?',
    answer:
      'La consultation se déroule en français et en arabe. D’autres précisions seront ajoutées après confirmation du praticien.',
  },
  {
    category: 'Pratique',
    question: 'Où se trouve exactement le cabinet ?',
    answer:
      'Route de Tazoult, à côté de la mosquée Omar Ibn Al-Aas, à Tazoult (wilaya de Batna). Un plan et un lien d’itinéraire sont disponibles sur la page Horaires et accès.',
  },
  {
    category: 'Pratique',
    question: 'Le cabinet est-il accessible aux personnes à mobilité réduite ?',
    answer:
      'Cette information n’a pas encore été confirmée. Nous vous recommandons de contacter directement le cabinet avant votre venue si ce point est important pour vous.',
  },
  {
    category: 'Rendez-vous',
    question: 'Que faire en cas d’urgence (hypoglycémie sévère, malaise) ?',
    answer:
      'Ce cabinet assure des consultations programmées, pas une prise en charge des urgences. En cas de malaise sévère ou de signe d’urgence, contactez immédiatement les services d’urgence ou rendez-vous à la structure hospitalière la plus proche.',
  },
  {
    category: 'Rendez-vous',
    question: 'Peut-on annuler ou déplacer un rendez-vous ?',
    answer:
      'Oui, en prévenant le cabinet par téléphone ou WhatsApp dès que possible, afin que le créneau puisse être proposé à un autre patient.',
  },
  {
    category: 'Pratique',
    question: 'Combien de temps dure une consultation ?',
    answer:
      'La durée varie selon le motif : une première consultation, plus complète, prend généralement plus de temps qu’une consultation de suivi. Un temps suffisant est réservé pour répondre à vos questions.',
  },
  {
    category: 'Consultation',
    question: 'Faut-il une ordonnance ou un document médical pour venir une première fois ?',
    answer:
      'Non, aucune ordonnance n’est nécessaire pour une première consultation. En revanche, si un autre médecin vous a orienté, pensez à apporter son compte-rendu ou sa lettre, ainsi que vos derniers résultats d’analyses si vous en avez.',
  },
  {
    category: 'Pratique',
    question: 'Le calculateur d’IMC du site remplace-t-il un avis médical ?',
    answer:
      'Non. Le calculateur d’IMC est un outil purement informatif, basé sur une formule générale. Il ne tient pas compte de votre situation individuelle (masse musculaire, morphologie, grossesse, âge) et ne remplace en aucun cas un avis médical personnalisé.',
  },
  {
    category: 'Rendez-vous',
    question: 'Le questionnaire de pré-consultation est-il transmis automatiquement au cabinet ?',
    answer:
      'Non. Ce questionnaire reste sur votre appareil pendant que vous le remplissez. À la fin, il prépare un message récapitulatif que vous choisissez vous-même d’envoyer, ou non, par WhatsApp ou par e-mail. Rien n’est transmis sans cette action de votre part.',
  },
  {
    category: 'Pratique',
    question: 'Qu’est-ce que l’« Espace patient » annoncé sur le site ?',
    answer:
      'Il s’agit d’un aperçu d’une fonctionnalité à venir, présentée uniquement à titre de démonstration. Elle n’est pas active aujourd’hui et aucune connexion ou donnée personnelle n’y est traitée pour le moment.',
  },
  {
    category: 'Rendez-vous',
    question: 'Puis-je choisir une date et un horaire précis directement sur le site ?',
    answer:
      'Vous pouvez indiquer une date et un créneau souhaités sur la page Contact, à titre indicatif. Il ne s’agit pas d’une réservation automatique : le cabinet vous recontacte pour confirmer si ce créneau est disponible, ou vous en proposer un autre.',
  },
];
