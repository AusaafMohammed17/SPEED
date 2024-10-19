import React, { useState } from 'react';

interface Article {
  title: string;
  authors: string;
  journalName: string;
  year: number;
  volume: number;
  number: number;
  pages: string;
  doi: string;
}

interface SearchBarProps {
  onSearch: (query: string, field: keyof Article) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [field, setField] = useState('title');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query, field as keyof Article);
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="form-control"
      />
      <select
        value={field}
        onChange={(e) => setField(e.target.value)}
        className="form-control"
      >
        <option value="title">Title</option>
        <option value="authors">Authors</option>
        <option value="journalName">Journal Name</option>
        <option value="year">Year</option>
        <option value="volume">Volume</option>
        <option value="number">Number</option>
        <option value="pages">Pages</option>
        <option value="doi">DOI</option>
      </select>
      <button type="submit" className="btn btn-primary">Search</button>
    </form>
  );
};

export default SearchBar;