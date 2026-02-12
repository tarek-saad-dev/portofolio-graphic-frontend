import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Masonry from "react-masonry-css";
import BehanceProjectCard from "./BehanceProjectCard";
import ProjectFilters from "./ProjectFilters";
import FullscreenProjectViewer from "./FullscreenProjectViewer";
import Particle from "../Particle";
import "aos/dist/aos.css";
import AOS from "aos";
import "./Projects.css";

function Projects({ projects: propProjects, loading, error }) {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  useEffect(() => {
    if (propProjects) {
      setProjects(propProjects);
      setIsLoading(loading || false);
      setErrorMessage(error || null);
    }
  }, [propProjects, loading, error]);

  const categories = [
    ...new Set(projects.map((p) => p.category).filter(Boolean)),
  ];

  const filteredProjects = projects
    .filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.description &&
          project.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory =
        !selectedCategory || project.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date || 0) - new Date(a.date || 0);
        case "oldest":
          return new Date(a.date || 0) - new Date(b.date || 0);
        case "title":
          return a.title.localeCompare(b.title);
        case "featured":
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        default:
          return 0;
      }
    });

  const breakpointColumns = {
    default: 4,
    1400: 3,
    1024: 2,
    768: 1,
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseViewer = () => {
    setSelectedProject(null);
  };

  const handleNextProject = () => {
    const currentIndex = filteredProjects.findIndex(
      (p) => p._id === selectedProject._id || p.id === selectedProject.id,
    );
    const nextIndex = (currentIndex + 1) % filteredProjects.length;
    setSelectedProject(filteredProjects[nextIndex]);
  };

  const handlePrevProject = () => {
    const currentIndex = filteredProjects.findIndex(
      (p) => p._id === selectedProject._id || p.id === selectedProject.id,
    );
    const prevIndex =
      (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    setSelectedProject(filteredProjects[prevIndex]);
  };

  if (isLoading) {
    return (
      <Container fluid className="project-section">
        <Particle />
        <Container>
          <h1 className="project-heading">
            My Recent <strong className="purple">Works</strong>
          </h1>
          <p style={{ color: "white" }}>Loading projects...</p>
        </Container>
      </Container>
    );
  }

  if (errorMessage) {
    return (
      <Container fluid className="project-section">
        <Particle />
        <Container>
          <h1 className="project-heading">
            My Recent <strong className="purple">Works</strong>
          </h1>
          <p style={{ color: "white" }}>Error: {errorMessage}</p>
        </Container>
      </Container>
    );
  }

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works</strong>
        </h1>
        <p className="project-subheading">
          Explore my portfolio of creative design campaigns
        </p>

        <ProjectFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          categories={categories}
        />

        <Masonry
          breakpointCols={breakpointColumns}
          className="masonry-grid"
          columnClassName="masonry-grid-column"
        >
          {filteredProjects.map((project) => (
            <BehanceProjectCard
              key={project._id || project.id || project.slug}
              project={project}
              onClick={handleProjectClick}
            />
          ))}
        </Masonry>

        {filteredProjects.length === 0 && (
          <p className="no-results">
            No projects found matching your criteria.
          </p>
        )}
      </Container>

      {selectedProject && (
        <FullscreenProjectViewer
          project={selectedProject}
          onClose={handleCloseViewer}
          onNext={handleNextProject}
          onPrev={handlePrevProject}
        />
      )}
    </Container>
  );
}

export default Projects;
