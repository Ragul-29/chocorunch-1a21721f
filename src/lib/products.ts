export type Product = {
  id: string;
  name: string;
  description: string;
  price: number; // in INR
  tag?: string;
  emoji: string;
};

// Starter menu — replace names, descriptions and prices with your real items.
// The storefront, cart and checkout all read from this list.
export const products: Product[] = [
  {
    id: "classic-crunch",
    name: "Classic Chocorunch",
    description: "Our signature milk chocolate loaded with crispy crunch pearls.",
    price: 120,
    tag: "Bestseller",
    emoji: "🍫",
  },
  {
    id: "dark-70",
    name: "Dark 70% Crunch",
    description: "Rich 70% dark chocolate with roasted almond crisp.",
    price: 150,
    emoji: "🌰",
  },
  {
    id: "hazelnut",
    name: "Hazelnut Crunch",
    description: "Creamy hazelnut praline folded into crunchy layers.",
    price: 160,
    tag: "New",
    emoji: "🥜",
  },
  {
    id: "caramel",
    name: "Salted Caramel Crunch",
    description: "Silky caramel, a hint of sea salt and a satisfying snap.",
    price: 140,
    emoji: "🍮",
  },
  {
    id: "berry",
    name: "Berry Blast Crunch",
    description: "White chocolate with freeze-dried strawberries and crisp.",
    price: 155,
    emoji: "🍓",
  },
  {
    id: "mini-box",
    name: "Mini Crunch Box",
    description: "A curated box of six mini bars — perfect for gifting.",
    price: 399,
    tag: "Gift",
    emoji: "🎁",
  },
];

export const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);