import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "../styles/header.css";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Smooth scroll handler
  const handleScrollClick = (e, targetId) => {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname === "/") {
      const section = document.getElementById(targetId);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: targetId } });
    }
  };

  const navItems = [
    { label: "HOME", to: "/" },
    { label: "About Us", scrollId: "about-us" },
    { label: "Ministries", scrollId: "ministries" },
    { label: "Serve", scrollId: "serve-section" },
    { label: "News & Events", scrollId: "news-events" },
    { label: "Forms", scrollId: "forms" },
    { label: "Payments", scrollId: "payments" },
  ];

  const renderNavLinks = () =>
    navItems.map((item, idx) =>
      item.to ? (
        <NavLink
          key={idx}
          to={item.to}
          end
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) =>
            `ht-nav-link ${isActive ? "ht-nav-active" : ""}`
          }
        >
          {item.label}
        </NavLink>
      ) : (
        <a
          key={idx}
          href={`#${item.scrollId}`}
          onClick={(e) => handleScrollClick(e, item.scrollId)}
          className="ht-nav-link"
        >
          {item.label}
        </a>
      )
    );

  return (
    <header className="ht-header">
      <div className="ht-header-row">
        {/* Left: Language selector (desktop only) */}
        <div className="ht-lang">
          <span className="ht-lang-icon">🌐</span>
          <span>English</span>
          <span className="ht-caret">▾</span>
        </div>

        {/* Center: Desktop Nav */}
        <nav className="ht-nav">{renderNavLinks()}</nav>

        {/* Right: Login button (desktop only) */}
        <div className="ht-auth-group desktop-only">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `ht-auth-btn ht-auth-solid ${isActive ? "ht-auth-active" : ""}`
            }
          >
            Login
          </NavLink>
        </div>

        {/* Burger (mobile only) */}
        <div
          className={`ht-burger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`ht-nav-mobile ${menuOpen ? "active" : ""}`}>
        {renderNavLinks()}

        <div className="ht-auth-group">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `ht-auth-btn ht-auth-solid ${isActive ? "ht-auth-active" : ""}`
            }
            onClick={() => setMenuOpen(false)}
          >
            Login
          </NavLink>
        </div>
      </div>
    </header>
  );
}
