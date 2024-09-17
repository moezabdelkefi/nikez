import { React, useState } from "react";
import auth from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import logo from "../assets/logo.png";
import ReCAPTCHA from "react-google-recaptcha";
import "../Styles/signup.css";

const SignUp = () => {
  const onChange = () => {
    console.log("changed");
    setCaptchaDone(true);
  };

  const navigateToLogin = () => {
    window.location.href = "/Login";
  };

  const navigateToMain = () => {
    window.location.href = "/";
  };

  const [captchaIsDone, setCaptchaDone] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const signUp = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter your redentials");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userId = user.uid;
      localStorage.setItem("current user", userId);

      await updateProfile(auth.currentUser, {
        displayName: lastName + " " + firstName,
        email: email,
      });

      window.location.href = "/";
    } catch (error) {
      const errorMessage = error.message;
      setError("Failed to create an account. Please try again.");
      console.log(errorMessage);
    }
  };
  return (
    <div className="loginn-page">
      <div>
        <div className="home-button-container">
          <button className="button b1" onClick={navigateToMain}>
            Home
          </button>
        </div>
        <div className="loginn-box">
          <div className="logo">
            <img src={logo} />
            <div className="content">
              <h2 className="title">Sign Up</h2>
              {error && <div className="alert">{error}</div>}
              <div className="user-box">
                <form action="">
                  <input
                    type="text"
                    placeholder="first name"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="last name"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="confirm password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {captchaIsDone && (
                    <button className="button" type="submit" onClick={signUp}>
                      Join Now
                    </button>
                  )}
                </form>
                <div>
                  <ReCAPTCHA
                    sitekey="6LfaSRgmAAAAALmDD1g8ej0pTjlsDkb6MX-kUKX9"
                    onChange={onChange}
                  />
                  <div className="p">
                    If you have an account?{" "}
                    <a href="/login" className="a2">
                      Login!
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
