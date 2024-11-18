import { TransactionCategory } from "../../types/transaction-category.enum.js";
import { Color } from "../../types/color.enum.js";

export type Budget = {
  category: TransactionCategory;
  value: number;
  theme: Color;
};
