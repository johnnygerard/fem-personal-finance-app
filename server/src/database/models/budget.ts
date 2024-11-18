import { TransactionCategory } from "../../types/transaction-category.enum.js";
import { Theme } from "./theme.js";

export type Budget = {
  category: TransactionCategory;
  value: number;
  theme: Theme;
};
