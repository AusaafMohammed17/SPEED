import React, { useState } from "react";
import ShowBookList from "./ShowBookList"; // Import the existing ShowBookList component

const SearchArticles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("title"); // Default filter by title
  const [filteredBooks, setFilteredBooks] = useState([]); // Store filtered books

  const filters = [
    { label: "Title", value: "title" },
    { label: "Author", value: "author" },
    { label: "Journal Name", value: "journal_name" },
    { label: "Published Date", value: "published_date" },
    { label: "ISBN", value: "isbn" },
    { label: "Volume", value: "volume" },
    { label: "Pages", value: "pages" },
  ];

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/book`);
      const books = await res.json();

      // Filter books based on the selected filter and search query
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const filtered = books.filter((book: any) => {
        if (!book[filterBy]) return false;
        return book[filterBy].toLowerCase().includes(searchQuery.toLowerCase());
      });

      setFilteredBooks(filtered);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <div className="search-articles">
      <h1>Search Books</h1>
      <hr />
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <label htmlFor="filterBy">Filter by:</label>
          <select
            id="filterBy"
            className="form-control"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
          >
            {filters.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder={`Search by ${filterBy}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Search
        </button>
      </form>

      <div className="search-results mt-5">
        {filteredBooks.length === 0 ? (
          <p>No results found</p>
        ) : (
          <ShowBookList books={filteredBooks} />
        )}
      </div>
    </div>
  );
};

export default SearchArticles;
