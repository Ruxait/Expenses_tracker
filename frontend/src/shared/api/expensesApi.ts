import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { Expense } from "../types/expense";

export const expensesApi = createApi({
  reducerPath: "expensesApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),

  tagTypes: ["Expenses"],

  endpoints: (builder) => ({
    getExpenses: builder.query<Expense[], void>({
      query: () => "/expenses",
      providesTags: ["Expenses"],
    }),

    addExpense: builder.mutation<
      Expense,
      Omit<Expense, "id">
    >({
      query: (body) => ({
        url: "/expenses",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Expenses"],
    }),

    deleteExpense: builder.mutation<void, string>({
      query: (id) => ({
        url: `/expenses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Expenses"],
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useAddExpenseMutation,
  useDeleteExpenseMutation,
} = expensesApi;