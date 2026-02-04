import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchProjectBySlug } from "../../utils/graphicDesignApi";
import ImageGallery from "./ImageGallery";
import Lightbox from "./Lightbox";
import "./ProjectModal.css";

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [fullProject, setFullProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const loadFullProject = useCallback(async () => {
    if (!project) return;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchProjectBySlug(project.slug);
      setFullProject(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [project]);

  useEffect(() => {
    if (isOpen && project) {
      document.body.style.overflow = "hidden";
      loadFullProject();
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, project, loadFullProject]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen && !lightboxOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, lightboxOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const openLightbox = (images, index) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  if (!isOpen) return null;

  const projectData = fullProject || project;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="modal-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <button
              className="modal-close"
              onClick={onClose}
              aria-label="Close modal"
            >
              <i className="fas fa-times"></i>
            </button>

            <div className="modal-content">
              {loading ? (
                <div className="modal-loading">
                  <div className="spinner"></div>
                  <p>Loading project details...</p>
                </div>
              ) : error ? (
                <div className="modal-error">
                  <i className="fas fa-exclamation-circle"></i>
                  <h3>Failed to load project</h3>
                  <p>{error}</p>
                  <button onClick={loadFullProject} className="retry-btn">
                    Try Again
                  </button>
                </div>
              ) : (
                <>
                  <section className="modal-hero">
                    <div className="hero-image-wrapper">
                      <img
                        src={projectData.coverImage?.url}
                        alt={projectData.coverImage?.alt || projectData.title}
                        className="hero-image"
                        onClick={() =>
                          openLightbox([projectData.coverImage], 0)
                        }
                      />
                    </div>

                    <div className="hero-content">
                      <h1 className="modal-title">{projectData.title}</h1>

                      {projectData.tags && projectData.tags.length > 0 && (
                        <div className="tags-container">
                          {projectData.tags.map((tag, index) => (
                            <span key={index} className="tag-pill">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="project-info-row">
                        {projectData.year && (
                          <div className="info-item">
                            <i className="fas fa-calendar"></i>
                            <div>
                              <span className="info-label">Year</span>
                              <span className="info-value">
                                {projectData.year}
                              </span>
                            </div>
                          </div>
                        )}

                        {fullProject?.role && (
                          <div className="info-item">
                            <i className="fas fa-user"></i>
                            <div>
                              <span className="info-label">Role</span>
                              <span className="info-value">
                                {fullProject.role}
                              </span>
                            </div>
                          </div>
                        )}

                        {projectData.tools && projectData.tools.length > 0 && (
                          <div className="info-item">
                            <i className="fas fa-tools"></i>
                            <div>
                              <span className="info-label">Tools</span>
                              <span className="info-value">
                                {projectData.tools.join(", ")}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </section>

                  {fullProject?.story && (
                    <section className="modal-section story-section">
                      <h2 className="section-heading">
                        <i className="fas fa-book-open"></i>
                        The Story
                      </h2>
                      <p className="story-text">{fullProject.story}</p>
                    </section>
                  )}

                  {fullProject?.gallery && (
                    <ImageGallery
                      gallery={fullProject.gallery}
                      onImageClick={openLightbox}
                    />
                  )}

                  {fullProject?.mockups && fullProject.mockups.length > 0 && (
                    <section className="modal-section mockups-section">
                      <h2 className="section-heading">
                        <i className="fas fa-mobile-alt"></i>
                        Mockups
                      </h2>
                      <div className="mockups-grid">
                        {fullProject.mockups
                          .sort((a, b) => (a.order || 0) - (b.order || 0))
                          .map((mockup, index) => (
                            <div
                              key={index}
                              className="mockup-item"
                              onClick={() =>
                                openLightbox(fullProject.mockups, index)
                              }
                            >
                              <img
                                src={mockup.url}
                                alt={mockup.alt || `Mockup ${index + 1}`}
                                loading="lazy"
                              />
                              {mockup.caption && (
                                <p className="mockup-caption">
                                  {mockup.caption}
                                </p>
                              )}
                            </div>
                          ))}
                      </div>
                    </section>
                  )}
                </>
              )}
            </div>
          </motion.div>

          {lightboxOpen && (
            <Lightbox
              images={lightboxImages}
              currentIndex={lightboxIndex}
              onClose={closeLightbox}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
