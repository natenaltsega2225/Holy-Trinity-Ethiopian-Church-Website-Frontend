import React from "react";
import DashboardLayout from "../../../Shared/DashboardLayout";

export default function AgingReport() {
  return (
    <DashboardLayout title="Dues Aging Report" nav={[{ to: "/dash/finance", label: "Dashboard" }]}>
      <div className="panel">
        <p>Aging buckets (0–30, 31–60, 61–90, 90+) – coming next.</p>
      </div>
    </DashboardLayout>
  );
}