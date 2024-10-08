const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
const userExists = users.some(user =>user.username == username);
return !userExits;
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
const validUser = users.find(user => user.username === username && user.password === password);
return validUser !== undefined;
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (authenticatedUser(username, password)) {
    const token = jwt.sign({ username: username }, "20", { expiresIn: '1h' });
    return res.status(200).json({
      message: "Login successful!",
      token: token
    });
  } else {
    return res.status(403).json({ message: "Invalid username or password" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn; // Get the ISBN from the request parameters
  const { username, review } = req.body; // Extract username and review text from the request body

  // Check if both username and review are provided
  if (!username || !review) {
    return res.status(400).json({ message: "Username and review are required." });
  }

  // Find the book by its ISBN
  const book = books[isbn]; // Assuming books is an object with ISBN as keys

  if (!book) {
    return res.status(404).json({ message: "Book not found." }); // Book doesn't exist
  }
 // Add the new review
  book.reviews.push({ username, review }); // Push the new review into the reviews array

  return res.status(200).json({ message: "Review added successfully!", reviews: book.reviews });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
