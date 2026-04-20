"use client";

import { useState } from "react";
import { useCart } from "@/lib/CartContext";
import { useLanguage } from "@/lib/LanguageContext";
import {
  MenuItem,
  sizes,
  milkOptions,
  sugarLevels,
  extras,
  calculateItemPrice,
} from "@/lib/menuData";

interface ProductDetailModalProps {
  item: MenuItem;
  onClose: () => void;
}

export default function ProductDetailModal({ item, onClose }: ProductDetailModalProps) {
  const { addItem } = useCart();
  const { t } = useLanguage();

  const [selectedSize, setSelectedSize] = useState(item.hasSizes ? "medium" : "default");
  const [selectedMilk, setSelectedMilk] = useState(item.hasMilk ? "regular" : "default");
  const [selectedSugar, setSelectedSugar] = useState(item.hasSugar ? "regular" : "default");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const toggleExtra = (extraId: string) => {
    setSelectedExtras((prev) =>
      prev.includes(extraId) ? prev.filter((e) => e !== extraId) : [...prev, extraId]
    );
  };

  const currentPrice = calculateItemPrice(item, selectedSize, selectedMilk, selectedExtras);

  const handleAddToCart = () => {
    addItem({
      itemId: item.id,
      size: selectedSize,
      milk: selectedMilk,
      sugar: selectedSugar,
      extras: selectedExtras,
      unitPrice: currentPrice,
    });
    onClose();
  };

  const itemName = t.menuData.items[item.id]?.name ?? item.id;
  const itemDesc = t.menuData.items[item.id]?.desc ?? "";

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-40 z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-pastel-cream rounded-3xl shadow-soft-lg w-full max-w-lg max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-b from-pastel-peach to-pastel-cream rounded-t-3xl p-8 text-center relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white bg-opacity-80 flex items-center justify-center text-text-muted hover:bg-pastel-pink transition-colors"
            >
              ✕
            </button>
            <div className="text-6xl mb-4">{item.emoji}</div>
            <h2 className="text-2xl font-bold text-text-dark">{itemName}</h2>
            {itemDesc && (
              <p className="text-text-muted mt-2 text-sm">{itemDesc}</p>
            )}
            <p className="text-pastel-brown font-bold text-lg mt-2">
              ${item.basePrice.toFixed(2)}
            </p>
          </div>

          {/* Options */}
          <div className="p-6 space-y-6">
            {/* Size */}
            {item.hasSizes && (
              <div>
                <h3 className="font-semibold text-text-dark mb-3 text-sm">
                  {t.productDetail.size}
                </h3>
                <div className="flex gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.id)}
                      className={`flex-1 py-3 rounded-2xl text-sm font-medium transition-all border-2 ${
                        selectedSize === size.id
                          ? "bg-gradient-to-br from-amber-700 to-amber-900 text-white border-transparent shadow-soft"
                          : "bg-white text-text-dark border-pastel-brown border-opacity-20 hover:border-pastel-brown"
                      }`}
                    >
                      <div>{t.menuData.sizes[size.id]}</div>
                      {size.priceAdd > 0 && (
                        <div className="text-xs opacity-75 mt-0.5">
                          +${size.priceAdd.toFixed(2)}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Milk */}
            {item.hasMilk && (
              <div>
                <h3 className="font-semibold text-text-dark mb-3 text-sm">
                  {t.productDetail.milk}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {milkOptions.map((milk) => (
                    <button
                      key={milk}
                      onClick={() => setSelectedMilk(milk)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all border-2 ${
                        selectedMilk === milk
                          ? "bg-pastel-lavender text-text-dark border-pastel-brown border-opacity-40"
                          : "bg-white text-text-muted border-pastel-brown border-opacity-10 hover:border-opacity-30"
                      }`}
                    >
                      {t.menuData.milkOptions[milk]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sugar */}
            {item.hasSugar && (
              <div>
                <h3 className="font-semibold text-text-dark mb-3 text-sm">
                  {t.productDetail.sugar}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {sugarLevels.map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedSugar(level)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all border-2 ${
                        selectedSugar === level
                          ? "bg-pastel-mint text-text-dark border-pastel-brown border-opacity-40"
                          : "bg-white text-text-muted border-pastel-brown border-opacity-10 hover:border-opacity-30"
                      }`}
                    >
                      {t.menuData.sugarLevels[level]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Extras */}
            {item.hasExtras && (
              <div>
                <h3 className="font-semibold text-text-dark mb-3 text-sm">
                  {t.productDetail.extras}
                </h3>
                <div className="space-y-2">
                  {extras.map((extra) => {
                    const selected = selectedExtras.includes(extra.id);
                    return (
                      <button
                        key={extra.id}
                        onClick={() => toggleExtra(extra.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm transition-all border-2 ${
                          selected
                            ? "bg-pastel-pink text-text-dark border-pastel-brown border-opacity-30"
                            : "bg-white text-text-muted border-pastel-brown border-opacity-10 hover:border-opacity-20"
                        }`}
                      >
                        <span className="font-medium">
                          {selected ? "✓ " : ""}
                          {t.menuData.extras[extra.id]}
                        </span>
                        <span className="text-text-muted">+${extra.price.toFixed(2)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Add to Cart */}
          <div className="p-6 pt-0">
            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-gradient-to-r from-amber-800 to-amber-700 text-white rounded-full font-semibold hover:from-amber-900 hover:to-amber-800 transition-all shadow-soft text-center text-lg"
            >
              {t.productDetail.addToCart} — ${currentPrice.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
