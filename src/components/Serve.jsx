//src/components/Serve.jsx
import React from "react";
import "../styles/serve.css";

/**
 * Ethiopian Orthodox Church – Service/Ministries Cards
 * - Clickable cards (use `href` for routing or anchor links)
 * - Pure CSS styling (serve.css)
 */

const items = [
  {
    title: "Sunday School",
    href: "/serve/sunday-school",
    desc:
      "Faith-forming classes for children and youth centered on the Holy Scriptures, the Synaxarium, and the life of the Church.",
  },
  {
    title: "Curriculum",
    href: "/serve/curriculum",
    desc:
      "Age-appropriate lessons following the Ethiopian Orthodox Tewahedo calendar—readings, hymns, and virtues for each season.",
  },
  {
    title: "Pre-servants",
    href: "/serve/pre-servants",
    desc:
      "Training for young men and women who wish to assist in Church ministries—spiritual discipline, service etiquette, and mentorship.",
  },
  {
    title: "Chorus of Deacons",
    href: "/serve/chorus-deacons",
    desc:
      "A brotherhood of deacons serving in the sanctuary—responses, readings, and liturgical order according to the tradition of the Church.",
  },
  {
    title: "Maren Hoos Deacon School",
    href: "/serve/maren-hoos",
    desc:
      "Foundations of diaconate service—liturgy, rite, and spiritual life—formed under the guidance of our clergy and senior deacons.",
  },
  {
    title: "Coptic",
    href: "/serve/coptic",
    desc:
      "Language and hymn notation basics for understanding Ethiopic/Coptic terms used across our liturgy and patristic texts.",
  },
  {
    title: "Choir",
    href: "/serve/choir",
    desc:
      "Zema and modern spiritual songs—voice training, kirar patterns, and leading the congregation in joyful praise.",
  },
  {
    title: "Theater",
    href: "/serve/theater",
    desc:
      "Biblical dramas and saints’ stories presented by our youth—creative expression that teaches faith through art.",
  },
  {
    title: "St Paul Convention & Trips",
    href: "/serve/st-paul-trips",
    desc:
      "Retreats and conferences that gather believers for prayer, teaching, and fellowship—pilgrimages and service trips included.",
  },
  {
    title: "Family Meetings",
    href: "/serve/family-meetings",
    desc:
      "Monthly gatherings for spiritual talks, parenting, marriage enrichment, and practical support within our parish family.",
  },
  {
    title: "St Nicholas Service",
    href: "/serve/st-nicholas",
    desc:
      "Charity ministry inspired by St Nicholas—supporting families in need through food drives, visits, and benevolence.",
  },
  {
    title: "Mahragan",
    href: "/serve/mahragan",
    desc:
      "Festival of learning and joy—Bible study, hymns, arts, and friendly competitions to grow our youth in faith and unity.",
  },
];

export default function Serve() {
  return (
    <section className="serve-section">
      <div className="serve-container">
        <header className="serve-header">
          <h2 className="serve-title">Serve & Ministries</h2>
          <p className="serve-subtitle">
            Opportunities to learn, serve, and grow within the Ethiopian Orthodox Tewahedo Church.
            Choose a ministry below to get involved.
          </p>
        </header>

        <div className="serve-grid">
          {items.map((it) => (
            <a key={it.title} href={it.href} className="serve-card">
              <div className="serve-badge" aria-hidden="true" />
              <h3 className="serve-card-title">{it.title}</h3>
              <p className="serve-card-desc">{it.desc}</p>
              <span className="serve-link">
                Learn more <span className="serve-arrow">→</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
