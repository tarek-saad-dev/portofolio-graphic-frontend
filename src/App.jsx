// App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Certificates from "./components/Certificate/Certificates";
import Footer from "./components/Footer";
import Contact from "./components/Contact/Contact"; // Import Contact component
import Resume from "./components/Resume/ResumeNew";
import ProjectDetail from "./components/Projects/ProjectDetail";
import Preloader from "./components/Pre";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [load, updateLoad] = useState(true);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Fetch projects from the API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://portfolio-graphics-server.vercel.app/api/projects');
        
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        
        const data = await response.json();
        
        // Process projects to add public URL to image paths
        const processedProjects = data.map(project => {
          return {
            ...project,
            // Convert relative paths to absolute URLs
            imgPath: project.imgPath ? process.env.PUBLIC_URL + project.imgPath : null,
            imagePaths: project.imagePaths ? project.imagePaths.map(path => 
              process.env.PUBLIC_URL + path
            ) : []
          };
        });
        
        setProjects(processedProjects);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Projects projects={projects} loading={loading} error={error} />} />
          <Route
            path="/project/:projectId"
            element={<ProjectDetail projects={projects} loading={loading} error={error} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
