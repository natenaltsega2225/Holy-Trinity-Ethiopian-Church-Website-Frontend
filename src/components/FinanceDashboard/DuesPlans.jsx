// src/components/FinanceDashboard/DuesPlans.jsx
import React, { useEffect, useState } from "react";
import DashboardLayout from "../Shared/DashboardLayout";
import api from "../api";
import "../../styles/overview.css";

const NAV = [
  { to: "/dash/finance", label: "Overview" },
  { to: "/dash/finance/payments", label: "Payments" },
  { to: "/dash/finance/reports", label: "Reports" },
  { to: "/dash/finance/invoices", label: "Invoices" },
  { to: "/dash/finance/checks", label: "Checks" },
  { to: "/dash/finance/expenses", label: "Expenses" },
  { to: "/dash/finance/exports", label: "Exports" },
  { to: "/dash/finance/settings", label: "Settings" }, // you can keep or point to this
];

export default function DuesPlans() {
  const [plans, setPlans] = useState([]);
  const [err, setErr] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/finance/dues-plans");
        setPlans(
          (data.plans || []).map((p) => ({
            ...p,
            min_amount_usd: (p.min_amount_cents || 0) / 100,
            default_amount_usd: (p.default_amount_cents || 0) / 100,
          }))
        );
      } catch (e) {
        console.error(e);
        setErr("Could not load dues plan settings.");
      }
    })();
  }, []);

  const updateField = (id, field, value) => {
    setPlans((list) =>
      list.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  async function save() {
    setErr("");
    setSaving(true);
    try {
      await api.put("/finance/dues-plans", {
        plans: plans.map((p) => ({
          id: p.id,
          label: p.label,
          min_amount_usd: Number(p.min_amount_usd),
          default_amount_usd: Number(p.default_amount_usd),
          active: !!p.active,
        })),
      });
    } catch (e) {
      console.error(e);
      setErr(e.response?.data?.error || "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <DashboardLayout title="Membership Dues Plans" nav={NAV}>
      <div className="overview-panel">
        <h3>Finance Configuration</h3>
        <p>
          Set the minimum and default amounts for monthly, 6-month, and yearly
          membership dues. Changes apply immediately to all members.
        </p>
        {err && <div className="auth-banner">{err}</div>}

        <table className="overview-mini-table">
          <thead>
            <tr>
              <th>Plan</th>
              <th>Months</th>
              <th>Minimum Total (USD)</th>
              <th>Default Total (USD)</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((p) => (
              <tr key={p.id}>
                <td>{p.label}</td>
                <td>{p.months}</td>
                <td>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={p.min_amount_usd}
                    onChange={(e) =>
                      updateField(p.id, "min_amount_usd", e.target.value)
                    }
                    style={{ width: "90px" }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={p.default_amount_usd}
                    onChange={(e) =>
                      updateField(p.id, "default_amount_usd", e.target.value)
                    }
                    style={{ width: "90px" }}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={!!p.active}
                    onChange={(e) =>
                      updateField(p.id, "active", e.target.checked)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: 12, textAlign: "right" }}>
          <button className="btn" disabled={saving} onClick={save}>
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
