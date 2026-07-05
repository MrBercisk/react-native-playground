import { Transaction } from "@/types/transaction";

export const transactions: Transaction[] = [
  {
    id: 1,
    title: "Makan",
    category: "food",
    amount: 25000,
    type: "expense",
    date: new Date("2026-07-02").getTime(),
  },
  {
    id: 2,
    title: "Bensin",
    category: "transport",
    amount: 100000,
    type: "expense",
    date: new Date("2026-07-03").getTime(),
  },
  {
    id: 3,
    title: "Freelance",
    category: "freelance",
    amount: 2500000,
    type: "income",
    date: new Date("2026-06-20").getTime(),
  },
  {
    id: 4,
    title: "Gaji",
    category: "salary",
    amount: 5000000,
    type: "income",
    date: new Date("2026-06-01").getTime(),
  },
];