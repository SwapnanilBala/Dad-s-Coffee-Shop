"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const sections = [t.footer.sections.company, t.footer.sections.support, t.footer.sections.legal, t.footer.sections.follow];

  return (
    <footer className="bg-gradient-to-b from-pastel-peach to-pastel-cream py-16 px-6 border-t border-pastel-brown border-opacity-20">
      <div className="max-w-7xl mx-auto">
        {/* Rewards Banner */}
        <div className="bg-gradient-to-r from-pastel-pink to-pastel-lavender rounded-3xl p-8 mb-16 shadow-soft text-center">
          <h3 className="text-2xl font-bold text-text-dark mb-4">{t.footer.rewardsTitle}</h3>
          <p className="text-text-muted mb-6">{t.footer.rewardsDesc}</p>
          <button className="px-8 py-3 bg-gradient-to-r from-amber-800 to-amber-700 text-white rounded-full font-semibold hover:from-amber-900 hover:to-amber-800 transition-all shadow-soft">
            {t.footer.learnMore}
          </button>
        </div>

        {/* Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <h4 className="font-bold text-text-dark mb-4 flex items-center gap-2">
              <span className="text-2xl">☕</span> CoffeeBliss
            </h4>
            <p className="text-text-muted text-sm">
              {t.footer.brandTagline}
            </p>
          </div>

          <div className="bg-gradient-to-b from-amber-50 to-white rounded-full px-6 py-4 flex gap-2 shadow-soft border-2 border-amber-200">
            <input
              type="email"
              placeholder={t.footer.emailPlaceholder}
              className="flex-1 bg-transparent text-text-dark placeholder-text-muted focus:outline-none text-sm font-medium"
            />
            <button className="bg-gradient-to-r from-amber-800 to-amber-700 text-white px-6 rounded-full font-semibold hover:from-amber-900 hover:to-amber-800 transition-all">
              {t.footer.subscribe}
            </button>
          </div>
        </div>

        {/* Promotional Text */}
        <div className="bg-gradient-to-r from-pastel-peach to-pastel-cream rounded-2xl p-6 mb-8 text-center border-2 border-amber-200">
          <p className="text-text-dark font-bold text-lg mb-2">{t.footer.promoHeadline}</p>
          <p className="text-text-muted text-sm">
            {t.footer.promoDesc} <br/>
            <span className="font-semibold text-text-dark">{t.footer.promoDelivery}</span>
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h5 className="font-semibold text-text-dark mb-4 text-sm">{section.title}</h5>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-text-muted text-sm hover:text-text-dark transition-all"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-pastel-brown border-opacity-20 pt-8 text-center text-sm text-text-muted">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
