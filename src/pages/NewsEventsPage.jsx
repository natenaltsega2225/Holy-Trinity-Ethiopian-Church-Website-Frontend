
// src/pages/NewsEventsPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../components/api";
import "../styles/eventsNewsPage.css";

const CAT_INFO = {
  kids: {
    id: "kids",
    label: "Kids Programs",
    eyebrow: "Kids & Youth",
    description:
      "Browse upcoming and recent kids programs, classes, and faith-building activities.",
  },
  holiday: {
    id: "holiday",
    label: "Holiday Activities",
    eyebrow: "Liturgical Cycle",
    description:
      "Feasts, fasts, and special celebrations throughout the liturgical year.",
  },
  trip: {
    id: "trip",
    label: "Trips & Outings",
    eyebrow: "Trips & Retreats",
    description:
      "Retreats, picnics, trips, and group outings that create lasting memories.",
  },
  news: {
    id: "news",
    label: "Church News",
    eyebrow: "Stay Informed",
    description:
      "Announcements, updates, and important information from our parish.",
  },
};

function formatTime(t) {
  if (!t) return "";
  const [hStr, mStr] = t.split(":");
  let h = Number(hStr || 0);
  const m = (mStr || "00").padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  if (h === 0) h = 12;
  else if (h > 12) h -= 12;
  return `${h}:${m} ${ampm}`;
}

function formatDate(row) {
  if (!row.start_date && !row.end_date) return "";

  const start = row.start_date
    ? new Date(row.start_date).toLocaleDateString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const end = row.end_date
    ? new Date(row.end_date).toLocaleDateString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  if (start && end && start !== end) return `${start} – ${end}`;
  return start || end || "";
}

export default function NewsEventsCategory() {
  const { category } = useParams();
  const nav = useNavigate();

  const cat = CAT_INFO[category] || {
    label: "Events",
    eyebrow: "Events & News",
    description: "Browse upcoming and recent items.",
  };

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [expanded, setExpanded] = useState({}); // for "Read more"

  useEffect(() => {
    (async () => {
      setLoading(true);
      setErr("");
      try {
        const { data } = await api.get("/news-events", {
          params: { category },
        });
        setRows(data.rows || []);
      } catch (e) {
        console.error(e);
        setErr("Could not load events for this category.");
      } finally {
        setLoading(false);
      }
    })();
  }, [category]);

  const toggleExpanded = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="cat-page-wrap">
      <div className="cat-page-header">
        <div>
          <div className="cat-eyebrow">{cat.eyebrow}</div>
          <h1>{cat.label}</h1>
          <p>{cat.description}</p>
        </div>
        <button
          type="button"
          className="cat-back-btn"
          onClick={() => nav("/news-events")}
        >
          ← Back to News &amp; Events
        </button>
      </div>

      {err && <div className="cat-error">{err}</div>}
      {loading && <div className="cat-loading">Loading items…</div>}
      {!loading && !rows.length && (
        <div className="cat-empty">No items posted yet for this category.</div>
      )}

      <div className="cat-events-list">
        {rows.map((row) => {
          const flyerUrl = row.flyer_image_url || row.flyer_url || "";
          const pdfUrl = row.program_pdf_url || row.pdf_url || "";
          const pdfTitle = row.pdf_title || "Program / flyer PDF";

          const showDetails = !!expanded[row.id];

          return (
            <article key={row.id} className="cat-event-card">
              {/* LEFT: large banner image (with placeholder if missing) */}
              <div className="cat-event-media">
                {flyerUrl ? (
                  <img
                    src={flyerUrl}
                    alt={row.title || cat.label}
                    className="cat-event-img"
                  />
                ) : (
                  <div className="cat-event-img placeholder">
                    <div className="cat-ph-title">{cat.label}</div>
                    <div className="cat-ph-sub">Program banner / flyer</div>
                  </div>
                )}
              </div>

              {/* RIGHT: title, date, PDF list, text content */}
              <div className="cat-event-body">
                <header className="cat-event-header">
                  <div className="cat-event-header-main">
                    <h2>{row.title || "Untitled event"}</h2>
                    {row.location && (
                      <div className="cat-event-location">{row.location}</div>
                    )}
                    {formatDate(row) && (
                      <div className="cat-event-date">
                        {formatDate(row)}
                        {row.start_time && (
                          <> · {formatTime(row.start_time)}</>
                        )}
                      </div>
                    )}
                  </div>

                  {/* PDF resources card – behaves like a list header */}
                  <div className="cat-pdf-resources">
                    <div className="cat-pdf-heading">PDF RESOURCES</div>
                    {pdfUrl ? (
                      <button
                        type="button"
                        className="cat-pdf-card"
                        onClick={() =>
                          window.open(pdfUrl, "_blank", "noopener")
                        }
                      >
                        <div className="cat-pdf-icon">📄</div>
                        <div className="cat-pdf-text">
                          <div className="cat-pdf-title">{pdfTitle}</div>
                          <div className="cat-pdf-sub">
                            Click to read, print, or download.
                          </div>
                        </div>
                      </button>
                    ) : (
                      <div className="cat-pdf-card cat-pdf-card-disabled">
                        <div className="cat-pdf-icon">📄</div>
                        <div className="cat-pdf-text">
                          <div className="cat-pdf-title">No PDF attached</div>
                          <div className="cat-pdf-sub">
                            PDF resources will appear here once added.
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </header>

                {/* Read-more content (summary + full description) */}
                {showDetails && (
                  <div className="cat-event-text">
                    {row.summary && (
                      <div
                        className="cat-event-summary"
                        dangerouslySetInnerHTML={{ __html: row.summary }}
                      />
                    )}

                    {row.body_html && (
                      <div
                        className="cat-event-bodyhtml"
                        dangerouslySetInnerHTML={{ __html: row.body_html }}
                      />
                    )}
                  </div>
                )}

                <footer className="cat-event-footer">
                  <button
                    type="button"
                    className="cat-readmore-btn"
                    onClick={() => toggleExpanded(row.id)}
                  >
                    {showDetails
                      ? "Hide details"
                      : "Read more about this program"}
                  </button>

                  {!pdfUrl && (
                    <span className="cat-event-note">
                      No PDF resources have been attached yet.
                    </span>
                  )}
                </footer>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
