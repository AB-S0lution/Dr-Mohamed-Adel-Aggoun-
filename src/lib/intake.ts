// Questionnaire de pré-consultation — démonstration client uniquement :
// rien n'est transmis au cabinet pendant la saisie, aucune donnée n'est
// stockée côté serveur (il n'y a pas de serveur). À la fin, la personne
// choisit elle-même d'ouvrir un message WhatsApp ou e-mail pré-rempli avec
// le récapitulatif. Ce n'est ni une téléconsultation ni un diagnostic :
// voir PLAN.md §4. Transitions via WAAPI (Element.animate), désactivées
// sous prefers-reduced-motion — pas besoin de GSAP pour une simple
// traversée d'étapes locale, non liée au défilement.

import { buildMailtoUrlRaw, buildWhatsappUrlRaw } from './contact-links';
import { SITE } from '../data/site';

interface IntakeState {
  step: number;
  motif: string | null;
  signals: Set<string>;
  hasRecords: boolean | null;
  isFirstVisit: boolean | null;
}

const MOTIFS = [
  'Suivi de diabète',
  'Bilan thyroïdien',
  'Question de poids ou de métabolisme',
  'Croissance ou puberté (enfant)',
  'Autre motif',
];

const SIGNALS = [
  'Fatigue inhabituelle',
  'Soif ou besoin d’uriner plus fréquent',
  'Changement de poids récent',
  'Palpitations ou nervosité',
  'Grossesse en cours',
  'Déjà sous traitement pour ce motif',
  'Allergie médicamenteuse connue',
];

const TOTAL_STEPS = 4;

function reduceMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function initIntakeWizard(rootSelector: string) {
  const root = document.querySelector<HTMLElement>(rootSelector);
  if (!root) return;

  const state: IntakeState = { step: 0, motif: null, signals: new Set(), hasRecords: null, isFirstVisit: null };
  const panel = root.querySelector<HTMLElement>('[data-intake-panel]');
  const dotsWrap = root.querySelector<HTMLElement>('[data-intake-dots]');
  const prevBtn = root.querySelector<HTMLButtonElement>('[data-intake-prev]');
  const nextBtn = root.querySelector<HTMLButtonElement>('[data-intake-next]');
  if (!panel || !prevBtn || !nextBtn) return;

  function renderDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = Array.from({ length: TOTAL_STEPS })
      .map((_, i) => `<span class="wizard-dot" data-active="${i === state.step}"></span>`)
      .join('');
  }

  function canAdvance(): boolean {
    if (state.step === 0) return Boolean(state.motif);
    return true;
  }

  function stepMarkup(): string {
    if (state.step === 0) {
      return `
        <p class="chip">Étape 1 sur ${TOTAL_STEPS}</p>
        <h3 style="font-family:var(--font-display);font-size:1.2rem;margin-top:0.75rem;">Quel est le motif principal ?</h3>
        <div style="display:flex;flex-direction:column;gap:0.6rem;margin-top:1.1rem;" role="radiogroup" aria-label="Motif principal">
          ${MOTIFS.map(
            (m) => `
            <label class="intake-option">
              <input type="radio" name="intake-motif" value="${m}" ${state.motif === m ? 'checked' : ''} />
              <span>${m}</span>
            </label>`,
          ).join('')}
        </div>`;
    }
    if (state.step === 1) {
      return `
        <p class="chip">Étape 2 sur ${TOTAL_STEPS}</p>
        <h3 style="font-family:var(--font-display);font-size:1.2rem;margin-top:0.75rem;">Des éléments à signaler ? <span class="text-muted" style="font-weight:400;font-size:0.85rem;">(facultatif)</span></h3>
        <div style="display:flex;flex-direction:column;gap:0.6rem;margin-top:1.1rem;">
          ${SIGNALS.map(
            (s) => `
            <label class="intake-option">
              <input type="checkbox" name="intake-signal" value="${s}" ${state.signals.has(s) ? 'checked' : ''} />
              <span>${s}</span>
            </label>`,
          ).join('')}
        </div>`;
    }
    if (state.step === 2) {
      return `
        <p class="chip">Étape 3 sur ${TOTAL_STEPS}</p>
        <h3 style="font-family:var(--font-display);font-size:1.2rem;margin-top:0.75rem;">Deux questions pratiques <span class="text-muted" style="font-weight:400;font-size:0.85rem;">(facultatif)</span></h3>
        <div style="display:flex;flex-direction:column;gap:1.25rem;margin-top:1.1rem;">
          <div>
            <p style="font-size:0.9rem;font-weight:600;margin-bottom:0.5rem;">Avez-vous un carnet de suivi ou des résultats récents ?</p>
            <div style="display:flex;gap:0.6rem;">
              <label class="intake-pill"><input type="radio" name="intake-records" value="oui" ${state.hasRecords === true ? 'checked' : ''} /><span>Oui</span></label>
              <label class="intake-pill"><input type="radio" name="intake-records" value="non" ${state.hasRecords === false ? 'checked' : ''} /><span>Non</span></label>
            </div>
          </div>
          <div>
            <p style="font-size:0.9rem;font-weight:600;margin-bottom:0.5rem;">Est-ce une première consultation pour ce motif ?</p>
            <div style="display:flex;gap:0.6rem;">
              <label class="intake-pill"><input type="radio" name="intake-first" value="oui" ${state.isFirstVisit === true ? 'checked' : ''} /><span>Oui</span></label>
              <label class="intake-pill"><input type="radio" name="intake-first" value="non" ${state.isFirstVisit === false ? 'checked' : ''} /><span>Non</span></label>
            </div>
          </div>
        </div>`;
    }
    // Récapitulatif
    const signalsText = state.signals.size ? Array.from(state.signals).join(', ') : 'Aucun signalé';
    return `
      <p class="chip">Récapitulatif</p>
      <h3 style="font-family:var(--font-display);font-size:1.2rem;margin-top:0.75rem;">Prêt à préparer votre venue</h3>
      <ul class="text-muted" style="margin-top:1rem;display:flex;flex-direction:column;gap:0.45rem;font-size:0.92rem;">
        <li><strong style="color:var(--ink);">Motif :</strong> ${state.motif ?? 'non précisé'}</li>
        <li><strong style="color:var(--ink);">Éléments signalés :</strong> ${signalsText}</li>
        <li><strong style="color:var(--ink);">Carnet / résultats disponibles :</strong> ${state.hasRecords === null ? 'non précisé' : state.hasRecords ? 'Oui' : 'Non'}</li>
        <li><strong style="color:var(--ink);">Première consultation pour ce motif :</strong> ${state.isFirstVisit === null ? 'non précisé' : state.isFirstVisit ? 'Oui' : 'Non'}</li>
      </ul>
      <p class="text-muted" style="margin-top:1rem;font-size:0.82rem;">Ce questionnaire ne constitue pas une consultation ni un diagnostic. Il aide seulement à préparer l’échange avec le cabinet, qui reste seul juge de la prise en charge.</p>
      <div style="display:flex;flex-wrap:wrap;gap:0.75rem;margin-top:1.25rem;">
        <button type="button" class="btn btn-primary" data-intake-send="whatsapp">Envoyer ce récapitulatif sur WhatsApp</button>
        <button type="button" class="btn btn-ghost" data-intake-send="mail">Envoyer par e-mail</button>
      </div>`;
  }

  function bindStepInputs() {
    panel!.querySelectorAll<HTMLInputElement>('input[name="intake-motif"]').forEach((input) => {
      input.addEventListener('change', () => {
        state.motif = input.value;
        updateNextState();
      });
    });
    panel!.querySelectorAll<HTMLInputElement>('input[name="intake-signal"]').forEach((input) => {
      input.addEventListener('change', () => {
        if (input.checked) state.signals.add(input.value);
        else state.signals.delete(input.value);
      });
    });
    panel!.querySelectorAll<HTMLInputElement>('input[name="intake-records"]').forEach((input) => {
      input.addEventListener('change', () => {
        state.hasRecords = input.value === 'oui';
      });
    });
    panel!.querySelectorAll<HTMLInputElement>('input[name="intake-first"]').forEach((input) => {
      input.addEventListener('change', () => {
        state.isFirstVisit = input.value === 'oui';
      });
    });
    panel!.querySelectorAll<HTMLButtonElement>('button[data-intake-send]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const signalsText = state.signals.size ? Array.from(state.signals).join(', ') : 'Aucun signalé';
        const lines = [
          `Fiche de pré-consultation — ${SITE.brandName}`,
          `Motif : ${state.motif ?? 'non précisé'}`,
          `Éléments signalés : ${signalsText}`,
          `Carnet / résultats disponibles : ${state.hasRecords === null ? 'non précisé' : state.hasRecords ? 'Oui' : 'Non'}`,
          `Première consultation pour ce motif : ${state.isFirstVisit === null ? 'non précisé' : state.isFirstVisit ? 'Oui' : 'Non'}`,
          '',
          '(Fiche informative préparée par la personne elle-même — ne remplace pas une consultation.)',
        ];
        const message = lines.join('\n');
        window.location.href =
          btn.dataset.intakeSend === 'mail'
            ? buildMailtoUrlRaw(`Fiche de pré-consultation — ${state.motif ?? 'Patient'}`, message)
            : buildWhatsappUrlRaw(message);
      });
    });
  }

  function updateNextState() {
    const isLast = state.step === TOTAL_STEPS - 1;
    nextBtn!.hidden = isLast;
    nextBtn!.disabled = !canAdvance();
    prevBtn!.hidden = state.step === 0;
  }

  function render(direction: 1 | -1 | 0 = 0) {
    const previousHeight = panel!.offsetHeight;
    panel!.innerHTML = stepMarkup();
    bindStepInputs();
    renderDots();
    updateNextState();

    if (!reduceMotion() && direction !== 0 && 'animate' in panel!) {
      const dx = direction === 1 ? 18 : -18;
      panel!.animate(
        [
          { opacity: 0, transform: `translateX(${dx}px)` },
          { opacity: 1, transform: 'translateX(0)' },
        ],
        { duration: 240, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', fill: 'both' },
      );
    }
    void previousHeight;
  }

  prevBtn.addEventListener('click', () => {
    if (state.step === 0) return;
    state.step -= 1;
    render(-1);
  });
  nextBtn.addEventListener('click', () => {
    if (!canAdvance() || state.step >= TOTAL_STEPS - 1) return;
    state.step += 1;
    render(1);
  });

  render(0);
}
