const express = require('express');
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

// MongoDB connection
mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://alessandra:andiANDI22@cluster0.2ezld.mongodb.net/BOOKSTORE_API?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
      console.log('Node API app is running on port 3000');
    });
  }).catch((error) => {
    console.log(error);
  });

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  publishedYear: Number,
  isbn: String,
  price: Number  
});

const Book = mongoose.model('Book', bookSchema);

// GET a list of books
app.get('/api/books', async (req, res) => {
    try {
    const books = await Book.find({});
    res.status(200).json(books);
    } catch (error) {
    res.status(500).json({message: error.message})
    }
    })

// POST a new book entry
app.post('/api/books', async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishedYear: req.body.publishedYear,
    isbn: req.body.isbn,
    price: req.body.price  // Getting the price from the request body
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT to update book details
app.put('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Updating book details, including price
    if (req.body.title != null) {
      book.title = req.body.title;
    }
    if (req.body.author != null) {
      book.author = req.body.author;
    }
    if (req.body.publishedYear != null) {
      book.publishedYear = req.body.publishedYear;
    }
    if (req.body.isbn != null) {
      book.isbn = req.body.isbn;
    }
    if (req.body.price != null) {
      book.price = req.body.price;
    }

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/books/:id', async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (book == null) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      await Book.deleteOne({ _id: req.params.id });
      res.json({ message: 'Book deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
// Root route
app.get('/', (req, res) => { 
  res.send('Hello node API ');
});

// API route
app.get('/API', (req, res) => { 
  res.send('this is our api ');
  
});