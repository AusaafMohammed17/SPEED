import React, { useState } from 'react';

interface Book {
  title: string;
  author: string;
  genre: string;
  // Add other fields as necessary
}

interface SearchBarProps {
  onSearch: (query: string, field: keyof Book) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [field, setField] = useState<keyof Book>('title'); // Default to 'title'

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
        onChange={(e) => setField(e.target.value as keyof Book)}
        className="form-control"
      >
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="genre">Genre</option>
        {/* Add other fields as necessary */}
      </select>
      <button type="submit" className="btn btn-primary">Search</button>
    </form>
  );
};

export default SearchBar;