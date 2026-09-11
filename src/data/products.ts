import { Product } from "@/types";

/**
 * IMPORTANT
 * ---------
 * Every product explicitly owns its image.
 *
 * Do NOT go back to:
 *
 * images: [imgs[i % imgs.length]]
 *
 * because array-index based image assignment is what caused
 * sarees to display suits, kurtis to display lehengas, etc.
 */

type ProductSeed = {
  name: string;
  category: Product["category"];
  price: number;
  fabric: Product["fabric"];
  occasion: Product["occasion"];
  image: string;
};

/* -------------------------------------------------------------------------- */
/*                               SAREE IMAGES                                  */
/* -------------------------------------------------------------------------- */

const SAREE_WHITE_GOLD =
  "https://images.unsplash.com/photo-1659293554631-d7a38642c5e3?auto=format&fit=crop&w=1200&q=88";

const SAREE_RED_GOLD =
  "https://images.unsplash.com/photo-1716504627981-22728cb2d2e2?auto=format&fit=crop&w=1200&q=88";

const SAREE_TRADITIONAL =
  "https://images.unsplash.com/photo-1610030469983-98e550d080b6?auto=format&fit=crop&w=1200&q=88";

const SAREE_ELEGANT =
  "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1200&q=88";

/* -------------------------------------------------------------------------- */
/*                            SUIT / KURTI IMAGES                              */
/* -------------------------------------------------------------------------- */

const SUIT_PINK =
  "https://images.unsplash.com/photo-1743229995542-a07d3ee51e2a?auto=format&fit=crop&w=1200&q=88";

const KURTI_MAROON =
  "https://images.unsplash.com/photo-1708534246055-d7b149acb731?auto=format&fit=crop&w=1200&q=88";

const KURTI_PRINTED =
  "https://images.unsplash.com/photo-1754391851702-e5275cf80e34?auto=format&fit=crop&w=1200&q=88";

/* -------------------------------------------------------------------------- */
/*                              LEHENGA IMAGES                                 */
/* -------------------------------------------------------------------------- */

const LEHENGA_GREEN =
  "https://images.unsplash.com/photo-1754641585246-5f2f2b5560d2?auto=format&fit=crop&w=1200&q=88";

const LEHENGA_RED =
  "https://images.unsplash.com/photo-1645862755924-9f4e7f200b83?auto=format&fit=crop&w=1200&q=88";

/* -------------------------------------------------------------------------- */
/*                              ANARKALI IMAGE                                 */
/* -------------------------------------------------------------------------- */

const ANARKALI_YELLOW =
  "https://images.unsplash.com/photo-1525373761544-a828e4bb1674?auto=format&fit=crop&w=1200&q=88";

/* -------------------------------------------------------------------------- */
/*                               PRODUCT DATA                                  */
/* -------------------------------------------------------------------------- */

