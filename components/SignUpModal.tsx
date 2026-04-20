"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

interface SignUpModalProps {
  onClose: () => void;
}

export default function SignUpModal({ onClose }: SignUpModalProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    favoriteCoffee: "",
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculateStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    return strength;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (name === "password") {
      setPasswordStrength(calculateStrength(value));
    }
  };

  const strengthColors = ["bg-red-300", "bg-orange-300", "bg-yellow-300", "bg-green-300", "bg-green-500"];

  const coffeeEmojis = ["☕", "🥛", "🍶", "🍫", "🧊", "🫖"];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-pastel-cream rounded-3xl shadow-soft-lg w-full max-w-4xl max-h-[90vh] overflow-hidden grid md:grid-cols-2 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-soft flex items-center justify-center hover:rotate-90 transition-transform"
          aria-label="Close"
        >
          <svg className="w-5 h-5 text-text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left Side - Illustration & Welcome */}
        <div className="hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-pastel-peach via-pastel-pink to-pastel-lavender relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-700 to-amber-900 rounded-full flex items-center justify-center shadow-soft">
                <span className="text-2xl">☕</span>
              </div>
              <span className="font-bold text-lg text-text-dark">CoffeeBliss</span>
            </div>

            <h2 className="text-3xl font-bold text-text-dark mb-4">
              {mode === "signup" ? t.signup.welcomeSignup : t.signup.welcomeLogin}
            </h2>
            <p className="text-text-muted text-sm mb-8 leading-relaxed">
              {mode === "signup" ? t.signup.signupDesc : t.signup.loginDesc}
            </p>

            {/* Perks */}
            <div className="space-y-4">
              {t.signup.perks.map((perk, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white bg-opacity-50 rounded-2xl px-4 py-3 backdrop-blur-sm"
                >
                  <span className="text-2xl">{["🎁", "⭐", "🚀", "💝"][i]}</span>
                  <span className="text-text-dark text-sm font-medium">{perk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative Coffee Cup */}
          <div className="relative mt-8">
            <div className="text-8xl opacity-20 absolute -bottom-4 -right-4 float">☕</div>
            <div className="text-5xl opacity-30 absolute bottom-16 right-20 animate-pulse">💨</div>
          </div>

          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-pastel-brown rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-pastel-cream rounded-full opacity-30 blur-2xl"></div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 md:p-10 overflow-y-auto">
          {/* Mode Toggle */}
          <div className="flex bg-white rounded-full p-1 mb-6 shadow-soft">
            <button
              onClick={() => {
                setMode("signup");
                setStep(1);
              }}
              className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all ${
                mode === "signup"
                  ? "bg-gradient-to-r from-amber-700 to-amber-900 text-white shadow-soft"
                  : "text-text-muted hover:text-text-dark"
              }`}
            >
              {t.signup.tabSignup}
            </button>
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all ${
                mode === "login"
                  ? "bg-gradient-to-r from-amber-700 to-amber-900 text-white shadow-soft"
                  : "text-text-muted hover:text-text-dark"
              }`}
            >
              {t.signup.tabLogin}
            </button>
          </div>

          {mode === "signup" ? (
            <>
              {/* Progress Indicator */}
              <div className="flex items-center gap-2 mb-6">
                {[1, 2].map((s) => (
                  <div
                    key={s}
                    className={`flex-1 h-2 rounded-full transition-all ${
                      step >= s ? "bg-gradient-to-r from-amber-700 to-amber-900" : "bg-pastel-peach"
                    }`}
                  />
                ))}
                <span className="text-xs text-text-muted font-semibold ml-2">{t.signup.stepLabel} {step}/2</span>
              </div>

              {step === 1 ? (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-text-dark mb-1">{t.signup.createAccount}</h3>
                  <p className="text-text-muted text-sm mb-4">{t.signup.basics}</p>

                  {/* Social Login */}
                  <div className="grid grid-cols-2 gap-3 mb-2">
                    <button className="flex items-center justify-center gap-2 py-3 bg-white rounded-2xl shadow-soft hover:shadow-soft-lg transition-all border border-pastel-brown border-opacity-20">
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span className="text-text-dark text-sm font-semibold">Google</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 py-3 bg-text-dark rounded-2xl shadow-soft hover:shadow-soft-lg transition-all">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                      <span className="text-white text-sm font-semibold">Apple</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-3 my-4">
                    <div className="flex-1 h-px bg-pastel-brown opacity-20"></div>
                    <span className="text-xs text-text-muted">{t.signup.continueWith}</span>
                    <div className="flex-1 h-px bg-pastel-brown opacity-20"></div>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-text-dark text-sm font-semibold mb-2">{t.signup.fullName}</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder={t.signup.fullNamePlaceholder}
                        className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl text-text-dark placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-amber-700 focus:ring-opacity-50 border border-pastel-brown border-opacity-20 shadow-soft"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-text-dark text-sm font-semibold mb-2">{t.signup.email}</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t.signup.emailPlaceholder}
                        className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl text-text-dark placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-amber-700 focus:ring-opacity-50 border border-pastel-brown border-opacity-20 shadow-soft"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-text-dark text-sm font-semibold mb-2">{t.signup.password}</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder={t.signup.passwordPlaceholder}
                        className="w-full pl-11 pr-11 py-3 bg-white rounded-2xl text-text-dark placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-amber-700 focus:ring-opacity-50 border border-pastel-brown border-opacity-20 shadow-soft"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-dark"
                      >
                        {showPassword ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>

                    {formData.password && (
                      <div className="mt-2">
                        <div className="flex gap-1 mb-1">
                          {[0, 1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className={`flex-1 h-1 rounded-full transition-all ${
                                i < passwordStrength ? strengthColors[passwordStrength - 1] : "bg-pastel-peach"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-text-muted">
                          {t.signup.strength}: <span className="font-semibold text-text-dark">{t.signup.strengthLevels[Math.max(0, passwordStrength - 1)]}</span>
                        </p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    disabled={!formData.fullName || !formData.email || !formData.password}
                    className="w-full py-3 bg-gradient-to-r from-amber-700 to-amber-900 text-white rounded-2xl font-semibold hover:from-amber-800 hover:to-amber-950 transition-all shadow-soft hover:shadow-soft-lg transform hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {t.signup.continue}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-text-dark mb-1">{t.signup.almostThere}</h3>
                  <p className="text-text-muted text-sm mb-4">{t.signup.tellUsLove}</p>

                  <div>
                    <label className="block text-text-dark text-sm font-semibold mb-3">{t.signup.favoriteBrew}</label>
                    <div className="grid grid-cols-3 gap-2">
                      {t.signup.coffeeOptions.map((name, idx) => (
                        <button
                          key={name}
                          type="button"
                          onClick={() => setFormData({ ...formData, favoriteCoffee: name })}
                          className={`p-3 rounded-2xl transition-all transform hover:-translate-y-0.5 ${
                            formData.favoriteCoffee === name
                              ? "bg-gradient-to-br from-pastel-peach to-pastel-pink shadow-soft-lg ring-2 ring-amber-700"
                              : "bg-white shadow-soft hover:shadow-soft-lg"
                          }`}
                        >
                          <div className="text-3xl mb-1">{coffeeEmojis[idx]}</div>
                          <div className="text-xs text-text-dark font-semibold">{name}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Terms Agreement */}
                  <label className="flex items-start gap-3 p-4 bg-pastel-peach bg-opacity-40 rounded-2xl cursor-pointer hover:bg-opacity-60 transition-all">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="mt-0.5 w-4 h-4 accent-amber-700 cursor-pointer"
                    />
                    <span className="text-xs text-text-dark">
                      {t.signup.agreeTerms}{" "}
                      <a href="#" className="font-semibold underline">{t.signup.terms}</a>{" "}
                      {t.signup.and}{" "}
                      <a href="#" className="font-semibold underline">{t.signup.privacy}</a>.{" "}
                      {t.signup.receiveUpdates}
                    </span>
                  </label>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="px-6 py-3 bg-white text-text-dark rounded-2xl font-semibold hover:bg-pastel-peach transition-all shadow-soft border border-pastel-brown border-opacity-20"
                    >
                      {t.signup.back}
                    </button>
                    <button
                      onClick={() => {
                        alert(t.signup.successMsg);
                        onClose();
                      }}
                      disabled={!formData.agreeTerms}
                      className="flex-1 py-3 bg-gradient-to-r from-amber-700 to-amber-900 text-white rounded-2xl font-semibold hover:from-amber-800 hover:to-amber-950 transition-all shadow-soft hover:shadow-soft-lg transform hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {t.signup.finish}
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* LOGIN MODE */
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-text-dark mb-1">{t.signup.welcomeBack}</h3>
              <p className="text-text-muted text-sm mb-4">{t.signup.signInContinue}</p>

              <div>
                <label className="block text-text-dark text-sm font-semibold mb-2">{t.signup.email}</label>
                <input
                  type="email"
                  placeholder={t.signup.emailPlaceholder}
                  className="w-full px-4 py-3 bg-white rounded-2xl text-text-dark placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-amber-700 focus:ring-opacity-50 border border-pastel-brown border-opacity-20 shadow-soft"
                />
              </div>

              <div>
                <label className="block text-text-dark text-sm font-semibold mb-2">{t.signup.password}</label>
                <input
                  type="password"
                  placeholder={t.signup.passwordPlaceholder}
                  className="w-full px-4 py-3 bg-white rounded-2xl text-text-dark placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-amber-700 focus:ring-opacity-50 border border-pastel-brown border-opacity-20 shadow-soft"
                />
              </div>

              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 text-sm text-text-muted cursor-pointer">
                  <input type="checkbox" className="accent-amber-700" />
                  {t.signup.rememberMe}
                </label>
                <a href="#" className="text-sm text-text-dark font-semibold hover:underline">{t.signup.forgotPassword}</a>
              </div>

              <button className="w-full py-3 bg-gradient-to-r from-amber-700 to-amber-900 text-white rounded-2xl font-semibold hover:from-amber-800 hover:to-amber-950 transition-all shadow-soft hover:shadow-soft-lg transform hover:-translate-y-0.5">
                {t.signup.login}
              </button>

              <p className="text-center text-sm text-text-muted">
                {t.signup.newHere}{" "}
                <button onClick={() => setMode("signup")} className="text-text-dark font-semibold hover:underline">
                  {t.signup.createOne}
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
