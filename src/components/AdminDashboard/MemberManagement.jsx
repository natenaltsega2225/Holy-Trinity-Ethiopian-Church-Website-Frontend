
// src/components/AdminDashboard/MemberManagement.jsx
import React from "react";
import DashboardLayout from "../Shared/DashboardLayout";
import UsersTable from "../Shared/UsersTable";

const NAV = [
  { to:"/dash/admin", label:"Overview" },
  { to:"/dash/admin/members", label:"Member Management" },
  { to:"/dash/admin/plans", label:"Membership Plans" },
  { to:"/dash/admin/roles", label:"Roles" },
  { to:"/dash/admin/audit", label:"Audit Logs" },
  { to:"/dash/admin/settings", label:"System Settings" },
];

export default function MemberManagement(){
  return (
    <DashboardLayout title="Admin — Member Management" nav={NAV}>
      <UsersTable canCreate={true} canEditRole={true} canDelete={true} />
    </DashboardLayout>
  );
}
