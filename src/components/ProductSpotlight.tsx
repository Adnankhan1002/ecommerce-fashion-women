"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, ShoppingBag, X, Sparkles, Star } from "lucide-react";
import { Product } from "@/types";
import { useShopStore } from "@/store/useShopStore";

type ProductSpotlightProps = {
  product: Product | null;
  onClose: () => void;
};

export default function ProductSpotlight({
  product,
  onClose,
}: ProductSpotlightProps) {
  const { wishlist, toggleWishlist, addToCart } = useShopStore();

  if (!product) return null;

  const liked = wishlist.includes(product.id);

  const add = () => {
    addToCart({
      product,
      quantity: 1,
      size: "M",
      color: product.colors[0],
    });

    onClose();
  };

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* BACKDROP */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* SPOTLIGHT CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 25 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.92,
              y: 25,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 25,
            }}
            className="
              relative
              z-10
              w-full
              max-w-4xl
              overflow-hidden
              rounded-2xl
              bg-[#f8f3ed]
              shadow-[0_30px_100px_rgba(0,0,0,0.35)]
            "
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={onClose}
              className="
                absolute
                right-4
                top-4
                z-30
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-white/90
                backdrop-blur
                shadow-lg
                transition
                hover:scale-105
              "
              aria-label="Close product preview"
            >
              <X size={18} />
            </button>

            <div className="grid md:grid-cols-2">
              {/* IMAGE */}
              <motion.div
                layoutId={`product-image-${product.id}`}
                className="
                  relative
                  aspect-[3/4]
                  min-h-[420px]
                  overflow-hidden
                  bg-[#eee5d9]
                  md:min-h-[600px]
                "
              >
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />

                {/* IMAGE GRADIENT */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                {/* TAG */}
                <div className="absolute left-4 top-4">
                  <span className="bg-white/90 px-3 py-1.5 text-[9px] tracking-[0.18em] backdrop-blur">
                    {product.tags[0]}
                  </span>
                </div>
              </motion.div>

              {/* PRODUCT DETAILS */}
              <div className="flex flex-col justify-center p-7 sm:p-10 md:p-12">
                {/* CATEGORY */}
                <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-burgundy">
                  {product.category}
                </p>

                {/* NAME */}
                <h2 className="font-serif text-3xl leading-tight text-charcoal sm:text-4xl">
                  {product.name}
                </h2>

                {/* RATING */}
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star
                      size={14}
                      fill="currentColor"
                      className="text-burgundy"
                    />

                    <span className="text-sm">
                      {product.rating}
                    </span>
                  </div>

                  <span className="text-xs text-black/40">
                    ({product.reviews} reviews)
                  </span>
                </div>

                {/* PRICE */}
                <div className="mt-7 flex items-center gap-3">
                  <span className="text-2xl font-medium">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>

                  <span className="text-sm text-black/35 line-through">
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* DESCRIPTION */}
                <p className="mt-6 text-sm leading-7 text-black/60">
                  {product.description}
                </p>

                {/* PRODUCT INFO */}
                <div className="mt-7 grid grid-cols-2 gap-3">
                  <div className="border border-black/10 p-3">
                    <p className="text-[9px] uppercase tracking-[0.15em] text-black/35">
                      Fabric
                    </p>

                    <p className="mt-1 text-sm">
                      {product.fabric}
                    </p>
                  </div>

                  <div className="border border-black/10 p-3">
                    <p className="text-[9px] uppercase tracking-[0.15em] text-black/35">
                      Occasion
                    </p>

                    <p className="mt-1 text-sm">
                      {product.occasion}
                    </p>
                  </div>
                </div>

                {/* MAGIC COINS */}
                <div className="mt-5 flex items-center gap-2 text-[11px] text-burgundy">
                  <Sparkles size={14} />

                  <span>
                    Earn {product.magicCoins} Magic Coins
                  </span>
                </div>

                {/* ACTIONS */}
                <div className="mt-8 flex gap-3">
                  <button
                    onClick={add}
                    className="
                      flex
                      flex-1
                      items-center
                      justify-center
                      gap-2
                      bg-charcoal
                      px-5
                      py-4
                      text-[10px]
                      tracking-[0.2em]
                      text-white
                      transition
                      hover:bg-burgundy
                    "
                  >
                    <ShoppingBag size={15} />
                    ADD TO BAG
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="
                      flex
                      h-[50px]
                      w-[50px]
                      items-center
                      justify-center
                      border
                      border-black/10
                      bg-white
                      transition
                      hover:border-burgundy
                    "
                    aria-label="Add to wishlist"
                  >
                    <Heart
                      size={18}
                      fill={liked ? "currentColor" : "none"}
                      className={
                        liked ? "text-burgundy" : ""
                      }
                    />
                  </button>
                </div>

                {/* VIEW FULL PRODUCT */}
                <a
                  href={`/product/${product.slug}`}
                  className="
                    mt-5
                    text-center
                    text-[10px]
                    uppercase
                    tracking-[0.2em]
                    text-black/50
                    transition
                    hover:text-burgundy
                  "
                >
                  View Full Product →
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}