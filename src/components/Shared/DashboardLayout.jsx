// src/components/Shared/DashboardLayout.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../../styles/dashboard.css";

/**
 * Content wrapper for dashboard pages.
 *
 * By default it renders **no sidebar** — it assumes a parent layout (e.g., MemberLayout/AdminLayout/FinanceLayout)
 * already provides the left nav. If you ever want DashboardLayout to render its own local nav,
 * pass showNav={true} and a `nav` array.
 */
export default function DashboardLayout({
  title,
  children,
  showNav = false,   // ← default: no internal sidebar
  nav = [],
}) {
  return (
    <div className="dash-content">
      <header className="section-header">
        <h1>{title}</h1>
        <Link to="/" className="btn">Back to site</Link>
      </header>

      <div className={`section-body ${showNav ? "with-local-nav" : ""}`}>
        {showNav && (
          <aside className="local-aside">
            <nav>
              {nav.map((i) => (
                <Link key={i.to} to={i.to} className="local-link">
                  {i.label}
                </Link>
              ))}
            </nav>
          </aside>
        )}

        <div className="section-main">
          {children}
        </div>
      </div>
    </div>
  );
}
