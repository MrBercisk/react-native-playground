import { createContext, useContext, useState, useMemo, useEffect, ReactNode } from "react";
import { Transaction } from "@/types/transaction";
import { Summary } from "@/types/summary";
import {
  getTransactions,
  createTransaction,
  updateTransactionApi,
  deleteTransactionApi,
} from "@/services/transactionService";

type TransactionContextType = {
  transactions: Transaction[];
  summary: Summary[];
  loading: boolean; 
  addTransaction: (transaction: Omit<Transaction, "id" | "date">) => Promise<void>;
  updateTransaction: (id: number, transaction: Omit<Transaction, "id" | "date">) => Promise<void>;
  deleteTransaction: (id: number) => Promise<void>;
  refreshTransactions: () => Promise<void>; 
};

const TransactionContext = createContext<TransactionContextType | null>(null);

type ProviderProps = {
  children: ReactNode;
};

export function TransactionProvider({ children }: ProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // ambil data dari server pas pertama kali app dibuka
  const refreshTransactions = async () => {
    try {
      setLoading(true);
      const data = await getTransactions();
      setTransactions(data);
    } catch (error) {
      console.log("Gagal ambil transaksi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshTransactions();
  }, []);

  const addTransaction = async (transaction: Omit<Transaction, "id" | "date">) => {
    const newTransaction = await createTransaction(transaction);
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const updateTransaction = async (id: number, updated: Omit<Transaction, "id" | "date">) => {
    const updatedTransaction = await updateTransactionApi(id, updated);
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? updatedTransaction : t))
    );
  };

  const deleteTransaction = async (id: number) => {
    await deleteTransactionApi(id);
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const summary: Summary[] = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((total, t) => total + Number(t.amount), 0);
    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((total, t) => total + Number(t.amount), 0);
    const balance = income - expense;

    return [
      { title: "Balance", amount: balance, color: "#2563EB" },
      { title: "Income", amount: income, color: "#22C55E" },
      { title: "Expense", amount: expense, color: "#EF4444" },
    ];
  }, [transactions]);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        summary,
        loading,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        refreshTransactions,
      }}
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