//src/components/AboutUs.jsx
import React, { useState, useRef } from "react";
import "../styles/about.css";

const AboutUs = () => {
  const [activeCard, setActiveCard] = useState("faith");
  const contentRef = useRef(null);

  const handleCardClick = (card) => {
    setActiveCard(card);
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div className="about-container">
      {/* Page Title */}
      <h1 className="about-title">Who We Are</h1>
      <p className="about-subtitle">
        Learn about our faith, heritage, and leadership in the Ethiopian Orthodox Tewahedo Church.
        Click a card to view the section below.
      </p>

      {/* Smart Card Section */}
      <div className="about-card-grid">
        <button
          className={`about-card ${activeCard === "faith" ? "active" : ""}`}
          onClick={() => handleCardClick("faith")}
        >
          <h3>Our Faith</h3>
          <p>The Orthodox Creed and essentials of our faith.</p>
          <span className="card-link">Open →</span>
        </button>

        <button
          className={`about-card ${activeCard === "history" ? "active" : ""}`}
          onClick={() => handleCardClick("history")}
        >
          <h3>Our History</h3>
          <p>From apostolic roots to our parish story.</p>
          <span className="card-link">Open →</span>
        </button>

        <button
          className={`about-card ${activeCard === "clergy" ? "active" : ""}`}
          onClick={() => handleCardClick("clergy")}
        >
          <h3>Clergy</h3>
          <p>Meet the clergy who shepherd our community.</p>
          <span className="card-link">Open →</span>
        </button>
      </div>

      {/* Content Section */}
      <div className="about-content" ref={contentRef}>
        {activeCard === "faith" && (
          <>
            <h2>Our Faith</h2>
            <p>
              The Orthodox Creed summarizes what we believe and confess in the Ethiopian Orthodox Tewahedo Church.
            </p>

            <h3>THE ORTHODOX CREED OF FAITH</h3>

            <p>
              We believe in one God, God the Father, the Pantocrator, Who created heaven and earth, and all things,
              seen and unseen.
            </p>

            <p>
              We believe in one Lord Jesus Christ, the Only-Begotten Son of God, begotten of the Father before all ages;
              Light of Light, true God of true God, begotten not created, of one essence with the Father, by Whom all
              things were made; Who for us, men, and for our salvation, came down from heaven, and was incarnated of the
              Holy Spirit and of the Virgin Mary, and became man.
            </p>

            <p>
              And He was crucified for us under Pontius Pilate, suffered, and was buried. And on the third day He rose
              from the dead, according to the Scriptures, and ascended into the heavens; and sat at the right hand of His
              Father, and also He is coming again in His glory to judge the living and the dead, whose kingdom has no end.
            </p>

            <p>
              Yes, we believe in the Holy Spirit, the Lord, the Life-Giver, Who proceeds from the Father, Who, with the
              Father and the Son, is worshipped and glorified, Who spoke in the prophets. And in one holy, catholic, and
              apostolic church. We confess one baptism for the remission of sins.
            </p>

            <p>
              We look for the resurrection of the dead, and the life of the coming age. Amen.
            </p>
          </>
        )}

        {activeCard === "history" && (
          <>
            <h2>Our History</h2>
            <p>
              Christianity took root in Ethiopia in the 4th century through Saint Frumentius (Abba Selama). Since then,
              the Ethiopian Orthodox Tewahedo Church has preserved ancient faith, liturgy, and scripture.
            </p>
            <p>
              Our parish continues this apostolic heritage today—gathering for liturgy, serving our community, and
              teaching future generations in faith.
            </p>
          </>
        )}

        {activeCard === "clergy" && (
          <>
            <h2>Clergy</h2>
            <p>
              Our clergy shepherd the church through prayer, sacraments, teaching, and pastoral care. This section will
              include the clergy members who serve our parish with love and devotion.
            </p>
            <ul>
              <li>Liturgical Service & Sacraments</li>
              <li>Confession & Spiritual Guidance</li>
              <li>Teaching & Leadership</li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default AboutUs;

