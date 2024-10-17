import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string, field: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [field, setField] = useState('title');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query, field);
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery((e.target as HTMLInputElement).value)}
        placeholder="Search..."
        className="form-control"
      />
      <select
        value={field}
        onChange={(e) => setField(e.target.value)}
        className="form-control"
      >
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="genre">Genre</option>
      </select>
      <button type="submit" className="btn btn-primary">Search</button>
    </form>
  );
};

export default SearchBar;