import { configureStore } from "@reduxjs/toolkit";
import { expensesApi } from "../../shared/api/expensesApi";

export const store = configureStore({
  reducer: {
    [expensesApi.reducerPath]: expensesApi.reducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(expensesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;