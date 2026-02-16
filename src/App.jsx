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
import GraphicDesign from "./components/GraphicDesign/GraphicDesign";
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
        const apiBaseUrl =
          process.env.REACT_APP_GRAPHICS_API_BASE_URL ||
          "https://portfolio-graphic-server.vercel.app";

        const url = `${apiBaseUrl}/api/gd/projects`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Failed to fetch projects: ${response.status} ${response.statusText} ${errorText}`,
          );
        }

        const contentType = response.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          const text = await response.text();
          throw new Error(
            `Expected JSON but received ${contentType || "unknown"}: ${text.slice(
              0,
              200,
            )}`,
          );
        }

        const response_data = await response.json();

        // Extract projects array from API response structure
        const projectsData = Array.isArray(response_data.data)
          ? response_data.data
          : [];

        setProjects(projectsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
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
          <Route
            path="/project"
            element={
              <Projects projects={projects} loading={loading} error={error} />
            }
          />
          <Route
            path="/project/:projectId"
            element={
              <ProjectDetail
                projects={projects}
                loading={loading}
                error={error}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/graphic-design" element={<GraphicDesign />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
