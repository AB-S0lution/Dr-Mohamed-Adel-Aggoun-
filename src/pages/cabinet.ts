import '../styles/main.css';
import { bootCommon } from '../lib/boot';
import { PROCESS_STEPS } from '../data/process';
import { initProcessPin } from '../lib/process-pin';

bootCommon();

function renderProcessSteps() {
  const el = document.getElementById('process-steps');
  if (!el) return;
  el.innerHTML = PROCESS_STEPS.map(
    (step, i) => `
    <div class="process-step" style="position:${i === 0 ? 'relative' : 'absolute'};inset:0;display:flex;flex-direction:column;gap:1rem;max-width:36rem;">
      <span style="font-family:var(--font-display);font-size:0.9rem;color:var(--accent);font-weight:600;">Étape ${step.index}</span>
      <h3 style="font-family:var(--font-display);font-size:clamp(1.4rem,2.6vw,1.9rem);">${step.title}</h3>
      <p class="text-muted">${step.description}</p>
    </div>`,
  ).join('');
  initProcessPin('#process-pin-wrap');
}

renderProcessSteps();
