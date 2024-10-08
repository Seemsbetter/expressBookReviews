const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
    res.status(200).json(books);});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;  // Get ISBN from request parameters
  const book = books[isbn];      // Lookup book by ISBN in the books object

  if (book) {
    res.status(200).json(book);  // Send the book details if found
  } else {
    res.status(404).json({ message: "Book not found" });  // If the book is not found, send a 404 error
  }


 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
const author = req.params.author;

 // Assuming books is an array of book objects with an 'author' field
  const booksByAuthor = Object.values(books).filter(book => book.author === author);
  
  if (booksByAuthor.length > 0) {
    res.status(200).json(booksByAuthor);  // Send the list of books by the author if found
  } else {
    res.status(404).json({ message: "Books by this author not found" });  // If no books by the author are found, send a 404 error
  }
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;

  // Filter books by title
  const booksByTitle = Object.values(books).filter(book => book.title === title);

  if (booksByTitle.length > 0) {
    res.status(200).json(booksByTitle);  // Send the list of books with the matching title
  } else {
    res.status(404).json({ message: "Books with this title not found" });  // Correct error message for title
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
const review = req.params.review;

const booksByReview = Object.values(books).filter(book => book.title === title);

	 if (booksByReview.length > 0) {
    res.status(200).json(booksByReview);  // Send the list of books with the matching title
  } else {
    res.status(404).json({ message: "Books with this title not found" });  // Correct error message for title
  }
});

module.exports.general = public_users;
