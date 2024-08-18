export interface BaseTransaction {
  id: string;
  user_id: string;
  amount: number;
  description: string;
  createdAt: number;
}
