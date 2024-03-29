const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");

const schema = require("./schema/schema");

const app = express();

app.use(cors()); // allow cross-origin requests

mongoose.connect(
  "mongodb+srv://abcde:abcde@cluster0.nonce.mongodb.net/graphql-playlist?retryWrites=true&w=majority"
);
mongoose.connection.once("open", () => {
  console.log("connected to database");
});

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});
