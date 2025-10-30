// src/components/Ministries.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { FaPray, FaUsers, FaVideo, FaHandsHelping } from "react-icons/fa"; // example Lucid icons
import "../styles/ministries.css";

const items = [
  {
    title: "Liturgical Life",
    desc:
      "Learning the structure, meaning, and participation in Kidase (Divine Liturgy) and other services. Includes resources or links for those learning to serve, chant, or assist liturgically.",
    icon: <FaPray size={36} color="#F2BE42" />,
  },
  {
    title: "Youth Ministry",
    desc:
      "Spiritual formation and fellowship for teens and young adults through prayer, discussion, and service.",
    icon: <FaUsers size={36} color="#F2BE42" />,
  },
  {
    title: "Sermons",
    desc:
      "Check our YouTube channel for sermons and teachings. Watch our past sermons and spiritual teachings on our YouTube page.",
    icon: <FaVideo size={36} color="#F2BE42" />,
  },
  {
    title: "Service & Outreach",
    desc:
      "Supporting our community through charitable works, seasonal drives, and helping those in need.",
    icon: <FaHandsHelping size={36} color="#F2BE42" />,
  },
];

export default function Ministries() {
  return (
    <section id="ministries" className="min-wrap">
      <div className="min-container">
        <header className="min-head">
          <h1 className="min-title">Our Ministries</h1>
          <p className="min-sub">
            Discover opportunities to grow in faith, serve others, and build lasting relationships within our church community through our various ministry programs.
          </p>
        </header>

        <div className="min-grid">
          {items.map((it) => (
            <NavLink key={it.title} to={it.to || "#"} className="min-card">
              <div className="min-icon">{it.icon}</div>
              <h3 className="min-card-title">{it.title}</h3>
              <p className="min-card-desc">{it.desc}</p>
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  );
}
