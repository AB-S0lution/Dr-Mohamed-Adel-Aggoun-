import '../styles/main.css';
import { bootCommon } from '../lib/boot';
import { FAQ } from '../data/faq';
import { initAccordions } from '../lib/accordion';

bootCommon();

const CATEGORY_ORDER: Array<(typeof FAQ)[number]['category']> = ['Rendez-vous', 'Consultation', 'Pratique'];

function renderFaq() {
  const el = document.getElementById('faq-groups');
  if (!el) return;

  el.innerHTML = CATEGORY_ORDER.map((cat) => {
    const items = FAQ.filter((f) => f.category === cat);
    if (!items.length) return '';
    return `
      <div data-accordion-group>
        <h2 style="font-family:var(--font-display);font-size:1.2rem;margin-bottom:0.5rem;">${cat}</h2>
        <div>
          ${items
            .map(
              (f, i) => `
            <div class="accordion-item" data-open="false">
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
}

renderFaq();
