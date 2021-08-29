import { graphql } from "react-apollo";

import { getBookQuery } from "../queries/queries";

const BookDetails = ({ data }) => {
  const displayBookDetails = () => {
    console.log(data);
    const { book } = data;
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author</p>
          <ul className="other-books">
            {book.author.books.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      );
    }
    return <div>No book selected...</div>;
  };

  return <div id="book-details">{displayBookDetails()}</div>;
};

export default graphql(getBookQuery, {
  // the function executes when new props comes in to this component
  // and make another query with the new props
  options: (props) => ({ variables: { id: props.bookId } }), // attach to the query variables
})(BookDetails);
// binds getBookQuery to BookDetails component
