"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Heart, Sparkles, Sun, Moon, Coffee, Gem, Leaf, PartyPopper } from "lucide-react";
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
    description: "Soft glamour for ceremonies, dinners and those beautifully long evenings.",
    mood: "Warm & polished",
    priceLabel: "from ₹3,499",
    icon: <Gem size={18} />,
    filter: n => /saree|anarkali|lehenga/i.test(n),
  },
  {
    id: "festive-glow",
    name: "Festive Glow",
    eyebrow: "Color · Light · Celebration",
    description: "Jewel tones, delicate shine and silhouettes made for the festive calendar.",
    mood: "Joyful & luminous",
    priceLabel: "from ₹2,799",
    icon: <Sparkles size={18} />,
    filter: n => /festive|gold|mirror|sharara/i.test(n),
  },
  {
    id: "coffee-date",
    name: "Coffee Date",
    eyebrow: "Easy · Feminine · Effortless",
    description: "Relaxed kurtis and soft layers for slow mornings, cafés and casual plans.",
    mood: "Soft & cozy",
    priceLabel: "from ₹1,699",
    icon: <Coffee size={18} />,
    filter: n => /kurti|linen|cotton|palazzo/i.test(n),
  },
  {
    id: "office-chic",
    name: "Office Chic",
    eyebrow: "Clean · Tailored · Modern",
    description: "Quietly confident pieces that make Monday mornings feel a little more beautiful.",
    mood: "Calm & refined",
    priceLabel: "from ₹1,499",
    icon: <Leaf size={18} />,
    filter: n => /kurti|palazzo|chanderi|cotton/i.test(n),
  },
  {
    id: "date-night",
    name: "Date Night",
    eyebrow: "Romantic · Modern · A little bold",
    description: "Deep tones, graceful drapes and silhouettes with just enough drama.",
    mood: "Romantic & warm",
    priceLabel: "from ₹2,399",
    icon: <Heart size={18} />,
    filter: n => /party|wine|midnight|saree/i.test(n),
  },
  {
    id: "diwali-edit",
    name: "Diwali Edit",
    eyebrow: "Glow · Gold · Tradition",
    description: "Statement festive pieces for lights, family photographs and late-night celebrations.",
    mood: "Festive & radiant",
    priceLabel: "from ₹4,999",
    icon: <Sun size={18} />,
    filter: n => /festive|lehenga|gold|mirror/i.test(n),
  },
  {
    id: "eid-edit",
    name: "Eid Edit",
    eyebrow: "Pearl · Pastel · Poise",
    description: "Airy silhouettes and graceful detailing for intimate celebrations and family gatherings.",
    mood: "Elegant & serene",
    priceLabel: "from ₹2,499",
    icon: <Moon size={18} />,
    filter: n => /pastel|ivory|chanderi|anarkali|palazzo/i.test(n),
  },
  {
    id: "party-ready",
    name: "Party Ready",
    eyebrow: "Shimmer · Confidence · Night",
    description: "Make an entrance with fluid fabrics, richer colors and polished finishing touches.",
    mood: "Bold & glamorous",
    priceLabel: "from ₹2,999",
    icon: <PartyPopper size={18} />,
    filter: n => /party|designer|midnight|sharara/i.test(n),
  },
  {
    id: "everyday-elegance",
    name: "Everyday Elegance",
    eyebrow: "Cotton · Linen · Ease",
    description: "Beautiful everyday pieces that feel as good as they look.",
    mood: "Natural & effortless",
    priceLabel: "from ₹799",
    icon: <Leaf size={18} />,
    filter: n => /everyday|cotton|linen|printed|kurti/i.test(n),
  },
  {
    id: "summer-escape",
    name: "Summer Escape",
    eyebrow: "Breezy · Light · Fresh",
    description: "Breathable fabrics and easy silhouettes for sunny days and weekend getaways.",
    mood: "Fresh & relaxed",
    priceLabel: "from ₹899",
    icon: <Sun size={18} />,
    filter: n => /cotton|linen|printed|organza|palazzo/i.test(n),
  },
];

