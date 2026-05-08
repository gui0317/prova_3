import React, { createContext, ReactNode, useContext, useState } from 'react';

export type Expense = {
  id: string;
  description: string;
  value: number;
};

type ExpensesContextType = {
  expenses: Expense[];
  addExpense: (description: string, value: number) => boolean;
  removeExpense: (id: string) => void;
  getTotal: () => number;
};

const ExpensesContext = createContext<ExpensesContextType | undefined>(undefined);

export function ExpensesProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', description: 'Supermercado', value: 75.5 },
    { id: '2', description: 'Transporte', value: 18.0 },
  ]);

  const addExpense = (description: string, value: number): boolean => {
    if (!description.trim() || value <= 0) {
      return false;
    }

    const newExpense: Expense = {
      id: Date.now().toString(),
      description: description.trim(),
      value: parseFloat(value.toString()),
    };

    setExpenses(current => [...current, newExpense]);
    return true;
  };

  const removeExpense = (id: string) => {
    setExpenses(current => current.filter(expense => expense.id !== id));
  };

  const getTotal = (): number => {
    return expenses.reduce((sum, expense) => sum + expense.value, 0);
  };

  return (
    <ExpensesContext.Provider value={{ expenses, addExpense, removeExpense, getTotal }}>
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error('useExpenses must be used within ExpensesProvider');
  }
  return context;
}
