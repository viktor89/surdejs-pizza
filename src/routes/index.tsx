import { ClientOnly, createFileRoute } from "@tanstack/react-router"
import { useForm } from "@tanstack/react-form"

import { defaultDough, doughSchema, ingredients } from "@/lib/dough"
import type { Dough } from "@/lib/dough"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export const Route = createFileRoute("/")({
  // The URL is the saved preset: bookmark or share it to keep a recipe.
  validateSearch: (search): Dough => {
    const parsed = doughSchema.safeParse({ ...defaultDough, ...search })
    return parsed.success ? parsed.data : defaultDough
  },
  // ponytail: the SPA shell renders this route as an empty client-only Suspense
  // slot, but the client hydrates it straight to content (router 1.170), which
  // is a hydration mismatch. Suspense + ClientOnly mirror the shell. Drop both
  // when upstream marks shell-skipped matches as ssr: false on hydrate.
  wrapInSuspense: true,
  component: () => (
    <ClientOnly>
      <App />
    </ClientOnly>
  ),
})

const fields: Array<{ name: keyof Dough; label: string; step: number }> = [
  { name: "amount", label: "Antal pizzaer (stk)", step: 1 },
  { name: "weight", label: "Vægt pr. stk. (gr)", step: 10 },
  { name: "hydration", label: "Hydrering (%)", step: 1 },
  { name: "surdej", label: "Surdej (%)", step: 1 },
  { name: "salt", label: "Salt (%)", step: 0.1 },
]

function App() {
  const search = Route.useSearch()
  const navigate = Route.useNavigate()

  const form = useForm({
    defaultValues: search,
    validators: { onChange: doughSchema },
    listeners: {
      onChange: ({ formApi }) => {
        const parsed = doughSchema.safeParse(formApi.state.values)
        if (parsed.success) navigate({ search: parsed.data, replace: true })
      },
    },
  })

  const result = ingredients(search)
  const rows = [
    ["Mel", result.mel],
    ["Vand", result.vand],
    ["Aktiv surdej", result.surdej],
    ["Salt", result.salt],
  ] as const

  return (
    <main className="mx-auto flex min-h-svh max-w-xl flex-col gap-6 p-4 sm:p-8">
      <h1 className="font-heading text-3xl font-semibold tracking-tight">
        Surdejspizza
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Dej</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          {fields.map(({ name, label, step }) => (
            <form.Field key={name} name={name}>
              {(field) => {
                const invalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel htmlFor={name}>{label}</FieldLabel>
                    <Input
                      id={name}
                      type="number"
                      inputMode="decimal"
                      step={step}
                      aria-invalid={invalid}
                      value={
                        Number.isNaN(field.state.value) ? "" : field.state.value
                      }
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(e.target.valueAsNumber)
                      }
                    />
                    {invalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            </form.Field>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ingredienser</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 tabular-nums">
          {rows.map(([label, grams]) => (
            <div key={label} className="flex justify-between">
              <span>{label}</span>
              <span>{grams} gr</span>
            </div>
          ))}
          <Separator className="my-1" />
          <div className="flex justify-between font-medium">
            <span>Totalvægt</span>
            <span>{result.total} gr</span>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
