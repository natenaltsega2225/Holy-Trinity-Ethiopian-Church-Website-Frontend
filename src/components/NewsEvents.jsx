// src/components/NewsEvents.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/news.css";

export default function NewsEvents() {
  const newsCards = [
    {
      id: 1,
      kicker: "Liturgical Cycle",
      title: "Kids Programs",
      description:
        "Engaging programs designed to strengthen faith and build lasting friendships.",
      link: "/news-events/kids-programs",
      btnType: "outline",
      btnText: "See Kids Programs",
    },
    {
      id: 2,
      kicker: "Liturgical Cycle",
      title: "Holiday Activities",
      description:
        "Learn the meaning of each fast and feast, with scripture references and practical guidance for prayer and participation.",
      link: "/news-events/fasts-feasts",
      btnType: "outline",
      btnText: "See Fasts & Feasts",
    },
    {
      id: 3,
      kicker: "Kids Trips & Outings",
      title: "Trips & Outings",
      description: "Faith-building adventures that create lasting memories.",
      link: "/news-events/events",
      btnType: "outline",
      btnText: "Browse Events",
    },
    {
      id: 4,
      kicker: "Stay Informed",
      title: "Church News",
      description:
        "Stay updated with the latest news and announcements from our church community.",
      link: "/news-events/church-news",
      btnType: "outline",
      btnText: "See Church News",
    },
  ];

  return (
    <section id="news-events" className="nv-wrap">
      <div className="nv-container">
        {/* Page pill heading */}
        <div className="nv-pillbar">
          <h3 className="ht-h3">News &amp; Events</h3>
        </div>

        {/* Cards row */}
        <div className="nv-grid">
          {newsCards.map((card) => (
            <article key={card.id} className="nv-card">
              <div className="nv-card-kicker">{card.kicker}</div>
              <h3 className="nv-card-title">{card.title}</h3>
              <p className="nv-card-text">{card.description}</p>
              <Link
                to={card.link}
                className={`nv-btn nv-btn-${card.btnType}`}
              >
                {card.btnText}
              </Link>
            </article>
          ))}
        </div>

        {/* CTA for full page */}
        <div
          className="nv-fullpage-cta"
          style={{ textAlign: "center", marginTop: "30px" }}
        >
          <Link to="/news-events/details" className="nv-btn nv-btn-primary">
            View Full Events & News
          </Link>
        </div>
      </div>
    </section>
  );
}
