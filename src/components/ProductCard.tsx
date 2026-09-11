"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Plus,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { useShopStore } from "@/store/useShopStore";

export default function ProductCard({
  product,
  onPreview,
}: {
  product: Product;
  onPreview: (product: Product) => void;
}) {
  const { wishlist, toggleWishlist, addToCart } = useShopStore();

  const liked = wishlist.includes(product.id);

  const add = () =>
    addToCart({
      product,
      quantity: 1,
      size: "M",
      color: product.colors[0],
    });

  const discount = Math.max(
    0,
    Math.round(
      (1 - product.price / product.originalPrice) * 100
    )
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45 }}
      className="group min-w-0 w-full"
    >
      {/* =====================================================
          PRODUCT IMAGE
      ===================================================== */}
      <div
        className="
          relative
          aspect-[3/4]
          w-full
          min-w-0
          overflow-hidden
          rounded-xl
          bg-[#eee5d9]
          sm:rounded-2xl
        "
      >
        {/* Preview / image */}
        <button
          type="button"
          onClick={() => onPreview(product)}
          aria-label={`Preview ${product.name}`}
          className="absolute inset-0 z-0 block h-full w-full cursor-pointer"
        >
          <motion.div
            layoutId={`product-image-${product.id}`}
            className="absolute inset-0"
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="
                (max-width: 639px) 50vw,
                (max-width: 1023px) 33vw,
                25vw
              "
              className="
                object-cover
                transition-transform
                duration-700
                ease-out
                group-hover:scale-[1.055]
              "
            />
          </motion.div>

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/25
              via-transparent
              to-transparent
              opacity-0
              transition-opacity
              duration-500
              group-hover:opacity-100
            "
          />
        </button>

        {/* ===================================================
            BADGES
        =================================================== */}
        <div className="absolute left-2 top-2 z-10 flex max-w-[calc(100%-52px)] gap-1.5 sm:left-3 sm:top-3 sm:gap-2">
          <span
            className="
              max-w-full
              truncate
              bg-white/92
              px-2
              py-1
              text-[8px]
              tracking-[0.14em]
              backdrop-blur
              sm:px-2.5
              sm:text-[9px]
              sm:tracking-[0.18em]
            "
          >
            {product.tags[0]}
          </span>

          {discount > 0 && (
            <span
              className="
                shrink-0
                bg-burgundy
                px-2
                py-1
                text-[8px]
                tracking-[0.08em]
                text-white
                sm:px-2.5
                sm:text-[9px]
                sm:tracking-[0.12em]
              "
            >
              {discount}% OFF
            </span>
          )}
        </div>

        {/* ===================================================
            WISHLIST
        =================================================== */}
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          className="
            absolute
            right-2
            top-2
            z-20
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-white/90
            p-2
            backdrop-blur
            transition-transform
            duration-300
            hover:scale-110
            sm:right-3
            sm:top-3
          "
          aria-label={`${
            liked ? "Remove" : "Add"
          } ${product.name} ${
            liked ? "from" : "to"
          } wishlist`}
        >
          <Heart
            size={16}
            fill={liked ? "currentColor" : "none"}
            className={liked ? "text-burgundy" : ""}
          />
        </button>

        {/* ===================================================
            QUICK ADD
        =================================================== */}
        <div
          className="
            absolute
            inset-x-2
            bottom-2
            z-20
            hidden
            translate-y-3
            opacity-0
            transition-all
            duration-300
            group-hover:translate-y-0
            group-hover:opacity-100
            sm:block
            sm:inset-x-3
            sm:bottom-3
          "
        >
          <button
            type="button"
            onClick={add}
            className="
              flex
              min-h-11
              w-full
              items-center
              justify-center
              gap-2
              bg-white/95
              px-2
              py-3
              text-[9px]
              tracking-[0.14em]
              text-charcoal
              shadow-xl
              backdrop-blur
              transition-colors
              hover:bg-plum
              hover:text-white
              sm:text-[10px]
              sm:tracking-[0.2em]
            "
          >
            <Plus size={14} />
            QUICK ADD
          </button>
        </div>

        {/* ===================================================
            VIEW DETAILS
        =================================================== */}
        <Link
          href={`/product/${product.slug}`}
          className="
            absolute
            bottom-3
            right-3
            z-20
            hidden
            rounded-full
            bg-white/95
            p-2
            opacity-0
            shadow-md
            transition-opacity
            duration-300
            delay-75
            group-hover:opacity-100
            sm:block
          "
          aria-label={`View ${product.name}`}
        >
          <ArrowUpRight size={15} />
        </Link>
      </div>

      {/* =====================================================
          PRODUCT INFORMATION
      ===================================================== */}
      <div className="min-w-0 pt-3 sm:pt-4">
        <Link
          href={`/product/${product.slug}`}
          className="
            block
            min-w-0
            truncate
            text-sm
            font-medium
            tracking-[-0.01em]
            transition-colors
            hover:text-burgundy
            sm:text-base
          "
        >
          {product.name}
        </Link>

        {/* Price */}
        <div className="mt-1.5 flex min-w-0 items-center gap-2">
          <span className="shrink-0 text-sm sm:text-[15px]">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          <span className="min-w-0 truncate text-[10px] text-black/35 line-through sm:text-xs">
            ₹{product.originalPrice.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Magic Coins */}
        <div className="mt-2 flex min-w-0 items-center gap-1 text-[10px] text-burgundy sm:text-[11px]">
          <Sparkles
            size={11}
            className="shrink-0 sm:h-3 sm:w-3"
          />

          <span className="truncate">
            Earn {product.magicCoins} Magic Coins
          </span>
        </div>
      </div>
    </motion.article>
  );
}