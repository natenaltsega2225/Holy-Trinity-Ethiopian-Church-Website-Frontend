import React from "react";
import DashboardLayout from "../../../Shared/DashboardLayout";

export default function Ledger() {
  return (
    <DashboardLayout title="Transactions Ledger" nav={[{ to: "/dash/finance", label: "Dashboard" }]}>
      <div className="panel">
        <p>Ledger table (donations + dues + manual entries) – coming next.</p>
      </div>
    </DashboardLayout>
  );
}