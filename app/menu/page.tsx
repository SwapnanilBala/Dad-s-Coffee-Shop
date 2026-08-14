"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetailModal from "@/components/ProductDetailModal";
import { useLanguage } from "@/lib/LanguageContext";
import { categories, getMenuItemsByCategory, MenuItem } from "@/lib/menuData";
import { formatINR } from "@/lib/currency";

export default function MenuPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const itemsInCategory = getMenuItemsByCategory(activeCategory);

  return (
    <div className="min-h-screen bg-pastel-cream">
      <Navbar />

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
              {t.menu.title}
            </h1>
            <p className="text-text-muted text-lg max-w-md mx-auto">
              {t.menu.subtitle}
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-amber-800 to-amber-700 text-white shadow-soft"
                    : "bg-white text-text-muted hover:bg-pastel-peach border border-pastel-brown border-opacity-20"
                }`}
              >
                {t.menu.categories[cat]}
              </button>
            ))}
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {itemsInCategory.map((item) => {
              const itemName = t.menuData.items[item.id]?.name ?? item.id;
              const itemDesc = t.menuData.items[item.id]?.desc ?? "";

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="bg-gradient-to-b from-white to-pastel-cream rounded-3xl p-6 shadow-soft hover:shadow-soft-lg transition-all transform hover:-translate-y-2 cursor-pointer group"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="text-5xl group-hover:scale-110 transition-transform">
                      {item.emoji}
                    </div>
                    <div className="text-center">
                      <h3 className="font-bold text-text-dark text-lg">
                        {itemName}
                      </h3>
                      {itemDesc && (
                        <p className="text-text-muted text-xs mt-1 line-clamp-2">
                          {itemDesc}
                        </p>
                      )}
                      <p className="text-pastel-brown font-semibold mt-2">
                        {formatINR(item.basePricePaise)}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItem(item);
                      }}
                      className="w-12 h-12 bg-pastel-pink rounded-full flex items-center justify-center text-text-dark font-bold text-xl hover:bg-pastel-brown hover:text-white transition-all transform group-hover:scale-110"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />

      {selectedItem && (
        <ProductDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}
