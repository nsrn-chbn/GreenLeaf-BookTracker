import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '../data/books.json');

const readBooks = () => JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
const writeBooks = (books) => fs.writeFileSync(dbPath, JSON.stringify(books, null, 2));

class BookController {
    async createBook(req, res) {
        try {
            const books = readBooks();
            const newBook = {
                _id: Date.now().toString(),
                ...req.body,
                createdAt: new Date()
            };
            books.push(newBook);
            writeBooks(books);
            res.status(201).json({ message: "Book added successfully", book: newBook });
        } catch (error) {
            res.status(500).json({ error: "Server error", details: error.message });
        }
    }

    async getAllBooks(req, res) {
        try {
            const books = readBooks();
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ error: "Server error", details: error.message });
        }
    }

    async getBookById(req, res) {
        try {
            const books = readBooks();
            const book = books.find(b => b._id === req.params.id);
            if (!book) return res.status(404).json({ error: "Book not found" });
            res.status(200).json(book);
        } catch (error) {
            res.status(500).json({ error: "Server error", details: error.message });
        }
    }

    async updateBook(req, res) {
        try {
            const books = readBooks();
            const index = books.findIndex(b => b._id === req.params.id);
            if (index === -1) return res.status(404).json({ error: "Book not found" });
            books[index] = { ...books[index], ...req.body, updatedAt: new Date() };
            writeBooks(books);
            res.status(200).json({ message: "Book updated successfully", book: books[index] });
        } catch (error) {
            res.status(500).json({ error: "Server error", details: error.message });
        }
    }

    async deleteBook(req, res) {
        try {
            const books = readBooks();
            const filtered = books.filter(b => b._id !== req.params.id);
            writeBooks(filtered);
            res.status(200).json({ message: "Book deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: "Server error", details: error.message });
        }
    }

    async getBooksByStatus(req, res) {
        try {
            const books = readBooks();
            res.status(200).json(books.filter(b => b.status === req.params.status));
        } catch (error) {
            res.status(500).json({ error: "Server error", details: error.message });
        }
    }

    async getBooksByGenre(req, res) {
        try {
            const books = readBooks();
            res.status(200).json(books.filter(b => b.genre === req.params.genre));
        } catch (error) {
            res.status(500).json({ error: "Server error", details: error.message });
        }
    }
}

const bookController = new BookController();
export default bookController;