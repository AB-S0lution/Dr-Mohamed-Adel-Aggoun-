import { getTodayHours, isOpenNow } from '../../data/hours';

/**
 * « Ouvert maintenant » calculé côté client sur les horaires vérifiés.
 * Rien d'inventé : si le jour est fermé, on le dit, et on annonce la
 * tranche du jour plutôt qu'une promesse de disponibilité.
 */
export function StatusPill() {
  const today = getTodayHours();
  const open = isOpenNow();

  const label = open
    ? `Ouvert maintenant, jusqu'à ${today.close}`
    : today.closed
      ? `Fermé aujourd'hui (${today.day})`
      : `Fermé, ouvre à ${today.open}`;

  return (
    <span className={`status-pill ${open ? 'status-pill--open' : 'status-pill--closed'}`}>
      <span className="status-pill__dot" aria-hidden="true" />
      <span className="tnum">{label}</span>
    </span>
  );
}
