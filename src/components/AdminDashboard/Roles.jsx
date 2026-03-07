

// // src/components/AdminDashboard/Roles.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import api from "../api";

// const ROLES = ["member", "finance", "admin"];

// const emptyForm = {
//   first_name: "",
//   last_name: "",
//   email: "",
//   phone: "",
//   address_line1: "",
//   address_line2: "",
//   city: "",
//   state: "",
//   zip: "",
//   password: "",
//   role: "member",
// };

// export default function Roles() {
//   const [rows, setRows] = useState([]);
//   const [msg, setMsg] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Create form
//   const [form, setForm] = useState(emptyForm);
//   const [createOpen, setCreateOpen] = useState(false); // ✅ collapse state

//   // Edit modal state
//   const [editing, setEditing] = useState(null);
//   const [editBusy, setEditBusy] = useState(false);

//   async function loadUsers() {
//     setLoading(true);
//     setMsg("");
//     try {
//       const res = await api.get("/admin/users?search=&page=1&pageSize=200");
//       setRows(res.data.rows || []);
//     } catch (e) {
//       console.error(e);
//       setMsg(e?.response?.data?.error || "Failed to load users");
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     loadUsers();
//   }, []);

//   async function createUser(e) {
//     e.preventDefault();
//     setMsg("");

//     try {
//       await api.post("/admin/users", {
//         first_name: form.first_name.trim(),
//         last_name: form.last_name.trim(),
//         email: form.email.trim(),
//         phone: form.phone?.trim() || null,
//         address_line1: form.address_line1?.trim() || null,
//         address_line2: form.address_line2?.trim() || null,
//         city: form.city?.trim() || null,
//         state: form.state?.trim() || null,
//         zip: form.zip?.trim() || null,
//         password: form.password,
//         role: form.role,
//       });

//       setMsg("✅ User created");
//       setForm(emptyForm);
//       setCreateOpen(false); // ✅ collapse after create
//       await loadUsers();
//     } catch (e2) {
//       console.error(e2);
//       setMsg(e2?.response?.data?.error || "Create user failed");
//     }
//   }

//   async function saveRole(id, role) {
//     setMsg("");
//     try {
//       await api.patch(`/admin/users/${id}/role`, { role });
//       setMsg("✅ Role updated");
//       await loadUsers();
//     } catch (e) {
//       console.error(e);
//       setMsg(e?.response?.data?.error || "Role update failed");
//     }
//   }

//   function openEdit(u) {
//     setEditing({
//       id: u.id,
//       first_name: u.first_name || "",
//       last_name: u.last_name || "",
//       email: u.email || "",
//       phone: u.phone || "",
//       address_line1: u.address_line1 || "",
//       address_line2: u.address_line2 || "",
//       city: u.city || "",
//       state: u.state || "",
//       zip: u.zip || "",
//       is_active: Number(u.is_active ?? 1),
//     });
//     setMsg("");
//   }

//   function closeEdit() {
//     setEditing(null);
//   }

//   async function saveEdit() {
//     if (!editing?.id) return;

//     setEditBusy(true);
//     setMsg("");
//     try {
//       await api.put(`/admin/users/${editing.id}`, {
//         first_name: editing.first_name.trim(),
//         last_name: editing.last_name.trim(),
//         email: editing.email.trim(),
//         phone: editing.phone?.trim() || null,
//         address_line1: editing.address_line1?.trim() || null,
//         address_line2: editing.address_line2?.trim() || null,
//         city: editing.city?.trim() || null,
//         state: editing.state?.trim() || null,
//         zip: editing.zip?.trim() || null,
//         is_active: Number(editing.is_active) ? 1 : 0,
//       });

//       setMsg("✅ Member updated");
//       setEditing(null);
//       await loadUsers();
//     } catch (e) {
//       console.error(e);
//       setMsg(e?.response?.data?.error || "Update failed");
//     } finally {
//       setEditBusy(false);
//     }
//   }

//   const rowsById = useMemo(() => {
//     const m = new Map();
//     rows.forEach((r) => m.set(r.id, r));
//     return m;
//   }, [rows]);

//   return (
//     <div>
//       <h2 className="dash-title" style={{ marginBottom: 10 }}>
//         Roles & Member Management
//       </h2>

