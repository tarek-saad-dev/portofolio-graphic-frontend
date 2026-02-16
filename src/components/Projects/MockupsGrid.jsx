import React from "react";
import "./MockupsGrid.css";

function MockupsGrid({ images, onImageClick }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="mockups-grid">
      {images.map((image, index) => (
        <div key={index} className="mockup-card">
          <div className="mockup-image-wrapper">
            <img
              src={image.url || image}
              alt={image.alt || `Mockup ${index + 1}`}
              className="mockup-image"
              loading="lazy"
              onClick={() => onImageClick && onImageClick(index)}
            />
          </div>
          {image.caption && (
            <p className="mockup-caption">{image.caption}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default MockupsGrid;
