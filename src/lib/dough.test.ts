import { expect, test } from "bun:test"
import { defaultDough, doughSchema, ingredients } from "./dough"

test("default dough splits 6 x 270 g by baker's percentages", () => {
  expect(ingredients(defaultDough)).toEqual({
    total: 1620,
    mel: 888,
    vand: 533,
    surdej: 178,
    salt: 22,
  })
})

test("schema rejects out-of-range values", () => {
  expect(doughSchema.safeParse(defaultDough).success).toBe(true)
  expect(doughSchema.safeParse({ ...defaultDough, amount: 0 }).success).toBe(
    false
  )
  expect(doughSchema.safeParse({ ...defaultDough, salt: NaN }).success).toBe(
    false
  )
})
