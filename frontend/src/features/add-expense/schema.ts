import { z } from 'zod'

export const expenseSchema = z.object({
  name: z.string().min(3).max(30),

  sum: z.number().min(1).max(1_000_000),

  date: z.string(),
})

export type ExpenseFormValues = z.infer<typeof expenseSchema>
