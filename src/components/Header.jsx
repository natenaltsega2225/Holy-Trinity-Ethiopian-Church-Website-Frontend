

// src/components/Header.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/header.css";

export default function Header() {
  const auth = useAuth();
  const nav = useNavigate();
  const location = useLocation();

  const scrollToId = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const headerOffset = 90;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      return true;
    }
    return false;
  };

  const goHome = () => {
    if (location.pathname === "/") {
      // On home already → smooth scroll to hero
      if (!scrollToId("home")) {
        // fallback: top of page
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      // From another route → go to home and let Home.jsx scroll
      nav("/", { state: { scrollTo: "home" } });
    }
  };

  const goToSection = (sectionId) => {
    if (location.pathname === "/") {
      if (scrollToId(sectionId)) return;
    }
    nav("/", { state: { scrollTo: sectionId } });
  };

  const renderNavButtons = () => (
    <>
      <button className="ht-nav-link as-btn" onClick={goHome}>
        HOME
      </button>
      <button
        className="ht-nav-link as-btn"
        onClick={() => goToSection("about-us")}
      >
        About Us
      </button>
      <button
        className="ht-nav-link as-btn"
        onClick={() => goToSection("ministries")}
      >
        Ministries
      </button>
      <button
        className="ht-nav-link as-btn"
        onClick={() => goToSection("serve-section")}
      >
        Serve
      </button>
      <button
        className="ht-nav-link as-btn"
        onClick={() => goToSection("news-events")}
      >
        News &amp; Events
      </button>
      <button
        className="ht-nav-link as-btn"
        onClick={() => goToSection("forms")}
      >
        Forms
      </button>
      <button
        className="ht-nav-link as-btn"
        onClick={() => goToSection("payments")}
      >
        Payments
      </button>
      <button
        className="ht-nav-link as-btn"
        onClick={() => nav("/donate")}
      >
        Donate
      </button>
    </>
  );

  // Guest header (no auth context yet or no token)
  if (!auth) {
    return (
      <header className="ht-header">
        <div className="ht-header-row">
          <div className="ht-lang">
            <span className="ht-lang-icon">🌐</span>
            <span>English</span>
            <span className="ht-caret">▾</span>
          </div>

          <nav className="ht-nav">{renderNavButtons()}</nav>

          <div className="ht-auth-group desktop-only">
            <button
              className="ht-auth-btn ht-auth-solid"
              onClick={() =>
                nav("/login", { state: { from: location.pathname } })
              }
            >
              Login
            </button>
          </div>

          <div
            className="ht-burger"
            onClick={() => {
              const drawer = document.querySelector(".ht-nav-mobile");
              if (drawer) drawer.classList.toggle("active");
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className="ht-nav-mobile">
          {renderNavButtons()}
          <div className="ht-auth-group">
            <button
              className="ht-auth-btn ht-auth-solid"
              onClick={() =>
                nav("/login", { state: { from: location.pathname } })
              }
            >
              Login
            </button>
          </div>
        </div>
      </header>
    );
  }

  const { token, setToken, user } = auth;

  const logout = () => {
    setToken("");
    nav("/login", { state: { from: location.pathname } });
  };

  return (
    <header className="ht-header">
      <div className="ht-header-row">
        <div className="ht-lang">
          <span className="ht-lang-icon">🌐</span>
          <span>English</span>
          <span className="ht-caret">▾</span>
        </div>

        <nav className="ht-nav">{renderNavButtons()}</nav>

        <div className="ht-auth-group desktop-only">
          {token ? (
            <>
              <span style={{ opacity: 0.9 }}>
                Hi, {user?.first_name || user?.username || "Member"}
              </span>
              <button
                className="ht-auth-btn ht-auth-solid"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() =>
                nav("/login", { state: { from: location.pathname } })
              }
              className="ht-auth-btn ht-auth-solid"
            >
              Login
            </button>
          )}
        </div>

        <div
          className="ht-burger"
          onClick={() => {
            const drawer = document.querySelector(".ht-nav-mobile");
            if (drawer) drawer.classList.toggle("active");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className="ht-nav-mobile">
        {renderNavButtons()}
        <div className="ht-auth-group">
          {token ? (
            <button
              className="ht-auth-btn ht-auth-solid"
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() =>
                nav("/login", { state: { from: location.pathname } })
              }
              className="ht-auth-btn ht-auth-solid"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
