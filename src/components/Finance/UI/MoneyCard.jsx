import React from "react";

function moneyFromCents(cents) {
  if (cents == null) return "—";
  return `$${(Number(cents) / 100).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function MoneyCard({ label, valueCents, hint, icon = "💰", onClick }) {
  return (
    <button type="button" className="overview-kpi-card" onClick={onClick} style={{ textAlign: "left" }}>
      <div className="overview-kpi-label">
        {icon} {label}
      </div>
      <div className="overview-kpi-value">{moneyFromCents(valueCents)}</div>
      {hint ? <div className="overview-kpi-sub">{hint}</div> : null}
    </button>
  );
}