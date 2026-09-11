"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Plus, Sparkles, ArrowUpRight } from "lucide-react";
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

  const add = () => addToCart({
    product,
    quantity: 1,
    size: "M",
    color: product.colors[0],
  });

  const discount = Math.max(
    0,
    Math.round((1 - product.price / product.originalPrice) * 100)
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45 }}
      className="group"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#eee5d9]">
      <div
  onClick={() => onPreview(product)}
  className="absolute inset-0 z-0 cursor-pointer"
>
  <motion.div
    layoutId={`product-image-${product.id}`}
    className="absolute inset-0"
  >
    <Image
      src={product.images[0]}
      alt={product.name}
      fill
      sizes="(max-width:768px) 50vw, 25vw"
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
</div>

        <div className="absolute left-3 top-3 flex gap-2">
          <span className="bg-white/92 backdrop-blur px-2.5 py-1 text-[9px] tracking-[.18em]">
            {product.tags[0]}
          </span>
          {discount > 0 && (
            <span className="bg-burgundy text-white px-2.5 py-1 text-[9px] tracking-[.12em]">
              {discount}% OFF
            </span>
          )}
        </div>

        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute right-3 top-3 rounded-full bg-white/90 backdrop-blur p-2.5 transition-transform duration-300 hover:scale-110"
          aria-label={`Add ${product.name} to wishlist`}
        >
          <Heart
            size={17}
            fill={liked ? "currentColor" : "none"}
            className={liked ? "text-burgundy" : ""}
          />
        </button>

        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
          <button
            onClick={add}
            className="w-full bg-white/95 backdrop-blur text-charcoal py-3 text-[10px] tracking-[.2em] flex items-center justify-center gap-2 shadow-xl hover:bg-plum hover:text-white transition-colors"
          >
            <Plus size={14} /> QUICK ADD
          </button>
        </div>

        <Link
          href={`/product/${product.slug}`}
          className="absolute right-3 bottom-3 rounded-full bg-white/95 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 hidden sm:block"
          aria-label={`View ${product.name}`}
        >
          <ArrowUpRight size={15} />
        </Link>
      </div>

      <div className="pt-4">
        <Link
          href={`/product/${product.slug}`}
          className="font-medium tracking-[-0.01em] hover:text-burgundy transition-colors"
        >
          {product.name}
        </Link>

        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[15px]">₹{product.price.toLocaleString("en-IN")}</span>
          <span className="text-xs text-black/35 line-through">
            ₹{product.originalPrice.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="mt-2 text-[11px] text-burgundy flex items-center gap-1">
          <Sparkles size={12} /> Earn {product.magicCoins} Magic Coins
        </div>
      </div>
    </motion.article>
  );
}
