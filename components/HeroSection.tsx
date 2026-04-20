"use client";

import Link from "next/link";
import { DeliveryWidget } from "./DeliveryWidget";
import { useLanguage } from "@/lib/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-gradient-to-r from-pastel-cream via-pastel-peach to-pastel-cream py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text & Buttons */}
          <div className="fade-in-up space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-text-dark leading-tight">
              {t.hero.headline} <span className="text-pastel-pink">{t.hero.highlight}</span>
            </h1>

            <p className="text-lg text-text-muted max-w-md">
              {t.hero.subtext}
            </p>

            {/* Delivery Widget */}
            <DeliveryWidget />

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/menu"
                className="px-8 py-4 bg-gradient-to-r from-amber-800 to-amber-700 text-white rounded-full font-semibold hover:from-amber-900 hover:to-amber-800 transition-all hover:shadow-soft-lg transform hover:-translate-y-1 shadow-soft text-center"
              >
                {t.hero.startOrdering}
              </Link>
              <button className="px-8 py-4 bg-pastel-pink text-text-dark rounded-full font-semibold hover:bg-red-200 transition-all hover:shadow-soft-lg transform hover:-translate-y-1 border-2 border-pastel-pink">
                {t.hero.seeOffers}
              </button>
            </div>
          </div>

          {/* Right Side - Illustration */}
          <div className="flex justify-center">
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-40 h-48 bg-gradient-to-b from-pastel-peach to-pastel-brown rounded-b-3xl rounded-t-lg shadow-soft-lg border-4 border-pastel-brown flex items-center justify-center">
                    <div className="w-32 h-32 bg-gradient-to-b from-amber-700 to-amber-900 rounded-full opacity-60"></div>
                  </div>
                  <div className="absolute right-0 top-16 w-16 h-24 border-4 border-pastel-brown rounded-r-2xl"></div>
                  <div className="absolute top-0 left-8 float">
                    <div className="text-4xl">💨</div>
                  </div>
                  <div className="absolute top-0 right-12 float" style={{ animationDelay: "0.3s" }}>
                    <div className="text-4xl">💨</div>
                  </div>
                  <div className="absolute top-8 left-12 animate-pulse">
                    <div className="text-2xl">🤍</div>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-pastel-pink rounded-full opacity-40 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-pastel-lavender rounded-full opacity-30 blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
