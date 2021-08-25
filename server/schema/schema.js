const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

/* Defines the structure of the data */
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
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
      args: { id: { type: GraphQLString } }, // the argument where the frontend sends along

      /* code to get data from db or other source */
      resolve(parent, args) {
        // parent will come into play when we look into relationships between data
        // args refers to the args defined above, so we will have access to the parameter
      },
    },
  },
});

/* Defining which query we are allowing the frontend to query from */
module.exports = new GraphQLSchema({
  query: RootQuery,
});
