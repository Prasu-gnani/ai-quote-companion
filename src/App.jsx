import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./App.css";

const sampleQuotes = [
  "The best way to get started is to quit talking and begin doing.",
  "Don’t let yesterday take up too much of today.",
  "It’s not whether you get knocked down, it’s whether you get up.",
  "If you are working on something exciting, it will keep you motivated."
];

const getRandomQuote = () => {
  const index = Math.floor(Math.random() * sampleQuotes.length);
  return sampleQuotes[index];
};

function App() {
  const [quote, setQuote] = useState("");
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setQuote(getRandomQuote());
  }, []);

  const generateQuote = () => {
    setQuote(getRandomQuote());
  };

  const saveToFavorites = () => {
    if (!favorites.includes(quote)) {
      const updated = [...favorites, quote];
      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));
    }
  };

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={`container ${darkMode ? "dark" : "light"}`}>
  <button className="theme-toggle btn btn-outline-secondary" onClick={toggleTheme}>
    {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
  </button>

  <motion.div
    className="quote-card"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <p className="quote">"{quote}"</p>
    <div className="buttons">
      <button className="btn btn-primary me-2" onClick={generateQuote}>🔁 New Quote</button>
      <button className="btn btn-success" onClick={saveToFavorites}>💖 Save</button>
    </div>
  </motion.div>

  <div className="favorites">
    <h3>Saved Quotes</h3>
    <ul>
      {favorites.map((q, idx) => (
        <li key={idx}>“{q}”</li>
      ))}
    </ul>
  </div>
</div>

  );
}

export default App;
