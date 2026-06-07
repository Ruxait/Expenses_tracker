import { z } from "zod";

export const createExpenseSchema = z.object({
  name: z
    .string()
    .min(3, "Название должно быть минимум 3 символа")
    .max(30, "Название максимум 30 символов"),

  sum: z
    .number()
    .min(1, "Минимальная сумма 1")
    .max(1_000_000, "Максимальная сумма 1 000 000"),

  date: z.string().refine((val) => {
    return !isNaN(Date.parse(val));
  }, "Некорректная дата"),
});

export type CreateExpenseDto = z.infer<typeof createExpenseSchema>;