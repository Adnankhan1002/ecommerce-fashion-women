"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Heart,
  Sparkles,
  Sun,
  Moon,
  Coffee,
  Gem,
  Leaf,
  PartyPopper,
} from "lucide-react";

import { products } from "@/data/products";
import { useShopStore } from "@/store/useShopStore";

type Look = {
  id: string;
  name: string;
  eyebrow: string;
  description: string;
  mood: string;
  priceLabel: string;
  icon: React.ReactNode;
  filter: (name: string) => boolean;
};

const looks: Look[] = [
  {
    id: "wedding-guest",
    name: "Wedding Guest",
    eyebrow: "Silk · Gold · Grace",
    description:
      "Soft glamour for ceremonies, dinners and those beautifully long evenings.",
    mood: "Warm & polished",
    priceLabel: "from ₹3,499",
    icon: <Gem size={18} />,
    filter: (n) => /saree|anarkali|lehenga/i.test(n),
  },
  {
    id: "festive-glow",
    name: "Festive Glow",
    eyebrow: "Color · Light · Celebration",
    description:
      "Jewel tones, delicate shine and silhouettes made for the festive calendar.",
    mood: "Joyful & luminous",
    priceLabel: "from ₹2,799",
    icon: <Sparkles size={18} />,
    filter: (n) => /festive|gold|mirror|sharara/i.test(n),
  },
  {
    id: "coffee-date",
    name: "Coffee Date",
    eyebrow: "Easy · Feminine · Effortless",
    description:
      "Relaxed kurtis and soft layers for slow mornings, cafés and casual plans.",
    mood: "Soft & cozy",
    priceLabel: "from ₹1,699",
    icon: <Coffee size={18} />,
    filter: (n) => /kurti|linen|cotton|palazzo/i.test(n),
  },
  {
    id: "office-chic",
    name: "Office Chic",
    eyebrow: "Clean · Tailored · Modern",
    description:
      "Quietly confident pieces that make Monday mornings feel a little more beautiful.",
    mood: "Calm & refined",
    priceLabel: "from ₹1,499",
    icon: <Leaf size={18} />,
    filter: (n) => /kurti|palazzo|chanderi|cotton/i.test(n),
  },
  {
    id: "date-night",
    name: "Date Night",
    eyebrow: "Romantic · Modern · A little bold",
    description:
      "Deep tones, graceful drapes and silhouettes with just enough drama.",
    mood: "Romantic & warm",
    priceLabel: "from ₹2,399",
    icon: <Heart size={18} />,
    filter: (n) => /party|wine|midnight|saree/i.test(n),
  },
  {
    id: "diwali-edit",
    name: "Diwali Edit",
    eyebrow: "Glow · Gold · Tradition",
    description:
      "Statement festive pieces for lights, family photographs and late-night celebrations.",
    mood: "Festive & radiant",
    priceLabel: "from ₹4,999",
    icon: <Sun size={18} />,
    filter: (n) => /festive|lehenga|gold|mirror/i.test(n),
  },
  {
    id: "eid-edit",
    name: "Eid Edit",
    eyebrow: "Pearl · Pastel · Poise",
    description:
      "Airy silhouettes and graceful detailing for intimate celebrations and family gatherings.",
    mood: "Elegant & serene",
    priceLabel: "from ₹2,499",
    icon: <Moon size={18} />,
    filter: (n) => /pastel|ivory|chanderi|anarkali|palazzo/i.test(n),
  },
  {
    id: "party-ready",
    name: "Party Ready",
    eyebrow: "Shimmer · Confidence · Night",
    description:
      "Make an entrance with fluid fabrics, richer colors and polished finishing touches.",
    mood: "Bold & glamorous",
    priceLabel: "from ₹2,999",
    icon: <PartyPopper size={18} />,
    filter: (n) => /party|designer|midnight|sharara/i.test(n),
  },
  {
    id: "everyday-elegance",
    name: "Everyday Elegance",
    eyebrow: "Cotton · Linen · Ease",
    description:
      "Beautiful everyday pieces that feel as good as they look.",
    mood: "Natural & effortless",
    priceLabel: "from ₹799",
    icon: <Leaf size={18} />,
    filter: (n) => /everyday|cotton|linen|printed|kurti/i.test(n),
  },
  {
    id: "summer-escape",
    name: "Summer Escape",
    eyebrow: "Breezy · Light · Fresh",
    description:
      "Breathable fabrics and easy silhouettes for sunny days and weekend getaways.",
    mood: "Fresh & relaxed",
    priceLabel: "from ₹899",
    icon: <Sun size={18} />,
    filter: (n) => /cotton|linen|printed|organza|palazzo/i.test(n),
  },
];

