import React, { useState, useEffect, useCallback } from 'react';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { fetchProjects } from '../../utils/graphicDesignApi';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import FilterBar from './FilterBar';
import LoadingSkeleton from './LoadingSkeleton';
import './GraphicDesign.css';

const GraphicDesign = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  const [filters, setFilters] = useState({
    category: '',
    q: '',
    sort: 'newest',
    page: 1,
    limit: 12,
    includeDraft: false
  });
  
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 1
  });

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchProjects(filters);
      setProjects(data.data || []);
      setCategories(data.categories || []);
      setPagination(data.pagination || {
        page: 1,
        limit: 12,
        total: 0,
        pages: 1
      });
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load projects. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: newFilters.page !== undefined ? newFilters.page : 1
    }));
  };

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeFiltersCount = [
    filters.category,
    filters.q,
    filters.sort !== 'newest'
  ].filter(Boolean).length;

  return (
    <section className="graphic-design-section">
      <Container fluid className="graphic-design-container">
        <div className="section-header">
          <h1 className="section-title">
            Graphic Design <span className="title-accent">Portfolio</span>
          </h1>
          <p className="section-subtitle">
            Explore my creative campaigns and visual storytelling
          </p>
        </div>

        <FilterBar
          filters={filters}
          categories={categories}
          onFilterChange={handleFilterChange}
          activeFiltersCount={activeFiltersCount}
          totalResults={pagination.total}
        />

        {loading ? (
          <LoadingSkeleton count={filters.limit} />
        ) : error ? (
          <div className="error-container">
            <div className="error-message">
              <i className="fas fa-exclamation-circle"></i>
              <h3>Oops! Something went wrong</h3>
              <p>{error}</p>
              <button onClick={loadProjects} className="retry-button">
                Try Again
              </button>
            </div>
          </div>
        ) : projects.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-search"></i>
            <h3>No projects found</h3>
            <p>Try adjusting your filters or search query</p>
          </div>
        ) : (
          <>
            <div className="projects-grid">
              {projects.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  onClick={() => handleCardClick(project)}
                />
              ))}
            </div>

            {pagination.pages > 1 && (
              <div className="pagination-container">
                <button
                  className="pagination-button"
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                >
                  <i className="fas fa-chevron-left"></i>
                  Previous
                </button>
                
                <div className="pagination-info">
                  <span className="page-numbers">
                    Page {pagination.page} of {pagination.pages}
                  </span>
                  <span className="total-count">
                    ({pagination.total} projects)
                  </span>
                </div>

                <button
                  className="pagination-button"
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                >
                  Next
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            )}
          </>
        )}
      </Container>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={modalOpen}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};

export default GraphicDesign;
