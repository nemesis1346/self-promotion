import React, { useState } from 'react';
import { CONTACT } from '../../content/services';
import { useLang } from '../../content/LangContext';

// The site is static (GitHub Pages), so the form does not send anything itself:
// it opens the visitor's email app with a message to Marco already written.
// Nothing is stored on the site.
export default function ContactForm() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' });

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const service = t.services.items.find((s) => s.id === form.service);
    const lines = [
      form.message.trim(),
      '',
      '—',
      `${t.form.name}: ${form.name.trim()}`,
      `${t.form.email}: ${form.email.trim()}`,
      form.company.trim() ? `${t.form.company}: ${form.company.trim()}` : null,
      `${t.form.service}: ${service ? service.title : t.form.serviceOther}`,
    ].filter((l) => l !== null);
    const subject = `${t.form.mailSubject} ${form.name.trim()}`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
  };

  return (
    <form className="svc-form" onSubmit={onSubmit}>
      <h3>{t.form.title}</h3>
      <div className="svc-form-row">
        <label>
          <span>{t.form.name}</span>
          <input className="browser-default" type="text" required value={form.name} onChange={set('name')} autoComplete="name" />
        </label>
        <label>
          <span>{t.form.email}</span>
          <input className="browser-default" type="email" required value={form.email} onChange={set('email')} autoComplete="email" />
        </label>
      </div>
      <div className="svc-form-row">
        <label>
          <span>{t.form.company}</span>
          <input className="browser-default" type="text" value={form.company} onChange={set('company')} autoComplete="organization" />
        </label>
        <label>
          <span>{t.form.service}</span>
          <select className="browser-default" value={form.service} onChange={set('service')}>
            <option value="">{t.form.servicePlaceholder}</option>
            {t.services.items.map((s) => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
            <option value="other">{t.form.serviceOther}</option>
          </select>
        </label>
      </div>
      <label>
        <span>{t.form.message}</span>
        <textarea className="browser-default" required minLength={20} rows={5} value={form.message} onChange={set('message')} />
        <small>{t.form.messageHint}</small>
      </label>
      <button type="submit" className="svc-btn svc-btn-dark">{t.form.submit}</button>
      <p className="svc-form-note">{t.form.sentNote}</p>
    </form>
  );
}
