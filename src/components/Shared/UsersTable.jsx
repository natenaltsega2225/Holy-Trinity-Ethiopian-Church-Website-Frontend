
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
//   endpoint = "/members",      // => GET /api/members
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

//   // top-right 3-dots menu state
//   const [actionsOpen, setActionsOpen] = useState(false);

//   const canReallyCreate = canCreate && isAdmin;
//   const canReallyEdit   = isAdmin;
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
//     setShowModal(true);
//   }

//   function openEdit(r) {
//     if (!canReallyEdit) return;
//     setEditId(r.id);
//     setForm({
//       first_name: r.first_name || "",
//       last_name:  r.last_name  || "",
//       email:      r.email      || "",
//       phone:      r.phone      || "",
//       address_line1: r.address_line1 || "",
//       address_line2: r.address_line2 || "",
//       city: r.city || "",
//       state: r.state || "",
//       zip: r.zip || "",
//       role: r.role || "member",
//       password: "",
//     });
//     setErr("");
//     setShowModal(true);
//   }

//   // Copy an existing row into a new "Create Member" form
//   function copyFrom(r) {
//     if (!canReallyCreate) return;
//     setEditId(null); // new record
//     setForm({
//       first_name: r.first_name || "",
//       last_name: r.last_name || "",
//       // email must be unique – leave empty so admin fills it
//       email: "",
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
//       load();
//     } catch (e2) {
//       alert(e2.response?.data?.error || "Delete failed");
//     }
//   }

//   // Export helpers – simple CSV export under different names
//   function exportCSV(filename) {
//     if (!rows.length) return;

//     const header = [
//       "First Name",
//       "Last Name",
//       "Email",
//       "Phone",
//       "Address1",
//       "Address2",
//       "City",
//       "State",
//       "ZIP",
//       "Role",
//       "Paid Status",
//       "Cadence Months",
//     ];

//     const body = rows.map((r) => [
//       r.first_name || "",
//       r.last_name || "",
//       r.email || "",
//       r.phone || "",
//       r.address_line1 || "",
//       r.address_line2 || "",
//       r.city || "",
//       r.state || "",
//       r.zip || "",
//       r.role || "",
//       r.paid_status || "",
//       r.cadence_months ?? "",
//     ]);

//     const lines = [header, ...body].map((cols) =>
//       cols
//         .map((c) => {
//           const v = String(c ?? "");
//           return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
//         })
//         .join(",")
//     );

//     const csv = lines.join("\r\n");
//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = filename;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   }

//   function handleExport(kind) {
//     if (!rows.length) return;
//     if (kind === "excel") {
//       exportCSV("members-excel.csv");
//     } else if (kind === "spreadsheet") {
//       exportCSV("members-spreadsheet.csv");
//     } else if (kind === "document") {
//       exportCSV("members-document.csv");
//     }
//     setActionsOpen(false);
//   }

//   const pages = useMemo(
//     () => Math.max(1, Math.ceil(total / pageSize)),
//     [total, pageSize]
//   );

//   return (
//     <>
//       {/* Search + toolbar */}
//       <div className="card" style={{ marginBottom: 12 }}>
//         <div className="table-toolbar">
//           <input
//             className="table-search"
//             placeholder="Search name/email/phone/city/state/zip…"
//             value={search}
//             onChange={(e) => {
//               setPage(1);
//               setSearch(e.target.value);
//             }}
//           />

//           <div className="table-toolbar-right">
//             {canReallyCreate && (
//               <button className="btn btn-primary" onClick={openCreate}>
//                 + New Member
//               </button>
//             )}

//             {/* 3-dots menu (I want to...) – admin only */}
//             {isAdmin && (
//               <div className="actions-menu-wrapper">
//                 <button
//                   type="button"
//                   className="icon-btn menu-trigger"
//                   onClick={() => setActionsOpen((o) => !o)}
//                   aria-haspopup="true"
//                   aria-expanded={actionsOpen}
//                   title="More actions"
//                 >
//                   ⋮
//                 </button>

