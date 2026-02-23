//src/components/AdminDashboard/Roles.jsx
// import React from "react";
// import DashboardLayout from "../Shared/DashboardLayout";
// export default function Roles(){
//   return(
//     <DashboardLayout title="Roles & Permissions" nav={[{to:"/dash/admin",label:"Overview"}]}>
//       <p>Assign roles: admin, finance, member_mgr, member.</p>
//     </DashboardLayout>
//   );
// }


// src/components/AdminDashboard/Roles.jsx
import React, { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../Shared/DashboardLayout";
import api from "../api"; // adjust if your path differs

const ROLES = ["member", "finance", "admin"];

export default function Roles() {
  const nav = useMemo(() => [{ to: "/dash/admin", label: "Overview" }], []);
  const [rows, setRows] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "member",
  });

  async function loadUsers() {
    setLoading(true);
    setMsg("");
    try {
      const res = await api.get("/admin/users");
      setRows(res.data.rows || []);
    } catch (e) {
      console.error(e);
      setMsg(e?.response?.data?.error || "Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function createUser(e) {
    e.preventDefault();
    setMsg("");
    try {
      await api.post("/admin/users", {
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role,
      });
      setMsg("✅ User created");
      setForm({ first_name: "", last_name: "", email: "", password: "", role: "member" });
      await loadUsers();
    } catch (e) {
      console.error(e);
      setMsg(e?.response?.data?.error || "Create user failed");
    }
  }

  async function saveRole(id, role) {
    setMsg("");
    try {
      await api.patch(`/admin/users/${id}/role`, { role });
      setMsg("✅ Role updated");
      await loadUsers();
    } catch (e) {
      console.error(e);
      setMsg(e?.response?.data?.error || "Role update failed");
    }
  }

  return (
    <DashboardLayout title="Roles & Permissions" nav={nav}>
      <div style={{ maxWidth: 1000 }}>
        {msg ? <p style={{ marginBottom: 12 }}>{msg}</p> : null}

        <h3>Create user</h3>
        <form onSubmit={createUser} style={{ display: "grid", gap: 10, marginBottom: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <input
              placeholder="First name"
              value={form.first_name}
              onChange={(e) => setForm((p) => ({ ...p, first_name: e.target.value }))}
              required
            />
            <input
              placeholder="Last name"
              value={form.last_name}
              onChange={(e) => setForm((p) => ({ ...p, last_name: e.target.value }))}
              required
            />
          </div>

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            required
          />
          <input
            placeholder="Temp password (min 6 chars)"
            type="password"
            value={form.password}
            onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
            required
          />

          <select value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}>
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          <button type="submit">Create</button>
        </form>

        <h3>Users</h3>
        {loading ? <p>Loading…</p> : null}

        <div style={{ overflowX: "auto" }}>
          <table cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th align="left">Name</th>
                <th align="left">Email</th>
                <th align="left">Role</th>
                <th align="left">Save</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((u) => (
                <tr key={u.id} style={{ borderTop: "1px solid #ddd" }}>
                  <td>{u.first_name} {u.last_name}</td>
                  <td>{u.email}</td>
                  <td>
                    <select
                      value={u.role}
                      onChange={(e) => {
                        const newRole = e.target.value;
                        setRows((prev) => prev.map((x) => (x.id === u.id ? { ...x, role: newRole } : x)));
                      }}
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button onClick={() => saveRole(u.id, u.role)}>Save role</button>
                  </td>
                </tr>
              ))}
              {!rows.length ? (
                <tr><td colSpan="4">No users found</td></tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}