import React from 'react';
import './LoadingSkeleton.css';

const LoadingSkeleton = ({ count = 12 }) => {
  return (
    <div className="projects-grid">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-image"></div>
          <div className="skeleton-content">
            <div className="skeleton-header">
              <div className="skeleton-pill"></div>
              <div className="skeleton-year"></div>
            </div>
            <div className="skeleton-title"></div>
            <div className="skeleton-description"></div>
            <div className="skeleton-tools">
              <div className="skeleton-tool"></div>
              <div className="skeleton-tool"></div>
              <div className="skeleton-tool"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
