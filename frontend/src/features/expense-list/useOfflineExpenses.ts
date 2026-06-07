import { useEffect, useState } from 'react'

import { getOfflineExpenses } from '../../shared/lib/offlineExpenses'

import type { OfflineExpense } from '../../shared/types/offlineExpense'

export const useOfflineExpenses = () => {
  const [expenses, setExpenses] = useState<OfflineExpense[]>([])

  const loadExpenses = async () => {
    const data = await getOfflineExpenses()

    setExpenses(data)
  }

  useEffect(() => {
    loadExpenses()

    const handler = () => {
      loadExpenses()
    }

    window.addEventListener('offline-expense-added', handler)
    window.addEventListener('offline-expenses-synced', handler)

    return () => {
      window.removeEventListener('offline-expense-added', handler)
      window.removeEventListener('offline-expenses-synced', handler)
    }
  }, [])

  return {
    expenses,
    reload: loadExpenses,
  }
}
