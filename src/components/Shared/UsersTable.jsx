

// src/components/Shared/UsersTable.jsx
import React, { useEffect, useMemo, useState } from "react";
import api from "../api";

const ROLES = ["member", "finance", "admin"];

const emptyCreate = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  address_line1: "",
  address_line2: "",
  city: "",
  state: "",
  zip: "",
  role: "member",
  password: "",
};

export default function UsersTable({
  endpoint = "/admin/users",
  canCreate = false,
  canEditRole = false,
  canDelete = false,
  showAddress = true,
  showBilling = false,
  stickyHeader = true,
}) {
  const [rows, setRows] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // search + pagination
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [total, setTotal] = useState(0);

  // create collapse
  const [createOpen, setCreateOpen] = useState(false);
  const [create, setCreate] = useState(emptyCreate);
  const [createBusy, setCreateBusy] = useState(false);

  // edit modal
  const [editing, setEditing] = useState(null);
  const [editBusy, setEditBusy] = useState(false);

  const totalPages = Math.max(1, Math.ceil((total || 0) / pageSize));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const load = async (p = page, ps = pageSize, q = search) => {
    setLoading(true);
    setMsg("");
    try {
      const { data } = await api.get(
        `${endpoint}?search=${encodeURIComponent(q)}&page=${p}&pageSize=${ps}`
      );

      setRows(data?.rows || []);
      setTotal(Number(data?.total || 0));
    } catch (e) {
      console.error(e);
      setRows([]);
      setTotal(0);
      setMsg(e?.response?.data?.error || "Failed to load members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(1, pageSize, "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rowsById = useMemo(() => {
    const m = new Map();
    rows.forEach((r) => m.set(r.id, r));
    return m;
  }, [rows]);

  const resetSearch = async () => {
    setSearch("");
    setPage(1);
    await load(1, pageSize, "");
  };

  const submitSearch = async (e) => {
    e.preventDefault();
    setPage(1);
    await load(1, pageSize, search);
  };

  const onChangePageSize = async (ps) => {
    setPageSize(ps);
    setPage(1);
    await load(1, ps, search);
  };

  const openEdit = (u) => {
    setMsg("");
    setEditing({
      id: u.id,
      first_name: u.first_name || "",
      last_name: u.last_name || "",
      email: u.email || "",
      phone: u.phone || "",
      address_line1: u.address_line1 || "",
      address_line2: u.address_line2 || "",
      city: u.city || "",
      state: u.state || "",
      zip: u.zip || "",
      is_active: Number(u.is_active ?? 1),
    });
  };

  const closeEdit = () => setEditing(null);

  const saveEdit = async () => {
    if (!editing?.id) return;
    setEditBusy(true);
    setMsg("");
    try {
      await api.put(`/admin/users/${editing.id}`, {
        first_name: editing.first_name.trim(),
        last_name: editing.last_name.trim(),
        email: editing.email.trim(),
        phone: editing.phone?.trim() || null,
        address_line1: editing.address_line1?.trim() || null,
        address_line2: editing.address_line2?.trim() || null,
        city: editing.city?.trim() || null,
        state: editing.state?.trim() || null,
        zip: editing.zip?.trim() || null,
        is_active: Number(editing.is_active) ? 1 : 0,
      });

      setMsg("✅ Member updated");
      setEditing(null);
      await load(page, pageSize, search);
    } catch (e) {
      console.error(e);
      setMsg(e?.response?.data?.error || "Update failed");
    } finally {
      setEditBusy(false);
    }
  };

  const saveRole = async (id, role) => {
    setMsg("");
    try {
      await api.patch(`/admin/users/${id}/role`, { role });
      setMsg("✅ Role updated");
      await load(page, pageSize, search);
    } catch (e) {
      console.error(e);
      setMsg(e?.response?.data?.error || "Role update failed");
    }
  };

  const doDelete = async (id) => {
    const ok = window.confirm("Delete this member? This cannot be undone.");
    if (!ok) return;

    setMsg("");
    try {
      await api.delete(`/admin/users/${id}`);
      setMsg("✅ Member deleted");

      // if we deleted the last row on the page, go back one page safely
      const nextPage = rows.length === 1 && page > 1 ? page - 1 : page;
      setPage(nextPage);
      await load(nextPage, pageSize, search);
    } catch (e) {
      console.error(e);
      setMsg(e?.response?.data?.error || "Delete failed");
    }
  };

  const createUser = async (e) => {
    e.preventDefault();
    if (!canCreate) return;

    setCreateBusy(true);
    setMsg("");

    try {
      await api.post(`/admin/users`, {
        first_name: create.first_name.trim(),
        last_name: create.last_name.trim(),
        email: create.email.trim(),
        phone: create.phone?.trim() || null,
        address_line1: create.address_line1?.trim() || null,
        address_line2: create.address_line2?.trim() || null,
        city: create.city?.trim() || null,
        state: create.state?.trim() || null,
        zip: create.zip?.trim() || null,
        role: create.role,
        password: create.password,
      });

      setMsg("✅ User created");
      setCreate(emptyCreate);
      setCreateOpen(false);

      setPage(1);
      await load(1, pageSize, search);
    } catch (e2) {
      console.error(e2);
      setMsg(e2?.response?.data?.error || "Create user failed");
    } finally {
      setCreateBusy(false);
    }
  };

  return (
    <div>
      {msg ? (
        <div className="auth-banner" style={{ marginBottom: 12 }}>
          {msg}
        </div>
      ) : null}

      {/* Toolbar */}
      <form className="dash-toolbar" onSubmit={submitSearch}>
        <div className="dash-toolbar-left">
          <input
            className="dash-input"
            style={{ width: 520, maxWidth: "75vw" }}
            placeholder="Search name/email/phone/city/state/zip..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="dash-btn dash-btn-primary" type="submit">
            Search
          </button>
          <button className="dash-btn dash-btn-ghost" type="button" onClick={resetSearch}>
            Reset
          </button>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span className="badge">Page size</span>
          <select
            className="dash-select"
            style={{ width: 120, height: 38 }}
            value={pageSize}
            onChange={(e) => onChangePageSize(Number(e.target.value))}
          >
            {[10, 25, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </form>

      {/* Create (collapsible) */}
      {canCreate ? (
        <div className="dash-collapse" style={{ marginBottom: 14 }}>
          <div
            className="dash-collapse-head"
            onClick={() => setCreateOpen((v) => !v)}
            role="button"
            tabIndex={0}
          >
            <div className="dash-collapse-title">Create member</div>
            <div className="dash-collapse-toggle">{createOpen ? "–" : "+"}</div>
          </div>

          <div className={`dash-collapse-body ${createOpen ? "" : "collapsed"}`}>
            <form className="dash-form compact" onSubmit={createUser}>
              <div className="dash-grid-2">
                <div className="dash-field">
                  <div className="dash-label">First name</div>
                  <input
                    className="dash-input"
                    value={create.first_name}
                    onChange={(e) => setCreate((p) => ({ ...p, first_name: e.target.value }))}
                    required
                  />
                </div>
                <div className="dash-field">
                  <div className="dash-label">Last name</div>
                  <input
                    className="dash-input"
                    value={create.last_name}
                    onChange={(e) => setCreate((p) => ({ ...p, last_name: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="dash-grid-2">
                <div className="dash-field">
                  <div className="dash-label">Email</div>
                  <input
                    className="dash-input"
                    type="email"
                    value={create.email}
                    onChange={(e) => setCreate((p) => ({ ...p, email: e.target.value }))}
                    required
                  />
                </div>
                <div className="dash-field">
                  <div className="dash-label">Role</div>
                  <select
                    className="dash-select"
                    value={create.role}
                    onChange={(e) => setCreate((p) => ({ ...p, role: e.target.value }))}
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="dash-grid-2">
                <div className="dash-field">
                  <div className="dash-label">Phone</div>
                  <input
                    className="dash-input"
                    value={create.phone}
                    onChange={(e) => setCreate((p) => ({ ...p, phone: e.target.value }))}
                    placeholder="+1 615..."
                  />
                </div>
                <div className="dash-field">
                  <div className="dash-label">Temp password (12+ chars)</div>
                  <input
                    className="dash-input"
                    type="password"
                    autoComplete="new-password"
                    value={create.password}
                    onChange={(e) => setCreate((p) => ({ ...p, password: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="dash-field">
                <div className="dash-label">Address 1</div>
                <input
                  className="dash-input"
                  value={create.address_line1}
                  onChange={(e) => setCreate((p) => ({ ...p, address_line1: e.target.value }))}
                />
              </div>

              <div className="dash-field">
                <div className="dash-label">Address 2</div>
                <input
                  className="dash-input"
                  value={create.address_line2}
                  onChange={(e) => setCreate((p) => ({ ...p, address_line2: e.target.value }))}
                />
              </div>

              <div className="dash-grid-3">
                <div className="dash-field">
                  <div className="dash-label">City</div>
                  <input
                    className="dash-input"
                    value={create.city}
                    onChange={(e) => setCreate((p) => ({ ...p, city: e.target.value }))}
                  />
                </div>
                <div className="dash-field">
                  <div className="dash-label">State</div>
                  <input
                    className="dash-input"
                    value={create.state}
                    onChange={(e) => setCreate((p) => ({ ...p, state: e.target.value }))}
                  />
                </div>
                <div className="dash-field">
                  <div className="dash-label">ZIP</div>
                  <input
                    className="dash-input"
                    value={create.zip}
                    onChange={(e) => setCreate((p) => ({ ...p, zip: e.target.value }))}
                  />
                </div>
              </div>

              <div className="dash-form-actions">
                <button
                  className="dash-btn dash-btn-ghost"
                  type="button"
                  onClick={() => setCreateOpen(false)}
                >
                  Close
                </button>

                <button className="dash-btn dash-btn-primary" type="submit" disabled={createBusy}>
                  {createBusy ? "Creating…" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {/* Table */}
      <div className="dash-table-wrap">
        <div className="dash-table-scroll" style={{ maxHeight: 560 }}>
          <table className="dash-table">
            <thead>
              <tr>
                <th style={{ width: 240 }}>Name</th>
                <th>Email</th>
                <th style={{ width: 170 }}>Phone</th>
                {showAddress ? <th style={{ width: 320 }}>Address</th> : null}
                <th style={{ width: 160 }}>Role</th>
                {showBilling ? <th style={{ width: 160 }}>Billing</th> : null}
                {showBilling ? <th style={{ width: 120 }}>Paid</th> : null}
                <th style={{ width: 260, textAlign: "right" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={showBilling ? 8 : showAddress ? 6 : 5} style={{ padding: 16 }}>
                    Loading…
                  </td>
                </tr>
              ) : null}

              {!loading && rows.length === 0 ? (
                <tr>
                  <td colSpan={showBilling ? 8 : showAddress ? 6 : 5} style={{ padding: 16 }}>
                    No members found.
                  </td>
                </tr>
              ) : null}

              {rows.map((u) => {
                const addressParts = [
                  u.address_line1,
                  u.address_line2,
                  u.city,
                  u.state,
                  u.zip,
                ].filter(Boolean);

                return (
                  <tr key={u.id}>
                    <td style={{ fontWeight: 950 }}>
                      {u.first_name} {u.last_name}
                    </td>
                    <td>{u.email}</td>
                    <td>{u.phone || <span style={{ color: "var(--dash-muted)" }}>—</span>}</td>

                    {showAddress ? (
                      <td style={{ color: u.address_line1 ? "var(--dash-text)" : "var(--dash-muted)" }}>
                        {addressParts.length ? addressParts.join(", ") : "—"}
                      </td>
                    ) : null}

                    <td>
                      {canEditRole ? (
                        <select
                          className="dash-select"
                          style={{ height: 34 }}
                          value={u.role}
                          onChange={(e) => {
                            const role = e.target.value;
                            setRows((prev) =>
                              prev.map((x) => (x.id === u.id ? { ...x, role } : x))
                            );
                          }}
                        >
                          {ROLES.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                      ) : (
                        u.role
                      )}
                    </td>

                    {showBilling ? <td>{u.cadence_months ? `${u.cadence_months} mo` : "—"}</td> : null}
                    {showBilling ? <td>{u.paid_status || "—"}</td> : null}

                    <td>
                      <div className="dash-actions">
                        {canEditRole ? (
                          <button className="dash-btn dash-btn-primary" onClick={() => saveRole(u.id, u.role)}>
                            Save role
                          </button>
                        ) : null}

                        <button
                          className="dash-btn dash-btn-ghost"
                          onClick={() => openEdit(rowsById.get(u.id) || u)}
                        >
                          Edit
                        </button>

                        {canDelete ? (
                          <button
                            className="dash-btn dash-btn-ghost"
                            onClick={() => doDelete(u.id)}
                            style={{ borderColor: "rgba(239,68,68,0.35)", color: "#b91c1c" }}
                          >
                            Delete
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="dash-pager">
          <button
            className="dash-btn dash-btn-ghost"
            disabled={!canPrev}
            onClick={async () => {
              const p = page - 1;
              setPage(p);
              await load(p, pageSize, search);
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
              await load(p, pageSize, search);
            }}
          >
            Next →
          </button>
        </div>
      </div>

      {/* Edit modal */}
      {editing ? (
        <div className="dash-modal-overlay" role="dialog" aria-modal="true">
          <div className="dash-modal">
            <div className="dash-modal-head">
              <h3 className="dash-modal-title">Edit Member</h3>
              <button className="dash-modal-close" onClick={closeEdit} aria-label="Close">
                ✕
              </button>
            </div>

            <div className="dash-modal-body">
              <div className="dash-form compact">
                <div className="dash-grid-2">
                  <div className="dash-field">
                    <div className="dash-label">First name</div>
                    <input
                      className="dash-input"
                      value={editing.first_name}
                      onChange={(e) => setEditing((p) => ({ ...p, first_name: e.target.value }))}
                    />
                  </div>

                  <div className="dash-field">
                    <div className="dash-label">Last name</div>
                    <input
                      className="dash-input"
                      value={editing.last_name}
                      onChange={(e) => setEditing((p) => ({ ...p, last_name: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="dash-grid-2">
                  <div className="dash-field">
                    <div className="dash-label">Email</div>
                    <input
                      className="dash-input"
                      value={editing.email}
                      onChange={(e) => setEditing((p) => ({ ...p, email: e.target.value }))}
                    />
                  </div>

                  <div className="dash-field">
                    <div className="dash-label">Phone</div>
                    <input
                      className="dash-input"
                      value={editing.phone}
                      onChange={(e) => setEditing((p) => ({ ...p, phone: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="dash-field">
                  <div className="dash-label">Address 1</div>
                  <input
                    className="dash-input"
                    value={editing.address_line1}
                    onChange={(e) => setEditing((p) => ({ ...p, address_line1: e.target.value }))}
                  />
                </div>

                <div className="dash-field">
                  <div className="dash-label">Address 2</div>
                  <input
                    className="dash-input"
                    value={editing.address_line2}
                    onChange={(e) => setEditing((p) => ({ ...p, address_line2: e.target.value }))}
                  />
                </div>

                <div className="dash-grid-3">
                  <div className="dash-field">
                    <div className="dash-label">City</div>
                    <input
                      className="dash-input"
                      value={editing.city}
                      onChange={(e) => setEditing((p) => ({ ...p, city: e.target.value }))}
                    />
                  </div>

                  <div className="dash-field">
                    <div className="dash-label">State</div>
                    <input
                      className="dash-input"
                      value={editing.state}
                      onChange={(e) => setEditing((p) => ({ ...p, state: e.target.value }))}
                    />
                  </div>

                  <div className="dash-field">
                    <div className="dash-label">ZIP</div>
                    <input
                      className="dash-input"
                      value={editing.zip}
                      onChange={(e) => setEditing((p) => ({ ...p, zip: e.target.value }))}
                    />
                  </div>
                </div>

                <label style={{ display: "flex", gap: 10, alignItems: "center", fontWeight: 950 }}>
                  <input
                    type="checkbox"
                    checked={Number(editing.is_active) === 1}
                    onChange={(e) =>
                      setEditing((p) => ({ ...p, is_active: e.target.checked ? 1 : 0 }))
                    }
                  />
                  Active account
                </label>

                <div className="dash-form-actions">
                  <button className="dash-btn dash-btn-ghost" onClick={closeEdit}>
                    Cancel
                  </button>
                  <button className="dash-btn dash-btn-primary" onClick={saveEdit} disabled={editBusy}>
                    {editBusy ? "Saving…" : "Save changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}