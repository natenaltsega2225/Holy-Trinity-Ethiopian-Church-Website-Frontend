// src/pages/NewsEventsPage.jsx
import React, { useState, useMemo } from "react";
import "../styles/eventsNewsPage.css"; // new CSS file

export default function NewsEventsPage() {
  const [activeId, setActiveId] = useState(null);

  const newsItems = [
    {
      id: 1,
      category: "Liturgical Cycle",
      title: "Kids Programs",
      description:
        "Engaging programs designed to strengthen faith and build lasting friendships.",
      details: [
        "Sunday Deacons Class",
        "Bible Study for Children",
        "Weekly Choir Practice",
        "Monthly Outreach Activities",
      ],
    },
    {
      id: 2,
      category: "Liturgical Cycle",
      title: "Holiday Activities",
      description:
        "Learn the meaning of each fast and feast, with scripture references and practical guidance for prayer and participation.",
      details: [
        "Fast of the Apostles",
        "Great Lent",
        "Nativity Fast",
        "Feast of Timkat",
        "Good Friday Observances",
      ],
    },
    {
      id: 3,
      category: "Kids Trips & Outings",
      title: "Trips & Outings",
      description: "Faith-building adventures that create lasting memories.",
      details: [
        "Annual Church Picnic",
        "Educational Museum Trips",
        "Community Service Outings",
        "Youth Camping Retreats",
      ],
    },
    {
      id: 4,
      category: "Stay Informed",
      title: "Church News",
      description:
        "Stay updated with the latest news and announcements from our church community.",
      details: [
        "Upcoming Sermons Schedule",
        "Volunteer Opportunities",
        "New Initiatives & Programs",
        "Community Announcements",
      ],
    },
  ];

  const toggleDetails = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  // --- Calendar Component ---
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
      const startWeekday = (first.getDay() + 6) % 7;
      const daysInMonth = new Date(y, m + 1, 0).getDate();
      const cells = [];
      const prevDays = new Date(y, m, 0).getDate();

      for (let i = 0; i < startWeekday; i++) {
        const d = prevDays - startWeekday + i + 1;
        cells.push({ type: "prev", date: new Date(y, m - 1, d) });
      }
      for (let d = 1; d <= daysInMonth; d++) {
        cells.push({ type: "cur", date: new Date(y, m, d) });
      }
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
          >
            ‹
          </button>
          <div className="nv-cal-title">{monthLabel}</div>
          <button
            className="nv-cal-nav"
            onClick={() =>
              setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))
            }
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

  return (
    <div className="news-page-container">
        <br />
      <header className="news-page-header">
        <h1>News & Events</h1>
        <p>
          Stay updated with the latest happenings, liturgical calendar, and
          community events of our church.
        </p>
      </header>

      {/* --- Horizontal Cards --- */}
      <section className="news-cards-horizontal">
        {newsItems.map((item) => (
          <div key={item.id} className="news-card-horizontal">
            <div className="news-card-main">
              <h4 className="news-card-category">{item.category}</h4>
              <h3 className="news-card-title">{item.title}</h3>
              <p className="news-card-description">{item.description}</p>
              <button
                className="news-card-btn"
                onClick={() => toggleDetails(item.id)}
              >
                {activeId === item.id ? "Hide Details" : "View Details"}
              </button>
            </div>

            {activeId === item.id && (
              <div className="news-card-details">
                <ul>
                  {item.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* --- Calendar at Bottom --- */}
      <section className="news-calendar-section">
        <h2>Liturgical Calendar</h2>
        <MonthCalendar />
      </section>
    </div>
  );
}
