import { useState, useEffect } from 'react';
import { fetchTransactions } from '../utils/api';
import { Transaction } from '../types/transactions';
import { ApiError } from '../types/api';

interface UseTransactionsResult {
  transactions: Transaction[];
  loading: boolean;
  error: ApiError | null;
  totalPages: number;
}

export const useTransactions = (searchQuery: string, currentPage: number): UseTransactionsResult => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getTransactions = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await fetchTransactions(searchQuery, currentPage);
        setTransactions(data.transactions || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        setError(err as ApiError);
      } finally {
        setLoading(false);
      }
    };

    getTransactions();
  }, [searchQuery, currentPage]);

  return { transactions, loading, error, totalPages };
};