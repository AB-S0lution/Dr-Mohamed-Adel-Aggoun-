import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import { List, X, Phone, CalendarCheck, Sun, Moon } from '@phosphor-icons/react';
import { SITE } from '../../data/site';
import { useTheme } from '../../hooks/useTheme';
import { Logo } from '../ui/Logo';

const EASE = [0.23, 1, 0.32, 1] as const;

const NAV = [
  { to: '/le-cabinet', label: 'Le cabinet' },
  { to: '/specialites', label: 'Spécialités' },
  { to: '/conseils-sante', label: 'Conseils santé' },
  { to: '/faq', label: 'FAQ' },
  { to: '/horaires-acces', label: 'Horaires & accès' },
];

export function Header({ overHero }: { overHero: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const location = useLocation();

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24));
  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Au-dessus du héros sombre, l'en-tête est transparente et claire.
  // Dès que la page défile, elle prend un fond et reprend l'encre normale.
  const transparent = overHero && !scrolled && !open;

  return (
    <>
      <header
        data-scrolled={scrolled}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          color: transparent ? 'var(--ink-invert)' : 'var(--ink)',
          background: transparent ? 'transparent' : 'var(--bg-raised)',
          borderBottom: `1px solid ${transparent ? 'transparent' : 'var(--line)'}`,
          boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
          transition:
            'background-color var(--d-chrome) var(--ease-out), color var(--d-chrome) var(--ease-out), border-color var(--d-chrome) var(--ease-out), box-shadow var(--d-chrome) var(--ease-out)',
        }}
      >
        <div
          className="shell"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            height: scrolled ? 'var(--header-h-scrolled)' : 'var(--header-h)',
            transition: 'height var(--d-chrome) var(--ease-out)',
          }}
        >
          <Link
            to="/"
            aria-label="Cabinet Saha, accueil"
            style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flex: 'none' }}
          >
            <Logo />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.02rem',
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap',
              }}
            >
              Cabinet Saha
            </span>
          </Link>

          <nav aria-label="Navigation principale" className="nav-desktop">
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} className="nav-link">
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive ? (
                      <motion.span layoutId="nav-active" className="nav-link__dot" aria-hidden="true" />
                    ) : null}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 'none' }}>
            <button
              type="button"
              onClick={toggle}
              className="icon-btn"
              aria-label={theme === 'dark' ? 'Passer en thème clair' : 'Passer en thème sombre'}
            >
              {theme === 'dark' ? <Sun size={18} weight="light" /> : <Moon size={18} weight="light" />}
            </button>

            {/* Mene a la page contact, pas vers tel: : un navigateur de bureau
                renverrait le lien tel: a une application externe du systeme. */}
            <Link to="/contact" className="btn btn-primary header-cta">
              <CalendarCheck size={17} weight="light" />
              Prendre rendez-vous
            </Link>

            <button
              type="button"
              className="icon-btn menu-btn"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {open ? <X size={20} weight="light" /> : <List size={20} weight="light" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="mobile-sheet"
            initial={reduce ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
          >
            <nav className="mobile-sheet__links">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={reduce ? false : { opacity: 0, transform: 'translateY(1.4rem)' }}
                  animate={{ opacity: 1, transform: 'translateY(0rem)' }}
                  transition={{ duration: 0.5, delay: 0.06 + i * 0.055, ease: EASE }}
                >
                  <NavLink to={item.to} onClick={() => setOpen(false)}>
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={reduce ? false : { opacity: 0, transform: 'translateY(1.4rem)' }}
                animate={{ opacity: 1, transform: 'translateY(0rem)' }}
                transition={{ duration: 0.5, delay: 0.06 + NAV.length * 0.055, ease: EASE }}
                style={{ marginTop: '1.5rem', display: 'grid', gap: '0.75rem' }}
              >
                <Link to="/contact" className="btn btn-primary" style={{ width: '100%' }}>
                  <CalendarCheck size={17} weight="light" />
                  Prendre rendez-vous
                </Link>
                <a href={SITE.mobileHref} className="btn btn-secondary" style={{ width: '100%' }}>
                  <Phone size={17} weight="light" />
                  {SITE.mobileDisplay}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
