import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CONTENT } from '../../content/services';
import { useLang } from '../../content/LangContext';

// Scroll to a section of the services page. From another page, go home first
// and let the services page scroll once it has rendered.
export const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return Boolean(el);
};

export default function SiteHeader() {
  const { lang, setLang, t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onHome = pathname === '/' || pathname === '/services';

  const goTo = (id) => (e) => {
    e.preventDefault();
    setMenuOpen(false);
    if (onHome) scrollToSection(id);
    else navigate('/', { state: { scrollTo: id } });
  };

  const sections = [
    ['services', t.nav.services],
    ['prices', t.nav.prices],
    ['about', t.nav.about],
    ['faq', t.nav.faq],
    ['contact', t.nav.contact],
  ];

  return (
    <header className="svc-header">
      <div className="svc-wrap svc-header-inner">
        <a href="#top" onClick={goTo('top')} className="svc-brand">
          <span className="svc-brand-mark">MM</span>
          <span>Marco Maigua</span>
        </a>
        <button
          className="svc-burger"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span /><span /><span />
        </button>
        <nav className={`svc-nav ${menuOpen ? 'is-open' : ''}`}>
          {sections.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={goTo(id)}>{label}</a>
          ))}
          <Link
            to="/softwareProjectsPage"
            onClick={() => setMenuOpen(false)}
            className={pathname === '/softwareProjectsPage' ? 'is-current' : ''}
          >
            {t.nav.projects}
          </Link>
          <Link
            to="/blogFirebasePage"
            onClick={() => setMenuOpen(false)}
            className={pathname === '/blogFirebasePage' ? 'is-current' : ''}
          >
            {t.nav.blog}
          </Link>
          <div className="svc-lang" role="group" aria-label="Langue / Language">
            {['fr', 'en'].map((l) => (
              <button
                key={l}
                className={l === lang ? 'is-active' : ''}
                aria-pressed={l === lang}
                onClick={() => setLang(l)}
              >
                {CONTENT[l].langLabel}
              </button>
            ))}
          </div>
          <a href="#contact" onClick={goTo('contact')} className="svc-btn svc-btn-dark svc-btn-sm">
            {t.nav.cta}
          </a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const { t } = useLang();
  return (
    <footer className="svc-footer">
      <div className="svc-wrap">{t.footer.replace('{year}', new Date().getFullYear())}</div>
    </footer>
  );
}
