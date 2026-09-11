"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Minus,
  Plus,
  Trash2,
  Sparkles,
} from "lucide-react";

import { useShopStore } from "@/store/useShopStore";
import { rewardForOrder } from "@/lib/magicCoins";

export default function Cart() {
  const {
    cart,
    setQty,
    removeFromCart,
  } = useShopStore();

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  const reward = rewardForOrder(subtotal);

  /* =========================================================
     EMPTY CART
  ========================================================= */
  if (!cart.length) {
    return (
      <main className="w-full min-w-0 overflow-x-clip">
        <section className="container py-20 text-center sm:py-28">
          <div className="serif text-4xl leading-tight sm:text-5xl">
            Your cart is waiting.
          </div>

          <p className="mt-3 text-sm text-black/50">
            Add a beautiful look and make it yours.
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
        </section>
      </main>
    );
  }

  return (
    <main className="w-full min-w-0 overflow-x-clip">
      <section className="container py-8 pb-28 sm:py-12 sm:pb-12">

        {/* ===================================================
            HEADER
        =================================================== */}
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[9px] tracking-[0.28em] text-burgundy sm:text-[10px]">
              AURELIA BAG
            </p>

            <h1 className="serif mt-2 text-4xl leading-tight sm:text-5xl">
              Your bag
            </h1>
          </div>

          <span className="shrink-0 text-xs text-black/40">
            {cart.length}{" "}
            {cart.length === 1 ? "item" : "items"}
          </span>
        </div>

        {/* ===================================================
            CART + SUMMARY
        =================================================== */}
        <div className="mt-8 grid min-w-0 gap-7 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-10">

          {/* =================================================
              CART ITEMS
          ================================================= */}
          <div className="grid min-w-0 gap-4 sm:gap-5">
            {cart.map((item) => (
              <div
                key={`${item.product.id}-${item.size}-${item.color}`}
                className="
                  flex
                  min-w-0
                  gap-3
                  overflow-hidden
                  bg-white
                  p-3
                  sm:gap-4
                  sm:p-4
                "
              >
                {/* Product image */}
                <div
                  className="
                    relative
                    h-32
                    w-24
                    shrink-0
                    overflow-hidden
                    rounded-lg
                    bg-[#eee5d9]
                    sm:h-36
                    sm:w-28
                  "
                >
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>

                {/* Product information */}
                <div className="flex min-w-0 flex-1 flex-col">

                  {/* Name + delete */}
                  <div className="flex min-w-0 items-start justify-between gap-2">
                    <div className="min-w-0">
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="
                          block
                          truncate
                          text-sm
                          font-medium
                          transition-colors
                          hover:text-burgundy
                          sm:text-base
                        "
                      >
                        {item.product.name}
                      </Link>

                      <p className="mt-1 truncate text-[10px] text-black/45 sm:text-xs">
                        {item.color} · Size {item.size}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        removeFromCart(
                          item.product.id,
                          item.size,
                          item.color
                        )
                      }
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        text-black/45
                        transition-colors
                        hover:bg-black/5
                        hover:text-burgundy
                      "
                      aria-label={`Remove ${item.product.name} from cart`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Price + quantity */}
                  <div
                    className="
                      mt-auto
                      flex
                      min-w-0
                      flex-wrap
                      items-end
                      justify-between
                      gap-3
                      pt-4
                      sm:pt-5
                    "
                  >
                    <span className="shrink-0 text-sm sm:text-base">
                      ₹
                      {item.product.price.toLocaleString(
                        "en-IN"
                      )}
                    </span>

                    {/* Quantity */}
                    <div className="flex shrink-0 items-center border border-black/10">
                      <button
                        type="button"
                        onClick={() =>
                          setQty(
                            item.product.id,
                            item.size,
                            item.color,
                            item.quantity - 1
                          )
                        }
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          transition-colors
                          hover:bg-black/5
                        "
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>

                      <span className="flex h-9 min-w-9 items-center justify-center px-1 text-xs">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          setQty(
                            item.product.id,
                            item.size,
                            item.color,
                            item.quantity + 1
                          )
                        }
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          transition-colors
                          hover:bg-black/5
                        "
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* =================================================
              ORDER SUMMARY
          ================================================= */}
          <aside
            className="
              h-fit
              min-w-0
              bg-white
              p-5
              sm:p-6
              lg:sticky
              lg:top-28
            "
          >
            <h2 className="serif text-2xl">
              Order summary
            </h2>

            {/* Subtotal */}
            <div className="mt-5 flex items-center justify-between gap-4 text-sm sm:mt-6">
              <span>Subtotal</span>

              <span className="shrink-0">
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>

            {/* Magic Coins */}
            {reward > 0 ? (
              <div
                className="
                  mt-5
                  flex
                  min-w-0
                  gap-2
                  bg-burgundy/5
                  p-4
                  text-sm
                  text-burgundy
                "
              >
                <Sparkles
                  size={17}
                  className="mt-0.5 shrink-0"
                />

                <span>
                  You'll earn {reward} Magic Coins from this
                  order.
                </span>
              </div>
            ) : (
              <div className="mt-5 bg-black/5 p-4 text-xs leading-5">
                ₹
                {Math.max(0, 500 - subtotal).toLocaleString(
                  "en-IN"
                )}{" "}
                more to unlock Magic Coins.
              </div>
            )}

            {/* Checkout */}
            <Link
              href="/checkout"
              className="
                mt-5
                flex
                min-h-12
                w-full
                items-center
                justify-center
                bg-plum
                px-5
                py-4
                text-center
                text-[10px]
                tracking-[0.16em]
                text-white
                transition-colors
                hover:bg-burgundy
                sm:mt-6
                sm:text-xs
                sm:tracking-widest
              "
            >
              PROCEED TO CHECKOUT
            </Link>

            <Link
              href="/shop"
              className="
                mt-3
                block
                text-center
                text-xs
                text-black/45
                transition-colors
                hover:text-burgundy
              "
            >
              Continue shopping
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}