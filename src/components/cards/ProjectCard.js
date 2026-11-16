import React from 'react';
import { useLang } from '../../content/LangContext';

// Project texts come from Firestore in English (and Spanish); the French site shows the English text.
export default function ProjectCard({ project }) {
  const { t } = useLang();
  const title = project.titleEnglish;
  const text = project.textEnglish;
  const links = [
    [project.urlProject, t.pages.seeProject],
    [project.urlGithub, t.pages.github],
    [project.urlFile, t.pages.docs],
    [project.urlExecutable, t.pages.apk],
  ].filter(([url]) => url && url !== '');

  return (
    <article className="svc-item">
      {project.imageUrl && (
        <a className="svc-item-img" href={project.urlProject || project.urlGithub || undefined} target="_blank" rel="noopener noreferrer">
          <img src={project.imageUrl} alt={title || ''} loading="lazy" />
        </a>
      )}
      <div className="svc-item-body">
        <h3>{title}</h3>
        {text && <p>{text}</p>}
        {links.length > 0 && (
          <div className="svc-item-links">
            {links.map(([url, label], i) => (
              <a key={label} href={url} target="_blank" rel="noopener noreferrer" className={`svc-btn svc-btn-sm ${i === 0 ? 'svc-btn-dark' : 'svc-btn-ghost'}`}>
                {label}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
