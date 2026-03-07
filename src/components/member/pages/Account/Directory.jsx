// src/features/member/pages/Account/Directory.jsx
import React from "react";
import UsersTable from "../../../Shared/UsersTable";

export default function Directory() {
  return (
    <div>
      <div className="dash-title" style={{ marginBottom: 10 }}>
        Member Directory
      </div>

      {/* endpoint matches your backend: /api/members/directory */}
      <UsersTable
        endpoint="/members/directory"
        canCreate={false}
        canEditRole={false}
        canDelete={false}
        showAddress={true}
        showBilling={true}
      />
    </div>
  );
}