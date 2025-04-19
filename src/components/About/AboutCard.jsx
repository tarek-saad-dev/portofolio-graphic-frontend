import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "start" }}>
            Hi Everyone, I am <span className="purple">Tarek Saad</span>
            <span style={{ padding: "0 6px" }}>
              from
            </span>{" "}
            <span className="purple">Alexandria, Egypt.</span>
            <br /> <hr />
            I am a Graphic Designer with extensive experience in various design tools. I've worked on logo and visual identity designs, social media graphics, and primarily focused on print and book designs.
            <br />
            <br />
            Apart from design, here are some other activities that I enjoy!
          </p>
          <ul style={{ lineHeight: "3rem" }}>
            <li className="about-activity">
              <ImPointRight /> Learning new design tools and technologies
            </li>
            <li className="about-activity">
              <ImPointRight /> Passionate about UI/UX and Creative Design
            </li>
            <li className="about-activity">
              <ImPointRight /> Creating visually compelling content
            </li>
            <li className="about-activity">
              <ImPointRight /> Leading creative projects and teams
            </li>
            <li className="about-activity">
              <ImPointRight /> Researching design trends and techniques
            </li>
            <li className="about-activity">
              <ImPointRight /> Exploring new ways to innovate in design
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Creativity is the art of collecting knowledge from different fields and weaving it into a single, powerful idea."
          </p>
          <footer className="blockquote-footer">Tarek Saad</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
