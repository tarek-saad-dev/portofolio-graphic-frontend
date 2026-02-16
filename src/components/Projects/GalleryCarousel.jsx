import React, { useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import "./GalleryCarousel.css";

function GalleryCarousel({ images, onImageClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!images || images.length === 0) return null;

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="gallery-carousel">
      <div className="carousel-container">
        {images.length > 1 && (
          <>
            <button
              className="carousel-arrow carousel-prev"
              onClick={handlePrev}
              aria-label="Previous slide"
            >
              <IoChevronBack />
            </button>
            <button
              className="carousel-arrow carousel-next"
              onClick={handleNext}
              aria-label="Next slide"
            >
              <IoChevronForward />
            </button>
          </>
        )}

        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="carousel-slide">
              <img
                src={image.url || image}
                alt={image.alt || `Slide ${index + 1}`}
                className="carousel-image"
                loading="lazy"
                onClick={() => onImageClick && onImageClick(index)}
              />
              {image.caption && (
                <p className="carousel-caption">{image.caption}</p>
              )}
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <div className="carousel-dots">
            {images.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentSlide ? "active" : ""}`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GalleryCarousel;
