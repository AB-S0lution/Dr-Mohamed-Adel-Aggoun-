import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { RouteSkeleton } from './components/ui/RouteSkeleton';
import Home from './pages/Home';

// L'accueil part avec le document ; le reste arrive au clic. Le premier
// rendu n'embarque donc pas la FAQ, les articles ni le formulaire.
const Cabinet = lazy(() => import('./pages/Cabinet'));
const Specialites = lazy(() => import('./pages/Specialites'));
const Conseils = lazy(() => import('./pages/Conseils'));
const Article = lazy(() => import('./pages/Article'));
const Faq = lazy(() => import('./pages/Faq'));
const Horaires = lazy(() => import('./pages/Horaires'));
const Contact = lazy(() => import('./pages/Contact'));
const MentionsLegales = lazy(() => import('./pages/MentionsLegales'));
const Confidentialite = lazy(() => import('./pages/Confidentialite'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="*"
          element={
            <Suspense fallback={<RouteSkeleton />}>
              <Routes>
                <Route path="le-cabinet" element={<Cabinet />} />
                <Route path="specialites" element={<Specialites />} />
                <Route path="conseils-sante" element={<Conseils />} />
                <Route path="conseils-sante/:slug" element={<Article />} />
                <Route path="faq" element={<Faq />} />
                <Route path="horaires-acces" element={<Horaires />} />
                <Route path="contact" element={<Contact />} />
                <Route path="mentions-legales" element={<MentionsLegales />} />
                <Route path="confidentialite" element={<Confidentialite />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
