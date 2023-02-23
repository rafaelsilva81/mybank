type TransactionResponse = {
  id: string;
  type: 'DEPOSIT' | 'WITHDRAWAL';
  createdAt: string;
  amount: number;
  description: string | undefined;
};
