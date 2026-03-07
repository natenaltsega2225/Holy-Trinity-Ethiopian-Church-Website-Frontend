import React from "react";
import DashboardLayout from "../../../Shared/DashboardLayout";

export default function RefundsDisputes() {
  return (
    <DashboardLayout title="Refunds & Disputes" nav={[{ to: "/dash/finance", label: "Dashboard" }]}>
      <div className="panel">
        <p>Refund/dispute tracking workflow – coming next.</p>
      </div>
    </DashboardLayout>
  );
}