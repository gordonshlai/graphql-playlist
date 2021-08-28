import { useState } from "react";
import { graphql } from "react-apollo";

import { getAuthorsQuery } from "../queries/queries";

const AddBook = ({ data }) => {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

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

  const submitForm = (e) => {
    e.preventDefault();
    console.log(name, "name");
    console.log(genre, "genre");
    console.log(authorId, "authorId");
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

export default graphql(getAuthorsQuery)(AddBook); // binds getAuthorsQuery to AddBook component
