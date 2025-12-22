//src/components/FinanceDashboard/MemberManagement.jsx

// src/components/FinanceDashboard/MemberManagement.jsx
import React from "react";
import DashboardLayout from "../Shared/DashboardLayout";
import UsersTable from "../Shared/UsersTable";

export default function FinanceMemberManagement(){
  return (
    <DashboardLayout title="Members (Finance View)" nav={[{to:"/dash/finance",label:"Overview"}]}>
      <UsersTable canCreate={false} canEditRole={false} canDelete={false} />
    </DashboardLayout>
  );
}

