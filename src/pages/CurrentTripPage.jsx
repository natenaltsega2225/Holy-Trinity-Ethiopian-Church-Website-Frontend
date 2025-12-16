import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CurrentTripPage.css";

const CurrentTripPage = () => {
  const navigate = useNavigate();

  const tripData = {
    id: "ark-encounter",
    name: "Ark Encounter",
    dates: "July 15-19, 2024",
    location: "Williamstown, KY",
    ageGroup: "10-17 years",
    duration: "5 Days / 4 Nights",
    price: 100,
    highlights: [
      "Full-size replica of Noah's Ark",
      "Creation Museum exhibits",
      "Daily devotions & group discussions",
      "Team-building activities",
    ],
  };

  return (
    <div className="trip-container">
      <header className="trip-header">
        <h1>{tripData.name}</h1>
        <p className="trip-subtitle">
          {tripData.dates} • {tripData.location}
        </p>
      </header>

      <section className="trip-details">
        <p><strong>Age Group:</strong> {tripData.ageGroup}</p>
        <p><strong>Duration:</strong> {tripData.duration}</p>
        <p className="trip-price"><strong>Price:</strong> ${tripData.price} per child</p>
      </section>

      <section className="trip-highlights">
        <h3>Trip Highlights</h3>
        <ul>
          {tripData.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      </section>

      <div className="trip-actions">
        <button
          className="btn-primary"
          onClick={() => navigate("/forms-page", { state: { formType: "youthTrip" } })}
        >
          Register for Trip
        </button>
        <button
          className="btn-secondary"
          onClick={() => navigate("/news-events/details")}
        >
          Back to Events
        </button>
      </div>
    </div>
  );
};

export default CurrentTripPage;
