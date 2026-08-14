"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import SignUpModal from "./SignUpModal";
import LanguageSwitcher from "./LanguageSwitcher";
import CartDrawer from "./CartDrawer";
import ProductDetailModal from "./ProductDetailModal";
import { useLanguage } from "@/lib/LanguageContext";
import { useCart } from "@/lib/CartContext";
import { menuItems, MenuItem } from "@/lib/menuData";
import { formatINR } from "@/lib/currency";

export default function Navbar() {
  const { t } = useLanguage();
  const { totalItems, setIsCartOpen } = useCart();
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const navItems = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.menu, href: "/menu" },
    { label: t.nav.order, href: "/menu" },
    { label: t.nav.rewards, href: "#" },
    { label: t.nav.about, href: "#" },
  ];

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return menuItems.filter((item) => {
      const name = t.menuData.items[item.id]?.name ?? item.id;
      const desc = t.menuData.items[item.id]?.desc ?? "";
      return name.toLowerCase().includes(q) || desc.toLowerCase().includes(q) || item.id.includes(q);
    }).slice(0, 6);
  }, [searchQuery, t]);

  const handleSearchItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setShowSearch(false);
    setSearchQuery("");
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-pastel-cream bg-opacity-95 backdrop-blur-md border-b border-pastel-brown border-opacity-10 shadow-soft">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-700 to-amber-900 rounded-full flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform">
              <span className="text-2xl">☕</span>
            </div>
            <span className="font-bold text-lg text-text-dark hidden sm:inline">CoffeeBliss</span>
          </div>

          {/* Center Navigation */}
          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-text-muted hover:text-pastel-brown transition-colors font-medium text-sm relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pastel-brown group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            {/* Search Button */}
            <div className="relative">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="w-11 h-11 bg-white bg-opacity-60 hover:bg-pastel-peach rounded-2xl flex items-center justify-center shadow-soft hover:shadow-soft-lg transition-all transform hover:-translate-y-0.5 border border-pastel-brown border-opacity-20 group"
                aria-label="Search"
              >
                <svg className="w-5 h-5 text-text-dark group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              {showSearch && (
                <div className="absolute right-0 top-14 w-80 bg-white rounded-2xl shadow-soft-lg p-3 border border-pastel-brown border-opacity-20 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center gap-2 bg-pastel-cream rounded-xl px-4 py-2">
                    <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t.nav.searchPlaceholder}
                      className="flex-1 bg-transparent text-text-dark placeholder-text-muted focus:outline-none text-sm"
                      autoFocus
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery("")} className="text-text-muted hover:text-text-dark text-xs">✕</button>
                    )}
                  </div>

                  {/* Search Results */}
                  {searchQuery.trim() ? (
                    <div className="mt-3 max-h-64 overflow-y-auto">
                      {searchResults.length > 0 ? (
                        <div className="space-y-1">
                          {searchResults.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => handleSearchItemClick(item)}
                              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-pastel-cream transition-colors text-left"
                            >
                              <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-text-dark truncate">
                                  {t.menuData.items[item.id]?.name ?? item.id}
                                </p>
                                <p className="text-xs text-text-muted truncate">
                                  {t.menuData.items[item.id]?.desc ?? ""}
                                </p>
                              </div>
                              <span className="text-sm font-semibold text-pastel-brown flex-shrink-0">
                                {formatINR(item.basePricePaise)}
                              </span>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-text-muted text-center py-4">{t.search.noResults}</p>
                      )}
                    </div>
                  ) : (
                    <div className="mt-3 px-2">
                      <p className="text-xs text-text-muted mb-2">{t.nav.popularSearches}</p>
                      <div className="flex flex-wrap gap-2">
                        {t.nav.tags.map((tag) => (
                          <span
                            key={tag}
                            onClick={() => setSearchQuery(tag)}
                            className="px-3 py-1 bg-pastel-peach text-text-dark text-xs rounded-full cursor-pointer hover:bg-pastel-brown hover:text-white transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative w-11 h-11 bg-gradient-to-br from-pastel-pink to-pastel-peach rounded-2xl flex items-center justify-center shadow-soft hover:shadow-soft-lg transition-all transform hover:-translate-y-0.5 border border-pastel-brown border-opacity-20 group"
              aria-label="Shopping Cart"
            >
              <svg className="w-5 h-5 text-text-dark group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gradient-to-br from-amber-700 to-amber-900 text-white text-xs text-center rounded-full font-bold flex items-center justify-center shadow-soft border-2 border-pastel-cream animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Profile / Sign Up Button */}
            <button
              onClick={() => setShowSignUp(true)}
              className="flex items-center gap-2 h-11 px-3 bg-gradient-to-br from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 rounded-2xl shadow-soft hover:shadow-soft-lg transition-all transform hover:-translate-y-0.5 group"
              aria-label="Sign Up"
            >
              <div className="w-7 h-7 bg-pastel-cream rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="text-white text-sm font-semibold pr-1 hidden sm:inline">{t.nav.signUp}</span>
            </button>

            {/* Language Switcher - placed right next to Sign Up */}
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      {showSignUp && <SignUpModal onClose={() => setShowSignUp(false)} />}
      {selectedItem && (
        <ProductDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
      <CartDrawer />
    </>
  );
}
