//src/components/MembershipDashoard/MyPayments.jsx
// src/components/MembershipDashoard/MyPayments.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DashboardLayout from "../Shared/DashboardLayout";
import api from "../api";

const NAV = [
  { to: "/dash/membership", label: "Overview", end: true },
  { to: "/dash/membership/my-profile", label: "My Profile" },
  { to: "/dash/membership/my-payments", label: "My Payments" },
  { to: "/dash/membership/renewal", label: "Membership Renewal" },
  { to: "/dash/membership/invoices", label: "Invoices & Receipts" },
  { to: "/dash/membership/announcements", label: "Announcements" },
];

function formatAmount(cents) {
  if (cents == null) return "—";
  return `$${(Number(cents) / 100).toFixed(2)}`;
}

export default function MyPayments() {
  const [rows, setRows] = useState([]);
  const [err, setErr] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/dues/my");
        setRows(data.rows || []);
      } catch (e) {
        console.error(e);
        setErr("Could not load payment history.");
      }
    })();
  }, []);

  return (
    <DashboardLayout title="My Payments" nav={NAV}>
      <section className="card" style={{ marginBottom: 16 }}>
        <h3 style={{ marginTop: 0 }}>Make a Payment</h3>
        <p style={{ marginBottom: 12 }}>
          Use our secure online checkout to pay your membership dues.
        </p>
        <button onClick={() => nav("/payments")}>Go to Payment Page</button>
      </section>

      <section className="card" style={{ overflowX: "auto" }}>
        <div style={{ marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
          <h3 style={{ margin: 0 }}>Payment History</h3>
          <small>
            Need a receipt? See&nbsp;
            <Link to="/dash/membership/invoices">Invoices &amp; Receipts</Link>
          </small>
        </div>

        {err && <div className="auth-banner">{err}</div>}

        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Period</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Cadence</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{r.period_start?.slice(0, 10) || r.created_at?.slice(0, 10) || "—"}</td>
                <td>
                  {r.period_start?.slice(0, 10) || "—"} –{" "}
                  {r.period_end?.slice(0, 10) || "—"}
                </td>
                <td>{formatAmount(r.amount_cents)}</td>
                <td>
                  <span
                    className={
                      r.status === "paid" || r.status === "active"
                        ? "pill pill-ok"
                        : "pill pill-warn"
                    }
                  >
                    {r.status}
                  </span>
                </td>
                <td>{r.cadence_months ? `${r.cadence_months} month(s)` : "—"}</td>
              </tr>
            ))}
            {!rows.length && (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: 18 }}>
                  No payments found yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </DashboardLayout>
  );
}
