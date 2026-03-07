// src/components/finance/layout/FinanceLayout.jsx

import React, { useMemo, useState, useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import "../../../styles/dashboard.css";
import DashboardTopbar from "../../Shared/DashboardLayout"; // this is your topbar component

import financeMenu from "./financeMenu"; // if you already have it

export default function FinanceLayout() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // keep body class sync for sidebar
  useEffect(() => {
    if (collapsed) document.body.classList.add("dash-nav-collapsed");
    else document.body.classList.remove("dash-nav-collapsed");
    return () => document.body.classList.remove("dash-nav-collapsed");
  }, [collapsed]);

  const onToggleMenu = () => {
    // desktop: collapse, mobile: open drawer
    if (window.innerWidth <= 900) {
      document.body.classList.toggle("dash-nav-open");
    } else {
      setCollapsed((v) => !v);
    }
  };

  const closeDrawer = () => document.body.classList.remove("dash-nav-open");

  const pageMeta = useMemo(() => {
    const p = location.pathname;

    if (p.includes("/dash/finance/invoices")) return { title: "Holy Trinity EOTC", subtitle: "Invoices" };
    if (p.includes("/dash/finance/expenses")) return { title: "Holy Trinity EOTC", subtitle: "Expenses" };
    if (p.includes("/dash/finance/checks")) return { title: "Holy Trinity EOTC", subtitle: "Checks" };
    if (p.includes("/dash/finance/dues")) return { title: "Holy Trinity EOTC", subtitle: "Dues Plans" };
    if (p.includes("/dash/finance/transactions")) return { title: "Holy Trinity EOTC", subtitle: "Transactions" };
    if (p.includes("/dash/finance/reports")) return { title: "Holy Trinity EOTC", subtitle: "Reports" };
    if (p.includes("/dash/finance/exports")) return { title: "Holy Trinity EOTC", subtitle: "Exports" };
    if (p.includes("/dash/finance/settings")) return { title: "Holy Trinity EOTC", subtitle: "Settings" };

    return { title: "Holy Trinity EOTC", subtitle: "Finance" };
  }, [location.pathname]);

  let userLabel = "Finance";
  try {
    const u = JSON.parse(localStorage.getItem("ht_user") || "{}");
    userLabel = u?.name || u?.first_name ? `${u.first_name || ""} ${u.last_name || ""}`.trim() : (u?.email || "Finance");
  } catch {}

  return (
    <div className="dash-frame">
      <aside className="dash-aside">
        <div className="dash-aside-header">
          <button className="dash-side-toggle" onClick={onToggleMenu} type="button">
            ☰
          </button>

          <div>
            <div className="dash-aside-brandTitle">Finance</div>
            <div className="dash-aside-brandSub">Holy Trinity EOTC</div>
          </div>
        </div>

        <div className="dash-aside-divider" />

        <nav className="nav-section">
          <div className="nav-list">
            {/* If you have financeMenu.js use it, otherwise hardcode links */}
            {(financeMenu || [
              { to: "/dash/finance", label: "Dashboard", icon: "📊" },
              { to: "/dash/finance/transactions", label: "Transactions", icon: "💳" },
              { to: "/dash/finance/dues/plans", label: "Dues Plans", icon: "🧾" },
              { to: "/dash/finance/invoices", label: "Invoices", icon: "📄" },
              { to: "/dash/finance/checks", label: "Checks", icon: "🏦" },
              { to: "/dash/finance/expenses", label: "Expenses", icon: "🧱" },
              { to: "/dash/finance/reports", label: "Reports", icon: "📈" },
              { to: "/dash/finance/exports", label: "Exports", icon: "📤" },
              { to: "/dash/finance/settings", label: "Settings", icon: "⚙️" },
            ]).map((m) => (
              <NavLink
                key={m.to}
                to={m.to}
                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                onClick={closeDrawer}
              >
                <span className="nav-ico">{m.icon}</span>
                <span>{m.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </aside>

      <main className="dash-main">
        {/* ✅ ONLY ONE HEADER HERE */}
        <DashboardTopbar
          title={pageMeta.title}
          subtitle={pageMeta.subtitle}
          userLabel={userLabel}
          onToggleMenu={onToggleMenu}
        />

        {/* ✅ pages render below without their own headers */}
        <Outlet />
      </main>
    </div>
  );
}