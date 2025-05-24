import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage/SearchPage";
import "./styles.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/internships" element={<SearchPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
