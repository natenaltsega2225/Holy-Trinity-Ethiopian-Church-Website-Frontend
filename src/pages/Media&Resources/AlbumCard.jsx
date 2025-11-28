import React from "react";
import "../../styles/MediaGallery.css";

export default function AlbumCard({ title, description, coverImage, photoCount, onClick }) {
  return (
    <div className="album-card" onClick={onClick}>
      <img src={coverImage} alt={title} className="album-cover" />
      <div className="album-info">
        <h3>{title}</h3>
        <p>{description}</p>
        <span className="photo-count">{photoCount} photos</span>
      </div>
    </div>
  );
}
