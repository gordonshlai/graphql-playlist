const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* Don't need to define the id field, mongodb will automatically give the object an id */
const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String,
});

/* 
  Collection in MongoDB: Book
  Data Structure:        bookSchema
*/
module.exports = mongoose.model("Book", bookSchema);
