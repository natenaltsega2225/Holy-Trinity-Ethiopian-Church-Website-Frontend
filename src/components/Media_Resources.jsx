// src/components/Media_Resources.jsx
import React from "react";
import Slider from "react-slick"; // remember to install react-slick + slick-carousel
import { Link } from "react-router-dom";
import "../styles/media_resources.css";
import HarpIcon from "../assets/images/harp.png";
import { FaImages, FaBookOpen, FaBoxOpen, FaExclamationTriangle} from "react-icons/fa";

export default function Media_Resources() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } }
    ]
  };

  const cards = [
    {
      title: "Photo Gallery",
      desc: "See moments from feast days, celebrations, and community gatherings.",
      to: "/more/media-gallery",
      icon: <FaImages size={36} color="#133a74" />,
      linkText: "View Gallery →"
    },
    {
      title: "Church Resources",
      desc: "Access liturgical guides, study materials, and downloadable documents.",
      to: "/more/resources",
      icon: <FaBookOpen size={36} color="#a67c00" />,
      linkText: "Explore Resources →"
    },
    {
      title: "Lost & Found",
      desc: "Report missing items or check if something has been found during church events.",
      to: "/more/lost-found",
      icon: <FaBoxOpen size={36} color="#2563eb" />,
      linkText: "Submit Report →"
    },
    {
      title: "Incident Report",
      desc: "Submit details about any safety or facility incidents to help us respond quickly.",
      to: "/more/incident-report",
      icon: <FaExclamationTriangle size={36} color="#b91c1c" />,
      linkText: "Report Incident →"
    },
   {
  title: "Choir Registration",
  desc: "Join our parish choir and participate in liturgical services through song and worship.",
  to: "/forms-page",
  state: { formType: "choir" },
  icon: <img src={HarpIcon} alt="Harp Icon" style={{ width: 36, height: 36 }} />,
  linkText: "Register for Choir →"
}
  ];

  return (
    <section id="media-resources" className="media-resources-section">
      <div className="ht-container">
        <h3 className="ht-h3">Media & Resources</h3>
        <p className="ht-lead">
          Explore highlights from our photo gallery and access important church documents.
        </p>

        <Slider {...settings}>
          {cards.map((card) => (
            <Link
              key={card.title}
              to={card.to}
              state={card.state}
              className="mr-card-link-wrapper"
            >
              <div className="mr-card">
                <div className="mr-card-body">
                  <div className="mr-card-icon">{card.icon}</div>
                  <h4 className="mr-card-title">{card.title}</h4>
                  <p className="mr-card-text">{card.desc}</p>
                  <span className="mr-card-link">{card.linkText}</span>
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </section>
  );
}
