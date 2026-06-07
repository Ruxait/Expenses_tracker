import { useEffect } from 'react'
import { useDeleteExpenseMutation, useGetExpensesQuery } from '../../shared/api/expensesApi'
import { useOfflineExpenses } from './useOfflineExpenses'

export const ExpenseList = () => {
  const { data = [], refetch } = useGetExpensesQuery()
  const { expenses: offlineExpenses } = useOfflineExpenses()
  const [deleteExpense] = useDeleteExpenseMutation()
  useEffect(() => {
    const handler = () => {
      refetch()
    }

    window.addEventListener('offline-expenses-synced', handler)

    return () => {
      window.removeEventListener('offline-expenses-synced', handler)
    }
  }, [refetch])
  const expenses = [...offlineExpenses, ...data]

  const total = expenses.reduce((acc, expense) => acc + Number(expense.sum), 0)

  return (
    <div>
      <h2>Расходы</h2>

      <ul>
        {expenses.map(expense => (
          <li key={expense.id}>
            <div>
              <strong>{expense.name}</strong>
              {'synced' in expense && expense.synced === false && <span> ⏳ Ожидает синхронизации</span>}
            </div>

            <div>{expense.sum} ₽</div>

            <div>{new Date(expense.date).toLocaleDateString()}</div>

            <button onClick={() => deleteExpense(expense.id)}>Удалить</button>
          </li>
        ))}
      </ul>

      <h3>Итого: {total.toLocaleString()} ₽</h3>
    </div>
  )
}
