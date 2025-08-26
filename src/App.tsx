import React, { useState } from 'react';
import TransactionTable from './components/TransactionTable';
import SearchBar from './components/SearchBar';
import './App.css';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Yaya Wallet Dashboard</h1>
      </header>
      
      <main className="app-main">
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setCurrentPage={setCurrentPage}
        />
        
        <TransactionTable 
          searchQuery={searchQuery}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </main>
    </div>
  );
};

export default App;