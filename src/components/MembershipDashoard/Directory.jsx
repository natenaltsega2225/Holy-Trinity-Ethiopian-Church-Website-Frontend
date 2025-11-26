// src/components/MembershipDashboard/Directory.jsx
import React from "react";
import DashboardLayout from "../Shared/DashboardLayout";
import UsersTable from "../Shared/UsersTable";

const NAV = [
  { to:"/dash/membership", label:"Overview", end:true },
  { to:"/dash/membership/my-profile", label:"My Profile" },
  { to:"/dash/membership/my-payments", label:"My Payments" },
  { to:"/dash/membership/renewal", label:"Renewal" },
  { to:"/dash/membership/invoices", label:"Invoices & Receipts" },
  { to:"/dash/membership/announcements", label:"Announcements" },
  { to:"/dash/membership/directory", label:"Member Directory" }, // NEW
];

export default function Directory(){
  return (
    <DashboardLayout title="Member Directory" nav={NAV}>
      {/* use directory endpoint (limited fields), read-only */}
      <UsersTable endpoint="/members/directory" canCreate={false} canEditRole={false} canDelete={false} />
    </DashboardLayout>
  );
}
