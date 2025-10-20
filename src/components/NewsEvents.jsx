//src/components/NewsEvets.jsx
import React, { useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/news.css";

/** Lightweight inline calendar (no libs) */
function MonthCalendar({ initialDate = new Date() }) {
  const [cursor, setCursor] = useState(
    new Date(initialDate.getFullYear(), initialDate.getMonth(), 1)
  );

  const todayKey = useMemo(() => {
    const t = new Date();
    return `${t.getFullYear()}-${t.getMonth()}-${t.getDate()}`;
  }, []);

  const grid = useMemo(() => {
    const y = cursor.getFullYear();
    const m = cursor.getMonth();
    const first = new Date(y, m, 1);
    const startWeekday = (first.getDay() + 6) % 7; // make Monday=0
    const daysInMonth = new Date(y, m + 1, 0).getDate();

    const cells = [];
    // prev month filler
    const prevDays = new Date(y, m, 0).getDate();
    for (let i = 0; i < startWeekday; i++) {
      const d = prevDays - startWeekday + i + 1;
      cells.push({ type: "prev", date: new Date(y, m - 1, d) });
    }
    // current month
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ type: "cur", date: new Date(y, m, d) });
    }
    // next month filler to reach 42 cells (6 weeks)
    while (cells.length % 7 !== 0 || cells.length < 42) {
      const nextIdx = cells.length - (startWeekday + daysInMonth) + 1;
      cells.push({ type: "next", date: new Date(y, m + 1, nextIdx) });
    }
    return cells;
  }, [cursor]);

  const monthLabel = cursor.toLocaleString(undefined, {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="nv-cal">
      <div className="nv-cal-head">
        <button
          className="nv-cal-nav"
          onClick={() =>
            setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))
          }
          aria-label="Previous month"
        >
          ‹
        </button>
        <div className="nv-cal-title">{monthLabel}</div>
        <button
          className="nv-cal-nav"
          onClick={() =>
            setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))
          }
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      <div className="nv-cal-grid">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d} className="nv-cal-dow">
            {d}
          </div>
        ))}
        {grid.map((cell, idx) => {
          const k = `${cell.date.getFullYear()}-${cell.date.getMonth()}-${cell.date.getDate()}`;
          const isToday = k === todayKey && cell.type === "cur";
          return (
            <div
              key={idx}
              className={`nv-cal-cell ${
                cell.type !== "cur" ? "nv-cal-muted" : ""
              } ${isToday ? "nv-cal-today" : ""}`}
            >
              <span>{cell.date.getDate()}</span>
            </div>
          );
        })}
      </div>

      <div className="nv-cal-legend">
        <span className="dot today" /> Today
      </div>
    </div>
  );
}

export default function NewsEvents() {
  return (
    <section className="nv-wrap">
      <div className="nv-container">
        {/* Page pill heading */}
        <div className="nv-pillbar">
          <span className="nv-pill">News &amp; Events</span>
        </div>

        {/* Cards row */}
        <div className="nv-grid">
          <article className="nv-card">
            <div className="nv-card-kicker">At a Glance</div>
            <h3 className="nv-card-title">Calendar</h3>
            <p className="nv-card-text">
              View upcoming services, feast days, fasting periods, and parish
              activities. Stay aligned with the rhythm of the Ethiopian
              Orthodox Tewahedo liturgical year.
            </p>
            <NavLink to="/news-events/calendar" className="nv-btn nv-btn-primary">
              Open Calendar
            </NavLink>
          </article>

          <article className="nv-card">
            <div className="nv-card-kicker">Liturgical Cycle</div>
            <h3 className="nv-card-title">Fasts &amp; Feasts</h3>
            <p className="nv-card-text">
              Learn the meaning of each fast and feast, with scripture
              references and practical guidance for prayer and participation.
            </p>
            <NavLink to="/news-events/fasts-feasts" className="nv-btn nv-btn-outline">
              See Fasts &amp; Feasts
            </NavLink>
          </article>

          <article className="nv-card">
            <div className="nv-card-kicker">Community</div>
            <h3 className="nv-card-title">Events</h3>
            <p className="nv-card-text">
              Fellowships, retreats, fundraisers, and family gatherings—find
              opportunities to serve, celebrate, and grow together in Christ.
            </p>
            <NavLink to="/news-events/events" className="nv-btn nv-btn-outline">
              Browse Events
            </NavLink>
          </article>
        </div>

        {/* Inline calendar */}
        <div className="nv-calbox">
          <MonthCalendar />
          <div className="nv-cal-cta">
            <p className="nv-cal-note">
              Need the full schedule with details and reminders?
            </p>
            <Link to="/news-events/calendar" className="nv-btn nv-btn-primary">
              Go to Full Calendar
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
