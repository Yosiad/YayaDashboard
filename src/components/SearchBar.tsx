import React, { useState } from 'react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setCurrentPage: (page: number) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  setCurrentPage,
}) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localQuery);
    setCurrentPage(1);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search by sender, receiver, cause, or ID..."
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">
        Search
      </button>
      {searchQuery && (
        <button
          type="button"
          onClick={() => {
            setLocalQuery('');
            setSearchQuery('');
            setCurrentPage(1);
          }}
          className="clear-button"
        >
          Clear
        </button>
      )}
    </form>
  );
};

export default SearchBar;