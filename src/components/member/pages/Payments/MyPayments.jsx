// src/features/member/pages/Payments/MyPayments.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getMyDuesHistory } from "../../services/memberApi";

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
        const { data } = await getMyDuesHistory();
        setRows(data.rows || []);
      } catch (e) {
        console.error(e);
        setErr("Could not load payment history.");
      }
    })();
  }, []);

  return (
    <div>
      <div className="dash-title" style={{ marginBottom: 10 }}>
        My Payments
      </div>

      <div className="dash-card" style={{ marginBottom: 14 }}>
        <div style={{ fontWeight: 950, marginBottom: 8 }}>Make a Payment</div>
        <p style={{ marginTop: 0 }}>
          Use our secure online checkout to pay your membership dues.
        </p>
        <button className="dash-btn dash-btn-primary" onClick={() => nav("/payments")}>
          Go to Payment Page
        </button>
      </div>

      <div className="dash-card" style={{ marginBottom: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <div style={{ fontWeight: 950 }}>Payment History</div>
          <small>
            Need a receipt? See <Link to="/dash/member/payments/invoices">Invoices &amp; Receipts</Link>
          </small>
        </div>
        {err && <div className="auth-banner" style={{ marginTop: 10 }}>{err}</div>}
      </div>

      <div className="dash-table-wrap">
        <div className="dash-table-scroll" style={{ maxHeight: 520 }}>
          <table className="dash-table">
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
                    {r.period_start?.slice(0, 10) || "—"} – {r.period_end?.slice(0, 10) || "—"}
                  </td>
                  <td>{formatAmount(r.amount_cents)}</td>
                  <td>{r.status}</td>
                  <td>{r.cadence_months ? `${r.cadence_months} month(s)` : "—"}</td>
                </tr>
              ))}

              {!rows.length && (
                <tr>
                  <td colSpan={5} style={{ padding: 16 }}>
                    No payments found yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}