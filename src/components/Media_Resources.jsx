// src/components/Media_Resources.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/media_resources.css";
import sundaySchoolImage from "../assets/images/sunday _school_youth.jpeg";
// import resourcesIcon from "../assets/images/resources.png";

export default function Media_Resources() {
  return (
    <section id="media-resources" className="media-resources-section">
      <div className="ht-container">
        <h3 className="ht-h3">Media & Resources</h3>
        <p className="ht-lead">
          Explore highlights from our photo gallery and access important church documents.
        </p>

        <div className="media-resources-grid">

          {/* Photo Gallery Card */}
          <Link to="/more/media-gallery" className="mr-card-link-wrapper">
            <div className="mr-card">
              <div className="mr-card-img">
                <img src={sundaySchoolImage} alt="Sunday School Youth" />
              </div>
              <div className="mr-card-body">
                <h4 className="mr-card-title">Photo Gallery</h4>
                <p className="mr-card-text">
                  See moments from feast days, celebrations, and community gatherings.
                </p>
                <span className="mr-card-link">View Gallery →</span>
              </div>
            </div>
          </Link>

          {/* Resources Card */}
          <Link to="/more/resources" className="mr-card-link-wrapper">
            <div className="mr-card">
              <div className="mr-card-img icon">
                {/* <img
                  src={resourcesIcon}
                  alt="Resources Icon"
                  className="mr-icon-img"
                /> */}
              </div>
              <div className="mr-card-body">
                <h4 className="mr-card-title">Church Resources</h4>
                <p className="mr-card-text">
                  Access liturgical guides, study materials, and downloadable documents.
                </p>
                <span className="mr-card-link">Explore Resources →</span>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}
