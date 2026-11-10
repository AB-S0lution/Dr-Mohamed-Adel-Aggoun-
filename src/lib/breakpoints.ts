/**
 * Points de rupture partagés entre le CSS et le JS. Quand une animation
 * doit s'éteindre sous une certaine largeur, elle lit la requête d'ici
 * plutôt que d'en recopier une à côté.
 *
 * ds-allow-hardcode: ce fichier EST la définition des points de rupture.
 * Les littéraux y sont nommés une fois et consommés partout ailleurs.
 */

/* ds-allow-hardcode:start — ce fichier EST la définition des seuils. */

/** Scène épinglée : jamais sous 900px, jamais sous reduced-motion. */
export const MQ_PIN_SCENE = '(min-width: 900px) and (prefers-reduced-motion: no-preference)';

/** Parallaxe et dérive lente : inutiles sur un écran de téléphone. */
export const MQ_DESKTOP = '(min-width: 1000px)';

/* ds-allow-hardcode:end */