const heroImage =
  "https://images.unsplash.com/photo-1716504627981-22728cb2d2e2?auto=format&fit=crop&w=1600&q=90";

export default function Studio() {
  const [active, setActive] = useState("wedding-guest");
  const [category, setCategory] = useState("All");
  const addToCart = useShopStore(s => s.addToCart);

  const activeLook = looks.find(l => l.id === active) ?? looks[0];

  const outfit = useMemo(() => {
    let candidates = products.filter(p => activeLook.filter(`${p.name} ${p.category} ${p.occasion}`));
    if (category !== "All") candidates = candidates.filter(p => p.category === category);

    if (candidates.length < 3) {
      const fallback = products.filter(p => category === "All" || p.category === category);
      candidates = [...candidates, ...fallback];
    }

    return Array.from(new Map(candidates.map(p => [p.id, p])).values()).slice(0, 4);
  }, [activeLook, category]);

  const total = outfit.reduce((sum, p) => sum + p.price, 0);

  const addCompleteLook = () => {
    outfit.forEach(product =>
      addToCart({
        product,
        quantity: 1,
        size: "M",
        color: product.colors[0],
      })
    );
  };

  return (
    <main className="min-h-screen bg-[#f5efe6]">
      {/* Cozy hero */}
      <section className="relative min-h-[560px] md:min-h-[650px] overflow-hidden">
        <Image
          src={heroImage}
          alt="Aurelia Style Studio"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#24191a]/75 via-[#24191a]/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#24191a]/45 via-transparent to-transparent" />

        <div className="container relative min-h-[560px] md:min-h-[650px] flex items-end pb-16 md:pb-20">
          <div className="max-w-2xl text-white">
            <div className="flex items-center gap-2 text-[#ead7b8] text-[10px] tracking-[.35em]">
              <Sparkles size={14} /> AURELIA STYLE STUDIO
            </div>
            <h1 className="serif text-6xl md:text-8xl leading-[.9] mt-5">
              Dress for<br />the feeling.
            </h1>
            <p className="max-w-xl mt-6 text-white/75 leading-7">
              Not just clothes. Complete little worlds for weddings, coffee dates,
              festive nights and everything in between.
            </p>
          </div>
        </div>
      </section>

      {/* Mood selector */}
      <section className="container py-16 md:py-20">
        <div className="max-w-2xl">
          <p className="text-[10px] tracking-[.32em] text-burgundy">CHOOSE YOUR MOOD</p>
          <h2 className="serif text-4xl md:text-5xl mt-3">What are you dressing for?</h2>
          <p className="text-sm text-black/50 mt-3">
            Explore curated outfits rather than shopping one product at a time.
          </p>
        </div>

        <div className="flex gap-2 overflow-x-auto hide-scrollbar mt-9 pb-2">
          {looks.map(look => (
            <button
              key={look.id}
              onClick={() => setActive(look.id)}
              className={`shrink-0 flex items-center gap-2 px-4 py-3 border text-xs transition-all ${
                active === look.id
                  ? "bg-plum text-white border-plum shadow-lg"
                  : "bg-white/60 border-black/10 hover:border-burgundy/40"
              }`}
            >
              {look.icon}
              {look.name}
            </button>
          ))}
        </div>

        {/* Main outfit board */}
        <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-6 mt-10">
          <div className="relative min-h-[520px] md:min-h-[620px] overflow-hidden bg-[#e8ddcf]">
            <Image
              src={outfit[0]?.images[0] ?? heroImage}
              alt={activeLook.name}
              fill
              sizes="(max-width:1024px) 100vw, 55vw"
              className="object-cover transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

            <div className="absolute left-6 right-6 bottom-6 text-white">
              <div className="text-[10px] tracking-[.3em] text-[#ead7b8]">
                {activeLook.eyebrow}
              </div>
              <h3 className="serif text-4xl md:text-5xl mt-2">{activeLook.name}</h3>
              <p className="text-sm text-white/70 mt-2 max-w-md">
                {activeLook.description}
              </p>
            </div>
          </div>

          <div className="bg-[#fbf7f0] p-6 md:p-8 border border-black/5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] tracking-[.25em] text-burgundy">THE COMPLETE LOOK</p>
                <h3 className="serif text-3xl mt-2">{activeLook.name}</h3>
              </div>
              <span className="text-xs bg-[#eadfce] px-3 py-2">{activeLook.mood}</span>
            </div>

            <p className="text-sm text-black/50 leading-6 mt-4">{activeLook.description}</p>

            <div className="mt-7 flex gap-2">
              {["All", "Sarees", "Kurtis", "Salwar Suits", "Anarkalis", "Lehenga Sets"].map(c => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`text-[10px] px-3 py-2 border ${
                    category === c
                      ? "bg-burgundy text-white border-burgundy"
                      : "border-black/10"
                  }`}
                >
                  {c === "Salwar Suits" ? "SUITS" : c.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="mt-7 grid gap-3">
              {outfit.map((product, index) => (
                <div
                  key={product.id}
                  className="flex gap-3 items-center bg-white p-3 border border-black/5"
                >
                  <div className="relative w-20 h-24 shrink-0 overflow-hidden bg-[#eee5d9]">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] tracking-[.2em] text-black/35">
                      {String(index + 1).padStart(2, "0")} · {product.category}
                    </p>
                    <Link
                      href={`/product/${product.slug}`}
                      className="text-sm font-medium hover:text-burgundy transition-colors"
                    >
                      {product.name}
                    </Link>
                    <p className="text-xs text-black/45 mt-1">
                      {product.fabric} · {product.occasion}
                    </p>
                  </div>
                  <span className="text-sm shrink-0">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-black/10 mt-7 pt-5 flex items-end justify-between">
              <div>
                <p className="text-[10px] tracking-[.2em] text-black/35">COMPLETE LOOK</p>
                <p className="serif text-3xl mt-1">₹{total.toLocaleString("en-IN")}</p>
              </div>
              <button
                onClick={addCompleteLook}
                className="bg-plum text-white px-5 py-3 text-[10px] tracking-[.2em] hover:bg-burgundy transition-colors"
              >
                ADD THE LOOK
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Cozy collection wall */}
      <section className="bg-[#e9dfd1] border-y border-black/5 py-16 md:py-20">
        <div className="container">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-[10px] tracking-[.3em] text-burgundy">MORE TO EXPLORE</p>
              <h2 className="serif text-4xl md:text-5xl mt-2">Little moments, lovely looks.</h2>
            </div>
            <span className="hidden md:block text-xs text-black/40">10 curated edits</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-10">
            {looks.map((look, i) => {
              const p = products[(i * 3 + 2) % products.length];
              return (
                <button
                  key={look.id}
                  onClick={() => {
                    setActive(look.id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="group text-left bg-[#f8f2e9] overflow-hidden"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={p.images[0]}
                      alt={look.name}
                      fill
                      sizes="20vw"
                      className="object-cover group-hover:scale-105 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition" />
                  </div>
                  <div className="p-4">
                    <p className="text-[9px] tracking-[.2em] text-burgundy">{look.eyebrow}</p>
                    <h3 className="serif text-xl mt-1">{look.name}</h3>
                    <p className="text-xs text-black/45 mt-2">{look.priceLabel}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Styling philosophy */}
      <section className="container py-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[10px] tracking-[.3em] text-burgundy">THE AURELIA WAY</p>
          <h2 className="serif text-4xl md:text-5xl mt-3">
            Your wardrobe should feel like home.
          </h2>
          <p className="text-black/50 leading-7 mt-5">
            We pair familiar Indian silhouettes with softer palettes, thoughtful
            fabrics and modern styling—so every look feels personal instead of
            overly styled.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 mt-7 text-xs tracking-[.2em] text-burgundy"
          >
            SHOP THE COLLECTION <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}
