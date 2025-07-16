import React, { useState } from "react";
import QuoteForm from "./components/QuoteForm";
import QuoteButtonGroup from "./components/QuoteButtonGroup";
import QuoteResult from "./components/QuoteResult";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    person: "",
    searchTerm: "",
    seriesNumber: "",
    episodeNumber: "",
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const response = await fetch("https://api.peepquote.com/Search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          person: formData.person,
          searchTerm: formData.searchTerm,
          seriesNumber: formData.seriesNumber
            ? parseInt(formData.seriesNumber)
            : null,
          episodeNumber: formData.episodeNumber
            ? parseInt(formData.episodeNumber)
            : null,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      setResults(data.results || []);
    } catch {
      setError("Failed to fetch quotes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      person: "",
      searchTerm: "",
      seriesNumber: "",
      episodeNumber: "",
    });
    setResults([]);
    setError("");
  };

  const handleRandom = async () => {
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const response = await fetch("https://api.peepquote.com/Search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      if (!response.ok) throw new Error("Fetch failed");

      const data = await response.json();
      if (data.results.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.results.length);
        setResults([data.results[randomIndex]]);
      } else {
        setError("No quotes found.");
      }
    } catch {
      setError("Failed to fetch quotes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "2rem",
          justifyContent: "center"
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/en/d/d9/Peep_Show_logo.jpg?20101228110157"
          alt="Peep Show Logo"
          style={{ width: "80px", height: "auto" }}
        />
        <h1
          style={{
            fontFamily: "'Bungee', sans-serif",
            fontSize: "2.5rem",
            letterSpacing: "2px",
            color: "#6ab674ff",
            textShadow: "2px 2px 0 #000",
            margin: 0
          }}
        >
          PEEP QUOTE
        </h1>
      </div>

      <form
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <QuoteForm formData={formData} handleChange={handleChange} />
        <QuoteButtonGroup
          loading={loading}
          onSearch={handleSearch}
          onReset={handleReset}
          onRandom={handleRandom}
        />
        {error && <p className="error">{error}</p>}
      </form>

      <QuoteResult results={results} />
    </div>
  );
}

export default App;
