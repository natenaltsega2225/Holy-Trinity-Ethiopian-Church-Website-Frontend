
// // src/components/Shared/DashboardLayout.jsx
// src/components/Shared/DashboardLayout.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/dashboard.css";

export default function DashboardTopbar({
  title,
  subtitle = "",
  userLabel = "",
  showLogout = true,
  onToggleMenu, // ✅ controlled by layout
}) {
  const nav = useNavigate();
  const location = useLocation();

  const closeDrawer = () => document.body.classList.remove("dash-nav-open");

  const logout = () => {
    try {
      localStorage.removeItem("ht_token");
      localStorage.removeItem("ht_user");
    } catch {}

    document.body.classList.remove("dash-nav-open");
    document.body.classList.remove("dash-nav-hidden");

    nav("/login", { state: { from: location.pathname } });
  };

  return (
    <>
      <div className="dash-topbar">
        <div className="dash-topbar-left">
          <button
            className="dash-menu-btn"
            onClick={onToggleMenu}
            aria-label="Toggle menu"
            type="button"
          >
            ☰
          </button>

          <div className="dash-titleWrap">
            <div className="dash-title">{title}</div>
            {subtitle ? <div className="dash-subtitle">{subtitle}</div> : null}
          </div>
        </div>

        <div className="dash-topbar-right">
          <div className="dash-user">
            <div className="avatar" />
            <span>{userLabel}</span>
          </div>

          {showLogout && (
            <button className="dash-logout-btn" onClick={logout} type="button">
              Logout
            </button>
          )}
        </div>
      </div>

      {/* overlay click handled in layouts too, but keep safe close */}
      <div className="dash-overlay" onClick={closeDrawer} aria-hidden="true" />
    </>
  );
}