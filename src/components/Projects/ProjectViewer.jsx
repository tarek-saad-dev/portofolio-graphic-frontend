import React, { useEffect, useState, useCallback } from "react";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";
import { fetchProjectBySlug } from "../../utils/graphicDesignApi";
import GalleryCarousel from "./GalleryCarousel";
import VerticalFlow from "./VerticalFlow";
import MockupsGrid from "./MockupsGrid";
import Lightbox from "./Lightbox";
import "./ProjectViewer.css";

function ProjectViewer({ slug, onClose, onNext, onPrev }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  useEffect(() => {
    const loadProject = async () => {
      if (!slug) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetchProjectBySlug(slug);
        setProject(response.data);
      } catch (err) {
        console.error("Error loading project:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [slug]);

  const handleEscapeKey = useCallback(
    (e) => {
      if (e.key === "Escape" && !showLightbox) {
        onClose();
      }
    },
    [onClose, showLightbox]
  );

  const handleArrowKeys = useCallback(
    (e) => {
      if (showLightbox) return;
      if (e.key === "ArrowLeft" && onPrev) {
        onPrev();
      } else if (e.key === "ArrowRight" && onNext) {
        onNext();
      }
    },
    [onNext, onPrev, showLightbox]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("keydown", handleArrowKeys);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("keydown", handleArrowKeys);
      document.body.style.overflow = "auto";
    };
  }, [handleEscapeKey, handleArrowKeys]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const openLightbox = (images, startIndex = 0) => {
    setLightboxImages(images);
    setLightboxIndex(startIndex);
    setShowLightbox(true);
  };

  const closeLightbox = () => {
    setShowLightbox(false);
  };

  if (loading) {
    return (
      <div className="project-viewer-overlay" onClick={handleBackdropClick}>
        <div className="project-viewer-container">
          <div className="project-viewer-loading">
            <div className="loading-spinner"></div>
            <p>Loading project...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="project-viewer-overlay" onClick={handleBackdropClick}>
        <div className="project-viewer-container">
          <button className="viewer-close-btn" onClick={onClose}>
            <IoClose />
          </button>
          <div className="project-viewer-error">
            <p>Error loading project: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!project) return null;

  const sliderImages = project.gallery?.sliderImages ?? [];
  const verticalImages = project.gallery?.verticalImages ?? [];
  const mockups = project.mockups ?? [];

  const heroImage =
    sliderImages.length > 0 ? sliderImages[0] : project.coverImage;

  return (
    <>
      <div className="project-viewer-overlay" onClick={handleBackdropClick}>
        <div className="project-viewer-container">
          <header className="viewer-header">
            <div className="viewer-header-content">
              <div className="viewer-header-left">
                <h1 className="viewer-title">{project.title}</h1>
                <div className="viewer-meta">
                  <span className="viewer-category">{project.category}</span>
                  <span className="viewer-separator">•</span>
                  <span className="viewer-year">{project.year}</span>
                </div>
              </div>
              <button className="viewer-close-btn" onClick={onClose}>
                <IoClose />
              </button>
            </div>
          </header>

          {(onPrev || onNext) && (
            <>
              {onPrev && (
                <button className="viewer-nav-btn viewer-nav-prev" onClick={onPrev}>
                  <IoChevronBack />
                </button>
              )}
              {onNext && (
                <button className="viewer-nav-btn viewer-nav-next" onClick={onNext}>
                  <IoChevronForward />
                </button>
              )}
            </>
          )}

          <div className="viewer-content">
            <section className="viewer-hero">
              <img
                src={heroImage?.url || heroImage}
                alt={heroImage?.alt || project.title}
                className="viewer-hero-image"
                onClick={() =>
                  openLightbox(
                    sliderImages.length > 0 ? sliderImages : [project.coverImage],
                    0
                  )
                }
              />
            </section>

            <section className="viewer-story-section">
              {project.tags && project.tags.length > 0 && (
                <div className="viewer-tags">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="viewer-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {project.shortDescription && (
                <p className="viewer-short-description">
                  {project.shortDescription}
                </p>
              )}

              {project.story && (
                <div className="viewer-story">
                  <p>{project.story}</p>
                </div>
              )}
            </section>

            {sliderImages.length > 0 && (
              <section className="viewer-section">
                <h2 className="viewer-section-title">Campaign Highlights</h2>
                <GalleryCarousel
                  images={sliderImages}
                  onImageClick={(index) => openLightbox(sliderImages, index)}
                />
              </section>
            )}

            {verticalImages.length > 0 && (
              <section className="viewer-section">
                <h2 className="viewer-section-title">Visual Story</h2>
                <VerticalFlow
                  images={verticalImages}
                  onImageClick={(index) => openLightbox(verticalImages, index)}
                />
              </section>
            )}

            {mockups.length > 0 && (
              <section className="viewer-section">
                <h2 className="viewer-section-title">Mockups & Applications</h2>
                <MockupsGrid
                  images={mockups}
                  onImageClick={(index) => openLightbox(mockups, index)}
                />
              </section>
            )}

            <section className="viewer-info-section">
              <div className="viewer-info-grid">
                {project.role && (
                  <div className="viewer-info-item">
                    <span className="info-label">Role</span>
                    <span className="info-value">{project.role}</span>
                  </div>
                )}
                {project.tools && project.tools.length > 0 && (
                  <div className="viewer-info-item">
                    <span className="info-label">Tools</span>
                    <div className="info-tools">
                      {project.tools.map((tool, index) => (
                        <span key={index} className="tool-chip">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {project.year && (
                  <div className="viewer-info-item">
                    <span className="info-label">Year</span>
                    <span className="info-value">{project.year}</span>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>

      {showLightbox && (
        <Lightbox
          images={lightboxImages}
          startIndex={lightboxIndex}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}

export default ProjectViewer;
