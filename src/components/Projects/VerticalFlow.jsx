import React from "react";
import "./VerticalFlow.css";

function VerticalFlow({ images, onImageClick }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="vertical-flow">
      {images.map((image, index) => (
        <div key={index} className="vertical-flow-item">
          <img
            src={image.url || image}
            alt={image.alt || `Image ${index + 1}`}
            className="vertical-flow-image"
            loading="lazy"
            onClick={() => onImageClick && onImageClick(index)}
          />
          {image.caption && (
            <p className="vertical-flow-caption">{image.caption}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default VerticalFlow;
