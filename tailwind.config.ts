import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          cream: "#FFF7E9",
          brown: "#C8A27E",
          "brown-dark": "#6B5344",
          pink: "#F4D4D4",
          peach: "#F5D5C0",
          lavender: "#E8D5E8",
          mint: "#D4E8E0",
        },
        text: {
          dark: "#3D2817",
          muted: "#5a4a42",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0, 0, 0, 0.08)",
        "soft-lg": "0 4px 16px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
export default config;
