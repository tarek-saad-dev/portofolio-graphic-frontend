import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import { IoColorPaletteOutline } from "react-icons/io5";
import { BsEyeFill } from "react-icons/bs";
import { MdOutlineColorLens, MdTrendingUp } from "react-icons/md";
import { FaPaintBrush, FaPenNib, FaLaptopCode, FaCamera, FaVideo } from "react-icons/fa";
import { SiAdobephotoshop, SiAdobeillustrator, SiAdobeindesign, SiAdobexd, SiAdobepremierepro, SiFigma } from "react-icons/si";

function DesignActivity() {
  const [activityData, setActivityData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 3000,
    });

    // You could fetch this from an API in the future
    // For now, we'll use sample data
    const sampleData = generateSampleData();
    setActivityData(sampleData);
    setLoading(false);
  }, []);

  // Generate sample design activity data
  const generateSampleData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentYear = new Date().getFullYear();
    const activities = ['Illustration', 'UI Design', 'Branding', 'Typography', 'Photography', 'Motion Graphics'];
    const tools = [
      <SiAdobephotoshop key="ps" />, 
      <SiAdobeillustrator key="ai" />, 
      <SiAdobeindesign key="id" />, 
      <SiAdobexd key="xd" />, 
      <SiAdobepremierepro key="pr" />, 
      <SiFigma key="figma" />
    ];
    
    return months.map((month, index) => {
      // Random number of activities between 1-5 for each month
      const count = Math.floor(Math.random() * 5) + 1;
      
      return {
        month,
        year: currentYear,
        count,
        intensity: count > 3 ? 'high' : count > 1 ? 'medium' : 'low',
        primaryActivity: activities[Math.floor(Math.random() * activities.length)],
        primaryTool: tools[Math.floor(Math.random() * tools.length)]
      };
    });
  };

  const getIntensityColor = (intensity) => {
    switch(intensity) {
      case 'high': return '#c084f5';
      case 'medium': return '#9d65c9';
      case 'low': return '#7a4a9e';
      default: return '#5e3a7a';
    }
  };

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "30px", color:"#fff" }} data-aos="fade-up" data-aos-duration="3000">
      <h1 className="project-heading" style={{ color: "#c889e6", textAlign: "center", marginBottom: "20px" }}>
        <strong className="purple">Creative</strong> Activity
      </h1>
      
      {loading ? (
        <div className="text-center">Loading creative activity...</div>
      ) : (
        <div className="design-activity-container">
          <div className="design-activity-legend" style={{ textAlign: "center", marginBottom: "15px" }}>
            <span style={{ marginRight: "15px" }}><FaPaintBrush /> Illustration</span>
            <span style={{ marginRight: "15px" }}><FaPenNib /> Branding</span>
            <span style={{ marginRight: "15px" }}><FaLaptopCode /> UI Design</span>
            <span style={{ marginRight: "15px" }}><FaCamera /> Photography</span>
            <span><FaVideo /> Motion</span>
          </div>
          
          <div className="design-activity-grid" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
            {activityData.map((data, index) => (
              <div 
                key={index} 
                className="activity-month" 
                style={{ 
                  margin: "10px", 
                  padding: "15px", 
                  backgroundColor: getIntensityColor(data.intensity),
                  borderRadius: "8px",
                  width: "120px",
                  textAlign: "center",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
                }}
              >
                <h5 style={{ marginBottom: "5px" }}>{data.month}</h5>
                <div style={{ fontSize: "24px", marginBottom: "5px" }}>{data.primaryTool}</div>
                <p style={{ fontSize: "14px", marginBottom: "5px" }}>{data.primaryActivity}</p>
                <div style={{ fontSize: "12px" }}>{data.count} projects</div>
              </div>
            ))}
          </div>
          
          <div style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", opacity: "0.8" }}>
            Visualization of design activities throughout the year
          </div>
        </div>
      )}
    </Row>
  );
}

