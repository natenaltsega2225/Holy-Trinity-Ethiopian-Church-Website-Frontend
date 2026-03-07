// src/components/finance/pages/Overview.jsx
import React, { useEffect, useState } from "react";
import api from "../../api";

export default function Overview() {
  const [metrics, setMetrics] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setErr("");
      setLoading(true);
      try {
        const { data } = await api.get("/finance/metrics");
        setMetrics(data || null);
      } catch (e) {
        setMetrics(null);
        setErr(e?.response?.data?.error || "Failed to load finance metrics");
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
        Overview
      </div>

      {loading ? (
        <div style={{ padding: 12 }}>Loading…</div>
      ) : (
        <div className="dash-grid-3">
          <div className="dash-card">
            <div className="dash-label">Total Donations (YTD)</div>
            <div style={{ fontSize: 24, fontWeight: 950 }}>
              ${Number(metrics?.donations_ytd || 0).toLocaleString()}
            </div>
          </div>

          <div className="dash-card">
            <div className="dash-label">Membership Dues (YTD)</div>
            <div style={{ fontSize: 24, fontWeight: 950 }}>
              ${Number(metrics?.dues_ytd || 0).toLocaleString()}
            </div>
          </div>

          <div className="dash-card">
            <div className="dash-label">Expenses (YTD)</div>
            <div style={{ fontSize: 24, fontWeight: 950 }}>
              ${Number(metrics?.expenses_ytd || 0).toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
