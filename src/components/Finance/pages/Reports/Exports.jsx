import React from "react";
import DashboardLayout from "../../../Shared/DashboardLayout";

export default function Exports() {
  return (
    <DashboardLayout title="Exports" nav={[{ to: "/dash/finance", label: "Dashboard" }]}>
      <div className="panel">
        <p>Export center (CSV/PDF): members, donations, dues, expenses.</p>
      </div>
    </DashboardLayout>
  );
}