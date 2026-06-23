import express from 'express';
import bookController from '../controllers/bookController.js';

const router = express.Router();

// Create a new book
router.post("/", bookController.createBook);

// Get all books
router.get("/", bookController.getAllBooks);

// Get books by reading status
router.get("/status/:status", bookController.getBooksByStatus);

// Get books by genre
router.get("/genre/:genre", bookController.getBooksByGenre);

// Get a single book by ID
router.get("/:id", bookController.getBookById);

// Update a book
router.put("/:id", bookController.updateBook);

// Delete a book
router.delete("/:id", bookController.deleteBook);

export default router;