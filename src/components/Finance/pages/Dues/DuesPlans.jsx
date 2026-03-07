// src/components/Finance/pages/Dues/DuesPlans.jsx
import React, { useEffect, useState } from "react";
import api from "../../../api"; // src/components/api.js

export default function DuesPlans() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      setErr("");
      try {
        const { data } = await api.get("/finance/dues-plans");
        setRows(data?.rows || data?.plans || []);
      } catch (e) {
        console.error(e);
        setRows([]);
        setErr(e?.response?.data?.error || "Failed to load dues plans");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      {err ? (
        <div className="auth-banner" style={{ marginBottom: 12 }}>
          {err}
        </div>
      ) : null}

      <div className="dash-title" style={{ marginBottom: 10 }}>
        Membership Dues Plans
      </div>

      <div className="dash-table-wrap">
        <div className="dash-table-scroll" style={{ maxHeight: 560 }}>
          <table className="dash-table">
            <thead>
              <tr>
                <th style={{ width: 260 }}>Plan</th>
                <th style={{ width: 140 }}>Months</th>
                <th style={{ width: 180 }}>Min Amount</th>
                <th style={{ width: 180 }}>Default Amount</th>
                <th style={{ width: 120 }}>Active</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} style={{ padding: 16 }}>
                    Loading…
                  </td>
                </tr>
              ) : rows.length ? (
                rows.map((p) => (
                  <tr key={p.id ?? p.code}>
                    <td style={{ fontWeight: 950 }}>{p.label || p.code || "—"}</td>
                    <td>{p.months ?? "—"}</td>
                    <td>
                      {typeof p.min_amount_cents !== "undefined"
                        ? `$${(Number(p.min_amount_cents || 0) / 100).toLocaleString()}`
                        : "—"}
                    </td>
                    <td>
                      {typeof p.default_amount_cents !== "undefined"
                        ? `$${(Number(p.default_amount_cents || 0) / 100).toLocaleString()}`
                        : "—"}
                    </td>
                    <td>{Number(p.active ?? 1) ? "Yes" : "No"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ padding: 16 }}>
                    No plans found.
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