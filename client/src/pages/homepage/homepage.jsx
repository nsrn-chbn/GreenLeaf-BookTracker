import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../../component/navbar/navbar';
import "./homepage.css";

const Homepage = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Failed to fetch books:", err));
  }, []);

  const total = books.length;
  const toRead = books.filter(b => b.status === "to-read").length;
  const reading = books.filter(b => b.status === "reading").length;
  const finished = books.filter(b => b.status === "finished").length;

  return (
    <div>
      <Navbar/>
      <main className="landing">
        <section className="landing-hero">
          <h1>Track Your Reading Journey</h1>
          <p>Organize your books, track your progress, and celebrate every page you read.</p>
          <button className="view-books-btn" onClick={() => navigate("/mybooks")}>View All Books</button>
        </section>
        <section className="stats-section">
          <div className="stat-card">
            <h3>Total Books</h3>
            <p className="stat-value">{total}</p>
          </div>
          <div className="stat-card">
            <h3>To Be Read</h3>
            <p className="stat-value">{toRead}</p>
          </div>
          <div className="stat-card">
            <h3>Reading</h3>
            <p className="stat-value">{reading}</p>
          </div>
          <div className="stat-card">
            <h3>Finished</h3>
            <p className="stat-value">{finished}</p>
          </div>
        </section>
        <section className="lower-section">
          <div className="reading-stats">
            <h2>Reading Stats</h2>
            <div className="stat-item">
              <div className="stat-item-header">
                <span>Currently Reading</span>
                <span className="stat-count">{reading} / {total}</span>
              </div>
              <div className="progress-bar">
                <div className="progress" style={{ width: total ? `${(reading/total)*100}%` : "0%" }}></div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-item-header">
                <span>Books Finished</span>
                <span className="stat-count">{finished} / {total}</span>
              </div>
              <div className="progress-bar">
                <div className="progress" style={{ width: total ? `${(finished/total)*100}%` : "0%" }}></div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Homepage;