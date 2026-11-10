// Calculateur d'IMC (indice de masse corporelle) : outil informatif, client
// uniquement, aucune donnée transmise nulle part. Formule générale de l'OMS,
// catégories à visée pédagogique. Ne remplace jamais un avis médical
// individualisé : voir PLAN.md §4 (pas de diagnostic, pas de promesse de
// résultat). Les bornes numériques couvrent les cas limites réalistes
// (enfant, forte corpulence) sans prétendre être un dispositif médical.

export interface BmiCategory {
  key: 'maigreur' | 'normal' | 'surpoids' | 'obesite1' | 'obesite2' | 'obesite3';
  label: string;
  range: string;
  /** Position de 0 à 1 le long de la jauge, utilisée pour placer le repère. */
  gaugeFrom: number;
  gaugeTo: number;
}

export const BMI_CATEGORIES: BmiCategory[] = [
  { key: 'maigreur', label: 'Maigreur', range: '< 18,5', gaugeFrom: 0, gaugeTo: 0.16 },
  { key: 'normal', label: 'Poids habituel', range: '18,5 à 24,9', gaugeFrom: 0.16, gaugeTo: 0.42 },
  { key: 'surpoids', label: 'Surpoids', range: '25 à 29,9', gaugeFrom: 0.42, gaugeTo: 0.62 },
  { key: 'obesite1', label: 'Obésité modérée', range: '30 à 34,9', gaugeFrom: 0.62, gaugeTo: 0.78 },
  { key: 'obesite2', label: 'Obésité sévère', range: '35 à 39,9', gaugeFrom: 0.78, gaugeTo: 0.92 },
  { key: 'obesite3', label: 'Obésité morbide', range: '≥ 40', gaugeFrom: 0.92, gaugeTo: 1 },
];

export interface BmiResult {
  value: number;
  category: BmiCategory;
  /** Position de 0 à 1 à placer sur la jauge (clampée). */
  gaugePosition: number;
}

export type BmiInputError =
  | 'height-missing'
  | 'height-range'
  | 'weight-missing'
  | 'weight-range';

const HEIGHT_MIN_CM = 80;
const HEIGHT_MAX_CM = 230;
const WEIGHT_MIN_KG = 15;
const WEIGHT_MAX_KG = 300;

/** Valide les entrées brutes avant tout calcul. Renvoie la première erreur trouvée. */
export function validateBmiInputs(heightCm: number, weightKg: number): BmiInputError | null {
  if (!Number.isFinite(heightCm) || heightCm <= 0) return 'height-missing';
  if (heightCm < HEIGHT_MIN_CM || heightCm > HEIGHT_MAX_CM) return 'height-range';
  if (!Number.isFinite(weightKg) || weightKg <= 0) return 'weight-missing';
  if (weightKg < WEIGHT_MIN_KG || weightKg > WEIGHT_MAX_KG) return 'weight-range';
  return null;
}

export const BMI_ERROR_MESSAGES: Record<BmiInputError, string> = {
  'height-missing': 'Merci d’indiquer une taille.',
  'height-range': `La taille doit être comprise entre ${HEIGHT_MIN_CM} et ${HEIGHT_MAX_CM} cm.`,
  'weight-missing': 'Merci d’indiquer un poids.',
  'weight-range': `Le poids doit être compris entre ${WEIGHT_MIN_KG} et ${WEIGHT_MAX_KG} kg.`,
};

function categoryFor(value: number): BmiCategory {
  if (value < 18.5) return BMI_CATEGORIES[0];
  if (value < 25) return BMI_CATEGORIES[1];
  if (value < 30) return BMI_CATEGORIES[2];
  if (value < 35) return BMI_CATEGORIES[3];
  if (value < 40) return BMI_CATEGORIES[4];
  return BMI_CATEGORIES[5];
}

/** IMC extrême pris comme borne haute de la jauge visuelle, au-delà de laquelle le repère reste en fin de jauge. */
const GAUGE_MAX_BMI = 50;

export function computeBmi(heightCm: number, weightKg: number): BmiResult {
  const heightM = heightCm / 100;
  const raw = weightKg / (heightM * heightM);
  const value = Math.round(raw * 10) / 10;
  const category = categoryFor(value);
  const gaugePosition = Math.min(1, Math.max(0, value / GAUGE_MAX_BMI));
  return { value, category, gaugePosition };
}
