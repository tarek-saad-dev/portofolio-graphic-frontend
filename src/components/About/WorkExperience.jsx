import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function WorkExperience({ experiences = [] }) {
  useEffect(() => {
    AOS.init({
      duration: 1500, // Animation duration
      offset: 100, // Offset before animation starts
      easing: "ease-in-out", // Animation easing
    });
  }, []);

  return (
    <div className="work-experience-container">
      {experiences.length === 0 ? (
        <div className="text-center" style={{ color: "white" }}>No work experience data available.</div>
      ) : (
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div
              key={exp._id || index}
              className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
            >
              <div className="timeline-card">
                <h3 className="timeline-title">{exp.title}</h3>
                <p className="timeline-company">{exp.company}</p>
                <p className="timeline-duration">{exp.duration}</p>
                <p className="timeline-type">
                  <strong>Type:</strong> {exp.type}
                </p>
                <ul className="timeline-role">
                  {exp.role.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WorkExperience;
