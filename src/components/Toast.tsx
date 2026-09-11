"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  ShoppingBag,
  X,
} from "lucide-react";

type ToastDetail = {
  message: string;
  product?: string;
};

type ToastState = ToastDetail & {
  visible: boolean;
};

export default function Toast() {
  const [toast, setToast] = useState<ToastState>({
    message: "",
    visible: false,
  });

  useEffect(() => {
    const handleToast = (event: Event) => {
      const customEvent =
        event as CustomEvent<ToastDetail>;

      setToast({
        message:
          customEvent.detail?.message ||
          "Added to your bag",
        product: customEvent.detail?.product,
        visible: true,
      });

      window.setTimeout(() => {
        setToast((current) => ({
          ...current,
          visible: false,
        }));
      }, 2800);
    };

    window.addEventListener(
      "aurelia-toast",
      handleToast
    );

    return () => {
      window.removeEventListener(
        "aurelia-toast",
        handleToast
      );
    };
  }, []);

  if (!toast.visible) return null;

  return (
    <div
      className="
        fixed
        bottom-[82px]
        left-1/2
        z-[100]
        w-[calc(100%-24px)]
        max-w-[390px]
        -translate-x-1/2
        sm:bottom-6
        sm:left-auto
        sm:right-6
        sm:w-auto
        sm:max-w-[390px]
        sm:translate-x-0
      "
    >
      <div
        className="
          flex
          items-center
          gap-3
          rounded-2xl
          border
          border-black/10
          bg-white
          p-3
          shadow-[0_18px_60px_rgba(38,33,36,0.18)]
          backdrop-blur-xl
          animate-[toastIn_.35s_ease-out]
        "
      >
        {/* Success icon */}
        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-burgundy/10
            text-burgundy
          "
        >
          <CheckCircle2 size={22} />
        </div>

        {/* Message */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <ShoppingBag
              size={14}
              className="shrink-0 text-burgundy"
            />

            <p className="text-sm font-medium">
              Added to your bag
            </p>
          </div>

          {toast.product && (
            <p className="mt-0.5 truncate text-xs text-black/45">
              {toast.product}
            </p>
          )}

          <p className="mt-1 text-[10px] tracking-wide text-burgundy">
            ✨ Magic Coins waiting for you
          </p>
        </div>

        {/* Close */}
        <button
          type="button"
          onClick={() =>
            setToast((current) => ({
              ...current,
              visible: false,
            }))
          }
          className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-full
            text-black/35
            transition-colors
            hover:bg-black/5
            hover:text-black
          "
          aria-label="Close notification"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}