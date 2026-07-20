export type Product = {
  id: string;
  name: string;
  description: string;
  price: number; // in INR
  tag?: string;
  emoji: string;
};

/* -------------------------------------------------------------------------- */
/*  Menu building blocks                                                       */
/*  Edit names / prices / emoji here — the whole store reads from this file.   */
/* -------------------------------------------------------------------------- */

export type Choice = {
  id: string;
  name: string;
  emoji: string;
  color: string; // one of the pastel tokens
};

// Main items you can pick individually or inside a build-your-own box.
export type MainItem = Choice & { price: number; tag?: string; inBox?: boolean };

// Toppings carry an add-on price.
export type Topping = Choice & { price: number };

export const dips: Choice[] = [
  { id: "hazelnut", name: "Hazelnut", emoji: "🌰", color: "var(--caramel)" },
  { id: "milk", name: "Milk Chocolate", emoji: "🍫", color: "var(--peach)" },
  { id: "dark", name: "Dark Chocolate", emoji: "🖤", color: "var(--sky)" },
];

export const mainItems: MainItem[] = [
  { id: "wafer-biscuit", name: "Wafer Biscuit", emoji: "🧇", color: "var(--caramel)", price: 99 },
  { id: "wafer-stick", name: "Wafer Stick", emoji: "🥖", color: "var(--peach)", price: 129, tag: "Hero Product" },
  { id: "brownie-mousse", name: "Brownie Mousse", emoji: "🍮", color: "var(--sky)", price: 159, tag: "New", inBox: false },
  { id: "wafer-pops", name: "Wafer Pops", emoji: "🍭", color: "var(--mint)", price: 59, tag: "New", inBox: false },
  { id: "mini-cookies", name: "Mini Cookies", emoji: "🍪", color: "var(--caramel)", price: 49, tag: "New", inBox: false },
  { id: "toy-cookies", name: "Toy Shape Cookies", emoji: "🧸", color: "var(--pink)", price: 59, tag: "New", inBox: false },
  { id: "nuts-cookies", name: "Nuts Cookies", emoji: "🥜", color: "var(--peach)", price: 69, tag: "New", inBox: false },
  { id: "chocolate-cookies", name: "Chocolate Cookies", emoji: "🍫", color: "var(--muted)", price: 59, tag: "New", inBox: false },
  { id: "caramel-crunch-cookies", name: "Caramel Crunch Cookies", emoji: "🍪", color: "var(--caramel)", price: 69, tag: "New", inBox: false },
];

export const toppings: Topping[] = [
  { id: "gems", name: "Gems", emoji: "💎", color: "var(--sky)", price: 5 },
  { id: "brownie", name: "Brownie Crumble", emoji: "🟤", color: "var(--caramel)", price: 20 },
  { id: "glaze-cake", name: "Chocolate Glaze Cake", emoji: "🍰", color: "var(--muted)", price: 15 },
  { id: "moon-star", name: "Moon & Star Cereal", emoji: "🌙", color: "var(--sky)", price: 10 },
  { id: "filled-cereal", name: "Chocolate-Filled Cereal", emoji: "🥣", color: "var(--muted)", price: 15 },
  { id: "choco-chips", name: "Chocolate Chips", emoji: "🍫", color: "var(--muted)", price: 10 },
  { id: "sprinkles", name: "Colour Sprinkles", emoji: "🌈", color: "var(--pink)", price: 10 },
];

// Build-your-own box tiers.
export type BoxTier = {
  id: string;
  name: string;
  emoji: string;
  badge: string;
  color: string;
  mainCount: number;
  toppingCount: number;
  price: number;
};

export const boxTiers: BoxTier[] = [
  { id: "mini-box", name: "Mini Box", emoji: "🟢", badge: "Best for single person", color: "var(--mint)", mainCount: 2, toppingCount: 3, price: 119 },
  { id: "family-box", name: "Family Box", emoji: "🟠", badge: "Best for sharing", color: "var(--peach)", mainCount: 3, toppingCount: 5, price: 159 },
  { id: "premium-box", name: "Premium Box", emoji: "👑", badge: "Gift / Party Box", color: "var(--pink)", mainCount: 5, toppingCount: 7, price: 199 },
];

export const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);