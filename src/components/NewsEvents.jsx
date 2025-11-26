

// src/components/NewsEvents.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/eventsNewsPage.css";

const MODULES = [
  {
    id: "kids",
    eyebrow: "LITURGICAL CYCLE",
    title: "Kids Programs",
    text: "Engaging programs designed to strengthen faith and build lasting friendships.",
    cta: "See Kids Programs",
  },
  {
    id: "holiday",
    eyebrow: "LITURGICAL CYCLE",
    title: "Holiday Activities",
    text: "Learn the meaning of each fast and feast, with scripture references and practical guidance for participation.",
    cta: "See Fasts & Feasts",
  },
  {
    id: "trip",
    eyebrow: "KIDS TRIPS & OUTINGS",
    title: "Trips & Outings",
    text: "Faith-building adventures and group outings that create lasting memories.",
    cta: "Browse Events",
  },
  {
    id: "news",
    eyebrow: "STAY INFORMED",
    title: "Church News",
    text: "Announcements, updates, and important information from our church community.",
    cta: "See Church News",
  },
];

export default function NewsEvents() {
  const navigate = useNavigate();

  const goToCategory = (id) => {
    navigate(`/news-events/${id}`);
  };

  return (
    <section className="news-hero-wrap" id="news-events">
      <header className="news-hero-header">
        <h1>News &amp; Events</h1>
        <p>
          Explore kids programs, holiday activities, trips, and church news at
          Holy Trinity Ethiopian Orthodox Tewahedo Church.
        </p>
      </header>

      <div className="news-hero-cards">
        {MODULES.map((m) => (
          <button
            key={m.id}
            type="button"
            className="news-hero-card"
            onClick={() => goToCategory(m.id)}
          >
            <div className="news-hero-eyebrow">{m.eyebrow}</div>
            <h2 className="news-hero-title">{m.title}</h2>
            <p className="news-hero-text">{m.text}</p>
            <span className="news-hero-btn">{m.cta}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
