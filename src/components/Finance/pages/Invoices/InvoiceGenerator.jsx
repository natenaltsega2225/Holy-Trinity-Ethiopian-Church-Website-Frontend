import React from "react";
import DashboardLayout from "../../../Shared/DashboardLayout";

export default function InvoiceGenerator() {
  return (
    <DashboardLayout title="Create Invoice" nav={[{ to: "/dash/finance/invoices", label: "Invoices" }]}>
      <div className="panel">
        <p>Create/send invoices and mark paid/void – coming next.</p>
      </div>
    </DashboardLayout>
  );
}