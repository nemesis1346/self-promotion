import React from 'react';
import { useLang } from '../../content/LangContext';

const firstImage = (html) => {
  const doc = new DOMParser().parseFromString(html || '', 'text/html');
  const img = doc.querySelector('img');
  return img ? img.src : null;
};

const formatDate = (value, lang) => {
  const d = new Date((value || '').replace(' ', 'T'));
  if (isNaN(d)) return value;
  return d.toLocaleDateString(lang === 'fr' ? 'fr-CA' : 'en-CA', { year: 'numeric', month: 'long', day: 'numeric' });
};

export default function BlogCard({ post }) {
  const { t, lang } = useLang();
  const thumbnail = post.thumbnail || firstImage(post.content);

  return (
    <article className="svc-item">
      {thumbnail && (
        <a className="svc-item-img" href={post.link} target="_blank" rel="noopener noreferrer">
          <img src={thumbnail} alt="" loading="lazy" />
        </a>
      )}
      <div className="svc-item-body">
        <p className="svc-when">{formatDate(post.pubDate, lang)}</p>
        <h3>{post.title}</h3>
        <div className="svc-item-links">
          <a href={post.link} target="_blank" rel="noopener noreferrer" className="svc-btn svc-btn-sm svc-btn-dark">
            {t.pages.readMore}
          </a>
        </div>
      </div>
    </article>
  );
}
