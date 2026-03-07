import React from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../../Shared/DashboardLayout";

export default function InvoiceDetails() {
  const { id } = useParams();
  return (
    <DashboardLayout title={`Invoice #${id}`} nav={[{ to: "/dash/finance/invoices", label: "Invoices" }]}>
      <div className="panel">
        <p>Invoice details & PDF download – coming next.</p>
      </div>
    </DashboardLayout>
  );
}