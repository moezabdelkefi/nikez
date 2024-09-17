import React from "react";
import videoSrc from "../assets/Screen Recording - June 22, 2023.mp4";
import "../Styles/LandingPage.css";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const Landing = () => {
  const home = () => {
    window.location.href = "/Main";
  };

  return (
    <div className="body">
      <NavBar />
      <div className="landing-page">
        <div className="left-section">
          <img src="/Landing.png" alt="Shoe-Image" />
        </div>
        <div className="right-section">
          <div className="cont">
            <h1>Nikez</h1>
            <p>
              Step into the world of personalized style with our interactive 3D
              custom Nike shoes design, create, and own your perfect pair.
            </p>
          </div>
          <div className="cont">
            <h2>Interactive 3D Shoe Model</h2>
            <p>
              Experience our innovative interactive 3D shoe model that allows
              you to explore and visualize Nike shoes from every angle. Rotate,
              and interact with a lifelike 3D representation of the shoes,
              giving you a realistic preview of your customized design
            </p>
          </div>
          <div className="container-button">
            <div className="hover bt-1"></div>
            <div className="hover bt-2"></div>
            <div className="hover bt-3"></div>
            <div className="hover bt-4"></div>
            <div className="hover bt-5"></div>
            <div className="hover bt-6"></div>
            <button className="buttons" onClick={home}></button>
          </div>
        </div>
      </div>
      <div className="about-section">
        <div>
          <div className="text">
            <h2>About</h2>
            <p>
              The Nikez Store project was born out of our shared love for
              sneakers and the desire to create a platform that empowers
              individuals to express their unique style. As a team, we believe
              that footwear is not just a necessity, but a form of
              self-expression and personal identity.
            </p>
            <p>
              Our journey began several months ago when we came together with a
              shared vision. We embarked on this project, investing countless
              hours into research, design, and development to bring the Nikez
              Store to life. We were inspired by the potential to revolutionize
              the way people customize and experience Nike shoes.
            </p>
            <p>
              This project is a testament to our passion for innovation and our
              commitment to providing users with a seamless and engaging
              experience. It is our way of contributing to the vibrant sneaker
              community and empowering individuals to define their style.
            </p>
            <p>
              The Nikez Store project is a Portfolio Project for Holberton
              School, and it represents the culmination of our hard work and
              dedication. You can find the project repository on GitHub:
              <a href="https://github.com/your-github-repo-link">
                GitHub Repository
              </a>
            </p>
            <p>
              Connect with our team members on LinkedIn, GitHub, and Twitter:
            </p>
          </div>
        </div>
        <ul>
          <li>
            <p>Moez Abdelkefi</p>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/abdelkefi-moez-b794b9252/">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="https://github.com/moezabdelkefi">GitHub</a>
          </li>
          <li>
            <a href="https://twitter.com/moez_abdelkefi">Twitter</a>
          </li>
        </ul>
        <ul>
          <li>
            <p>Yahya chouk</p>
          </li>

          <li>
            <a href="https://www.linkedin.com/in/abdelkefi-moez-b794b9252/">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="https://github.com/s4iTen">GitHub</a>
          </li>
          <li>
            <a href="https://twitter.com/moez_abdelkefi">Twitter</a>
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
