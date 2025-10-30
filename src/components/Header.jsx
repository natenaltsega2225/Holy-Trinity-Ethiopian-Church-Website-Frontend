import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "../styles/Header.css";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  // Smooth scroll handler
  const handleScrollClick = (e, targetId) => {
    e.preventDefault();
    if (location.pathname === "/") {
      const section = document.getElementById(targetId);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: targetId } });
    }
  };

  return (
    <header className="ht-header">
      <div className="ht-header-row">
        {/* Left: Language */}
        <div className="ht-lang">
          <span className="ht-lang-icon">🌐</span>
          <span>English</span>
          <span className="ht-caret">▾</span>
        </div>

        {/* Center: Main Nav */}
        <nav className="ht-nav">
          {[
            { label: "HOME", to: "/" },
            { label: "About Us", scrollId: "about-us" },
            { label: "Ministries", scrollId: "ministries" },
            { label: "Serve", scrollId: "serve-section" },
            { label: "News & Events", scrollId: "news-events" },
            { label: "Forms", scrollId: "forms" },
            { label: "Payments", scrollId: "payments" },
          ].map((item, idx) =>
            item.to ? (
              <NavLink
                key={idx}
                to={item.to}
                end
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
          )}
        </nav>

        {/* Right: Auth */}
        <div className="ht-auth-group">
          <NavLink
            to="/login"
            className={({ isActive }) =>
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
