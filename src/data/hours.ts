// Données vérifiées — horaires d'ouverture (PLAN.md §1, source MaWilaya,
// mise à jour 21 juin 2026). Ce ne sont pas des données fictives : ne pas
// modifier sans confirmation. Un second relevé (Addalile) indique un horaire
// différent le mardi (08:00–15:00) ; non retenu, signalé en TODO propriétaire.

export interface DayHours {
  day: string;
  short: string;
  isoIndex: number; // 0 = lundi ... 6 = dimanche
  open: string | null;
  close: string | null;
  closed: boolean;
}

export const HOURS: DayHours[] = [
  { day: 'Lundi', short: 'Lun', isoIndex: 0, open: '08:00', close: '15:30', closed: false },
  { day: 'Mardi', short: 'Mar', isoIndex: 1, open: '08:00', close: '15:30', closed: false },
  { day: 'Mercredi', short: 'Mer', isoIndex: 2, open: '08:00', close: '15:30', closed: false },
  { day: 'Jeudi', short: 'Jeu', isoIndex: 3, open: '08:00', close: '13:00', closed: false },
  { day: 'Vendredi', short: 'Ven', isoIndex: 4, open: null, close: null, closed: true },
  { day: 'Samedi', short: 'Sam', isoIndex: 5, open: '08:00', close: '15:30', closed: false },
  { day: 'Dimanche', short: 'Dim', isoIndex: 6, open: '08:00', close: '15:30', closed: false },
];

export const HOURS_TODO_NOTE =
  'À confirmer avec le praticien : un second annuaire indique un horaire différent le mardi (08:00–15:00). Le site affiche l’horaire de la source la plus directement vérifiée (samedi à mercredi 08:00–15:30, jeudi 08:00–13:00, vendredi fermé).';

export function getTodayHours(): DayHours {
  const jsDay = new Date().getDay(); // 0 = dimanche in JS
  const isoIndex = jsDay === 0 ? 6 : jsDay - 1;
  return HOURS.find((h) => h.isoIndex === isoIndex) ?? HOURS[0];
}

export function isOpenNow(): boolean {
  const today = getTodayHours();
  if (today.closed || !today.open || !today.close) return false;
  const now = new Date();
  const [oh, om] = today.open.split(':').map(Number);
  const [ch, cm] = today.close.split(':').map(Number);
  const minutesNow = now.getHours() * 60 + now.getMinutes();
  return minutesNow >= oh * 60 + om && minutesNow <= ch * 60 + cm;
}
