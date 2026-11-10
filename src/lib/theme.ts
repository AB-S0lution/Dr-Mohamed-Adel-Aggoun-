// Bascule thème clair / sombre. La préférence est mémorisée localement côté
// navigateur (confort de la personne qui visite), jamais envoyée ailleurs.

const STORAGE_KEY = 'cabinet-saha-theme';

export type Theme = 'light' | 'dark';

function readStored(): Theme | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null;
  }
}

export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ignore — private mode or blocked storage */
  }
}

export function currentTheme(): Theme {
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'light' || attr === 'dark') return attr;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function initThemeToggle(button: HTMLElement | null) {
  if (!button) return;
  const stored = readStored();
  if (stored) document.documentElement.setAttribute('data-theme', stored);

  button.addEventListener('click', () => {
    const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });
}
