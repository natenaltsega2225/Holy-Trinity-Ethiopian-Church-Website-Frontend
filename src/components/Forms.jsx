import React from "react";
import { NavLink } from "react-router-dom";
import { FaUserFriends, FaChild, FaMapMarkedAlt, FaCross, FaPrayingHands } from "react-icons/fa";
import "../styles/forms.css";

const formItems = [
  {
    title: "Church Membership",
    desc: "Join our parish family. Provide your household details so we can stay connected.",
    to: "/register",
    state: { formType: "membership" },
    icon: <FaUserFriends size={40} color="#F2BE42" />,
  },
  {
    title: "Kids Trips & Outings",
    desc: "Faith-building adventures, t-shirt merch forms, and seasonal trips.",
    to: "/forms-page",
    state: { formType: "youthTrip" },
    icon: <FaMapMarkedAlt size={40} color="#F2BE42" />,
  },
  {
    title: "Kids Summer & Seasonal Classes",
    desc: "Register your child for summer, fall, and other seasonal classes.",
    to: "/news-events/details",
    state: { formType: "kidsEducation" },
    icon: <FaChild size={40} color="#F2BE42" />,
  },
  {
    title: "Baptism Registration",
    desc: "Prepare for baptism by submitting your child’s details and selecting your preferred date.",
    to: "/forms-page",
    state: { formType: "baptism" },
    icon: <FaCross size={40} color="#F2BE42" />,
  },
  {
    title: "Confession Appointment",
    desc: "Schedule a time for spiritual guidance and confession with our clergy.",
    to: "/forms-page",
    state: { formType: "confession" },
    icon: <FaPrayingHands size={40} color="#F2BE42" />,
  },
];

export default function Forms() {
  return (
    <section id="forms" className="forms-section">
      <div className="forms-container">
        <header className="forms-head">
          <h1 className="forms-title">Forms & Registrations</h1>
          <p className="forms-sub">
            Register and participate in church programs and activities.
          </p>
        </header>

        <div className="forms-cards">
          {formItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.to}
              state={item.state}
              className="forms-card"
            >
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
