//src/components/ministries.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/ministries.css";

/**
 * Ministries landing – shows smart, clickable cards that route to each ministry.
 * You can add more items by pushing to the `items` array below.
 */
const items = [
  {
    title: "Holy Bible",
    desc:
      "Read Scripture with chapter navigation and study references. Explore the Word of God in the tradition of the Ethiopian Orthodox Tewahedo Church.",
    to: "/ministries/holy-bible",
    badge: "Scripture",
  },
  {
    title: "Sermons",
    desc:
      "Listen to recent homilies and browse our archive. Grow in faith through the teachings of the Fathers and our clergy.",
    to: "/ministries/sermons",
    badge: "Teachings",
  },
  {
    title: "Deacons Class",
    desc:
      "Training for current and aspiring deacons—liturgy, service order, and spiritual discipline according to our Church rites.",
    to: "/ministries/deacons-class",
    badge: "Service",
  },
  // Uncomment or add more when ready:
  // {
  //   title: "Sunday School",
  //   desc: "Faith-forming lessons for children and youth following the church calendar.",
  //   to: "/ministries/sunday-school-service",
  //   badge: "Youth",
  // },
];

export default function Ministries() {
  return (
    <section className="min-wrap">
      <div className="min-container">
        {/* Page pill heading */}
        <div className="min-pillbar">
          <span className="min-pill">Ministries</span>
        </div>

        <header className="min-head">
          <h1 className="min-title">Serve, Learn, and Grow</h1>
          <p className="min-sub">
            Explore our ministries to deepen your spiritual life, study the Holy Bible,
            hear sermons, and prepare for service in the Ethiopian Orthodox Tewahedo Church.
          </p>
        </header>

        <div className="min-grid">
          {items.map((it) => (
            <NavLink key={it.title} to={it.to} className="min-card">
              <span className="min-badge">{it.badge}</span>
              <h3 className="min-card-title">{it.title}</h3>
              <p className="min-card-desc">{it.desc}</p>
              <span className="min-cta">
                Open <span className="min-arrow">→</span>
              </span>
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  );
}
