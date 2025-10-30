import React from "react";
import { NavLink } from "react-router-dom";
import { FaUserFriends, FaChild, FaMapMarkedAlt } from "react-icons/fa";
import "../styles/forms.css";

const formItems = [
  {
    title: "Church Membership",
    desc:
      "Join our parish family. Provide your household details so we can stay connected.",
    to: "/forms-payments/church-membership-form",
    icon: <FaUserFriends size={40} color="#F2BE42" />,
  },
  {
    title: "Kids Summer Program",
    desc:
      "Faith, friends, and fun. Register your child for summer classes, crafts, and fellowship.",
    to: "/forms-payments/kids-summer-program",
    icon: <FaChild size={40} color="#F2BE42" />,
  },
  {
    title: "Ark Encounter",
    desc:
      "Reserve your spot for our parish trip. Learn, pray, and fellowship together.",
    to: "/forms-payments/ark-encounter",
    icon: <FaMapMarkedAlt size={40} color="#F2BE42" />,
  },
];

export default function Forms() {
  return (
    <section id="forms" className="forms-section">
      <div className="forms-container">
        <header className="forms-head">
          <h1 className="forms-title">Forms & Registrations</h1>
          <p className="forms-sub">
            Register, sign up, and participate in upcoming church programs and activities.
          </p>
        </header>

        <div className="forms-cards">
          {formItems.map((item) => (
            <NavLink key={item.title} to={item.to} className="forms-card">
              <div className="forms-card-icon">{item.icon}</div>
              <h3 className="forms-card-title">{item.title}</h3>
              <p className="forms-card-desc">{item.desc}</p>
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  );
}
