import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

const EASE = [0.23, 1, 0.32, 1] as const;

/**
 * Transition d'entrée de page. Courte et discrète : elle relie deux vues,
 * elle ne se donne pas en spectacle. La sortie n'est pas animée, pour que
 * la navigation reste immédiate au clic.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, transform: 'translateY(0.75rem)' }}
      animate={{ opacity: 1, transform: 'translateY(0rem)' }}
      transition={{ duration: 0.42, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
