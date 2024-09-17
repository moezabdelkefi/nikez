import "../Styles/login.css";
import { React, useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import auth from "../firebase";
import logo from "../assets/logo.png";
import ReCAPTCHA from "react-google-recaptcha";
import { useLocation } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const savedData = location.state && location.state.savedData;
  const [resetEmail, setResetEmail] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);

  const onChange = () => {
    console.log("changed");
    setCaptchaDone(true);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();

    if (!resetEmail) {
      // Displays an error message if the reset email is empty
      setError("Please enter your email.");
      return;
    }

    sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        console.log("Password reset email sent successfully.");
      })
      .catch((error) => {
        console.log("Error sending password reset email:", error.message);
      });
  };

  const navigateTomain = () => {
    window.location.href = "/Main";
  };

  const [captchaIsDone, setCaptchaDone] = useState(false); // State variable to track the captcha completion
  const [email, setEmail] = useState(""); // State variable to track the email
  const [password, setPassword] = useState(""); // State variable to track the password
  const [error, setError] = useState(""); // State variable to track the error message

  const submitLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("current user", user.uid); // Sets the "current user" in local storage
        if (savedData) {
          window.location.href = "/Design"; // Redirects to "/Design" if there is saved data
        } else {
          window.location.href = "/Main"; // Redirects to "/Main" if there is no saved data
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(error);
        if (errorMessage === "Firebase: Error (auth/wrong-password).") {
          setError("Wrong password"); // Displays an error message for wrong password
        } else if (errorMessage === "Firebase: Error (auth/user-not-found).") {
          setError("Verify your email");
        }
      });
  };

  return (
    <div className="login-page">
      <div>
        <div className="home-button-container">
          <button className="button" onClick={navigateTomain}>
            Home
          </button>
        </div>
        <div className="login-box">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className="content">
            <h2 className="title">Log In</h2>
            <form action="">
              <div className="user-box">
                <input
                  type="email"
                  placeholder="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error && <div className="alert">{error}</div>}
                <input
                  type="password"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {captchaIsDone && (
                  <button
                    className="button"
                    type="submit"
                    onClick={(e) => submitLogin(e)}
                  >
                    Enter
                  </button>
                )}
              </div>
            </form>
            <div>
              <ReCAPTCHA
                sitekey="6LfaSRgmAAAAALmDD1g8ej0pTjlsDkb6MX-kUKX9"
                onChange={onChange}
              />
              <div className="p">
                <button onClick={() => setShowResetForm(true)} className="a2">
                  Forgot Password?
                </button>
              </div>
              <div className="p">
                Don't have an account?{" "}
                <a href="/SignUp" className="a2">
                  Sign up!
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showResetForm && (
        <div className="reset-password-card">
          <h2>Reset Password</h2>
          <form>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
            </div>
            {error && <div>{error}</div>}
            <button
              type="submit"
              onClick={handleForgotPassword}
              className="but-reset"
            >
              Reset Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