//       {msg ? <div className="auth-banner" style={{ marginBottom: 12 }}>{msg}</div> : null}

//       {/* ✅ Collapsible Create Panel */}
//       <div className="dash-collapse" style={{ marginBottom: 14 }}>
//         <div
//           className="dash-collapse-head"
//           onClick={() => setCreateOpen((v) => !v)}
//           role="button"
//           tabIndex={0}
//         >
//           <div className="dash-collapse-title">Create member</div>
//           <div className="dash-collapse-toggle">{createOpen ? "–" : "+"}</div>
//         </div>

//         <div className={`dash-collapse-body ${createOpen ? "" : "collapsed"}`}>
//           <form className="dash-form compact" onSubmit={createUser}>
//             <div className="dash-grid-2">
//               <div className="dash-field">
//                 <div className="dash-label">First name</div>
//                 <input
//                   className="dash-input"
//                   value={form.first_name}
//                   onChange={(e) => setForm((p) => ({ ...p, first_name: e.target.value }))}
//                   required
//                 />
//               </div>
//               <div className="dash-field">
//                 <div className="dash-label">Last name</div>
//                 <input
//                   className="dash-input"
//                   value={form.last_name}
//                   onChange={(e) => setForm((p) => ({ ...p, last_name: e.target.value }))}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="dash-grid-2">
//               <div className="dash-field">
//                 <div className="dash-label">Email</div>
//                 <input
//                   className="dash-input"
//                   type="email"
//                   value={form.email}
//                   onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
//                   required
//                 />
//               </div>

//               <div className="dash-field">
//                 <div className="dash-label">Role</div>
//                 <select
//                   className="dash-select"
//                   value={form.role}
//                   onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
//                 >
//                   {ROLES.map((r) => (
//                     <option key={r} value={r}>{r}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div className="dash-grid-2">
//               <div className="dash-field">
//                 <div className="dash-label">Phone</div>
//                 <input
//                   className="dash-input"
//                   value={form.phone}
//                   onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
//                   placeholder="+1 615..."
//                 />
//               </div>

//               <div className="dash-field">
//                 <div className="dash-label">Temp password (12+ chars)</div>
//                 <input
//                   className="dash-input"
//                   type="password"
//                   autoComplete="new-password"
//                   value={form.password}
//                   onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="dash-field">
//               <div className="dash-label">Address 1</div>
//               <input
//                 className="dash-input"
//                 value={form.address_line1}
//                 onChange={(e) => setForm((p) => ({ ...p, address_line1: e.target.value }))}
//               />
//             </div>

//             <div className="dash-field">
//               <div className="dash-label">Address 2</div>
//               <input
//                 className="dash-input"
//                 value={form.address_line2}
//                 onChange={(e) => setForm((p) => ({ ...p, address_line2: e.target.value }))}
//               />
//             </div>

//             <div className="dash-grid-3">
//               <div className="dash-field">
//                 <div className="dash-label">City</div>
//                 <input
//                   className="dash-input"
//                   value={form.city}
//                   onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
//                 />
//               </div>
//               <div className="dash-field">
//                 <div className="dash-label">State</div>
//                 <input
//                   className="dash-input"
//                   value={form.state}
//                   onChange={(e) => setForm((p) => ({ ...p, state: e.target.value }))}
//                 />
//               </div>
//               <div className="dash-field">
//                 <div className="dash-label">ZIP</div>
//                 <input
//                   className="dash-input"
//                   value={form.zip}
//                   onChange={(e) => setForm((p) => ({ ...p, zip: e.target.value }))}
//                 />
//               </div>
//             </div>

//             <div className="dash-form-actions">
//               <button className="dash-btn dash-btn-ghost" type="button" onClick={() => setCreateOpen(false)}>
//                 Close
//               </button>
//               <button className="dash-btn dash-btn-primary" type="submit">
//                 Create
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* Members table */}
//       <div className="dash-section-title">Members</div>
//       {loading ? <p>Loading…</p> : null}

