export interface MenuItemSize {
  id: string;
  priceAdd: number; // additional cost in base currency
}

export interface MenuItemExtra {
  id: string;
  price: number;
}

export interface MenuItem {
  id: string;
  category: string;
  emoji: string;
  basePrice: number;
  hasSizes: boolean;
  hasMilk: boolean;
  hasSugar: boolean;
  hasExtras: boolean;
}

export const sizes: MenuItemSize[] = [
  { id: "small", priceAdd: 0 },
  { id: "medium", priceAdd: 0.5 },
  { id: "large", priceAdd: 1.0 },
];

export const milkOptions = ["regular", "oat", "almond", "soy", "none"] as const;
export type MilkOption = (typeof milkOptions)[number];

export const milkPriceAdd: Record<string, number> = {
  regular: 0,
  oat: 0.5,
  almond: 0.5,
  soy: 0.3,
  none: 0,
};

export const sugarLevels = ["none", "light", "regular", "extra"] as const;
export type SugarLevel = (typeof sugarLevels)[number];

export const extras: MenuItemExtra[] = [
  { id: "whipped-cream", price: 0.5 },
  { id: "extra-shot", price: 0.75 },
  { id: "vanilla-syrup", price: 0.5 },
  { id: "caramel-drizzle", price: 0.5 },
];

export const categories = ["hot-drinks", "cold-drinks", "pastries", "specials"] as const;
export type Category = (typeof categories)[number];

export const menuItems: MenuItem[] = [
  // Hot Drinks
  { id: "espresso", category: "hot-drinks", emoji: "☕", basePrice: 2.99, hasSizes: true, hasMilk: false, hasSugar: true, hasExtras: true },
  { id: "cappuccino", category: "hot-drinks", emoji: "🥛", basePrice: 4.5, hasSizes: true, hasMilk: true, hasSugar: true, hasExtras: true },
  { id: "latte", category: "hot-drinks", emoji: "🍶", basePrice: 4.99, hasSizes: true, hasMilk: true, hasSugar: true, hasExtras: true },
  { id: "mocha", category: "hot-drinks", emoji: "🍫", basePrice: 5.5, hasSizes: true, hasMilk: true, hasSugar: true, hasExtras: true },
  { id: "americano", category: "hot-drinks", emoji: "☕", basePrice: 3.5, hasSizes: true, hasMilk: false, hasSugar: true, hasExtras: true },
  { id: "flat-white", category: "hot-drinks", emoji: "🤍", basePrice: 4.75, hasSizes: true, hasMilk: true, hasSugar: true, hasExtras: true },

  // Cold Drinks
  { id: "iced-latte", category: "cold-drinks", emoji: "🧊", basePrice: 5.25, hasSizes: true, hasMilk: true, hasSugar: true, hasExtras: true },
  { id: "cold-brew", category: "cold-drinks", emoji: "🥶", basePrice: 4.99, hasSizes: true, hasMilk: true, hasSugar: true, hasExtras: true },
  { id: "frappuccino", category: "cold-drinks", emoji: "🥤", basePrice: 5.99, hasSizes: true, hasMilk: true, hasSugar: true, hasExtras: true },
  { id: "iced-mocha", category: "cold-drinks", emoji: "🍫", basePrice: 5.75, hasSizes: true, hasMilk: true, hasSugar: true, hasExtras: true },

  // Pastries
  { id: "croissant", category: "pastries", emoji: "🥐", basePrice: 3.25, hasSizes: false, hasMilk: false, hasSugar: false, hasExtras: false },
  { id: "muffin", category: "pastries", emoji: "🧁", basePrice: 2.99, hasSizes: false, hasMilk: false, hasSugar: false, hasExtras: false },
  { id: "brownie", category: "pastries", emoji: "🍫", basePrice: 3.5, hasSizes: false, hasMilk: false, hasSugar: false, hasExtras: false },
  { id: "cookie", category: "pastries", emoji: "🍪", basePrice: 2.5, hasSizes: false, hasMilk: false, hasSugar: false, hasExtras: false },

  // Specials
  { id: "caramel-macchiato", category: "specials", emoji: "🍯", basePrice: 5.99, hasSizes: true, hasMilk: true, hasSugar: true, hasExtras: true },
  { id: "pumpkin-spice-latte", category: "specials", emoji: "🎃", basePrice: 6.25, hasSizes: true, hasMilk: true, hasSugar: true, hasExtras: true },
  { id: "matcha-latte", category: "specials", emoji: "🍵", basePrice: 5.5, hasSizes: true, hasMilk: true, hasSugar: true, hasExtras: true },
  { id: "hot-chocolate", category: "specials", emoji: "🍫", basePrice: 4.5, hasSizes: true, hasMilk: true, hasSugar: true, hasExtras: true },
];

export function getMenuItemsByCategory(category: string): MenuItem[] {
  return menuItems.filter((item) => item.category === category);
}

export function getMenuItemById(id: string): MenuItem | undefined {
  return menuItems.find((item) => item.id === id);
}

export function calculateItemPrice(
  item: MenuItem,
  sizeId: string,
  milkId: string,
  extraIds: string[]
): number {
  let price = item.basePrice;

  if (item.hasSizes) {
    const size = sizes.find((s) => s.id === sizeId);
    if (size) price += size.priceAdd;
  }

  if (item.hasMilk) {
    price += milkPriceAdd[milkId] ?? 0;
  }

  for (const extraId of extraIds) {
    const extra = extras.find((e) => e.id === extraId);
    if (extra) price += extra.price;
  }

  return Math.round(price * 100) / 100;
}
