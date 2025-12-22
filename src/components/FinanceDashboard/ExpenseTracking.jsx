//src/components/FinanceDashboard/ExpenseTracking.jsx
import React from "react";
import DashboardLayout from "../Shared/DashboardLayout";
export default function ExpenseTracking(){
  return(
    <DashboardLayout title="Expenses" nav={[{to:"/dash/finance",label:"Overview"}]}>
      <p>Track expenses, categories, receipts, reimbursements.</p>
    </DashboardLayout>
  );
}
