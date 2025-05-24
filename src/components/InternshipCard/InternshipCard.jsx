// src/components/InternshipCard/InternshipCard.jsx
import React from "react";
import "./InternshipCard.css";

const InternshipCard = ({ internship }) => {
  return (
    <div className="internship-card">
      <div className="company-info">
        <img src={internship.companyLogo} alt={internship.companyName} />
        <div>
          <h3>{internship.title}</h3>
          <p className="company-name">{internship.companyName}</p>
          <p className="location">{internship.location}</p>
        </div>
      </div>

      <div className="internship-details">
        <div className="detail-item">
          <span className="label">Start Date</span>
          <span className="value">{internship.startDate}</span>
        </div>
        <div className="detail-item">
          <span className="label">Duration</span>
          <span className="value">{internship.duration} months</span>
        </div>
        <div className="detail-item">
          <span className="label">Stipend</span>
          <span className="value">{internship.stipend}</span>
        </div>
        <div className="detail-item">
          <span className="label">Posted</span>
          <span className="value">{internship.postedOn}</span>
        </div>
      </div>

      <div className="skills">
        {internship.skills.map((skill, index) => (
          <span key={`skill-${index}`} className="skill-tag">
            {skill}
          </span>
        ))}
      </div>

      <div className="internship-actions">
        <button className="view-details">View Details</button>
        <button className="apply-now">Apply Now</button>
      </div>
    </div>
  );
};

export default InternshipCard;
