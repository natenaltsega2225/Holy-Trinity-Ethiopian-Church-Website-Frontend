//src/components/Shared/MemberFilters.jsx
import React from "react";

export default function MemberFilters({ value, onChange }) {
  const upd = (k, v) => onChange({ ...value, [k]: v });

  return (
    <div className="filters">
      <input
        placeholder="Search name/email"
        value={value.text || ""}
        onChange={(e)=>upd("text", e.target.value)}
      />
      <select value={value.status || "active"} onChange={(e)=>upd("status", e.target.value)}>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="delinquent">Delinquent</option>
      </select>
      <select value={value.plan || ""} onChange={(e)=>upd("plan", e.target.value)}>
        <option value="">All plans</option>
        <option value="1">Monthly</option>
        <option value="6">6 Months</option>
        <option value="12">12 Months</option>
      </select>
    </div>
  );
}
