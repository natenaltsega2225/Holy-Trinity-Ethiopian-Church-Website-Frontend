import React from "react";
import "../styles/KidsSummerProgram.css";

const KidsSummerProgram = () => {
  return (
    <div className="kids-program-container">
      <h1 className="kids-program-title">Kids Summer Program</h1>
      <p className="kids-program-subtitle">
        Nurturing young hearts in faith, fellowship, and fun adventures.
      </p>

      {/* Summer Classes Section */}
      <section className="program-section">
        <h2 className="section-heading">Summer Classes 2024</h2>
        <div className="card-grid">
          <ProgramCard
            title="Bible Study"
            description="Dive into the stories and teachings of the Bible."
            age="Ages 7–12"
            schedule="Mon & Wed, 10 AM – 12 PM"
          />
          <ProgramCard
            title="Orthodox Traditions"
            description="Learn about the rich traditions and practices of the Orthodox faith."
            age="Ages 10–14"
            schedule="Tue & Thu, 1 PM – 3 PM"
          />
          <ProgramCard
            title="Kids Choir & Music"
            description="Explore faith through music and singing."
            age="Ages 6–12"
            schedule="Fridays, 10 AM – 12 PM"
          />
        </div>
      </section>

      {/* Church Trips Section */}
      <section className="program-section">
        <h2 className="section-heading">Upcoming Church Trips</h2>
        <div className="card-grid">
          <TripCard
            title="Ark Encounter – Kentucky"
            description="Experience a life-size Noah’s Ark and learn about biblical history."
            date="June 15–17"
            age="Ages 8–14"
            cost="$450"
            includes="Transportation, meals, and accommodation"
          />
          <TripCard
            title="Ethiopian Cultural Center"
            description="Discover the roots of Orthodox Christianity in Ethiopia."
            date="July 10"
            age="Ages 10–14"
            cost="$75"
            includes="Transportation and lunch"
          />
          <TripCard
            title="Monastery Retreat"
            description="A peaceful day of reflection and learning at a local monastery."
            date="August 5"
            age="Ages 9–14"
            cost="$180"
            includes="Transportation, meals, and activities"
          />
        </div>
      </section>
    </div>
  );
};

const ProgramCard = ({ title, description, age, schedule }) => (
  <div className="program-card">
    <h3>{title}</h3>
    <p>{description}</p>
    <p><strong>{age}</strong></p>
    <p><em>{schedule}</em></p>
    <button className="register-button">Register Now</button>
  </div>
);

const TripCard = ({ title, description, date, age, cost, includes }) => (
  <div className="program-card">
    <h3>{title}</h3>
    <p>{description}</p>
    <p><strong>Date:</strong> {date}</p>
    <p><strong>{age}</strong></p>
    <p><strong>Cost:</strong> {cost}</p>
    <p><em>Includes: {includes}</em></p>
    <button className="register-button">Register Now</button>
  </div>
);

export default KidsSummerProgram;
