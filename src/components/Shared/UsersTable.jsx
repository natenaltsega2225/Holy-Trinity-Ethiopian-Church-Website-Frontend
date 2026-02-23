

// // src/components/Shared/UsersTable.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import api from "../api";
// import { useAuth } from "../../hooks/useAuth";
// import "../../styles/dashboard.css";

// const blank = {
//   first_name: "",
//   last_name: "",
//   email: "",
//   phone: "",
//   address_line1: "",
//   address_line2: "",
//   city: "",
//   state: "",
//   zip: "",
//   role: "member",
//   password: "",
// };

// function cadenceLabel(n) {
//   if (!n) return "—";
//   if (n === 1) return "Monthly";
//   if (n === 6) return "Semi-annual";
//   if (n === 12) return "Annual";
//   return `${n} months`;
// }

// export default function UsersTable({
//   endpoint = "/members", // => GET /api/members
//   canCreate = false,
//   canEditRole = false,
//   canDelete = false,
// }) {
//   const { user } = useAuth() || {};
//   const role = user?.role || "member";
//   const isAdmin = role === "admin";

//   const [rows, setRows] = useState([]);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [pageSize] = useState(50);

//   // modal
//   const [showModal, setShowModal] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [form, setForm] = useState(blank);
//   const [err, setErr] = useState("");

//   // which row's 3-dot menu is open
//   const [menuRow, setMenuRow] = useState(null);

//   const canReallyCreate = canCreate && isAdmin;
//   const canReallyEdit = isAdmin;
//   const canReallyDelete = canDelete && isAdmin;

//   async function load() {
//     const params = { search, page, pageSize };
//     const url = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
//     const { data } = await api.get(url, { params });
//     setRows(data.rows || []);
//     setTotal(data.total || 0);
//   }
//   useEffect(() => {
//     load();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [search, page, endpoint]);

//   function openCreate() {
//     if (!canReallyCreate) return;
//     setEditId(null);
//     setForm(blank);
//     setErr("");
//     setMenuRow(null);
//     setShowModal(true);
//   }

//   function openEdit(r) {
//     if (!canReallyEdit) return;
//     setEditId(r.id);
//     setForm({
//       first_name: r.first_name || "",
//       last_name: r.last_name || "",
//       email: r.email || "",
//       phone: r.phone || "",
//       address_line1: r.address_line1 || "",
//       address_line2: r.address_line2 || "",
//       city: r.city || "",
//       state: r.state || "",
//       zip: r.zip || "",
//       role: r.role || "member",
//       password: "",
//     });
//     setErr("");
//     setMenuRow(null);
//     setShowModal(true);
//   }

//   // Copy an existing row into a "Create Member" form
//   function copyToNew(r) {
//     if (!canReallyCreate) return;
//     setEditId(null); // creating, not editing
//     setForm({
//       first_name: r.first_name || "",
//       last_name: r.last_name || "",
//       email: "", // force admin to enter a new unique email
//       phone: r.phone || "",
//       address_line1: r.address_line1 || "",
//       address_line2: r.address_line2 || "",
//       city: r.city || "",
//       state: r.state || "",
//       zip: r.zip || "",
//       role: r.role || "member",
//       password: "",
//     });
//     setErr("");
//     setMenuRow(null);
//     setShowModal(true);
//   }

//   async function submit(e) {
//     e.preventDefault();
//     setErr("");

//     try {
//       if (editId) {
//         const { password, ...payload } = form; // no password change here
//         await api.put(`/members/${editId}`, payload);
//       } else {
//         if (!form.password || form.password.length < 6) {
//           setErr("Password must be at least 6 characters.");
//           return;
//         }
//         await api.post(`/members`, form);
//       }
//       setShowModal(false);
//       setMenuRow(null);
//       load();
//     } catch (e2) {
//       setErr(e2.response?.data?.error || "Save failed");
//     }
//   }

