// Pied de page partagé par toutes les pages — rendu une seule fois depuis
// les données typées (évite de dupliquer dix fois les mêmes informations en
// dur dans chaque fichier HTML).
import { SITE, SITE_STATUS_NOTICE } from '../data/site';
import { HOURS } from '../data/hours';
import { icon } from '../lib/icons';

export function renderFooter() {
  const el = document.getElementById('site-footer');
  if (!el) return;

  const hoursRows = HOURS.map(
    (h) => `<li style="display:flex;justify-content:space-between;gap:1rem;padding:0.25rem 0;"><span>${h.day}</span><span>${h.closed ? 'Fermé' : `${h.open} – ${h.close}`}</span></li>`,
  ).join('');

  el.innerHTML = `
    <div class="shell" style="padding-top:4.5rem;padding-bottom:2.5rem;">
      <div class="footer-grid">
        <div style="max-width:30ch;">
          <div class="brand" style="margin-bottom:1rem;">
            <svg class="brand__mark" viewBox="0 0 34 34" fill="none"><circle cx="17" cy="17" r="15.5" stroke="currentColor" stroke-width="1.2" opacity="0.4"/><path d="M6 20c2.6 0 2.6-7.5 5.2-7.5s2.1 8.5 4.7 8.5 2.6-7.5 5.2-7.5 2.1 6.5 3.7 6.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
            Cabinet Saha
          </div>
          <p style="font-size:0.9rem;opacity:0.82;">${SITE.practitioner}. ${SITE.specialtyFull}.</p>
        </div>

        <div class="footer-cols">
          <div>
            <p style="font-weight:600;margin-bottom:0.9rem;font-size:0.9rem;">Navigation</p>
            <ul style="display:flex;flex-direction:column;gap:0.55rem;font-size:0.9rem;">
              <li><a href="./">Accueil</a></li>
              <li><a href="le-cabinet.html">Le Cabinet</a></li>
              <li><a href="specialites.html">Spécialités</a></li>
              <li><a href="conseils-sante.html">Conseils santé</a></li>
              <li><a href="faq.html">FAQ</a></li>
              <li><a href="horaires-acces.html">Horaires &amp; Accès</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
          <div>
            <p style="font-weight:600;margin-bottom:0.9rem;font-size:0.9rem;">Contact</p>
            <ul style="display:flex;flex-direction:column;gap:0.6rem;font-size:0.9rem;">
              <li><a href="${SITE.mobileHref}" style="display:flex;gap:0.5rem;align-items:center;">${icon('phone', 15)} ${SITE.mobileDisplay}</a></li>
              <li><a href="${SITE.whatsappHref}" style="display:flex;gap:0.5rem;align-items:center;">${icon('whatsapp', 15)} WhatsApp</a></li>
              <li><a href="${SITE.emailHref}" style="display:flex;gap:0.5rem;align-items:center;">${icon('mail', 15)} ${SITE.email}</a></li>
              <li><a href="${SITE.mapsHref}" style="display:flex;gap:0.5rem;align-items:center;">${icon('pin', 15)} ${SITE.addressLine}</a></li>
            </ul>
          </div>
        </div>

        <div>
          <p style="font-weight:600;margin-bottom:0.9rem;font-size:0.9rem;">Horaires</p>
          <ul style="font-size:0.85rem;opacity:0.85;max-width:22rem;">${hoursRows}</ul>
        </div>
      </div>

      <div style="margin-top:3rem;padding:1rem 1.25rem;border-radius:var(--radius-field);background:color-mix(in oklab, var(--surface-pine-ink) 10%, transparent);font-size:0.82rem;line-height:1.55;opacity:0.9;">
        ${SITE_STATUS_NOTICE}
      </div>

      <div style="margin-top:2rem;display:flex;flex-wrap:wrap;gap:1rem;justify-content:space-between;align-items:center;border-top:1px solid color-mix(in oklab, var(--surface-pine-ink) 18%, transparent);padding-top:1.5rem;font-size:0.82rem;opacity:0.8;">
        <p>© <span id="footer-year"></span> Cabinet Saha. Site de démonstration, tous droits réservés au praticien.</p>
        <div style="display:flex;gap:1.25rem;">
          <a href="mentions-legales.html">Mentions légales</a>
          <a href="confidentialite.html">Confidentialité</a>
        </div>
      </div>
    </div>
  `;
}
