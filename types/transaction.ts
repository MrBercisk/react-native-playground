export type Transaction = {
  id: number;
  title: string;
  category: "food" | "transport" | "salary" | "freelance";
  amount: number;
  type: "income" | "expense";
  date: number;
};