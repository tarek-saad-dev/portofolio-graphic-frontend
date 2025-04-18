// About.js
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import laptopImg from "../../Assets/about.png";
import Toolstack from "./Toolstack"; // Adjusted import path
import WorkExperience from "./WorkExperience";


function About() {
  const [skills, setSkills] = useState([]);
  const [tools, setTools] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toolsLoading, setToolsLoading] = useState(true);
  const [experiencesLoading, setExperiencesLoading] = useState(true);
  
  useEffect(() => {
    // Fetch skills from the API
    const apiBaseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://portfolio-graphics-server.vercel.app'
      : 'http://localhost:3000';
      
    fetch(`${apiBaseUrl}/api/skills`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setSkills(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching skills:", error);
        setLoading(false);
      });
      
    // Fetch tools from the API
    fetch(`${apiBaseUrl}/api/tools`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setTools(data);
        setToolsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching tools:", error);
        setToolsLoading(false);
      });
      
    // Fetch experiences from the API
    fetch(`${apiBaseUrl}/api/experiences`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        // Sort experiences by order if available
        const sortedData = data.sort((a, b) => (a.order || 0) - (b.order || 0));
        setExperiences(sortedData);
        setExperiencesLoading(false);
      })
      .catch(error => {
        console.error("Error fetching experiences:", error);
        setExperiencesLoading(false);
      });
  }, []);
  
  const technologies = [];

  return (
    <Container fluid className="about-section" style={{ backgroundColor: "#0d1117" }}>
      <Particle />
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            className="home-header"
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1 style={{ fontSize: "2.1em", paddingBottom: "15px", color: "#c889e6" , marginTop:"60px" , textAlign:"start" }}>
              Know Who <strong className="purple">I'M</strong>
            </h1>
            <Aboutcard />
          </Col>
          <Col
            md={5}
            style={{ paddingTop: "120px", paddingBottom: "50px" }}
            className="about-img home-image"
          >
            <img src={laptopImg} alt="about" className="img-fluid" />
          </Col>
        </Row>

        <h1 className="project-heading" style={{ color: "#c889e6", textAlign: "center", marginBottom: "20px" }}>
          Professional <strong className="purple">Skillset</strong>
        </h1>
        {loading ? (
          <div className="text-center" style={{ color: "white" }}>Loading skills...</div>
        ) : (
          <Techstack skills={skills} technologies={technologies} />
        )}

        <h1 className="project-heading" style={{ color: "#c889e6", textAlign: "center", marginBottom: "20px" }}>
          <strong className="purple">Tools</strong> I use
        </h1>
        {toolsLoading ? (
          <div className="text-center" style={{ color: "white" }}>Loading tools...</div>
        ) : (
          <Toolstack tools={tools} />
        )}
        
        <h1 className="project-heading" style={{ color: "#c889e6", textAlign: "center", marginBottom: "20px" }}>
          Work<strong className="purple">Experience</strong>
        </h1>
        {experiencesLoading ? (
          <div className="text-center" style={{ color: "white" }}>Loading experiences...</div>
        ) : (
          <WorkExperience experiences={experiences} />
        )}
        <Github />
      </Container>
    </Container>
  );
}

export default About;
