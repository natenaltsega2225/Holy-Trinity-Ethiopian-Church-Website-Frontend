// src/features/member/pages/Account/Family.jsx
import React, { useEffect, useState } from "react";
import { addFamily, deleteFamily, getMyFamily } from "../../services/memberApi";

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
      const { data } = await getMyFamily();
      setRows(data.rows || []);
    } catch (e) {
      console.error(e);
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
      await addFamily(form);
      setForm({ full_name: "", relationship: "", birthdate: "", notes: "" });
      load();
    } catch (e2) {
      setErr(e2?.response?.data?.error || "Could not add family member.");
    }
  }

  async function remove(id) {
    if (!window.confirm("Remove this family member?")) return;
    await deleteFamily(id);
    load();
  }

  return (
    <div>
      <div className="dash-title" style={{ marginBottom: 10 }}>
        Family / Dependents
      </div>

      {err && <div className="auth-banner" role="alert">{err}</div>}

      <div className="dash-card" style={{ marginBottom: 14 }}>
        <div style={{ fontWeight: 950, marginBottom: 10 }}>Add Family Member</div>

        <form onSubmit={submit} className="dash-form compact" style={{ maxWidth: 760 }}>
          <div className="dash-field">
            <div className="dash-label">Full Name</div>
            <input className="dash-input" value={form.full_name} onChange={(e) => upd("full_name", e.target.value)} required />
          </div>

          <div className="dash-grid-2">
            <div className="dash-field">
              <div className="dash-label">Relationship</div>
              <input className="dash-input" value={form.relationship} onChange={(e) => upd("relationship", e.target.value)} required />
            </div>

            <div className="dash-field">
              <div className="dash-label">Birthdate (optional)</div>
              <input className="dash-input" type="date" value={form.birthdate} onChange={(e) => upd("birthdate", e.target.value)} />
            </div>
          </div>

          <div className="dash-field">
            <div className="dash-label">Notes (optional)</div>
            <input className="dash-input" value={form.notes} onChange={(e) => upd("notes", e.target.value)} />
          </div>

          <div className="dash-form-actions">
            <div />
            <button className="dash-btn dash-btn-primary" type="submit">Add</button>
          </div>
        </form>
      </div>

      <div className="dash-table-wrap">
        <div className="dash-table-scroll" style={{ maxHeight: 520 }}>
          <table className="dash-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Relationship</th>
                <th>Birthdate</th>
                <th>Notes</th>
                <th style={{ width: 140, textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td style={{ fontWeight: 950 }}>{r.full_name}</td>
                  <td>{r.relationship}</td>
                  <td>{r.birthdate ? new Date(r.birthdate).toLocaleDateString() : "—"}</td>
                  <td>{r.notes || "—"}</td>
                  <td style={{ textAlign: "right" }}>
                    <button className="dash-btn dash-btn-ghost" onClick={() => remove(r.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}

              {!rows.length && (
                <tr>
                  <td colSpan={5} style={{ padding: 16 }}>
                    No family members added yet.
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