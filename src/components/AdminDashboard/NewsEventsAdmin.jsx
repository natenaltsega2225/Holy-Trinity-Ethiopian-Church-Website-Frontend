

// src/components/AdminDashboard/NewsEventsAdmin.jsx
import React, { useEffect, useMemo, useState, useRef } from "react";
import DashboardLayout from "../Shared/DashboardLayout";
import api from "../api";
import "../../styles/dashboard.css";
import "../../styles/auth.css";

// left nav for the top bar in DashboardLayout
const NAV = [{ to: "/dash/admin/events", label: "Events" }];

/* ------------------------------------------------------------------
   WYSIWYG / Notepad-style editor (no extra dependency)
   - Bold / italic / underline
   - Bullets, numbered list
   - Headings (P, H3, H4)
   - Text colours
   - Align left/center/right
   - Indent / outdent
   - Link, clear formatting
   Content is stored as clean HTML in the DB.
-------------------------------------------------------------------*/
function WysiwygEditor({ label, value, onChange, placeholder }) {
  const editorRef = useRef(null);

  // keep DOM in sync with incoming value (Edit mode)
  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    const html = value || "";
    if (el.innerHTML !== html) {
      el.innerHTML = html;
    }
  }, [value]);

  const exec = (cmd, arg = null) => {
    const el = editorRef.current;
    if (!el) return;
    el.focus();
    try {
      document.execCommand(cmd, false, arg);
      onChange(el.innerHTML);
    } catch (e) {
      console.warn("execCommand failed", cmd, arg, e);
    }
  };

  const handleInput = () => {
    const el = editorRef.current;
    if (!el) return;
    onChange(el.innerHTML);
  };

  const makeLink = () => {
    const url = window.prompt("Enter URL (https://…):");
    if (!url) return;
    exec("createLink", url);
  };

  const setBlock = (tag) => exec("formatBlock", tag);

  return (
    <div className="auth-field rte-field">
      <label>{label}</label>

      <div className="rte-toolbar">
        <button type="button" onClick={() => exec("bold")}>
          B
        </button>
        <button type="button" onClick={() => exec("italic")}>
          I
        </button>
        <button type="button" onClick={() => exec("underline")}>
          U
        </button>

        <span className="rte-sep" />

        <button type="button" onClick={() => exec("insertUnorderedList")}>
          • List
        </button>
        <button type="button" onClick={() => exec("insertOrderedList")}>
          1.
        </button>

        <span className="rte-sep" />

        <button type="button" onClick={() => setBlock("p")}>
          P
        </button>
        <button type="button" onClick={() => setBlock("h3")}>
          H3
        </button>
        <button type="button" onClick={() => setBlock("h4")}>
          H4
        </button>

        <span className="rte-sep" />

        <button type="button" onClick={() => exec("foreColor", "#111827")}>
          A
        </button>
        <button type="button" onClick={() => exec("foreColor", "#1d4ed8")}>
          A
        </button>
        <button type="button" onClick={() => exec("foreColor", "#15803d")}>
          A
        </button>

        <span className="rte-sep" />

        <button type="button" onClick={() => exec("justifyLeft")}>
          ⇤
        </button>
        <button type="button" onClick={() => exec("justifyCenter")}>
          ⌾
        </button>
        <button type="button" onClick={() => exec("justifyRight")}>
          ⇥
        </button>

        <span className="rte-sep" />

        <button type="button" onClick={() => exec("outdent")}>
          «
        </button>
        <button type="button" onClick={() => exec("indent")}>
          »
        </button>

        <span className="rte-sep" />

        <button type="button" onClick={makeLink}>
          🔗
        </button>
        <button type="button" onClick={() => exec("removeFormat")}>
          ⌫
        </button>

        <span className="rte-hint">Rich text – stored as HTML</span>
      </div>

      <div
        ref={editorRef}
        className="rte-editor"
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        data-placeholder={placeholder || ""}
      />
    </div>
  );
}

// ----- Admin Events Page -----

const blank = {
  id: null,
  category: "kids",
  title: "",
  subtitle: "",
  summary: "", // HTML
  body_html: "", // HTML
  start_date: "",
  end_date: "",
  start_time: "",
  end_time: "",
  location: "",
  flyer_url: "",
  pdf_url: "",
  pdf_title: "",
  audience: "",
  is_published: 1,
};

const CATEGORY_LABELS = {
  kids: "Kids Programs",
  holiday: "Holiday Activities",
  trip: "Trips & Outings",
  news: "Church News",
};

function fmtDateRange(row) {
  if (row.start_date || row.end_date) {
    return `${row.start_date || "—"} → ${row.end_date || "—"}`;
  }
  return "—";
}

