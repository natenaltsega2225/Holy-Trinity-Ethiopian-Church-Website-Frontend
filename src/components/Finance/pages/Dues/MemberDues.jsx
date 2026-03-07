import React from "react";
import DashboardLayout from "../../../Shared/DashboardLayout";

export default function MemberDues() {
  return (
    <DashboardLayout title="Member Dues" nav={[{ to: "/dash/finance", label: "Dashboard" }]}>
      <div className="panel">
        <p>Member dues status + reminders – coming next.</p>
      </div>
    </DashboardLayout>
  );
}