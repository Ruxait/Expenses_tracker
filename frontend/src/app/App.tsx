import { useEffect } from 'react';
import { AddExpenseForm } from '../features/add-expense/AddExpenseFrom'
import { ExpenseList } from '../features/expense-list/ExpenseList'
import { Header } from '../widgets/components/Header'
import { syncOfflineExpenses } from '../shared/lib/syncOfflineExpenses'

function App() {
  useEffect(() => {
  const handleOnline = () => {
    syncOfflineExpenses();
  };

  window.addEventListener(
    "online",
    handleOnline
  );

  return () => {
    window.removeEventListener(
      "online",
      handleOnline
    );
  };
}, []);
  return (
    <>
      <Header />

      <main>
        <section>
          <AddExpenseForm />
        </section>

        <section>
          <ExpenseList />
        </section>
      </main>
    </>
  )
}

export default App
