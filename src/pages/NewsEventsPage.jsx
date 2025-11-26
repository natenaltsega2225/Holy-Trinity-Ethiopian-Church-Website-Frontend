// src/pages/NewsEventsPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/eventsNewsPage.css";

export default function NewsEventsPage() {
  const [activeId, setActiveId] = useState(null);
  const location = useLocation();

  const newsItems = [
    {
      id: "kids-programs",
      category: "Liturgical Cycle",
      title: "Kids Programs",
      description:
        "Engaging programs to strengthen faith and build lasting friendships.",
      details: [
        "Sunday Deacons Class",
        "Bible Study for Children",
        "Weekly Choir Practice",
        "Monthly Outreach Activities",
      ],
    },
    {
      id: "holiday-activities",
      category: "Liturgical Cycle",
      title: "Holiday Activities",
      description:
        "Practical guidance for prayer and participation in fasts and feasts.",
      details: [
        "Fast of the Apostles",
        "Great Lent",
        "Nativity Fast",
        "Feast of Timkat",
        "Good Friday Observances",
      ],
    },
    {
      id: "trips-outings",
      category: "Kids Trips & Outings",
      title: "Trips & Outings",
      description: "Faith-building adventures that create lasting memories.",
      details: [
        "Annual Church Picnic",
        "Educational Museum Trips",
        "Community Service Outings",
        "Youth Camping Retreats",
      ],
    },
    {
      id: "church-news",
      category: "Stay Informed",
      title: "Church News",
      description:
        "Latest news and announcements from our church community.",
      details: [
        "Upcoming Sermons Schedule",
        "Volunteer Opportunities",
        "New Initiatives & Programs",
        "Community Announcements",
      ],
    },
  ];

  useEffect(() => {
    const path = location.pathname.split("/news-events/")[1];
    if (path) {
      const el = document.getElementById(`${path}-form`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location]);

  const toggleDetails = (id) => setActiveId(activeId === id ? null : id);

  return (
    <div className="news-page-container">
      {/* --- Hero Section --- */}
      <header className="news-page-header">
        <section className="news-hero">
          <div className="news-hero-content">
            <h2 className="news-hero-title">Stay Updated with Our Community</h2>
            <p className="news-hero-text">
              Discover <span className="highlight">latest happenings</span>, explore the{" "}
              <span className="highlight">liturgical calendar</span>, and join{" "}
              <span className="highlight">church events</span> that bring us together.
            </p>
          </div>
        </section>
      </header>

      {/* --- Calendar Section --- */}
      <section className="news-calendar-section">
        <div className="nv-cal">
          <div className="nv-cal-head">
            <span className="nv-cal-title">November 2025</span>
            <div>
              <button className="nv-cal-nav">&#8592;</button>
              <button className="nv-cal-nav">&#8594;</button>
            </div>
          </div>
          <div className="nv-cal-grid">
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
              <div key={d} className="nv-cal-dow">{d}</div>
            ))}
            {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
              <div key={day} className={`nv-cal-cell ${day === new Date().getDate() ? "nv-cal-today" : ""}`}>
                {day}
              </div>
            ))}
          </div>
          <div className="nv-cal-legend">
            <span className="dot today"></span> Today
          </div>
        </div>
      </section>

      {/* --- News/Event Cards --- */}
      <section className="news-cards-horizontal">
        {newsItems.map((item) => (
          <div
            key={item.id}
            className="news-card-horizontal"
            onClick={() => {
              const el = document.getElementById(`${item.id}-form`);
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            <div className="news-card-main">
              <h4 className="news-card-category">{item.category}</h4>
              <h3 className="news-card-title">{item.title}</h3>
              <p className="news-card-description">{item.description}</p>
              <button
                className="news-card-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDetails(item.id);
                }}
              >
                {activeId === item.id ? "Hide Details" : "View Details"}
              </button>
            </div>
            {activeId === item.id && (
              <div className="news-card-details">
                <ul>
                  {item.details.map((d, idx) => (
                    <li key={idx}>{d}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* --- Forms Section (Horizontal Scroll) --- */}
      <section className="forms-section">
        <div className="forms-scroll-container">
          {newsItems.map((item) => (
            <div key={item.id} id={`${item.id}-form`} className="forms-card">
              <h2 className="forms-title">{item.title} Registration Form</h2>
              <p className="forms-sub">
                Please fill out the form below to register for {item.title}.
              </p>
              <form>
                <label>Parent First Name</label>
                <input type="text" required />
                <label>Parent Last Name</label>
                <input type="text" required />
                <label>Phone</label>
                <input type="tel" required />
                <label>Email</label>
                <input type="email" required />
                <label>Number of Children</label>
                <select>
                  <option>Please select</option>
                  {[1,2,3,4].map(n => <option key={n}>{n}</option>)}
                </select>

                <h4>First Child</h4>
                <label>First Name</label>
                <input type="text" required />
                <label>Last Name</label>
                <input type="text" required />
                <label>Date of Birth</label>
                <input type="date" required />
                <label>Grade</label>
                <select>
                  <option>Please select</option>
                  {["Pre-K","K","1","2","3","4","5"].map(g => <option key={g}>{g}</option>)}
                </select>

                <label>Payment Method Choice</label>
                <select>
                  <option>Online</option>
                  <option>In Person (Cash)</option>
                </select>

                <label>
                  <input type="checkbox" required /> I agree to Terms of Service
                </label>
                <label>
                  <input type="checkbox" required /> I consent to data storage (GDPR)
                </label>

                <button type="submit" className="news-card-btn">SEND</button>
                <button
                  type="button"
                  className="news-card-btn"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  style={{ marginTop: "10px", background: "#555" }}
                >
                  Back to Top
                </button>
              </form>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
