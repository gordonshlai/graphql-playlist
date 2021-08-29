import { useState } from "react";
import { graphql } from "react-apollo";

import { getBooksQuery } from "../queries/queries";

import BookDetails from "./BookDetails";

const BookList = ({ data }) => {
  const [selected, setSelected] = useState(null);

  const displayBooks = () =>
    data.loading ? (
      <div>Loading books...</div>
    ) : (
      data.books.map((book, index) => (
        <li key={book + index} onClick={(e) => setSelected(book.id)}>
          {book.name}
        </li>
      ))
    );

  return (
    <div id="main">
      <ul id="book-list">{displayBooks()}</ul>
      <BookDetails bookId={selected} />
    </div>
  );
};

export default graphql(getBooksQuery)(BookList); // binds getBooksQuery to BookList component
