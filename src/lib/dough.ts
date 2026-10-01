import { z } from "zod"

const num = (min: number, max: number) =>
  z
    .number({ error: "Skriv et tal" })
    .min(min, `Mindst ${min}`)
    .max(max, `Højst ${max}`)

export const doughSchema = z.object({
  amount: num(1, 100).int("Hele pizzaer, tak"),
  weight: num(100, 1000),
  hydration: num(50, 100),
  surdej: num(10, 50),
  salt: num(0, 5),
})

export type Dough = z.infer<typeof doughSchema>

export const defaultDough: Dough = {
  amount: 6,
  weight: 270,
  hydration: 60,
  surdej: 20,
  salt: 2.5,
}

// Baker's percentages: flour is always 100, everything else is relative to it.
export function ingredients(d: Dough) {
  const total = d.amount * d.weight
  const parts = 100 + d.hydration + d.surdej + d.salt
  const grams = (pct: number) => Math.round((total * pct) / parts)
  return {
    total,
    mel: grams(100),
    vand: grams(d.hydration),
    surdej: grams(d.surdej),
    salt: grams(d.salt),
  }
}
