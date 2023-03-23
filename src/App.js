import React, { useState } from "react";
import data from "./Data/data.json";
import "./App.css";

function renderList(data) {
  return Object.entries(data).map(([key, value]) => {
    const [isExpanded, setIsExpanded] = useState(false);

    let displayValue = null;

    if (typeof value === "object" && value !== null) {
      // Recursively render nested objects
      const button = isExpanded ? (
        <button className="button" onClick={() => setIsExpanded(false)}>
          -
        </button>
      ) : (
        <button className="button" onClick={() => setIsExpanded(true)}>
          +
        </button>
      );

      displayValue = (
        <div className="nested-container">
          {button}
          <ul className={isExpanded ? "nested" : "nested hidden"}>
            {renderList(value)}
          </ul>
        </div>
      );
    } else {
      // Render primitive values as is
      displayValue = value !== null ? value.toString() : "null";
    }

    return (
      <li key={key}>
        <div className="key-value-container">
          <span className="key">{key}:</span>{" "}
          <span className="value">{displayValue}</span>
        </div>
      </li>
    );
  });
}

function App() {
  return (
    <div className="app">
      <div className="app-content">
        <ul className="root">{renderList(data[0])}</ul>
      </div>
    </div>
  );
}

export default App;
