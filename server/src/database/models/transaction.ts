import { TransactionCategory } from "../../types/transaction-category.enum.js";

export type Transaction = {
  category: TransactionCategory;
  amount: number;
  date: Date;
  originator: {
    name: string;
    avatar: string;
  };
};
