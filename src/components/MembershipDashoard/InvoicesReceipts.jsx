//src/components/MembershipDashoard/InvoicesReceipts.jsx
import React from "react";
import DashboardLayout from "../Shared/DashboardLayout";
export default function InvoicesReceipts(){
  return(
    <DashboardLayout title="Invoices & Receipts" nav={[{to:"/dash/membership",label:"Overview"}]}>
      <p>Invoices, receipts, and download PDF.</p>
    </DashboardLayout>
  );
}
