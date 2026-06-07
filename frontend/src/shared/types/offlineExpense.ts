export interface OfflineExpense {
  id: string;
  name: string;
  sum: number;
  date: string;

  synced: boolean;
}