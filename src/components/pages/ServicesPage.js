import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfessionalImage } from '../../actions/professionalFirebaseActions';
import { CONTACT, PRICES_ARE_DRAFT } from '../../content/services';
import { useLang } from '../../content/LangContext';
import { scrollToSection } from '../navigation/SiteHeader';
import ContactForm from './ContactForm';
import '../styles/servicesPage.css';

const goTo = (id) => (e) => {
  e.preventDefault();
  scrollToSection(id);
};

function ServicesPage({ photo, getProfessionalImage }) {
  const { t } = useLang();
  const [openFaq, setOpenFaq] = useState(null);
  const location = useLocation();

  useEffect(() => {
    getProfessionalImage();
  }, [getProfessionalImage]);

  // Coming from another page through a header link: scroll to the asked section.
  useEffect(() => {
    const id = location.state && location.state.scrollTo;
    if (id) setTimeout(() => scrollToSection(id), 50);
    else window.scrollTo(0, 0);
  }, [location]);

  const priceFor = (key) => t.prices.steps.find((s) => s.key === key);
  const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(t.contact.mailSubject)}&body=${encodeURIComponent(t.contact.mailBody)}`;

  return (
    <div className="svc-page">
      {/* Hero */}
      <section id="top" className="svc-hero">
        <div className="svc-wrap svc-hero-grid">
          <div>
            <p className="svc-eyebrow">{t.hero.eyebrow}</p>
            <h1>
              {t.hero.title} <span className="svc-accent">{t.hero.titleAccent}</span>
            </h1>
            <p className="svc-lead">{t.hero.lead}</p>
            <div className="svc-actions">
              <a href="#contact" onClick={goTo('contact')} className="svc-btn svc-btn-dark">{t.hero.primary}</a>
              <a href="#prices" onClick={goTo('prices')} className="svc-btn svc-btn-ghost">{t.hero.secondary}</a>
            </div>
            <ul className="svc-tags">
              {t.hero.tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
          </div>
          <div className="svc-hero-photo">
            {photo ? <img src={photo} alt="Marco Maigua" /> : <span className="svc-initials">MM</span>}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="svc-section">
        <div className="svc-wrap">
          <h2>{t.services.title}</h2>
          <p className="svc-sub">{t.services.subtitle}</p>
          <div className="svc-cards">
            {t.services.items.map((s) => {
              const p = priceFor(s.priceKey);
              return (
                <article key={s.id} className="svc-card">
                  <p className="svc-kicker">— {s.kicker}</p>
                  <h3>{s.title}</h3>
                  <p className="svc-tagline">{s.tagline}</p>
                  <p>{s.description}</p>
                  <p className="svc-included-label">{t.services.includedLabel}</p>
                  <ul className="svc-checks">
                    {s.included.map((i) => <li key={i}>{i}</li>)}
                  </ul>
                  <p className="svc-stack">{s.stack}</p>
                  {p && (
                    <p className="svc-card-price">
                      <span>{t.services.fromLabel}</span> <strong>{p.price}</strong>
                      {PRICES_ARE_DRAFT && <em className="svc-draft-tag">draft</em>}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Prices */}
      <section id="prices" className="svc-section svc-section-panel">
        <div className="svc-wrap">
          {PRICES_ARE_DRAFT && <p className="svc-draft-banner">{t.prices.draftBanner}</p>}
          <h2 className="svc-center">{t.prices.title}</h2>
          <p className="svc-sub svc-center">{t.prices.subtitle}</p>
          <ol className="svc-steps">
            {t.prices.steps.map((s, i) => (
              <li key={s.key} className="svc-step">
                <span className="svc-step-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="svc-step-name">{s.name}</span>
                <span className="svc-step-price">
                  {s.from && <small>{t.services.fromLabel} </small>}
                  {s.price}
                  {s.unit && <small>{s.unit}</small>}
                </span>
                <span className="svc-step-detail">{s.detail}</span>
              </li>
            ))}
          </ol>
          <p className="svc-note">{t.prices.hourly}</p>
          <p className="svc-note">{t.prices.note}</p>
        </div>
      </section>

      {/* About */}
      <section id="about" className="svc-section">
        <div className="svc-wrap svc-about-grid">
          <div>
            <h2>{t.about.title}</h2>
            <p className="svc-sub">{t.about.subtitle}</p>
            {t.about.paragraphs.map((p) => <p key={p}>{p}</p>)}
            <h3 className="svc-h3">{t.about.credentialsTitle}</h3>
            <ul className="svc-checks">
              {t.about.credentials.map((c) => <li key={c}>{c}</li>)}
            </ul>
            <a href={CONTACT.cv} target="_blank" rel="noopener noreferrer" className="svc-btn svc-btn-ghost">
              {t.about.cvLabel}
            </a>
          </div>
          <div>
            <h3 className="svc-h3">{t.about.experienceTitle}</h3>
            <ol className="svc-timeline">
              {t.about.experience.map((x) => (
                <li key={x.who + x.when}>
                  <span className="svc-when">{x.when}</span>
                  <strong>{x.who}</strong>
                  <p>{x.what}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="svc-section">
        <div className="svc-wrap svc-faq-grid">
          <h2>{t.faq.title}</h2>
          <div>
            {t.faq.items.map((f, i) => (
              <div key={f.q} className={`svc-faq ${openFaq === i ? 'is-open' : ''}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                  <span>{f.q}</span>
                  <span className="svc-plus" aria-hidden="true">+</span>
                </button>
                {openFaq === i && <p>{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="svc-section">
        <div className="svc-wrap">
          <div className="svc-contact">
            <div className="svc-contact-intro">
              <h2>{t.contact.title}</h2>
              <p className="svc-sub">{t.contact.subtitle}</p>
              <a href={mailto} className="svc-btn svc-btn-dark">{t.contact.emailCta}</a>
              <ul className="svc-contact-list">
                <li><span>Email</span><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
                <li><span>{t.form.phoneLabel}</span><a href={CONTACT.phoneHref}>{CONTACT.phone}</a></li>
              </ul>
              <p className="svc-or">{t.contact.or}</p>
              <div className="svc-socials">
                <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href={CONTACT.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href={CONTACT.medium} target="_blank" rel="noopener noreferrer">Medium</a>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

    </div>
  );
}

const mapStateToProps = (state) => ({
  photo: state.professionalPageReducer.professionalProfilePhoto,
});

export default connect(mapStateToProps, { getProfessionalImage })(ServicesPage);
