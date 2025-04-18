import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import {
  DiJavascript1,
  DiReact,
  DiCss3,
  DiHtml5,
  DiNodejs,
  DiPython
} from "react-icons/di";
import {
  SiBootstrap,
  SiTailwindcss,
  SiTypescript,
  SiMongodb,
  SiReactrouter,
  SiReacthookform,
  SiOpenai,
  SiNestjs,
  SiExpress,
  SiMysql,
  SiPostgresql,
  SiNeo4J,
  SiMicrosoftsqlserver,
  SiNextdotjs,
  SiRedux 
} from "react-icons/si";
import { FaServer } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

// Import all icon libraries to dynamically access them
import * as DiIcons from "react-icons/di";
import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";

// 🔗 Mapping for icons - keeping this for backward compatibility
const iconMapping = {
  "HTML": <DiHtml5 />,
  "CSS": <DiCss3 />,
  "Bootstrap": <SiBootstrap />,
  "Tailwind": <SiTailwindcss />,
  "JavaScript": <DiJavascript1 />,
  "TypeScript": <SiTypescript />,
  "React": <DiReact />,
  "React Router": <SiReactrouter />,
  "Hooks": <SiReacthookform />,
  "Node.js": <DiNodejs />,
  "Express.js": <SiExpress />,
  "NestJS": <SiNestjs />,
  "Server-Side": <FaServer />,
  "MongoDB": <SiMongodb />,
  "MySQL": <SiMysql />,
  "PostgreSQL": <SiPostgresql />,
  "SQL Server": <SiMicrosoftsqlserver />,
  "Neo4j": <SiNeo4J />,
  "Python": <DiPython />,
  "Open Ai": <SiOpenai />,
  "Next.js": <SiNextdotjs />,
  "Redux": <SiRedux />,
};

// Function to get icon component from iconType and iconName
const getIconComponent = (iconType, iconName) => {
  if (!iconType || !iconName) return null;
  
  let iconLibrary;
  switch (iconType) {
    case 'react-icon':
      if (iconName.startsWith('Di')) {
        iconLibrary = DiIcons;
      } else if (iconName.startsWith('Si')) {
        iconLibrary = SiIcons;
      } else if (iconName.startsWith('Fa')) {
        iconLibrary = FaIcons;
      }
      break;
    default:
      return null;
  }
  
  const IconComponent = iconLibrary[iconName];
  return IconComponent ? <IconComponent /> : null;
};

function Techstack({ skills, technologies }) {
  const [loadedIcons, setLoadedIcons] = useState({});
  
  // Function to get icon for a technology - now using the loadedIcons state
  const getTechIcon = (tech) => {
    // If tech is an object from API (has name and iconName properties)
    if (tech && typeof tech === 'object' && tech.name) {
      // Level 1: Check if we have it in our API data with iconType and iconName
      if (tech.iconType && tech.iconName) {
        const iconComponent = getIconComponent(tech.iconType, tech.iconName);
        if (iconComponent) return iconComponent;
      }
      
      // Level 1.5: Check if we have it in our legacy iconMapping
      if (iconMapping[tech.name]) {
        return iconMapping[tech.name];
      }
      
      // Level 2: Check if we have a loaded custom SVG icon
      if (loadedIcons[tech.name]) {
        return <img src={loadedIcons[tech.name]} alt={tech.name} className="custom-tech-icon" />;
      }
      
      // Level 3: If no icon found, return a text-based fallback
      return <div className="fallback-icon">{tech.name.substring(0, 2).toUpperCase()}</div>;
    } 
    // If tech is a string (legacy format)
    else if (typeof tech === 'string') {
      // Level 1: Check if we have it in our legacy iconMapping
      if (iconMapping[tech]) {
        return iconMapping[tech];
      }
      
      // Level 2: Check if we have a loaded custom SVG icon
      if (loadedIcons[tech]) {
        return <img src={loadedIcons[tech]} alt={tech} className="custom-tech-icon" />;
      }
      
      // Level 3: If no icon found, return a text-based fallback
      return <div className="fallback-icon">{tech.substring(0, 2).toUpperCase()}</div>;
    }
    
    // Fallback for unexpected input
    return <div className="fallback-icon">?</div>;
  };
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
    
    // Preload custom icons for better performance
    const allTechs = [...skills, ...technologies];
    const iconPromises = {};
    
    allTechs.forEach(tech => {
      const techName = typeof tech === 'object' ? tech.name : tech;
      const hasBuiltInIcon = typeof tech === 'object' 
        ? (tech.iconType && tech.iconName && getIconComponent(tech.iconType, tech.iconName)) 
        : iconMapping[techName];
      
      if (!hasBuiltInIcon) {
        try {
          const techKey = techName.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '');
          iconPromises[techName] = import(`../../assets/tech-icons/${techKey}.svg`)
            .then(module => module.default)
            .catch(() => null);
        } catch (error) {
          iconPromises[techName] = Promise.resolve(null);
        }
      }
    });
    
    // Load all custom icons
    Promise.all(Object.entries(iconPromises).map(([tech, promise]) => 
      promise.then(icon => [tech, icon])
    )).then(results => {
      const icons = Object.fromEntries(results);
      setLoadedIcons(icons);
    });
  }, [skills, technologies]);

  const allTechs = [...skills, ...technologies];

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {allTechs.map((tech, index) => {
        const techName = typeof tech === 'object' ? tech.name : tech;
        return (
          <Col
            xs={4}
            md={2}
            className="tech-icons"
            data-aos="fade-up"
            data-aos-delay={index * 150}
            key={index}
            style={{ position: "relative", textAlign: "center" }}
          >
            {getTechIcon(tech)}
            <div className="tech-tooltip">{techName}</div>
          </Col>
        );
      })}
    </Row>
  );
}

export default Techstack;
