//src/components/Shared/MembersList.jsx
import React, { useEffect, useState } from "react";
import api from "../api";
import MemberFilters from "./MemberFilters";

export default function MembersList({ canEdit=false, canExport=false }) {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState({ text:"", status:"active" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/members", { params:q });
        setRows(data?.rows || []);
      } catch (e) {
        console.error(e);
        setRows([]);
      }
      setLoading(false);
    })();
  }, [q]);

  return (
    <>
      <div className="dash-title">Membership</div>
      <MemberFilters value={q} onChange={setQ} />
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Status</th><th>Plan</th><th>Next Due</th><th>Total Paid</th>{(canEdit||canExport)&&<th/>}
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan={7}>Loading…</td></tr> :
              rows.length ? rows.map(m=>(
                <tr key={m.id}>
                  <td>{m.first_name} {m.last_name}</td>
                  <td>{m.email}</td>
                  <td>{m.status}</td>
                  <td>{m.plan_label}</td>
                  <td>{m.next_due || "—"}</td>
                  <td>${(m.total_paid||0).toLocaleString()}</td>
                  {(canEdit||canExport) && (
                    <td className="actions">
                      {canEdit && <button onClick={()=>{/* open edit modal */}}>Edit</button>}
                      {canExport && <button onClick={()=>{/* export single */}}>Export</button>}
                    </td>
                  )}
                </tr>
              )) : <tr><td colSpan={7}>No members found.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
