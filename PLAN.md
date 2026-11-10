# PLAN — Cabinet Saha, Dr Mohamed Adel Aggoun (Tazoult, Batna, Algérie)

Research compiled 2026-11-10 from directory listings (MaWilaya, Mapcarta/OpenStreetMap, Addalile) plus
the owner's own email replies. "Confirmed" = a source page was opened directly. "Unverified" = reported
by a prior AI research pass only, not independently checked — treat as a lead, not a fact, and never
publish it as true. This file is the source of truth for this site; read it before any design or code work.

## 1. Identity (do not deviate)

- **Practitioner:** Dr Mohamed Adel Aggoun — diabétologue / endocrinologue (أمراض الغدد الصماء والسكري).
  Arabic spelling seen on one directory: الدكتور عقون محمد عادل.
- **Practice names seen on listings:** "Cabinet de Diabétologie et d'Endocrinologie Dr Aggoun Mohamed
  Adel", "Cabinet Saha", "Cabinet Saha Dr Aggoun", "Docteur Aggoun d'endocrinologie". Use **"Cabinet
  Saha"** as the site's short brand name (matches what the owner himself called it in the outreach
  email subject), with the full practitioner name/specialty always present in the header/footer and
  legal pages.
- **Location:** Tazoult, wilaya de Batna, Algérie — route de Tazoult, à côté de la mosquée Omar Ibn
  Al-Aas (confirmed on Addalile, Arabic text). Tazoult is ~11 km à l'est de Batna (reported, not
  independently verified by source page).
- **Mobile:** 0556324453 / +213 556 32 44 53 — confirmed on MaWilaya and the owner's own database;
  this is the one number to treat as certain everywhere (tel: link, WhatsApp link, JSON-LD).
- **Landline:** +213 33 30 55 11 appears on one MaWilaya listing. A second number (033 98 02 04) exists
  only in the unverified research pass — **do not publish the second number**; use only the mobile and
  the one confirmed landline, and leave a TODO for the owner to confirm the landline is current.
- **Email:** medadel83@gmail.com — confirmed (published on Mapcarta/OSM, and the owner replied from it).
- **Opening hours (use these, they are the directly-sourced ones):** Sam–Mer 08:00–15:30, Jeu
  08:00–13:00, Ven fermé. ("Updated 21 June 2026" on the source listing.) One other directory (Addalile)
  shows a conflicting single line for Tuesday (08:00–15:00) — flagged as a TODO for the owner to confirm,
  site shows the MaWilaya hours as primary.
- **Coordinates:** 35.5157169, 6.2192209 (MaWilaya/OSM). A second source (Mapcarta) places it ~0.4 km
  further north. Use the MaWilaya pair for the map embed/pin and JSON-LD; do not use any coordinate that
  looks like a truncated placeholder.
- **Reviews:** none published anywhere. **No testimonials on the site** (see §4).
- **Website/social:** none found by any source. Cannot be proven absent, but nothing to link to — this
  site IS the first one.

## 2. What is explicitly NOT confirmed — do not invent, TODO for the owner

- Second landline number, exact Tuesday hours, degrees/qualifications, year the practice opened or
  years of experience, any equipment on site (échographie thyroïdienne, lecteur de glycémie, etc.),
  whether he already manages a Google Maps / Facebook listing, logo, and any real photo of the cabinet.
  **None of these appear anywhere on the site** — no invented founding date, no invented "X années
  d'expérience" stat, no invented equipment list, no stock/AI photo presented as the real cabinet.
- The competitor list and the exact ethics-decree article numbers from the prior research pass are
  unverified and are not used anywhere on the site (no "vs. the competition" content — also forbidden
  by §4 below).

## 3. Customer voice

