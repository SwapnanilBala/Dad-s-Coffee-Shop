"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

export function DeliveryWidget() {
  const { language, t } = useLanguage();
  const [time, setTime] = useState<string>("");

  const localeMap = { en: "en-US", bn: "bn-BD", hi: "hi-IN" };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString(localeMap[language], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [language]);

  const today = new Date().toLocaleDateString(localeMap[language], {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="inline-flex items-center gap-3 bg-white bg-opacity-60 px-6 py-3 rounded-full shadow-soft border border-pastel-brown border-opacity-20">
      <svg className="w-5 h-5 text-text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <div className="text-sm">
        <div className="font-semibold text-text-dark">{today} • {time}</div>
        <div className="text-xs text-text-muted">{t.hero.estimatedDelivery}</div>
      </div>
    </div>
  );
}
