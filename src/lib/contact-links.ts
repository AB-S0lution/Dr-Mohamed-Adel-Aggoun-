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
  /** Date souhaitée, à titre indicatif — jamais une réservation confirmée. */
  preferredDateLabel?: string;
  preferredSlotLabel?: string;
}

function buildMessage(v: ContactFormValues): string {
  const lines = [
    `Demande de rendez-vous — ${SITE.brandName}`,
    `Nom : ${v.name || '(non renseigné)'}`,
    `Téléphone : ${v.phone || '(non renseigné)'}`,
    `Motif : ${v.reason || '(non renseigné)'}`,
  ];
  if (v.preferredDateLabel) {
    lines.push(`Date souhaitée (à confirmer) : ${v.preferredDateLabel}`);
  }
  if (v.preferredSlotLabel) {
    lines.push(`Créneau souhaité (à confirmer) : ${v.preferredSlotLabel}`);
  }
  if (v.message.trim()) lines.push('', v.message.trim());
  lines.push('', '(Ce message ne constitue pas une réservation confirmée — le cabinet recontacte pour fixer l’horaire définitif.)');
  return lines.join('\n');
}

export function buildWhatsappUrl(v: ContactFormValues): string {
  return buildWhatsappUrlRaw(buildMessage(v));
}

export function buildMailtoUrl(v: ContactFormValues): string {
  const subject = `Demande de rendez-vous — ${v.name || 'Patient'}`;
  return buildMailtoUrlRaw(subject, buildMessage(v));
}

/** Construit un lien wa.me à partir d'un texte déjà composé (questionnaire, etc.). */
export function buildWhatsappUrlRaw(message: string): string {
  return `${SITE.whatsappHref}?text=${encodeURIComponent(message)}`;
}

/** Construit un lien mailto: à partir d'un sujet et d'un texte déjà composés. */
export function buildMailtoUrlRaw(subject: string, message: string): string {
  return `${SITE.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}
