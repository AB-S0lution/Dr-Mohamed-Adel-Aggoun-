// Sélecteur de date/créneau pour la demande de rendez-vous : interface
// interactive, mais purement indicative : aucune disponibilité réelle n'est
// vérifiée (site statique, sans backend). Le choix de la personne est inséré
// dans le message WhatsApp/e-mail pré-rempli, avec la mention explicite
// « à confirmer » déjà portée par contact-links.ts. Voir PLAN.md §4.

import { HOURS, type DayHours } from '../data/hours';

export interface SlotOption {
  key: 'matin' | 'apres-midi';
  label: string;
}

const DAY_LABEL_FORMAT = new Intl.DateTimeFormat('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
const FULL_DAY_LABEL_FORMAT = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

export interface DayOption {
  iso: string;
  shortLabel: string;
  fullLabel: string;
  hours: DayHours;
  disabled: boolean;
}

/** Les 14 prochains jours (aujourd'hui inclus), avec leurs horaires et leur disponibilité. */
export function buildUpcomingDays(count = 14, from: Date = new Date()): DayOption[] {
  const out: DayOption[] = [];
  for (let i = 0; i < count; i++) {
    const d = new Date(from);
    d.setDate(from.getDate() + i);
    const jsDay = d.getDay();
    const isoIndex = jsDay === 0 ? 6 : jsDay - 1;
    const hours = HOURS.find((h) => h.isoIndex === isoIndex) ?? HOURS[0];
    out.push({
      iso: d.toISOString().slice(0, 10),
      shortLabel: DAY_LABEL_FORMAT.format(d),
      fullLabel: FULL_DAY_LABEL_FORMAT.format(d),
      hours,
      disabled: hours.closed,
    });
  }
  return out;
}

/** Créneaux disponibles pour un jour donné, déduits de ses horaires d'ouverture. */
export function slotsForDay(hours: DayHours): SlotOption[] {
  if (hours.closed || !hours.open || !hours.close) return [];
  const slots: SlotOption[] = [];
  const closeHour = Number(hours.close.split(':')[0]);
  slots.push({ key: 'matin', label: `Matin, ${hours.open} à ${closeHour > 13 ? '13:00' : hours.close}` });
  if (closeHour > 13) {
    slots.push({ key: 'apres-midi', label: `Après-midi, 13:00 à ${hours.close}` });
  }
  return slots;
}