const heroImage =
  "https://images.unsplash.com/photo-1716504627981-22728cb2d2e2?auto=format&fit=crop&w=1600&q=90";

export default function Studio() {
  const [active, setActive] = useState("wedding-guest");
  const [category, setCategory] = useState("All");

  const addToCart = useShopStore((s) => s.addToCart);

  const activeLook =
    looks.find((l) => l.id === active) ?? looks[0];

  const outfit = useMemo(() => {
    let candidates = products.filter((p) =>
      activeLook.filter(
        `${p.name} ${p.category} ${p.occasion}`
      )
    );

    if (category !== "All") {
      candidates = candidates.filter(
        (p) => p.category === category
      );
    }

    if (candidates.length < 3) {
      const fallback = products.filter(
        (p) => category === "All" || p.category === category
      );

      candidates = [...candidates, ...fallback];
    }

    return Array.from(
      new Map(candidates.map((p) => [p.id, p])).values()
    ).slice(0, 4);
  }, [activeLook, category]);

  const total = outfit.reduce(
    (sum, product) => sum + product.price,
    0
  );

  const addCompleteLook = () => {
    outfit.forEach((product) =>
      addToCart({
        product,
        quantity: 1,
        size: "M",
        color: product.colors[0],
      })
    );
  };

  return (
    <main className="w-full min-w-0 overflow-x-clip bg-[#f5efe6]">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative min-h-[560px] overflow-hidden sm:min-h-[600px] md:min-h-[650px]">
        <Image
          src={heroImage}
          alt="Aurelia Style Studio"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#24191a]/80 via-[#24191a]/40 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#24191a]/50 via-transparent to-transparent" />

        <div
          className="
            container
            relative
            flex
            min-h-[560px]
            items-end
            pb-12
            sm:min-h-[600px]
            sm:pb-16
            md:min-h-[650px]
            md:pb-20
          "
        >
          <div className="w-full max-w-2xl text-white">
            <div className="flex items-center gap-2 text-[9px] tracking-[0.28em] text-[#ead7b8] sm:text-[10px] sm:tracking-[0.35em]">
              <Sparkles size={13} className="shrink-0" />
              <span>AURELIA STYLE STUDIO</span>
            </div>

            <h1
              className="
                serif
                mt-4
                text-5xl
                leading-[0.9]
                tracking-tight
                sm:mt-5
                sm:text-6xl
                md:text-8xl
              "
            >
              Dress for
              <br />
              the feeling.
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-6 text-white/75 sm:mt-6 sm:text-base sm:leading-7">
              Not just clothes. Complete little worlds for weddings,
              coffee dates, festive nights and everything in between.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          MOOD SELECTOR
      ===================================================== */}
      <section className="w-full py-12 sm:py-16 md:py-20">
        <div className="container">
          <div className="max-w-2xl">
            <p className="text-[10px] tracking-[0.28em] text-burgundy">
              CHOOSE YOUR MOOD
            </p>

            <h2 className="serif mt-3 text-3xl leading-tight sm:text-4xl md:text-5xl">
              What are you dressing for?
            </h2>

            <p className="mt-3 text-sm leading-6 text-black/50">
              Explore curated outfits rather than shopping one product
              at a time.
            </p>
          </div>

          {/* Horizontal mood scroller */}
          <div className="mt-7 w-full overflow-hidden sm:mt-9">
            <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
              {looks.map((look) => (
                <button
                  key={look.id}
                  type="button"
                  onClick={() => setActive(look.id)}
                  className={`
                    flex
                    shrink-0
                    items-center
                    gap-2
                    whitespace-nowrap
                    border
                    px-4
                    py-3
                    text-xs
                    transition-all
                    ${
                      active === look.id
                        ? "border-plum bg-plum text-white shadow-lg"
                        : "border-black/10 bg-white/60 hover:border-burgundy/40"
                    }
                  `}
                >
                  {look.icon}
                  {look.name}
                </button>
              ))}
            </div>
          </div>

          {/* =================================================
              MAIN OUTFIT BOARD
          ================================================= */}
          <div className="mt-8 grid gap-5 lg:mt-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-6">
            {/* Hero outfit image */}
            <div
              className="
                relative
                min-h-[420px]
                overflow-hidden
                rounded-2xl
                bg-[#e8ddcf]
                sm:min-h-[520px]
                md:min-h-[620px]
                lg:rounded-none
              "
            >
              <Image
                src={outfit[0]?.images[0] ?? heroImage}
                alt={activeLook.name}
                fill
                sizes="(max-width: 1023px) 100vw, 55vw"
                className="object-cover transition-all duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-4 right-4 text-white sm:bottom-6 sm:left-6 sm:right-6">
                <div className="text-[9px] tracking-[0.28em] text-[#ead7b8] sm:text-[10px] sm:tracking-[0.3em]">
                  {activeLook.eyebrow}
                </div>

                <h3 className="serif mt-2 text-3xl leading-tight sm:text-4xl md:text-5xl">
                  {activeLook.name}
                </h3>

                <p className="mt-2 max-w-md text-xs leading-5 text-white/70 sm:text-sm sm:leading-6">
                  {activeLook.description}
                </p>
              </div>
            </div>

            {/* Complete look panel */}
            <div className="min-w-0 border border-black/5 bg-[#fbf7f0] p-4 sm:p-6 md:p-8">
              {/* Header */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="text-[9px] tracking-[0.25em] text-burgundy sm:text-[10px]">
                    THE COMPLETE LOOK
                  </p>

                  <h3 className="serif mt-2 text-2xl leading-tight sm:text-3xl">
                    {activeLook.name}
                  </h3>
                </div>

                <span className="w-fit shrink-0 bg-[#eadfce] px-3 py-2 text-[10px]">
                  {activeLook.mood}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-black/50">
                {activeLook.description}
              </p>

              {/* Category filter */}
              <div className="mt-6 w-full overflow-hidden">
                <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                  {[
                    "All",
                    "Sarees",
                    "Kurtis",
                    "Salwar Suits",
                    "Anarkalis",
                    "Lehenga Sets",
                  ].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCategory(c)}
                      className={`
                        shrink-0
                        whitespace-nowrap
                        border
                        px-3
                        py-2
                        text-[9px]
                        tracking-wider
                        transition-colors
                        sm:text-[10px]
                        ${
                          category === c
                            ? "border-burgundy bg-burgundy text-white"
                            : "border-black/10 hover:border-burgundy"
                        }
                      `}
                    >
                      {c === "Salwar Suits"
                        ? "SUITS"
                        : c.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Products */}
              <div className="mt-6 grid gap-3 sm:mt-7">
                {outfit.map((product, index) => (
                  <div
                    key={product.id}
                    className="
                      flex
                      min-w-0
                      items-center
                      gap-3
                      border
                      border-black/5
                      bg-white
                      p-2.5
                      sm:p-3
                    "
                  >
                    <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-[#eee5d9] sm:h-24 sm:w-20">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[8px] tracking-[0.15em] text-black/35 sm:text-[9px] sm:tracking-[0.2em]">
                        {String(index + 1).padStart(2, "0")} ·{" "}
                        {product.category}
                      </p>

                      <Link
                        href={`/product/${product.slug}`}
                        className="
                          mt-0.5
                          block
                          truncate
                          text-xs
                          font-medium
                          transition-colors
                          hover:text-burgundy
                          sm:text-sm
                        "
                      >
                        {product.name}
                      </Link>

                      <p className="mt-1 truncate text-[10px] text-black/45 sm:text-xs">
                        {product.fabric} · {product.occasion}
                      </p>
                    </div>

                    <span className="shrink-0 text-xs sm:text-sm">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total / CTA */}
              <div className="mt-6 flex flex-col gap-4 border-t border-black/10 pt-5 sm:mt-7 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[9px] tracking-[0.2em] text-black/35">
                    COMPLETE LOOK
                  </p>

                  <p className="serif mt-1 text-2xl sm:text-3xl">
                    ₹{total.toLocaleString("en-IN")}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addCompleteLook}
                  className="
                    flex
                    min-h-12
                    w-full
                    items-center
                    justify-center
                    bg-plum
                    px-5
                    py-3
                    text-[9px]
                    tracking-[0.18em]
                    text-white
                    transition-colors
                    hover:bg-burgundy
                    sm:w-auto
                    sm:text-[10px]
                    sm:tracking-[0.2em]
                  "
                >
                  ADD THE LOOK
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          COLLECTION WALL
      ===================================================== */}
      <section className="w-full border-y border-black/5 bg-[#e9dfd1] py-12 sm:py-16 md:py-20">
        <div className="container">
          <div className="flex min-w-0 items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[9px] tracking-[0.28em] text-burgundy sm:text-[10px] sm:tracking-[0.3em]">
                MORE TO EXPLORE
              </p>

              <h2 className="serif mt-2 text-3xl leading-tight sm:text-4xl md:text-5xl">
                Little moments, lovely looks.
              </h2>
            </div>

            <span className="hidden shrink-0 text-xs text-black/40 md:block">
              10 curated edits
            </span>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5">
            {looks.map((look, i) => {
              const p = products[(i * 3 + 2) % products.length];

              return (
                <button
                  key={look.id}
                  type="button"
                  onClick={() => {
                    setActive(look.id);
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className="
                    group
                    min-w-0
                    overflow-hidden
                    bg-[#f8f2e9]
                    text-left
                  "
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={p.images[0]}
                      alt={look.name}
                      fill
                      sizes="
                        (max-width: 639px) 50vw,
                        (max-width: 1023px) 50vw,
                        20vw
                      "
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/0" />
                  </div>

                  <div className="min-w-0 p-3 sm:p-4">
                    <p className="truncate text-[8px] tracking-[0.15em] text-burgundy sm:text-[9px] sm:tracking-[0.2em]">
                      {look.eyebrow}
                    </p>

                    <h3 className="serif mt-1 truncate text-lg sm:text-xl">
                      {look.name}
                    </h3>

                    <p className="mt-2 text-[10px] text-black/45 sm:text-xs">
                      {look.priceLabel}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          PHILOSOPHY
      ===================================================== */}
      <section className="w-full py-14 sm:py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[9px] tracking-[0.28em] text-burgundy sm:text-[10px] sm:tracking-[0.3em]">
              THE AURELIA WAY
            </p>

            <h2 className="serif mt-3 text-3xl leading-tight sm:text-4xl md:text-5xl">
              Your wardrobe should feel like home.
            </h2>

            <p className="mt-5 text-sm leading-6 text-black/50 sm:leading-7">
              We pair familiar Indian silhouettes with softer palettes,
              thoughtful fabrics and modern styling—so every look feels
              personal instead of overly styled.
            </p>

            <Link
              href="/shop"
              className="
                mt-7
                inline-flex
                items-center
                gap-2
                text-[10px]
                tracking-[0.18em]
                text-burgundy
                sm:text-xs
                sm:tracking-[0.2em]
              "
            >
              SHOP THE COLLECTION
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}