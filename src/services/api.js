// src/services/api.js
const API_BASE_URL =
  "https://cors-anywhere.herokuapp.com/https://internshala.com";
const USE_MOCK_DATA = false; // Set to true if you want to force mock data

// Define mock data directly in the file instead of importing
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
  {
    id: 2,
    title: "Backend Developer Intern",
    companyName: "DataSystems Ltd.",
    companyLogo: "https://via.placeholder.com/100/3182CE/FFFFFF?text=DS",
    profile: "Web Development",
    location: "Remote",
    startDate: "1 Jul 2023",
    duration: 6,
    stipend: "₹20,000/month",
    applyBy: "25 Jun 2023",
    skills: ["Node.js", "Python", "MongoDB", "Express"],
    postedOn: "1 week ago",
    applicants: "32 applicants",
    perks: ["Certificate", "Job offer", "Mentorship"],
  },
  {
    id: 3,
    title: "Digital Marketing Intern",
    companyName: "GrowthHackers Marketing",
    companyLogo: "https://via.placeholder.com/100/2B6CB0/FFFFFF?text=GH",
    profile: "Marketing",
    location: "Delhi",
    startDate: "15 Jun 2023",
    duration: 2,
    stipend: "₹10,000/month",
    applyBy: "10 Jun 2023",
    skills: ["SEO", "Social Media", "Content Writing", "Google Analytics"],
    postedOn: "3 days ago",
    applicants: "28 applicants",
    perks: ["Certificate", "Flexible work hours"],
  },
];

const MOCK_FILTERS = {
  profiles: ["Web Development", "Marketing", "Data Science"],
  locations: ["Remote", "Bangalore", "Delhi", "Mumbai"],
  durations: [1, 2, 3, 6],
};

export const fetchInternships = async (params = {}) => {
  if (USE_MOCK_DATA) return getMockInternships(params);

  try {
    const queryParams = new URLSearchParams(params);
    const response = await fetch(
      `https://internshala.com/hiring/search?${queryParams}`,
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    return transformInternshipData(data.internships || []);
  } catch (error) {
    console.error("API failed, using mock data:", error);
    return getMockInternships(params);
  }
};

export const fetchFilters = async () => {
  if (USE_MOCK_DATA) return MOCK_FILTERS;

  try {
    const response = await fetch(`https://internshala.com/hiring/filters`, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Accept: "application/json",
      },
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    return {
      profiles: data.profiles || [],
      locations: data.locations || [],
      durations: data.durations || [],
    };
  } catch (error) {
    console.error("API failed, using mock filters:", error);
    return MOCK_FILTERS;
  }
};

// Helper functions
const transformInternshipData = (internships) => {
  return internships.map((item) => ({
    id: item.id || Math.random().toString(36).substr(2, 9),
    title: item.title || "Internship Position",
    companyName: item.company_name || "Company",
    companyLogo:
      item.company_logo_url || "https://via.placeholder.com/100?text=Co",
    profile: item.profile || "General",
    location: item.location || "Remote",
    startDate: item.start_date || "Flexible",
    duration: item.duration_months || 0,
    stipend: item.stipend_amount ? `₹${item.stipend_amount}/month` : "Unpaid",
    applyBy: item.apply_by || "Soon",
    skills: item.skills_required || [],
    postedOn: item.posted_on || "Recently",
    applicants: item.applicants_count
      ? `${item.applicants_count} applicants`
      : "Be first",
    perks: item.perks || [],
  }));
};

const getMockInternships = (params) => {
  return MOCK_INTERNSHIPS.filter((item) => {
    return (
      (!params.profile || item.profile.includes(params.profile)) &&
      (!params.location || item.location.includes(params.location)) &&
      (!params.duration || item.duration == params.duration)
    );
  });
};
