const graphql = require("graphql");
const _ = require("lodash");
const Book = require("../models/book");
const Author = require("../models/author");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

/* Defines the structure of the data */
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return Author.findById(parent.authorId); // return the Book with the corresponding authorId
      },
    },
  }),
});
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({ authorId: parent.id }); // Look for all records based on the creteria defined in the parameter.
      },
    },
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
        // parent is the initial data that is requested
        // args refers to the args defined above, so we will have access to the parameter

        return Book.findById(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({});
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // name of the query (the spelling here maters)
    addAuthor: {
      type: AuthorType, // the type to mutate
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      }, // the argument where the frontend sends along
      resolve(parent, args) {
        // new instant from the model
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save(); // save the instant to the database and return the saved data
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return book.save();
      },
    },
  },
});

/* Defining which query we are allowing the frontend to query from */
module.exports = new GraphQLSchema({
  query: RootQuery, // query key, allow the frontend to make queries
  mutation: Mutation, // mutation key, allow the frontend to make mutations
});
