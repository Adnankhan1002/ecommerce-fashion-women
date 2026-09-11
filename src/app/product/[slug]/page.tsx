import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Sparkles,
  Truck,
  RotateCcw,
} from "lucide-react";

import { products } from "@/data/products";
import AddButton from "./AddButton";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const p = products.find((x) => x.slug === params.slug);

  if (!p) notFound();

  return (
    <main className="w-full min-w-0 overflow-x-clip">
      <section className="container py-7 sm:py-10">

        {/* =====================================================
            BREADCRUMB
        ===================================================== */}
        <div className="mb-6 flex min-w-0 items-center gap-1 overflow-hidden text-[10px] text-black/40 sm:mb-7 sm:text-xs">
          <Link
            href="/shop"
            className="shrink-0 transition-colors hover:text-burgundy"
          >
            Shop
          </Link>

          <span>/</span>

          <span className="truncate">{p.category}</span>
        </div>

        {/* =====================================================
            PRODUCT LAYOUT
        ===================================================== */}
        <div className="grid min-w-0 gap-8 lg:grid-cols-2 lg:gap-14">

          {/* ===================================================
              PRODUCT IMAGE
          =================================================== */}
          <div
            className="
              group
              relative
              aspect-[4/5]
              w-full
              min-w-0
              overflow-hidden
              rounded-2xl
              bg-[#eee5d9]
              sm:aspect-[3/4]
            "
          >
            <Image
              src={p.images[0]}
              alt={p.name}
              fill
              sizes="
                (max-width: 639px) 100vw,
                (max-width: 1023px) 100vw,
                50vw
              "
              className="
                object-cover
                transition-transform
                duration-700
                group-hover:scale-[1.035]
              "
              priority
            />

            {/* Editorial badge */}
            <div
              className="
                absolute
                bottom-3
                left-3
                max-w-[calc(100%-24px)]
                bg-white/85
                px-3
                py-2
                text-[8px]
                tracking-[0.16em]
                backdrop-blur
                sm:bottom-4
                sm:left-4
                sm:text-[10px]
                sm:tracking-[0.18em]
              "
            >
              EDITORIAL VIEW
            </div>
          </div>

          {/* ===================================================
              PRODUCT DETAILS
          =================================================== */}
          <div className="min-w-0 lg:pt-5">

            {/* Occasion / Category */}
            <p className="text-[9px] tracking-[0.18em] text-burgundy sm:text-xs sm:tracking-[0.25em]">
              {p.occasion.toUpperCase()} · {p.category.toUpperCase()}
            </p>

            {/* Product name */}
            <h1
              className="
                serif
                mt-3
                text-4xl
                leading-[0.98]
                sm:text-5xl
              "
            >
              {p.name}
            </h1>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-2 text-sm sm:mt-5">
              <Star
                size={15}
                fill="currentColor"
                className="shrink-0"
              />

              <span>{p.rating}</span>

              <span className="text-black/40">
                ({p.reviews} reviews)
              </span>
            </div>

            {/* =================================================
                PRICE
            ================================================= */}
            <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 sm:mt-6">
              <span className="text-2xl">
                ₹{p.price.toLocaleString("en-IN")}
              </span>

              <span className="text-sm text-black/35 line-through sm:text-base">
                ₹{p.originalPrice.toLocaleString("en-IN")}
              </span>
            </div>

            {/* =================================================
                MAGIC COINS
            ================================================= */}
            <div
              className="
                mt-4
                inline-flex
                max-w-full
                items-center
                gap-2
                bg-burgundy/5
                px-3
                py-2
                text-xs
                text-burgundy
                sm:text-sm
              "
            >
              <Sparkles size={14} className="shrink-0" />

              <span className="truncate">
                You'll earn {p.magicCoins} Magic Coins
              </span>
            </div>

            {/* Description */}
            <p className="mt-6 text-sm leading-6 text-black/60 sm:mt-7 sm:text-base sm:leading-7">
              {p.description}
            </p>

            {/* =================================================
                COLOR
            ================================================= */}
            <div className="mt-6 sm:mt-7">
              <div className="mb-2 text-sm font-medium">
                Color
              </div>

              <div className="flex max-w-full gap-2 overflow-x-auto pb-1 hide-scrollbar">
                {p.colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className="
                      min-h-10
                      shrink-0
                      whitespace-nowrap
                      border
                      border-black/10
                      px-4
                      py-2
                      text-xs
                      transition-colors
                      hover:border-burgundy
                      hover:text-burgundy
                    "
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* =================================================
                SIZE
            ================================================= */}
            <div className="mt-5 sm:mt-6">
              <div className="mb-2 text-sm font-medium">
                Size
              </div>

              <div className="flex flex-wrap gap-2">
                {p.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className="
                      min-h-10
                      min-w-12
                      border
                      border-black/10
                      px-4
                      py-2
                      text-xs
                      transition-colors
                      hover:border-burgundy
                      hover:text-burgundy
                    "
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* =================================================
                ADD TO CART
            ================================================= */}
            <div className="mt-7 sm:mt-8">
              <AddButton product={p} />
            </div>

            {/* =================================================
                DELIVERY / RETURNS
            ================================================= */}
            <div className="mt-7 grid gap-3 sm:mt-8 sm:grid-cols-2">
              <div className="bg-white p-4 text-xs text-black/60 sm:p-5">
                <Truck
                  size={17}
                  className="mb-2 text-burgundy"
                />

                <div className="font-medium text-black">
                  Fast delivery
                </div>

                <div className="mt-1">
                  Delivery in 3–5 days
                </div>
              </div>

              <div className="bg-white p-4 text-xs text-black/60 sm:p-5">
                <RotateCcw
                  size={17}
                  className="mb-2 text-burgundy"
                />

                <div className="font-medium text-black">
                  Easy returns
                </div>

                <div className="mt-1">
                  Hassle-free returns
                </div>
              </div>
            </div>

            {/* =================================================
                PRODUCT INFORMATION
            ================================================= */}
            <div className="mt-7 border-t border-black/10 pt-5 text-sm leading-6 sm:mt-8 sm:pt-6 sm:leading-7">
              <b>Product information</b>

              <p className="mt-2 text-sm text-black/55">
                Fabric: {p.fabric}
                {" · "}
                Fit: Regular
                {" · "}
                Pattern: {p.tags[1].toLowerCase()}
                {" · "}
                Country of origin: India
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}