export default function NewsEventsAdmin() {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(blank);
  const [err, setErr] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  async function load() {
    setLoading(true);
    try {
      const params = {};
      if (categoryFilter !== "all") params.category = categoryFilter;
      if (search.trim()) params.search = search.trim();
      const { data } = await api.get("/news-events", { params });
      setRows(data.rows || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilter]);

  const filteredRows = useMemo(() => {
    if (!search.trim()) return rows;
    const s = search.toLowerCase();
    return rows.filter(
      (r) =>
        (r.title || "").toLowerCase().includes(s) ||
        (r.summary || "").toLowerCase().includes(s) ||
        (r.location || "").toLowerCase().includes(s)
    );
  }, [rows, search]);

  function openNew() {
    setForm(blank);
    setErr("");
    setImageFile(null);
    setPdfFile(null);
    setShowModal(true);
  }

  function openEdit(row) {
    setForm({
      ...blank,
      ...row,
      start_date: row.start_date || "",
      end_date: row.end_date || "",
      start_time: row.start_time ? row.start_time.slice(0, 5) : "",
      end_time: row.end_time ? row.end_time.slice(0, 5) : "",
      is_published: row.is_published ? 1 : 0,
      flyer_url: row.flyer_url || row.flyer_image_url || "",
      pdf_url: row.pdf_url || row.program_pdf_url || "",
      pdf_title: row.pdf_title || "",
    });
    setErr("");
    setImageFile(null);
    setPdfFile(null);
    setShowModal(true);
  }

  function setField(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setErr("");

    if (!form.title.trim()) {
      setErr("Title is required.");
      return;
    }

    try {
      const fd = new FormData();
      fd.append("category", form.category);
      fd.append("title", form.title);
      fd.append("subtitle", form.subtitle || "");
      fd.append("summary", form.summary || "");
      fd.append("body_html", form.body_html || "");
      fd.append("start_date", form.start_date || "");
      fd.append("end_date", form.end_date || "");
      fd.append("start_time", form.start_time || "");
      fd.append("end_time", form.end_time || "");
      fd.append("location", form.location || "");
      fd.append("audience", form.audience || "");
      fd.append("flyer_url", form.flyer_url || "");
      fd.append("pdf_url", form.pdf_url || "");
      fd.append("pdf_title", form.pdf_title || "");
      fd.append("is_published", form.is_published ? "1" : "0");

      if (imageFile) fd.append("flyer_image", imageFile);
      if (pdfFile) fd.append("attachment_pdf", pdfFile);

      if (form.id) {
        await api.put(`/news-events/${form.id}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/news-events", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setShowModal(false);
      await load();
    } catch (e2) {
      console.error(e2);
      setErr(e2.response?.data?.error || "Save failed");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this item?")) return;
    try {
      await api.delete(`/news-events/${id}`);
      load();
    } catch (e) {
      alert(e.response?.data?.error || "Delete failed");
    }
  }

  return (
    <DashboardLayout title="Admin – News & Events" nav={NAV}>
      {/* Filters + New button */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <input
            placeholder="Search title, summary, location…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: "1 1 260px" }}
          />

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="kids">Kids Programs</option>
            <option value="holiday">Holiday Activities</option>
            <option value="trip">Trips & Outings</option>
            <option value="news">Church News</option>
          </select>

          <button onClick={openNew} className="btn btn-primary">
            + New Item
          </button>
        </div>
      </div>

      {/* Table of events */}
      <div className="card" style={{ overflowX: "auto" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Title</th>
              <th>Dates</th>
              <th>Location</th>
              <th>Media</th>
              <th>Published</th>
              <th style={{ width: 180 }} />
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: 16 }}>
                  Loading…
                </td>
              </tr>
            )}

            {!loading &&
              filteredRows.map((r) => {
                const flyerUrl = r.flyer_url || r.flyer_image_url;
                const pdfUrl = r.pdf_url || r.program_pdf_url;
                return (
                  <tr key={r.id}>
                    <td>{CATEGORY_LABELS[r.category] || r.category}</td>
                    <td>{r.title}</td>
                    <td>{fmtDateRange(r)}</td>
                    <td>{r.location || "—"}</td>
                    <td>
                      <div
                        style={{ display: "flex", gap: 6, flexWrap: "wrap" }}
                      >
                        {flyerUrl && (
                          <button
                            type="button"
                            className="btn btn-small"
                            onClick={() =>
                              window.open(flyerUrl, "_blank", "noopener")
                            }
                          >
                            🖼 Image
                          </button>
                        )}
                        {pdfUrl && (
                          <button
                            type="button"
                            className="btn btn-small"
                            onClick={() =>
                              window.open(pdfUrl, "_blank", "noopener")
                            }
                          >
                            📄 PDF
                          </button>
                        )}
                        {!flyerUrl && !pdfUrl && <span>—</span>}
                      </div>
                    </td>
                    <td>
                      {r.is_published ? (
                        <span className="pill pill-ok">Yes</span>
                      ) : (
                        <span className="pill pill-warn">No</span>
                      )}
                    </td>
                    <td className="actions">
                      <button
                        className="btn btn-small"
                        onClick={() => openEdit(r)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-small btn-danger"
                        onClick={() => handleDelete(r.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}

            {!loading && !filteredRows.length && (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: 18 }}>
                  No items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="terms-overlay" role="dialog" aria-modal="true">
          <div className="terms-modal events-modal">
            <div className="terms-head">
              <h2>{form.id ? "Edit Item" : "Create Item"}</h2>
              <button
                className="terms-close"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {err && (
              <div className="auth-banner" style={{ margin: "0 0 10px" }}>
                {err}
              </div>
            )}

            <div className="events-modal-body">
              <form className="auth-form" onSubmit={handleSave}>
                <div className="auth-grid-2">
                  <div className="auth-field">
                    <label>Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => setField("category", e.target.value)}
                    >
                      <option value="kids">Kids Programs</option>
                      <option value="holiday">Holiday Activities</option>
                      <option value="trip">Trips & Outings</option>
                      <option value="news">Church News</option>
                    </select>
                  </div>
                  <div className="auth-field">
                    <label>Published</label>
                    <select
                      value={form.is_published ? 1 : 0}
                      onChange={(e) =>
                        setField("is_published", Number(e.target.value))
                      }
                    >
                      <option value={1}>Yes</option>
                      <option value={0}>No (draft)</option>
                    </select>
                  </div>
                </div>

                <div className="auth-field">
                  <label>Title</label>
                  <input
                    value={form.title}
                    onChange={(e) => setField("title", e.target.value)}
                    required
                  />
                </div>

                <div className="auth-field">
                  <label>Subtitle (short tagline)</label>
                  <input
                    value={form.subtitle}
                    onChange={(e) => setField("subtitle", e.target.value)}
                  />
                </div>

                <WysiwygEditor
                  label="Summary (shown on cards / top of details)"
                  value={form.summary}
                  onChange={(v) => setField("summary", v)}
                  placeholder="Short teaser that appears in the public view."
                />

                <WysiwygEditor
                  label="Full Description / Details"
                  value={form.body_html}
                  onChange={(v) => setField("body_html", v)}
                  placeholder="Full description, schedule, notes, etc."
                />

                <div className="auth-grid-3">
                  <div className="auth-field">
                    <label>Start Date</label>
                    <input
                      type="date"
                      value={form.start_date || ""}
                      onChange={(e) => setField("start_date", e.target.value)}
                    />
                  </div>
                  <div className="auth-field">
                    <label>End Date</label>
                    <input
                      type="date"
                      value={form.end_date || ""}
                      onChange={(e) => setField("end_date", e.target.value)}
                    />
                  </div>
                  <div className="auth-field">
                    <label>Location</label>
                    <input
                      value={form.location}
                      onChange={(e) => setField("location", e.target.value)}
                    />
                  </div>
                </div>

                <div className="auth-grid-2">
                  <div className="auth-field">
                    <label>Start Time</label>
                    <input
                      type="time"
                      value={form.start_time || ""}
                      onChange={(e) => setField("start_time", e.target.value)}
                    />
                  </div>
                  <div className="auth-field">
                    <label>End Time</label>
                    <input
                      type="time"
                      value={form.end_time || ""}
                      onChange={(e) => setField("end_time", e.target.value)}
                    />
                  </div>
                </div>

                <div className="auth-grid-2">
                  <div className="auth-field">
                    <label>Audience (e.g., Kids 6–12, Youth, Families)</label>
                    <input
                      value={form.audience}
                      onChange={(e) => setField("audience", e.target.value)}
                    />
                  </div>
                  <div className="auth-field">
                    <label>Existing Flyer / PDF URLs (optional)</label>
                    <input
                      value={form.flyer_url}
                      onChange={(e) => setField("flyer_url", e.target.value)}
                      placeholder="https://… flyer image URL"
                    />
                    <input
                      style={{ marginTop: 8 }}
                      value={form.pdf_url}
                      onChange={(e) => setField("pdf_url", e.target.value)}
                      placeholder="https://… program PDF URL"
                    />
                  </div>
                </div>

                <div className="auth-field">
                  <label>PDF Resource Title (shown in PDF list)</label>
                  <input
                    value={form.pdf_title}
                    onChange={(e) => setField("pdf_title", e.target.value)}
                    placeholder="Program / flyer PDF"
                  />
                </div>

                <div className="auth-grid-2">
                  <div className="auth-field">
                    <label>Upload Flyer Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setImageFile(e.target.files?.[0] || null)
                      }
                    />
                    <small className="field-note">
                      JPG / PNG recommended. If you leave this empty, any
                      existing image URL will be kept.
                    </small>
                  </div>
                  <div className="auth-field">
                    <label>Upload PDF (program / flyer)</label>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                    />
                    <small className="field-note">
                      Optional PDF attachment visible on the public page.
                    </small>
                  </div>
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn-secondary terms-cancel"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary terms-accept">
                    {form.id ? "Save" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
