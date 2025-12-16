import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/eventsNewsPage.css";

export default function NewsEventsPage() {
  const navigate = useNavigate();

  return (
    <section className="news-events-container">
      {/* Intro Banner */}
      <div className="news-intro-banner">
        <h1 className="news-intro-title">Stay Updated with Our Community</h1>
        <p className="news-intro-text">
          Discover the latest happenings, explore upcoming events, and stay connected with our church family.
        </p>
      </div>

      {/* Curriculum Header */}
      <header className="news-events-header">
        <h2 className="main-heading">Kids & Youth Education Curriculum – Fall 2025</h2>
        <p>Explore our classes, trips, and announcements below.</p>
      </header>

      {/* Education Programs */}
      <div className="section">
        <h2 className="section-title">Education Programs</h2>
        <div className="ne-card-row">
          <article className="ne-card">
            <h3 className="ne-card-title">Genesis Bible Study (Elementary)</h3>
            <p className="ne-card-desc">Exploration of Creation, Adam & Eve, Noah, Abraham...</p>
            <button
              className="ne-card-btn"
              onClick={() => navigate("/forms-page", { state: { formType: "kidsProgram" } })}
            >
              Register Now
            </button>
          </article>

          <article className="ne-card">
            <h3 className="ne-card-title">Book of Ruth (Middle/High School)</h3>
            <p className="ne-card-desc">Learn about loyalty, faithfulness, virtue, and God’s providence...</p>
            <button
              className="ne-card-btn"
              onClick={() => navigate("/forms-page", { state: { formType: "kidsProgram" } })}
            >
              Register Now
            </button>
          </article>

          <article className="ne-card">
            <h3 className="ne-card-title">Book of Tobit (Middle/High School)</h3>
            <p className="ne-card-desc">Family, purity, prayer, angelic guidance, and God’s protection...</p>
            <button
              className="ne-card-btn"
              onClick={() => navigate("/forms-page", { state: { formType: "kidsProgram" } })}
            >
              Register Now
            </button>
          </article>
        </div>
      </div>

      {/* Trips & Outings */}
      <div className="section">
        <h2 className="section-title">Trips & Outings</h2>
        <div className="ne-card-row">
          <article className="ne-card">
            <h3 className="ne-card-title">Ark Encounter Trip</h3>
            <p className="ne-card-desc">Join us for a faith-filled journey to the Ark Encounter.</p>
            <div className="card-actions">
              <button
                className="ne-card-btn"
                onClick={() => navigate("/trip/current")}
              >
                Check Trip Info
              </button>
              <button
                className="ne-card-btn"
                onClick={() => navigate("/forms-page", { state: { formType: "youthTrip" } })}
              >
                Register for Trip
              </button>
            </div>
          </article>

          <article className="ne-card">
            <h3 className="ne-card-title">Annual Picnic</h3>
            <p className="ne-card-desc">A joyful community gathering with food, games, and fellowship.</p>
            <button
              className="ne-card-btn"
              onClick={() => navigate("/forms-page", { state: { formType: "youthTrip" } })}
            >
              Register for Trip
            </button>
          </article>
        </div>
      </div>

      {/* Announcements */}
      <div className="section">
        <h2 className="section-title">Announcements</h2>
        <div className="ne-card-row">
          <article className="ne-card">
            <h3 className="ne-card-title">Seasonal Programs</h3>
            <p className="ne-card-desc">Stay tuned for upcoming events and parish updates.</p>
            <button
              className="ne-card-btn"
              onClick={() => navigate("/home", { state: { formType: "membership" } })}
            >
              Learn More
            </button>
          </article>
        </div>
      </div>
    </section>
  );
}
