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
    const filtered = practitionerBooksUnsorted.filter((book) => {
      const publishDate = new Date(book.published_date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      return (!start || publishDate >= start) && (!end || publishDate <= end);
    });
    return filtered;
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
  const practitionerBooksUnsorted = books.filter((book) => book.admin_status === 'accepted');

  const practitionerBooks = filterBooksByDate();
  
  const bookList =
    practitionerBooks.length === 0
      ? 'No books found for the selected date range!'
      : practitionerBooks.map((book, k) => (
          <div key={k} className="book-item">
            <BookCard book={book} />
            {/* Button to delete the book */}
            <button className="btn btn-danger" onClick={() => handleReject(book._id!)}>
              Delete
            </button>
          </div>
        ));

  return (
    <div className="ShowBookList">
        <div className="row">
          <div className="col-md-12">
            <br />
            <h1 className="display-4 text-center">Practitioner Book List</h1>
          </div>

          <div className="col-md-11">
            <label>Start Date:</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <br />
            <label>End Date:</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            <br />
            <br />
            <hr />
          </div>
        </div>

        <div className="list">{bookList}</div>
    </div>
  );
}

export default PractitionerPage;
