// src/features/member/pages/Dashboard/MemberDashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../../../styles/overview.css";
import { getMyDuesHistory } from "../../services/memberApi";

function sumPaid(rows) {
  return rows
    .filter((r) => r.status === "paid" || r.status === "active")
    .reduce((acc, r) => acc + (Number(r.amount_cents) || 0), 0);
}

function computeNextDue(rows) {
  if (!rows.length) return null;
  const latest = rows[0];
  return latest.period_end || latest.period_start || latest.created_at || null;
}

function isActive(rows) {
  if (!rows.length) return false;
  const latest = rows[0];
  const end = latest.period_end || latest.period_start;
  if (!end) return false;
  const today = new Date().toISOString().slice(0, 10);
  return end >= today;
}

function fmtMoney(cents) {
  const v = Number(cents || 0);
  return `$${(v / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function MemberDashboard() {
  const [rows, setRows] = useState([]);
  const [err, setErr] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getMyDuesHistory();
        setRows(data.rows || []);
      } catch (e) {
        console.error(e);
        setErr("Could not load membership summary.");
      }
    })();
  }, []);

  const totalPaidCents = useMemo(() => sumPaid(rows), [rows]);
  const nextDue = useMemo(() => computeNextDue(rows), [rows]);
  const active = useMemo(() => isActive(rows), [rows]);
  const recent = rows.slice(0, 5);

  return (
    <div>
      <section className="overview-kpi-row">
        <button type="button" className="overview-kpi-card" onClick={() => nav("/dash/member/account/my-profile")}>
          <div className="overview-kpi-label">
            🧑‍💼 Membership Status
            <span className="overview-kpi-pill">{active ? "Active" : "Not Active"}</span>
          </div>
          <div className="overview-kpi-value">{active ? "In Good Standing" : "Action Needed"}</div>
          <div className="overview-kpi-sub">Keep your contact details up to date.</div>
        </button>

        <button type="button" className="overview-kpi-card" onClick={() => nav("/dash/member/payments/my-payments")}>
          <div className="overview-kpi-label">📅 Next Due Date</div>
          <div className="overview-kpi-value">{nextDue ? nextDue.slice(0, 10) : "Not set"}</div>
          <div className="overview-kpi-sub">View your payment history.</div>
        </button>

        <button type="button" className="overview-kpi-card" onClick={() => nav("/payments")}>
          <div className="overview-kpi-label">💳 Total Paid</div>
          <div className="overview-kpi-value">{fmtMoney(totalPaidCents)}</div>
          <div className="overview-kpi-sub">Thank you for supporting Holy Trinity EOTC.</div>
        </button>
      </section>

      <section className="overview-grid">
        <div className="overview-panel">
          <h3>Recent Payments</h3>
          {err && <div className="auth-banner">{err}</div>}

          {!recent.length ? (
            <p>You haven&apos;t made any online membership payments yet.</p>
          ) : (
            <>
              <p>Your last few membership payments are shown below.</p>
              <table className="overview-mini-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Period</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((r) => (
                    <tr key={r.id}>
                      <td>{(r.period_start || r.created_at || "").slice(0, 10)}</td>
                      <td>
                        {r.period_start?.slice(0, 10) || "—"} – {r.period_end?.slice(0, 10) || "—"}
                      </td>
                      <td>{fmtMoney(r.amount_cents)}</td>
                      <td>{r.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          <div style={{ marginTop: 8 }}>
            <Link to="/dash/member/payments/my-payments" className="overview-mini-link">
              View full payment history →
            </Link>
          </div>
        </div>

        <div className="overview-panel">
          <h3>My Membership</h3>
          <p>Shortcuts to common self-service actions.</p>

          <ul className="overview-list">
            <li>
              <span>Update my address or phone number</span>
              <button type="button" className="overview-mini-link" onClick={() => nav("/dash/member/account/my-profile")}>
                Edit profile →
              </button>
            </li>
            <li>
              <span>Make a new payment now</span>
              <button type="button" className="overview-mini-link" onClick={() => nav("/payments")}>
                Go to payments →
              </button>
            </li>
            <li>
              <span>Download invoices / receipts</span>
              <button type="button" className="overview-mini-link" onClick={() => nav("/dash/member/payments/invoices")}>
                View invoices →
              </button>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}