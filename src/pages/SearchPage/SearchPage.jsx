// src/pages/SearchPage/SearchPage.jsx
import React, { useState, useEffect } from "react";
import FilterSection from "../../components/FilterSection/FilterSection";
import InternshipCard from "../../components/InternshipCard/InternshipCard";
import SearchHeader from "../../components/SearchHeader/SearchHeader";
import { fetchInternships, fetchFilters } from "../../services/api";
import "./SearchPage.css";

const SearchPage = () => {
  const [internships, setInternships] = useState([]);
  const [filteredInternships, setFilteredInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [usingMockData, setUsingMockData] = useState(false);
  const [availableFilters, setAvailableFilters] = useState({
    profiles: [],
    locations: [],
    durations: [],
  });

  const [filters, setFilters] = useState({
    profile: "",
    location: "",
    duration: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setApiError(null);

        // Try to fetch real data first
        try {
          const [filtersData, internshipsData] = await Promise.all([
            fetchFilters(),
            fetchInternships(),
          ]);

          setAvailableFilters(filtersData);
          setInternships(internshipsData);
          setFilteredInternships(internshipsData);
          setUsingMockData(false);
        } catch (error) {
          // If API fails, use mock data
          console.warn("Using mock data due to API error:", error);
          setAvailableFilters({
            profiles: ["Web Development", "Marketing", "Data Science"],
            locations: ["Remote", "Bangalore", "Delhi", "Mumbai"],
            durations: [1, 2, 3, 6],
          });
          setInternships(MOCK_INTERNSHIPS);
          setFilteredInternships(MOCK_INTERNSHIPS);
          setUsingMockData(true);
          setApiError("Couldn't connect to server. Showing sample data.");
        }
      } catch (error) {
        setApiError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const applyFilters = async () => {
      try {
        setLoading(true);
        const filteredData = await fetchInternships(filters);
        setFilteredInternships(filteredData);
      } catch (error) {
        console.error("Filtering error:", error);
      } finally {
        setLoading(false);
      }
    };

    applyFilters();
  }, [filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const clearFilters = () => {
    setFilters({
      profile: "",
      location: "",
      duration: "",
    });
  };

  if (loading && internships.length === 0) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading internships...</p>
      </div>
    );
  }

  return (
    <div className="search-page">
      <SearchHeader />

      {apiError && (
        <div className="api-warning">
          <p>⚠️ Note: {apiError}</p>
          {usingMockData && (
            <p>Some features may be limited with sample data.</p>
          )}
        </div>
      )}

      <div className="search-container">
        <FilterSection
          profiles={availableFilters.profiles}
          locations={availableFilters.locations}
          durations={availableFilters.durations}
          currentFilters={filters}
          onProfileChange={(value) => handleFilterChange("profile", value)}
          onLocationChange={(value) => handleFilterChange("location", value)}
          onDurationChange={(value) => handleFilterChange("duration", value)}
          onClearFilters={clearFilters}
        />

        <div className="internships-list">
          {loading ? (
            <p>Filtering internships...</p>
          ) : filteredInternships.length > 0 ? (
            filteredInternships.map((internship) => (
              <InternshipCard key={internship.id} internship={internship} />
            ))
          ) : (
            <div className="no-results">
              <h4>No internships match your filters</h4>
              <button onClick={clearFilters}>Clear all filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Define MOCK_INTERNSHIPS here if not using the api.js version
const MOCK_INTERNSHIPS = [
  {
    id: 1,
    title: "Frontend Development Intern",
    companyName: "TechSolutions Inc.",
    companyLogo: "https://via.placeholder.com/100/4299E1/FFFFFF?text=TS",
    profile: "Web Development",
    location: "Bangalore",
    startDate: "Immediately",
    duration: 3,
    stipend: "₹15,000/month",
    applyBy: "30 Jun 2023",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    postedOn: "5 days ago",
    applicants: "45 applicants",
    perks: ["Certificate", "Letter of recommendation"],
  },
  // Add more mock internships as needed
];

export default SearchPage;
