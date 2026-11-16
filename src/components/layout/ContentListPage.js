import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../content/LangContext';

// Shared layout for the Projects, Web design and Blog pages, in the site's light theme.
export default function ContentListPage({ title, subtitle, items, loading, error, renderItem }) {
  const { t } = useLang();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let body;
  if (loading) {
    body = <p className="svc-status">{t.pages.loading}</p>;
  } else if (items && items.length > 0) {
    body = <div className="svc-grid">{items.map(renderItem)}</div>;
  } else {
    body = <p className="svc-status svc-status-error">{error ? t.pages.error : t.pages.empty}</p>;
  }

  return (
    <div className="svc-page">
      <section className="svc-section svc-list-page">
        <div className="svc-wrap">
          <h1 className="svc-page-title">{title}</h1>
          <p className="svc-sub">{subtitle}</p>
          {body}
          <div className="svc-list-cta">
            <p>{t.pages.contactCta}</p>
            <Link to="/" state={{ scrollTo: 'contact' }} className="svc-btn svc-btn-dark">
              {t.nav.cta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
