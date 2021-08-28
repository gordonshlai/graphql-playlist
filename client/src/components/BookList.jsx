import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getBookQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

const BookList = ({ data }) => {
  const displayBooks = () =>
    data.loading ? (
      <div>Loading books...</div>
    ) : (
      data.books.map((book, index) => <li key={book + index}>{book.name}</li>)
    );

  return (
    <div id="main">
      <ul id="book-list">{displayBooks()}</ul>
    </div>
  );
};

export default graphql(getBookQuery)(BookList); // binds getBookQuery to BookList component
