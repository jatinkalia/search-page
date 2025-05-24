// src/components/SearchHeader/SearchHeader.jsx
import React, { useState } from "react";
import "./SearchHeader.css";

const SearchHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Search functionality would be implemented here
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="search-header">
      <div className="header-content">
        <h1>Internships</h1>
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search by company, profile, or skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </header>
  );
};

export default SearchHeader;
