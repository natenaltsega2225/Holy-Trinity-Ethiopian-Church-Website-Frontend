
// src/components/FinanceDashboard/FinanceLayout.jsx
// src/components/FinanceDashboard/FinanceLayout.jsx
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../../styles/dashboard.css";

export default function FinanceLayout() {
  return (
    <div className="dash-frame">
      <aside className="dash-aside">
        <div className="brand">
          <span>💳 Finance</span>
          <small>Holy Trinity EOTC</small>
        </div>
        <div className="nav-section">
          <div className="nav-title">Accounting</div>
          <nav className="nav-list">
            <NavLink end to=""          className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>Overview</NavLink>
             <NavLink to="members" className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>Members</NavLink>
            <NavLink    to="payments"   className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>Payments</NavLink>
            <NavLink    to="reports"    className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>Reports</NavLink>
            <NavLink    to="invoices"   className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>Invoices</NavLink>
            <NavLink    to="checks"     className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>Checks</NavLink>
            <NavLink    to="expenses"   className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>Expenses</NavLink>
            <NavLink    to="exports"    className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>Exports</NavLink>
            <NavLink    to="settings"   className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>Settings</NavLink>
          
           
          </nav>
        </div>
      </aside>

      <main className="dash-main">
        <div className="dash-topbar">
          <div className="dash-title">Finance</div>
          <div className="dash-user"><div className="avatar" /><span>Finance Team</span></div>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
