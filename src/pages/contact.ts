import '../styles/main.css';
import { bootCommon } from '../lib/boot';
import { buildMailtoUrl, buildWhatsappUrl } from '../lib/contact-links';

bootCommon();

const form = document.getElementById('contact-form') as HTMLFormElement | null;
const errorEl = document.getElementById('form-error');

function showError(message: string) {
  if (!errorEl) return;
  errorEl.textContent = message;
  errorEl.style.display = 'block';
}
function clearError() {
  if (!errorEl) return;
  errorEl.style.display = 'none';
}

form?.addEventListener('submit', (e) => {
  const submitter = (e as SubmitEvent).submitter as HTMLButtonElement | null;
  e.preventDefault();
  clearError();

  const data = new FormData(form);
  const name = String(data.get('name') ?? '').trim();
  const phone = String(data.get('phone') ?? '').trim();
  const reason = String(data.get('reason') ?? '').trim();
  const message = String(data.get('message') ?? '').trim();

  if (!name || !phone) {
    showError('Merci d’indiquer votre nom et votre numéro de téléphone.');
    return;
  }

  const values = { name, phone, reason, message };
  const mode = submitter?.dataset.send === 'mail' ? 'mail' : 'whatsapp';
  const url = mode === 'mail' ? buildMailtoUrl(values) : buildWhatsappUrl(values);
  window.location.href = url;
});
