import React from "react";
import "../../styles/Resources.css";

export default function Resources() {
  const resources = [
    {
      id: "holy-bible",
      title: "Holy Bible",
      description: "Complete Ethiopian Orthodox Tewahedo Bible in Amharic and English",
      type: "pdf",
      category: "Scripture",
      size: "12.5 MB",
      downloadUrl: "#",
    },
    {
      id: "weekly-bulletin",
      title: "Weekly Church Bulletin",
      description: "Current week's announcements, readings, and schedule",
      type: "pdf",
      category: "Bulletins",
      size: "850 KB",
      downloadUrl: "#",
    },
    {
      id: "sermon-archive-jan",
      title: "January Sermons Collection",
      description: "Audio recordings of all January sermons",
      type: "audio",
      category: "Sermons",
      size: "145 MB",
      downloadUrl: "#",
    },
    {
      id: "easter-program",
      title: "Easter Celebration Program",
      description: "Complete schedule for the Easter holiday",
      type: "pdf",
      category: "Events",
      size: "1.2 MB",
      downloadUrl: "#",
    },
    {
      id: "membership-form",
      title: "Membership Application",
      description: "Form to register as a church member",
      type: "form",
      category: "Forms",
      size: "245 KB",
      downloadUrl: "#",
    },
    {
      id: "volunteer-form",
      title: "Volunteer Registration",
      description: "Sign up to serve in ministries",
      type: "form",
      category: "Forms",
      size: "180 KB",
      downloadUrl: "#",
    },
    {
      id: "baptism-form",
      title: "Baptism Request Form",
      description: "Application for baptism sacrament",
      type: "form",
      category: "Forms",
      size: "320 KB",
      downloadUrl: "#",
    },
    {
      id: "christmas-bulletin",
      title: "Christmas Bulletin Archive",
      description: "Past Christmas service bulletins and programs",
      type: "pdf",
      category: "Bulletins",
      size: "2.8 MB",
      downloadUrl: "#",
    },
  ];

  const categories = ["All", "Scripture", "Bulletins", "Sermons", "Events", "Forms"];

  return (
    <div className="resources-container">
      {/* Header */}
      <header className="resources-header">
        <h1>Resources</h1>
        <p>
          Access scripture, sermons, bulletins, and forms to support your spiritual journey.
        </p>
      </header>

      {/* Categories */}
      <div className="resource-categories">
        {categories.map((category) => (
          <button key={category} className="category-btn">
            {category}
          </button>
        ))}
      </div>

      {/* Resource Cards */}
      <div className="resources-grid">
        {resources.map((resource) => (
          <div key={resource.id} className="resource-card">
            <div className="resource-icon">{resource.type.toUpperCase()}</div>

            <h3 className="resource-title">{resource.title}</h3>

            <p className="resource-description">{resource.description}</p>

            <ul className="resource-meta">
              <li><strong>Category:</strong> {resource.category}</li>
              <li><strong>Size:</strong> {resource.size}</li>
            </ul>

            <a href={resource.downloadUrl} className="resource-download-btn">
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
