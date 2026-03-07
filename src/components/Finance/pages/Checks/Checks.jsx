import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../../Shared/DashboardLayout";

export default function Checks() {
  return (
    <DashboardLayout title="Checks" nav={[{ to: "/dash/finance", label: "Dashboard" }]}>
      <div className="panel">
        <p>Record and reconcile checks – coming next.</p>
        <Link className="btn btn-small" to="/dash/finance/checks/manage">Manage Checks</Link>
      </div>
    </DashboardLayout>
  );
}