import { useEffect } from 'react';
import { SITE } from '../../data/site';

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Le site est une SPA : le titre et la description doivent suivre la
 * route, sinon chaque page partage les métadonnées de l'accueil.
 */
export function Seo({
  title,
  description,
  canonicalPath,
}: {
  title: string;
  description: string;
  canonicalPath?: string;
}) {
  useEffect(() => {
    const full = `${title} | ${SITE.brandName}`;
    document.title = full;
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', full);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);

    if (canonicalPath) {
      const href = `${window.location.origin}${import.meta.env.BASE_URL.replace(/\/$/, '')}${canonicalPath}`;
      let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = href;
      setMeta('meta[property="og:url"]', 'property', 'og:url', href);
    }
  }, [title, description, canonicalPath]);

  return null;
}
