"use client";

import { useState } from "react";
import ProductSpotlight from "@/components/ProductSpotlight";
import ProductCard from "./ProductCard";
import { Product } from "@/types";

export default function ProductGrid({
  products,
}: {
  products: Product[];
}) {
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  return (
    <>
      <div
        className="
          grid
          w-full
          min-w-0
          grid-cols-2
          gap-x-3
          gap-y-8
          sm:gap-x-4
          sm:gap-y-10
          md:grid-cols-3
          md:gap-x-6
          lg:grid-cols-4
        "
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onPreview={setSelectedProduct}
          />
        ))}
      </div>

      <ProductSpotlight
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}