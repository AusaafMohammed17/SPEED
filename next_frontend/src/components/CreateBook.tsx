import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Book, DefaultEmptyBook } from "./Book";

const CreateBookComponent = () => {
  const navigate = useRouter();
  const [book, setBook] = useState<Book>(DefaultEmptyBook);
  const [missingFields, setMissingFields] = useState<string[]>([]);

  const requiredFields = ["title", "author", "isbn"];

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check for missing fields
    const missing = requiredFields.filter((field) => !book[field as keyof Book]);
    if (missing.length > 0) {
      setMissingFields(missing);
      return;
    }

    const updatedBook = {
      ...book,
      status: "admin",
      last_updated: new Date().toISOString(),
    };

    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBook), // Use updatedBook here
    })
      .then((res) => {
        console.log(res);
        setBook(DefaultEmptyBook);
        navigate.push("/book");
      })
      .catch((err) => {
        console.log("Error from CreateBook: " + err);
      });
  };

  const isFieldMissing = (fieldName: string) => missingFields.includes(fieldName);

  return (
    <div className="CreateBook">
      <div className="container">
        <div className="row">
          <div className="col-md-10 m-auto">
            <h1 className="display-4 text-center">Add Book</h1>
            <p className="lead text-center">Create new book</p>
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
                {isFieldMissing("journal_name") && (
                  <small className="text-danger">Journal name is required</small>
                )}
              </div>
              <br />
              <div className="form-group">
                <input
                  type="date"
                  placeholder="Published Date"
                  name="published_date"
                  className={`form-control ${isFieldMissing("published_date") ? "is-invalid" : ""}`}
                  value={book.published_date?.toString()}
                  onChange={onChange}
                />
                {isFieldMissing("published_date") && (
                  <small className="text-danger">Published date is required</small>
                )}
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
              <button type="submit" className="btn btn-outline-warning btn-block mt-4 mb-4 w-100">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBookComponent;
