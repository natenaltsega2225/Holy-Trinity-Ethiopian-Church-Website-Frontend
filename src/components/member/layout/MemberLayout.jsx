// src/componentes/member/layout/MemberLayout.jsx
// src/components/member/layout/MemberLayout.jsx
import React, { useEffect, useMemo, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import "../../../styles/dashboard.css";
import DashboardTopbar from "../.././Shared/DashboardLayout";
import memberMenu from "./memberMenu";

export default function MemberLayout() {
  const location = useLocation();
  const nav = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (collapsed) document.body.classList.add("dash-nav-collapsed");
    else document.body.classList.remove("dash-nav-collapsed");
    return () => {
      document.body.classList.remove("dash-nav-collapsed");
      document.body.classList.remove("dash-nav-open");
    };
  }, [collapsed]);

  const isMobile = () => window.matchMedia("(max-width: 900px)").matches;

  const toggleSidebar = () => {
    if (isMobile()) {
      document.body.classList.toggle("dash-nav-open");
      document.body.classList.remove("dash-nav-hidden");
    } else {
      setCollapsed((v) => !v);
    }
  };

  const closeDrawer = () => document.body.classList.remove("dash-nav-open");

  const subtitle = useMemo(() => {
    // location.pathname looks like /dash/membership/my-profile
    // highlight label based on last part
    const parts = location.pathname.split("/dash/membership/")[1] || "";
    const key = parts === "" ? "." : parts.split("/")[0];
    const hit = memberMenu.find((m) => (m.to === "." ? key === "." : m.to === key));
    return hit?.label || "Membership";
  }, [location.pathname]);

  const logout = () => {
    try {
      localStorage.removeItem("ht_token");
      localStorage.removeItem("ht_user");
    } catch {}
    document.body.classList.remove("dash-nav-open");
    document.body.classList.remove("dash-nav-hidden");
    nav("/login");
  };

  let userLabel = "Member";
  try {
    const u = JSON.parse(localStorage.getItem("ht_user") || "{}");
    userLabel =
      (u?.first_name || u?.last_name)
        ? `${u.first_name || ""} ${u.last_name || ""}`.trim()
        : (u?.email || "Member");
  } catch {}

  return (
    <div className="dash-frame">
      <aside className="dash-aside">
        <div className="dash-aside-header">
          <button className="dash-side-toggle" onClick={toggleSidebar} type="button">
            ☰
          </button>
          <div>
            <div className="dash-aside-brandTitle">Membership</div>
            <div className="dash-aside-brandSub">Holy Trinity EOTC</div>
          </div>
        </div>

        <div className="dash-aside-divider" />

        <div className="nav-section">
          <div className="nav-list">
            {memberMenu.map((i) => (
              <NavLink
                key={i.label}
                to={i.to}              // ✅ RELATIVE
                end={i.end}
                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                onClick={closeDrawer}
              >
                <span className="nav-ico" aria-hidden="true">{i.icon}</span>
                <span>{i.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </aside>

      <main className="dash-main">
        <DashboardTopbar
          title="Holy Trinity EOTC"
          subtitle={subtitle}
          userLabel={userLabel}
          showLogout
          onToggleMenu={toggleSidebar}
        />

        <div className="dash-page">
          <Outlet />
        </div>
      </main>

      <div className="dash-overlay" onClick={closeDrawer} aria-hidden="true" />
    </div>
  );
}