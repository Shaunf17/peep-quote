import React from "react";

export default function QuoteButtonGroup({
  loading,
  onSearch,
  onReset,
  onRandom,
}) {
  return (
    <div
      className="button-group"
      style={{ display: "flex", gap: "1rem", marginTop: "1rem", flexWrap: "wrap" }}
    >
      <button type="submit" disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>

      <button
        type="button"
        onClick={onReset}
        disabled={loading}
        style={{ backgroundColor: "#6b7280" }}
      >
        Reset
      </button>

      <button
        type="button"
        onClick={onRandom}
        disabled={loading}
        style={{ backgroundColor: "#10b981" }}
      >
        🔀 Random
      </button>
    </div>
  );
}
