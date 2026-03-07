import React, { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../../Shared/DashboardLayout";
import { financeApi } from "../../services/financeApi";

const NAV = [
  { to: "/dash/finance", label: "Dashboard" },
  { to: "/dash/finance/expenses", label: "Expenses" },
];

function money(cents) {
  if (cents == null) return "—";
  return `$${(Number(cents) / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function Expenses() {
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);

  const [status, setStatus] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 25;

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const [showNew, setShowNew] = useState(false);
  const [newItem, setNewItem] = useState({
    category: "",
    vendor: "",
    amount_usd: "",
    method: "card",
    ref_number: "",
    notes: "",
  });

  const query = useMemo(
    () => ({ page, pageSize, status, from, to, search }),
    [page, pageSize, status, from, to, search]
  );

  async function load() {
    setErr("");
    setLoading(true);
    try {
      const { data } = await financeApi.listExpenses(query);
      setRows(data.rows || []);
      setTotal(data.total || 0);
    } catch (e) {
      console.error(e);
      setErr(e.response?.data?.error || "Unable to load expenses");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  async function createExpense() {
    setErr("");
    try {
      const amountCents = Math.round(Number(newItem.amount_usd || 0) * 100);
      if (!newItem.category || !newItem.method || !Number.isFinite(amountCents) || amountCents <= 0) {
        setErr("Category, method, and a valid amount are required.");
        return;
      }

      await financeApi.createExpense({
        category: newItem.category,
        vendor: newItem.vendor || null,
        amount_cents: amountCents,
        method: newItem.method,
        ref_number: newItem.ref_number || null,
        notes: newItem.notes || null,
      });

      setShowNew(false);
      setNewItem({ category: "", vendor: "", amount_usd: "", method: "card", ref_number: "", notes: "" });
      setPage(1);
      await load();
    } catch (e) {
      console.error(e);
      setErr(e.response?.data?.error || "Unable to create expense");
    }
  }

  async function act(id, action) {
    setErr("");
    try {
      await financeApi.updateExpense(id, { action });
      await load();
    } catch (e) {
      console.error(e);
      setErr(e.response?.data?.error || "Unable to update expense");
    }
  }

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <DashboardLayout title="Expenses" nav={NAV}>
      {err ? <div className="auth-banner">{err}</div> : null}

      <div className="card" style={{ marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <label>
            Status:&nbsp;
            <select value={status} onChange={(e) => { setPage(1); setStatus(e.target.value); }}>
              <option value="">All</option>
              <option value="submitted">Submitted</option>
              <option value="approved">Approved</option>
              <option value="paid">Paid</option>
              <option value="rejected">Rejected</option>
              <option value="void">Void</option>
            </select>
          </label>

          <label>
            From:&nbsp;
            <input type="date" value={from} onChange={(e) => { setPage(1); setFrom(e.target.value); }} />
          </label>

          <label>
            To:&nbsp;
            <input type="date" value={to} onChange={(e) => { setPage(1); setTo(e.target.value); }} />
          </label>

          <label style={{ flex: 1, minWidth: 220 }}>
            Search:&nbsp;
            <input
              value={search}
              onChange={(e) => { setPage(1); setSearch(e.target.value); }}
              placeholder="vendor, category, method, ref, notes…"
              style={{ width: "100%" }}
            />
          </label>

          <button className="btn" type="button" onClick={() => setShowNew(true)}>
            + New Expense
          </button>
        </div>
      </div>

      {showNew ? (
        <div className="card" style={{ marginBottom: 12 }}>
          <h3 style={{ marginTop: 0 }}>Create Expense</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 10 }}>
            <label>
              Category *
              <input value={newItem.category} onChange={(e) => setNewItem((s) => ({ ...s, category: e.target.value }))} />
            </label>

            <label>
              Vendor
              <input value={newItem.vendor} onChange={(e) => setNewItem((s) => ({ ...s, vendor: e.target.value }))} />
            </label>

            <label>
              Amount (USD) *
              <input
                type="number"
                step="0.01"
                value={newItem.amount_usd}
                onChange={(e) => setNewItem((s) => ({ ...s, amount_usd: e.target.value }))}
              />
            </label>

            <label>
              Method *
              <select value={newItem.method} onChange={(e) => setNewItem((s) => ({ ...s, method: e.target.value }))}>
                <option value="card">Card</option>
                <option value="cash">Cash</option>
                <option value="check">Check</option>
                <option value="ach">ACH</option>
                <option value="other">Other</option>
              </select>
            </label>

            <label>
              Ref #
              <input value={newItem.ref_number} onChange={(e) => setNewItem((s) => ({ ...s, ref_number: e.target.value }))} />
            </label>

            <label>
              Notes
              <input value={newItem.notes} onChange={(e) => setNewItem((s) => ({ ...s, notes: e.target.value }))} />
            </label>
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 12 }}>
            <button className="btn" type="button" onClick={() => setShowNew(false)}>Cancel</button>
            <button className="btn btn-primary" type="button" onClick={createExpense}>Save</button>
          </div>
        </div>
      ) : null}

      <div className="card">
        {loading ? <p>Loading…</p> : null}

        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Vendor</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th style={{ width: 260 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((e) => (
              <tr key={e.id}>
                <td>{String(e.created_at || "").slice(0, 10) || "—"}</td>
                <td>{e.category}</td>
                <td>{e.vendor || "—"}</td>
                <td>{money(e.amount_cents)}</td>
                <td>{e.method}</td>
                <td>{e.status}</td>
                <td>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <button className="btn btn-small" type="button" onClick={() => act(e.id, "approve")} disabled={e.status !== "submitted"}>
                      Approve
                    </button>
                    <button className="btn btn-small" type="button" onClick={() => act(e.id, "reject")} disabled={e.status !== "submitted"}>
                      Reject
                    </button>
                    <button className="btn btn-small" type="button" onClick={() => act(e.id, "pay")} disabled={!["approved", "submitted"].includes(e.status)}>
                      Mark Paid
                    </button>
                    <button className="btn btn-small" type="button" onClick={() => act(e.id, "void")} disabled={e.status === "paid"}>
                      Void
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {!rows.length && !loading ? (
              <tr>
                <td colSpan={7} style={{ textAlign: "center" }}>No expenses found.</td>
              </tr>
            ) : null}
          </tbody>
        </table>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
          <div>Total: <strong>{total.toLocaleString()}</strong></div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button className="btn btn-small" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Prev</button>
            <span>Page <strong>{page}</strong> / {Math.max(1, totalPages)}</span>
            <button className="btn btn-small" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}