None available — zero published reviews anywhere. No testimonials, no star ratings, no named quotes.
Trust is built through clarity, credentials stated plainly, calm tone, and transparency about what the
site is (an independent demo, not yet the owner's official site) rather than through social proof.

## 4. Content rules specific to a medical practice in Algeria

Algerian medical ethics (Décret exécutif n° 92-276, code de déontologie médicale, applied via le Conseil
National de l'Ordre des Médecins) bar doctors from advertising as a business. This overrides the generic
"mock data" playbook in the top-level CLAUDE.md:

- **No prices, no offers/promotions, no "book now and save," no countdown/urgency UI.**
- **No testimonials, no star ratings, no patient quotes, no before/after.**
- **No comparison with other doctors/practices, no claims of results ("guéri", "100% efficace").**
- **No online consultation or prescription by message** — "prise de rendez-vous en ligne" means a
  static request form that opens a prefilled `mailto:` or `wa.me` message, never a real booking
  backend (matches the top-level CLAUDE.md: no backend, no database).
- Tone stays informational and reassuring: what a consultation involves, which conditions are treated,
  practical visit info — not sales copy.
- Footer/legal page states plainly this is an independent, unofficial demo site pending the owner's
  review, per the outreach email already sent.

## 5. Site map

1. **Accueil** — hero (practitioner + specialty + location), short intro, 3–4 specialty highlights,
   today's hours at a glance, how to reach the cabinet (call / WhatsApp / itinéraire), signature visual.
2. **Le Cabinet** (à propos) — the practitioner, the specialty in plain language, philosophy of care,
   what a first consultation looks like (process steps), practical info (langues parlées: FR/AR,
   accessibility notes — mark as "à confirmer" since unverified).
3. **Spécialités** — grid/detail of conditions treated (diabète, thyroïde, obésité/métabolisme,
   surrénales, croissance/pédiatrie endocrinienne, etc.), informational, no prices.
4. **Conseils santé** (blog/news) — 8–12 short articles in French on diabetes/thyroid/metabolic health,
   written as general public-health information, not medical advice attributed to the doctor personally
   unless phrased generically ("à Cabinet Saha, on explique...").
5. **FAQ** — 10–15 practical questions (comment prendre RDV, que faut-il apporter, faut-il être à jeun,
   CNAS/sécurité sociale, délais, urgence, enfants, grossesse...).
6. **Horaires & Accès** — hours table, address, map embed/static map, itinéraire links (Google Maps).
7. **Contact** — tel/WhatsApp/email links + a static "demande de rendez-vous" form (mailto/WhatsApp
   prefill only, explicit "nous vous recontactons" — not instant booking).
8. **Mentions légales**
9. **Politique de confidentialité**
10. **404**

## 6. Mock-data plan (typed, in `src/data/*.ts`, each file headed "sample data")

- `specialties.ts` — 10–15 conditions/consultation types with short descriptions and a tag (adulte/
  enfant/suivi). Informational tone, no prices.
- `articles.ts` — 8–12 "Conseils santé" posts: title, excerpt, body, category, read time, date. Locally
  relevant angle where natural (e.g. diabète et Ramadan, alimentation locale).
- `faq.ts` — 10–15 Q/A pairs.
- `process.ts` — 4–5 steps of "déroulement d'une consultation."
- `hours.ts` — the confirmed hours table (real data, not mock — keep separate from invented content).
- No `testimonials.ts`, no `pricing.ts`, no `offers.ts` — forbidden by §4.

## 7. Design direction

> **Revised 2026-11-10, after the client rejected the first build** ("basic, no animation, no photos,
> obviously AI-generated, bad navbar, bad folder structure for React/Vite"). The original direction
> (concept "Équilibre", Fraunces + pine/sand/terracotta, 100% original SVG art, vanilla-TS multi-page)
> is kept below under *Superseded* for the record. What follows is what the site actually is.

**Concept — "Clinique éditorial".** A trust-first local healthcare site read mostly on a phone by
patients in Tazoult/Batna. The structure is editorial (an asymmetric hero, rules instead of cards,
a bento that tiles exactly, long-form articles) and the register is clinical: no promise, no price,
no testimonial. Motion is present on every screen but is never the subject.

- **Stack:** React 19 + Vite 8 (SPA, React Router 7), Tailwind v4 via `@tailwindcss/vite`, Motion
  (`motion/react`) for reveals/transitions, GSAP ScrollTrigger for the single pinned scene, Lenis
  for smooth scroll. Base `/Dr-Mohamed-Adel-Aggoun-/`, `404.html` emitted as a copy of `index.html`
  by a Vite plugin so deep links work on GitHub Pages.
- **Palette:** clinical blue and white, chosen by the client. `--c-blue-700 #0f4c81` is the single
  accent (8.86:1 on white); ink is a cool near-black `--c-ink-900 #0b1b2b`; paper is `#f5f7fa`.
  Three signal colours (`open`, `warn`, `high`) exist only for state, never for brand. One accent,
  one radius scale, one grey family.
- **Type:** Cabinet Grotesk (display, 700/800) + Satoshi (text, 400/500/700 with real italics), both
  **self-hosted** in `src/assets/fonts/` under the Fontshare licence. No CDN: the page renders
  without reaching any third party. Fraunces is explicitly out (banned as an LLM-favourite display
  serif). Emphasis inside a heading is same-family weight + colour + an underline rule, never a
  synthetic italic (Cabinet Grotesk has no italic) and never a second family.
- **Motion:** page transitions, staggered reveals, clip-path photo reveals, parallax, a reading
  progress bar, and exactly **one** pinned scene in the whole site (the consultation steps on the
  home page, horizontal scrub, GSAP ScrollTrigger). Transform and opacity only. Every animation is
  gated on `prefers-reduced-motion`; the pinned scene additionally needs ≥ 900px. No marquee: the
  client specifically rejected the title slider.
- **Imagery:** five photographs from Unsplash, under the Unsplash licence, listed in §7b. All show
  generic consultation, nutrition or instrument subjects. Deliberately **no stock portrait**: a stock
  face on a real named doctor's site reads as a photo of Dr Aggoun. The logo, the twelve specialty
  glyphs and the illustrations remain original SVG. Photos share one blue grade (`.photo--graded`)
  so mixed sources read as one library.
- **Theme:** light by default regardless of OS preference, with a manual dark theme on the same
  tokens, remembered in `localStorage`.
- Language: French, correct accents and typography. No em dash or en dash anywhere in the source
  (project-wide gate) — use a comma, a colon, or "à" for ranges.

### 7b. Image credits

Photographs are from **Unsplash**, used under the [Unsplash licence](https://unsplash.com/license)
(free to use, no attribution required; credited here anyway). None depicts the practitioner, his
team, his patients or his premises, and each `alt` says what it actually shows.

| File | Subject |
| --- | --- |
| `cabinet-consultation.jpg` | Consultation desk, screen showing a follow-up chart (home hero) |
| `accompagnement-mains.jpg` | A carer's hands over a patient's, during an interview |
| `stethoscope.jpg` | Stethoscope on a light sheet, black and white |
| `alimentation-equilibre.jpg` | A composed plate of vegetables and pulses |
| `legumes-nutrition.jpg` | Prepared vegetables and crudités in separate portions |

A sixth image (`consultation-echange.jpg`) was removed on 2026-11-10: it carried a legible
"UROLOGIC ONCOLOGY BRANCH" badge, which is the wrong specialty, and put two identifiable faces in
the foreground of a named doctor's home page.

### 7c. Superseded (first build, rejected)

Concept "Équilibre": a sinusoidal balance curve drawn on scroll, Fraunces + Fontshare sans, warm
pine/sand/terracotta palette, 100% original SVG art and no photography, vanilla-TS multi-page Vite.
Rejected by the client as basic and obviously AI-generated. The curve survives only in the logo mark
and the specialty glyphs; the palette and the type pairing are gone.

## 8. Open items / owner decisions (list in the final report, do not block the build on these)

1. Confirm the second landline number and Tuesday hours conflict.
2. Provide real logo, cabinet photos, degrees/qualifications, years of practice, languages spoken.
3. Confirm whether he already manages a Google Maps/Facebook listing.
4. Confirm the appointment-request flow he wants (WhatsApp vs. email vs. phone only).
5. This is an independent demo, unofficial, not yet reviewed by the owner — state that on the site
   itself (footer/legal) until he approves going further.
