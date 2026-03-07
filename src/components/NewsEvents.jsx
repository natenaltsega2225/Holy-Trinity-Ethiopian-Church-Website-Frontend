// src/components/NewsEvents.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/newsEventsPublic.css";

export default function NewsEvents() {
  const nav = useNavigate();

  const cards = [
    {
      key: "kids",
      kicker: "KIDS & YOUTH",
      title: "Kids Programs",
      desc: "Programs for children and youth.",
      icon: "🧒",
    },
    {
      key: "holiday",
      kicker: "LITURGICAL CYCLE",
      title: "Holiday Activities",
      desc: "Feasts, fasts, and special celebrations.",
      icon: "⛪",
    },
    {
      key: "trip",
      kicker: "TRIPS & RETREATS",
      title: "Trips & Outings",
      desc: "Retreats, picnics, and group outings.",
      icon: "🚌",
    },
    {
      key: "news",
      kicker: "CHURCH NEWS",
      title: "Church News",
      desc: "Announcements and updates.",
      icon: "📰",
    },
  ];

  return (
    <div className="nePage">
      <div className="neWrap">
        <div className="neHero">
          <div className="neBadge">News &amp; Events</div>
          <h1 className="neHeroTitle">Stay connected with our community</h1>
          <p className="neHeroSub">
            Explore kids programs, holiday activities, trips, and church news at Holy Trinity Ethiopian Orthodox
            Tewahedo Church.
          </p>
        </div>

        <div className="neCatGrid">
          {cards.map((c) => (
            <div key={c.key} className="neCatCard" onClick={() => nav(`/news-events/${c.key}`)}>
              <div className="neCatTop">
                <div>
                  <div className="neCatKicker">{c.kicker}</div>
                  <div className="neCatTitle">{c.title}</div>
                </div>
                <div className="neCatIcon">{c.icon}</div>
              </div>
              <p className="neCatDesc">{c.desc}</p>
              <div className="neCatAction">
                Explore <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}