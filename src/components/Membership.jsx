//src/components/Membership.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/membership.css";

const items = [
  {
    title: "Church Membership ",
    desc:
      "Join our parish family. Provide your household details so we can keep you connected to services, sacraments, and community care.",
    to: "/forms-payments/church-membership-form",
    badge: "Membership",
  },
  {
    title: "Kids Summer Program",
    desc:
      "Faith, friends, and fun. Register your child for summer classes, crafts, hymns, and fellowship rooted in the Orthodox tradition.",
    to: "/forms-payments/kids-summer-program",
    badge: "Children",
  },
  {
    title: "Ark Encounter",
    desc:
      "Reserve your spot for our parish trip. Travel together to the Ark Encounter for a day of learning, prayer, and fellowship.",
    to: "/forms-payments/ark-encounter",
    badge: "Trip",
  },
  {
    title: "Donation",
    desc:
      "Support the work of the Church—liturgical needs, education, benevolence, and outreach. Your gift strengthens our community.",
    to: "/forms-payments/donation",
    badge: "Giving",
  },
];

export default function Membership() {
  return (
    <section className="mbr-wrap">
      <div className="mbr-container">
        {/* Pill heading */}
        <div className="mbr-pillbar">
          <span className="mbr-pill">Forms &amp; Payments</span>
        </div>

        <header className="mbr-head">
          <h1 className="mbr-title">Participate & Support</h1>
          <p className="mbr-sub">
            Use the forms below to register, plan, and contribute. Thank you for
            serving and sustaining our Ethiopian Orthodox Tewahedo Church.
          </p>
        </header>

        <div className="mbr-grid">
          {items.map((it) => (
            <NavLink key={it.title} to={it.to} className="mbr-card">
              <span className="mbr-badge" />
              <h3 className="mbr-card-title">{it.title}</h3>
              <p className="mbr-card-desc">{it.desc}</p>
              <span className="mbr-cta">
                Open <span className="mbr-arrow">→</span>
              </span>
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  );
}
