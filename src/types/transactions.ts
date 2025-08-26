export interface Transaction {
    id: string;
    sender: string;
    receiver: string;
    amount: number;
    currency: string;
    cause: string;
    createdAt: string;
  }
  
  export interface TransactionResponse {
    transactions: Transaction[];
    totalPages: number;
    currentPage: number;
    totalItems: number;
  }
  
  export type TransactionType = 'incoming' | 'outgoing' | 'top-up';