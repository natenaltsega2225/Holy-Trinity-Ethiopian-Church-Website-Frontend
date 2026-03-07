

// src/components/AdminDashboard/MemberManagement.jsx
// src/components/AdminDashboard/MemberManagement.jsx
import React from "react";
import UsersTable from "../Shared/UsersTable";

export default function MemberManagement() {
  return (
    <div>
      <h2 className="dash-title" style={{ marginBottom: 8 }}>
        Member Management
      </h2>
      <div style={{ color: "var(--dash-muted)", fontWeight: 850, marginBottom: 12 }}>
        Search, create, edit member info, update roles, and delete accounts.
      </div>

      <UsersTable
        endpoint="/admin/users"
        canCreate={true}
        canEditRole={true}
        canDelete={true}
        showAddress={true}
        showBilling={true}
        stickyHeader={true}
      />
    </div>
  );
}