// src/components/AdminDashboard/NewsEventsAdmin.jsx
import React, { useEffect, useMemo, useState } from "react";
import api, { toPublicUrl } from "../api";
import "../../styles/newsEventsAdmin.css";

const CATEGORY_OPTIONS = [
  { value: "kids", label: "Kids Programs" },
  { value: "holiday", label: "Holiday Activities" },
  { value: "trip", label: "Trips" },
  { value: "news", label: "Church News" },
];

function safeText(v) {
  return String(v || "").trim();
}

function normalizeListResponse(res) {
  const data = res?.data;
  if (Array.isArray(data?.rows)) return data;
  if (Array.isArray(data?.items)) return { ...data, rows: data.items };
  if (Array.isArray(data)) return { rows: data, page: 1, totalPages: 1, total: data.length };
  return { rows: [], page: 1, totalPages: 1, total: 0 };
}

export default function NewsEventsAdmin() {
  const [rows, setRows] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState("all");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const limit = 8;

  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    category: "news",
    title: "",
    summary: "",
    audience: "",
    start_date: "",
    end_date: "",
    time_text: "",
    location: "",
    is_published: true,
    pdf_title: "Open PDF (print / download)",
    pdf_url: "",
    flyer_url: "",
    body_html: "",
    remove_flyer: false,
    remove_pdf: false,
  });

  const [flyerFile, setFlyerFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  async function load() {
    setLoading(true);
    try {
      const res = await api.get("/news-events/admin", {
        params: { category, q, page, limit },
      });
      const parsed = normalizeListResponse(res);
      setRows(parsed.rows || []);
      setTotalPages(Number(parsed.totalPages || 1));
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.error || "Failed to load events");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, q, page]);

  const canPrev = page > 1;
  const canNext = useMemo(() => page < totalPages, [page, totalPages]);

  function openCreate() {
    setEditing(null);
    setFlyerFile(null);
    setPdfFile(null);
    setForm({
      category: "news",
      title: "",
      summary: "",
      audience: "",
      start_date: "",
      end_date: "",
      time_text: "",
      location: "",
      is_published: true,
      pdf_title: "Open PDF (print / download)",
      pdf_url: "",
      flyer_url: "",
      body_html: "",
      remove_flyer: false,
      remove_pdf: false,
    });
    setOpen(true);
  }

  function openEdit(item) {
    setEditing(item);
    setFlyerFile(null);
    setPdfFile(null);
    setForm({
      category: item?.category || "news",
      title: item?.title || "",
      summary: item?.summary || "",
      audience: item?.audience || "",
      start_date: (item?.start_date || "").slice(0, 10),
      end_date: (item?.end_date || "").slice(0, 10),
      time_text: item?.time_text || "",
      location: item?.location || "",
      is_published: !!item?.is_published,
      pdf_title: item?.pdf_title || "Open PDF (print / download)",
      pdf_url: item?.pdf_url || "",
      flyer_url: item?.flyer_url || "",
      body_html: item?.body_html || "",
      remove_flyer: false,
      remove_pdf: false,
    });
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
    setEditing(null);
  }

  async function removeItem(item) {
    if (!window.confirm("Delete this announcement?")) return;
    try {
      await api.delete(`/news-events/admin/${item.id}`);
      await load();
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.error || "Delete failed");
    }
  }

  async function submit(e) {
    e.preventDefault();
    const title = safeText(form.title);
    if (!title) return alert("Title is required.");

    setSaving(true);
    try {
      const fd = new FormData();
      fd.set("category", form.category);
      fd.set("title", title);
      fd.set("summary", safeText(form.summary));
      fd.set("audience", safeText(form.audience));
      fd.set("start_date", form.start_date || "");
      fd.set("end_date", form.end_date || "");
      fd.set("time_text", safeText(form.time_text));
      fd.set("location", safeText(form.location));
      fd.set("is_published", form.is_published ? "1" : "0");
      fd.set("pdf_title", safeText(form.pdf_title));
      fd.set("pdf_url", safeText(form.pdf_url));
      fd.set("flyer_url", safeText(form.flyer_url));
      fd.set("body_html", form.body_html || "");

      if (form.remove_flyer) fd.set("remove_flyer", "1");
      if (form.remove_pdf) fd.set("remove_pdf", "1");

      if (flyerFile) fd.append("flyer_image", flyerFile);
      if (pdfFile) fd.append("attachment_pdf", pdfFile);

      if (editing?.id) {
        await api.put(`/news-events/admin/${editing.id}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
      } else {
        await api.post(`/news-events/admin`, fd, { headers: { "Content-Type": "multipart/form-data" } });
      }

      closeModal();
      await load();
    } catch (e2) {
      console.error(e2);
      alert(e2?.response?.data?.error || "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="neAdminWrap">
      <div className="neAdminHeader">
        <div>
          <h2 className="neAdminTitle">News &amp; Events (Admin)</h2>
          <div className="neAdminSub">Create, edit, publish, and manage announcements. Upload flyer + PDF or use links.</div>
        </div>

        <div className="neAdminHeaderActions">
          <button className="neBtnSolid" onClick={load} disabled={loading}>
            {loading ? "Loading..." : "Refresh"}
          </button>
          <button className="neBtnSolid" onClick={openCreate}>
            + New Announcement
          </button>
        </div>
      </div>

      <div className="neAdminFilters">
        <div className="neField">
          <label>Category</label>
          <select value={category} onChange={(e) => { setPage(1); setCategory(e.target.value); }}>
            <option value="all">All</option>
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        <div className="neField neGrow">
          <label>Search</label>
          <input
            value={q}
            onChange={(e) => { setPage(1); setQ(e.target.value); }}
            placeholder="Search title, summary, location..."
          />
        </div>

        <div className="nePager">
          <button className="neBtnOutline" disabled={!canPrev} onClick={() => setPage((p) => Math.max(1, p - 1))}>
            Prev
          </button>
          <div className="nePagerText">Page {page} / {totalPages}</div>
          <button className="neBtnOutline" disabled={!canNext} onClick={() => setPage((p) => p + 1)}>
            Next
          </button>
        </div>
      </div>

      <div className="neAdminList">
        {rows.length ? (
          rows.map((it) => (
            <div className="neAdminRow" key={it.id}>
              <div className="neAdminRowMain">
                <div className="neAdminRowTitle">
                  {it.title}{" "}
                  <span className={`nePill ${it.is_published ? "isOn" : "isOff"}`}>
                    {it.is_published ? "Published" : "Draft"}
                  </span>
                </div>
                <div className="neAdminRowMeta">
                  <span className="neMetaTag">{it.category}</span>
                  {it.start_date && <span className="neMetaTag">{it.start_date}</span>}
                  {it.time_text && <span className="neMetaTag">{it.time_text}</span>}
                  {it.location && <span className="neMetaTag">{it.location}</span>}
                </div>
              </div>

              <div className="neAdminRowActions">
                <button className="neBtnOutline" onClick={() => openEdit(it)}>Edit</button>
                <button className="neBtnDanger" onClick={() => removeItem(it)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <div className="neEmpty">No announcements found.</div>
        )}
      </div>

      {open && (
        <div className="neModalOverlay" role="dialog" aria-modal="true">
          <div className="neModal">
            <div className="neModalHeader">
              <div className="neModalTitle">{editing ? "Edit Announcement" : "New Announcement"}</div>
              <button className="neIconBtn" onClick={closeModal} aria-label="Close">✕</button>
            </div>

            <form className="neModalBody" onSubmit={submit}>
              <div className="neGrid2">
                <div className="neField">
                  <label>Category</label>
                  <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div className="neField">
                  <label>Title *</label>
                  <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required />
                </div>

                <div className="neField neSpan2">
                  <label>Summary</label>
                  <textarea rows={3} value={form.summary} onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))} />
                </div>

                <div className="neField">
                  <label>Audience</label>
                  <input value={form.audience} onChange={(e) => setForm((f) => ({ ...f, audience: e.target.value }))} placeholder="e.g. all, youth, members" />
                </div>

                <div className="neField">
                  <label>Location</label>
                  <input value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} placeholder="e.g. 2558 Couchville Pike" />
                </div>

                <div className="neField">
                  <label>Start Date</label>
                  <input type="date" value={form.start_date} onChange={(e) => setForm((f) => ({ ...f, start_date: e.target.value }))} />
                </div>

                <div className="neField">
                  <label>End Date</label>
                  <input type="date" value={form.end_date} onChange={(e) => setForm((f) => ({ ...f, end_date: e.target.value }))} />
                </div>

                <div className="neField neSpan2">
                  <label>Time</label>
                  <input value={form.time_text} onChange={(e) => setForm((f) => ({ ...f, time_text: e.target.value }))} placeholder="Example: 10:00 AM - 12:00 PM" />
                </div>

                <div className="neField neSpan2">
                  <label>Details (HTML or plain text)</label>
                  <textarea rows={8} value={form.body_html} onChange={(e) => setForm((f) => ({ ...f, body_html: e.target.value }))} placeholder="You can paste HTML, or just type text." />
                  <div className="neHint">Tip: If you don’t want HTML, just type normal text.</div>
                </div>

                <div className="neField">
                  <label>Flyer Image Upload</label>
                  <input type="file" accept="image/*" onChange={(e) => setFlyerFile(e.target.files?.[0] || null)} />
                  {editing?.flyer_url && (
                    <div className="neMiniRow">
                      <a href={toPublicUrl(editing.flyer_url)} target="_blank" rel="noreferrer">View current</a>
                      <label className="neCheck">
                        <input type="checkbox" checked={!!form.remove_flyer} onChange={(e) => setForm((f) => ({ ...f, remove_flyer: e.target.checked }))} />
                        Remove
                      </label>
                    </div>
                  )}
                </div>

                <div className="neField">
                  <label>PDF Upload</label>
                  <input type="file" accept="application/pdf" onChange={(e) => setPdfFile(e.target.files?.[0] || null)} />
                  {editing?.pdf_url && (
                    <div className="neMiniRow">
                      <a href={toPublicUrl(editing.pdf_url)} target="_blank" rel="noreferrer">Open current</a>
                      <label className="neCheck">
                        <input type="checkbox" checked={!!form.remove_pdf} onChange={(e) => setForm((f) => ({ ...f, remove_pdf: e.target.checked }))} />
                        Remove
                      </label>
                    </div>
                  )}
                </div>

                <div className="neField neSpan2">
                  <label>PDF Title (shows on frontend)</label>
                  <input value={form.pdf_title} onChange={(e) => setForm((f) => ({ ...f, pdf_title: e.target.value }))} />
                </div>

                <div className="neField neSpan2">
                  <label>Optional Links (if not uploading)</label>
                  <div className="neGrid2">
                    <div className="neField">
                      <label>Flyer URL</label>
                      <input value={form.flyer_url} onChange={(e) => setForm((f) => ({ ...f, flyer_url: e.target.value }))} placeholder="https://..." />
                    </div>
                    <div className="neField">
                      <label>PDF URL</label>
                      <input value={form.pdf_url} onChange={(e) => setForm((f) => ({ ...f, pdf_url: e.target.value }))} placeholder="https://..." />
                    </div>
                  </div>
                </div>

                <div className="neField neSpan2">
                  <label className="neCheck">
                    <input type="checkbox" checked={!!form.is_published} onChange={(e) => setForm((f) => ({ ...f, is_published: e.target.checked }))} />
                    Published
                  </label>
                </div>
              </div>

              <div className="neModalFooter">
                <button type="button" className="neBtnOutline" onClick={closeModal}>Cancel</button>
                <button type="submit" className="neBtnSolid" disabled={saving}>
                  {saving ? "Saving..." : editing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}