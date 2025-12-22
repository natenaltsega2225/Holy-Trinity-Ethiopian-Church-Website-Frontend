//src/components/FinanceDashboard/Exports.jsx
import React from "react";
import DashboardLayout from "../Shared/DashboardLayout";
export default function Exports(){
  return(
    <DashboardLayout title="Exports" nav={[{to:"/dash/finance",label:"Overview"}]}>
      <p>CSV export: members, payments, invoices, GL summary.</p>
    </DashboardLayout>
  );
}
