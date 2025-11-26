// src/components/FinanceDashboard/Overview.jsx
// src/components/FinanceDashboard/Overview.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../Shared/DashboardLayout";
import api from "../api";
import "../../styles/overview.css";

const NAV = [
  { to: "/dash/finance", label: "Overview" },
  { to: "/dash/finance/payments", label: "Payments" },
  { to: "/dash/finance/reports", label: "Reports" },
  { to: "/dash/finance/invoices", label: "Invoices" },
  { to: "/dash/finance/checks", label: "Checks" },
  { to: "/dash/finance/expenses", label: "Expenses" },
  { to: "/dash/finance/exports", label: "Exports" },
  { to: "/dash/finance/settings", label: "Settings" },
];

function fmt(n, { money = false } = {}) {
  if (n == null) return "—";
  if (money) return `$${(Number(n) / 100).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  return Number(n).toLocaleString();
}

export default function FinanceOverview() {
  const [metrics, setMetrics] = useState(null);
  const [err, setErr] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/finance/metrics");
        setMetrics(data.metrics || {});
      } catch (e) {
        console.error(e);
        setErr("Could not load finance metrics.");
      }
    })();
  }, []);

  const m = metrics || {};
  const totalMembers = m.total_members ?? m.members_total;
  const activeMembers = m.active_members ?? m.members_active;
  const monthlyDues = m.monthly_dues_cents;
  const ytdGiving = m.ytd_giving_cents;
  const lastMonthGiving = m.last_month_giving_cents;

  return (
    <DashboardLayout title="Finance Dashboard" nav={NAV}>
      <section className="overview-kpi-row">
        <button
          className="overview-kpi-card"
          type="button"
          onClick={() => nav("/dash/finance/payments")}
        >
          <div className="overview-kpi-label">
            💰 Today&apos;s Payments
            <span className="overview-kpi-pill">Payments</span>
          </div>
          <div className="overview-kpi-value">
            {fmt(m.today_payments_cents, { money: true })}
          </div>
          <div className="overview-kpi-sub">
            Captured &amp; settled contributions for today.
          </div>
        </button>

        <button
          className="overview-kpi-card"
          type="button"
          onClick={() => nav("/dash/finance/reports")}
        >
          <div className="overview-kpi-label">📊 Monthly Dues (Projected)</div>
          <div className="overview-kpi-value">
            {fmt(monthlyDues, { money: true })}
          </div>
          <div className="overview-kpi-sub">
            Expected recurring membership income this month.
          </div>
        </button>

        <button
          className="overview-kpi-card"
          type="button"
          onClick={() => nav("/dash/finance/reports")}
        >
          <div className="overview-kpi-label">📆 YTD Giving</div>
          <div className="overview-kpi-value">
            {fmt(ytdGiving, { money: true })}
          </div>
          <div className="overview-kpi-sub">Total contributions recorded this year.</div>
        </button>

        <button
          className="overview-kpi-card"
          type="button"
          onClick={() => nav("/dash/finance/exports")}
        >
          <div className="overview-kpi-label">📥 Exports &amp; Statements</div>
          <div className="overview-kpi-value">{fmt(totalMembers)} </div>
          <div className="overview-kpi-sub">
            Members eligible for year-end or tax statements.
          </div>
        </button>
      </section>

      <section className="overview-grid">
        <div className="overview-panel">
          <h3>Giving Snapshot</h3>
          {err && <div className="auth-banner">{err}</div>}
          <p>Where we stand from a finance perspective for the current year.</p>

          <ul className="overview-list">
            <li>
              <span>Active contributing members</span>
              <span className="overview-tag">{fmt(activeMembers)}</span>
            </li>
            <li>
              <span>Year-to-date giving</span>
              <span className="overview-tag">
                {fmt(ytdGiving, { money: true })}
              </span>
            </li>
            <li>
              <span>Last month total</span>
              <span className="overview-tag">
                {fmt(lastMonthGiving, { money: true })}
              </span>
            </li>
            <li>
              <span>Outstanding / failed payments</span>
              <span className="overview-tag">
                {fmt(m.failed_or_pending_count)}
              </span>
            </li>
          </ul>
        </div>

        <div className="overview-panel">
          <h3>Quick Finance Actions</h3>
          <p>Daily tasks for the treasurer and finance committee.</p>

          <ul className="overview-list">
            <li>
              <span>Review today&apos;s online payments</span>
              <button
                type="button"
                className="overview-mini-link"
                onClick={() => nav("/dash/finance/payments")}
              >
                Open payments →
              </button>
            </li>
            <li>
              <span>Run contribution or dues report</span>
              <button
                type="button"
                className="overview-mini-link"
                onClick={() => nav("/dash/finance/reports")}
              >
                Open reports →
              </button>
            </li>
            <li>
              <span>Generate invoices or giving statements</span>
              <button
                type="button"
                className="overview-mini-link"
                onClick={() => nav("/dash/finance/invoices")}
              >
                Manage invoices →
              </button>
            </li>
            <li>
              <span>Export data to Excel / accounting</span>
              <button
                type="button"
                className="overview-mini-link"
                onClick={() => nav("/dash/finance/exports")}
              >
                Export data →
              </button>
            </li>
          </ul>
        </div>
      </section>
    </DashboardLayout>
  );
}

