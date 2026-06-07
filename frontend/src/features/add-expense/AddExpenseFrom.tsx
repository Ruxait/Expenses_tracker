import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { saveOfflineExpense } from '../../shared/lib/offlineExpenses'
import { useNetworkStatus } from '../../shared/hooks/useNetworkStatus'
import { type ExpenseFormValues, expenseSchema } from './schema'
import { useAddExpenseMutation } from '../../shared/api/expensesApi'

export const AddExpenseForm = () => {
  const [addExpense, { isLoading }] = useAddExpenseMutation()
  const isOnline = useNetworkStatus()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
    },
  })

  const onSubmit = async (data: ExpenseFormValues) => {
    console.log('isOnline', isOnline)
    try {
      if (isOnline) {
        await addExpense(data).unwrap()
      } else {
        await saveOfflineExpense({
          ...data,
          id: crypto.randomUUID(),
          synced: false,
        })
        window.dispatchEvent(new Event('offline-expense-added'))
      }

      reset()
    } catch (error) {
      console.error(error)
    }
  }
  console.log('ONLINE?', isOnline)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input placeholder="Название" {...register('name')} />

        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <input
          type="number"
          step="1"
          {...register('sum', {
            valueAsNumber: true,
          })}
        />

        {errors.sum && <p>{errors.sum.message}</p>}
      </div>

      <div>
        <input type="date" {...register('date')} />
      </div>

      <button type="submit" disabled={isLoading}>
        Добавить
      </button>
    </form>
  )
}
