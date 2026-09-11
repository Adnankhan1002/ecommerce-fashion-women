"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

import { useShopStore } from "@/store/useShopStore";
import {
  coinValue,
  maxCoinsUsable,
} from "@/lib/magicCoins";

const steps = [
  "Address",
  "Delivery",
  "Rewards",
  "Payment",
  "Review",
];

export default function Checkout() {
  const router = useRouter();

  const {
    cart,
    coins,
    applyCoupon,
    coupon,
    placeOrder,
  } = useShopStore();

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  const [used, setUsed] = useState(0);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const discount = coupon?.discount || 0;

  const total = Math.max(
    0,
    subtotal - discount - coinValue(used)
  );

  /* =========================================================
     EMPTY CART
  ========================================================= */
  if (!cart.length) {
    return (
      <main className="w-full min-w-0 overflow-x-clip">
        <section className="container py-20 text-center sm:py-28">
          <h1 className="serif text-4xl sm:text-5xl">
            Your cart is empty
          </h1>

          <p className="mt-3 text-sm text-black/50">
            Add something beautiful before checking out.
          </p>
        </section>
      </main>
    );
  }

  /* =========================================================
     SUBMIT ORDER
  ========================================================= */
  const submit = () => {
    setLoading(true);

    setTimeout(() => {
      const order = placeOrder(used);

      router.push(
        `/order-success?id=${order.id}`
      );
    }, 1200);
  };

  return (
    <main className="w-full min-w-0 overflow-x-clip">
      <section className="container py-8 pb-28 sm:py-12 sm:pb-12">

        {/* ===================================================
            HEADER
        =================================================== */}
        <p className="text-[9px] tracking-[0.28em] text-burgundy sm:text-[10px] sm:tracking-[0.3em]">
          AURELIA CHECKOUT
        </p>

        <h1 className="serif mt-2 text-4xl leading-tight sm:text-5xl">
          Checkout
        </h1>

        {/* ===================================================
            CHECKOUT STEPS
        =================================================== */}

        {/* Desktop / tablet */}
        <div className="mt-7 hidden gap-3 sm:flex">
          {steps.map((label, index) => {
            const number = index + 1;
            const active = step >= number;

            return (
              <div
                key={label}
                className={`
                  min-w-0
                  flex-1
                  border-b-2
                  pb-3
                  text-xs
                  transition-colors
                  ${
                    active
                      ? "border-burgundy text-burgundy"
                      : "border-black/10 text-black/40"
                  }
                `}
              >
                <span className="font-medium">
                  {number}.
                </span>{" "}
                {label}
              </div>
            );
          })}
        </div>

        {/* Mobile */}
        <div className="mt-6 sm:hidden">
          <div className="flex items-center justify-between text-[10px] text-black/40">
            <span>
              STEP {step} OF {steps.length}
            </span>

            <span className="text-burgundy">
              {steps[step - 1]}
            </span>
          </div>

          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-black/10">
            <div
              className="h-full bg-burgundy transition-all duration-500"
              style={{
                width: `${(step / steps.length) * 100}%`,
              }}
            />
          </div>

          {/* Mini step indicators */}
          <div className="mt-3 grid grid-cols-5 gap-1">
            {steps.map((label, index) => (
              <div
                key={label}
                className={`
                  h-1 rounded-full
                  ${
                    step >= index + 1
                      ? "bg-burgundy"
                      : "bg-black/10"
                  }
                `}
              />
            ))}
          </div>
        </div>

        {/* ===================================================
            MAIN CHECKOUT LAYOUT
        =================================================== */}
        <div className="mt-8 grid min-w-0 gap-7 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10">

          {/* =================================================
              CHECKOUT FORM
          ================================================= */}
          <div className="min-w-0 bg-white p-5 sm:p-6 md:p-8">

            {/* =================================================
                STEP 1 — ADDRESS
            ================================================= */}
            {step === 1 && (
              <>
                <h2 className="serif text-2xl sm:text-3xl">
                  Delivery address
                </h2>

                <div className="mt-6 grid min-w-0 gap-4 md:grid-cols-2">
                  {[
                    "Full name",
                    "Phone",
                    "Email",
                    "Address",
                    "City",
                    "State",
                    "PIN code",
                  ].map((label) => (
                    <input
                      key={label}
                      required
                      placeholder={label}
                      type={
                        label === "Email"
                          ? "email"
                          : label === "Phone"
                            ? "tel"
                            : "text"
                      }
                      className="
                        min-w-0
                        w-full
                        border-b
                        border-black/15
                        bg-transparent
                        px-2
                        py-3
                        text-sm
                        outline-none
                        transition-colors
                        placeholder:text-black/35
                        focus:border-burgundy
                      "
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="
                    mt-7
                    flex
                    min-h-12
                    w-full
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
                    sm:w-auto
                    sm:text-xs
                    sm:tracking-widest
                  "
                >
                  CONTINUE
                </button>
              </>
            )}

            {/* =================================================
                STEP 2 — DELIVERY
            ================================================= */}
            {step === 2 && (
              <>
                <h2 className="serif text-2xl sm:text-3xl">
                  Delivery method
                </h2>

                <div className="mt-6 grid gap-3">

                  <label
                    className="
                      flex
                      min-w-0
                      cursor-pointer
                      items-start
                      gap-3
                      border
                      border-black/10
                      p-4
                      transition-colors
                      hover:border-burgundy
                    "
                  >
                    <input
                      type="radio"
                      defaultChecked
                      name="delivery"
                      className="mt-1 shrink-0"
                    />

                    <span className="min-w-0">
                      <span className="block text-sm font-medium">
                        Standard delivery
                      </span>

                      <span className="mt-1 block text-xs text-black/50">
                        3–5 days · Free
                      </span>
                    </span>
                  </label>

                  <label
                    className="
                      flex
                      min-w-0
                      cursor-pointer
                      items-start
                      gap-3
                      border
                      border-black/10
                      p-4
                      transition-colors
                      hover:border-burgundy
                    "
                  >
                    <input
                      type="radio"
                      name="delivery"
                      className="mt-1 shrink-0"
                    />

                    <span className="min-w-0">
                      <span className="block text-sm font-medium">
                        Express delivery
                      </span>

                      <span className="mt-1 block text-xs text-black/50">
                        1–2 days · ₹149
                      </span>
                    </span>
                  </label>

                </div>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="
                    mt-7
                    flex
                    min-h-12
                    w-full
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
                    sm:w-auto
                    sm:text-xs
                    sm:tracking-widest
                  "
                >
                  CONTINUE
                </button>
              </>
            )}

            {/* =================================================
                STEP 3 — MAGIC COINS
            ================================================= */}
            {step === 3 && (
              <>
                <h2 className="serif text-2xl sm:text-3xl">
                  Magic Coins
                </h2>

                <p className="mt-3 text-sm text-black/55">
                  Available balance:{" "}
                  <span className="font-medium text-burgundy">
                    {coins} ✨
                  </span>
                </p>

                <div className="mt-6 border border-black/10 p-4 sm:p-5">

                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span>Use coins</span>

                    <span className="shrink-0 font-medium">
                      {used} coins
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max={maxCoinsUsable(
                      coins,
                      Math.max(
                        0,
                        subtotal - discount
                      )
                    )}
                    step="10"
                    value={used}
                    onChange={(e) =>
                      setUsed(Number(e.target.value))
                    }
                    className="mt-6 w-full accent-[#6b2635]"
                  />

                  <div className="mt-2 flex justify-between gap-3 text-xs text-black/45">
                    <span>0 coins</span>

                    <span>
                      Discount: ₹{coinValue(used)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="
                    mt-7
                    flex
                    min-h-12
                    w-full
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
                    sm:w-auto
                    sm:text-xs
                    sm:tracking-widest
                  "
                >
                  CONTINUE
                </button>
              </>
            )}

            {/* =================================================
                STEP 4 — PAYMENT
            ================================================= */}
            {step === 4 && (
              <>
                <h2 className="serif text-2xl sm:text-3xl">
                  Payment
                </h2>

                <div className="mt-6 grid gap-3">
                  {[
                    "UPI",
                    "Credit / Debit Card",
                    "Net Banking",
                    "Wallet",
                    "Cash on Delivery",
                  ].map((method) => (
                    <label
                      key={method}
                      className="
                        flex
                        min-w-0
                        cursor-pointer
                        items-center
                        gap-3
                        border
                        border-black/10
                        p-4
                        text-sm
                        transition-colors
                        hover:border-burgundy
                      "
                    >
                      <input
                        type="radio"
                        name="payment"
                        defaultChecked={method === "UPI"}
                        className="shrink-0"
                      />

                      <span className="min-w-0 truncate">
                        {method}
                      </span>
                    </label>
                  ))}
                </div>

                <p className="mt-5 bg-burgundy/5 p-3 text-xs leading-5 text-burgundy">
                  Demo payment only — no real money is
                  charged.
                </p>

                <button
                  type="button"
                  onClick={() => setStep(5)}
                  className="
                    mt-7
                    flex
                    min-h-12
                    w-full
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
                    sm:w-auto
                    sm:text-xs
                    sm:tracking-widest
                  "
                >
                  REVIEW ORDER
                </button>
              </>
            )}

            {/* =================================================
                STEP 5 — REVIEW
            ================================================= */}
            {step === 5 && (
              <>
                <h2 className="serif text-2xl sm:text-3xl">
                  Review & place order
                </h2>

                <div className="mt-6 grid gap-3 text-sm">
                  <div className="flex justify-between gap-4 border-b border-black/5 pb-3">
                    <span className="text-black/50">
                      Items
                    </span>

                    <span className="text-right">
                      {cart.length} item(s)
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 border-b border-black/5 pb-3">
                    <span className="text-black/50">
                      Delivery
                    </span>

                    <span>Standard delivery</span>
                  </div>

                  <div className="flex justify-between gap-4 border-b border-black/5 pb-3">
                    <span className="text-black/50">
                      Payment
                    </span>

                    <span>Demo UPI</span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-black/50">
                      Magic Coins used
                    </span>

                    <span>{used}</span>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={loading}
                  onClick={submit}
                  className="
                    mt-8
                    flex
                    min-h-12
                    w-full
                    items-center
                    justify-center
                    bg-burgundy
                    px-5
                    py-4
                    text-center
                    text-[10px]
                    tracking-[0.16em]
                    text-white
                    transition-opacity
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    sm:text-xs
                    sm:tracking-widest
                  "
                >
                  {loading
                    ? "PROCESSING DEMO PAYMENT..."
                    : "PLACE ORDER"}
                </button>
              </>
            )}
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
              Summary
            </h2>

            {/* Subtotal */}
            <div className="mt-5 flex items-center justify-between gap-4 text-sm">
              <span>Subtotal</span>

              <span className="shrink-0">
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>

            {/* Coupon */}
            <div className="mt-5 flex min-w-0 flex-col gap-2 sm:flex-row">
              <input
                value={code}
                onChange={(e) =>
                  setCode(e.target.value)
                }
                placeholder="Coupon code"
                className="
                  min-w-0
                  w-full
                  flex-1
                  border
                  border-black/10
                  bg-transparent
                  px-3
                  py-3
                  text-xs
                  uppercase
                  outline-none
                  focus:border-burgundy
                  sm:py-2
                "
              />

              <button
                type="button"
                onClick={() =>
                  applyCoupon(code, subtotal)
                }
                className="
                  min-h-11
                  shrink-0
                  bg-plum
                  px-5
                  py-3
                  text-[10px]
                  tracking-wider
                  text-white
                  transition-colors
                  hover:bg-burgundy
                "
              >
                APPLY
              </button>
            </div>

            {coupon && (
              <p className="mt-2 text-xs text-green-700">
                Coupon {coupon.code} applied: ₹
                {discount} off
              </p>
            )}

            {/* Total */}
            <div className="mt-5 flex items-center justify-between gap-4 border-t border-black/10 pt-5 font-semibold">
              <span>Total</span>

              <span className="shrink-0">
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>

            {/* Rewards information */}
            <div className="mt-4 flex min-w-0 gap-2 text-xs leading-5 text-burgundy">
              <Sparkles
                size={14}
                className="mt-0.5 shrink-0"
              />

              <span>
                Demo rewards are credited after order
                placement.
              </span>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}