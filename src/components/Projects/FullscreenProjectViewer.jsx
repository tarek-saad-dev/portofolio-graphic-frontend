import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Slider from "react-slick";
import "./FullscreenProjectViewer.css";

function FullscreenProjectViewer({ project, onClose, onNext, onPrev }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleArrowKeys = (e) => {
      if (e.key === "ArrowLeft" && onPrev) {
        onPrev();
      } else if (e.key === "ArrowRight" && onNext) {
        onNext();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleArrowKeys);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleArrowKeys);
      document.body.style.overflow = "auto";
    };
  }, [onClose, onNext, onPrev]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const allImages = [
    project.imgPath,
    ...(project.imagePaths || []),
    ...(project.mockups || []),
  ].filter(Boolean);

  const lightboxSlides = allImages.map((src) => ({ src }));

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fullscreen-viewer-backdrop"
        onClick={handleBackdropClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="fullscreen-viewer-container"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="viewer-close-btn" onClick={onClose}>
            <IoClose />
          </button>

          {onPrev && (
            <button className="viewer-nav-btn viewer-nav-prev" onClick={onPrev}>
              <FiChevronLeft />
            </button>
          )}

          {onNext && (
            <button className="viewer-nav-btn viewer-nav-next" onClick={onNext}>
              <FiChevronRight />
            </button>
          )}

          <div className="viewer-content">
            <div className="viewer-hero">
              <img
                src={project.imgPath}
                alt={project.title}
                className="viewer-hero-image"
                onClick={() => openLightbox(0)}
              />
            </div>

            <div className="viewer-story-section">
              <h1 className="viewer-title">{project.title}</h1>
              <p className="viewer-story">
                {project.description ||
                  "A comprehensive design campaign showcasing creative excellence and strategic thinking. This project demonstrates the power of visual storytelling combined with brand identity development."}
              </p>
            </div>

            {project.imagePaths && project.imagePaths.length > 0 && (
              <div className="viewer-slider-section">
                <h2 className="viewer-section-title">Campaign Highlights</h2>
                <Slider {...sliderSettings}>
                  {project.imagePaths.map((image, index) => (
                    <div key={index} className="slider-item">
                      <img
                        src={image}
                        alt={`${project.title} ${index + 1}`}
                        className="slider-image"
                        onClick={() => openLightbox(index + 1)}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            )}

            {project.verticalImages && project.verticalImages.length > 0 && (
              <div className="viewer-vertical-section">
                <h2 className="viewer-section-title">Visual Story</h2>
                {project.verticalImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${project.title} vertical ${index + 1}`}
                    className="vertical-image"
                    onClick={() =>
                      openLightbox(1 + (project.imagePaths?.length || 0) + index)
                    }
                  />
                ))}
              </div>
            )}

            {project.mockups && project.mockups.length > 0 && (
              <div className="viewer-mockups-section">
                <h2 className="viewer-section-title">Mockups & Applications</h2>
                <div className="mockups-grid">
                  {project.mockups.map((mockup, index) => (
                    <div key={index} className="mockup-item">
                      <img
                        src={mockup}
                        alt={`${project.title} mockup ${index + 1}`}
                        className="mockup-image"
                        onClick={() =>
                          openLightbox(
                            1 +
                              (project.imagePaths?.length || 0) +
                              (project.verticalImages?.length || 0) +
                              index
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="viewer-info-block">
              <div className="info-item">
                <span className="info-label">Client</span>
                <span className="info-value">
                  {project.client || "Personal Project"}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Role</span>
                <span className="info-value">
                  {project.role || "Lead Designer"}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Tools</span>
                <span className="info-value">
                  {project.tools?.join(", ") || "Adobe Creative Suite"}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Year</span>
                <span className="info-value">
                  {project.year || new Date(project.date).getFullYear() || "2024"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxSlides}
        index={lightboxIndex}
      />
    </AnimatePresence>
  );
}

export default FullscreenProjectViewer;
