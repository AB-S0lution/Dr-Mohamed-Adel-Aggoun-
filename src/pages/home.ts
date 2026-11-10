import '../styles/main.css';
import { bootCommon } from '../lib/boot';
import { SITE } from '../data/site';
import { getTodayHours, isOpenNow } from '../data/hours';
import { SPECIALTIES } from '../data/specialties';
import { icon } from '../lib/icons';

bootCommon();

function renderQuickInfo() {
  const el = document.getElementById('quick-info-grid');
  if (!el) return;
  const today = getTodayHours();
  const open = isOpenNow();
  const hoursText = today.closed
    ? 'Fermé aujourd’hui'
    : `Aujourd’hui ${today.open} – ${today.close}`;

  el.innerHTML = `
    <div class="card" data-reveal data-reveal-group="quickinfo" style="display:flex;align-items:center;gap:1rem;">
      <span class="btn-icon-circle" style="width:2.6rem;height:2.6rem;background:var(--accent-soft);color:var(--c-terracotta-600);">${icon('clock', 18)}</span>
      <div>
        <p style="font-weight:600;">${hoursText}</p>
        <p class="text-muted" style="font-size:0.85rem;">${open ? 'Cabinet actuellement ouvert' : 'Cabinet actuellement fermé'}</p>
      </div>
    </div>
    <div class="card" data-reveal data-reveal-group="quickinfo" style="display:flex;align-items:center;gap:1rem;">
      <span class="btn-icon-circle" style="width:2.6rem;height:2.6rem;background:var(--accent-soft);color:var(--c-terracotta-600);">${icon('phone', 18)}</span>
      <div>
        <p style="font-weight:600;">${SITE.mobileDisplay}</p>
        <a class="text-muted link-underline" style="font-size:0.85rem;" href="${SITE.mobileHref}">Appeler le cabinet</a>
      </div>
    </div>
    <div class="card" data-reveal data-reveal-group="quickinfo" style="display:flex;align-items:center;gap:1rem;">
      <span class="btn-icon-circle" style="width:2.6rem;height:2.6rem;background:var(--accent-soft);color:var(--c-terracotta-600);">${icon('whatsapp', 18)}</span>
      <div>
        <p style="font-weight:600;">WhatsApp</p>
        <a class="text-muted link-underline" style="font-size:0.85rem;" href="${SITE.whatsappHref}">Écrire un message</a>
      </div>
    </div>
  `;
}

function renderSpecialtyHighlights() {
  const el = document.getElementById('home-specialties-grid');
  if (!el) return;
  const picks = SPECIALTIES.filter((s) =>
    ['diabete-type-2', 'thyroide-nodules', 'obesite-surpoids', 'croissance-enfant'].includes(s.slug),
  );
  el.innerHTML = picks
    .map(
      (s) => `
    <a class="card" data-reveal data-reveal-group="spec" href="specialites.html#${s.slug}" style="display:flex;flex-direction:column;gap:0.9rem;transition:transform var(--dur-ui) var(--ease-out), border-color var(--dur-ui) var(--ease-out);">
      <span class="btn-icon-circle" style="width:2.4rem;height:2.4rem;background:var(--accent-soft);color:var(--c-terracotta-600);">${icon(s.icon, 17)}</span>
      <h3 style="font-family:var(--font-display);font-size:1.15rem;font-weight:500;">${s.title}</h3>
      <p class="text-muted" style="font-size:0.9rem;">${s.summary}</p>
    </a>`,
    )
    .join('');
}

renderQuickInfo();
renderSpecialtyHighlights();
