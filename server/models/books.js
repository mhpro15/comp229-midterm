/*
  COMP 229 MIDTERM
  HUNG NGUYEN
  301294266
  June 19 2023
  books.js
*/

let mongoose = require('mongoose');

// create a model class
let Book = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('Book', Book);
