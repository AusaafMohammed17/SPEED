import React, { useEffect, useState } from "react";
import Link from "next/link";
import BookCard from "./BookCard";
import { Book } from "./Book";

interface ShowBookListProps {
  books?: Book[]; // Accept optional books prop for filtered results
}

function ShowBookList({ books: propBooks }: ShowBookListProps) {
  const [books, setBooks] = useState<Book[]>([]); // Local state to store books

  // Update books state when propBooks changes
  useEffect(() => {
    if (propBooks && propBooks.length > 0) {
      setBooks(propBooks); // Set books from propBooks if provided
    } else {
      // Fetch full book list if no propBooks is provided
      fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/book")
        .then((res) => res.json())
        .then((books) => {
          setBooks(books);
        })
        .catch((err) => {
          console.log("Error from ShowBookList: " + err);
        });
    }
  }, [propBooks]); // Runs whenever propBooks changes

  const bookList =
    books.length === 0
      ? "There is no book record!"
      : books.map((book, k) => <BookCard book={book} key={k} />);

  return (
    <div className="ShowBookList">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <br />
            <h2 className="display-4 text-center">Books List</h2>
          </div>
        </div>
        <div className="list">{bookList}</div>
      </div>
    </div>
  );
}

export default ShowBookList;
