import React, { useState } from "react";
import "./MediaGallery.css";
import AlbumCard from "./AlbumCard";
import Lightbox from "./Lightbox";

export default function MediaGallery() {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const albums = [
    {
      id: "clergy",
      title: "Clergy Photos",
      description: "Our dedicated clergy serving the Holy Trinity community",
      coverImage: "/placeholder.svg",
      photos: [
        { url: "/placeholder.svg", caption: "Father Abraham leading Sunday service" },
        { url: "/placeholder.svg", caption: "Deacon Michael during holy communion" },
        { url: "/placeholder.svg", caption: "Clergy gathering for special ceremony" },
      ],
    },
    {
      id: "graduation-2025",
      title: "Graduation – Class of 2025",
      description: "Celebrating our Sunday School graduates",
      coverImage: "/placeholder.svg",
      photos: [
        { url: "/placeholder.svg", caption: "Graduation ceremony" },
        { url: "/placeholder.svg", caption: "Receiving certificates" },
        { url: "/placeholder.svg", caption: "Family celebration moment" },
      ],
    },
    {
      id: "sunday-school-youth",
      title: "Sunday School Youth",
      description: "Our vibrant youth learning and growing in faith",
      coverImage: "/placeholder.svg",
      photos: [
        { url: "/placeholder.svg", caption: "Class in session" },
        { url: "/placeholder.svg", caption: "Youth choir practice" },
        { url: "/placeholder.svg", caption: "Bible study activity" },
      ],
    },
    {
      id: "st-gabriel-holiday",
      title: "Adults Performing – St. Gabriel Holiday",
      description: "Annual celebration performances",
      coverImage: "/placeholder.svg",
      photos: [
        { url: "/placeholder.svg", caption: "Traditional dance performance" },
        { url: "/placeholder.svg", caption: "Choir performing sacred hymns" },
        { url: "/placeholder.svg", caption: "Community gathering" },
      ],
    },
  ];

  const openAlbum = (album) => {
    setSelectedAlbum(album);
    setCurrentPhotoIndex(0);
    setLightboxOpen(true);
  };

  return (
    <div className="gallery-container">
      {/* Header */}
      <div className="gallery-header">
        <h1>Media Gallery</h1>
        <p>Explore our cherished moments and celebrations as a faith community.</p>
      </div>

      {/* Albums */}
      <div className="albums-grid">
        {albums.map((album) => (
          <AlbumCard
            key={album.id}
            title={album.title}
            description={album.description}
            coverImage={album.coverImage}
            photoCount={album.photos.length}
            onClick={() => openAlbum(album)}
          />
        ))}
      </div>

      {/* Lightbox */}
      {selectedAlbum && (
        <Lightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          photos={selectedAlbum.photos}
          currentIndex={currentPhotoIndex}
          onNavigate={setCurrentPhotoIndex}
          albumTitle={selectedAlbum.title}
        />
      )}
    </div>
  );
}
