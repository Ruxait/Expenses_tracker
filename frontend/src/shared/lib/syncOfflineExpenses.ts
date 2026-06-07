import { getOfflineExpenses } from "./offlineExpenses";

import { removeOfflineExpense } from "./offlineExpenses";

export const syncOfflineExpenses =
  async () => {
    const expenses =
      await getOfflineExpenses();

    for (const expense of expenses) {
      try {
        await fetch(
          "http://localhost:5000/expenses",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              name: expense.name,
              sum: expense.sum,
              date: expense.date,
            }),
          }
        );

        await removeOfflineExpense(
          expense.id
        );
      } catch (error) {
        console.error(error);
      }
    }

    window.dispatchEvent(
      new Event("offline-expenses-synced")
    );
  };