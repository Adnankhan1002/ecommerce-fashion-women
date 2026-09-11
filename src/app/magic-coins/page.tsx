"use client";
import {
  Sparkles,
  ArrowDown,
  ArrowUp,
} from "lucide-react";

import { useShopStore } from "@/store/useShopStore";

export default function Coins() {
  const coins = useShopStore((s) => s.coins);

  const rewards: [number, number][] = [
    [50, 500],
    [100, 900],
    [250, 2000],
  ];

  const transactions: [string, string][] = [
    ["+250", "Order #ORD1234"],
    ["-500", "₹50 discount"],
    ["+120", "Order #ORD1299"],
  ];

  return (
    <main className="w-full min-w-0 overflow-x-clip">
      <section className="container py-8 sm:py-12">

        {/* ===================================================
            REWARDS HERO
        =================================================== */}
        <div
          className="
            overflow-hidden
            rounded-2xl
            bg-plum
            p-6
            text-white
            sm:p-8
            md:p-14
          "
        >
          <p className="text-[9px] tracking-[0.28em] text-champagne sm:text-xs sm:tracking-[0.3em]">
            AURELIA REWARDS
          </p>

          <h1
            className="
              serif
              mt-3
              text-4xl
              leading-none
              sm:text-5xl
              md:text-6xl
            "
          >
            {coins.toLocaleString("en-IN")} ✨
          </h1>

          <p className="mt-2 text-sm text-white/60">
            Current Magic Coin balance
          </p>

          {/* Stats */}
          <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4">
            <div className="min-w-0 bg-white/5 p-4 sm:p-5">
              <b className="text-lg">3,450</b>

              <p className="mt-1 text-xs text-white/50">
                Lifetime earned
              </p>
            </div>

            <div className="min-w-0 bg-white/5 p-4 sm:p-5">
              <b className="text-lg">1,200</b>

              <p className="mt-1 text-xs text-white/50">
                Lifetime redeemed
              </p>
            </div>

            <div className="min-w-0 bg-white/5 p-4 sm:p-5">
              <b className="text-lg">
                ₹{Math.floor(coins / 10)}
              </b>

              <p className="mt-1 text-xs text-white/50">
                Approx. redeem value
              </p>
            </div>
          </div>
        </div>

        {/* ===================================================
            AVAILABLE REWARDS
        =================================================== */}
        <section className="py-10 sm:py-12">
          <h2 className="serif text-3xl sm:text-4xl">
            Available rewards
          </h2>

          <div className="mt-6 grid gap-4 sm:mt-7 md:grid-cols-3">
            {rewards.map(([cash, requiredCoins]) => (
              <div
                key={requiredCoins}
                className="
                  min-w-0
                  rounded-xl
                  border
                  border-black/5
                  bg-white
                  p-5
                  sm:p-6
                "
              >
                <Sparkles
                  size={20}
                  className="text-burgundy"
                />

                <div className="serif mt-5 text-2xl sm:text-3xl">
                  ₹{cash} OFF
                </div>

                <p className="mt-1 text-sm text-black/50">
                  {requiredCoins.toLocaleString("en-IN")}{" "}
                  Magic Coins
                </p>

                <button
                  type="button"
                  disabled={coins < requiredCoins}
                  className="
                    mt-6
                    min-h-11
                    w-full
                    bg-plum
                    px-4
                    py-3
                    text-[10px]
                    tracking-[0.12em]
                    text-white
                    transition-colors
                    hover:bg-burgundy
                    disabled:cursor-not-allowed
                    disabled:opacity-30
                    sm:tracking-widest
                  "
                >
                  REDEEM REWARD
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================
            TRANSACTION HISTORY
        =================================================== */}
        <section className="pb-20">
          <h2 className="serif text-3xl sm:text-4xl">
            Transaction history
          </h2>

          <div className="mt-5 overflow-hidden rounded-xl bg-white sm:mt-6">
            {transactions.map(([amount, description]) => {
              const earned = amount.startsWith("+");

              return (
                <div
                  key={description}
                  className="
                    flex
                    min-w-0
                    items-center
                    justify-between
                    gap-4
                    border-b
                    border-black/5
                    p-4
                    last:border-b-0
                    sm:p-5
                  "
                >
                  {/* Description */}
                  <span className="flex min-w-0 items-center gap-2 text-sm">
                    {earned ? (
                      <ArrowUp
                        size={16}
                        className="shrink-0"
                      />
                    ) : (
                      <ArrowDown
                        size={16}
                        className="shrink-0"
                      />
                    )}

                    <span className="truncate">
                      {description}
                    </span>
                  </span>

                  {/* Amount */}
                  <b
                    className={`
                      shrink-0
                      text-xs
                      sm:text-sm
                      ${
                        earned
                          ? "text-green-700"
                          : "text-burgundy"
                      }
                    `}
                  >
                    {amount} coins
                  </b>
                </div>
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
}