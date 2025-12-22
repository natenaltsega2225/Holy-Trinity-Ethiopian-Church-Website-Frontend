

// src/components/MembershipDashoard/MemberLayout.jsx
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../../styles/dashboard.css";

export default function MemberLayout() {
  const nav = [
    { to: "", label: "Overview", end: true },
    { to: "my-profile", label: "My Profile" },
    { to: "my-payments", label: "My Payments" },
    { to: "renewal", label: "Membership Renewal" },
    { to: "invoices", label: "Invoices & Receipts" },
    { to: "announcements", label: "Announcements" },
    { to: "family", label: "Family / Dependents" },   // ✅ NEW
  ];

  return (
    <div className="dash-frame">
      <aside className="dash-aside">
        <div className="brand">
          <span>🕊️ Member</span>
          <small>Holy Trinity EOTC</small>
        </div>
        <div className="nav-section">
          <div className="nav-title">Account</div>
          <div className="nav-list">
            {nav.map((i) => (
              <NavLink
                key={i.label}
                to={i.to}
                end={i.end}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                {i.label}
              </NavLink>
            ))}
          </div>
        </div>
      </aside>

      <main className="dash-main">
        <div className="dash-topbar">
          <div className="dash-title">Membership</div>
          <div className="dash-user">
            <div className="avatar" />
            <span>Member</span>
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
