// src/components/Serve.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Users, BookOpen } from "lucide-react"; // Lucide icons
import "../styles/Serve.css";

const Serve = () => {
  const navigate = useNavigate();

  const serveCards = [
    {
      id: 1,
      title: "Make a Difference",
      description:
        "Use your time and talents to help others. Serve in ministries that bring real change to our community.",
      icon: <Heart size={48} color="#F2BE42" />,
    },
    {
      id: 2,
      title: "Build Community",
      description:
        "Join a family of believers working together in love and purpose. Grow through fellowship and shared service.",
      icon: <Users size={48} color="#F2BE42" />,
    },
    {
      id: 3,
      title: "Use Your Gifts",
      description:
        "Whether you sing, teach, organize, or simply care — your gifts are needed to build the body of Christ.",
      icon: <BookOpen size={48} color="#F2BE42" />,
    },
  ];

  return (
    <section id="serve-section" className="serve-section">
      <div className="serve-container">
        <h2 className="serve-title">Serve With Us</h2>
        <p className="serve-subtitle">
          Discover opportunities to make a meaningful impact.
        </p>

        <div className="serve-cards">
          {serveCards.map((card) => (
            <div key={card.id} className="serve-card">
              <div className="serve-card-icon">{card.icon}</div>
              <div className="serve-card-content">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          className="serve-btn main-serve-btn"
          onClick={() => navigate("/serve-details")}
        >
          Serve Our Church
        </button>
      </div>
    </section>
  );
};

export default Serve;
