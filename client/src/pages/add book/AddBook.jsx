import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../../component/navbar/navbar';
import '../add book/AddBook.css';


export default function AddBook() {
const [book, setBook] = useState({
title: "",
author: "",
genre: "",
status: "to-read",
description: "",
});

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await fetch("http://localhost:3000/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    navigate("/mybooks");
  } catch (error) {
    console.error("Failed to add book:", error);
  }
};

const handleChange = (e) => {
const { name, value } = e.target;
setBook({ ...book, [name]: value });
};

const navigate = useNavigate();

return (
<div>

<Navbar/>

<div className="add-book-page">

<div className="form-container">

<h2>📖 Add a New Book</h2>

<form onSubmit={handleSubmit}>

<label htmlFor="title">Book Title:</label>
<input 
type="text" 
id="title" 
name="title" 
placeholder="Enter book title" 
value={book.title} 
onChange={handleChange} required />

<label htmlFor="author">Author:</label>
<input
type="text"
id="author"
name="author"
placeholder="Enter author name"
value={book.author}
onChange={handleChange} required />

<label htmlFor="genre">Genre:</label>
<input
type="text"
id="genre"
name="genre"
placeholder="e.g. Fantasy, Romance..."
value={book.genre}
onChange={handleChange} />

<label htmlFor="status">Reading Status:</label>
<select
id="status"
name="status"
value={book.status}
onChange={handleChange} >

<option value="to-read">To Read</option>
<option value="reading">Reading</option>
<option value="finished">Finished</option>
</select>

<label htmlFor="description">Description:</label>
<textarea 
id="description" 
name="description" 
rows="3" 
placeholder="Write a short note about the book..." 
value={book.description} 
onChange={handleChange}> </textarea>

<div className="button-group">

<button type="submit">Add Book</button>

<button 
type="button" 
onClick={() => navigate("/mybooks")} 
className="cancel-btn"> Cancel </button>

</div>
</form>
</div>
</div>
</div>
);
}