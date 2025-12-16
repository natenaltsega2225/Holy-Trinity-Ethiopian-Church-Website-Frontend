import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/servePage.css";

const opportunities = [
  {
    id: 1,
    title: "Parking Attendant",
    ministry: "Hospitality",
    description:
      "Assist with directing cars, ensuring safety, and welcoming members as they arrive for service.",
    membership: "No",
    frequency: "Weekly",
    ageRequirement: "18+",
  },
  {
    id: 2,
    title: "Sunday School Teacher Assistant",
    ministry: "Worship / Youth",
    description:
      "Support the Sunday School teacher by helping organize lessons, guiding children, and creating a nurturing learning environment.",
    membership: "Yes",
    frequency: "Weekly",
    ageRequirement: "18+",
  },
  {
    id: 3,
    title: "Church Playground Cleanup",
    ministry: "Facilities",
    description:
      "Help maintain a clean and safe environment by cleaning, organizing, and caring for the church playground.",
    membership: "No",
    frequency: "Monthly",
    ageRequirement: "18+",
  },
];

export default function ServePage() {
  const navigate = useNavigate();

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
              <input type="checkbox" /> Hospitality
            </label>
            <label>
              <input type="checkbox" /> Worship / Youth
            </label>
            <label>
              <input type="checkbox" /> Facilities
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
              <h2 className="serve-opportunity-title">
                {opportunity.title}
              </h2>

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
                  <strong>Age Requirement:</strong>{" "}
                  {opportunity.ageRequirement}
                </li>
              </ul>

              <button
                className="apply-btn"
                onClick={() =>
                  navigate("/forms-page", { state: { formType: "volunteer" } })
                }
              >
                Apply To Volunteer
              </button>
            </div>
          ))}
        </section>
      </div>

      <div className="text-center mt-4">
        <Link to="/" className="back-btn">
          ← Back to Home Page
        </Link>
      </div>
    </div>
  );
}
