const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios'); // Ensure you have Axios installed

public_users.post("/register", (req, res) => {
    const { username, password } = req.body; // Destructure username and password from request body

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    // Check if the username already exists
    if (!isValid(username)) {
        return res.status(400).json({ message: "Username already exists." });
    }

    // Add the new user to the users array
    users.push({ username, password }); // Store user credentials (ensure you hash the password in a real app)
    
    // Respond with a success message
    return res.status(201).json({ message: "Successfully registered." });
});


// Get the book list available in the shop
public_users.get('/', async (req, res) => {
    try {
        const response = await axios.get(API_URL); 
        res.status(200).json(response.data); 
    } catch (error) {
        console.error('Error fetching books:', error); 
        res.status(500).json({ message: "Error fetching books." }); 
    }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
    const isbn = req.params.isbn; // Get ISBN from request parameters
    
    try {
        const response = await axios.get(`${API_URL}/${isbn}`); 
        const book = response.data; 
        
        if (book) {
            res.status(200).json(book); 
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        console.error('Error fetching book details:', error); 
        res.status(500).json({ message: "Error fetching book details." }); 
    }
});
  
// Get book details based on author
public_users.get('/author/:author', async (req, res) => {
    const author = req.params.author; 

    try {

        const response = await axios.get(`${API_URL}?author=${encodeURIComponent(author)}`); 
        const booksByAuthor = response.data; 
        
        if (booksByAuthor.length > 0) {
            res.status(200).json(booksByAuthor); 
        } else {
            res.status(404).json({ message: "Books by this author not found" }); 
        }
    } catch (error) {
        console.error('Error fetching books by author:', error); 
        res.status(500).json({ message: "Error fetching books by author." }); 
    }
});

// Get all books based on title
public_users.get('/title/:title', async (req, res) => {
    const title = req.params.title; 

    try {
      
        const response = await axios.get(API_URL);
        const books = response.data; 

        const booksByTitle = books.filter(book => book.title === title);

        if (booksByTitle.length > 0) {
            res.status(200).json(booksByTitle); 
        } else {
            res.status(404).json({ message: "Books with this title not found" }); 
        }
    } catch (error) {
        console.error('Error fetching books by title:', error); 
        res.status(500).json({ message: "Error fetching books." }); 
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