//       <div className="dash-table-wrap">
//         <table className="dash-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Role</th>
//               <th>Active</th>
//               <th style={{ textAlign: "right" }}>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {rows.map((u) => (
//               <tr key={u.id}>
//                 <td style={{ fontWeight: 900 }}>
//                   {u.first_name} {u.last_name}
//                 </td>
//                 <td>{u.email}</td>
//                 <td>{u.phone || <span style={{ color: "var(--dash-muted)" }}>—</span>}</td>

//                 <td>
//                   <select
//                     className="dash-select"
//                     style={{ height: 34 }}
//                     value={u.role}
//                     onChange={(e) => {
//                       const newRole = e.target.value;
//                       setRows((prev) =>
//                         prev.map((x) => (x.id === u.id ? { ...x, role: newRole } : x))
//                       );
//                     }}
//                   >
//                     {ROLES.map((r) => (
//                       <option key={r} value={r}>{r}</option>
//                     ))}
//                   </select>
//                 </td>

//                 <td>{Number(u.is_active ?? 1) ? "Yes" : "No"}</td>

//                 <td>
//                   <div className="dash-actions">
//                     <button className="dash-btn dash-btn-primary" onClick={() => saveRole(u.id, u.role)}>
//                       Save role
//                     </button>
//                     <button className="dash-btn dash-btn-ghost" onClick={() => openEdit(rowsById.get(u.id) || u)}>
//                       Edit
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}

//             {!rows.length ? (
//               <tr>
//                 <td colSpan="6" style={{ color: "var(--dash-muted)", padding: 16 }}>
//                   No members found
//                 </td>
//               </tr>
//             ) : null}
//           </tbody>
//         </table>
//       </div>

//       {/* Edit Modal */}
//       {editing ? (
//         <div className="dash-modal-overlay" role="dialog" aria-modal="true">
//           <div className="dash-modal">
//             <div className="dash-modal-head">
//               <h3 className="dash-modal-title">Edit Member #{editing.id}</h3>
//               <button className="dash-modal-close" onClick={closeEdit} aria-label="Close">
//                 ✕
//               </button>
//             </div>

//             <div className="dash-modal-body">
//               <div className="dash-form compact">
//                 <div className="dash-grid-2">
//                   <div className="dash-field">
//                     <div className="dash-label">First name</div>
//                     <input
//                       className="dash-input"
//                       value={editing.first_name}
//                       onChange={(e) => setEditing((p) => ({ ...p, first_name: e.target.value }))}
//                     />
//                   </div>
//                   <div className="dash-field">
//                     <div className="dash-label">Last name</div>
//                     <input
//                       className="dash-input"
//                       value={editing.last_name}
//                       onChange={(e) => setEditing((p) => ({ ...p, last_name: e.target.value }))}
//                     />
//                   </div>
//                 </div>

//                 <div className="dash-grid-2">
//                   <div className="dash-field">
//                     <div className="dash-label">Email</div>
//                     <input
//                       className="dash-input"
//                       value={editing.email}
//                       onChange={(e) => setEditing((p) => ({ ...p, email: e.target.value }))}
//                     />
//                   </div>
//                   <div className="dash-field">
//                     <div className="dash-label">Phone</div>
//                     <input
//                       className="dash-input"
//                       value={editing.phone}
//                       onChange={(e) => setEditing((p) => ({ ...p, phone: e.target.value }))}
//                     />
//                   </div>
//                 </div>

//                 <div className="dash-field">
//                   <div className="dash-label">Address 1</div>
//                   <input
//                     className="dash-input"
//                     value={editing.address_line1}
//                     onChange={(e) => setEditing((p) => ({ ...p, address_line1: e.target.value }))}
//                   />
//                 </div>

//                 <div className="dash-field">
//                   <div className="dash-label">Address 2</div>
//                   <input
//                     className="dash-input"
//                     value={editing.address_line2}
//                     onChange={(e) => setEditing((p) => ({ ...p, address_line2: e.target.value }))}
//                   />
//                 </div>

