const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const auth = require('../middleware/auth');

// Get all books for logged-in user (with filters)
router.get('/', auth, async (req, res) => {
  try {
    const { status, tag } = req.query;
    const filter = { user: req.user.id };

    if (status) {
      filter.status = status;
    }

    if (tag) {
      filter.tags = { $in: [tag] };
    }

    const books = await Book.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Add a new book
router.post('/', auth, async (req, res) => {
  try {
    const { title, author, tags, status } = req.body;

    if (!title || !author) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title and author',
      });
    }

    const book = new Book({
      title,
      author,
      tags: tags || [],
      status: status || 'Want to Read',
      user: req.user.id,
    });

    await book.save();
    res.status(201).json({ success: true, book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Update a book
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, author, tags, status } = req.body;

    let book = await Book.findOne({ _id: req.params.id, user: req.user.id });

    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    book.title = title || book.title;
    book.author = author || book.author;
    book.tags = tags !== undefined ? tags : book.tags;
    book.status = status || book.status;

    await book.save();
    res.json({ success: true, book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// Delete a book
router.delete('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, user: req.user.id });

    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    await book.deleteOne();
    res.json({ success: true, message: 'Book deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;