//   async function remove(id) {
//     if (!canReallyDelete) return;
//     if (!window.confirm("Delete this member?")) return;
//     try {
//       await api.delete(`/members/${id}`);
//       setMenuRow(null);
//       load();
//     } catch (e2) {
//       alert(e2.response?.data?.error || "Delete failed");
//     }
//   }

//   const pages = useMemo(
//     () => Math.max(1, Math.ceil(total / pageSize)),
//     [total, pageSize]
//   );

//   return (
//     <>
//       <div className="card" style={{ marginBottom: 12 }}>
//         <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
//           <input
//             placeholder="Search name/email/phone/city/state/zip…"
//             value={search}
//             onChange={(e) => {
//               setPage(1);
//               setSearch(e.target.value);
//             }}
//             style={{ flex: "1 1 280px" }}
//           />
//           {canReallyCreate && (
//             <button onClick={openCreate} className="btn btn-primary">
//               + New Member
//             </button>
//           )}
//         </div>
//       </div>

//       <div className="card" style={{ overflowX: "auto" }}>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Address</th>
//               <th>Role</th>
//               <th>Billing Cadence</th>
//               <th>Paid</th>
//               {isAdmin && <th style={{ width: 64 }} />}
//             </tr>
//           </thead>
//           <tbody>
//             {rows.map((r) => (
//               <tr key={r.id}>
//                 <td>
//                   {r.first_name} {r.last_name}
//                 </td>
//                 <td>{r.email}</td>
//                 <td>{r.phone || "-"}</td>
//                 <td>
//                   <div>{r.address_line1 || "-"}</div>
//                   <small>
//                     {[r.city, r.state, r.zip].filter(Boolean).join(", ")}
//                   </small>
//                 </td>
//                 <td>
//                   <span className="badge">{r.role}</span>
//                 </td>
//                 <td>{cadenceLabel(r.cadence_months)}</td>
//                 <td>
//                   {r.paid_status === "paid" ? (
//                     <span className="pill pill-ok">Paid</span>
//                   ) : (
//                     <span className="pill pill-warn">Unpaid</span>
//                   )}
//                 </td>

//                 {isAdmin && (
//                   <td className="actions">
//                     {/* 3-dot menu trigger */}
//                     <button
//                       type="button"
//                       className="row-menu-btn"
//                       aria-haspopup="menu"
//                       aria-expanded={menuRow === r.id}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setMenuRow((curr) => (curr === r.id ? null : r.id));
//                       }}
//                     >
//                       ⋮
//                     </button>

//                     {menuRow === r.id && (
//                       <div className="row-menu" role="menu">
//                         <button
//                           type="button"
//                           onClick={() => openEdit(r)}
//                           role="menuitem"
//                         >
//                           Edit member
//                         </button>
//                         {canReallyCreate && (
//                           <button
//                             type="button"
//                             onClick={() => copyToNew(r)}
//                             role="menuitem"
//                           >
//                             Copy row to new member
//                           </button>
//                         )}
//                         {canReallyDelete && (
//                           <button
//                             type="button"
//                             className="danger"
//                             onClick={() => remove(r.id)}
//                             role="menuitem"
//                           >
//                             Delete member
//                           </button>
//                         )}
//                       </div>
//                     )}
//                   </td>
//                 )}
//               </tr>
//             ))}
//             {!rows.length && (
//               <tr>
//                 <td
//                   colSpan={isAdmin ? 8 : 7}
//                   style={{ textAlign: "center", padding: "18px" }}
//                 >
//                   No members found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>

//         {pages > 1 && (
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "flex-end",
//               gap: 8,
//               paddingTop: 10,
//             }}
//           >
//             <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
//               Prev
//             </button>
//             <div style={{ alignSelf: "center" }}>
//               Page {page} / {pages}
//             </div>
//             <button
//               disabled={page >= pages}
//               onClick={() => setPage((p) => p + 1)}
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>

