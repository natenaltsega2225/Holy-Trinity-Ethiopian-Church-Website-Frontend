import React, { useState } from "react";
import "../../styles/MediaGallery.css";
import AlbumCard from "./AlbumCard";
import Lightbox from "./Lightbox";
import graduationImage from "../../assets/images/grad_2024.jpg";
import julyfeastImage from "../../assets/images/july_ feast_ of_Trinity.jpg";
import sundaySchoolImage from "../../assets/images/sunday _school_youth.jpeg";
import SilaseEt from "../../assets/images/silase_et.jpg";
import KesisTadesse from "../../assets/images/Kesis_Tadesse.jpg";
import KesisTesfa from "../../assets/images/Kesis_Tesfa.jpg";
import KesisFanuel from "../../assets/images/Kesis_Fanuel.jpg";
import PriestsDeaconsGroup from "../../assets/images/Priests_Deacons.jpg";

export default function MediaGallery() {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const albums = [
    {
      id: "clergy",
      title: "Clergy Photos",
      description: "Our dedicated clergy serving the Holy Trinity community",
      coverImage: SilaseEt,
      photos: [
        { url: KesisTadesse, caption: "our priest leading  Sunday service" },
        { url: PriestsDeaconsGroup, caption: "Deacon Michael during holy communion" },
        { url: KesisTesfa, caption: "Clergy gathering for special ceremony" },
      ],
    },
    {
      id: "graduation-2025",
      title: "Graduation – Class of 2025",
      description: "Celebrating our Sunday School graduates",
      coverImage: graduationImage,
      photos: [
        { url: graduationImage, caption: "Graduation ceremony" },
        { url: graduationImage, caption: "Receiving certificates" },
        { url: graduationImage, caption: "Family celebration moment" },
      ],
    },
    {
      id: "sunday-school-youth",
      title: "Sunday School Youth",
      description: "Our vibrant youth performing, learning, and growing in faith",
      coverImage: sundaySchoolImage,
      photos: [
        { url: sundaySchoolImage, caption: "Class in session" },
        { url: sundaySchoolImage, caption: "Youth choir practice" },
        { url: sundaySchoolImage, caption: "Bible study activity" },
      ],
    },
    {
      id: "holy-trinity-feast",
      title: "Holy Trinity & St. Gabriel Feast Celebrations",
      description: "Annual celebration performances",
      coverImage: julyfeastImage,
      photos: [
        { url: julyfeastImage, caption: "Traditional dance performance" },
        { url: julyfeastImage, caption: "Choir performing sacred hymns" },
        { url: julyfeastImage, caption: "Community gathering" },
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
      <div className="gallery-header">
        <h1>Media Gallery</h1>
        <p>Explore our cherished moments and celebrations as a faith community.</p>
      </div>

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

      {selectedAlbum && (
        <Lightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          photos={selectedAlbum.photos}
          currentIndex={currentPhotoIndex}
          onNavigate={(index) => setCurrentPhotoIndex(index)}
          albumTitle={selectedAlbum.title}
        />
      )}
    </div>
  );
}
