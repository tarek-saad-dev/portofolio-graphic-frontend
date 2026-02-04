import React from 'react';
import { motion } from 'framer-motion';
import './ProjectCard.css';

const ProjectCard = ({ project, onClick }) => {
  const { coverImage, title, category, shortDescription, year, tools } = project;

  return (
    <motion.div
      className="project-card"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
    >
      <div className="card-image-wrapper">
        <img
          src={coverImage?.url}
          alt={coverImage?.alt || title}
          className="card-image"
          loading="lazy"
        />
        <div className="card-overlay">
          <button className="view-campaign-btn">
            <i className="fas fa-eye"></i>
            View Campaign
          </button>
        </div>
      </div>

      <div className="card-content">
        <div className="card-header">
          <span className="category-pill">{category}</span>
          {year && <span className="year-badge">{year}</span>}
        </div>

        <h3 className="card-title">{title}</h3>
        
        {shortDescription && (
          <p className="card-description">{shortDescription}</p>
        )}

        {tools && tools.length > 0 && (
          <div className="card-tools">
            {tools.slice(0, 3).map((tool, index) => (
              <span key={index} className="tool-tag">
                {tool}
              </span>
            ))}
            {tools.length > 3 && (
              <span className="tool-tag more">+{tools.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
