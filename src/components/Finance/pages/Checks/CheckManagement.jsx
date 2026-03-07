import React from "react";
import DashboardLayout from "../../../Shared/DashboardLayout";

export default function CheckManagement() {
  return (
    <DashboardLayout title="Check Management" nav={[{ to: "/dash/finance/checks", label: "Checks" }]}>
      <div className="panel">
        <p>Check clearing status and audit trail – coming next.</p>
      </div>
    </DashboardLayout>
  );
}