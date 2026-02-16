import React, { useEffect, useState, useCallback } from "react";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";
import "./Lightbox.css";

function Lightbox({ images, startIndex = 0, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  useEffect(() => {
    setCurrentIndex(startIndex);
  }, [startIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose, handleNext, handlePrev]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="lightbox-overlay" onClick={handleBackdropClick}>
      <button className="lightbox-close" onClick={onClose} aria-label="Close">
        <IoClose />
      </button>

      {images.length > 1 && (
        <>
          <button
            className="lightbox-nav lightbox-prev"
            onClick={handlePrev}
            aria-label="Previous image"
          >
            <IoChevronBack />
          </button>
          <button
            className="lightbox-nav lightbox-next"
            onClick={handleNext}
            aria-label="Next image"
          >
            <IoChevronForward />
          </button>
        </>
      )}

      <div className="lightbox-content">
        <img
          src={currentImage.url || currentImage}
          alt={currentImage.alt || `Image ${currentIndex + 1}`}
          className="lightbox-image"
        />
        {currentImage.caption && (
          <p className="lightbox-caption">{currentImage.caption}</p>
        )}
        {images.length > 1 && (
          <div className="lightbox-counter">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );
}

export default Lightbox;
