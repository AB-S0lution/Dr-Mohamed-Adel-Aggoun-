// Sélecteur de date/créneau pour la demande de rendez-vous — interface
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
  slots.push({ key: 'matin', label: `Matin (${hours.open} – ${closeHour > 13 ? '13:00' : hours.close})` });
  if (closeHour > 13) {
    slots.push({ key: 'apres-midi', label: `Après-midi (13:00 – ${hours.close})` });
  }
  return slots;
}

export interface SchedulerState {
  selectedIso: string | null;
  selectedSlotKey: SlotOption['key'] | null;
}

export interface SchedulerHandles {
  getLabels(): { dateLabel: string | null; slotLabel: string | null };
}

/**
 * Monte le sélecteur de date/créneau dans le conteneur donné. Dégrade sans
 * aucune animation en cas de prefers-reduced-motion : seules les transitions
 * de couleur/opacité (rapides) restent, jamais de translation.
 */
export function initDatePicker(containerSelector: string): SchedulerHandles {
  const root = document.querySelector<HTMLElement>(containerSelector);
  const state: SchedulerState = { selectedIso: null, selectedSlotKey: null };
  if (!root) {
    return { getLabels: () => ({ dateLabel: null, slotLabel: null }) };
  }

  const days = buildUpcomingDays();
  const dayTrack = root.querySelector<HTMLElement>('[data-day-track]');
  const slotTrack = root.querySelector<HTMLElement>('[data-slot-track]');
  const summary = root.querySelector<HTMLElement>('[data-scheduler-summary]');

  function renderDays() {
    if (!dayTrack) return;
    dayTrack.innerHTML = days
      .map(
        (d) => `
      <button type="button" class="day-chip" data-day="${d.iso}" ${d.disabled ? 'disabled aria-disabled="true"' : ''} aria-pressed="${state.selectedIso === d.iso}">
        <span class="day-chip__dow">${d.shortLabel.split(' ')[0].replace('.', '')}</span>
        <span class="day-chip__num">${d.shortLabel.split(' ')[1]}</span>
        ${d.disabled ? '<span class="day-chip__closed">Fermé</span>' : ''}
      </button>`,
      )
      .join('');
    dayTrack.querySelectorAll<HTMLButtonElement>('button[data-day]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const iso = btn.dataset.day!;
        state.selectedIso = iso;
        state.selectedSlotKey = null;
        renderDays();
        renderSlots();
        renderSummary();
      });
    });
  }

  function renderSlots() {
    if (!slotTrack) return;
    const day = days.find((d) => d.iso === state.selectedIso);
    if (!day) {
      slotTrack.innerHTML = `<p class="text-muted" style="font-size:0.85rem;">Choisissez d’abord une date.</p>`;
      return;
    }
    const slots = slotsForDay(day.hours);
    if (!slots.length) {
      slotTrack.innerHTML = `<p class="text-muted" style="font-size:0.85rem;">Aucun créneau ce jour-là.</p>`;
      return;
    }
    slotTrack.innerHTML = slots
      .map(
        (s) =>
          `<button type="button" class="slot-chip" data-slot="${s.key}" aria-pressed="${state.selectedSlotKey === s.key}">${s.label}</button>`,
      )
      .join('');
    slotTrack.querySelectorAll<HTMLButtonElement>('button[data-slot]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.selectedSlotKey = btn.dataset.slot as SlotOption['key'];
        renderSlots();
        renderSummary();
      });
    });
  }

  function renderSummary() {
    if (!summary) return;
    const day = days.find((d) => d.iso === state.selectedIso);
    if (!day) {
      summary.textContent = 'Aucune date sélectionnée pour le moment.';
      return;
    }
    const slot = slotsForDay(day.hours).find((s) => s.key === state.selectedSlotKey);
    summary.textContent = slot
      ? `Souhait : ${day.fullLabel}, ${slot.label} — à confirmer par le cabinet.`
      : `${day.fullLabel} sélectionné — choisissez un créneau.`;
  }

  renderDays();
  renderSlots();
  renderSummary();

  return {
    getLabels() {
      const day = days.find((d) => d.iso === state.selectedIso);
      if (!day) return { dateLabel: null, slotLabel: null };
      const slot = slotsForDay(day.hours).find((s) => s.key === state.selectedSlotKey);
      return {
        dateLabel: day.fullLabel,
        slotLabel: slot ? slot.label : null,
      };
    },
  };
}
