import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/tttt.png";
import Tilt from "react-parallax-tilt";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
  AiFillFacebook,
  AiFillBehanceCircle,
  AiFillBehanceSquare,
} from "react-icons/ai";
import { FaLinkedinIn, FaYoutube } from "react-icons/fa";

function Home2() {
  useEffect(() => {
    AOS.init({
      duration: 3000, // Animation duration
    });
  }, []);

  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col
            md={8}
            className="home-about-description"
            data-aos="fade-right"
            data-aos-duration="1200"
          >
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              A passionate and creative graphic designer with expertise in visual communication, focusing on branding and design strategies.
              <br />
              <br />
              Skilled in using design tools like
              <i>
                <b className="purple">
                  {" "}
                  Adobe Photoshop, Illustrator, Figma, and more..
                </b>
              </i>
              <br />
              <br />
              I specialize in creating stunning graphics for websites, apps, logos, and digital marketing materials. My expertise includes
              <i>
                <b className="purple"> Graphic Design, Branding, and Visual Identity </b>
              </i> as well as proficiency in UI/UX design tools and principles.
              <br />
              <br />
              With over two years of experience in graphic design and a strong background in creating visually appealing and functional designs, I am committed to delivering creative solutions that meet clients' needs and expectations.
            </p>
          </Col>
          <Col
            md={4}
            className="myAvtar"
            data-aos="fade-left"
            data-aos-duration="1200"
          >
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col
            md={12}
            className="home-about-social"
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://www.behance.net/tareksaad3"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillBehanceSquare />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.facebook.com/tarek.elgokar1/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillFacebook />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/tarek-saad-0964b2247/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/tareksaad_28/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.youtube.com/@Tarek__Saad"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <FaYoutube />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Home2;
