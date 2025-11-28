// src/components/NewsEvents.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/news.css";

export default function NewsEvents() {
  const newsCards = [
    {
      id: 1,
      kicker: "Programs",
      title: "Kids Programs",
      description:
        "Engaging programs designed to strengthen faith and build lasting friendships.",
      link: "/news-events/kids-programs",
      btnType: "outline",
      btnText: "See Kids Programs",
    },
    {
      id: 2,
      kicker: "Seasonal",
      title: "Holiday Activities",
      description:
        "Fun and spiritually uplifting activities held during yearly holidays.",
      link: "/news-events/holiday-activities",
      btnType: "outline",
      btnText: "See Holiday Activities",
    },
    {
      id: 3,
      kicker: "Trips & Outings",
      title: "Trips & Outings",
      description: "Faith-building adventures that create lasting memories.",
      link: "/news-events/trips-outings",
      btnType: "outline",
      btnText: "Browse Trips",
    },
    {
      id: 4,
      kicker: "Church Announcements",
      title: "Announcements",
      description:
        "Stay updated with the latest announcements from our church community.",
      link: "/news-events/church-announcements",
      btnType: "outline",
      btnText: "See Announcements",
    },
  ];

  return (
    <section id="news-events" className="nv-wrap">
      <div className="nv-container">
        <div className="nv-pillbar">
          <h3 className="ht-h3">News &amp; Events</h3>
        </div>

        <div className="nv-grid">
          {newsCards.map((card) => (
            <article key={card.id} className="nv-card">
              <div className="nv-card-kicker">{card.kicker}</div>
              <h3 className="nv-card-title">{card.title}</h3>
              <p className="nv-card-text">{card.description}</p>

              <Link to={card.link} className={`nv-btn nv-btn-${card.btnType}`}>
                {card.btnText}
              </Link>
            </article>
          ))}
        </div>

        <div className="nv-fullpage-cta" style={{ textAlign: "center", marginTop: "30px" }}>
          <Link to="/news-events/details" className="nv-btn nv-btn-primary">
            View Full Events & News
          </Link>
        </div>
      </div>
    </section>
  );
}
