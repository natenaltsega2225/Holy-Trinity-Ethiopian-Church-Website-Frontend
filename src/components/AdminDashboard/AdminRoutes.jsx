
// src/components/AdminDashboard/AdminRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "../ProtectedRoute";
import AdminLayout from "./AdminLayout";

import Overview from "./overview";
import MemberManagement from "./MemberManagement";
import MembershipPlans from "./MembershipPlans";
import Roles from "./Roles";
import AuditLogs from "./AuditLogs";
import SystemSettings from "./SystemSettings";
import NewsEventsAdmin from "./NewsEventsAdmin";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* /dash/admin */}
        <Route index element={<Overview />} />

        {/* /dash/admin/members */}
        <Route path="members" element={<MemberManagement />} />

        {/* /dash/admin/plans */}
        <Route path="plans" element={<MembershipPlans />} />

        {/* /dash/admin/events */}
        <Route path="events" element={<NewsEventsAdmin />} />

        {/* /dash/admin/roles */}
        <Route path="roles" element={<Roles />} />

        {/* /dash/admin/audit */}
        <Route path="audit" element={<AuditLogs />} />

        {/* /dash/admin/settings */}
        <Route path="settings" element={<SystemSettings />} />

        {/* unknown children → overview */}
        <Route path="*" element={<Navigate to="." replace />} />
      </Route>
    </Routes>
  );
}
