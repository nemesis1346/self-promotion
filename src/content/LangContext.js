import React, { createContext, useContext, useEffect, useState } from 'react';
import { CONTENT } from './services';

// Site language: French by default, English on request. The choice is kept in localStorage.
const LANG_KEY = 'mm-site-lang';
const DEFAULT_LANG = 'fr';

const LangContext = createContext({ lang: DEFAULT_LANG, setLang: () => {}, t: CONTENT[DEFAULT_LANG] });

const initialLang = () => {
  const saved = window.localStorage.getItem(LANG_KEY);
  return saved === 'en' || saved === 'fr' ? saved : DEFAULT_LANG;
};

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    window.localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  return <LangContext.Provider value={{ lang, setLang, t: CONTENT[lang] }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
