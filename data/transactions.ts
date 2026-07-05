import { Transaction } from "@/types/transaction";

export const transactions: Transaction[] = [
  {
    id: 1,
    title: "Makan",
    category: "food",
    amount: 25000,
    type: "expense",
  },
  {
    id: 2,
    title: "Bensin",
    category: "transport",
    amount: 100000,
    type: "expense",
  },
  {
    id: 3,
    title: "Freelance",
    category: "freelance",
    amount: 2500000,
    type: "income",
  },
  {
    id: 4,
    title: "Gaji",
    category: "salary",
    amount: 5000000,
    type: "income",
  },
];