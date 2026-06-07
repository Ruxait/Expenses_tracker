import express from "express";
import cors from "cors";

import expensesRouter from "./routes/expenses.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

app.use("/expenses", expensesRouter);

export default app;