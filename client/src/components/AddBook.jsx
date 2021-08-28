import { graphql } from "react-apollo";

import { getAuthorsQuery } from "../queries/queries";

const AddBook = ({ data }) => {
  const displayAuthors = () =>
    data.loading ? (
      <option disabled>Loading Authors...</option>
    ) : (
      data.authors.map((author, index) => (
        <option value={author.id} key={author + index}>
          {author.name}
        </option>
      ))
    );

  return (
    <form id="add-book">
      <div className="field">
        <label>Book name:</label>
        <input type="text" />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input type="text" />
      </div>

      <div className="field">
        <label>Author:</label>
        <select>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>

      <button>+</button>
    </form>
  );
};

export default graphql(getAuthorsQuery)(AddBook); // binds getAuthorsQuery to AddBook component
