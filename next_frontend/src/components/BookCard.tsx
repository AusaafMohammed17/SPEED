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
      <p> \n</p>
      <div className='desc'>
        <h2>
          {book.title}
        </h2>
        <h3>{book.admin_status}</h3>
      </div>
    </div>
  );
};

export default BookCard;

