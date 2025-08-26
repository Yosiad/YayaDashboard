import React from 'react';
import { useTransactions } from '../hooks/useTransactions';
import Pagination from './Pagination';
import { TransactionType } from '../types/transactions';

interface TransactionTableProps {
  searchQuery: string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  searchQuery,
  currentPage,
  setCurrentPage,
}) => {
  const { transactions, loading, error, totalPages } = useTransactions(searchQuery, currentPage);

  const getTransactionType = (transaction: { receiver: string; sender: string }): TransactionType => {
    const currentUser = 'current-user';
    if (transaction.receiver === currentUser && transaction.sender === currentUser) return 'top-up';
    if (transaction.receiver === currentUser) return 'incoming';
    return 'outgoing';
  };

  // Format currency amount
  const formatAmount = (amount: number, currency: string): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        Loading transactions...
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h3>Error Loading Transactions</h3>
        <p>{error.message}</p>
        <p>Please check your connection and try again.</p>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="no-data">
        <h3>No Transactions Found</h3>
        <p>No transactions match your search criteria.</p>
        {searchQuery && (
          <button 
            onClick={() => window.location.reload()}
            className="retry-button"
          >
            Clear Search
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="transaction-table-container">
      <div className="table-header">
        <h3>Transaction History</h3>
        <span className="results-count">
          Showing {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="table-responsive">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Amount</th>
              <th>Currency</th>
              <th>Cause</th>
              <th>Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => {
              const type = getTransactionType(transaction);
              return (
                <tr
                  key={transaction.id}
                  className={`transaction-row ${type}`}
                >
                  <td className="transaction-id">{transaction.id}</td>
                  <td>
                    <span className="transaction-type-badge">
                      {type}
                    </span>
                  </td>
                  <td>{transaction.sender}</td>
                  <td>{transaction.receiver}</td>
                  <td className="amount-cell">
                    {formatAmount(transaction.amount, transaction.currency)}
                  </td>
                  <td className="currency-cell">{transaction.currency}</td>
                  <td className="cause-cell">{transaction.cause}</td>
                  <td className="date-cell">{formatDate(transaction.createdAt)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default TransactionTable;