import { defineConfig } from "vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  // GitHub Pages serves the site from /surdejs-pizza/
  base: "/surdejs-pizza/",
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    tanstackStart({
      // Static SPA shell written to dist/client/index.html for GitHub Pages
      spa: { enabled: true, prerender: { outputPath: "/index" } },
    }),
    viteReact(),
  ],
})
