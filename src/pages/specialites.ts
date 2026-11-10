import '../styles/main.css';
import { bootCommon } from '../lib/boot';
import { SPECIALTIES, type SpecialtyTag } from '../data/specialties';
import { icon } from '../lib/icons';

bootCommon();

const TAGS: SpecialtyTag[] = ['Adulte', 'Enfant', 'Suivi', 'Dépistage'];
let activeTag: SpecialtyTag | 'Toutes' = 'Toutes';

function renderFilters() {
  const el = document.getElementById('specialty-filters');
  if (!el) return;
  const options: Array<SpecialtyTag | 'Toutes'> = ['Toutes', ...TAGS];
  el.innerHTML = options
    .map(
      (tag) => `<button type="button" class="btn ${tag === activeTag ? 'btn-pine' : 'btn-ghost'}" data-filter="${tag}" style="padding:0.55rem 1.1rem;font-size:0.85rem;">${tag}</button>`,
    )
    .join('');
  el.querySelectorAll<HTMLButtonElement>('button[data-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeTag = btn.dataset.filter as SpecialtyTag | 'Toutes';
      renderFilters();
      renderList();
    });
  });
}

function renderList() {
  const el = document.getElementById('specialties-list');
  if (!el) return;
  const items = SPECIALTIES.filter((s) => activeTag === 'Toutes' || s.tag.includes(activeTag as SpecialtyTag));

  if (!items.length) {
    el.innerHTML = `<p class="text-muted" style="padding:2rem 0;">Aucune fiche pour ce filtre pour le moment.</p>`;
    return;
  }

  el.innerHTML = items
    .map(
      (s) => `
    <details class="card" id="${s.slug}" style="padding:1.5rem;">
      <summary style="display:flex;align-items:center;gap:1rem;cursor:pointer;list-style:none;">
        <span class="btn-icon-circle" style="width:2.3rem;height:2.3rem;background:var(--accent-soft);color:var(--c-terracotta-600);flex:none;">${icon(s.icon, 16)}</span>
        <span style="flex:1;">
          <span style="display:block;font-family:var(--font-display);font-size:1.15rem;font-weight:500;">${s.title}</span>
          <span class="text-muted" style="font-size:0.88rem;">${s.summary}</span>
        </span>
        <span style="display:flex;gap:0.35rem;flex-wrap:wrap;justify-content:flex-end;max-width:9rem;">
          ${s.tag.map((t) => `<span class="chip">${t}</span>`).join('')}
        </span>
        <span class="specialty-chevron" style="flex:none;">${icon('chevron', 16)}</span>
      </summary>
      <p class="text-muted" style="margin-top:1.1rem;padding-top:1.1rem;border-top:1px solid var(--line);">${s.detail}</p>
    </details>`,
    )
    .join('');
}

renderFilters();
renderList();

// Deep link support: if URL has a #slug, open that card and scroll to it.
const hash = window.location.hash.slice(1);
if (hash) {
  requestAnimationFrame(() => {
    const target = document.getElementById(hash);
    if (target instanceof HTMLDetailsElement) {
      target.open = true;
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}
