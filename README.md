# Aurelia — Premium Women's Fashion Demo

A complete client-demo storefront built with Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Lucide React and Zustand.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Demo routes

- `/` — editorial homepage
- `/shop` — catalog, search, category and price filters
- `/product/[slug]` — product detail
- `/cart` — cart
- `/checkout` — 5-step mock checkout
- `/order-success` — order confirmation
- `/wishlist`
- `/magic-coins`
- `/style-studio`
- `/account`
- `/admin`

## Demo coupons

`WELCOME10`, `FESTIVE20`, `STYLE500`, `MAGIC100`

## Architecture

The demo keeps domain logic in `src/lib`, state in Zustand, mock catalog data in `src/data`, and reusable UI in `src/components`. Payment is deliberately mocked and isolated from checkout so a real Razorpay/Stripe service can replace it later.

The uploaded specification requested the broader production architecture and integrations; this package intentionally keeps the current implementation frontend-first and dependency-light so it can run immediately as a demo.

## Recent UX fixes

- Product cards no longer swap to the next product when hovered.
- Hover now uses the same product image with a refined zoom/overlay treatment.
- Product detail pages no longer show an unrelated second garment.
- Catalog imagery now uses category-appropriate Unsplash editorial photos.
- Added a premium mobile bottom navigation.
- Added subtle background depth, focus states and reduced-motion support.
