
// // src/components/AdminDashboard/Overview.jsx

// src/components/AdminDashboard/Overview.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../Shared/DashboardLayout";
import api from "../api";
import "../../styles/overview.css";

const NAV = [
  { to: "/dash/admin", label: "Overview" },
  { to: "/dash/admin/members", label: "Members" },
  { to: "/dash/admin/plans", label: "Membership Plans" },
   { to: "/dash/admin/events", label: "Events" },
  { to: "/dash/admin/roles", label: "Roles" },
  { to: "/dash/admin/audit", label: "Audit Logs" },
  { to: "/dash/admin/settings", label: "System Settings" },
];

function fmt(n) {
  if (n == null) return "—";
  return Number(n).toLocaleString();
}

export default function AdminOverview() {
  const [metrics, setMetrics] = useState(null);
  const [err, setErr] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/admin/metrics");
        setMetrics(data.metrics || {});
      } catch (e) {
        console.error(e);
        setErr("Could not load admin metrics.");
      }
    })();
  }, []);

  const m = metrics || {};
  const totalMembers = m.total_members ?? m.members_total;
  const activeMembers = m.active_members ?? m.members_active;
  const paidMonthly = m.paid_monthly;
  const paid6 = m.paid_6;
  const paid12 = m.paid_12;
  const newThisMonth = m.new_members_30d;
  const overdue = m.overdue_members;

  return (
    <DashboardLayout title="Admin Dashboard" nav={NAV}>
      {/* Top KPI row */}
      <section className="overview-kpi-row">
        <button
          className="overview-kpi-card"
          type="button"
          onClick={() => nav("/dash/admin/members")}
        >
          <div className="overview-kpi-label">
            👥 Total Members
            <span className="overview-kpi-pill">Directory</span>
          </div>
          <div className="overview-kpi-value">{fmt(totalMembers)}</div>
          <div className="overview-kpi-sub">
            View and manage all registered members.
          </div>
        </button>

        <button
          className="overview-kpi-card"
          type="button"
          onClick={() => nav("/dash/admin/members")}
        >
          <div className="overview-kpi-label">✅ Active Members</div>
          <div className="overview-kpi-value">{fmt(activeMembers)}</div>
          <div className="overview-kpi-sub">
            Currently in good standing (dues / status up to date).
          </div>
        </button>

        <button
          className="overview-kpi-card"
          type="button"
          onClick={() => nav("/dash/admin/plans")}
        >
          <div className="overview-kpi-label">💳 Paid Monthly</div>
          <div className="overview-kpi-value">{fmt(paidMonthly)}</div>
          <div className="overview-kpi-sub">
            Members enrolled in monthly contribution plans.
          </div>
        </button>

        <button
          className="overview-kpi-card"
          type="button"
          onClick={() => nav("/dash/admin/plans")}
        >
          <div className="overview-kpi-label">📆 6 &amp; 12 Month Plans</div>
          <div className="overview-kpi-value">
            {fmt(paid6)} / {fmt(paid12)}
          </div>
          <div className="overview-kpi-sub">
            Semi-annual and annual plan participants.
          </div>
        </button>
      </section>

      {/* Lower grid panels */}
      <section className="overview-grid">
        <div className="overview-panel">
          <h3>Membership Snapshot</h3>
          <p>High-level view of how your parish membership is trending.</p>
          {err && <div className="auth-banner">{err}</div>}

          <ul className="overview-list">
            <li>
              <span>Total members</span>
              <span className="overview-tag">{fmt(totalMembers)}</span>
            </li>
            <li>
              <span>Active members</span>
              <span className="overview-tag">{fmt(activeMembers)}</span>
            </li>
            <li>
              <span>New members (last 30 days)</span>
              <span className="overview-tag">{fmt(newThisMonth)}</span>
            </li>
            <li>
              <span>Overdue / inactive</span>
              <span className="overview-tag">{fmt(overdue)}</span>
            </li>
          </ul>
        </div>

        <div className="overview-panel">
          <h3>Quick Admin Actions</h3>
          <p>Jump directly into common configuration and review tasks.</p>
          <ul className="overview-list">
            <li>
              <span>Invite or register a new member</span>
              <button
                type="button"
                className="overview-mini-link"
                onClick={() => nav("/dash/admin/members")}
              >
                Open member list →
              </button>
            </li>
            <li>
              <span>Update membership plans &amp; dues cadence</span>
              <button
                type="button"
                className="overview-mini-link"
                onClick={() => nav("/dash/admin/plans")}
              >
                Manage plans →
              </button>
            </li>

            <li>
  <span>Post Kids Programs, Holiday Activities, Trips &amp; News</span>
  <button
    type="button"
    className="overview-mini-link"
    onClick={() => nav("/dash/admin/events")}
  >
    Manage News &amp; Events →
  </button>
</li>

            <li>
              <span>Review admin / finance roles and permissions</span>
              <button
                type="button"
                className="overview-mini-link"
                onClick={() => nav("/dash/admin/roles")}
              >
                Manage roles →
              </button>
            </li>
            <li>
              <span>View configuration &amp; system settings</span>
              <button
                type="button"
                className="overview-mini-link"
                onClick={() => nav("/dash/admin/settings")}
              >
                Open settings →
              </button>
            </li>
          </ul>
        </div>
      </section>
    </DashboardLayout>
  );
}
