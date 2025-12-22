
// src/components/Home.jsx
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

import AboutUs from "./AboutUs";
import Ministries from "./Ministries";
import Serve from "./Serve";
import Forms from "./Forms";
import NewsEvents from "./NewsEvents";
import GoogleMap from "./GoogleMap";
import Payments from "./Payments";
import "../styles/Home.css";

// Donate strip reused between sections
const DonateStrip = () => (
  
  <section id="donate-section" className="ht-donate-strip">
    {/* <div className="ht-container ht-donate-inner">

      <div className="ht-donate-text">
        <h3>Support Holy Trinity Ethiopian Orthodox Tewahedo Church</h3>
        <p>
          Your gift helps sustain worship, kids programs, outreach, and all of
          our ministries. Thank you for your generosity!
        </p>
      </div>
      <div className="ht-donate-actions">
        <Link to="/donate" className="ht-btn ht-btn-donate">
          Donate Here
        </Link>
      </div>
    </div> */}
    
  </section>
);

const Home = () => {
  const location = useLocation();

  // Smooth scroll to a section when Header sends state.scrollTo
  useEffect(() => {
    const targetId = location.state?.scrollTo;
    if (!targetId) return;

    const el = document.getElementById(targetId);
    if (!el) return;

    const headerOffset = 90;
    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }, [location]);

  return (
    <>
      {/* HERO */}
      <section id="home" className="ht-hero">
        <div className="ht-hero-overlay" />
        <div className="ht-container ht-hero-inner">
          <h1 className="ht-hero-title">Holy Trinity Ethiopian</h1>
          <h2 className="ht-hero-subtitle">Orthodox Tewahedo Church</h2>
          <p className="ht-hero-text">
            A sacred community rooted in ancient traditions, united in faith,
            and committed to spiritual growth and service.
          </p>
          <div className="ht-hero-actions">
            <Link to="/news-events" className="ht-btn ht-btn-gold">
              Join Us for Worship
            </Link>
            <Link className="ht-btn ht-btn-ghost" to="/about-us/details">
              Learn More
            </Link>
            <Link className="ht-btn ht-btn-donate" to="/donate">
              Click Here to Donate
            </Link>
          </div>
        </div>
        <div className="ht-hero-fade" />
      </section>

      {/* After hero */}
      <DonateStrip />

      {/* The rest of the sections, all on one page */}
      <AboutUs />
      {/* <DonateStrip /> */}

      <Ministries />
      {/* <DonateStrip /> */}

      <Serve />
      {/* <DonateStrip /> */}

      <NewsEvents />
      {/* <DonateStrip /> */}

      <Forms />
      {/* <DonateStrip /> */}

      <Payments />
      {/* <DonateStrip /> */}

      <GoogleMap />
    </>
  );
};

export default Home;

