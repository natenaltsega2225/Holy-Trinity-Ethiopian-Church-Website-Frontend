// src/components/NewsEventCard.jsx
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toPublicUrl } from "./api";
import "../styles/newsEventsPublic.css";

function safeText(v) {
  return String(v || "").trim();
}

export default function NewsEventCard({ item }) {
  const nav = useNavigate();

  const flyer = useMemo(() => toPublicUrl(item?.flyer_url), [item]);
  const title = safeText(item?.title) || "Untitled";
  const summary = safeText(item?.summary);
  const start = safeText(item?.start_date);
  const time = safeText(item?.time_text);
  const loc = safeText(item?.location);

  function goDetail() {
    const cat = safeText(item?.category) || "news";
    nav(`/news-events/${cat}/${item.id}`);
  }

  return (
    <div className="neCard" onClick={goDetail} role="button" tabIndex={0}>
      <div className="neCardImgWrap">
        {flyer ? <img className="neCardImg" src={flyer} alt={title} /> : <div className="neEmpty">No image</div>}
      </div>

      <div className="neCardBody">
        <div className="neCardTitle">{title}</div>

        <div className="neMetaRow">
          {start && <span className="neMetaItem">📅 {start}</span>}
          {time && <span className="neMetaItem">⏰ {time}</span>}
          {loc && <span className="neMetaItem">📍 {loc}</span>}
        </div>

        {summary && <div className="neSummary">{summary}</div>}
      </div>
    </div>
  );
}