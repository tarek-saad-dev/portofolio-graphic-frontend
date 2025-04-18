import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CertificateCard from "./CertificateCard";
import Particle from "../Particle";
import AOS from "aos";
import "aos/dist/aos.css";

function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 2000, // Animation duration
      once: true, // Animation should happen only once
      easing: "ease-in-out", // Easing function for the animation
    });
  }, []);

  useEffect(() => {
    // Fetch certificates from the API
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        const apiBaseUrl = process.env.NODE_ENV === 'production' 
          ? 'https://portfolio-graphics-server.vercel.app'
          : 'http://localhost:3000';
          
        const response = await fetch(`${apiBaseUrl}/api/certificates`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch certificates');
        }
        
        const data = await response.json();
        
        // Sort certificates by order if available
        const sortedData = data.sort((a, b) => (a.order || 0) - (b.order || 0));
        
        // Process image paths to ensure they work correctly
        const processedCertificates = sortedData.map(cert => ({
          ...cert,
          imgPath: cert.imgPath ? process.env.PUBLIC_URL + cert.imgPath : null,
          orgLogos: cert.orgLogos ? cert.orgLogos.map(logo => 
            process.env.PUBLIC_URL + logo
          ) : []
        }));
        
        setCertificates(processedCertificates);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching certificates:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Certificates </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few certificates I've achieved recently.
        </p>
        
        {loading ? (
          <div className="text-center" style={{ color: "white" }}>Loading certificates...</div>
        ) : error ? (
          <div className="text-center" style={{ color: "white" }}>Error: {error}</div>
        ) : certificates.length === 0 ? (
          <div className="text-center" style={{ color: "white" }}>No certificates available.</div>
        ) : (
          <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            {certificates.map((certificate, index) => (
              <Col
                md={4}
                className="project-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                key={certificate._id || index}
              >
                <CertificateCard
                  imgPath={certificate.imgPath}
                  orgLogos={certificate.orgLogos}
                  title={certificate.title}
                  description={certificate.description}
                  liveLink={certificate.liveLink}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </Container>
  );
}

export default Certificates;
