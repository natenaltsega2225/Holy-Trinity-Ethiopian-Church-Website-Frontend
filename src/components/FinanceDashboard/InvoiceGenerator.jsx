//src/components/FinanceDashboard/InvoiceGenerator.jsx
import React from "react";
import DashboardLayout from "../Shared/DashboardLayout";
export default function InvoiceGenerator(){
  return(
    <DashboardLayout title="Invoices" nav={[{to:"/dash/finance",label:"Overview"}]}>
      <p>Create & send invoices; mark paid/void; reminders.</p>
    </DashboardLayout>
  );
}
