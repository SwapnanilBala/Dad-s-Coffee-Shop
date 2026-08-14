"use client";

import { createContext, useContext, useCallback, useEffect, ReactNode } from "react";
import { Language, translations, TranslationKeys } from "./translations";
import { usePersistentState } from "./usePersistentState";

const LANGUAGE_STORAGE_KEY = "coffeebliss-lang";
const SUPPORTED: readonly Language[] = ["en", "bn", "hi"];

function isSupported(value: unknown): value is Language {
  return typeof value === "string" && (SUPPORTED as readonly string[]).includes(value);
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Earlier builds stored this as a bare string rather than JSON. Those entries
  // fail to parse and fall back to English once, then heal on the next switch.
  const [stored, setStored] = usePersistentState<Language>(LANGUAGE_STORAGE_KEY, "en");
  const language = isSupported(stored) ? stored : "en";

  const setLanguage = useCallback(
    (lang: Language) => {
      if (isSupported(lang)) setStored(lang);
    },
    [setStored]
  );

  // Keep the document language in step so assistive technology applies the right
  // pronunciation rules. This runs on first load as well as on every switch —
  // previously it was only set when the user actively changed language, so a
  // returning Bengali or Hindi visitor got that content announced as English.
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
