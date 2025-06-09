import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const sampleQuotes = [
  // Motivational quotes
  "The best way to get started is to quit talking and begin doing.",
  "Don’t let yesterday take up too much of today.",
  "It’s not whether you get knocked down, it’s whether you get up.",
  "If you are working on something exciting, it will keep you motivated.",
  "Success usually comes to those who are too busy to be looking for it.",
  "Believe you can and you’re halfway there.",
  "Your limitation—it’s only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  
  // Love quotes
  "Love is not about how many days, months, or years you’ve been together. Love is about how much you love each other every single day.",
  "You don’t find love, it finds you. It’s got a little bit to do with destiny, and what’s written in the stars.",
  "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.",
  "To love and be loved is to feel the sun from both sides.",
  "Love is the bridge between two hearts.",
  "Love recognizes no barriers. It jumps hurdles, leaps fences, penetrates walls to arrive at its destination full of hope.",
  "Where there is love there is life.",
  "Love is composed of a single soul inhabiting two bodies.",
  "The best thing to hold onto in life is each other.",
  "You are my sun, my moon, and all my stars."
];

const getRandomQuote = () => {
  const index = Math.floor(Math.random() * sampleQuotes.length);
  return sampleQuotes[index];
};

const App = () => {
  const [quote, setQuote] = useState("");
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedQuote = localStorage.getItem("currentQuote");
    if (savedQuote) {
      setQuote(savedQuote);
    } else {
      const newQuote = getRandomQuote();
      setQuote(newQuote);
      localStorage.setItem("currentQuote", newQuote);
    }
  }, []);

  const generateQuote = () => {
    const newQuote = getRandomQuote();
    setQuote(newQuote);
    localStorage.setItem("currentQuote", newQuote);
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
    <div className={`min-vh-100 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">💬 AI Quote Companion</h2>
          <button className="btn btn-outline-secondary" onClick={toggleTheme}>
            {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <motion.div
          className={`card shadow p-4 mb-5 ${darkMode ? "bg-secondary text-light" : "bg-white"}`}
          style={{ borderRadius: "20px" }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="fs-4 text-center fst-italic">“{quote}”</p>
          <div className="d-flex justify-content-center mt-4 gap-3 flex-wrap">
            <button className="btn btn-primary" onClick={generateQuote}>
              🔁 New Quote
            </button>
            <button className="btn btn-success" onClick={saveToFavorites}>
              💖 Save to Favorites
            </button>
          </div>
        </motion.div>

        <div className={`card shadow-sm p-4 ${darkMode ? "bg-secondary text-light" : "bg-white"}`} style={{ borderRadius: "20px" }}>
          <h5 className="mb-3">📌 Saved Quotes</h5>
          {favorites.length === 0 ? (
            <p className="text-muted">No saved quotes yet.</p>
          ) : (
            <ul className="list-group list-group-flush">
              {favorites.map((q, idx) => (
                <li key={idx} className={`list-group-item ${darkMode ? "bg-secondary text-light border-light" : ""}`}>
                  “{q}”
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
