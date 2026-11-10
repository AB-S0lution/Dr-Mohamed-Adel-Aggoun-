// Une image générique par thème d'article. Le site n'a pas de photo propre
// à chaque texte, et une photo fixe sur « l'article en tête » finirait par
// illustrer n'importe quoi dès que le tri ou le filtre change. Le lien est
// donc fait par le thème, jamais par l'article : chaque légende dit ce que
// la photo montre réellement, pas ce que l'article raconte.
import alimentation from '../assets/photos/alimentation-equilibre.jpg';
import legumes from '../assets/photos/legumes-nutrition.jpg';
import stethoscope from '../assets/photos/stethoscope.jpg';
import mains from '../assets/photos/accompagnement-mains.jpg';
import cabinet from '../assets/photos/cabinet-consultation.jpg';

export interface ArticleImage {
  src: string;
  alt: string;
}

const BY_CATEGORY: Record<string, ArticleImage> = {
  Diabète: { src: cabinet, alt: 'Bureau de consultation, écran affichant une courbe de suivi' },
  Nutrition: { src: alimentation, alt: 'Assiette composée de légumes, légumineuses et crudités' },
  'Mode de vie': { src: legumes, alt: 'Légumes et crudités préparés en portions séparées' },
  Thyroïde: { src: stethoscope, alt: 'Stéthoscope posé sur un drap clair, en noir et blanc' },
  Pédiatrie: { src: mains, alt: "Mains d'un soignant posées sur celles d'un patient" },
};

const FALLBACK: ArticleImage = BY_CATEGORY.Diabète;

export function imageForCategory(category: string): ArticleImage {
  return BY_CATEGORY[category] ?? FALLBACK;
}
