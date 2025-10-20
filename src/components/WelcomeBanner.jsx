

// src/components/WelcomeBanner.jsx
import React from "react";
import banner from "../assets/slides/image.jpg";   // this exists in your screenshot
import "../styles/WelcomeBanner.css";

const WelcomeBanner = () => (
  <section className="welcome-banner">
    <img src={banner} className="welcome-img" alt="Welcome to Holy Trinity" />
  </section>
);

export default WelcomeBanner;
