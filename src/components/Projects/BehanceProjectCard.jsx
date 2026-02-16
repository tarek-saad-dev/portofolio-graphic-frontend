import React from "react";
import { motion } from "framer-motion";
import "./BehanceProjectCard.css";

function BehanceProjectCard({ project, onClick }) {
  return (
    <motion.div
      className="behance-card"
      onClick={() => onClick(project)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      <div className="behance-card-image-wrapper">
        <img
          src={project.coverImage?.url}
          alt={project.coverImage?.alt || project.title}
          className="behance-card-image"
          loading="lazy"
        />
        <div className="behance-card-overlay">
          <div className="behance-card-overlay-content">
            <motion.button
              className="behance-view-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Campaign
            </motion.button>
          </div>
        </div>
        {project.featured && (
          <div className="behance-featured-badge">Featured</div>
        )}
      </div>
      <div className="behance-card-info">
        <h3 className="behance-card-title">{project.title}</h3>
        <div className="behance-card-meta">
          <span className="behance-card-category">
            {project.category || "Graphic Design"}
          </span>
          <span className="behance-card-separator">•</span>
          <span className="behance-card-year">
            {project.year || new Date(project.date).getFullYear() || "2024"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default BehanceProjectCard;
