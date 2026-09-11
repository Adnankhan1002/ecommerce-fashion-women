"use client";

import Link from "next/link";
import {
  Search,
  Heart,
  ShoppingBag,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { useShopStore } from "@/store/useShopStore";

export default function Header() {
  const [open, setOpen] = useState(false);

  const cart = useShopStore((s) => s.cart);
  const coins = useShopStore((s) => s.coins);

  return (
    <>
      {/* Promo bar */}
      <div className="w-full overflow-hidden bg-burgundy px-3 py-2 text-center text-[10px] tracking-[0.16em] text-white sm:text-xs sm:tracking-[0.2em]">
        <span className="whitespace-nowrap">
          ✨ SHOP ₹500+ AND EARN MAGIC COINS ✨
        </span>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 w-full overflow-visible border-b border-black/5 bg-ivory/95 backdrop-blur-xl">
        <div
          className="
            mx-auto
            flex
            h-[68px]
            w-full
            max-w-[1180px]
            min-w-0
            items-center
            justify-between
            gap-3
            px-4
            sm:h-20
            sm:px-6
            lg:px-8
          "
        >
          {/* Mobile menu */}
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={25} /> : <Menu size={25} />}
          </button>

          {/* Logo */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="
              serif
              min-w-0
              truncate
              text-[28px]
              tracking-tight
              sm:text-3xl
            "
          >
            AURELIA<span className="text-burgundy">.</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden min-w-0 items-center gap-6 text-sm md:flex">
            <Link href="/shop">Women</Link>
            <Link href="/shop?category=Sarees">Sarees</Link>
            <Link href="/shop?category=Salwar%20Suits">Suits</Link>
            <Link href="/shop?category=Kurtis">Kurtis</Link>
            <Link href="/style-studio">Style Studio</Link>
          </nav>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href="/shop"
              aria-label="Search"
              className="flex h-10 w-10 items-center justify-center"
            >
              <Search size={20} />
            </Link>

            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="hidden h-10 w-10 items-center justify-center sm:flex"
            >
              <Heart size={19} />
            </Link>

            <Link
              href="/magic-coins"
              className="hidden items-center gap-1 text-sm sm:flex"
            >
              <Sparkles size={17} />
              {coins}
            </Link>

            <Link
              href="/cart"
              aria-label="Shopping bag"
              className="relative flex h-10 w-10 items-center justify-center"
            >
              <ShoppingBag size={20} />

              {cart.length > 0 && (
                <span
                  className="
                    absolute
                    right-0
                    top-0
                    grid
                    h-4
                    w-4
                    place-items-center
                    rounded-full
                    bg-burgundy
                    text-[9px]
                    text-white
                  "
                >
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav
            className="
              w-full
              border-t
              border-black/5
              bg-ivory
              px-5
              py-5
              md:hidden
            "
          >
            <div className="grid gap-1">
              <Link
                onClick={() => setOpen(false)}
                href="/shop"
                className="border-b border-black/5 py-3"
              >
                Shop
              </Link>

              <Link
                onClick={() => setOpen(false)}
                href="/style-studio"
                className="border-b border-black/5 py-3"
              >
                Style Studio
              </Link>

              <Link
                onClick={() => setOpen(false)}
                href="/wishlist"
                className="border-b border-black/5 py-3"
              >
                Wishlist
              </Link>

              <Link
                onClick={() => setOpen(false)}
                href="/magic-coins"
                className="py-3"
              >
                Magic Coins
              </Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}