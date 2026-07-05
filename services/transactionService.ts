import request from "./api";
import { Transaction } from "@/types/transaction";

export async function getTransactions(): Promise<Transaction[]> {
  return await request("/transactions");
}

export async function createTransaction(data: Omit<Transaction, "id" | "date">) {
  return await request("/transactions", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateTransactionApi(id: number, data: Omit<Transaction, "id" | "date">) {
  return await request(`/transactions/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteTransactionApi(id: number) {
  return await request(`/transactions/${id}`, {
    method: "DELETE",
  });
}