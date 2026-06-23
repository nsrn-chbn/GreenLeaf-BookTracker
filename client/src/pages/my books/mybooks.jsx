import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../../component/navbar/navbar';
import './mybooks.css'

function MyBooks() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Failed to fetch books:", err));
  }, []);

  function deleteBook(id) {
    fetch(`http://localhost:3000/api/books/${id}`, { method: "DELETE" })
      .then(() => setBooks(books.filter((book) => book._id !== id)));
  }

  return (
    <div>
      <Navbar/>
      <div className="my-books-page">
        <header className="books-header">
          <h1>📚 My Book Library 🌱</h1>
        </header>
        <main className="books-list">
          {books.map((book) => (
            <div key={book._id} className="book-card">
              <div className="book-info">
                <h2>{book.title}</h2>
                <p>{book.author}</p>
                <span>{book.status}</span>
              </div>
              <div className="book-actions">
                <button onClick={() => deleteBook(book._id)}>Delete</button>
              </div>
            </div>
          ))}
          <div className="add-book-container">
            <button className="primary-btn" onClick={() => navigate("/addbook")}>Add Book</button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default MyBooks;