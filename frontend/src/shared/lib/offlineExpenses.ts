import { dbPromise } from "./db";

import type { OfflineExpense } from "../types/offlineExpense";

const STORE = "pendingExpenses";

export const saveOfflineExpense =
  async (expense: OfflineExpense) => {
    console.log('SAVE OFFLINE', expense)
    const db = await dbPromise;

    await db.put(STORE, expense);
  };

export const getOfflineExpenses =
  async (): Promise<OfflineExpense[]> => {
    console.log('GET OFFLINE')
    const db = await dbPromise;

    return db.getAll(STORE);
  };

export const removeOfflineExpense =
  async (id: string) => {
    console.log('SYNC START')
    const db = await dbPromise;

    await db.delete(STORE, id);
  };