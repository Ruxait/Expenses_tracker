import { openDB } from "idb";

export const dbPromise = openDB(
  "expenses-db",
  1,
  {
    upgrade(db) {
      if (
        !db.objectStoreNames.contains(
          "pendingExpenses"
        )
      ) {
        db.createObjectStore(
          "pendingExpenses",
          {
            keyPath: "id",
          }
        );
      }
    },
  }
);