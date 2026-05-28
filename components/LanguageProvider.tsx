"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "id" | "en";

interface LangContextProps {
  lang: Lang;
  toggle: () => void;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangContextProps | null>(null);
const STORAGE_KEY = "bp-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("id");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved === "id" || saved === "en") {
      setLangState(saved);
      return;
    }
    // Auto-detect from browser language
    const browserLang = navigator.language?.toLowerCase() ?? "id";
    setLangState(browserLang.startsWith("id") ? "id" : "en");
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
  };

  const toggle = () => setLang(lang === "id" ? "en" : "id");

  return (
    <LangContext.Provider value={{ lang, toggle, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
