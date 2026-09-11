"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import ProductGrid from "@/components/ProductGrid";
import { products } from "@/data/products";
import { useShopStore } from "@/store/useShopStore";

const aliases: Record<string, { title: string; description: string; match: RegExp }> = {
  "wedding-guest": { title: "Wedding Guest", description: "Soft glamour for beautiful invitations, warm lights and long evenings.", match: /saree|anarkali|lehenga/i },
  "festive-glow": { title: "Festive Glow", description: "Rich color, delicate shine and silhouettes made for celebration.", match: /festive|gold|mirror|sharara/i },
  "coffee-date": { title: "Coffee Date", description: "Easy silhouettes for slow mornings and spontaneous plans.", match: /kurti|linen|cotton|palazzo/i },
  "office-chic": { title: "Office Chic", description: "Quietly confident pieces for polished everyday dressing.", match: /kurti|palazzo|chanderi|cotton/i },
  "date-night": { title: "Date Night", description: "Romantic drapes and deeper tones with just enough drama.", match: /party|wine|midnight|saree/i },
  "diwali-edit": { title: "Diwali Edit", description: "Glow-ready pieces for lights, family photographs and celebrations.", match: /festive|lehenga|gold|mirror/i },
  "eid-edit": { title: "Eid Edit", description: "Pearl, pastel and graceful silhouettes for intimate celebrations.", match: /pastel|ivory|chanderi|anarkali|palazzo/i },
  "party-ready": { title: "Party Ready", description: "A polished edit for evenings when you want to make an entrance.", match: /party|designer|midnight|sharara/i },
  "everyday-elegance": { title: "Everyday Elegance", description: "Beautiful everyday pieces that feel as good as they look.", match: /everyday|cotton|linen|printed|kurti/i },
  "summer-escape": { title: "Summer Escape", description: "Breathable textures and easy silhouettes for sunny days.", match: /cotton|linen|printed|organza|palazzo/i },
};

export default function Look({ params }: { params: { look: string } }) {
  const addToCart = useShopStore(s => s.addToCart);
  const meta = aliases[params.look] ?? aliases["everyday-elegance"];

  const selected = useMemo(() => {
    const matching = products.filter(p => meta.match.test(`${p.name} ${p.category} ${p.occasion}`));
    return (matching.length ? matching : products).slice(0, 8);
  }, [meta]);

  const total = selected.slice(0, 4).reduce((sum, p) => sum + p.price, 0);

  const addLook = () => {
    selected.slice(0, 4).forEach(product =>
      addToCart({ product, quantity: 1, size: "M", color: product.colors[0] })
    );
  };

  return (
    <main className="min-h-screen bg-[#f5efe6]">
      <section className="container py-10">
        <Link href="/style-studio" className="inline-flex items-center gap-2 text-xs text-black/45">
          <ArrowLeft size={14} /> STYLE STUDIO
        </Link>

        <div className="max-w-3xl mt-12">
          <p className="text-[10px] tracking-[.3em] text-burgundy">CURATED EDIT</p>
          <h1 className="serif text-6xl md:text-7xl mt-3">{meta.title}</h1>
          <p className="text-black/55 leading-7 mt-5">{meta.description}</p>

          <div className="flex flex-wrap items-center gap-4 mt-7">
            <span className="bg-[#eadfce] px-4 py-2 text-xs">
              Complete look · ₹{total.toLocaleString("en-IN")}
            </span>
            <button
              onClick={addLook}
              className="bg-plum text-white px-5 py-3 text-[10px] tracking-[.2em]"
            >
              ADD COMPLETE LOOK
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-5 mt-14">
          {selected.slice(0, 4).map((product, i) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group bg-[#fbf7f0] p-3"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#e9dfd1]">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="50vw"
                  className="object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute left-4 top-4 bg-white/90 backdrop-blur px-3 py-2 text-[9px] tracking-[.18em]">
                  {String(i + 1).padStart(2, "0")} · {product.category}
                </div>
              </div>
              <div className="p-4 flex justify-between gap-4">
                <div>
                  <h2 className="serif text-2xl">{product.name}</h2>
                  <p className="text-xs text-black/45 mt-1">{product.fabric} · {product.occasion}</p>
                </div>
                <span className="text-sm shrink-0">₹{product.price.toLocaleString("en-IN")}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] tracking-[.3em] text-burgundy">YOU MAY ALSO LOVE</p>
              <h2 className="serif text-4xl mt-2">Complete the mood</h2>
            </div>
            <Sparkles className="text-burgundy/40" />
          </div>
          <div className="mt-8">
            <ProductGrid products={selected.slice(4)} />
          </div>
        </div>
      </section>
    </main>
  );
}
