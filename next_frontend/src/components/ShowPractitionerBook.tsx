'use client'

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Book, DefaultEmptyBook } from './Book';

const EditBookByPractitioner = () => {
  const [book, setBook] = useState<Book>(DefaultEmptyBook);

  const id = useParams<{ id: string }>().id;
  const navigate = useRouter();

  const [missingFields, setMissingFields] = useState<string[]>([]);

  const requiredFields = [
    "title",
    "author",
    "isbn",
  ];

  // Fetch book data by ID when component mounts
  useEffect(() => {
    console.log(id);
    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/api/book/${id}`)
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        setBook(json);
      })
      .catch((err) => {
        console.log('Error from ShowBookDetails: ' + err);
      });
  }, [id]);

  const formattedDate = book.published_date.toString().split('T')[0]; // Extract the date part


  // Handle form input changes
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, [event.target.name]: event.target.value });
  };

  // Handle form submission
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check for missing fields
    const missing = requiredFields.filter((field) => !book[field as keyof Book]);
    if (missing.length > 0) {
      setMissingFields(missing);
      return;
    }

    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      })
        .then((res) => {
          console.log(res);
          setBook(DefaultEmptyBook);
          navigate.push("/book/practition-book");
        })
        .catch((err) => {
          console.log("Error from CreateBook: " + err);
        });
  };

  const isFieldMissing = (fieldName: string) => missingFields.includes(fieldName);


  return (
    <div className="EditBook">
      <div className="container">
        <div>
            {book.title}
        </div>
        <div className="row">
          <div className="col-md-10 m-auto">
            <h1 className="display-4 text-center">Edit Book</h1>
            <p className="lead text-center">Edit the details of the book</p>
            <form noValidate onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Title of the Book"
                  name="title"
                  className={`form-control ${isFieldMissing("title") ? "is-invalid" : ""}`}
                  value={book.title}
                  onChange={onChange}
                />
                {isFieldMissing("title") && <small className="text-danger">Title is required</small>}
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Author"
                  name="author"
                  className={`form-control ${isFieldMissing("author") ? "is-invalid" : ""}`}
                  value={book.author}
                  onChange={onChange}
                />
                {isFieldMissing("author") && <small className="text-danger">Author is required</small>}
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Journal Name"
                  name="journal_name"
                  className={`form-control ${isFieldMissing("journal_name") ? "is-invalid" : ""}`}
                  value={book.journal_name}
                  onChange={onChange}
                />
                {isFieldMissing("journal_name") && <small className="text-danger">Journal name is required</small>}
              </div>
              <br />
              <div className="form-group">
                <input
                  type="date"
                  placeholder="Published Date"
                  name="published_date"
                  className={`form-control ${isFieldMissing("published_date") ? "is-invalid" : ""}`}
                  value={formattedDate}
                  onChange={onChange}
                />
                {isFieldMissing("published_date") && <small className="text-danger">Published date is required</small>}
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Publisher"
                  name="publisher"
                  className={`form-control ${isFieldMissing("publisher") ? "is-invalid" : ""}`}
                  value={book.publisher}
                  onChange={onChange}
                />
                {isFieldMissing("publisher") && <small className="text-danger">Publisher is required</small>}
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Volume"
                  name="volume"
                  className={`form-control ${isFieldMissing("volume") ? "is-invalid" : ""}`}
                  value={book.volume}
                  onChange={onChange}
                />
                {isFieldMissing("volume") && <small className="text-danger">Volume is required</small>}
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="ISBN"
                  name="isbn"
                  className={`form-control ${isFieldMissing("isbn") ? "is-invalid" : ""}`}
                  value={book.isbn}
                  onChange={onChange}
                />
                {isFieldMissing("isbn") && <small className="text-danger">ISBN is required</small>}
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Number of Pages"
                  name="pages"
                  className={`form-control ${isFieldMissing("pages") ? "is-invalid" : ""}`}
                  value={book.pages}
                  onChange={onChange}
                />
                {isFieldMissing("pages") && <small className="text-danger">Number of pages is required</small>}
              </div>
              <button
                type="submit"
                className="btn btn-outline-success btn-block mt-4 mb-4 w-100"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBookByPractitioner;