const productSeeds: ProductSeed[] = [
  // -------------------------------------------------------------------------
  // SAREES
  // -------------------------------------------------------------------------

  {
    name: "Banarasi Silk Saree",
    category: "Sarees",
    price: 2499,
    fabric: "Silk",
    occasion: "Wedding",
    image: SAREE_RED_GOLD,
  },

  {
    name: "Floral Organza Saree",
    category: "Sarees",
    price: 1899,
    fabric: "Organza",
    occasion: "Party",
    image: SAREE_ELEGANT,
  },

  {
    name: "Embroidered Chiffon Saree",
    category: "Sarees",
    price: 2199,
    fabric: "Chiffon",
    occasion: "Festive",
    image: SAREE_TRADITIONAL,
  },

  {
    name: "Cotton Handloom Saree",
    category: "Sarees",
    price: 1599,
    fabric: "Cotton",
    occasion: "Casual",
    image: SAREE_WHITE_GOLD,
  },

  {
    name: "Designer Party Saree",
    category: "Sarees",
    price: 2999,
    fabric: "Georgette",
    occasion: "Party",
    image: SAREE_ELEGANT,
  },

  // -------------------------------------------------------------------------
  // ANARKALI
  // -------------------------------------------------------------------------

  {
    name: "Embroidered Anarkali Suit",
    category: "Anarkalis",
    price: 2399,
    fabric: "Rayon",
    occasion: "Festive",
    image: ANARKALI_YELLOW,
  },

  // -------------------------------------------------------------------------
  // SALWAR SUITS
  // -------------------------------------------------------------------------

  {
    name: "Cotton Salwar Suit",
    category: "Salwar Suits",
    price: 1399,
    fabric: "Cotton",
    occasion: "Everyday",
    image: SUIT_PINK,
  },

  // -------------------------------------------------------------------------
  // PALAZZO
  // -------------------------------------------------------------------------

  {
    name: "Festive Palazzo Suit",
    category: "Palazzo Sets",
    price: 1799,
    fabric: "Viscose",
    occasion: "Festive",
    image: KURTI_PRINTED,
  },

  // -------------------------------------------------------------------------
  // SALWAR SUITS
  // -------------------------------------------------------------------------

  {
    name: "Chikankari Suit",
    category: "Salwar Suits",
    price: 1999,
    fabric: "Cotton",
    occasion: "Wedding",
    image: SUIT_PINK,
  },

  {
    name: "Partywear Sharara Set",
    category: "Salwar Suits",
    price: 2699,
    fabric: "Georgette",
    occasion: "Party",
    image: ANARKALI_YELLOW,
  },

  // -------------------------------------------------------------------------
  // KURTIS
  // -------------------------------------------------------------------------

  {
    name: "Printed Cotton Kurti",
    category: "Kurtis",
    price: 899,
    fabric: "Cotton",
    occasion: "Casual",
    image: KURTI_PRINTED,
  },

  {
    name: "Embroidered Kurti",
    category: "Kurtis",
    price: 1199,
    fabric: "Rayon",
    occasion: "Office",
    image: KURTI_MAROON,
  },

  {
    name: "Rayon Straight Kurti",
    category: "Kurtis",
    price: 999,
    fabric: "Rayon",
    occasion: "Everyday",
    image: KURTI_MAROON,
  },

  {
    name: "A-Line Kurti",
    category: "Kurtis",
    price: 1099,
    fabric: "Cotton",
    occasion: "Office",
    image: KURTI_PRINTED,
  },

  // -------------------------------------------------------------------------
  // LEHENGAS
  // -------------------------------------------------------------------------

  {
    name: "Bridal Lehenga",
    category: "Lehenga Sets",
    price: 7999,
    fabric: "Silk",
    occasion: "Wedding",
    image: LEHENGA_RED,
  },

  {
    name: "Festive Lehenga",
    category: "Lehenga Sets",
    price: 4999,
    fabric: "Organza",
    occasion: "Festive",
    image: LEHENGA_GREEN,
  },

  {
    name: "Designer Party Lehenga",
    category: "Lehenga Sets",
    price: 5999,
    fabric: "Georgette",
    occasion: "Party",
    image: LEHENGA_GREEN,
  },

  // -------------------------------------------------------------------------
  // DUPATTA
  // -------------------------------------------------------------------------

  {
    name: "Pearl Drop Dupatta",
    category: "Dupattas",
    price: 799,
    fabric: "Chiffon",
    occasion: "Festive",

    // Temporary: closest matching ethnic/festive visual.
    // Ideally replace this with a dedicated dupatta product photograph.
    image: SUIT_PINK,
  },

  // -------------------------------------------------------------------------
  // PALAZZO
  // -------------------------------------------------------------------------

  {
    name: "Printed Palazzo Set",
    category: "Palazzo Sets",
    price: 1499,
    fabric: "Viscose",
    occasion: "Casual",
    image: KURTI_PRINTED,
  },

  // -------------------------------------------------------------------------
  // KURTI SET
  // -------------------------------------------------------------------------

  {
    name: "Mirror Work Kurti Set",
    category: "Kurtis",
    price: 1899,
    fabric: "Cotton",
    occasion: "Festive",
    image: KURTI_MAROON,
  },

  // -------------------------------------------------------------------------
  // SAREES
  // -------------------------------------------------------------------------

  {
    name: "Pastel Silk Saree",
    category: "Sarees",
    price: 2799,
    fabric: "Silk",
    occasion: "Wedding",
    image: SAREE_WHITE_GOLD,
  },

  // -------------------------------------------------------------------------
  // ANARKALI
  // -------------------------------------------------------------------------

  {
    name: "Wine Velvet Anarkali",
    category: "Anarkalis",
    price: 3299,
    fabric: "Velvet",
    occasion: "Party",
    image: ANARKALI_YELLOW,
  },

  // -------------------------------------------------------------------------
  // SALWAR SUIT
  // -------------------------------------------------------------------------

  {
    name: "Ivory Chanderi Suit",
    category: "Salwar Suits",
    price: 2299,
    fabric: "Chanderi",
    occasion: "Festive",
    image: SUIT_PINK,
  },

  // -------------------------------------------------------------------------
  // KURTI
  // -------------------------------------------------------------------------

  {
    name: "Rose Printed Kurti",
    category: "Kurtis",
    price: 799,
    fabric: "Cotton",
    occasion: "Casual",
    image: KURTI_PRINTED,
  },

  // -------------------------------------------------------------------------
  // SAREES
  // -------------------------------------------------------------------------

  {
    name: "Midnight Party Saree",
    category: "Sarees",
    price: 2399,
    fabric: "Georgette",
    occasion: "Party",
    image: SAREE_ELEGANT,
  },

  {
    name: "Gold Tissue Saree",
    category: "Sarees",
    price: 3499,
    fabric: "Tissue",
    occasion: "Wedding",
    image: SAREE_RED_GOLD,
  },

  // -------------------------------------------------------------------------
  // KURTI
  // -------------------------------------------------------------------------

  {
    name: "Everyday Linen Kurti",
    category: "Kurtis",
    price: 999,
    fabric: "Linen",
    occasion: "Casual",
    image: KURTI_MAROON,
  },

  // -------------------------------------------------------------------------
  // SHARARA
  // -------------------------------------------------------------------------

  {
    name: "Festive Sharara",
    category: "Salwar Suits",
    price: 2899,
    fabric: "Georgette",
    occasion: "Festive",
    image: ANARKALI_YELLOW,
  },

  // -------------------------------------------------------------------------
  // PALAZZO
  // -------------------------------------------------------------------------

  {
    name: "Embroidered Palazzo",
    category: "Palazzo Sets",
    price: 1699,
    fabric: "Rayon",
    occasion: "Office",
    image: KURTI_PRINTED,
  },

  // -------------------------------------------------------------------------
  // LEHENGA
  // -------------------------------------------------------------------------

  {
    name: "Royal Wedding Lehenga",
    category: "Lehenga Sets",
    price: 6999,
    fabric: "Silk",
    occasion: "Wedding",
    image: LEHENGA_RED,
  },
];

