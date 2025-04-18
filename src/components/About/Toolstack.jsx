// Toolstack.js
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiPostman,
  SiSlack,
  SiVercel,
  SiFirebase,
  SiStrapi,
  SiGithub,
  SiNetlify,
  SiPostgresql,
  SiFigma,
  SiInsomnia,
  SiSwagger,
  SiDocker,
  SiJsonwebtokens,
  SiRender,
  SiOpenai,
  SiAxios
} from "react-icons/si";
import { FaSms, FaCcStripe, FaWindows } from "react-icons/fa";
import { MdAnimation } from "react-icons/md";
import { GiArtificialIntelligence } from "react-icons/gi";
import { DiGit, DiNodejs, DiMongodb, DiResponsive } from "react-icons/di";
import { TbApi } from "react-icons/tb";
import { FaMapMarkedAlt } from "react-icons/fa";
import { TbBrandSupabase } from "react-icons/tb";
import { DiVisualstudio } from "react-icons/di";
import AOS from "aos";
import "aos/dist/aos.css";

// Import all icon libraries to dynamically access them
import * as DiIcons from "react-icons/di";
import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";
import * as TbIcons from "react-icons/tb";
import * as GiIcons from "react-icons/gi";
import * as MdIcons from "react-icons/md";

// Legacy mapping for backward compatibility
const toolIconMapping = {
  "VS Code": <SiVisualstudiocode />,
  Postman: <SiPostman />,
  Insomnia: <SiInsomnia />,
  "MongoDB Compass": <DiMongodb />,
  Docker: <SiDocker />,
  Swagger: <SiSwagger />,
  GitHub: <SiGithub />,
  Git: <DiGit />,
  "Node.js": <DiNodejs />,
  Firebase: <SiFirebase />,
  Vercel: <SiVercel />,
  Netlify: <SiNetlify />,
  Render: <SiRender />,
  Stripe: <FaCcStripe />,
  Figma: <SiFigma />,
  API: <TbApi />,
  Axios: <SiAxios />,
  JWT: <SiJsonwebtokens />,
  neondb: <SiPostgresql />,
  "Open Ai": <SiOpenai />,
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
      } else if (iconName.startsWith('Tb')) {
        iconLibrary = TbIcons;
      } else if (iconName.startsWith('Gi')) {
        iconLibrary = GiIcons;
      } else if (iconName.startsWith('Md')) {
        iconLibrary = MdIcons;
      }
      break;
    default:
      return null;
  }
  
  const IconComponent = iconLibrary[iconName];
  return IconComponent ? <IconComponent /> : null;
};

function Toolstack({ tools }) {
  const [loadedIcons, setLoadedIcons] = useState({});
  
  // Function to get icon for a tool
  const getToolIcon = (tool) => {
    // If tool is an object from API (has name and iconName properties)
    if (tool && typeof tool === 'object' && tool.name) {
      // Level 1: Check if we have it in our API data with iconType and iconName
      if (tool.iconType && tool.iconName) {
        const iconComponent = getIconComponent(tool.iconType, tool.iconName);
        if (iconComponent) return iconComponent;
      }
      
      // Level 1.5: Check if we have it in our legacy iconMapping
      if (toolIconMapping[tool.name]) {
        return toolIconMapping[tool.name];
      }
      
      // Level 2: Check if we have a loaded custom SVG icon
      if (loadedIcons[tool.name]) {
        return <img src={loadedIcons[tool.name]} alt={tool.name} className="custom-tool-icon" />;
      }
      
      // Level 3: If no icon found, return a text-based fallback
      return <div className="fallback-icon">{tool.name.substring(0, 2).toUpperCase()}</div>;
    } 
    // If tool is a string (legacy format)
    else if (typeof tool === 'string') {
      // Level 1: Check if we have it in our legacy iconMapping
      if (toolIconMapping[tool]) {
        return toolIconMapping[tool];
      }
      
      // Level 2: Check if we have a loaded custom SVG icon
      if (loadedIcons[tool]) {
        return <img src={loadedIcons[tool]} alt={tool} className="custom-tool-icon" />;
      }
      
      // Level 3: If no icon found, return a text-based fallback
      return <div className="fallback-icon">{tool.substring(0, 2).toUpperCase()}</div>;
    }
    
    // Fallback for unexpected input
    return <div className="fallback-icon">?</div>;
  };
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
    
    // Preload custom icons for better performance
    const iconPromises = {};
    
    if (tools && tools.length > 0) {
      tools.forEach(tool => {
        const toolName = typeof tool === 'object' ? tool.name : tool;
        const hasBuiltInIcon = typeof tool === 'object' 
          ? (tool.iconType && tool.iconName && getIconComponent(tool.iconType, tool.iconName)) 
          : toolIconMapping[toolName];
        
        if (!hasBuiltInIcon) {
          try {
            const toolKey = toolName.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '');
            iconPromises[toolName] = import(`../../assets/tool-icons/${toolKey}.svg`)
              .then(module => module.default)
              .catch(() => null);
          } catch (error) {
            iconPromises[toolName] = Promise.resolve(null);
          }
        }
      });
      
      // Load all custom icons
      Promise.all(Object.entries(iconPromises).map(([tool, promise]) => 
        promise.then(icon => [tool, icon])
      )).then(results => {
        const icons = Object.fromEntries(results);
        setLoadedIcons(icons);
      });
    }
  }, [tools]);

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {tools && tools.map((tool, index) => {
        const toolName = typeof tool === 'object' ? tool.name : tool;
        return (
          <Col
            xs={4}
            md={2}
            className="tool-icons"
            data-aos="fade-up"
            data-aos-delay={index * 200}
            key={index}
            style={{ position: "relative", textAlign: "center" }}
          >
            {getToolIcon(tool)}
            <div className="tool-tooltip">{toolName}</div>
          </Col>
        );
      })}
    </Row>
  );
}

export default Toolstack;
