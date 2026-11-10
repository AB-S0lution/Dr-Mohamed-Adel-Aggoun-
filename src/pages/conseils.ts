import '../styles/main.css';
import { bootCommon } from '../lib/boot';
import { ARTICLES } from '../data/articles';

bootCommon();

const CATEGORIES = Array.from(new Set(ARTICLES.map((a) => a.category)));
let activeCategory: string | 'Toutes' = 'Toutes';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function renderFilters() {
  const el = document.getElementById('article-filters');
  if (!el) return;
  const options = ['Toutes', ...CATEGORIES];
  el.innerHTML = options
    .map(
      (cat) => `<button type="button" class="btn ${cat === activeCategory ? 'btn-pine' : 'btn-ghost'}" data-filter="${cat}" style="padding:0.55rem 1.1rem;font-size:0.85rem;">${cat}</button>`,
    )
    .join('');
  el.querySelectorAll<HTMLButtonElement>('button[data-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.filter as string;
      renderFilters();
      renderList();
    });
  });
}

function renderList() {
  const el = document.getElementById('articles-list');
  if (!el) return;
  const items = ARTICLES.filter((a) => activeCategory === 'Toutes' || a.category === activeCategory).sort(
    (a, b) => +new Date(b.date) - +new Date(a.date),
  );

  el.innerHTML = items
    .map(
      (a) => `
    <article class="card" data-reveal data-reveal-group="articles">
      <div style="display:flex;gap:0.6rem;align-items:center;font-size:0.78rem;color:var(--ink-muted);flex-wrap:wrap;">
        <span class="chip">${a.category}</span>
        <span>${formatDate(a.date)}</span>
        <span>${a.readTime} min de lecture</span>
      </div>
      <h2 style="font-family:var(--font-display);font-size:1.3rem;margin-top:0.9rem;">${a.title}</h2>
      <p class="text-muted" style="margin-top:0.6rem;">${a.excerpt}</p>
      <details style="margin-top:0.9rem;">
        <summary class="link-underline" style="cursor:pointer;font-weight:600;font-size:0.9rem;list-style:none;">Lire l’article complet</summary>
        <div class="container-prose" style="margin-top:1rem;padding-top:1rem;border-top:1px solid var(--line);display:flex;flex-direction:column;gap:0.85rem;">
          ${a.body.map((p) => `<p class="text-muted">${p}</p>`).join('')}
        </div>
      </details>
    </article>`,
    )
    .join('');
}

renderFilters();
renderList();