//       {showModal && (
//         <div className="terms-overlay" role="dialog" aria-modal="true">
//           <div className="terms-modal" style={{ maxWidth: 720, maxHeight: "90vh" }}>
//             <div className="terms-head">
//               <h2>{editId ? "Edit Member" : "Create Member"}</h2>
//               <button
//                 className="terms-close"
//                 onClick={() => {
//                   setShowModal(false);
//                   setMenuRow(null);
//                 }}
//                 aria-label="Close"
//               >
//                 ✕
//               </button>
//             </div>

//             {err && (
//               <div className="auth-banner" style={{ margin: "0 0 12px" }}>
//                 {err}
//               </div>
//             )}

//             <form onSubmit={submit} className="auth-form">
//               <div className="auth-grid-2">
//                 <div className="auth-field">
//                   <label>First Name</label>
//                   <input
//                     value={form.first_name}
//                     onChange={(e) =>
//                       setForm((f) => ({ ...f, first_name: e.target.value }))
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="auth-field">
//                   <label>Last Name</label>
//                   <input
//                     value={form.last_name}
//                     onChange={(e) =>
//                       setForm((f) => ({ ...f, last_name: e.target.value }))
//                     }
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="auth-grid-2">
//                 <div className="auth-field">
//                   <label>Email</label>
//                   <input
//                     type="email"
//                     value={form.email}
//                     onChange={(e) =>
//                       setForm((f) => ({ ...f, email: e.target.value }))
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="auth-field">
//                   <label>Phone</label>
//                   <input
//                     value={form.phone}
//                     onChange={(e) =>
//                       setForm((f) => ({ ...f, phone: e.target.value }))
//                     }
//                   />
//                 </div>
//               </div>

//               <div className="auth-field">
//                 <label>Address 1</label>
//                 <input
//                   value={form.address_line1}
//                   onChange={(e) =>
//                     setForm((f) => ({ ...f, address_line1: e.target.value }))
//                   }
//                 />
//               </div>
//               <div className="auth-field">
//                 <label>Address 2</label>
//                 <input
//                   value={form.address_line2}
//                   onChange={(e) =>
//                     setForm((f) => ({ ...f, address_line2: e.target.value }))
//                   }
//                 />
//               </div>

//               <div className="auth-grid-3">
//                 <div className="auth-field">
//                   <label>City</label>
//                   <input
//                     value={form.city}
//                     onChange={(e) =>
//                       setForm((f) => ({ ...f, city: e.target.value }))
//                     }
//                   />
//                 </div>
//                 <div className="auth-field">
//                   <label>State</label>
//                   <input
//                     value={form.state}
//                     onChange={(e) =>
//                       setForm((f) => ({ ...f, state: e.target.value }))
//                     }
//                   />
//                 </div>
//                 <div className="auth-field">
//                   <label>ZIP</label>
//                   <input
//                     value={form.zip}
//                     onChange={(e) =>
//                       setForm((f) => ({ ...f, zip: e.target.value }))
//                     }
//                   />
//                 </div>
//               </div>

//               {canEditRole && (
//                 <div className="auth-field">
//                   <label>Role</label>
//                   <select
//                     value={form.role}
//                     onChange={(e) =>
//                       setForm((f) => ({ ...f, role: e.target.value }))
//                     }
//                   >
//                     <option value="member">member</option>
//                     <option value="finance">finance</option>
//                     <option value="member_mgr">member_mgr</option>
//                     <option value="admin">admin</option>
//                   </select>
//                 </div>
//               )}

//               {!editId && (
//                 <div className="auth-field">
//                   <label>Temp Password (new user)</label>
//                   <input
//                     type="password"
//                     value={form.password}
//                     onChange={(e) =>
//                       setForm((f) => ({ ...f, password: e.target.value }))
//                     }
//                   />
//                 </div>
//               )}

