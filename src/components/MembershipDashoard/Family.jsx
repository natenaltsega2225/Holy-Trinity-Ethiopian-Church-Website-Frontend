// src/components/MembershipDashoard/Family.jsx
import React, { useEffect, useState } from "react";
import DashboardLayout from "../Shared/DashboardLayout";
import api from "../api";
import "../../styles/dashboard.css";

const NAV = [
  { to: "/dash/membership", label: "Overview", end: true },
  { to: "/dash/membership/my-profile", label: "My Profile" },
  { to: "/dash/membership/my-payments", label: "My Payments" },
  { to: "/dash/membership/family", label: "Family / Dependents" },
];

export default function Family() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({
    full_name: "",
    relationship: "",
    birthdate: "",
    notes: "",
  });
  const [err, setErr] = useState("");

  async function load() {
    try {
      const { data } = await api.get("/family");
      setRows(data.rows || []);
    } catch (e) {
      setErr("Could not load family members.");
    }
  }

  useEffect(() => {
    load();
  }, []);

  const upd = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  async function submit(e) {
    e.preventDefault();
    setErr("");
    try {
      await api.post("/family", form);
      setForm({ full_name: "", relationship: "", birthdate: "", notes: "" });
      load();
    } catch (e2) {
      setErr(e2.response?.data?.error || "Could not add family member.");
    }
  }

  async function remove(id) {
    if (!window.confirm("Remove this family member?")) return;
    await api.delete(`/family/${id}`);
    load();
  }

  return (
    <DashboardLayout title="Family / Dependents" nav={NAV}>
      <div className="card" style={{ marginBottom: 16 }}>
        <h3>Add Family Member</h3>
        {err && <div className="auth-banner" role="alert">{err}</div>}
        <form
          onSubmit={submit}
          className="auth-form"
          style={{ maxWidth: 600, marginTop: 8 }}
        >
          <div className="auth-field">
            <label>Full Name</label>
            <input
              value={form.full_name}
              onChange={(e) => upd("full_name", e.target.value)}
              required
            />
          </div>
          <div className="auth-grid-2">
            <div className="auth-field">
              <label>Relationship</label>
              <input
                value={form.relationship}
                onChange={(e) => upd("relationship", e.target.value)}
                placeholder="Child, spouse, etc."
                required
              />
            </div>
            <div className="auth-field">
              <label>Birthdate (optional)</label>
              <input
                type="date"
                value={form.birthdate}
                onChange={(e) => upd("birthdate", e.target.value)}
              />
            </div>
          </div>
          <div className="auth-field">
            <label>Notes (optional)</label>
            <textarea
              value={form.notes}
              onChange={(e) => upd("notes", e.target.value)}
              rows={2}
            />
          </div>
          <button className="auth-btn">Add</button>
        </form>
      </div>

      <div className="card" style={{ overflowX: "auto" }}>
        <h3>Family Members</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Relationship</th>
              <th>Birthdate</th>
              <th>Notes</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{r.full_name}</td>
                <td>{r.relationship}</td>
                <td>
                  {r.birthdate
                    ? new Date(r.birthdate).toLocaleDateString()
                    : "—"}
                </td>
                <td>{r.notes || "—"}</td>
                <td style={{ textAlign: "right" }}>
                  <button
                    className="btn btn-small btn-danger"
                    onClick={() => remove(r.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {!rows.length && (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: 16 }}>
                  No family members added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
