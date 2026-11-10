import { PATHS } from '../../lib/icons';

/**
 * Jeu d'icônes maison pour les spécialités médicales (trait continu de
 * 1.5px, dessiné pour ce cabinet). Les icônes d'interface génériques
 * (téléphone, enveloppe, menu) viennent de Phosphor : inutile de
 * redessiner ce qui existe déjà bien.
 */
export function Icon({
  name,
  size = 22,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      dangerouslySetInnerHTML={{ __html: PATHS[name] ?? PATHS.curve }}
    />
  );
}
