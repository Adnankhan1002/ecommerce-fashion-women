"use client";

import Link from "next/link";
import {
  Package,
  Sparkles,
  Heart,
} from "lucide-react";

import { useShopStore } from "@/store/useShopStore";

export default function Account() {
  const {
    orders,
    coins,
    wishlist,
  } = useShopStore();

  const stats = [
    {
      icon: Sparkles,
      value: coins.toLocaleString("en-IN"),
      label: "Magic Coins",
      href: "/magic-coins",
      action: "VIEW REWARDS →",
    },
    {
      icon: Package,
      value: orders.length,
      label: "Orders",
    },
    {
      icon: Heart,
      value: wishlist.length,
      label: "Wishlist items",
    },
  ];

  return (
    <main className="w-full min-w-0 overflow-x-clip">
      <section className="container py-8 pb-28 sm:py-12 sm:pb-12">

        {/* ===================================================
            HEADER
        =================================================== */}
        <p className="text-[9px] tracking-[0.28em] text-burgundy sm:text-xs sm:tracking-[0.3em]">
          MY AURELIA
        </p>

        <h1 className="serif mt-2 text-4xl leading-tight sm:text-5xl">
          Welcome back.
        </h1>

        {/* ===================================================
            STATS
        =================================================== */}
        <div className="mt-7 grid gap-3 sm:mt-10 sm:gap-4 md:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="
                  min-w-0
                  bg-white
                  p-5
                  sm:p-6
                "
              >
                <Icon
                  size={20}
                  className="text-burgundy"
                />

                <div className="mt-4 truncate text-2xl sm:mt-5 sm:text-3xl">
                  {stat.value}
                </div>

                <p className="mt-1 text-xs text-black/45">
                  {stat.label}
                </p>

                {stat.href && (
                  <Link
                    href={stat.href}
                    className="
                      mt-5
                      inline-block
                      text-[10px]
                      text-burgundy
                      transition-opacity
                      hover:opacity-70
                      sm:text-xs
                    "
                  >
                    {stat.action}
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* ===================================================
            RECENT ORDERS
        =================================================== */}
        <section className="mt-9 min-w-0 bg-white p-5 sm:mt-12 sm:p-6">
          <h2 className="serif text-2xl sm:text-3xl">
            Recent orders
          </h2>

          {orders.length ? (
            <div className="mt-4 divide-y divide-black/5 sm:mt-5">
              {orders.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="
                    flex
                    min-w-0
                    items-center
                    justify-between
                    gap-4
                    py-4
                  "
                >
                  {/* Order ID */}
                  <div className="min-w-0">
                    <span className="block truncate text-sm font-medium">
                      {order.id}
                    </span>

                    <span className="mt-1 block text-[10px] text-black/40 sm:text-xs">
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Order total */}
                  <span className="shrink-0 text-sm">
                    ₹
                    {order.total.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center sm:py-12">
              <p className="text-sm text-black/45">
                No orders yet. Your next favorite look
                is waiting.
              </p>

              <Link
                href="/shop"
                className="
                  mt-5
                  inline-flex
                  min-h-11
                  items-center
                  justify-center
                  bg-plum
                  px-5
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
      </section>
    </main>
  );
}