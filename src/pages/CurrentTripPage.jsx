import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CurrentTripPage.css";

const CurrentTripPage = () => {
  const navigate = useNavigate();

  // Static demo data for now
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
    <div className="container">
      <h1>{tripData.name}</h1>
      <p><strong>Dates:</strong> {tripData.dates}</p>
      <p><strong>Location:</strong> {tripData.location}</p>
      <p><strong>Age Group:</strong> {tripData.ageGroup}</p>
      <p><strong>Duration:</strong> {tripData.duration}</p>

      <h3>Trip Highlights:</h3>
      <ul>
        {tripData.highlights.map((h, i) => (
          <li key={i}>{h}</li>
        ))}
      </ul>

      <p><strong>Price:</strong> ${tripData.price} per child</p>

      <button
        className="btn-primary"
        onClick={() => navigate("/news-events/details")}
      >
        Register for Trip
      </button>
    </div>
  );
};

export default CurrentTripPage;
