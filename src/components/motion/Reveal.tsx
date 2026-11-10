import { motion, useReducedMotion, type Variants } from 'motion/react';
import type { ReactNode, ElementType } from 'react';

const EASE = [0.23, 1, 0.32, 1] as const;

/**
 * Déclencheur de révélation : l'élément s'anime dès qu'il croise une vue
 * rétrécie par le bas. On ne demande PAS un pourcentage de l'élément
 * visible : un bloc plus haut que l'écran (un formulaire, une colonne de
 * texte) ne l'atteindrait jamais et resterait invisible pour toujours.
 */
const VIEWPORT = { once: true, margin: '0px 0px -12% 0px' } as const;

/**
 * Révélation à l'entrée dans la vue. Translation + opacité uniquement,
 * jamais de propriété qui déclenche un calcul de mise en page.
 */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  as = 'div',
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: ElementType;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as as 'div'] ?? motion.div;

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, transform: `translateY(${y}px)` }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={VIEWPORT}
      transition={{ duration: 0.72, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

const groupParent: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.075, delayChildren: 0.05 } },
};

const groupChild: Variants = {
  hidden: { opacity: 0, transform: 'translateY(1.5rem)' },
  shown: { opacity: 1, transform: 'translateY(0rem)', transition: { duration: 0.68, ease: EASE } },
};

/** Conteneur dont les enfants entrent en cascade plutôt que d'un bloc. */
export function RevealGroup({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as as 'div'] ?? motion.div;

  if (reduce) return <MotionTag className={className}>{children}</MotionTag>;

  return (
    <MotionTag
      className={className}
      variants={groupParent}
      initial="hidden"
      whileInView="shown"
      viewport={VIEWPORT}
    >
      {children}
    </MotionTag>
  );
}

/** Enfant d'un RevealGroup. */
export function RevealItem({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as as 'div'] ?? motion.div;
  if (reduce) return <MotionTag className={className}>{children}</MotionTag>;
  return (
    <MotionTag className={className} variants={groupChild}>
      {children}
    </MotionTag>
  );
}