function ColorPaletteTimeline() {
  const [colorData, setColorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPalette, setSelectedPalette] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
      easing: "ease-in-out",
    });

    // Generate sample color palette data
    const sampleData = generateColorData();
    setColorData(sampleData);
    setLoading(false);
  }, []);

  // Generate sample color palette data
  const generateColorData = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    
    // Predefined color palettes for different design styles/moods
    const palettes = [
      {
        name: "Minimalist",
        colors: ["#F5F5F5", "#E0E0E0", "#9E9E9E", "#616161", "#212121"],
        description: "Clean, simple, and elegant monochromatic palette"
      },
      {
        name: "Vibrant",
        colors: ["#FF5252", "#FF4081", "#7C4DFF", "#536DFE", "#40C4FF"],
        description: "Bold and energetic colors for eye-catching designs"
      },
      {
        name: "Nature",
        colors: ["#81C784", "#4CAF50", "#2E7D32", "#1B5E20", "#AED581"],
        description: "Organic greens inspired by natural environments"
      },
      {
        name: "Sunset",
        colors: ["#FFD54F", "#FFA726", "#FF7043", "#E64A19", "#5D4037"],
        description: "Warm gradient reminiscent of dusk skies"
      },
      {
        name: "Ocean",
        colors: ["#B3E5FC", "#4FC3F7", "#0288D1", "#01579B", "#263238"],
        description: "Cool blues representing depth and tranquility"
      },
      {
        name: "Pastel",
        colors: ["#F8BBD0", "#B2EBF2", "#C8E6C9", "#FFE0B2", "#D1C4E9"],
        description: "Soft and gentle tones for delicate designs"
      },
      {
        name: "Neon",
        colors: ["#00FF00", "#FF00FF", "#00FFFF", "#FFFF00", "#FF0000"],
        description: "Ultra-bright colors for digital and modern designs"
      },
      {
        name: "Earthy",
        colors: ["#A1887F", "#8D6E63", "#6D4C41", "#4E342E", "#3E2723"],
        description: "Grounded, natural tones inspired by soil and clay"
      }
    ];
    
    // Assign a random palette to each month with a trend toward certain palettes in certain seasons
    return months.map((month, index) => {
      let seasonalBias;
      
      // Add seasonal bias to palette selection
      if (index <= 1 || index >= 10) { // Winter (Dec-Feb)
        seasonalBias = ["Ocean", "Minimalist"];
      } else if (index >= 2 && index <= 4) { // Spring (Mar-May)
        seasonalBias = ["Pastel", "Nature"];
      } else if (index >= 5 && index <= 7) { // Summer (Jun-Aug)
        seasonalBias = ["Vibrant", "Sunset", "Neon"];
      } else { // Fall (Sep-Nov)
        seasonalBias = ["Earthy", "Sunset"];
      }
      
      // Select a palette with bias toward seasonal palettes
      let selectedPalette;
      if (Math.random() < 0.7) { // 70% chance to pick a seasonal palette
        const biasedIndex = Math.floor(Math.random() * seasonalBias.length);
        selectedPalette = palettes.find(p => p.name === seasonalBias[biasedIndex]);
      } else {
        selectedPalette = palettes[Math.floor(Math.random() * palettes.length)];
      }
      
      // Add some projects that used this palette
      const projectCount = Math.floor(Math.random() * 4) + 1;
      const projectTypes = ["Branding", "UI/UX", "Illustration", "Typography", "Print", "Social Media"];
      const projects = Array(projectCount).fill().map(() => {
        return projectTypes[Math.floor(Math.random() * projectTypes.length)];
      });
      
      return {
        month,
        palette: selectedPalette,
        projects,
        trending: Math.random() > 0.7 // 30% chance a palette is trending
      };
    });
  };

  const handlePaletteClick = (palette) => {
    setSelectedPalette(selectedPalette === palette ? null : palette);
  };

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "30px", color:"#fff" }} data-aos="fade-up">
      <h1 className="project-heading" style={{ color: "#c889e6", textAlign: "center", marginBottom: "20px" }}>
        <strong className="purple">Color</strong> Evolution
      </h1>
      
      {loading ? (
        <div className="text-center">Loading color data...</div>
      ) : (
        <div className="color-timeline-container">
          <div className="color-timeline-description" style={{ textAlign: "center", marginBottom: "25px" }}>
            <p style={{ maxWidth: "700px", margin: "0 auto" }}>
              <IoColorPaletteOutline style={{ fontSize: "1.5rem", marginRight: "8px" }} />
              My color palette preferences throughout the year, reflecting seasonal inspirations and design trends
            </p>
          </div>
          
          {selectedPalette && (
            <div 
              className="selected-palette-detail" 
              style={{ 
                margin: "0 auto 30px auto",
                padding: "20px",
                backgroundColor: "rgba(0,0,0,0.2)",
                borderRadius: "10px",
                maxWidth: "700px",
                textAlign: "center"
              }}
              data-aos="fade-down"
            >
              <h3>{selectedPalette.palette.name} Palette</h3>
              <p>{selectedPalette.palette.description}</p>
              <div style={{ display: "flex", justifyContent: "center", margin: "15px 0" }}>
                {selectedPalette.palette.colors.map((color, idx) => (
                  <div 
                    key={idx}
                    style={{ 
                      backgroundColor: color,
                      width: "50px",
                      height: "50px",
                      margin: "0 5px",
                      borderRadius: "5px",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: isLightColor(color) ? "#000" : "#fff",
                      fontSize: "10px"
                    }}
                  >
                    {color}
                  </div>
                ))}
              </div>
              <p>Used in {selectedPalette.projects.join(", ")} projects during {selectedPalette.month}</p>
            </div>
          )}
          
          <div className="color-timeline" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {colorData.map((data, index) => (
              <div 
                key={index} 
                className="month-palette" 
                style={{ 
                  margin: "10px",
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                  transform: selectedPalette === data ? "scale(1.05)" : "scale(1)"
                }}
                onClick={() => handlePaletteClick(data)}
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <div style={{ 
                  padding: "10px", 
                  backgroundColor: "rgba(0,0,0,0.2)",
                  borderRadius: "8px 8px 0 0",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "5px"
                }}>
                  <span>{data.month}</span>
                  {data.trending && <MdTrendingUp title="Trending" style={{ color: "#FF4081" }} />}
                </div>
                <div style={{ 
                  display: "flex", 
                  height: "20px",
                  borderRadius: "0 0 8px 8px",
                  overflow: "hidden",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
                }}>
                  {data.palette.colors.map((color, colorIndex) => (
                    <div 
                      key={colorIndex} 
                      style={{ 
                        backgroundColor: color, 
                        flex: 1,
                        height: "100%"
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ textAlign: "center", marginTop: "25px", fontSize: "14px", opacity: "0.8" }}>
            <BsEyeFill style={{ marginRight: "5px" }} />
            Click on any month to see palette details
          </div>
        </div>
      )}
    </Row>
  );
}

// Helper function to determine if a color is light or dark
function isLightColor(color) {
  // Convert hex to RGB
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate brightness (YIQ formula)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128;
}

export default ColorPaletteTimeline;
