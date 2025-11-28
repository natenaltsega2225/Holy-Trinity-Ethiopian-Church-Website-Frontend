import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/eventsNewsPage.css"; // Keep your CSS

export default function NewsEventsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeId, setActiveId] = useState(null);

  const latestAnnouncement =
    "Church announcements will appear here once connected to the backend API.";

  const newsItems = [
    {
      id: "kids-summer-camps",
      category: "Programs",
      title: "Kids Summer Camps",
      description: "Faith-centered fun activities during summer break.",
      details: ["Weekly themed camps", "Bible lessons", "Arts & crafts", "Outdoor play"],
    },
    {
      id: "holiday-activities",
      category: "Seasonal",
      title: "Holiday Activities",
      description: "Special events during major church feasts and celebrations.",
      details: ["Nativity celebration", "Easter activities", "Community volunteer day"],
    },
    {
      id: "trip-outings",
      category: "Trips & Outings",
      title: "Trip Outings",
      description: "Fun trips and outings for kids and youth groups.",
      details: ["Annual picnic", "Museum learning trips", "Nature hikes"],
      currentTrip: {
        id: "current",
        name: "Ark Encounter",
      },
    },
    {
      id: "church-announcements",
      category: "Stay Informed",
      title: "Church Announcements",
      description: latestAnnouncement,
      details: [],
    },
  ];

  const toggleDetails = (id) => setActiveId(activeId === id ? null : id);

  useEffect(() => {
    const path = location.pathname.split("/news-events/")[1];
    if (path) {
      const el = document.getElementById("registration-form");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location]);

  return (
    <div className="news-page-container">
      {/* Hero Section */}
      <header className="news-page-header">
        <section className="news-hero">
          <div className="news-hero-content">
            <h2 className="news-hero-title">Stay Updated with Our Community</h2>
            <p className="news-hero-text">
              Discover the <span className="highlight">latest happenings</span>,
              explore <span className="highlight">upcoming events</span>, and stay
              connected with our church family.
            </p>
          </div>
        </section>
      </header>

      {/* News/Event Cards */}
      <section className="news-cards-vertical">
        {newsItems.map((item) => (
          <div key={item.id} className="news-card">
            <h4 className="news-card-category">{item.category}</h4>
            <h3 className="news-card-title">{item.title}</h3>
            <p className="news-card-description">{item.description}</p>

            {item.details.length > 0 && (
              <>
                <button
                  className="news-card-btn"
                  onClick={() => toggleDetails(item.id)}
                >
                  {activeId === item.id ? "Hide Details" : "View Details"}
                </button>
                {activeId === item.id && (
                  <div className="news-card-details">
                    <ul>
                      {item.details.map((d, idx) => (
                        <li key={idx}>{d}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            {item.currentTrip && (
              <button
                className="news-card-btn"
                style={{ marginTop: "10px" }}
                onClick={() => navigate(`/trip/${item.currentTrip.id}`)}
              >
                View Trip Info: {item.currentTrip.name}
              </button>
            )}
          </div>
        ))}
      </section>

      {/* Unified Registration Form */}
      <section id="registration-form" className="form-section">
        <div className="form-wrapper">
          <h2 className="form-title">Event Registration Form</h2>
          <p className="form-sub">Please complete the form below to register.</p>

          <form>
            <label>Event Type</label>
            <select required>
              <option value="">Please select</option>
              <option>Trip Outings</option>
              <option>Holiday Activities</option>
              <option>Kids Summer Camps</option>
            </select>

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
              <option value="">Please select</option>
              {[1, 2, 3, 4].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>

            <h4>Child Information</h4>
            <label>First Name</label>
            <input type="text" required />
            <label>Last Name</label>
            <input type="text" required />
            <label>Age Group</label>
            <select required>
              <option value="">Select age group</option>
              <option>5–10</option>
              <option>11–14</option>
              <option>15–17</option>
            </select>

            <label>Payment Method</label>
            <select>
              <option>Online</option>
              <option>In Person (Cash)</option>
            </select>

            <label className="checkbox-line">
              <input type="checkbox" required /> I agree to the Terms of Service
            </label>
            <label className="checkbox-line">
              <input type="checkbox" required /> I consent to data storage (GDPR)
            </label>

            <button type="submit" className="news-card-btn submit-btn">
              SEND
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
