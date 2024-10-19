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
    router.push(`/show-book/${book._id}`)
  };
  return (
    <div className='card-container' onClick={onClick}>
      
      <li className="article-item">
              <h3>{book.title}</h3>
              <p><strong>Authors:</strong> {book.author}</p>
              <p><strong>Journal:</strong> {book.journal_name}, {book.published_date}</p>
              <p><strong>Volume:</strong> {book.volume}, <strong>Number:</strong> {book.isbn}, <strong>Pages:</strong> {book.pages}</p>
            </li>

    </div>
  );
};

export default BookCard;

