

// src/components/AdminDashboard/AdminLayout.jsx
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../../styles/dashboard.css";

export default function AdminLayout() {
  const nav = [
    { to: "", label: "Overview", end: true },
    { to: "members", label: "Members" },
    { to: "plans", label: "Membership Plans" },
    { to: "events", label: "Events" }, // 👈 route for events
    { to: "roles", label: "Roles" },
    { to: "audit", label: "Audit Logs" },
    { to: "settings", label: "System Settings" },
  ];

  return (
    <div className="dash-frame">
      {/* Sidebar */}
      <aside className="dash-aside">
        <div className="brand">
          <span>🛡️ Admin</span>
          <small>Holy Trinity EOTC</small>
        </div>

        <div className="nav-section">
          <div className="nav-title">Manage</div>
          <div className="nav-list">
            {nav.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="dash-main">
        <div className="dash-topbar">
          <div className="dash-title">Administration</div>
          <div className="dash-user">
            <div className="avatar" />
            <span>Admin</span>
          </div>
        </div>

        {/* child routes render here */}
        <Outlet />
      </main>
    </div>
  );
}
