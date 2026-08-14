# CoffeeBliss

A restaurant ordering storefront built with [Next.js](https://nextjs.org) 16, React 19, TypeScript and Tailwind CSS v4.

> **Status: frontend only.** There is no backend, no database and no API. Everything
> below the UI — accounts, orders, payments — is still to be built. See
> `AGENTS.md` before making changes: this Next.js version has breaking API
> differences, and its documentation ships in `node_modules/next/dist/docs/`.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Layout

| Path | Contains |
| --- | --- |
| `app/` | Routes — home and `/menu` |
| `components/` | UI components |
| `lib/menuData.ts` | Menu catalogue and price calculation |
| `lib/currency.ts` | INR formatting and money helpers |
| `lib/CartContext.tsx` | Cart state, persisted to localStorage |
| `lib/LanguageContext.tsx` | Locale selection (English, Bengali, Hindi) |
| `lib/translations.ts` | UI copy for all three languages |

## Conventions

**Money is integer paise, never floating point.** ₹249 is stored as `24900`.
Identifiers carry the unit — `basePricePaise`, `unitPricePaise`, `totalPricePaise` —
so a unit mix-up fails to compile rather than mispricing an order. Format for
display with `formatINR` from `lib/currency.ts`; never hardcode a currency symbol
in a component or a translation string.

**Styling is configured in CSS, not JavaScript.** Tailwind v4 reads the palette
from the `@theme` block in `app/globals.css`. There is deliberately no
`tailwind.config.ts` — one existed previously and was silently ignored, so none
of the custom colours or shadows were being generated.

## Not yet built

Prices are placeholders and live in source rather than a database. The cart is
priced entirely on the client, which is fine for a prototype and must not ship —
the server has to be the authority on what an order costs. Checkout, accounts,
order management, payments and delivery do not exist yet.
