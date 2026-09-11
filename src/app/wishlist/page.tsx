"use client";

import Link from "next/link";

import ProductGrid from "@/components/ProductGrid";
import { useShopStore } from "@/store/useShopStore";
import { products } from "@/data/products";

export default function Wishlist() {
  const ids = useShopStore((s) => s.wishlist);

  const items = products.filter((product) =>
    ids.includes(product.id)
  );

  return (
    <main className="w-full min-w-0 overflow-x-clip">
      <section className="container py-8 sm:py-12">

        {/* =====================================================
            HEADER
        ===================================================== */}
        <p className="text-[9px] tracking-[0.28em] text-burgundy sm:text-xs sm:tracking-[0.3em]">
          SAVED FOR LATER
        </p>

        <h1 className="serif mt-2 text-4xl leading-tight sm:text-5xl">
          Wishlist
        </h1>

        {/* =====================================================
            PRODUCTS
        ===================================================== */}
        {items.length > 0 ? (
          <div className="mt-7 min-w-0 sm:mt-10">
            <ProductGrid products={items} />
          </div>
        ) : (
          /* ===================================================
             EMPTY STATE
          =================================================== */
          <div className="mx-auto max-w-xl py-20 text-center sm:py-24">
            <h2 className="serif text-2xl leading-tight sm:text-3xl">
              Your wishlist is waiting for its first favorite ❤️
            </h2>

            <p className="mt-3 text-sm leading-6 text-black/50">
              Save the pieces you love and come back to them
              whenever you're ready.
            </p>

            <Link
              href="/shop"
              className="
                mt-7
                inline-flex
                min-h-12
                items-center
                justify-center
                bg-plum
                px-6
                py-3
                text-[10px]
                tracking-[0.16em]
                text-white
                transition-colors
                hover:bg-burgundy
                sm:text-xs
                sm:tracking-widest
              "
            >
              EXPLORE COLLECTION
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}