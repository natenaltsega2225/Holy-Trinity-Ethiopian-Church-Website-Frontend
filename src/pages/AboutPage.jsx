import React, { useState, useRef, useEffect } from "react";
import "../styles/aboutPage.css";
import OurFaith from "../pages/sections/OurFaith";
import OurHistory from "../pages/sections/OurHistory";
import OurClergy from "../pages/sections/OurClergy";

const AboutPage = () => {
  const [activeCard, setActiveCard] = useState("faith");

  const faithRef = useRef(null);
  const historyRef = useRef(null);
  const clergyRef = useRef(null);

  const sectionRefs = [
    { id: "faith", ref: faithRef },
    { id: "history", ref: historyRef },
    { id: "clergy", ref: clergyRef },
  ];

  // Scroll to section when a card is clicked
  const handleCardClick = (card) => {
    const section = sectionRefs.find((s) => s.id === card);
    section?.ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Update activeCard when scrolling
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = sectionRefs.length - 1; i >= 0; i--) {
        const sectionTop = sectionRefs[i].ref.current.offsetTop;
        if (scrollPos >= sectionTop) {
          setActiveCard(sectionRefs[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="about-container">
      <div className="about-header">
        <h1>Who We Are</h1>
        <p>Discover our faith, history, and clergy guiding our community.</p>
      </div>

      {/* Cards */}
      <div className="about-card-grid">
        <button
          className={activeCard === "faith" ? "about-card active" : "about-card"}
          onClick={() => handleCardClick("faith")}
        >
          ✝️ Our Faith
        </button>
        <button
          className={activeCard === "history" ? "about-card active" : "about-card"}
          onClick={() => handleCardClick("history")}
        >
          📜 Our History
        </button>
        <button
          className={activeCard === "clergy" ? "about-card active" : "about-card"}
          onClick={() => handleCardClick("clergy")}
        >
          🙏 Clergy
        </button>
      </div>

      {/* Sections */}
      <div ref={faithRef}><OurFaith /></div>
      <div ref={historyRef}><OurHistory /></div>
      <div ref={clergyRef}><OurClergy /></div>
    </div>
  );
};

export default AboutPage;
