"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { useCart } from "@/lib/CartContext";
import { menuItems, MenuItem, calculateItemPrice } from "@/lib/menuData";
import ProductDetailModal from "./ProductDetailModal";

export default function QuickOrderPanel() {
  const { t } = useLanguage();
  const { addItem } = useCart();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Show first 4 items (the original quick-order drinks)
  const quickItems = menuItems.slice(0, 4);

  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      itemId: item.id,
      size: item.hasSizes ? "medium" : "default",
      milk: item.hasMilk ? "regular" : "default",
      sugar: item.hasSugar ? "regular" : "default",
      extras: [],
      unitPrice: calculateItemPrice(item, "medium", "regular", []),
    });
  };

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-text-dark mb-12 text-center">
          {t.order.title}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {quickItems.map((item) => {
            const itemName = t.menuData.items[item.id]?.name ?? item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="bg-gradient-to-b from-pastel-cream to-pastel-peach rounded-3xl p-6 shadow-soft hover:shadow-soft-lg transition-all transform hover:-translate-y-2 group cursor-pointer"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="text-5xl group-hover:scale-110 transition-transform">{item.emoji}</div>
                  <div className="text-center">
                    <h3 className="font-bold text-text-dark text-lg">{itemName}</h3>
                    <p className="text-text-muted font-semibold">${item.basePrice.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={(e) => handleQuickAdd(item, e)}
                    className="w-12 h-12 bg-pastel-pink rounded-full flex items-center justify-center text-text-dark font-bold text-xl hover:bg-pastel-brown hover:text-white transition-all transform group-hover:scale-110"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/menu"
            className="inline-block px-8 py-4 bg-gradient-to-r from-amber-800 to-amber-700 text-white rounded-full font-semibold hover:from-amber-900 hover:to-amber-800 transition-all shadow-soft hover:shadow-soft-lg transform hover:-translate-y-1"
          >
            {t.menu.title} →
          </Link>
        </div>
      </div>

      {selectedItem && (
        <ProductDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </section>
  );
}
