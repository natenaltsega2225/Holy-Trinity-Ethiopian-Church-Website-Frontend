//src/components/AdminDashboard/AuditLogs.jsx
// src/components/AdminDashboard/AuditLogs.jsx
import React, { useEffect, useState } from "react";
import api from "../api";

function statusBadge(code) {
  if (code >= 200 && code < 300) return "badge good";
  if (code >= 300 && code < 400) return "badge warn";
  return "badge bad";
}

export default function AuditLogs() {
  const [rows, setRows] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [total, setTotal] = useState(0);

  async function load(p = page, ps = pageSize, search = q) {
    setLoading(true);
    setMsg("");
    try {
      const { data } = await api.get(
        `/admin/audit?search=${encodeURIComponent(search)}&page=${p}&pageSize=${ps}`
      );
      setRows(data.rows || []);
      setTotal(data.total || 0);
    } catch (e) {
      console.error(e);
      setMsg(e?.response?.data?.error || "Failed to load audit logs");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(1, pageSize, "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div>
      <h2 className="dash-title" style={{ marginBottom: 8 }}>Audit Logs</h2>
      <div style={{ color: "var(--dash-muted)", fontWeight: 850, marginBottom: 12 }}>
        System actions by user/time/IP (searchable).
      </div>

      {msg ? <div className="auth-banner" style={{ marginBottom: 12 }}>{msg}</div> : null}

      <form
        className="dash-toolbar"
        onSubmit={async (e) => {
          e.preventDefault();
          setPage(1);
          await load(1, pageSize, q);
        }}
      >
        <div className="dash-toolbar-left">
          <input
            className="dash-input"
            style={{ width: 520, maxWidth: "75vw" }}
            placeholder="Search action, path, method, ip, user..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button className="dash-btn dash-btn-primary" type="submit">Search</button>
          <button
            className="dash-btn dash-btn-ghost"
            type="button"
            onClick={async () => {
              setQ("");
              setPage(1);
              await load(1, pageSize, "");
            }}
          >
            Reset
          </button>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span className="badge">Page size</span>
          <select
            className="dash-select"
            style={{ width: 120, height: 38 }}
            value={pageSize}
            onChange={async (e) => {
              const ps = Number(e.target.value);
              setPageSize(ps);
              setPage(1);
              await load(1, ps, q);
            }}
          >
            {[10, 25, 50, 100].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </form>

      <div className="dash-table-wrap">
        <div className="dash-table-scroll" style={{ maxHeight: 560 }}>
          <table className="dash-table">
            <thead>
              <tr>
                <th style={{ width: 160 }}>Time</th>
                <th style={{ width: 220 }}>Actor</th>
                <th style={{ width: 110 }}>Role</th>
                <th style={{ width: 170 }}>IP</th>
                <th style={{ width: 110 }}>Method</th>
                <th>Path</th>
                <th style={{ width: 120 }}>Status</th>
                <th style={{ width: 260 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="8" style={{ padding: 16, color: "var(--dash-muted)" }}>Loading…</td></tr>
              ) : null}

              {rows.map((r) => (
                <tr key={r.id}>
                  <td className="mono">{String(r.created_at || "").replace("T", " ").slice(0, 19)}</td>
                  <td style={{ fontWeight: 950 }}>{r.actor || "—"}</td>
                  <td><span className="badge">{r.actor_role || "—"}</span></td>
                  <td className="mono">{r.ip || "—"}</td>
                  <td className="mono"><span className="badge">{(r.method || "—").toUpperCase()}</span></td>
                  <td className="mono">{r.path || "—"}</td>
                  <td><span className={statusBadge(Number(r.status || 0))}>{r.status ?? "—"}</span></td>
                  <td className="mono">{r.action || "—"}</td>
                </tr>
              ))}

              {!loading && !rows.length ? (
                <tr><td colSpan="8" style={{ padding: 16, color: "var(--dash-muted)" }}>No records found</td></tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="dash-pager">
          <button
            className="dash-btn dash-btn-ghost"
            disabled={!canPrev}
            onClick={async () => {
              const p = page - 1;
              setPage(p);
              await load(p, pageSize, q);
            }}
          >
            ← Prev
          </button>

          <div className="meta">
            Page {page} / {totalPages} • Total {total}
          </div>

          <button
            className="dash-btn dash-btn-primary"
            disabled={!canNext}
            onClick={async () => {
              const p = page + 1;
              setPage(p);
              await load(p, pageSize, q);
            }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}