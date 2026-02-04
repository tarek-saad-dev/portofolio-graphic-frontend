import React, { useState } from 'react';
import './ImageGallery.css';

const ImageGallery = ({ gallery, onImageClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!gallery) return null;

  const { sliderImages = [], verticalImages = [] } = gallery;
  const sortedSliderImages = [...sliderImages].sort((a, b) => (a.order || 0) - (b.order || 0));
  const sortedVerticalImages = [...verticalImages].sort((a, b) => (a.order || 0) - (b.order || 0));

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? sortedSliderImages.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === sortedSliderImages.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="modal-section gallery-section">
      <h2 className="section-heading">
        <i className="fas fa-images"></i>
        Campaign Gallery
      </h2>

      {sortedSliderImages.length > 0 && (
        <div className="slider-gallery">
          <div className="slider-container">
            <div
              className="slider-track"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {sortedSliderImages.map((image, index) => (
                <div
                  key={index}
                  className="slider-item"
                  onClick={() => onImageClick(sortedSliderImages, index)}
                >
                  <img
                    src={image.url}
                    alt={image.alt || `Slide ${index + 1}`}
                    loading="lazy"
                  />
                  {image.caption && (
                    <p className="image-caption">{image.caption}</p>
                  )}
                </div>
              ))}
            </div>

            {sortedSliderImages.length > 1 && (
              <>
                <button
                  className="slider-arrow slider-arrow-left"
                  onClick={handlePrevSlide}
                  aria-label="Previous slide"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>

                <button
                  className="slider-arrow slider-arrow-right"
                  onClick={handleNextSlide}
                  aria-label="Next slide"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>

                <div className="slider-dots">
                  {sortedSliderImages.map((_, index) => (
                    <button
                      key={index}
                      className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                      onClick={() => handleDotClick(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {sortedVerticalImages.length > 0 && (
        <div className="vertical-gallery">
          <h3 className="vertical-gallery-title">Campaign Flow</h3>
          <div className="vertical-images">
            {sortedVerticalImages.map((image, index) => (
              <div
                key={index}
                className="vertical-item"
                onClick={() => onImageClick(sortedVerticalImages, index)}
              >
                <img
                  src={image.url}
                  alt={image.alt || `Image ${index + 1}`}
                  loading="lazy"
                />
                {image.caption && (
                  <p className="image-caption">{image.caption}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ImageGallery;
