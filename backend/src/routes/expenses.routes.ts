import { Router } from "express";

import {
  getExpenses,
  createExpense,
  deleteExpense,
} from "../controllers/expenses.controller.js";

import { validate } from "../middlewares/validate.js";
import { createExpenseSchema } from "../validators/expense.validator.js";

const router = Router();

router.get("/", getExpenses);

router.post(
  "/",
  validate(createExpenseSchema),
  createExpense
);

router.delete("/:id", deleteExpense);

export default router;