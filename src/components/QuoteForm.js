import React from "react";

const fields = ["person", "searchTerm", "seriesNumber", "episodeNumber"];

export default function QuoteForm({ formData, handleChange }) {
  return (
    <>
      {fields.map((field) => {
        const label = field
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase());

        return (
          <div key={field} className="form-group">
            <label htmlFor={field}>{label}</label>
            <input
              type="text"
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
        );
      })}
    </>
  );
}