//                 <div className="dash-grid-3">
//                   <div className="dash-field">
//                     <div className="dash-label">City</div>
//                     <input
//                       className="dash-input"
//                       value={editing.city}
//                       onChange={(e) => setEditing((p) => ({ ...p, city: e.target.value }))}
//                     />
//                   </div>
//                   <div className="dash-field">
//                     <div className="dash-label">State</div>
//                     <input
//                       className="dash-input"
//                       value={editing.state}
//                       onChange={(e) => setEditing((p) => ({ ...p, state: e.target.value }))}
//                     />
//                   </div>
//                   <div className="dash-field">
//                     <div className="dash-label">ZIP</div>
//                     <input
//                       className="dash-input"
//                       value={editing.zip}
//                       onChange={(e) => setEditing((p) => ({ ...p, zip: e.target.value }))}
//                     />
//                   </div>
//                 </div>

//                 <label style={{ display: "flex", gap: 10, alignItems: "center", fontWeight: 900 }}>
//                   <input
//                     type="checkbox"
//                     checked={Number(editing.is_active) === 1}
//                     onChange={(e) => setEditing((p) => ({ ...p, is_active: e.target.checked ? 1 : 0 }))}
//                   />
//                   Active account
//                 </label>

//                 <div className="dash-form-actions">
//                   <button className="dash-btn dash-btn-ghost" onClick={closeEdit}>
//                     Cancel
//                   </button>
//                   <button className="dash-btn dash-btn-primary" onClick={saveEdit} disabled={editBusy}>
//                     {editBusy ? "Saving…" : "Save changes"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : null}
//     </div>
//   );
// }

// src/components/AdminDashboard/Roles.jsx
import React, { useEffect, useMemo, useState } from "react";
import api from "../api";

const ROLES = ["member", "finance", "admin"];

const emptyForm = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  address_line1: "",
  address_line2: "",
  city: "",
  state: "",
  zip: "",
  password: "",
  role: "member",
};

