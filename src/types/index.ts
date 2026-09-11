export type Category =
  | "Sarees" | "Salwar Suits" | "Anarkalis" | "Kurtis"
  | "Lehenga Sets" | "Dupattas" | "Palazzo Sets" | "Festive Wear"
  | "Party Wear" | "Casual Wear";

export type Product = {
  id: string; slug: string; name: string; description: string;
  category: Category; price: number; originalPrice: number;
  images: string[]; sizes: string[]; colors: string[];
  fabric: string; occasion: string; rating: number; reviews: number;
  stock: number; tags: string[]; magicCoins: number;
};

export type CartItem = { product: Product; quantity: number; size: string; color: string };
export type Order = {
  id: string; items: CartItem[]; subtotal: number; discount: number;
  coinsUsed: number; coinsEarned: number; total: number;
  status: "PLACED"|"CONFIRMED"|"PROCESSING"|"SHIPPED"|"OUT_FOR_DELIVERY"|"DELIVERED";
  createdAt: string;
};