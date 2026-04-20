"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function QuickOrderPanel() {
  const { t } = useLanguage();
  const emojis = ["☕", "🥛", "🍶", "🍫"];

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-text-dark mb-12 text-center">
          {t.order.title}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {t.order.drinks.map((drink, i) => (
            <div
              key={i}
              className="bg-gradient-to-b from-pastel-cream to-pastel-peach rounded-3xl p-6 shadow-soft hover:shadow-soft-lg transition-all transform hover:-translate-y-2 group cursor-pointer"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="text-5xl">{emojis[i]}</div>
                <div className="text-center">
                  <h3 className="font-bold text-text-dark text-lg">{drink.name}</h3>
                  <p className="text-text-muted font-semibold">{drink.price}</p>
                </div>
                <button className="w-12 h-12 bg-pastel-pink rounded-full flex items-center justify-center text-text-dark font-bold text-xl hover:bg-pastel-brown hover:text-white transition-all transform group-hover:scale-110">
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