export default function Roles() {
  const [rows, setRows] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // server-side search + pagination
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [total, setTotal] = useState(0);

  // Create form
  const [form, setForm] = useState(emptyForm);
  const [createOpen, setCreateOpen] = useState(false);

  // Edit modal state
  const [editing, setEditing] = useState(null);
  const [editBusy, setEditBusy] = useState(false);

  async function loadUsers(p = page, ps = pageSize, q = search) {
    setLoading(true);
    setMsg("");
    try {
      const res = await api.get(
        `/admin/users?search=${encodeURIComponent(q)}&page=${p}&pageSize=${ps}`
      );
      setRows(res.data.rows || []);
      setTotal(res.data.total || 0);
    } catch (e) {
      console.error(e);
      setMsg(e?.response?.data?.error || "Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers(1, pageSize, "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSearchSubmit(e) {
    e.preventDefault();
    setPage(1);
    await loadUsers(1, pageSize, search);
  }

  async function onReset() {
    setSearch("");
    setPage(1);
    await loadUsers(1, pageSize, "");
  }

  async function createUser(e) {
    e.preventDefault();
    setMsg("");

    try {
      await api.post("/admin/users", {
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        email: form.email.trim(),
        phone: form.phone?.trim() || null,
        address_line1: form.address_line1?.trim() || null,
        address_line2: form.address_line2?.trim() || null,
        city: form.city?.trim() || null,
        state: form.state?.trim() || null,
        zip: form.zip?.trim() || null,
        password: form.password,
        role: form.role,
      });

      setMsg("✅ User created");
      setForm(emptyForm);
      setCreateOpen(false);
      setPage(1);
      await loadUsers(1, pageSize, search);
    } catch (e2) {
      console.error(e2);
      setMsg(e2?.response?.data?.error || "Create user failed");
    }
  }

  async function saveRole(id, role) {
    setMsg("");
    try {
      await api.patch(`/admin/users/${id}/role`, { role });
      setMsg("✅ Role updated");
      await loadUsers(page, pageSize, search);
    } catch (e) {
      console.error(e);
      setMsg(e?.response?.data?.error || "Role update failed");
    }
  }

  function openEdit(u) {
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
    setMsg("");
  }

  function closeEdit() {
    setEditing(null);
  }

  async function saveEdit() {
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
      await loadUsers(page, pageSize, search);
    } catch (e) {
      console.error(e);
      setMsg(e?.response?.data?.error || "Update failed");
    } finally {
      setEditBusy(false);
    }
  }

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const rowsById = useMemo(() => {
    const m = new Map();
    rows.forEach((r) => m.set(r.id, r));
    return m;
  }, [rows]);

  return (
    <div>
      <h2 className="dash-title" style={{ marginBottom: 10 }}>
        Roles & Member Management
      </h2>

      {msg ? <div className="auth-banner" style={{ marginBottom: 12 }}>{msg}</div> : null}

      {/* Search */}
      <form className="dash-toolbar" onSubmit={onSearchSubmit}>
        <div className="dash-toolbar-left">
          <input
            className="dash-input"
            style={{ width: 380, maxWidth: "70vw" }}
            placeholder="Search name, email, phone, city, state, zip..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="dash-btn dash-btn-primary" type="submit">Search</button>
          <button className="dash-btn dash-btn-ghost" type="button" onClick={onReset}>Reset</button>
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
              await loadUsers(1, ps, search);
            }}
          >
            {[10, 25, 50, 100].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      </form>

      {/* Create (collapsible) */}
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
                <input className="dash-input" value={form.first_name}
                  onChange={(e) => setForm((p) => ({ ...p, first_name: e.target.value }))} required />
              </div>
              <div className="dash-field">
                <div className="dash-label">Last name</div>
                <input className="dash-input" value={form.last_name}
                  onChange={(e) => setForm((p) => ({ ...p, last_name: e.target.value }))} required />
              </div>
            </div>

            <div className="dash-grid-2">
              <div className="dash-field">
                <div className="dash-label">Email</div>
                <input className="dash-input" type="email" value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} required />
              </div>
              <div className="dash-field">
                <div className="dash-label">Role</div>
                <select className="dash-select" value={form.role}
                  onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}>
                  {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            </div>

            <div className="dash-grid-2">
              <div className="dash-field">
                <div className="dash-label">Phone</div>
                <input className="dash-input" value={form.phone}
                  onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} placeholder="+1 615..." />
              </div>
              <div className="dash-field">
                <div className="dash-label">Temp password (12+ chars)</div>
                <input className="dash-input" type="password" autoComplete="new-password"
                  value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} required />
              </div>
            </div>

            <div className="dash-field">
              <div className="dash-label">Address 1</div>
              <input className="dash-input" value={form.address_line1}
                onChange={(e) => setForm((p) => ({ ...p, address_line1: e.target.value }))} />
            </div>

            <div className="dash-field">
              <div className="dash-label">Address 2</div>
              <input className="dash-input" value={form.address_line2}
                onChange={(e) => setForm((p) => ({ ...p, address_line2: e.target.value }))} />
            </div>

            <div className="dash-grid-3">
              <div className="dash-field">
                <div className="dash-label">City</div>
                <input className="dash-input" value={form.city}
                  onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))} />
              </div>
              <div className="dash-field">
                <div className="dash-label">State</div>
                <input className="dash-input" value={form.state}
                  onChange={(e) => setForm((p) => ({ ...p, state: e.target.value }))} />
              </div>
              <div className="dash-field">
                <div className="dash-label">ZIP</div>
                <input className="dash-input" value={form.zip}
                  onChange={(e) => setForm((p) => ({ ...p, zip: e.target.value }))} />
              </div>
            </div>

            <div className="dash-form-actions">
              <button className="dash-btn dash-btn-ghost" type="button" onClick={() => setCreateOpen(false)}>
                Close
              </button>
              <button className="dash-btn dash-btn-primary" type="submit">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Table */}
      <div className="dash-table-wrap">
        <div className="dash-table-scroll">
          <table className="dash-table">
            <thead>
              <tr>
                <th style={{ width: 220 }}>Name</th>
                <th>Email</th>
                <th style={{ width: 160 }}>Phone</th>
                <th style={{ width: 170 }}>Role</th>
                <th style={{ width: 110 }}>Active</th>
                <th style={{ width: 240, textAlign: "right" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr><td colSpan="6" style={{ padding: 16, color: "var(--dash-muted)" }}>Loading…</td></tr>
              ) : null}

              {rows.map((u) => (
                <tr key={u.id}>
                  <td style={{ fontWeight: 950 }}>{u.first_name} {u.last_name}</td>
                  <td>{u.email}</td>
                  <td>{u.phone || <span style={{ color: "var(--dash-muted)" }}>—</span>}</td>

                  <td>
                    <select
                      className="dash-select"
                      style={{ height: 34 }}
                      value={u.role}
                      onChange={(e) => {
                        const newRole = e.target.value;
                        setRows((prev) => prev.map((x) => (x.id === u.id ? { ...x, role: newRole } : x)));
                      }}
                    >
                      {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </td>

                  <td>{Number(u.is_active ?? 1) ? "Yes" : "No"}</td>

                  <td>
                    <div className="dash-actions">
                      <button className="dash-btn dash-btn-primary" onClick={() => saveRole(u.id, u.role)}>
                        Save role
                      </button>
                      <button className="dash-btn dash-btn-ghost" onClick={() => openEdit(rowsById.get(u.id) || u)}>
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!loading && !rows.length ? (
                <tr><td colSpan="6" style={{ padding: 16, color: "var(--dash-muted)" }}>No members found</td></tr>
              ) : null}
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
              await loadUsers(p, pageSize, search);
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
              await loadUsers(p, pageSize, search);
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
              <h3 className="dash-modal-title">Edit Member #{editing.id}</h3>
              <button className="dash-modal-close" onClick={() => setEditing(null)} aria-label="Close">✕</button>
            </div>

            <div className="dash-modal-body">
              <div className="dash-form compact">
                <div className="dash-grid-2">
                  <div className="dash-field">
                    <div className="dash-label">First name</div>
                    <input className="dash-input" value={editing.first_name}
                      onChange={(e) => setEditing((p) => ({ ...p, first_name: e.target.value }))} />
                  </div>
                  <div className="dash-field">
                    <div className="dash-label">Last name</div>
                    <input className="dash-input" value={editing.last_name}
                      onChange={(e) => setEditing((p) => ({ ...p, last_name: e.target.value }))} />
                  </div>
                </div>

                <div className="dash-grid-2">
                  <div className="dash-field">
                    <div className="dash-label">Email</div>
                    <input className="dash-input" value={editing.email}
                      onChange={(e) => setEditing((p) => ({ ...p, email: e.target.value }))} />
                  </div>
                  <div className="dash-field">
                    <div className="dash-label">Phone</div>
                    <input className="dash-input" value={editing.phone}
                      onChange={(e) => setEditing((p) => ({ ...p, phone: e.target.value }))} />
                  </div>
                </div>

                <div className="dash-field">
                  <div className="dash-label">Address 1</div>
                  <input className="dash-input" value={editing.address_line1}
                    onChange={(e) => setEditing((p) => ({ ...p, address_line1: e.target.value }))} />
                </div>

                <div className="dash-field">
                  <div className="dash-label">Address 2</div>
                  <input className="dash-input" value={editing.address_line2}
                    onChange={(e) => setEditing((p) => ({ ...p, address_line2: e.target.value }))} />
                </div>

                <div className="dash-grid-3">
                  <div className="dash-field">
                    <div className="dash-label">City</div>
                    <input className="dash-input" value={editing.city}
                      onChange={(e) => setEditing((p) => ({ ...p, city: e.target.value }))} />
                  </div>
                  <div className="dash-field">
                    <div className="dash-label">State</div>
                    <input className="dash-input" value={editing.state}
                      onChange={(e) => setEditing((p) => ({ ...p, state: e.target.value }))} />
                  </div>
                  <div className="dash-field">
                    <div className="dash-label">ZIP</div>
                    <input className="dash-input" value={editing.zip}
                      onChange={(e) => setEditing((p) => ({ ...p, zip: e.target.value }))} />
                  </div>
                </div>

                <label style={{ display: "flex", gap: 10, alignItems: "center", fontWeight: 950 }}>
                  <input
                    type="checkbox"
                    checked={Number(editing.is_active) === 1}
                    onChange={(e) => setEditing((p) => ({ ...p, is_active: e.target.checked ? 1 : 0 }))}
                  />
                  Active account
                </label>

                <div className="dash-form-actions">
                  <button className="dash-btn dash-btn-ghost" onClick={closeEdit}>Cancel</button>
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