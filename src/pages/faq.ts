import '../styles/main.css';
import { bootCommon } from '../lib/boot';
import { FAQ } from '../data/faq';
import { initAccordions } from '../lib/accordion';
import { auresSkyline } from '../lib/illustrations';
import { initIllustrationParallax } from '../lib/motion-extra';

bootCommon();

const heroArt = document.querySelector('[data-parallax]');
if (heroArt) heroArt.innerHTML = auresSkyline();

const CATEGORY_ORDER: Array<(typeof FAQ)[number]['category']> = ['Rendez-vous', 'Consultation', 'Pratique'];

function normalize(s: string): string {
  return s
    .toLocaleLowerCase('fr-FR')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

let query = '';

function renderFaq() {
  const el = document.getElementById('faq-groups');
  const empty = document.getElementById('faq-empty');
  const countEl = document.getElementById('faq-search-count');
  if (!el) return;

  const q = normalize(query.trim());
  const matches = (f: (typeof FAQ)[number]) =>
    !q || normalize(f.question).includes(q) || normalize(f.answer).includes(q);

  let totalShown = 0;

  el.innerHTML = CATEGORY_ORDER.map((cat) => {
    const items = FAQ.filter((f) => f.category === cat);
    const visibleItems = items.filter(matches);
    totalShown += visibleItems.length;
    if (!items.length) return '';
    return `
      <div data-accordion-group ${visibleItems.length ? '' : 'data-faq-hidden="true"'}>
        <h2 style="font-family:var(--font-display);font-size:1.2rem;margin-bottom:0.5rem;">${cat}</h2>
        <div>
          ${items
            .map(
              (f, i) => `
            <div class="accordion-item" data-open="false" ${matches(f) ? '' : 'data-faq-hidden="true"'}>
              <button class="accordion-trigger" type="button" aria-expanded="false" aria-controls="faq-panel-${cat}-${i}">
                <span>${f.question}</span>
                <span class="accordion-icon"></span>
              </button>
              <div class="accordion-panel" id="faq-panel-${cat}-${i}">
                <div>${f.answer}</div>
              </div>
            </div>`,
            )
            .join('')}
        </div>
      </div>`;
  }).join('');

  initAccordions();

  if (empty) empty.style.display = totalShown === 0 ? 'block' : 'none';
  if (countEl) {
    countEl.textContent = q
      ? `${totalShown} question${totalShown === 1 ? '' : 's'} sur ${FAQ.length} trouvée${totalShown === 1 ? '' : 's'}.`
      : '';
  }
}

function initSearch() {
  const input = document.getElementById('faq-search') as HTMLInputElement | null;
  if (!input) return;
  input.addEventListener('input', () => {
    query = input.value;
    renderFaq();
  });
}

renderFaq();
initSearch();
initIllustrationParallax('[data-parallax]');
