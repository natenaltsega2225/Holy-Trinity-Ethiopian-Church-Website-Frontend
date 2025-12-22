//src/pages/ServePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/servePage.css";

const opportunities = [
  {
    id: 1,
    title: "Sunday School",
    ministry: "Worship",
    description:
      "Faith-forming classes for children and youth centered on the Holy Scriptures, the Synaxarium, and the life of the Church.",
    membership: "Yes",
    frequency: "Weekly",
    ageRequirement: "18+",
  },
  {
    id: 2,
    title: "Curriculum",
    ministry: "Worship",
    description:
      "Developing age-appropriate lessons based on the Ethiopian Orthodox Tewahedo calendar.",
    membership: "Yes",
    frequency: "Monthly",
    ageRequirement: "16+",
  },
  {
    id: 3,
    title: "Connections Team",
    ministry: "Connections",
    description: "Welcome visitors and help new members feel at home.",
    membership: "No",
    frequency: "Monthly",
    ageRequirement: "16+",
  },
  {
    id: 4,
    title: "Hospitality Team",
    ministry: "Connections",
    description: "Serve coffee, greet members, and create a welcoming environment on Sundays.",
    membership: "No",
    frequency: "Weekly",
    ageRequirement: "16+",
  },
  {
    id: 5,
    title: "Choir",
    ministry: "Worship",
    description: "Lift up your voice in praise and help lead the congregation in worship.",
    membership: "Yes",
    frequency: "Weekly",
    ageRequirement: "18+",
  },
];

export default function ServePage() {
  return (
    <div className="serve-page-container">
      <header className="page-header">
        <h1>Serving with Purpose</h1>
        <p>
          By serving the church, you are directly participating in the work
          the Lord has given to Holy Trinity Ethiopian Orthodox Tewahedo Church
          through our mission and vision.
        </p>
      </header>

      <div className="serve-layout">
        {/* Sidebar Filter Pane */}
        <aside className="filter-pane">
          <h3>Filter Opportunities</h3>

          <div className="filter-group">
            <h4>Ministry</h4>
            <label>
              <input type="checkbox" /> Worship
            </label>
            <label>
              <input type="checkbox" /> Connections
            </label>
          </div>

          <div className="filter-group">
            <h4>Membership Required</h4>
            <label>
              <input type="checkbox" /> Yes
            </label>
            <label>
              <input type="checkbox" /> No
            </label>
          </div>

          <div className="filter-group">
            <h4>Frequency</h4>
            <label>
              <input type="checkbox" /> Weekly
            </label>
            <label>
              <input type="checkbox" /> Monthly
            </label>
          </div>

          <button className="apply-filter-btn">Apply Filters</button>
        </aside>

        {/* Opportunities List */}
        <section className="serve-list-section">
          {opportunities.map((opportunity) => (
            <div key={opportunity.id} className="serve-card">
              <h2 className="serve-opportunity-title">{opportunity.title}</h2>
              <p className="serve-opportunity-description">
                {opportunity.description}
              </p>

              <ul className="serve-opportunity-details">
                <li>
                  <strong>Ministry:</strong> {opportunity.ministry}
                </li>
                <li>
                  <strong>Membership:</strong> {opportunity.membership}
                </li>
                <li>
                  <strong>Frequency:</strong> {opportunity.frequency}
                </li>
                <li>
                  <strong>Age Requirement:</strong> {opportunity.ageRequirement}
                </li>
              </ul>

              <button className="apply-btn">Apply To Volunteer</button>
            </div>
          ))}
        </section>
      </div>

      <div className="text-center mt-4">
        <Link to="/serve" className="back-btn">
          ← Back to Home Page
        </Link>
      </div>
    </div>
  );
}
