import React from "react";

export default function Option({ questions }) {
  return (
    <div className="options">
      {questions.options.map((option) => (
        <button className="btn btn-option " key={option}>
          {option}
        </button>
      ))}
    </div>
  );
}
