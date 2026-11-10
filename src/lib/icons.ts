// Jeu d'icônes maison : traits fins et continus (1.5px), cohérents avec le
// motif de la courbe d'équilibre. Art original, pas une librairie
// générique : volontairement réduit à ce dont le site a besoin.

const WRAP = (inner: string, size = 22) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;

export const PATHS: Record<string, string> = {
  curve: '<path d="M2 16c3 0 3-9 6-9s2 10 5 10 2-9 5-9 2 8 4 8"/>',
  wave: '<path d="M2 12c2.5-4 5-4 7.5 0s5 4 7.5 0 3.5-4 5-2"/>',
  leaf: '<path d="M4 20c0-9 5-15 15-16-1 11-6 15-15 16Z"/><path d="M6 18c3-4 7-7 12-9"/>',
  drop: '<path d="M12 3s6 7 6 11.5a6 6 0 0 1-12 0C6 10 12 3 12 3Z"/>',
  scale: '<path d="M12 3v18M6 7h12M4 7l-2 5a3 3 0 0 0 6 0L6 7Zm14 0l-2 5a3 3 0 0 0 6 0l-2-5Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
  pulse: '<path d="M2 12h4l2 7 4-14 2 7h8"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6Z"/>',
  seed: '<path d="M12 21c5-1 8-6 8-12-6 0-11 3-12 8-1 3 1 4 4 4Z"/><path d="M8 17c0-5 2-9 6-11"/>',
  node: '<circle cx="6" cy="6" r="2.4"/><circle cx="18" cy="6" r="2.4"/><circle cx="12" cy="18" r="2.4"/><path d="M8 7l2.4 9M16 7l-2.4 9M8.4 6h7.2"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="M15 9l-2 6-6 2 2-6 6-2Z"/>',
  anchor: '<circle cx="12" cy="5" r="2"/><path d="M12 7v13M6 13H3a9 9 0 0 0 9 8 9 9 0 0 0 9-8h-3M7 13a5 5 0 0 1 10 0"/>',
  phone: '<path d="M4 4c0 9 7 16 16 16l2-4-6-2-2 2c-3-1.5-5-3.5-6-6l2-2-2-6Z"/>',
  whatsapp: '<path d="M7 17l-3 1 1-3a8 8 0 1 1 2 2Z"/><path d="M8.5 9.5c0 3 2 5 5 5l1.2-1.8"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s7-7.2 7-12a7 7 0 0 0-14 0c0 4.8 7 12 7 12Z"/><circle cx="12" cy="9" r="2.3"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M5 5l14 14M19 5L5 19"/>',
  chevron: '<path d="M6 9l6 6 6-6"/>',
  moon: '<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4 6.5 6.5 0 0 0 20 14.5Z"/>',
  sunToggle: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  check: '<path d="M4 12l5 5L20 6"/>',
};

export function icon(name: keyof typeof PATHS, size = 22): string {
  return WRAP(PATHS[name] ?? PATHS.curve, size);
}
