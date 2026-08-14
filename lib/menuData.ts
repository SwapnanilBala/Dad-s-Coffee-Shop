/**
 * Menu catalogue.
 *
 * All money is integer paise — see lib/currency.ts. Prices are placeholders
 * derived from the original USD values at the ~₹83 rate implied by the existing
 * Hindi copy; they need to be replaced with the restaurant's real prices before
 * launch, and will move into the database behind an admin UI so they can be
 * changed without a deploy.
 */

export interface MenuItemSize {
  id: string;
  /** Added to the base price, in paise. */
  priceAddPaise: number;
}

export interface MenuItemExtra {
  id: string;
  pricePaise: number;
}

export interface MenuItem {
  id: string;
  category: string;
  emoji: string;
  basePricePaise: number;
  hasSizes: boolean;
  hasMilk: boolean;
  hasSugar: boolean;
  hasExtras: boolean;
}

export const sizes: MenuItemSize[] = [
  { id: "small", priceAddPaise: 0 },
  { id: "medium", priceAddPaise: 4000 },
  { id: "large", priceAddPaise: 8000 },
];

export const milkOptions = ["regular", "oat", "almond", "soy", "none"] as const;
export type MilkOption = (typeof milkOptions)[number];

export const milkPriceAddPaise: Record<string, number> = {
  regular: 0,
  oat: 4000,
  almond: 4000,
  soy: 2500,
  none: 0,
};

export const sugarLevels = ["none", "light", "regular", "extra"] as const;
export type SugarLevel = (typeof sugarLevels)[number];

export const extras: MenuItemExtra[] = [
  { id: "whipped-cream", pricePaise: 4000 },
  { id: "extra-shot", pricePaise: 6000 },
  { id: "vanilla-syrup", pricePaise: 4000 },
  { id: "caramel-drizzle", pricePaise: 4000 },
];

export const categories = ["hot-drinks", "cold-drinks", "pastries", "specials"] as const;
export type Category = (typeof categories)[number];

export const menuItems: MenuItem[] = [
  // Hot Drinks
  { id: "espresso", category: "hot-drinks", emoji: "☕", basePricePaise: 24900, hasSizes: true, hasMilk: false, hasSugar: true, hasExtras: true },
  { id: "cappuccino", category: "hot-drinks", emoji: "🥛", basePricePaise: 37500, hasSizes: true, hasMilk: true, hasSugar: true, hasExtras: true },
  { id: "latte", category: "hot-drinks", emoji: "🍶", basePricePaise: 41500, hasSizes: true, hasMilk: true, hasSugar: true, hasExtras: true },
  { id: "mocha", category: "hot-drinks", emoji: "🍫", basePricePaise: 45900, hasSizes: true, hasMilk: true, hasSugar: true, hasExtras: true },
  { id: "americano", category: "hot-drinks", emoji: "☕", basePricePaise: 28900, hasSizes: true, hasMilk: false, hasSugar: true, hasExtras: true },
  { id: "flat-white", category: "hot-drinks", emoji: "🤍", basePricePaise: 39500, hasSizes: true, hasMilk: true, hasSugar: true, hasExtras: true },

  // Cold Drinks
  { id: "iced-latte", category: "cold-drinks", emoji: "🧊", basePricePaise: 43500, hasSizes: true, hasMilk: true, hasSugar: true, hasExtras: true },
  { id: "cold-brew", category: "cold-drinks", emoji: "🥶", basePricePaise: 41500, hasSizes: true, hasMilk: true, hasSugar: true, hasExtras: true },
  { id: "frappuccino", category: "cold-drinks", emoji: "🥤", basePricePaise: 49900, hasSizes: true, hasMilk: true, hasSugar: true, hasExtras: true },
  { id: "iced-mocha", category: "cold-drinks", emoji: "🍫", basePricePaise: 47900, hasSizes: true, hasMilk: true, hasSugar: true, hasExtras: true },

  // Pastries
  { id: "croissant", category: "pastries", emoji: "🥐", basePricePaise: 26900, hasSizes: false, hasMilk: false, hasSugar: false, hasExtras: false },
  { id: "muffin", category: "pastries", emoji: "🧁", basePricePaise: 24900, hasSizes: false, hasMilk: false, hasSugar: false, hasExtras: false },
  { id: "brownie", category: "pastries", emoji: "🍫", basePricePaise: 28900, hasSizes: false, hasMilk: false, hasSugar: false, hasExtras: false },
  { id: "cookie", category: "pastries", emoji: "🍪", basePricePaise: 20900, hasSizes: false, hasMilk: false, hasSugar: false, hasExtras: false },

  // Specials
  { id: "caramel-macchiato", category: "specials", emoji: "🍯", basePricePaise: 49900, hasSizes: true, hasMilk: true, hasSugar: true, hasExtras: true },
  { id: "pumpkin-spice-latte", category: "specials", emoji: "🎃", basePricePaise: 51900, hasSizes: true, hasMilk: true, hasSugar: true, hasExtras: true },
  { id: "matcha-latte", category: "specials", emoji: "🍵", basePricePaise: 45900, hasSizes: true, hasMilk: true, hasSugar: true, hasExtras: true },
  { id: "hot-chocolate", category: "specials", emoji: "🍫", basePricePaise: 37500, hasSizes: true, hasMilk: true, hasSugar: true, hasExtras: true },
];

export function getMenuItemsByCategory(category: string): MenuItem[] {
  return menuItems.filter((item) => item.category === category);
}

export function getMenuItemById(id: string): MenuItem | undefined {
  return menuItems.find((item) => item.id === id);
}

/**
 * Total price for one unit of a configured item, in paise.
 *
 * Integer arithmetic throughout, so no rounding step is needed or wanted.
 * This will move to the server before launch — the client must not be the
 * authority on what an order costs.
 */
export function calculateItemPricePaise(
  item: MenuItem,
  sizeId: string,
  milkId: string,
  extraIds: string[]
): number {
  let paise = item.basePricePaise;

  if (item.hasSizes) {
    const size = sizes.find((s) => s.id === sizeId);
    if (size) paise += size.priceAddPaise;
  }

  if (item.hasMilk) {
    paise += milkPriceAddPaise[milkId] ?? 0;
  }

  for (const extraId of extraIds) {
    const extra = extras.find((e) => e.id === extraId);
    if (extra) paise += extra.pricePaise;
  }

  return paise;
}
