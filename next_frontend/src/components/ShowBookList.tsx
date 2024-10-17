import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar'; // Assuming you have a SearchBar component
import BookCard from './BookCard'; // Assuming you have a BookCard component

interface Book {
  title: string;
  author: string;
  genre: string;
  journal_name: string;
  published_date: Date;
  publisher: string;
  volume: string;
  isbn: string;
  pages: string;
  updated_date: Date;
  status: string;
}

function ShowBookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/book')
      .then((res) => res.json())
      .then((books: Book[]) => {
        const formattedBooks = books.map(book => ({
          ...book,
          published_date: new Date(book.published_date)
        }));
        setBooks(formattedBooks);
      })
      .catch((err) => {
        console.log('Error from ShowBookList: ' + err);
      });
  }, []);

  const handleSearch = (query: string, field: keyof Book) => {
    const filtered = books.filter((book) =>
      typeof book[field] === 'string' && book[field]?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  const bookList =
    books.length === 0
      ? 'there is no book record!'
      : books.map((book, k) => <BookCard book={book} key={k} />);

  return (
    <div className='ShowBookList'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <br />
            <h2 className='display-4 text-center'>Books List</h2>
          </div>
          <div className='col-md-11'>
            <Link
              href='/book/create-book'
              className='btn btn-outline-warning float-right'
            >
              + Add New Book
            </Link>
          </div>
          <div className='col-md-12'>
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
        <div className='row'>
          {bookList}
        </div>
      </div>
    </div>
  );
}

export default ShowBookList;