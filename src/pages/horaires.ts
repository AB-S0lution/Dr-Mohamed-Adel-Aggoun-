import '../styles/main.css';
import { bootCommon } from '../lib/boot';
import { HOURS, HOURS_TODO_NOTE, getTodayHours, isOpenNow } from '../data/hours';

bootCommon();

function renderTable() {
  const table = document.getElementById('hours-table');
  if (!table) return;
  const today = getTodayHours();
  table.innerHTML = HOURS.map(
    (h) => `
    <tr style="border-bottom:1px solid var(--line);${h.isoIndex === today.isoIndex ? 'color:var(--accent);font-weight:600;' : ''}">
      <td style="padding:0.55rem 0;">${h.day}</td>
      <td style="padding:0.55rem 0;text-align:right;">${h.closed ? 'Fermé' : `${h.open} – ${h.close}`}</td>
    </tr>`,
  ).join('');

  const note = document.getElementById('hours-today-note');
  if (note) {
    note.textContent = isOpenNow()
      ? 'Le cabinet est actuellement ouvert.'
      : 'Le cabinet est actuellement fermé. Les horaires reprennent au prochain jour d’ouverture.';
  }

  const todo = document.getElementById('hours-todo-note');
  if (todo) todo.textContent = HOURS_TODO_NOTE;
}

renderTable();
