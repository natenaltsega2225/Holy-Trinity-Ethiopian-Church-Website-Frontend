//src/components/AdminDashboard/SystemSettings.jsx
// src/components/AdminDashboard/SystemSettings.jsx
import React from "react";

export default function SystemSettings() {
  return (
    <div>
      <h2 className="dash-title">System Settings</h2>
      <p style={{ marginTop: 8, color: "#64748b" }}>
        Branding, email templates, backup, SSO, environment info.
      </p>
    </div>
  );
}