//                 {actionsOpen && (
//                   <div className="actions-menu" role="menu">
//                     <div className="actions-menu-header">I want to…</div>

//                     {canReallyCreate && (
//                       <button
//                         type="button"
//                         className="actions-menu-item"
//                         onClick={() => {
//                           setActionsOpen(false);
//                           openCreate();
//                         }}
//                       >
//                         Add Row
//                       </button>
//                     )}

//                     <button
//                       type="button"
//                       className="actions-menu-item"
//                       onClick={() => {
//                         // Placeholder – hook up custom saved views if you like
//                         setActionsOpen(false);
//                         window.alert("Views feature coming soon.");
//                       }}
//                     >
//                       Views
//                     </button>

//                     <div className="actions-menu-divider" />

//                     <div className="actions-menu-subtitle">Export</div>
//                     <button
//                       type="button"
//                       className="actions-menu-item"
//                       onClick={() => handleExport("excel")}
//                     >
//                       Excel
//                     </button>
//                     <button
//                       type="button"
//                       className="actions-menu-item"
//                       onClick={() => handleExport("spreadsheet")}
//                     >
//                       Spreadsheet
//                     </button>
//                     <button
//                       type="button"
//                       className="actions-menu-item"
//                       onClick={() => handleExport("document")}
//                     >
//                       Document
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Table */}
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
//               {isAdmin && <th style={{ width: 140 }} />}
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
//                     <div className="row-actions">
//                       <button
//                         type="button"
//                         className="icon-btn"
//                         title="Edit member"
//                         onClick={() => openEdit(r)}
//                       >
//                         ✏️
//                       </button>

//                       {canReallyCreate && (
//                         <button
//                           type="button"
//                           className="icon-btn"
//                           title="Copy row"
//                           onClick={() => copyFrom(r)}
//                         >
//                           📄
//                         </button>
//                       )}

//                       {canReallyDelete && (
//                         <button
//                           type="button"
//                           className="icon-btn danger"
//                           title="Delete member"
//                           onClick={() => remove(r.id)}
//                         >
//                           ✕
//                         </button>
//                       )}
//                     </div>
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

//         {/* simple pager */}
//         {pages > 1 && (
//           <div className="table-pager">
//             <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
//               Prev
//             </button>
//             <div className="table-pager-info">
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

//       {/* Create/Edit Modal */}

//       {showModal && (
//         <div className="terms-overlay" role="dialog" aria-modal="true">
//           <div className="terms-modal" style={{ maxWidth: 720 }}>
//             <div className="terms-head">
//               <h2>{editId ? "Edit Member" : "Create Member"}</h2>
//               <button
//                 className="terms-close"
//                 onClick={() => setShowModal(false)}
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
//                     {/* <option value="member_mgr">member_mgr</option> */}
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
//                   marginTop: 8,
//                 }}
//               >
//                 <button
//                   type="button"
//                   className="btn btn-muted"
//                   onClick={() => setShowModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="btn btn-primary">
//                   {editId ? "Save" : "Create"}
//                 </button>
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

export default function UsersTable({
  endpoint = "/members", // => GET /api/members
  canCreate = false,
  canEditRole = false,
  canDelete = false,
}) {
  const { user } = useAuth() || {};
  const role = user?.role || "member";
  const isAdmin = role === "admin";

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
  const canReallyEdit = isAdmin;
  const canReallyDelete = canDelete && isAdmin;

  async function load() {
    const params = { search, page, pageSize };
    const url = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const { data } = await api.get(url, { params });
    setRows(data.rows || []);
    setTotal(data.total || 0);
  }
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page, endpoint]);

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
        const { password, ...payload } = form; // no password change here
        await api.put(`/members/${editId}`, payload);
      } else {
        if (!form.password || form.password.length < 6) {
          setErr("Password must be at least 6 characters.");
          return;
        }
        await api.post(`/members`, form);
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
      await api.delete(`/members/${id}`);
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
          <div className="terms-modal" style={{ maxWidth: 720, maxHeight: "90vh" }}>
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
