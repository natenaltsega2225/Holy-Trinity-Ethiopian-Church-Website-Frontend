import React from "react";
import "../../styles/MediaGallery.css";

export default function Lightbox({
  isOpen,
  onClose,
  photos,
  currentIndex,
  onNavigate,
  albumTitle
}) {
  if (!isOpen) return null;

  const goPrev = () => {
    if (currentIndex > 0) onNavigate(currentIndex - 1);
  };

  const goNext = () => {
    if (currentIndex < photos.length - 1) onNavigate(currentIndex + 1);
  };

  return (
    <div className="lightbox-overlay">
      <div className="lightbox-content">
        <button className="lightbox-close" onClick={onClose}>×</button>

        <h2 className="lightbox-title">{albumTitle}</h2>

        <img
          src={photos[currentIndex].url}
          alt={photos[currentIndex].caption}
          className="lightbox-image"
        />

        <p className="lightbox-caption">{photos[currentIndex].caption}</p>

        <div className="lightbox-controls">
          <button disabled={currentIndex === 0} onClick={goPrev}>Previous</button>
          <button disabled={currentIndex === photos.length - 1} onClick={goNext}>Next</button>
        </div>
      </div>
    </div>
  );
}