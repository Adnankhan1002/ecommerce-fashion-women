"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import Link from "next/link";

import { useShopStore } from "@/store/useShopStore";
import { Product } from "@/types";

export default function AddButton({
  product,
}: {
  product: Product;
}) {
  const add = useShopStore((s) => s.addToCart);

  const [done, setDone] = useState(false);

  const handleAdd = () => {
    add({
      product,
      quantity: 1,
      size: "M",
      color: product.colors[0],
    });

    setDone(true);

    window.dispatchEvent(
      new CustomEvent("aurelia-toast", {
        detail: {
          message: "Added to your bag",
          product: product.name,
        },
      })
    );

    setTimeout(() => {
      setDone(false);
    }, 1800);
  };

  return (
    <div className="mt-7 grid w-full min-w-0 grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2">
      <button
        type="button"
        onClick={handleAdd}
        className="
          flex
          min-h-12
          w-full
          items-center
          justify-center
          gap-2
          whitespace-nowrap
          bg-plum
          px-5
          py-4
          text-center
          text-[10px]
          tracking-[0.16em]
          text-white
          transition-colors
          hover:bg-burgundy
          active:scale-[0.99]
          sm:text-xs
          sm:tracking-widest
        "
      >
        {done ? (
          <>
            <Check size={15} />
            <span>ADDED</span>
          </>
        ) : (
          "ADD TO CART"
        )}
      </button>

      <Link
        href="/cart"
        className="
          flex
          min-h-12
          w-full
          items-center
          justify-center
          whitespace-nowrap
          border
          border-plum
          px-5
          py-4
          text-center
          text-[10px]
          tracking-[0.16em]
          text-plum
          transition-colors
          hover:bg-plum
          hover:text-white
          active:scale-[0.99]
          sm:text-xs
          sm:tracking-widest
        "
      >
        BUY NOW
      </Link>
    </div>
  );
}