import '../styles/main.css';
// Pas de bootCommon() ici : la page 404 n'a pas d'en-tête/pied de page
// complets (elle peut être servie depuis n'importe quelle profondeur d'URL
// par GitHub Pages), seulement le thème clair/sombre et les tokens CSS.
import { initThemeToggle } from '../lib/theme';

initThemeToggle(document.getElementById('theme-toggle'));
