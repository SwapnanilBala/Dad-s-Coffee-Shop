"use client";

import { useCart } from "@/lib/CartContext";
import { useLanguage } from "@/lib/LanguageContext";
import { getMenuItemById } from "@/lib/menuData";
import { formatINR } from "@/lib/currency";

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPricePaise, isCartOpen, setIsCartOpen } = useCart();
  const { t } = useLanguage();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30 z-50"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-pastel-cream z-50 shadow-soft-lg flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-pastel-brown border-opacity-20">
          <h2 className="text-xl font-bold text-text-dark flex items-center gap-2">
            🛒 {t.cart.title}
            {totalItems > 0 && (
              <span className="text-sm font-normal bg-pastel-pink px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-text-muted hover:bg-pastel-pink transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <span className="text-5xl">☕</span>
              <p className="text-text-muted">{t.cart.empty}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const menuItem = getMenuItemById(item.itemId);
                const itemName = t.menuData.items[item.itemId]?.name ?? item.itemId;

                return (
                  <div
                    key={item.cartId}
                    className="bg-white rounded-2xl p-4 shadow-soft flex gap-4"
                  >
                    <div className="text-3xl flex-shrink-0">
                      {menuItem?.emoji ?? "☕"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-text-dark text-sm truncate">
                        {itemName}
                      </h4>
                      <div className="text-xs text-text-muted mt-1 space-x-2">
                        {item.size !== "default" && (
                          <span className="bg-pastel-peach px-2 py-0.5 rounded-full">
                            {t.menuData.sizes[item.size] ?? item.size}
                          </span>
                        )}
                        {item.milk !== "none" && item.milk !== "default" && (
                          <span className="bg-pastel-lavender px-2 py-0.5 rounded-full">
                            {t.menuData.milkOptions[item.milk] ?? item.milk}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                            className="w-7 h-7 rounded-full bg-pastel-pink flex items-center justify-center text-text-dark font-bold text-sm hover:bg-pastel-brown hover:text-white transition-colors"
                          >
                            −
                          </button>
                          <span className="text-sm font-semibold text-text-dark w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                            className="w-7 h-7 rounded-full bg-pastel-pink flex items-center justify-center text-text-dark font-bold text-sm hover:bg-pastel-brown hover:text-white transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-semibold text-text-dark text-sm">
                          {formatINR(item.unitPricePaise * item.quantity)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.cartId)}
                      className="text-text-muted hover:text-red-400 transition-colors self-start text-sm"
                      aria-label="Remove item"
                    >
                      🗑
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-pastel-brown border-opacity-20 px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-text-muted font-medium">{t.cart.total}</span>
              <span className="text-xl font-bold text-text-dark">
                {formatINR(totalPricePaise)}
              </span>
            </div>
            <button className="w-full py-4 bg-gradient-to-r from-amber-800 to-amber-700 text-white rounded-full font-semibold hover:from-amber-900 hover:to-amber-800 transition-all shadow-soft text-center">
              {t.cart.checkout}
            </button>
            <button
              onClick={clearCart}
              className="w-full py-2 text-text-muted text-sm hover:text-red-400 transition-colors text-center"
            >
              {t.cart.clear}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
