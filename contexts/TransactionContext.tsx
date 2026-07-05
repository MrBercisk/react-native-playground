import { createContext, useContext, useState, useMemo, ReactNode } from "react";
import { Transaction } from "@/types/transaction";
import { Summary } from "@/types/summary";
import { transactions as initialTransactions } from "@/data/transactions";

type TransactionContextType = {
  transactions: Transaction[];
  summary: Summary[];
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  updateTransaction: (id: number, transaction: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: number) => void;
};

const TransactionContext = createContext<TransactionContextType | null>(null);

type ProviderProps = {
  children: ReactNode;
};

export function TransactionProvider({ children }: ProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = { id: Date.now(), ...transaction };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const updateTransaction = (id: number, updated: Omit<Transaction, "id">) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { id, ...updated } : t))
    );
  };

  const deleteTransaction = (id: number) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const summary: Summary[] = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((total, t) => total + t.amount, 0);
    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((total, t) => total + t.amount, 0);
    const balance = income - expense;

    return [
      { title: "Balance", amount: balance, color: "#2563EB" },
      { title: "Income", amount: income, color: "#22C55E" },
      { title: "Expense", amount: expense, color: "#EF4444" },
    ];
  }, [transactions]);

  return (
    <TransactionContext.Provider
      value={{ transactions, summary, addTransaction, updateTransaction, deleteTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransaction() {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransaction harus berada di dalam TransactionProvider");
  }
  return context;
}