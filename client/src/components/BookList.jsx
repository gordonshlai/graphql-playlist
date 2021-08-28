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

const BookList = (props) => {
  console.log(props);
  return (
    <div id="main">
      <ul id="book-list">
        <li>Book name</li>
      </ul>
    </div>
  );
};

export default graphql(getBookQuery)(BookList); // binds getBookQuery to BookList component
