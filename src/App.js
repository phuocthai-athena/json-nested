import React, { useEffect, useRef, useState } from "react";
import data from "./Data/data.json";
import "./App.css";

function renderNumber(value) {
  return <span className="number">{value}</span>;
}

function renderBoolean(value) {
  return <span className="boolean">{value.toString()}</span>;
}

function renderString(value) {
  return <span className="string">"{value}"</span>;
}

function useArrayChecker(value) {
  const [hasArray, setHasArray] = useState(false);

  useEffect(() => {
    if (Array.isArray(value)) {
      setHasArray(true);
    }
  }, [value]);

  return hasArray;
}

function renderList(data) {
  return Object.entries(data).map(([key, value]) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [hasNestedContainer, setHasNestedContainer] = useState(false);
    const hasArray = useArrayChecker(value);

    const keyValueContainerRef = useRef(null);

    useEffect(() => {
      const nestedContainer =
        keyValueContainerRef.current.querySelector(".nested-container");
      if (nestedContainer !== null) {
        setHasNestedContainer(true);
      }
    }, []);

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
      displayValue =
        value !== null
          ? typeof value === "number"
            ? renderNumber(value)
            : typeof value === "boolean"
            ? renderBoolean(value)
            : renderString(value)
          : "null";
    }

    return (
      <li key={key}>
        <div className="key-value-container" ref={keyValueContainerRef}>
          <span className="key">
            {key} :{" "}
            {isExpanded ? (
              <span className={`${hasArray ? "array-l" : "braces-l"}`}>
                {hasArray ? "[" : "{"}
              </span>
            ) : hasNestedContainer ? (
              <>
                <span className={`${hasArray ? "array-l" : "braces-l"}`}>
                  {hasArray ? "[" : "{"}
                </span>
                ...
                <span
                  className={`${
                    hasArray
                      ? `array-r ${hasNestedContainer ? "not-before" : ""}`
                      : `braces-r ${hasNestedContainer ? "not-before" : ""}`
                  }`}
                >
                  {hasArray ? "]" : "}"}
                </span>
              </>
            ) : null}
          </span>{" "}
          <span className="value">{displayValue}</span>
          {isExpanded ? (
            <span className={hasArray ? "array-r" : "braces-r"}></span>
          ) : null}
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
