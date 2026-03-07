import React from "react";
import DashboardLayout from "../../../Shared/DashboardLayout";

export default function ReceiptTemplates() {
  return (
    <DashboardLayout title="Receipt Templates" nav={[{ to: "/dash/finance/settings", label: "Settings" }]}>
      <div className="panel">
        <p>Configure receipt header/footer, tax language, and signature block.</p>
      </div>
    </DashboardLayout>
  );
}