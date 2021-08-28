import { useState } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";

import { getAuthorsQuery, addBookMutation } from "../queries/queries";

const AddBook = ({ getAuthorsQuery, addBookMutation }) => {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  const displayAuthors = () =>
    getAuthorsQuery.loading ? (
      <option disabled>Loading Authors...</option>
    ) : (
      getAuthorsQuery.authors?.map((author, index) => (
        <option value={author.id} key={author + index}>
          {author.name}
        </option>
      ))
    );

  const submitForm = (e) => {
    e.preventDefault();
    addBookMutation({ variables: { name, genre, authorId } });
  };

  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={(e) => setGenre(e.target.value)} />
      </div>

      <div className="field">
        <label>Author:</label>
        <select onChange={(e) => setAuthorId(e.target.value)}>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>

      <button>+</button>
    </form>
  );
};

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }), // the name will be the key of the data
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook); // binds getAuthorsQuery and addBookMutation to AddBook component
