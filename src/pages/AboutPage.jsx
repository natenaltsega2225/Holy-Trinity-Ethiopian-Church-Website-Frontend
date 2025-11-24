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

  const handleCardClick = (card) => {
    const section = sectionRefs.find((s) => s.id === card);
    section?.ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Track scroll position
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
        <h1 className="about-title">Who We Are</h1>
        <p className="about-subtitle">
          Discover our faith, history, and clergy guiding our community.
        </p>
      </div>

      {/* Modern Segmented Selector */}
      <div className="selector-bar">
        <button
          className={activeCard === "faith" ? "selector-item active" : "selector-item"}
          onClick={() => handleCardClick("faith")}
        >
          ✝️ Our Faith
        </button>

        <button
          className={activeCard === "history" ? "selector-item active" : "selector-item"}
          onClick={() => handleCardClick("history")}
        >
          📜 Our History
        </button>

        <button
          className={activeCard === "clergy" ? "selector-item active" : "selector-item"}
          onClick={() => handleCardClick("clergy")}
        >
          🙏 Clergy
        </button>
      </div>

      <div ref={faithRef}><OurFaith /></div>
      <div ref={historyRef}><OurHistory /></div>
      <div ref={clergyRef}><OurClergy /></div>
    </div>
  );
};

export default AboutPage;
