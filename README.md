# Surdejspizza

A sourdough pizza dough calculator. Enter the number of pizzas, the weight per pizza and the baker's percentages. The page shows the grams of flour, water, starter and salt.

The form values are stored in the URL. To save a recipe, bookmark or share the link.

Live site: https://viktor89.github.io/surdejs-pizza/

## Stack

TanStack Start (static SPA build), TanStack Router, TanStack Form, shadcn/ui, Tailwind CSS v4 and Zod.

## Development

```bash
bun install
bun run dev
```

The dev server runs at http://localhost:3000/surdejs-pizza/.

## Deployment

A push to `main` runs `.github/workflows/deploy.yml`. The workflow lints, type-checks, tests and builds the site, then publishes `dist/client` to GitHub Pages.

The repository Pages source must be set to "GitHub Actions" (Settings > Pages > Build and deployment).
