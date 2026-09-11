import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <main className="fixed inset-0 z-[200] flex min-h-screen items-center justify-center overflow-hidden bg-[#f8f3ea]">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[15%] top-[15%] h-40 w-40 rounded-full bg-[#eadfce]/40 blur-3xl animate-pulse" />

        <div className="absolute bottom-[15%] right-[10%] h-52 w-52 rounded-full bg-burgundy/5 blur-3xl animate-pulse [animation-delay:700ms]" />
      </div>

      {/* Loader */}
      <div className="relative flex flex-col items-center">

        {/* Animated rings */}
        <div className="relative flex h-24 w-24 items-center justify-center">

          <div
            className="
              absolute
              inset-0
              rounded-full
              border
              border-burgundy/10
              animate-[spin_4s_linear_infinite]
            "
          />

          <div
            className="
              absolute
              inset-2
              rounded-full
              border
              border-dashed
              border-burgundy/25
              animate-[spin_3s_linear_infinite_reverse]
            "
          />

          <div
            className="
              absolute
              inset-4
              rounded-full
              bg-white
              shadow-[0_10px_40px_rgba(107,38,53,0.12)]
              animate-pulse
            "
          />

          <Sparkles
            size={23}
            className="
              relative
              z-10
              text-burgundy
              animate-[pulse_1.5s_ease-in-out_infinite]
            "
          />
        </div>

        {/* Brand */}
        <div className="mt-6 text-center">
          <div className="serif text-2xl tracking-[0.08em]">
            AURELIA<span className="text-burgundy">.</span>
          </div>

          <p className="mt-2 text-[9px] tracking-[0.3em] text-black/40">
            CURATING YOUR EDIT
          </p>
        </div>

        {/* Loading dots */}
        <div className="mt-5 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-burgundy animate-bounce" />

          <span className="h-1.5 w-1.5 rounded-full bg-burgundy animate-bounce [animation-delay:150ms]" />

          <span className="h-1.5 w-1.5 rounded-full bg-burgundy animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </main>
  );
}