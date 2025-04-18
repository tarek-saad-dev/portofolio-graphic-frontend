import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import "aos/dist/aos.css";
import AOS from "aos";

function Projects({ projects: propProjects, loading, error }) {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  // If projects are passed as props, use them
  // Otherwise, fetch them from the API
  useEffect(() => {
    if (propProjects) {
      setProjects(propProjects);
      setIsLoading(loading || false);
      setErrorMessage(error || null);
    } else {
      // Fetch projects from the API if not provided as props
      const fetchProjects = async () => {
        try {
          setIsLoading(true);
          const apiBaseUrl = process.env.NODE_ENV === 'production' 
            ? 'https://portfolio-graphics-server.vercel.app'
            : 'http://localhost:3000';
            
          const response = await fetch(`${apiBaseUrl}/api/projects`);
          
          if (!response.ok) {
            throw new Error('Failed to fetch projects');
          }
          
          const data = await response.json();
          
          // Process the image paths to use the public URL
          const processedProjects = data.map(project => {
            return {
              ...project,
              imgPath: project.imgPath ? process.env.PUBLIC_URL + project.imgPath : null,
              imagePaths: project.imagePaths ? project.imagePaths.map(path => 
                process.env.PUBLIC_URL + path
              ) : []
            };
          });
          
          setProjects(processedProjects);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching projects:', error);
          setErrorMessage(error.message);
          setIsLoading(false);
        }
      };

      fetchProjects();
    }
  }, [propProjects, loading, error]);

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
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {projects.map((project, index) => (
            <Col
              md={4}
              className="project-card"
              data-aos="fade-up"
              data-aos-delay={`${index * 100}`}
              key={project.id}
            >
              <ProjectCard
                id={project.id}
                imgPath={project.imgPath}
                title={project.title}
                description={project.description}
                ghLink={project.ghLink}
                demoLink={project.demoLink}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
