export type RecurringBill = {
  amount: number;
  dueDate: Date;
  recipient: {
    name: string;
    avatar: string;
  };
};
