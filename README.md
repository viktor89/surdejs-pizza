# Surdejspizza

A sourdough pizza dough calculator. Enter the number of pizzas, the weight per pizza and the baker's percentages. The page shows the grams of flour, water, starter and salt.

The form values are stored in the URL. To save a recipe, bookmark or share the link.

Live site: https://surdejs-pizza.vercel.app/

## Stack

TanStack Start (static SPA build), TanStack Router, TanStack Form, shadcn/ui, Tailwind CSS v4 and Zod.

## Development

```bash
bun install
bun run dev
```

The dev server runs at http://localhost:3000/.

## Deployment

The site is a static build on Vercel. `vercel.json` sets the build command and serves `dist/client`. When the Vercel project is connected to this repository, a push to `main` deploys to production.

To deploy by hand from your machine:

```bash
vercel deploy --prod
```
