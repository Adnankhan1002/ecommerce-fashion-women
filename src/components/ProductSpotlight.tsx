"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, ShoppingBag, Heart, Star } from "lucide-react";
import { Product } from "@/types";

type ProductSpotlightProps = {
  product: Product | null;
  onClose: () => void;
};

export default function ProductSpotlight({
  product,
  onClose,
}: ProductSpotlightProps) {
  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Spotlight container */}
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 pointer-events-none">
            <motion.div
              layoutId={`product-card-${product.id}`}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 28,
              }}
              onClick={(e) => e.stopPropagation()}
              className="
                pointer-events-auto
                relative
                w-full
                max-w-5xl
                max-h-[92vh]
                overflow-hidden
                rounded-2xl
                sm:rounded-3xl
                bg-[#f8f3ec]
                shadow-2xl
              "
            >
              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close preview"
                className="
                  absolute
                  right-3
                  top-3
                  z-30
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-white/90
                  shadow-md
                  backdrop-blur
                  transition
                  hover:scale-105
                "
              >
                <X size={18} />
              </button>

              {/* Main content */}
              <div
                className="
                  grid
                  max-h-[92vh]
                  overflow-y-auto
                  md:grid-cols-2
                  md:overflow-hidden
                "
              >
                {/* IMAGE */}
                <div
                  className="
                    relative
                    h-[42vh]
                    min-h-[280px]
                    max-h-[480px]
                    overflow-hidden
                    bg-[#eee5d9]
                    md:h-[92vh]
                    md:max-h-none
                  "
                >
                  <motion.div
                    layoutId={`product-image-${product.id}`}
                    className="relative h-full w-full"
                  >
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </motion.div>

                  {/* Image overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/35 to-transparent p-5 md:p-8">
                    <span className="inline-block rounded-full bg-white/90 px-3 py-1 text-[10px] font-medium tracking-[0.18em] text-black">
                      {product.tags?.[0] || "AURELIA"}
                    </span>
                  </div>
                </div>

                {/* DETAILS */}
                <div className="flex min-h-0 flex-col">
                  {/* Scrollable details */}
                  <div className="flex-1 overflow-y-auto p-5 sm:p-7 md:p-10">
                    <p className="text-[10px] tracking-[0.3em] text-burgundy uppercase">
                      {product.category}
                    </p>

                    <h2 className="serif mt-2 pr-8 text-3xl leading-tight sm:text-4xl">
                      {product.name}
                    </h2>

                    {/* Rating */}
                    <div className="mt-4 flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star
                          size={14}
                          className="fill-current"
                        />
                        <span className="text-sm font-medium">
                          {product.rating}
                        </span>
                      </div>

                      <span className="text-sm text-black/40">
                        ({product.reviews} reviews)
                      </span>
                    </div>

                    {/* Price */}
                    <div className="mt-6 flex items-center gap-3">
                      <span className="text-2xl font-semibold">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>

                      {product.originalPrice > product.price && (
                        <span className="text-sm text-black/35 line-through">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="mt-5 text-sm leading-6 text-black/55">
                      {product.description}
                    </p>

                    {/* Product information */}
                    <div className="mt-7 grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-white/60 p-3">
                        <p className="text-[10px] tracking-wider text-black/40 uppercase">
                          Fabric
                        </p>
                        <p className="mt-1 text-sm font-medium">
                          {product.fabric}
                        </p>
                      </div>

                      <div className="rounded-xl bg-white/60 p-3">
                        <p className="text-[10px] tracking-wider text-black/40 uppercase">
                          Occasion
                        </p>
                        <p className="mt-1 text-sm font-medium">
                          {product.occasion}
                        </p>
                      </div>
                    </div>

                    {/* Magic Coins */}
                    <div className="mt-4 rounded-xl border border-[#d8c4a5] bg-[#fffaf2] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold">
                            ✨ Magic Coins
                          </p>
                          <p className="mt-1 text-[11px] text-black/45">
                            Earn on this purchase
                          </p>
                        </div>

                        <span className="text-sm font-semibold text-burgundy">
                          +{product.magicCoins}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* STICKY ACTIONS */}
                  <div
                    className="
                      shrink-0
                      border-t
                      border-black/10
                      bg-[#f8f3ec]/95
                      p-4
                      backdrop-blur
                      sm:p-5
                    "
                  >
                    <div className="flex gap-2 sm:gap-3">
                      <button
                        className="
                          flex
                          h-12
                          w-12
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          border
                          border-black/10
                          bg-white
                          transition
                          hover:bg-black
                          hover:text-white
                        "
                        aria-label="Add to wishlist"
                      >
                        <Heart size={19} />
                      </button>

                      <button
                        className="
                          flex
                          h-12
                          flex-1
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          bg-black
                          px-4
                          text-sm
                          font-medium
                          text-white
                          transition
                          hover:bg-burgundy
                        "
                      >
                        <ShoppingBag size={18} />
                        <span>Add to Cart</span>
                      </button>

                      <Link
                        href={`/product/${product.slug}`}
                        onClick={onClose}
                        className="
                          hidden
                          h-12
                          items-center
                          justify-center
                          rounded-xl
                          border
                          border-black/10
                          bg-white
                          px-5
                          text-sm
                          font-medium
                          sm:flex
                        "
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}