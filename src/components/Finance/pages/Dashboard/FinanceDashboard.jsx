import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../../Shared/DashboardLayout";
import { financeApi } from "../../services/financeApi";
import MoneyCard from "../../components/MoneyCard";
import "../../../../styles/overview.css";

const NAV = [
  { to: "/dash/finance", label: "Dashboard" },
  { to: "/dash/finance/transactions", label: "Transactions" },
  { to: "/dash/finance/reports", label: "Reports" },
  { to: "/dash/finance/exports", label: "Exports" },
  { to: "/dash/finance/settings", label: "Settings" },
];

export default function FinanceDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [err, setErr] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await financeApi.metrics();
        setMetrics(data.metrics || {});
      } catch (e) {
        console.error(e);
        setErr("Could not load finance metrics.");
      }
    })();
  }, []);

  const m = metrics || {};

  return (
    <DashboardLayout title="Finance Dashboard" nav={NAV}>
      {err ? <div className="auth-banner">{err}</div> : null}

      <section className="overview-kpi-row">
        <MoneyCard
          label="Today's Payments"
          valueCents={m.today_payments_cents}
          hint="Donations + dues + ledger items today."
          icon="💳"
          onClick={() => nav("/dash/finance/transactions")}
        />

        <MoneyCard
          label="Projected Monthly Dues"
          valueCents={m.monthly_dues_cents}
          hint="Expected recurring membership dues."
          icon="🧾"
          onClick={() => nav("/dash/finance/dues/plans")}
        />

        <MoneyCard
          label="YTD Giving"
          valueCents={m.ytd_giving_cents}
          hint="Successful donation total for this year."
          icon="📈"
          onClick={() => nav("/dash/finance/reports")}
        />
      </section>

      <div className="overview-panel" style={{ marginTop: 16 }}>
        <h3 style={{ marginTop: 0 }}>Operational Alerts</h3>
        <p style={{ marginBottom: 0 }}>
          Failed / Pending items:{" "}
          <strong>{Number(m.failed_or_pending_count || 0).toLocaleString()}</strong>
        </p>
      </div>
    </DashboardLayout>
  );
}