//src/components/FinanceDashboard/Report.jsx
// src/components/FinanceDashboard/Report.jsx
import React, { useEffect, useState } from "react";
import DashboardLayout from "../Shared/DashboardLayout";
import api from "../../components/api";

const NAV = [
  { to: "/dash/finance", label: "Overview" },
  { to: "/dash/finance/reports", label: "Reports" },
];

const PERIOD_OPTIONS = [
  { value: "monthly", label: "Monthly" },
  { value: "weekly", label: "Weekly" },
  { value: "semiannual", label: "Every 6 months" },
  { value: "yearly", label: "Yearly" },
];

export default function Report() {
  const [period, setPeriod] = useState("monthly");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function load() {
    setErr("");
    setLoading(true);
    try {
      const { data } = await api.get("/donations/report", {
        params: { period },
      });
      setRows(data.rows || []);
    } catch (e) {
      setErr(e.response?.data?.error || "Could not load report.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  const totalDonation = rows.reduce(
    (sum, r) => sum + Number(r.total_donations || 0),
    0
  );
  const totalMembership = rows.reduce(
    (sum, r) => sum + Number(r.total_membership || 0),
    0
  );

  function downloadCsv() {
    const header = "Period,Donations,Membership dues\n";
    const body = rows
      .map(
        (r) =>
          `${r.label},${Number(r.total_donations || 0).toFixed(
            2
          )},${Number(r.total_membership || 0).toFixed(2)}`
      )
      .join("\n");
    const blob = new Blob([header + body], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `donations-${period}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <DashboardLayout title="Reports" nav={NAV}>
      <div className="card" style={{ marginBottom: 16 }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: "1.1rem" }}>
              Donations & Membership Report
            </h2>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "#4b5873" }}>
              Totals based on successful online payments recorded in the
              donations table.
            </p>
          </div>
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => (window.location.href = "/donate")}
          >
            Public Donation Page
          </button>
        </div>
      </div>

      <div className="card">
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <label>
            Period:&nbsp;
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            >
              {PERIOD_OPTIONS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            className="btn btn-small"
            onClick={downloadCsv}
            disabled={!rows.length}
          >
            Download CSV
          </button>
        </div>

        {err && <div className="auth-banner">{err}</div>}
        {loading && <p>Loading…</p>}

        {!loading && (
          <>
            <div
              style={{
                display: "flex",
                gap: 16,
                flexWrap: "wrap",
                marginBottom: 16,
              }}
            >
              <div className="summary-tile">
                <div className="summary-label">Total donations</div>
                <div className="summary-value">
                  ${totalDonation.toFixed(2)}
                </div>
              </div>
              <div className="summary-tile">
                <div className="summary-label">Total membership dues</div>
                <div className="summary-value">
                  ${totalMembership.toFixed(2)}
                </div>
              </div>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Donations</th>
                  <th>Membership dues</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.label}>
                    <td>{r.label}</td>
                    <td>${Number(r.total_donations || 0).toFixed(2)}</td>
                    <td>${Number(r.total_membership || 0).toFixed(2)}</td>
                  </tr>
                ))}
                {!rows.length && !loading && (
                  <tr>
                    <td colSpan={3} style={{ textAlign: "center" }}>
                      No data yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
