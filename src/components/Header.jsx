//src/components/Header.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Header.css";

export default function Header() {
  return (
    <header className="ht-header">
      <div className="ht-container ht-header-row">
        {/* Left: Language */}
        <div className="ht-lang">
          <span className="ht-lang-icon">🌐</span>
          <span>English</span>
          <span className="ht-caret">▾</span>
        </div>

        {/* Center: Main Nav */}
        <nav className="ht-nav">
          <NavLink to="/" end className={({isActive}) => `ht-nav-link ${isActive ? "ht-nav-active" : ""}`}>HOME</NavLink>
          <NavLink to="/ministries" className={({isActive}) => `ht-nav-link ${isActive ? "ht-nav-active" : ""}`}>Ministries</NavLink>
          <NavLink to="/serve" className={({isActive}) => `ht-nav-link ${isActive ? "ht-nav-active" : ""}`}>Serve</NavLink>
          <NavLink to="/news-events" className={({isActive}) => `ht-nav-link ${isActive ? "ht-nav-active" : ""}`}>News &amp; Events</NavLink>
          <NavLink to="/forms-payments" className={({isActive}) => `ht-nav-link ${isActive ? "ht-nav-active" : ""}`}>Forms &amp; Payments</NavLink>
          <NavLink to="/about" className={({isActive}) => `ht-nav-link ${isActive ? "ht-nav-active" : ""}`}>About Us</NavLink>
        </nav>

        {/* Right: Auth (Login only) */}
        <div className="ht-auth-group">
          <NavLink
            to="/login"
            className={({isActive}) =>
              `ht-auth-btn ht-auth-solid ${isActive ? "ht-auth-active" : ""}`
            }
          >
            Login
          </NavLink>
        </div>
      </div>
    </header>
  );
}
