// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
  
  res.render('books/details', {title: 'Add Book', books: ''})

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', async (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
  
  let newBook = book({
    "Title": req.body.title,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
  });
 
  try {
    await newBook.save();
    res.redirect('/books');
  } catch (err) {
    console.log(err);
  }

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', async (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
  
  let id = req.params.id;
try {
  await book.findById({ _id: id }
    , (err, foundBook) => {
      if (err) {
        console.log(err);
      } else {
        res.render('books/details', { title: 'Edit Book', books: foundBook })
      }
    })
} catch (error) {
  console.log(error);
}
});

// POST - process the information passed from the details form and update the document
router.post('/:id', async (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
  let id = req.params.id;
  let updatedBook = book({
    "_id": id,
    "Title": req.body.title,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
  });

  try {
    await book.update({ _id: id }, updatedBook, { multi: false }, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/books');
      }
    })
  } catch (error) {
    console.log(error);
  }


});

// GET - process the delete by user id
router.get('/delete/:id', async (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
  let id = req.params.id;
  try {
    await book.remove({ _id: id }, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/books');
      }
    })
  }
  catch (error) {
    console.log(error);
  }

});


module.exports = router;
