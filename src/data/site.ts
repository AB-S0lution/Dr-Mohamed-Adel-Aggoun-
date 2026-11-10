// Données vérifiées — identité du cabinet (PLAN.md §1). Ne pas modifier sans
// confirmation du praticien. Ce site est une démonstration indépendante, non
// encore validée par le Dr Aggoun.

export const SITE = {
  brandName: 'Cabinet Saha',
  practitioner: 'Dr Mohamed Adel Aggoun',
  practitionerArabic: 'الدكتور عقون محمد عادل',
  specialtyShort: 'Diabétologie et endocrinologie',
  specialtyFull: 'Diabétologie, endocrinologie et maladies métaboliques',
  fullTitle: 'Cabinet de Diabétologie et d’Endocrinologie — Dr Aggoun Mohamed Adel',
  city: 'Tazoult',
  wilaya: 'Batna',
  country: 'Algérie',
  addressLine: 'Route de Tazoult, à côté de la mosquée Omar Ibn Al-Aas',
  addressFull: 'Route de Tazoult, à côté de la mosquée Omar Ibn Al-Aas, Tazoult, Wilaya de Batna, Algérie',
  mobileDisplay: '0556 32 44 53',
  mobileIntl: '+213556324453',
  mobileHref: 'tel:+213556324453',
  whatsappHref: 'https://wa.me/213556324453',
  landlineDisplay: '033 30 55 11',
  landlineIntl: '+213333055511',
  landlineHref: 'tel:+213333055511',
  email: 'medadel83@gmail.com',
  emailHref: 'mailto:medadel83@gmail.com',
  coordinates: { lat: 35.5157169, lng: 6.2192209 },
  mapsHref: 'https://www.google.com/maps?q=35.5157169,6.2192209',
  mapsEmbedSrc:
    'https://www.google.com/maps?q=35.5157169,6.2192209&hl=fr&z=16&output=embed',
} as const;

export const SITE_STATUS_NOTICE =
  'Ce site est une démonstration indépendante et non officielle, réalisée à titre de proposition pour le Cabinet Saha. Il est en attente de relecture et de validation par le Dr Aggoun avant toute mise en ligne définitive.';
