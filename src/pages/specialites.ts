import '../styles/main.css';
import { bootCommon } from '../lib/boot';
import { SPECIALTIES, type SpecialtyTag } from '../data/specialties';
import { icon } from '../lib/icons';
import { cardMotif, equilibriumScene } from '../lib/illustrations';
import { computeBmi, validateBmiInputs, BMI_ERROR_MESSAGES, BMI_CATEGORIES, type BmiResult } from '../lib/bmi';
import { initIllustrationParallax } from '../lib/motion-extra';

bootCommon();

const heroArt = document.querySelector('[data-parallax]');
if (heroArt) heroArt.innerHTML = equilibriumScene();

const TAGS: SpecialtyTag[] = ['Adulte', 'Enfant', 'Suivi', 'Dépistage'];
let activeTag: SpecialtyTag | 'Toutes' = 'Toutes';

function renderFilters() {
  const el = document.getElementById('specialty-filters');
  if (!el) return;
  const options: Array<SpecialtyTag | 'Toutes'> = ['Toutes', ...TAGS];
  el.innerHTML = options
    .map(
      (tag) => `<button type="button" class="filter-chip" aria-pressed="${tag === activeTag}" data-filter="${tag}">${tag}</button>`,
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
      (s, i) => `
    <details class="card specialty-card" id="${s.slug}" style="padding:1.5rem;position:relative;overflow:hidden;" data-reveal data-reveal-group="speclist">
      ${cardMotif((i % 3) as 0 | 1 | 2)}
      <summary style="display:flex;align-items:center;gap:1rem;cursor:pointer;list-style:none;position:relative;">
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
      <div style="position:relative;margin-top:1.1rem;padding-top:1.1rem;border-top:1px solid var(--line);">
        <p class="text-muted">${s.detail}</p>
        <p style="font-size:0.82rem;font-weight:600;margin-top:1rem;color:var(--ink);">Motifs fréquents de consultation</p>
        <ul class="text-muted" style="margin-top:0.5rem;display:flex;flex-direction:column;gap:0.35rem;font-size:0.88rem;">
          ${s.signs.map((sign) => `<li style="display:flex;gap:0.5rem;"><span style="color:var(--accent);">—</span>${sign}</li>`).join('')}
        </ul>
      </div>
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

// ---------- Calculateur d'IMC ----------
// Outil informatif, calcul 100% local. Voir PLAN.md §4 : jamais présenté
// comme un diagnostic, disclaimer permanent affiché avec le résultat.
// Le repère de la jauge se déplace via transform (translateX en px, calculé
// à partir de la largeur réelle de la piste) plutôt que `left`, pour rester
// dans la règle transform/opacity uniquement.

function renderGaugeBands() {
  const bands = document.getElementById('bmi-gauge-bands');
  if (!bands) return;
  bands.innerHTML = BMI_CATEGORIES.map((c, i) => {
    const width = (c.gaugeTo - c.gaugeFrom) * 100;
    const opacity = 0.14 + i * 0.12;
    return `<span style="flex:0 0 ${width}%;background:var(--accent);opacity:${opacity.toFixed(2)};height:100%;display:block;" title="${c.label} (${c.range})"></span>`;
  }).join('');
}

function moveGaugeMarker(position: number) {
  const marker = document.getElementById('bmi-gauge-marker') as HTMLElement | null;
  const track = document.getElementById('bmi-gauge-bands') as HTMLElement | null;
  if (!marker || !track) return;
  const trackWidth = track.getBoundingClientRect().width;
  const markerWidth = marker.getBoundingClientRect().width || 14;
  const x = position * trackWidth - markerWidth / 2;
  marker.style.transform = `translateX(${Math.max(0, Math.min(trackWidth - markerWidth, x))}px)`;
}

function renderBmiGauge(result: BmiResult | null) {
  const value = document.getElementById('bmi-value');
  const category = document.getElementById('bmi-category');
  const resultBox = document.getElementById('bmi-result-box');
  if (!value || !category || !resultBox) return;

  if (!result) {
    resultBox.style.display = 'none';
    return;
  }
  resultBox.style.display = 'block';
  value.textContent = result.value.toFixed(1).replace('.', ',');
  category.textContent = `${result.category.label} (${result.category.range})`;
  // Give the layout a frame to settle before measuring the track width.
  requestAnimationFrame(() => moveGaugeMarker(result.gaugePosition));
}

function initBmiCalculator() {
  const form = document.getElementById('bmi-form') as HTMLFormElement | null;
  const errorEl = document.getElementById('bmi-error');
  if (!form || !errorEl) return;
  renderGaugeBands();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const heightCm = parseFloat(String(data.get('height')).replace(',', '.'));
    const weightKg = parseFloat(String(data.get('weight')).replace(',', '.'));

    const error = validateBmiInputs(heightCm, weightKg);
    if (error) {
      errorEl.textContent = BMI_ERROR_MESSAGES[error];
      errorEl.style.display = 'block';
      renderBmiGauge(null);
      return;
    }
    errorEl.style.display = 'none';
    const result = computeBmi(heightCm, weightKg);
    renderBmiGauge(result);
  });

  form.addEventListener('input', () => {
    if (errorEl.style.display === 'block') errorEl.style.display = 'none';
  });

  window.addEventListener('resize', () => {
    const resultBox = document.getElementById('bmi-result-box');
    if (resultBox && resultBox.style.display !== 'none') {
      const heightCm = parseFloat(String(new FormData(form).get('height')).replace(',', '.'));
      const weightKg = parseFloat(String(new FormData(form).get('weight')).replace(',', '.'));
      if (!validateBmiInputs(heightCm, weightKg)) moveGaugeMarker(computeBmi(heightCm, weightKg).gaugePosition);
    }
  });
}

initBmiCalculator();
initIllustrationParallax('[data-parallax]');
