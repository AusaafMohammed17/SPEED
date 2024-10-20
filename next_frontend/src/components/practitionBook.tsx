import React, { useState, useEffect } from 'react';
//import Link from 'next/link';
import BookCard from './BookCard';
import { Book } from './Book';

function PractitionerPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Fetch all books when the component loads
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/book`)
      .then((res) => res.json())
      .then((data) => {
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

  // Function to filter books by publish date range
  const filterBooksByDate = () => {
    const filtered = books.filter((book) => {
      const publishDate = new Date(book.published_date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      return (!start || publishDate >= start) && (!end || publishDate <= end);
    });
    return filtered;
  };

  // Handler for accepting a book (set admin_status to "public")
  const handleAccept = async (bookId: string) => {
    if (!bookId) return;

    try {
      // Fetch the book by ID
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/book/${bookId}`);
      const book = await res.json();

      if (book) {
        // Update admin_status to 'public'
        book.admin_status = 'public';

        // Update the book with new status
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/book/${bookId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(book), // Send updated book
        });

        // Optionally refresh the page or update the list
      }
    } catch (err) {
      console.log('Error accepting book:', err);
    }
  };

  // Handler for rejecting a book
  const handleReject = async (bookId: string) => {
    if (!bookId) return;

    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/book/${bookId}`, {
        method: 'DELETE',
      });

      // Optionally refresh the page or update the list
      setBooks((prevBooks) => prevBooks.filter((b) => b._id !== bookId));
    } catch (err) {
      console.log('Error rejecting book:', err);
    }
  };

  // Filtered book list based on date range
  const practitionerBooks = filterBooksByDate();

  const bookList =
    practitionerBooks.length === 0
      ? 'No books found for the selected date range!'
      : practitionerBooks.map((book, k) => (
          <div key={k} className="book-item">
            <BookCard book={book} />
            {/* Buttons to accept or reject the book */}
            <button className="btn btn-success" onClick={() => handleAccept(book._id!)}>
              Accept
            </button>
            <button className="btn btn-danger" onClick={() => handleReject(book._id!)}>
              Reject
            </button>
          </div>
        ));

  return (
    <div className="ShowBookList">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <br />
            <h2 className="display-4 text-center">Practitioner Book List</h2>
          </div>

          <div className="col-md-11">
            <label>Start Date:</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <label>End Date:</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            <br />
            <br />
            <hr />
          </div>
        </div>

        <div className="list">{bookList}</div>
      </div>
    </div>
  );
}

export default PractitionerPage;
