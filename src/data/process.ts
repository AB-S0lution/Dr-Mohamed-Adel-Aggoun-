// Données d'exemple (sample data) — déroulement d'une consultation,
// présenté de façon générique et informative. Voir PLAN.md §5.

export interface ProcessStep {
  index: number;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    index: 1,
    title: 'Accueil et motif de consultation',
    description:
      'Vous exposez le motif de votre visite : suivi habituel, nouveau symptôme, ou orientation par un autre médecin. Vos documents (carnet, résultats, traitements) sont consultés.',
  },
  {
    index: 2,
    title: 'Entretien et examen clinique',
    description:
      'Un entretien détaillé sur vos antécédents, votre mode de vie et vos traitements précède un examen clinique ciblé selon le motif de la consultation.',
  },
  {
    index: 3,
    title: 'Analyse et explication',
    description:
      'Les résultats disponibles sont analysés et expliqués en termes clairs. Si des examens complémentaires sont utiles, ils sont proposés et justifiés.',
  },
  {
    index: 4,
    title: 'Décision partagée et traitement',
    description:
      'Les options sont discutées ensemble avant toute décision de traitement ou d’ajustement, en tenant compte de votre quotidien et de vos contraintes.',
  },
  {
    index: 5,
    title: 'Suivi et prochain rendez-vous',
    description:
      'Un rythme de suivi est proposé selon votre situation. Les consignes pratiques (quand consulter en urgence, quels signes surveiller) sont rappelées avant de partir.',
  },
];
