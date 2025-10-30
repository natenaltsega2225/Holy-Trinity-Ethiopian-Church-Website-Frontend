// src/components/Home.jsx
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Header from "./Header";
import AboutUs from "./AboutUs";
import Ministries from "./ministries";
import Serve from "./Serve";
import Forms from "./Forms";
import Payments from "./Payments";
import "../styles/home.css"; // updates import
// import "../styles/About.css";
import NewsEvents from "./NewsEvents";
import GoogleMap from "./GoogleMap";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        // Delay to ensure DOM is ready
        setTimeout(() => {
          const headerOffset = 90; // adjust based on your header height
          const elementPosition = section.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }, 200);
      }
    }
  }, [location]);

  return (
    <>
      {/* ✅ Include Header */}
      <Header />

      {/* HERO */}
      <section id="home" className="ht-hero">
        <div className="ht-hero-overlay" />
        <div className="ht-container ht-hero-inner">
          <h1 className="ht-hero-title">Holy Trinity Ethiopian</h1>
          <h2 className="ht-hero-subtitle">Orthodox Tewahedo Church</h2>
          <p className="ht-hero-text">
            A sacred community rooted in ancient traditions, united in faith, and
            committed to spiritual growth and service.
          </p>
          <div className="ht-hero-actions">
            <Link to="/news-events" className="ht-btn ht-btn-gold">
              Join Us for Worship
            </Link>
            <Link className="ht-btn ht-btn-ghost" to="/about-us/details">
              Learn More
            </Link>
          </div>
        </div>
        <div className="ht-hero-fade" />
      </section>

      {/* ✅ Scrollable Sections */}
      <AboutUs />
      <Ministries />
      <Serve />
      <NewsEvents />
      <Forms />
      <Payments />
      <GoogleMap/>
    </>
  );
};

export default Home;
