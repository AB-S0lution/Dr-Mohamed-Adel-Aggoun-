import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

const EASE = [0.23, 1, 0.32, 1] as const;

/** Voir Reveal.tsx : seuil en marge, jamais en pourcentage de l'élément. */
const VIEWPORT = { once: true, margin: '0px 0px -10% 0px' } as const;

type PhotoProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  graded?: boolean;
  priority?: boolean;
  caption?: string;
};

/**
 * Photo révélée par un masque qui s'ouvre, pendant que l'image elle-même
 * se dézoome légèrement. Les deux sont des transforms, donc composés par
 * le GPU. Le masque raconte l'arrivée de l'image au lieu de la faire
 * apparaître d'un coup.
 *
 * La légende est posée sous le cadre, jamais par-dessus la photo : son
 * contraste est alors décidé par les jetons et non par l'image.
 */
export function RevealPhoto({
  src,
  alt,
  className = '',
  imgClassName = '',
  graded = false,
  priority = false,
  caption,
}: PhotoProps) {
  const reduce = useReducedMotion();

  return (
    <figure className={`photo ${className}`}>
      <motion.div
        className={`photo__frame ${graded ? 'photo--graded' : ''}`}
        initial={reduce ? false : { clipPath: 'inset(0 0 100% 0)' }}
        whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
        viewport={VIEWPORT}
        transition={{ duration: 1.05, ease: EASE }}
      >
        <motion.img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          className={imgClassName}
          initial={reduce ? false : { transform: 'scale(1.14)' }}
          whileInView={{ transform: 'scale(1)' }}
          viewport={VIEWPORT}
          transition={{ duration: 1.35, ease: EASE }}
        />
      </motion.div>
      {caption ? <figcaption className="photo__caption">{caption}</figcaption> : null}
    </figure>
  );
}

/**
 * Photo qui dérive plus lentement que le défilement. Donne de la
 * profondeur à une section sans rien déplacer d'autre.
 */
export function ParallaxPhoto({
  src,
  alt,
  className = '',
  graded = false,
  distance = 56,
  caption,
}: PhotoProps & { distance?: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);

  return (
    <figure ref={ref} className={`photo ${className}`}>
      <div className={`photo__frame ${graded ? 'photo--graded' : ''}`}>
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          style={reduce ? undefined : { y, scale: 1.18 }}
        />
      </div>
      {caption ? <figcaption className="photo__caption">{caption}</figcaption> : null}
    </figure>
  );
}
