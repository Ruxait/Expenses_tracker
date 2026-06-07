import { type Request, type Response } from "express";
import { prisma } from "../db/prisma.js";

export const getExpenses = async (
  req: Request,
  res: Response
) => {
  const expenses = await prisma.expense.findMany({
    orderBy: {
      date: "desc",
    },
  });

  res.json(expenses);
};

export const createExpense = async (
  req: Request,
  res: Response
) => {
  const { name, sum, date } = req.body;

  const expense = await prisma.expense.create({
    data: {
      name,
      sum,
      date: new Date(date),
    },
  });

  res.status(201).json(expense);
};

export const deleteExpense = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  if (!id || Array.isArray(id)) {
    res.status(400).json({ error: "Invalid expense ID" });
    return;
  } 
  
  await prisma.expense.delete({
    where: { id },
  });

  res.status(204).send();
};