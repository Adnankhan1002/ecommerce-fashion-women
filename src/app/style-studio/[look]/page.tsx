"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";

import ProductGrid from "@/components/ProductGrid";
import { products } from "@/data/products";
import { useShopStore } from "@/store/useShopStore";

const aliases: Record<
  string,
  {
    title: string;
    description: string;
    match: RegExp;
  }
> = {
  "wedding-guest": {
    title: "Wedding Guest",
    description:
      "Soft glamour for beautiful invitations, warm lights and long evenings.",
    match: /saree|anarkali|lehenga/i,
  },
  "festive-glow": {
    title: "Festive Glow",
    description:
      "Rich color, delicate shine and silhouettes made for celebration.",
    match: /festive|gold|mirror|sharara/i,
  },
  "coffee-date": {
    title: "Coffee Date",
    description:
      "Easy silhouettes for slow mornings and spontaneous plans.",
    match: /kurti|linen|cotton|palazzo/i,
  },
  "office-chic": {
    title: "Office Chic",
    description:
      "Quietly confident pieces for polished everyday dressing.",
    match: /kurti|palazzo|chanderi|cotton/i,
  },
  "date-night": {
    title: "Date Night",
    description:
      "Romantic drapes and deeper tones with just enough drama.",
    match: /party|wine|midnight|saree/i,
  },
  "diwali-edit": {
    title: "Diwali Edit",
    description:
      "Glow-ready pieces for lights, family photographs and celebrations.",
    match: /festive|lehenga|gold|mirror/i,
  },
  "eid-edit": {
    title: "Eid Edit",
    description:
      "Pearl, pastel and graceful silhouettes for intimate celebrations.",
    match: /pastel|ivory|chanderi|anarkali|palazzo/i,
  },
  "party-ready": {
    title: "Party Ready",
    description:
      "A polished edit for evenings when you want to make an entrance.",
    match: /party|designer|midnight|sharara/i,
  },
  "everyday-elegance": {
    title: "Everyday Elegance",
    description:
      "Beautiful everyday pieces that feel as good as they look.",
    match: /everyday|cotton|linen|printed|kurti/i,
  },
  "summer-escape": {
    title: "Summer Escape",
    description:
      "Breathable textures and easy silhouettes for sunny days.",
    match: /cotton|linen|printed|organza|palazzo/i,
  },
};

export default function Look({
  params,
}: {
  params: { look: string };
}) {
  const addToCart = useShopStore((s) => s.addToCart);

  const meta =
    aliases[params.look] ??
    aliases["everyday-elegance"];

  const selected = useMemo(() => {
    const matching = products.filter((p) =>
      meta.match.test(
        `${p.name} ${p.category} ${p.occasion}`
      )
    );

    return (matching.length ? matching : products).slice(0, 8);
  }, [meta]);

  const total = selected
    .slice(0, 4)
    .reduce((sum, p) => sum + p.price, 0);

  const addLook = () => {
    selected.slice(0, 4).forEach((product) =>
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
      <section className="container py-8 sm:py-10">
        {/* =====================================================
            BACK
        ===================================================== */}
        <Link
          href="/style-studio"
          className="
            inline-flex
            items-center
            gap-2
            text-[10px]
            text-black/45
            transition-colors
            hover:text-burgundy
            sm:text-xs
          "
        >
          <ArrowLeft size={14} />
          STYLE STUDIO
        </Link>

        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="mt-9 max-w-3xl sm:mt-12">
          <p className="text-[9px] tracking-[0.28em] text-burgundy sm:text-[10px] sm:tracking-[0.3em]">
            CURATED EDIT
          </p>

          <h1
            className="
              serif
              mt-3
              text-4xl
              leading-[0.95]
              sm:text-5xl
              md:text-7xl
            "
          >
            {meta.title}
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-black/55 sm:mt-5 sm:leading-7">
            {meta.description}
          </p>

          {/* CTA */}
          <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center">
            <span
              className="
                w-full
                bg-[#eadfce]
                px-4
                py-3
                text-center
                text-xs
                sm:w-auto
              "
            >
              Complete look · ₹
              {total.toLocaleString("en-IN")}
            </span>

            <button
              type="button"
              onClick={addLook}
              className="
                min-h-12
                w-full
                bg-plum
                px-5
                py-3
                text-[10px]
                tracking-[0.16em]
                text-white
                transition-colors
                hover:bg-burgundy
                sm:w-auto
                sm:tracking-[0.2em]
              "
            >
              ADD COMPLETE LOOK
            </button>
          </div>
        </div>

        {/* =====================================================
            FEATURED PRODUCTS
        ===================================================== */}
        <div className="mt-10 grid min-w-0 gap-4 sm:mt-14 sm:gap-5 lg:grid-cols-2">
          {selected.slice(0, 4).map((product, i) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="
                group
                min-w-0
                overflow-hidden
                rounded-2xl
                bg-[#fbf7f0]
                p-2.5
                sm:p-3
              "
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#e9dfd1]">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="
                    (max-width: 639px) 100vw,
                    (max-width: 1023px) 50vw,
                    50vw
                  "
                  className="
                    object-cover
                    transition
                    duration-700
                    group-hover:scale-105
                  "
                />

                <div className="absolute left-3 top-3 max-w-[calc(100%-24px)] bg-white/90 px-3 py-2 text-[8px] tracking-[0.15em] backdrop-blur sm:left-4 sm:top-4 sm:text-[9px] sm:tracking-[0.18em]">
                  <span className="block truncate">
                    {String(i + 1).padStart(2, "0")} ·{" "}
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Product information */}
              <div className="flex min-w-0 items-start justify-between gap-3 p-3 sm:p-4">
                <div className="min-w-0">
                  <h2 className="serif text-xl leading-tight sm:text-2xl">
                    {product.name}
                  </h2>

                  <p className="mt-1 truncate text-[10px] text-black/45 sm:text-xs">
                    {product.fabric} · {product.occasion}
                  </p>
                </div>

                <span className="shrink-0 text-xs sm:text-sm">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* =====================================================
            RECOMMENDATIONS
        ===================================================== */}
        <section className="mt-12 sm:mt-16">
          <div className="flex min-w-0 items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[9px] tracking-[0.28em] text-burgundy sm:text-[10px] sm:tracking-[0.3em]">
                YOU MAY ALSO LOVE
              </p>

              <h2 className="serif mt-2 text-3xl leading-tight sm:text-4xl">
                Complete the mood
              </h2>
            </div>

            <Sparkles
              className="shrink-0 text-burgundy/40"
              size={20}
            />
          </div>

          <div className="mt-6 sm:mt-8">
            <ProductGrid products={selected.slice(4)} />
          </div>
        </section>
      </section>
    </main>
  );
}