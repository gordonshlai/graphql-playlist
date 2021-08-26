const graphql = require("graphql");
const _ = require("lodash");

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;

//dummy data
const books = [
  { name: "Name of the Wind", genre: "Fantasy", id: "1" },
  { name: "The final Empire", genre: "Fantasy", id: "2" },
  { name: "The Long Earth", genre: "Sci-Fi", id: "3" },
];

/* Defines the structure of the data */
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

/* The structure of the query for the frontend */
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // name of the query (the spelling here maters)
    book: {
      type: BookType, // the type it returns
      args: { id: { type: GraphQLID } }, // the argument where the frontend sends along

      /* code to get data from db or other source */
      resolve(parent, args) {
        // parent will come into play when we look into relationships between data
        // args refers to the args defined above, so we will have access to the parameter

        return _.find(books, { id: args.id });
      },
    },
  },
});

/* Defining which query we are allowing the frontend to query from */
module.exports = new GraphQLSchema({
  query: RootQuery,
});
