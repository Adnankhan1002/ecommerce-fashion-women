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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10 ">
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