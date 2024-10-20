import React from 'react';
import { Book } from './Book';
import { useRouter } from 'next/navigation';

interface IProp {
  book?: Book;
}

const BookCard = ({ book }: IProp) => {
  const router = useRouter();
  if (book == undefined) {
    return null;
  }

  const onClick = () => {
    router.push(window.location.href += `/show-book/${book._id}`);
  };

  return (
    <div className='card-container' onClick={onClick}>
      <div className="book-details">
        <div className="label">
          <strong>Title:</strong>
          <span>{book.title}</span>
        </div>
        <div className="label">
          <strong>Authors:</strong>
          <span>{book.author}</span>
        </div>
        <div className="label">
          <strong>Journal:</strong>
          <span>{book.journal_name}</span>
        </div>
        <div className="label">
          <strong>Published Date:</strong>
          <span>{book.published_date}</span>
        </div>
        <div className="label">
          <strong>Volume:</strong>
          <span>{book.volume}</span>
        </div>
        <div className="label">
          <strong>ISBN:</strong>
          <span>{book.isbn}</span>
        </div>
        <div className="label">
          <strong>Pages:</strong>
          <span>{book.pages}</span>
        </div>
      </div>

      <style jsx>{`
        .card-container {
          cursor: pointer;
          padding: 15px;
          margin: 10px 0;
          border: 1px solid #ccc;
          border-radius: 8px;
          transition: box-shadow 0.3s ease;
        }

        .card-container:hover {
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .book-details {
          display: flex;
          flex-wrap: wrap; /* Allow wrapping to the next line */
          justify-content: space-between; /* Space out the labels */
        }

        .label {
          flex: 1; /* Each label takes equal space */
          margin: 5px;
          text-align: center; /* Center align text */
        }

        .label strong {
          display: block; /* Make label bold and take full width */
          margin-bottom: 5px; /* Space between label and value */
        }
      `}</style>
    </div>
  );
};

export default BookCard;
