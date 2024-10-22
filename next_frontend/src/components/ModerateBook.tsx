import React, { useState, useEffect } from 'react';
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

  

  // Handler for accepting a book
  const handleAccept = async (bookId: string) => {
    if (!bookId) return;

    try {
      // Fetch the book by ID
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/book/${bookId}`);
      const book = await res.json();

      if (book) {
        // Update admin_status to 'accepted'
        book.admin_status = 'accepted';

        // Update the book with new status
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/book/${bookId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(book), // Send updated book
        });

        // Remove the book from the list in the frontend
        setBooks((prevBooks) => prevBooks.filter((b) => b._id !== bookId));
      }
    } catch (err) {
      console.log('Error accepting book:', err);
    }
  };

  // Handler for rejecting a book
  const handleReject = async (bookId: string) => {
    if (!bookId) return;

    try {
      // Delete the book
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/book/${bookId}`, {
        method: 'DELETE',
      });

      // Remove the book from the list in the frontend
      setBooks((prevBooks) => prevBooks.filter((b) => b._id !== bookId));
    } catch (err) {
      console.log('Error rejecting book:', err);
    }
  };
  const adminBooks = books.filter((book) => book.admin_status === 'admin');

  const bookList =
  adminBooks.length === 0
    ? 'There is no book record with admin_status admin!'
    : adminBooks.map((book, k) => (
        <div key={k} className='book-item'>
          <BookCard book={book} />
          {/* Buttons to accept or reject the book */}
          
          <button
            className='btn btn-success'
            onClick={() => handleAccept(book._id!)}
          >
            Accept
          </button>
          <button
            className='btn btn-danger'
            onClick={() => handleReject(book._id!)}
          >
            Reject
          </button>
        </div>
      ));

  return (
    <div className='ShowBookList'>
      <div className='row'>
        <div className='col-md-12'>
          <br />
          <h1 className='display-4 text-center'>Books List</h1>
          <hr />
        </div>
      </div>
      <div className='list'>{bookList}</div>
    </div>
  );
}

export default ModerateBook;
