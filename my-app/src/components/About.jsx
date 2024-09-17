import React from "react";
import "../Styles/About.css";
import NavBar from "./NavBar";
import moez from "../assets/moez.png";
import yahya from "../assets/yahya.png";

const About = () => {
  return (
    <div>
      <NavBar />
      <div className="tite">
        <p>About Nikez Store</p>
      </div>
      <p>
        Welcome to Nikez Store, your ultimate destination for customizing your
        own Nike Air Force shoes. We are passionate about providing you with a
        one-of-a-kind shopping experience and empowering you to express your
        personal style.
      </p>
      <p>
        At Nikez Store, we understand that every individual is unique, and we
        believe your shoes should reflect your personality. That's why we offer
        a wide range of customization options for Nike Air Force shoes. With our
        easy-to-use design tool, you can choose from various colors, patterns,
        materials, and even add personalized text or graphics to make your shoes
        truly yours.
      </p>
      <p>
        Customer satisfaction is our top priority. We are committed to
        delivering exceptional products and providing excellent customer
        service. If you have any questions or need assistance with your custom
        order, our friendly and knowledgeable team is always here to help.
      </p>
      <p>
        Thank you for choosing Nikez Store. Get ready to step up your sneaker
        game and create your own unique style with our custom Nike Air Force
        shoes. Start designing today and make a statement with every step!
      </p>
      <div className="tite">
        <p>Our Team</p>
      </div>
      <div className="team-member">
        <h3>Yahya shouk</h3>
        <p>Backend Developer</p>
        <p>Mail: ychouk102@gmail.com</p>
        <p>PhoneNumber: +216 95 672 214</p>
        <img src={yahya} alt="yahya" />
      </div>
      <div className="team-members">
        <h3>Moez abdelkefi</h3>
        <p>Frontend Developer </p>
        <p>Mail: moezabdelkefi17@gmail.com</p>
        <p>PhoneNumber: +216 56 890 250</p>
        <img src={moez} alt="moez" />
      </div>
    </div>
  );
};

export default About;
