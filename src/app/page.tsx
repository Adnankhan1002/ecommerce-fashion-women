import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Truck,
  Star,
} from "lucide-react";
import ProductGrid from "@/components/ProductGrid";
import { products } from "@/data/products";

const cats = [
  [
    "Sarees",
    "Timeless drapes",
    products.find((p) => p.category === "Sarees")!.images[0],
  ],
  [
    "Salwar Suits",
    "Effortless elegance",
    products.find((p) => p.category === "Salwar Suits")!.images[0],
  ],
  [
    "Kurtis",
    "Everyday statements",
    products.find((p) => p.category === "Kurtis")!.images[0],
  ],
  [
    "Lehenga Sets",
    "Celebrate beautifully",
    products.find((p) => p.category === "Lehenga Sets")!.images[0],
  ],
];

const looks = [
  ["Wedding Guest", "Silk, sparkle & statement accessories"],
  ["Festive Glow", "Rich colors for unforgettable nights"],
  ["Office Chic", "Polished silhouettes, every day"],
  ["Party Ready", "Modern looks with a little drama"],
];

export default function Home() {
  return (
    <main className="w-full min-w-0 overflow-x-clip">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative min-h-[620px] overflow-hidden sm:min-h-[680px] md:min-h-[760px]">
        <Image
          src={products[0].images[0]}
          alt="Fashion editorial"
          fill
          priority
          sizes="100vw"
          className="
            object-cover
            object-center
            scale-[1.02]
            animate-[pulse_12s_ease-in-out_infinite]
          "
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />

        <div
          className="
            relative
            mx-auto
            flex
            min-h-[620px]
            w-full
            max-w-[1180px]
            items-center
            px-4
            sm:min-h-[680px]
            sm:px-6
            md:min-h-[720px]
            md:px-8
          "
        >
          <div className="w-full max-w-xl text-white">
            <p className="mb-4 text-[10px] tracking-[0.28em] sm:mb-5 sm:text-xs sm:tracking-[0.35em]">
              THE FESTIVE EDIT · 2026
            </p>

            <h1
              className="
                serif
                max-w-full
                text-5xl
                leading-[0.92]
                tracking-tight
                sm:text-6xl
                md:text-8xl
              "
            >
              YOUR STYLE.
              <br />
              YOUR STORY.
            </h1>

            <p className="mt-5 max-w-md text-sm leading-6 text-white/80 sm:mt-7 sm:text-base">
              Discover timeless Indian fashion, designed for every moment.
            </p>

            {/* Mobile buttons stack */}
            <div
              className="
                mt-7
                flex
                w-full
                flex-col
                gap-3
                sm:mt-8
                sm:flex-row
              "
            >
              <Link
                href="/shop"
                className="
                  inline-flex
                  min-h-12
                  w-full
                  items-center
                  justify-center
                  bg-white
                  px-5
                  py-3
                  text-center
                  text-[10px]
                  tracking-[0.16em]
                  text-charcoal
                  transition
                  hover:bg-warm
                  sm:w-auto
                  sm:px-6
                  sm:text-xs
                "
              >
                SHOP COLLECTION
              </Link>

              <Link
                href="/style-studio"
                className="
                  inline-flex
                  min-h-12
                  w-full
                  items-center
                  justify-center
                  border
                  border-white/60
                  px-5
                  py-3
                  text-center
                  text-[10px]
                  tracking-[0.16em]
                  text-white
                  transition
                  hover:bg-white/10
                  sm:w-auto
                  sm:px-6
                  sm:text-xs
                "
              >
                STYLE STUDIO
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SHOP BY MOOD
      ========================================================= */}
      <section className="w-full py-14 sm:py-16 md:py-20">
        <div className="container">
          <div className="mb-7 flex items-end justify-between gap-4 sm:mb-8">
            <div className="min-w-0">
              <p className="text-[10px] tracking-[0.28em] text-burgundy sm:text-xs sm:tracking-[0.3em]">
                CURATED FOR YOU
              </p>

              <h2 className="serif mt-2 text-3xl leading-tight sm:text-4xl md:text-5xl">
                Shop by mood
              </h2>
            </div>

            <Link
              href="/shop"
              className="hidden shrink-0 items-center gap-2 text-sm sm:flex"
            >
              View all
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {cats.map(([name, sub, img]) => (
              <Link
                href={`/shop?category=${encodeURIComponent(name)}`}
                key={name}
                className="
                  group
                  relative
                  aspect-[3/4]
                  min-w-0
                  overflow-hidden
                  rounded-2xl
                  bg-warm
                "
              >
                <Image
                  src={img}
                  alt={name}
                  fill
                  sizes="(max-width: 639px) 50vw, (max-width: 1023px) 50vw, 25vw"
                  className="
                    object-cover
                    transition
                    duration-700
                    group-hover:scale-105
                  "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute inset-x-3 bottom-4 text-white sm:inset-x-5 sm:bottom-5">
                  <h3 className="serif text-xl sm:text-2xl">{name}</h3>

                  <p className="mt-1 text-[10px] text-white/70 sm:text-xs">
                    {sub}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          TRENDING
      ========================================================= */}
      <section className="w-full bg-[#efe5d8] py-14 sm:py-16 md:py-20">
        <div className="container">
          <div className="mb-7 flex items-end justify-between gap-4 sm:mb-8">
            <div className="min-w-0">
              <p className="text-[10px] tracking-[0.28em] text-burgundy sm:text-xs sm:tracking-[0.3em]">
                THE EDIT
              </p>

              <h2 className="serif mt-2 text-3xl leading-tight sm:text-4xl md:text-5xl">
                Trending now
              </h2>
            </div>

            <Link
              href="/shop"
              className="shrink-0 text-xs sm:text-sm"
            >
              Explore all →
            </Link>
          </div>

          <ProductGrid products={products.slice(0, 8)} />
        </div>
      </section>

      {/* =========================================================
          MAGIC COINS
      ========================================================= */}
      <section className="w-full py-14 sm:py-16 md:py-24">
        <div className="container">
          <div
            className="
              relative
              overflow-hidden
              rounded-2xl
              bg-plum
              p-6
              text-white
              sm:rounded-3xl
              sm:p-10
              md:p-16
            "
          >
            <Sparkles
              className="
                absolute
                right-3
                top-4
                opacity-10
                sm:right-10
                sm:top-10
              "
              size={100}
            />

            <div className="relative max-w-2xl">
              <p className="text-[10px] tracking-[0.28em] text-champagne sm:text-xs sm:tracking-[0.3em]">
                AURELIA REWARDS
              </p>

              <h2
                className="
                  serif
                  mt-3
                  max-w-full
                  text-3xl
                  leading-[1.05]
                  sm:text-4xl
                  md:text-5xl
                "
              >
                SHOP. EARN. REPEAT. ✨
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-6 text-white/70 sm:mt-5">
                Orders of ₹500+ unlock Magic Coins. Redeem them on your next
                favorite look.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-5 md:mt-10">
                <div className="min-w-0">
                  <b className="text-xs">01 · SHOP</b>
                  <p className="mt-2 text-sm leading-5 text-white/55">
                    Buy your favorite styles.
                  </p>
                </div>

                <div className="min-w-0">
                  <b className="text-xs">02 · EARN</b>
                  <p className="mt-2 text-sm leading-5 text-white/55">
                    Get Magic Coins on eligible orders.
                  </p>
                </div>

                <div className="min-w-0">
                  <b className="text-xs">03 · REDEEM</b>
                  <p className="mt-2 text-sm leading-5 text-white/55">
                    Turn coins into discounts.
                  </p>
                </div>
              </div>

              <Link
                href="/magic-coins"
                className="
                  mt-8
                  inline-flex
                  min-h-12
                  w-full
                  items-center
                  justify-center
                  bg-white
                  px-6
                  py-3
                  text-center
                  text-[10px]
                  tracking-[0.16em]
                  text-plum
                  transition
                  hover:bg-warm
                  sm:mt-9
                  sm:w-auto
                "
              >
                START EARNING
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          STYLE STUDIO
      ========================================================= */}
      <section className="w-full pb-14 sm:pb-16 md:pb-20">
        <div className="container">
          <div className="mb-8 text-center sm:mb-10">
            <p className="text-[10px] tracking-[0.28em] text-burgundy sm:text-xs sm:tracking-[0.3em]">
              STYLE STUDIO
            </p>

            <h2 className="serif mt-2 text-4xl leading-tight sm:text-5xl">
              Find your look
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {looks.map((l, i) => (
              <Link
                href={`/style-studio?look=${encodeURIComponent(l[0])}`}
                key={l[0]}
                className="
                  group
                  relative
                  aspect-[4/5]
                  min-w-0
                  overflow-hidden
                  rounded-2xl
                  bg-warm
                "
              >
                <Image
                  src={products[(i * 5) % products.length].images[0]}
                  alt={l[0]}
                  fill
                  sizes="(max-width: 639px) 50vw, (max-width: 767px) 50vw, 25vw"
                  className="
                    object-cover
                    transition
                    duration-700
                    group-hover:scale-105
                  "
                />

                <div className="absolute inset-0 bg-black/30" />

                <div className="absolute inset-x-3 bottom-4 text-white sm:inset-x-5 sm:bottom-5">
                  <h3 className="serif text-xl sm:text-2xl">{l[0]}</h3>

                  <p className="mt-1 text-[10px] leading-4 text-white/75 sm:text-xs">
                    {l[1]}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          TRUST BAR
      ========================================================= */}
      <section className="w-full border-y border-black/5">
        <div
          className="
            container
            grid
            grid-cols-2
            gap-x-4
            gap-y-5
            py-6
            text-[9px]
            tracking-[0.1em]
            sm:gap-5
            sm:text-xs
            md:grid-cols-5
          "
        >
          <span className="flex min-w-0 items-center gap-2">
            <ShieldCheck size={16} className="shrink-0" />
            <span>SECURE PAYMENTS</span>
          </span>

          <span className="flex min-w-0 items-center gap-2">
            <RotateCcw size={16} className="shrink-0" />
            <span>EASY RETURNS</span>
          </span>

          <span className="flex min-w-0 items-center gap-2">
            <Star size={16} className="shrink-0" />
            <span>QUALITY CHECKED</span>
          </span>

          <span className="flex min-w-0 items-center gap-2">
            <Truck size={16} className="shrink-0" />
            <span>FAST DELIVERY</span>
          </span>

          <span className="flex min-w-0 items-center gap-2">
            <Sparkles size={16} className="shrink-0" />
            <span>MAGIC REWARDS</span>
          </span>
        </div>
      </section>
    </main>
  );
}