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
export type MainItem = Choice & { price: number; tag?: string };

export const dips: Choice[] = [
  { id: "hazelnut", name: "Hazelnut", emoji: "🌰", color: "var(--caramel)" },
  { id: "milk", name: "Milk Chocolate", emoji: "🍫", color: "var(--peach)" },
  { id: "dark", name: "Dark Chocolate", emoji: "🖤", color: "var(--sky)" },
];

export const mainItems: MainItem[] = [
  { id: "wafer-biscuit", name: "Wafer Biscuit", emoji: "🧇", color: "var(--caramel)", price: 60 },
  { id: "wafer-stick", name: "Wafer Stick", emoji: "🍡", color: "var(--peach)", price: 70, tag: "Hero Product" },
  { id: "mini-cookies", name: "Mini Cookies", emoji: "🍪", color: "var(--mint)", price: 50 },
  { id: "toy-cookies", name: "Toy Shape Cookies", emoji: "🧸", color: "var(--sky)", price: 55 },
  { id: "homemade-cookies", name: "Homemade Cookies", emoji: "🥮", color: "var(--pink)", price: 50 },
  { id: "caramel-cookies", name: "Caramel Crunch Cookies", emoji: "🍯", color: "var(--caramel)", price: 65 },
];

export const toppings: Choice[] = [
  { id: "gems", name: "Gems", emoji: "🔵", color: "var(--sky)" },
  { id: "brownie", name: "Brownie Crumble", emoji: "🟤", color: "var(--caramel)" },
  { id: "glaze-cake", name: "Chocolate Glaze Cake", emoji: "🍰", color: "var(--muted)" },
  { id: "moon-star", name: "Moon & Star Cereal", emoji: "🌙", color: "var(--sky)" },
  { id: "filled-cereal", name: "Chocolate-Filled Cereal", emoji: "🥣", color: "var(--muted)" },
  { id: "homemade-crunch", name: "Homemade Crunch", emoji: "🌾", color: "var(--peach)" },
  { id: "choco-chips", name: "Chocolate Chips", emoji: "🍫", color: "var(--muted)" },
  { id: "sprinkles", name: "Color Sprinkles", emoji: "🌈", color: "var(--pink)" },
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
  { id: "mini-box", name: "Mini Box", emoji: "🟢", badge: "Best for single person", color: "var(--mint)", mainCount: 2, toppingCount: 3, price: 199 },
  { id: "family-box", name: "Family Box", emoji: "🟠", badge: "Best for sharing", color: "var(--peach)", mainCount: 3, toppingCount: 5, price: 349 },
  { id: "premium-box", name: "Premium Box", emoji: "👑", badge: "Gift / Party Box", color: "var(--pink)", mainCount: 5, toppingCount: 7, price: 599 },
];

export const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);