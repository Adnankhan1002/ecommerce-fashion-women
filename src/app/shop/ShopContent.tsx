"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, Search } from "lucide-react";

import ProductGrid from "@/components/ProductGrid";
import { products } from "@/data/products";

export default function ShopContent() {
  const sp = useSearchParams();

  const [q, setQ] = useState("");
  const [sort, setSort] = useState("Recommended");
  const [cat, setCat] = useState(sp.get("category") || "All");
  const [max, setMax] = useState(10000);

  const shown = useMemo(() => {
    let filtered = products.filter(
      (p) =>
        (cat === "All" || p.category === cat) &&
        p.price <= max &&
        (q === "" ||
          `${p.name} ${p.category} ${p.fabric}`
            .toLowerCase()
            .includes(q.toLowerCase()))
    );

    if (sort === "Price: Low to High") {
      filtered = [...filtered].sort((x, y) => x.price - y.price);
    }

    if (sort === "Price: High to Low") {
      filtered = [...filtered].sort((x, y) => y.price - x.price);
    }

    if (sort === "Highest Rated") {
      filtered = [...filtered].sort((x, y) => y.rating - x.rating);
    }

    return filtered;
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
    <main className="w-full min-w-0 overflow-x-clip">
      {/* =====================================================
          SHOP HEADER
      ===================================================== */}
      <section className="container pt-8 pb-6 sm:pt-12 sm:pb-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          {/* Title */}
          <div className="min-w-0">
            <p className="text-[10px] tracking-[0.28em] text-burgundy sm:text-xs sm:tracking-[0.3em]">
              THE COLLECTION
            </p>

            <h1 className="serif mt-2 text-4xl leading-tight sm:text-5xl">
              Shop women
            </h1>

            <p className="mt-2 text-xs text-black/50 sm:text-sm">
              {shown.length} {shown.length === 1 ? "style" : "styles"}
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search
              size={17}
              className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-black/40"
            />

            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search styles..."
              className="
                h-12
                w-full
                border-b
                border-black/20
                bg-transparent
                pl-7
                pr-2
                text-sm
                outline-none
                transition-colors
                placeholder:text-black/35
                focus:border-burgundy
              "
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          CATEGORY FILTER
      ===================================================== */}
      <section className="w-full overflow-hidden border-y border-black/5">
        <div className="container py-4">
          <div
            className="
              flex
              w-full
              gap-2
              overflow-x-auto
              pb-1
              hide-scrollbar
            "
          >
            {categories.map((category) => {
              const active = cat === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setCat(category)}
                  className={`
                    shrink-0
                    whitespace-nowrap
                    rounded-full
                    border
                    px-4
                    py-2.5
                    text-[10px]
                    tracking-[0.12em]
                    transition-all
                    duration-200
                    sm:text-xs
                    ${
                      active
                        ? "border-plum bg-plum text-white"
                        : "border-black/10 bg-transparent hover:border-plum"
                    }
                  `}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          RESULTS / SORT
      ===================================================== */}
      <section className="container pt-7 sm:pt-8">
        <div className="mb-6 flex items-center justify-between gap-4 sm:mb-7">
          <div className="flex items-center gap-2 text-xs text-black/50">
            <SlidersHorizontal size={15} />
            <span className="hidden sm:inline">SORT BY</span>
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="
              min-w-0
              max-w-[190px]
              border-b
              border-black/20
              bg-transparent
              px-1
              py-2
              text-xs
              outline-none
              sm:text-sm
            "
          >
            {[
              "Recommended",
              "Price: Low to High",
              "Price: High to Low",
              "Highest Rated",
            ].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* =================================================
            PRODUCTS
        ================================================= */}
        {shown.length > 0 ? (
          <ProductGrid products={shown} />
        ) : (
          <div className="py-20 text-center sm:py-24">
            <h2 className="serif text-2xl sm:text-3xl">
              Nothing matched your search
            </h2>

            <p className="mt-2 text-sm text-black/50">
              Try another style or category.
            </p>

            <button
              type="button"
              onClick={() => {
                setQ("");
                setCat("All");
                setMax(10000);
                setSort("Recommended");
              }}
              className="
                mt-6
                rounded-full
                bg-plum
                px-5
                py-3
                text-xs
                tracking-wider
                text-white
              "
            >
              CLEAR FILTERS
            </button>
          </div>
        )}

        {/* =================================================
            PRICE FILTER
        ================================================= */}
        <div className="mt-10 pb-10 sm:mt-12">
          <div className="mb-3 flex items-center justify-between gap-4">
            <label className="text-[10px] tracking-[0.15em] text-black/60 sm:text-xs sm:tracking-widest">
              PRICE UP TO
            </label>

            <span className="shrink-0 text-sm font-medium">
              ₹{max.toLocaleString("en-IN")}
            </span>
          </div>

          <input
            type="range"
            min="500"
            max="10000"
            step="100"
            value={max}
            onChange={(e) => setMax(Number(e.target.value))}
            className="w-full cursor-pointer"
          />

          <div className="mt-2 flex justify-between text-[10px] text-black/35">
            <span>₹500</span>
            <span>₹10,000</span>
          </div>
        </div>
      </section>
    </main>
  );
}