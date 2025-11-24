import React from "react";
import "../../styles/ourClergy.css";
import AbuneMathias from "../../assets/images/Abune_Mathias.jpg";
import AbuneYakob from "../../assets/images/Abune_Yakob.jpg";
import KesisTadesse from "../../assets/images/Kesis_Tadesse.jpg";
import KesisTesfa from "../../assets/images/Kesis_Tesfa.jpg";
import KesisFanuel from "../../assets/images/Kesis_Fanuel.jpg";
import PriestsDeaconsGroup from "../../assets/images/Priests_Deacons.jpg";

const OurClergy = () => {
  const hierarchy = {
    patriarch: {
      name: "His Holiness Abune Mathias",
      title: "Patriarch",
      image: AbuneMathias,
    },
    archbishop: {
      name: "His Grace Abune Yakob",
      title: "Archbishop",
      image: AbuneYakob,
    },
    priestsAndDeacons: [
      { name: "Melake Birhane", title: "Kesis Tadesse", image: KesisTadesse },
      { name: "Megabi Haddis", title: "Memhir Tesfa", image: KesisTesfa },
      { name: "Kesis Fanuel", title: "Fanuel", image: KesisFanuel },
    ],
  };

  return (
    <div className="our-clergy-page">
      <main className="clergy-main">
        <div className="clergy-container">
          {/* Header */}
          <div className="clergy-header">
            <h1 className="clergy-title">Our Father's and Faithful Servants</h1>
            <p className="clergy-subtitle">
              Meet the spiritual leaders who guide our church community with wisdom, devotion, and unwavering faith.
            </p>
          </div>

          {/* Modern Hierarchy (NO ARROWS) */}
          <div className="clergy-hierarchy">
            
            {/* Patriarch */}
            <div className="clergy-group">
              <h2 className="clergy-group-title">Patriarch</h2>
              <div className="clergy-card">
                <div className="clergy-card-content">
                  <div className="clergy-img-wrapper">
                    <img 
                      src={hierarchy.patriarch.image} 
                      alt={hierarchy.patriarch.name} 
                      className="clergy-img" 
                    />
                  </div>
                  <h3 className="clergy-name">{hierarchy.patriarch.name}</h3>
                  <p className="clergy-title-text">{hierarchy.patriarch.title}</p>
                </div>
              </div>
            </div>

            {/* Archbishop */}
            <div className="clergy-group">
              <h2 className="clergy-group-title">Archbishop</h2>
              <div className="clergy-card">
                <div className="clergy-card-content">
                  <div className="clergy-img-wrapper">
                    <img 
                      src={hierarchy.archbishop.image} 
                      alt={hierarchy.archbishop.name} 
                      className="clergy-img" 
                    />
                  </div>
                  <h3 className="clergy-name">{hierarchy.archbishop.name}</h3>
                  <p className="clergy-title-text">{hierarchy.archbishop.title}</p>
                </div>
              </div>
            </div>

            {/* Priests & Deacons */}
            <div className="clergy-group">
              <h2 className="clergy-group-title">Priests</h2>
              <div className="clergy-deacons">
                {hierarchy.priestsAndDeacons.map((deacon, index) => (
                  <div className="clergy-card" key={index}>
                    <div className="clergy-card-content">
                      <div className="clergy-img-wrapper">
                        <img 
                          src={deacon.image} 
                          alt={deacon.name} 
                          className="clergy-img" 
                        />
                      </div>
                      <h3 className="clergy-name">{deacon.name}</h3>
                      <p className="clergy-title-text">{deacon.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Priests & Deacons Group Photo */}
          <div className="priests-section">
            <h2 className="priests-title">Priests & Deacons</h2>
            <div className="priests-card">
              <div className="priests-img-wrapper">
                <img 
                  src={PriestsDeaconsGroup} 
                  alt="Priests and Deacons" 
                  className="priests-img" 
                />
              </div>
            </div>
            <p className="priests-description">
              Our dedicated priests and deacons serve the community with devotion, 
              leading worship services, providing spiritual guidance, and preserving 
              the sacred traditions of the Ethiopian Orthodox Tewahedo Church.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OurClergy;