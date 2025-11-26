//src/components/AboutUs.jsx
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/about.css";

const AboutUs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleVisitClick = (e) => {
    e.preventDefault();

    if (location.pathname === "/") {
      // Already on the homepage → scroll directly
      const section = document.getElementById("google-map"); // or "map" if that's your id
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Not on home → navigate, then scroll to map
      navigate("/", { state: { scrollTo: "google-map" } });
    }
  };

  return (
    <>
      {/* ABOUT / FOUR PILLARS */}
      <section id="about-us" className="ht-section">
        <div className="ht-container">
          <h3 className="ht-h3">About Our Church</h3>
          <p className="ht-lead">
            Holy Trinity Ethiopian Orthodox Tewahedo Church is a vibrant spiritual
            community dedicated to preserving our ancient faith while serving our
            modern world. We welcome all who seek to grow in their relationship
            with God through the rich traditions of Ethiopian Orthodoxy.
          </p>

          <div className="ht-grid ht-grid-4">
            <div className="ht-card">
              <div className="ht-icon-ring">⌂</div>
              <h4 className="ht-card-title">Sacred Tradition</h4>
              <p className="ht-card-text">
                Preserving over 1,600 years of Ethiopian Orthodox Tewahedo Church
                tradition and liturgy.
              </p>
            </div>
            <div className="ht-card">
              <div className="ht-icon-ring">❤</div>
              <h4 className="ht-card-title">Community Love</h4>
              <p className="ht-card-text">
                Building a loving, supportive community that cares for one
                another in Christ’s name.
              </p>
            </div>
            <div className="ht-card">
              <div className="ht-icon-ring">👥</div>
              <h4 className="ht-card-title">Fellowship</h4>
              <p className="ht-card-text">
                Bringing together families and individuals in worship, service,
                and spiritual growth.
              </p>
            </div>
            <div className="ht-card">
              <div className="ht-icon-ring">📖</div>
              <h4 className="ht-card-title">Teaching</h4>
              <p className="ht-card-text">
                Providing biblical education and spiritual guidance for all ages
                and backgrounds.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div
  className="about-actions"
  style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }} // reduced from 2rem to 1rem
>
  <Link to="/about-us/details" className="ht-btn ht-btn-gold">
    More About Our Church
  </Link>
</div>



      {/* CTA BLUE */}
      <section id="visit" className="ht-cta ht-cta-blue">
        <div className="ht-container ht-cta-inner">
          <h3>Join Our Sacred Community</h3>
          <p>
            Whether you're seeking spiritual guidance, community fellowship, or a deeper
            understanding of Ethiopian Orthodox traditions, we invite you to be part of our family.
          </p>
          <button className="ht-btn ht-btn-gold" onClick={handleVisitClick}>
            Visit Us This Sunday
          </button>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