//               <div
//                 style={{
//                   display: "flex",
//                   gap: 8,
//                   justifyContent: "flex-end",
//                   marginTop: 12,
//                 }}
//               >
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowModal(false);
//                     setMenuRow(null);
//                   }}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit">{editId ? "Save" : "Create"}</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }


// src/components/Shared/UsersTable.jsx
import React, { useEffect, useMemo, useState } from "react";
import api from "../api";
import { useAuth } from "../../hooks/useAuth";
import "../../styles/dashboard.css";

const blank = {
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

function cadenceLabel(n) {
  if (!n) return "—";
  if (n === 1) return "Monthly";
  if (n === 6) return "Semi-annual";
  if (n === 12) return "Annual";
  return `${n} months`;
}

/**
 * UsersTable supports BOTH:
 * - Public/Member list: endpoint="/members"    -> GET/POST/PUT/DELETE /api/members
 * - Admin management:   endpoint="/admin/users"-> GET/POST/PATCH/DELETE /api/admin/users
 *
 * Admin endpoints:
 *   GET    /api/admin/users
 *   POST   /api/admin/users
 *   PATCH  /api/admin/users/:id/role
 *   DELETE /api/admin/users/:id
 *
 * Members endpoints (if your backend has them):
 *   GET    /api/members
 *   POST   /api/members
 *   PUT    /api/members/:id
 *   DELETE /api/members/:id
 */
export default function UsersTable({
  endpoint = "/members", // default => GET /api/members
  canCreate = false,
  canEditRole = false,
  canDelete = false,
}) {
  const { user } = useAuth() || {};
  const role = user?.role || "member";
  const isAdmin = role === "admin";

  // normalize endpoint into a leading-slash path (no trailing slash)
  const endpointPath = useMemo(() => {
    let e = (endpoint || "/members").trim();
    if (!e.startsWith("/")) e = `/${e}`;
    e = e.replace(/\/+$/, "");
    return e;
  }, [endpoint]);

  // detect if we are on admin API
  const isAdminEndpoint = useMemo(
    () => endpointPath.startsWith("/admin/"),
    [endpointPath]
  );

  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize] = useState(50);

  // modal
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(blank);
  const [err, setErr] = useState("");

  // which row's 3-dot menu is open
  const [menuRow, setMenuRow] = useState(null);

  const canReallyCreate = canCreate && isAdmin;
  const canReallyEdit = isAdmin; // edit form for admin only in this table
  const canReallyDelete = canDelete && isAdmin;

  async function load() {
    const params = { search, page, pageSize };

    // ✅ Admin list uses /api/admin/users (your backend returns { ok, rows })
    // ✅ Members list uses /api/members (your backend returns { rows, total } or { ok, rows, total })
    const { data } = await api.get(endpointPath, { params });

    setRows(data.rows || []);
    setTotal(data.total || 0);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page, endpointPath]);

  function openCreate() {
    if (!canReallyCreate) return;
    setEditId(null);
    setForm(blank);
    setErr("");
    setMenuRow(null);
    setShowModal(true);
  }

  function openEdit(r) {
    if (!canReallyEdit) return;
    setEditId(r.id);
    setForm({
      first_name: r.first_name || "",
      last_name: r.last_name || "",
      email: r.email || "",
      phone: r.phone || "",
      address_line1: r.address_line1 || "",
      address_line2: r.address_line2 || "",
      city: r.city || "",
      state: r.state || "",
      zip: r.zip || "",
      role: r.role || "member",
      password: "",
    });
    setErr("");
    setMenuRow(null);
    setShowModal(true);
  }

  // Copy an existing row into a "Create Member" form
  function copyToNew(r) {
    if (!canReallyCreate) return;
    setEditId(null); // creating, not editing
    setForm({
      first_name: r.first_name || "",
      last_name: r.last_name || "",
      email: "", // force admin to enter a new unique email
      phone: r.phone || "",
      address_line1: r.address_line1 || "",
      address_line2: r.address_line2 || "",
      city: r.city || "",
      state: r.state || "",
      zip: r.zip || "",
      role: r.role || "member",
      password: "",
    });
    setErr("");
    setMenuRow(null);
    setShowModal(true);
  }

  async function submit(e) {
    e.preventDefault();
    setErr("");

    try {
      if (editId) {
        // ---- EDIT ----
        // Your backend currently supports:
        // - members: PUT /api/members/:id
        // - admin:   (role changes via PATCH /api/admin/users/:id/role)
        //
        // We'll do:
        // - If admin endpoint: PATCH role + (optional) PUT members details if you later add it
        // - If members endpoint: PUT /members/:id
        const { password, ...payload } = form; // no password change here

        if (isAdminEndpoint) {
          // ✅ update role using admin route (only if role changed / allowed)
          if (canEditRole && payload.role) {
            await api.patch(`/admin/users/${editId}/role`, { role: payload.role });
          }

          // NOTE: Your admin.js does NOT currently have an endpoint to update profile fields.
          // If you want editing name/phone/address from admin, add:
          // PATCH /api/admin/users/:id (update fields)
          // For now, we just close and reload.
        } else {
          // members API edit
          await api.put(`${endpointPath}/${editId}`, payload);
        }
      } else {
        // ---- CREATE ----
        if (!form.password || form.password.length < 6) {
          setErr("Password must be at least 6 characters.");
          return;
        }

        // ✅ Create at the correct endpoint
        // Admin: POST /api/admin/users
        // Members: POST /api/members (if enabled)
        await api.post(endpointPath, form);
      }

      setShowModal(false);
      setMenuRow(null);
      load();
    } catch (e2) {
      setErr(e2.response?.data?.error || "Save failed");
    }
  }

  async function remove(id) {
    if (!canReallyDelete) return;
    if (!window.confirm("Delete this member?")) return;

    try {
      if (isAdminEndpoint) {
        // ✅ Admin delete route
        await api.delete(`/admin/users/${id}`);
      } else {
        // members delete route
        await api.delete(`${endpointPath}/${id}`);
      }
      setMenuRow(null);
      load();
    } catch (e2) {
      alert(e2.response?.data?.error || "Delete failed");
    }
  }

  const pages = useMemo(
    () => Math.max(1, Math.ceil(total / pageSize)),
    [total, pageSize]
  );

  return (
    <>
      <div className="card" style={{ marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <input
            placeholder="Search name/email/phone/city/state/zip…"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            style={{ flex: "1 1 280px" }}
          />
          {canReallyCreate && (
            <button onClick={openCreate} className="btn btn-primary">
              + New Member
            </button>
          )}
        </div>
      </div>

      <div className="card" style={{ overflowX: "auto" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Role</th>
              <th>Billing Cadence</th>
              <th>Paid</th>
              {isAdmin && <th style={{ width: 64 }} />}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>
                  {r.first_name} {r.last_name}
                </td>
                <td>{r.email}</td>
                <td>{r.phone || "-"}</td>
                <td>
                  <div>{r.address_line1 || "-"}</div>
                  <small>
                    {[r.city, r.state, r.zip].filter(Boolean).join(", ")}
                  </small>
                </td>
                <td>
                  <span className="badge">{r.role}</span>
                </td>
                <td>{cadenceLabel(r.cadence_months)}</td>
                <td>
                  {r.paid_status === "paid" ? (
                    <span className="pill pill-ok">Paid</span>
                  ) : (
                    <span className="pill pill-warn">Unpaid</span>
                  )}
                </td>

                {isAdmin && (
                  <td className="actions">
                    {/* 3-dot menu trigger */}
                    <button
                      type="button"
                      className="row-menu-btn"
                      aria-haspopup="menu"
                      aria-expanded={menuRow === r.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuRow((curr) => (curr === r.id ? null : r.id));
                      }}
                    >
                      ⋮
                    </button>

                    {menuRow === r.id && (
                      <div className="row-menu" role="menu">
                        <button
                          type="button"
                          onClick={() => openEdit(r)}
                          role="menuitem"
                        >
                          Edit member
                        </button>

                        {canReallyCreate && (
                          <button
                            type="button"
                            onClick={() => copyToNew(r)}
                            role="menuitem"
                          >
                            Copy row to new member
                          </button>
                        )}

                        {canReallyDelete && (
                          <button
                            type="button"
                            className="danger"
                            onClick={() => remove(r.id)}
                            role="menuitem"
                          >
                            Delete member
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                )}
              </tr>
            ))}

            {!rows.length && (
              <tr>
                <td
                  colSpan={isAdmin ? 8 : 7}
                  style={{ textAlign: "center", padding: "18px" }}
                >
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {pages > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 8,
              paddingTop: 10,
            }}
          >
            <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
              Prev
            </button>
            <div style={{ alignSelf: "center" }}>
              Page {page} / {pages}
            </div>
            <button
              disabled={page >= pages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <div className="terms-overlay" role="dialog" aria-modal="true">
          <div
            className="terms-modal"
            style={{ maxWidth: 720, maxHeight: "90vh" }}
          >
            <div className="terms-head">
              <h2>{editId ? "Edit Member" : "Create Member"}</h2>
              <button
                className="terms-close"
                onClick={() => {
                  setShowModal(false);
                  setMenuRow(null);
                }}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {err && (
              <div className="auth-banner" style={{ margin: "0 0 12px" }}>
                {err}
              </div>
            )}

            <form onSubmit={submit} className="auth-form">
              <div className="auth-grid-2">
                <div className="auth-field">
                  <label>First Name</label>
                  <input
                    value={form.first_name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, first_name: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="auth-field">
                  <label>Last Name</label>
                  <input
                    value={form.last_name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, last_name: e.target.value }))
                    }
                    required
                  />
                </div>
              </div>

              <div className="auth-grid-2">
                <div className="auth-field">
                  <label>Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="auth-field">
                  <label>Phone</label>
                  <input
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="auth-field">
                <label>Address 1</label>
                <input
                  value={form.address_line1}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, address_line1: e.target.value }))
                  }
                />
              </div>
              <div className="auth-field">
                <label>Address 2</label>
                <input
                  value={form.address_line2}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, address_line2: e.target.value }))
                  }
                />
              </div>

              <div className="auth-grid-3">
                <div className="auth-field">
                  <label>City</label>
                  <input
                    value={form.city}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, city: e.target.value }))
                    }
                  />
                </div>
                <div className="auth-field">
                  <label>State</label>
                  <input
                    value={form.state}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, state: e.target.value }))
                    }
                  />
                </div>
                <div className="auth-field">
                  <label>ZIP</label>
                  <input
                    value={form.zip}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, zip: e.target.value }))
                    }
                  />
                </div>
              </div>

              {canEditRole && (
                <div className="auth-field">
                  <label>Role</label>
                  <select
                    value={form.role}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, role: e.target.value }))
                    }
                  >
                    <option value="member">member</option>
                    <option value="finance">finance</option>
                    <option value="member_mgr">member_mgr</option>
                    <option value="admin">admin</option>
                  </select>

                  {isAdminEndpoint && editId ? (
                    <small style={{ display: "block", marginTop: 6, opacity: 0.8 }}>
                      Tip: On Admin endpoint, role updates are saved via{" "}
                      <code>/api/admin/users/:id/role</code>.
                    </small>
                  ) : null}
                </div>
              )}

              {!editId && (
                <div className="auth-field">
                  <label>Temp Password (new user)</label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, password: e.target.value }))
                    }
                    placeholder="min 6 characters"
                  />
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  gap: 8,
                  justifyContent: "flex-end",
                  marginTop: 12,
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setMenuRow(null);
                  }}
                >
                  Cancel
                </button>
                <button type="submit">{editId ? "Save" : "Create"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}