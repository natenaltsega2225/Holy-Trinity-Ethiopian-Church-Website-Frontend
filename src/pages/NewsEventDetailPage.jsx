// src/pages/NewsEventDetail.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api, { toPublicUrl } from ".././components/api";
import "../styles/newsEventsPublic.css";

function safeText(v) {
  return String(v || "").trim();
}

export default function NewsEventsDetailPage() {
  const { category, id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);

  const flyer = useMemo(() => toPublicUrl(item?.flyer_url), [item]);
  const pdf = useMemo(() => toPublicUrl(item?.pdf_url), [item]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await api.get(`/news-events/${id}`, { params: { published: 1 } });
        setItem(res.data?.item || null);
      } catch (e) {
        console.error(e);
        setItem(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="neWhitePage">
        <div className="neWrap">
          <div className="neEmpty">Loading...</div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="neWhitePage">
        <div className="neWrap">
          <div className="neBackRow">
            <Link className="neBackLink" to={`/news-events/${category}`}>← Back</Link>
          </div>
          <div className="neEmpty">Announcement not found.</div>
        </div>
      </div>
    );
  }

  const title = safeText(item.title) || "Announcement";
  const start = safeText(item.start_date);
  const time = safeText(item.time_text);
  const loc = safeText(item.location);

  return (
    <div className="neWhitePage">
      <div className="neWrap">
        <div className="neBackRow">
          <Link className="neBackLink" to={`/news-events/${category}`}>← Back to Announcements</Link>
        </div>

        <h1 className="neDetailTitle">{title}</h1>

        <div className="neMetaRow">
          {start && <div className="neMetaItem">📅 <span>{start}</span></div>}
          {time && <div className="neMetaItem">⏰ <span>{time}</span></div>}
          {loc && <div className="neMetaItem">📍 <span>{loc}</span></div>}
        </div>

        <div className="neHeroImageWrap">
          {flyer ? (
            <img className="neHeroImage" src={flyer} alt={title} />
          ) : (
            <div className="neEmpty">No image</div>
          )}
        </div>

        {pdf && (
          <div className="nePdfRow">
            <a className="nePdfBtn" href={pdf} target="_blank" rel="noreferrer">
              📄 {safeText(item.pdf_title) || "Open PDF (print / download)"}
            </a>
          </div>
        )}

        <div className="neDetailBody" style={{ marginTop: 16 }}>
          {item.body_html ? (
            <div dangerouslySetInnerHTML={{ __html: item.body_html }} />
          ) : (
            <p>{safeText(item.summary) || "No details available."}</p>
          )}
        </div>
      </div>
    </div>
  );
}