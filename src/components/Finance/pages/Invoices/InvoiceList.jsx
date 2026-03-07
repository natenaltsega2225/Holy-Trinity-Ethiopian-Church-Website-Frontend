import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../../Shared/DashboardLayout";

export default function InvoiceList() {
  return (
    <DashboardLayout title="Invoices" nav={[{ to: "/dash/finance", label: "Dashboard" }]}>
      <div className="panel">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <p style={{ margin: 0 }}>Invoices list – coming next.</p>
          <Link className="btn" to="/dash/finance/invoices/new">New Invoice</Link>
        </div>
      </div>
    </DashboardLayout>
  );
}