/* -------------------------------------------------------------------------- */
/*                         CREATE FINAL PRODUCT ARRAY                          */
/* -------------------------------------------------------------------------- */

export const products: Product[] = productSeeds.map((item, i) => {
  const originalPrice = Math.round(
    item.price * (1.18 + (i % 4) * 0.08)
  );

  return {
    id: `p${i + 1}`,

    slug: item.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),

    name: item.name,

    description: `A beautifully crafted ${item.name.toLowerCase()} designed for modern Indian wardrobes.`,

    category: item.category,

    price: item.price,

    originalPrice,

    /**
     * Product image is now explicitly connected to the product.
     * No modulo/index based image selection.
     */
    images: [item.image],

    sizes: ["XS", "S", "M", "L", "XL", "XXL"],

    colors: ["Wine", "Ivory", "Blush", "Black"],

    fabric: item.fabric,

    occasion: item.occasion,

    rating: Number((4.2 + (i % 6) * 0.1).toFixed(1)),

    reviews: 34 + i * 7,

    stock: 3 + ((i * 7) % 24),

    tags: [
      i % 3 === 0
        ? "BESTSELLER"
        : i % 3 === 1
        ? "TRENDING"
        : "NEW",

      item.occasion.toUpperCase(),
    ],

    magicCoins: Math.floor(item.price / 10),
  };
});