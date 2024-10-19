import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import BookCard from './BookCard';
import { Book } from './Book';

function ModerateBook() {
  const [books, setBooks] = useState<Book[]>([]); // Ensure it's typed as an array of Book objects
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/book`) // Corrected URL
      .then((res) => res.json())
      .then((data) => {
        // Ensure that data is an array
        if (Array.isArray(data)) {
          setBooks(data);
        } else {
          console.error('Data is not an array:', data);
          setBooks([]);
        }
      })
      .catch((err) => {
        console.log('Error from ShowBookList: ' + err);
      });
  }, []);

  const adminBooks = books.filter((book) => book.admin_status === 'admin');
  
  const bookList =
    adminBooks.length === 0
      ? 'there is no book record!'
      : adminBooks.map((book, k) => <BookCard book={book} key={k} />);

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
            <br />
            <br />
            <hr />
          </div>
        </div>

        <div className='list'>{bookList}</div>
      </div>
    </div>
  );
}

export default ModerateBook;
