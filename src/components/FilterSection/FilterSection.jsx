// src/components/FilterSection/FilterSection.jsx
import React from "react";
import "./FilterSection.css";

const FilterSection = ({
  profiles,
  locations,
  durations,
  currentFilters,
  onProfileChange,
  onLocationChange,
  onDurationChange,
  onClearFilters,
}) => {
  return (
    <div className="filter-section">
      <h3>Filters</h3>

      <div className="filter-group">
        <label>Profile</label>
        <select
          value={currentFilters.profile}
          onChange={(e) => onProfileChange(e.target.value)}
        >
          <option value="">All Profiles</option>
          {profiles.map((profile, index) => (
            <option key={`profile-${index}`} value={profile}>
              {profile}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Location</label>
        <select
          value={currentFilters.location}
          onChange={(e) => onLocationChange(e.target.value)}
        >
          <option value="">All Locations</option>
          {locations.map((location, index) => (
            <option key={`location-${index}`} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Duration (months)</label>
        <select
          value={currentFilters.duration}
          onChange={(e) => onDurationChange(e.target.value)}
        >
          <option value="">Any Duration</option>
          {durations.map((duration, index) => (
            <option key={`duration-${index}`} value={duration}>
              {duration}
            </option>
          ))}
        </select>
      </div>

      <button
        className="clear-filters"
        onClick={onClearFilters}
        disabled={
          !currentFilters.profile &&
          !currentFilters.location &&
          !currentFilters.duration
        }
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default FilterSection;
