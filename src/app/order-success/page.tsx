import Link from "next/link";
import {
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function Success({
  searchParams,
}: {
  searchParams: {
    id?: string;
  };
}) {
  const orderId = searchParams.id || "ORD-DEMO";

  return (
    <main className="w-full min-w-0 overflow-x-clip">
      <section
        className="
          container
          flex
          min-h-[70vh]
          flex-col
          items-center
          justify-center
          py-20
          pb-32
          text-center
          sm:py-24
        "
      >
        {/* ===================================================
            SUCCESS ICON
        =================================================== */}
        <div
          className="
            grid
            h-16
            w-16
            shrink-0
            place-items-center
            rounded-full
            bg-burgundy
            text-white
            sm:h-20
            sm:w-20
          "
        >
          <CheckCircle2
            size={34}
            className="sm:h-10 sm:w-10"
          />
        </div>

        {/* ===================================================
            LABEL
        =================================================== */}
        <p
          className="
            mt-7
            text-[9px]
            tracking-[0.25em]
            text-burgundy
            sm:mt-8
            sm:text-xs
            sm:tracking-[0.3em]
          "
        >
          DEMO PAYMENT SUCCESSFUL
        </p>

        {/* ===================================================
            TITLE
        =================================================== */}
        <h1
          className="
            serif
            mt-3
            text-4xl
            leading-tight
            sm:text-5xl
            md:text-6xl
          "
        >
          Order placed!
        </h1>

        {/* ===================================================
            ORDER MESSAGE
        =================================================== */}
        <p
          className="
            mt-3
            max-w-md
            text-sm
            leading-6
            text-black/55
            sm:leading-7
          "
        >
          Order{" "}
          <span className="font-medium text-black/70">
            {orderId}
          </span>{" "}
          is confirmed. Expected delivery in 3–5 days.
        </p>

        {/* ===================================================
            MAGIC COINS
        =================================================== */}
        <div
          className="
            mt-7
            flex
            max-w-full
            items-center
            justify-center
            gap-2
            bg-burgundy/5
            px-4
            py-3
            text-xs
            text-burgundy
            sm:mt-8
            sm:px-6
            sm:py-4
            sm:text-sm
          "
        >
          <Sparkles
            size={17}
            className="shrink-0"
          />

          <span>
            You earned Magic Coins on this order!
          </span>
        </div>

        {/* ===================================================
            ACTIONS
        =================================================== */}
        <div
          className="
            mt-7
            flex
            w-full
            max-w-md
            flex-col
            gap-3
            sm:mt-8
            sm:flex-row
          "
        >
          <Link
            href="/account"
            className="
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
              sm:text-xs
              sm:tracking-widest
            "
          >
            VIEW ORDER
          </Link>

          <Link
            href="/shop"
            className="
              flex
              min-h-12
              w-full
              items-center
              justify-center
              border
              border-plum
              px-6
              py-3
              text-[10px]
              tracking-[0.16em]
              text-plum
              transition-colors
              hover:bg-plum
              hover:text-white
              sm:text-xs
              sm:tracking-widest
            "
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      </section>
    </main>
  );
}