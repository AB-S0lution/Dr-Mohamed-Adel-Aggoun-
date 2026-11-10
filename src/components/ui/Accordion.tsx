import { useId, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Plus, Minus } from '@phosphor-icons/react';

const EASE = [0.23, 1, 0.32, 1] as const;

/**
 * Un seul panneau ouvert à la fois n'est pas imposé : sur une FAQ, les
 * gens comparent deux réponses. La hauteur est animée ici parce qu'il
 * n'existe pas d'équivalent en transform pour un accordéon.
 */
export function AccordionItem({
  question,
  children,
  defaultOpen = false,
}: {
  question: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const reduce = useReducedMotion();
  const id = useId();

  return (
    <div className="acc-item">
      <h3>
        <button
          type="button"
          className="acc-trigger"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-trigger`}
          onClick={() => setOpen((v) => !v)}
        >
          <span>{question}</span>
          <span className="acc-trigger__sign" aria-hidden="true">
            {open ? <Minus size={20} weight="light" /> : <Plus size={20} weight="light" />}
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            className="acc-panel"
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-trigger`}
            initial={reduce ? { height: 'auto' } : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? { height: 'auto', opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0.14 : 0.32, ease: EASE }}
          >
            <div className="acc-panel__inner">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
