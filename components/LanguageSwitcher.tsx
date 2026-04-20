"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { languages, Language } from "@/lib/translations";

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = languages[language];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 h-11 px-3 bg-gradient-to-br from-pastel-lavender to-pastel-pink hover:from-pastel-pink hover:to-pastel-peach rounded-2xl shadow-soft hover:shadow-soft-lg transition-all transform hover:-translate-y-0.5 border border-pastel-brown border-opacity-20 group"
        aria-label={t.language.select}
      >
        {/* Globe Icon with animation */}
        <div className="relative">
          <svg className="w-5 h-5 text-text-dark group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <span className="text-text-dark text-sm font-bold hidden sm:inline">{currentLang.code}</span>
        {/* Flag indicator */}
        <div className="flex items-center gap-1">
          <span className="text-base">{currentLang.flag}</span>
          <svg
            className={`w-3 h-3 text-text-dark transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-14 w-64 bg-gradient-to-br from-pastel-cream to-white rounded-3xl shadow-soft-lg border border-pastel-brown border-opacity-20 overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-pastel-pink to-pastel-lavender px-4 py-3 border-b border-pastel-brown border-opacity-10">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌍</span>
              <h4 className="font-bold text-text-dark text-sm">{t.language.select}</h4>
            </div>
          </div>

          {/* Language Options */}
          <div className="p-2">
            {(Object.keys(languages) as Language[]).map((key) => {
              const lang = languages[key];
              const isActive = language === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setLanguage(key);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all transform hover:-translate-x-1 ${
                    isActive
                      ? "bg-gradient-to-r from-pastel-peach to-pastel-pink shadow-soft"
                      : "hover:bg-pastel-cream"
                  }`}
                >
                  {/* Flag */}
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-soft transition-all ${
                      isActive ? "bg-white" : "bg-pastel-cream"
                    }`}
                  >
                    {lang.flag}
                  </div>

                  {/* Text */}
                  <div className="flex-1 text-left">
                    <div className="text-text-dark font-bold text-sm">{lang.nativeName}</div>
                    <div className="text-text-muted text-xs">{lang.name}</div>
                  </div>

                  {/* Check Mark */}
                  {isActive && (
                    <div className="w-7 h-7 bg-gradient-to-br from-amber-700 to-amber-900 rounded-full flex items-center justify-center shadow-soft">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="bg-pastel-cream bg-opacity-50 px-4 py-2 border-t border-pastel-brown border-opacity-10">
            <p className="text-xs text-text-muted text-center flex items-center justify-center gap-1">
              <span>☕</span>
              <span className="font-semibold">CoffeeBliss</span>
              <span>•</span>
              <span>3 languages</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
