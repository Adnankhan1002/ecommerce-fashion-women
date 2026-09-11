"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import { products } from "@/data/products";

export default function ShopContent() {
  const sp = useSearchParams();

  const [q, setQ] = useState("");
  const [sort, setSort] = useState("Recommended");
  const [cat, setCat] = useState(
    sp.get("category") || "All"
  );
  const [max, setMax] = useState(10000);

  const shown = useMemo(() => {
    let a = products.filter(
      (p) =>
        (cat === "All" || p.category === cat) &&
        p.price <= max &&
        (
          q === "" ||
          `${p.name} ${p.category} ${p.fabric}`
            .toLowerCase()
            .includes(q.toLowerCase())
        )
    );

    if (sort === "Price: Low to High") {
      a.sort((x, y) => x.price - y.price);
    }

    if (sort === "Price: High to Low") {
      a.sort((x, y) => y.price - x.price);
    }

    if (sort === "Highest Rated") {
      a.sort((x, y) => y.rating - x.rating);
    }

    return a;
  }, [cat, max, q, sort]);

  const categories = [
    "All",
    "Sarees",
    "Salwar Suits",
    "Anarkalis",
    "Kurtis",
    "Lehenga Sets",
    "Dupattas",
    "Palazzo Sets",
  ];

  return (
    <main className="container py-12">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
        <div>
          <p className="text-xs tracking-[.3em] text-burgundy">
            THE COLLECTION
          </p>

          <h1 className="serif text-5xl mt-2">
            Shop women
          </h1>

          <p className="text-sm text-black/50 mt-2">
            {shown.length} styles
          </p>
        </div>

        {/* SEARCH */}
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search styles..."
          className="
            border-b
            border-black/20
            bg-transparent
            py-3
            w-full
            md:w-64
            outline-none
          "
        />
      </div>

      {/* CATEGORIES */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-5">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`
              whitespace-nowrap
              px-4
              py-2
              text-xs
              tracking-wider
              border
              transition-colors
              ${
                cat === c
                  ? "bg-plum text-white"
                  : "border-black/10 hover:border-plum"
              }
            `}
          >
            {c}
          </button>
        ))}
      </div>

      {/* SORT */}
      <div className="flex justify-end mb-7">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="
            bg-transparent
            border-b
            border-black/20
            p-2
            text-sm
            outline-none
          "
        >
          {[
            "Recommended",
            "Price: Low to High",
            "Price: High to Low",
            "Highest Rated",
          ].map((x) => (
            <option key={x}>
              {x}
            </option>
          ))}
        </select>
      </div>

      {/* PRODUCTS */}
      <ProductGrid products={shown} />

      {/* EMPTY STATE */}
      {shown.length === 0 && (
        <div className="py-24 text-center">
          <h2 className="serif text-3xl">
            Nothing matched your search
          </h2>

          <p className="text-sm text-black/50 mt-2">
            Try another style or category.
          </p>
        </div>
      )}

      {/* PRICE FILTER */}
      <div className="mt-12">
        <label className="text-xs tracking-widest">
          PRICE UP TO ₹{max.toLocaleString("en-IN")}
        </label>

        <input
          type="range"
          min="500"
          max="10000"
          step="100"
          value={max}
          onChange={(e) =>
            setMax(Number(e.target.value))
          }
          className="w-full"
        />
      </div>
    </main>
  );
}