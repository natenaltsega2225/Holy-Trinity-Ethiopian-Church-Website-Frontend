import React from "react";
import { NavLink } from "react-router-dom";
import { FaHandHoldingHeart, FaCoins } from "react-icons/fa";
import "../styles/payments.css"; // updated import

const paymentItems = [
  {
    title: "Donation",
    desc:
      "Support the work of the Church—liturgical needs, education, benevolence, and outreach. Your gift strengthens our community.",
    to: "/forms-payments/donation",
    icon: <FaHandHoldingHeart size={40} color="#F2BE42" />,
  },
  {
    title: "Monthly Payment",
    desc:
      "Set up a recurring monthly contribution to sustain our parish operations and ministries throughout the year.",
    to: "/forms-payments/monthly-payment",
    icon: <FaCoins size={40} color="#F2BE42" />,
  },
];

export default function Payments() {
  return (
    <section id="payments" className="payments-section">
      <div className="payments-container">
        <header className="payments-head">
          <h1 className="payments-title">Support Our Church</h1>
          <p className="payments-sub">
            Make a donation or payment to help sustain our services, ministries, and community outreach.
          </p>
        </header>

        <div className="payments-cards">
          {paymentItems.map((item) => (
            <NavLink key={item.title} to={item.to} className="payments-card">
              <div className="payments-card-icon">{item.icon}</div>
              <h3 className="payments-card-title">{item.title}</h3>
              <p className="payments-card-desc">{item.desc}</p>
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  );
}
