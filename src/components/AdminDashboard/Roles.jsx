//src/components/AdminDashboard/Roles.jsx
import React from "react";
import DashboardLayout from "../Shared/DashboardLayout";
export default function Roles(){
  return(
    <DashboardLayout title="Roles & Permissions" nav={[{to:"/dash/admin",label:"Overview"}]}>
      <p>Assign roles: admin, finance, member_mgr, member.</p>
    </DashboardLayout>
  );
}
