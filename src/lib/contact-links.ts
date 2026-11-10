// Construit les liens statiques de demande de contact (WhatsApp / e-mail
// pré-remplis). Aucune donnée n'est envoyée à un serveur : ce sont de simples
// liens `wa.me` / `mailto:` ouverts par le navigateur ou l'application de
// messagerie. Voir PLAN.md §4 — pas de prise de rendez-vous en ligne réelle.
import { SITE } from '../data/site';

export interface ContactFormValues {
  name: string;
  phone: string;
  reason: string;
  message: string;
}

function buildMessage(v: ContactFormValues): string {
  const lines = [
    `Demande de rendez-vous — ${SITE.brandName}`,
    `Nom : ${v.name || '(non renseigné)'}`,
    `Téléphone : ${v.phone || '(non renseigné)'}`,
    `Motif : ${v.reason || '(non renseigné)'}`,
  ];
  if (v.message.trim()) lines.push('', v.message.trim());
  return lines.join('\n');
}

export function buildWhatsappUrl(v: ContactFormValues): string {
  return `${SITE.whatsappHref}?text=${encodeURIComponent(buildMessage(v))}`;
}

export function buildMailtoUrl(v: ContactFormValues): string {
  const subject = encodeURIComponent(`Demande de rendez-vous — ${v.name || 'Patient'}`);
  const body = encodeURIComponent(buildMessage(v));
  return `${SITE.emailHref}?subject=${subject}&body=${body}`;
}
