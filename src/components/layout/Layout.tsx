import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { PageTransition } from '../motion/PageTransition';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';

/**
 * Ramène en haut à chaque changement de route, sans défilement animé.
 * Sauf si l'URL vise une ancre : un lien « /specialites#diabete-type-1 »
 * doit déposer la personne sur la ligne concernée, pas en haut de page.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      return;
    }

    // La page visée est chargée à la demande : au moment de cet effet, la
    // cible n'existe pas encore. On réessaie pendant quelques frames, puis
    // on abandonne en haut de page plutôt que de boucler.
    const id = decodeURIComponent(hash.slice(1));
    const deadline = performance.now() + 1500;
    let frame = 0;

    const tryScroll = () => {
      const target = document.getElementById(id);
      if (target) {
        const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
        const top = target.getBoundingClientRect().top + window.scrollY - rem * 7;
        window.scrollTo({ top: Math.max(0, top), behavior: 'instant' as ScrollBehavior });
        return;
      }
      if (performance.now() < deadline) {
        frame = requestAnimationFrame(tryScroll);
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      }
    };

    frame = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}

export function Layout() {
  const { pathname } = useLocation();
  useSmoothScroll();

  // Seul l'accueil ouvre sur un héros sombre plein cadre.
  const overHero = pathname === '/';

  return (
    <>
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>
      <div className="grain" aria-hidden="true" />
      <ScrollToTop />
      <Header overHero={overHero} />
      <main id="contenu" style={{ paddingTop: overHero ? 0 : 'var(--header-h)' }}>
        <PageTransition key={pathname}>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </>
  );
}
