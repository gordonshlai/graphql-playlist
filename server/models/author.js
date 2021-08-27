const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* Don't need to define the id field, mongodb will automatically give the object an id */
const authorSchema = new Schema({
  name: String,
  age: Number,
});

/* 
  Collection in MongoDB: Author
  Data Structure:        authorSchema
*/
module.exports = mongoose.model("Author", authorSchema);
