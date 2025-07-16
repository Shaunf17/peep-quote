import React from "react";

export default function QuoteResult({ results }) {
  if (!results.length) return null;

  return (
    <div className="mt-8 space-y-6">
      {results.map((res, index) => (
        <div
          key={index}
          className="result"
        >
          <p className="quote">"{res.quote}"</p>
          <p className="meta">— {res.person} ({res.episode})</p>
          {res.image && <img src={res.image} alt={res.person} />}
        </div>
      ))}
    </div>
  );
}
