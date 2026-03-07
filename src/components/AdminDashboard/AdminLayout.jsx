

// // src/components/AdminDashboard/AdminLayout.jsx
// import React, { useMemo, useState } from "react";
// import { NavLink, Outlet, useLocation } from "react-router-dom";
// import DashboardTopbar from "../Shared/DashboardLayout";
// import "../../styles/dashboard.css";

// export default function AdminLayout() {
//   const [sideSearch, setSideSearch] = useState("");
//   const location = useLocation();

//   const nav = useMemo(
//     () => [
//       { to: "/dash/admin", label: "Overview", end: true },
//       { to: "/dash/admin/members", label: "Members" },
//       { to: "/dash/admin/plans", label: "Membership Plans" },
//       { to: "/dash/admin/events", label: "Events" },
//       { to: "/dash/admin/roles", label: "Roles" },
//       { to: "/dash/admin/audit", label: "Audit Logs" },
//       { to: "/dash/admin/settings", label: "System Settings" },
//     ],
//     []
//   );

//   const filtered = useMemo(() => {
//     if (!sideSearch.trim()) return nav;
//     const s = sideSearch.toLowerCase();
//     return nav.filter((x) => x.label.toLowerCase().includes(s));
//   }, [nav, sideSearch]);

//   const toggleNav = () => {
//     // use this for mobile drawer (your existing behavior)
//     document.body.classList.toggle("dash-nav-open");
//   };

//   // Optional: show page subtitle based on route
//   const subTitle = useMemo(() => {
//     const hit = nav.find((n) => n.to === location.pathname);
//     return hit?.label || "Administration";
//   }, [location.pathname, nav]);

//   return (
//     <div className="dash-frame">
//       <aside className="dash-aside">
//         <div className="dash-aside-header">
//           <button className="dash-side-toggle" onClick={toggleNav} aria-label="Menu">
//             ☰
//           </button>
//           <div className="dash-aside-brand">
//             <div className="dash-aside-brandTitle">Admin</div>
//             <div className="dash-aside-brandSub">Holy Trinity EOTC</div>
//           </div>
//         </div>

//         {/* Sidebar Search */}
//         <div className="dash-side-search">
//           <input
//             className="dash-side-search-input"
//             placeholder="Search menu…"
//             value={sideSearch}
//             onChange={(e) => setSideSearch(e.target.value)}
//           />
//         </div>

//         <div className="nav-section">
//           {/* ✅ Removed "Manage" label */}
//           <div className="nav-list">
//             {filtered.map((item) => (
//               <NavLink
//                 key={item.label}
//                 to={item.to}
//                 end={item.end}
//                 className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
//                 onClick={() => document.body.classList.remove("dash-nav-open")}
//               >
//                 {item.label}
//               </NavLink>
//             ))}
//           </div>
//         </div>
//       </aside>

//       <main className="dash-main">
//         {/* Single topbar + single logout */}
//         <DashboardTopbar title="Holy Trinity EOTC" userLabel="Admin" showLogout />

//         {/* Optional: small page header row (not duplicated inside pages) */}
//         <div className="dash-pageHead">
//           <div className="dash-pageHeadTitle">{subTitle}</div>
//         </div>

//         <div className="dash-page">
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   );
// }

// src/components/AdminDashboard/AdminLayout.jsx
import React, { useMemo, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import DashboardTopbar from "../Shared/DashboardLayout";
import "../../styles/dashboard.css";

export default function AdminLayout() {
  const [sideSearch, setSideSearch] = useState("");
  const location = useLocation();

  const nav = useMemo(
    () => [
      { to: "/dash/admin", label: "Overview", end: true, icon: "📊" },
      { to: "/dash/admin/members", label: "Members", icon: "👥" },
      { to: "/dash/admin/plans", label: "Membership Plans", icon: "🧾" },
      { to: "/dash/admin/events", label: "Events", icon: "📣" },
      { to: "/dash/admin/roles", label: "Roles", icon: "🛡️" },
      { to: "/dash/admin/audit", label: "Audit Logs", icon: "🧰" },
      { to: "/dash/admin/settings", label: "System Settings", icon: "⚙️" },
    ],
    []
  );

  const filtered = useMemo(() => {
    if (!sideSearch.trim()) return nav;
    const s = sideSearch.toLowerCase();
    return nav.filter((x) => x.label.toLowerCase().includes(s));
  }, [nav, sideSearch]);

  const isMobile = () => window.matchMedia("(max-width: 900px)").matches;

  const toggleSidebar = () => {
    if (isMobile()) {
      document.body.classList.toggle("dash-nav-open");   // drawer
      document.body.classList.remove("dash-nav-hidden"); // ignore desktop hide
    } else {
      document.body.classList.toggle("dash-nav-hidden"); // hide completely
      document.body.classList.remove("dash-nav-open");
    }
  };

  const closeDrawer = () => {
    document.body.classList.remove("dash-nav-open");
  };

  const subTitle = useMemo(() => {
    const hit = nav.find((n) => n.to === location.pathname);
    return hit?.label || "Administration";
  }, [location.pathname, nav]);

  return (
    <div className="dash-frame">
      <aside className="dash-aside">
        <div className="dash-aside-header">
          <div className="dash-aside-brand">
            <div className="dash-aside-brandTitle">Admin</div>
            <div className="dash-aside-brandSub">Holy Trinity EOTC</div>
          </div>
        </div>

        <div className="dash-aside-divider" />

        {/* Sidebar Search */}
        <div className="dash-side-search">
          <input
            className="dash-side-search-input"
            placeholder="Search menu…"
            value={sideSearch}
            onChange={(e) => setSideSearch(e.target.value)}
          />
        </div>

        <div className="nav-section">
          <div className="nav-list">
            {filtered.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.end}
                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                onClick={closeDrawer}
              >
                <span className="nav-ico" aria-hidden="true">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </aside>

      <main className="dash-main">
        {/* Use topbar menu button to toggle sidebar */}
        <DashboardTopbar
          title="Holy Trinity EOTC"
          subtitle={subTitle}
          userLabel="Admin"
          showLogout
          onToggleMenu={toggleSidebar}
        />

        {/* Page wrapper */}
        <div className="dash-page">
          <Outlet />
        </div>
      </main>

      {/* Overlay (mobile drawer close) */}
      <div className="dash-overlay" onClick={closeDrawer} aria-hidden="true" />
    </div>
  );
}