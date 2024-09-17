import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../firebase";

const ResetPassword = () => {
  const [email, setEmail] = useState(""); // State to hold the email input value
  const [successMessage, setSuccessMessage] = useState(""); // State to hold the success message
  const [errorMessage, setErrorMessage] = useState(""); // State to hold the error message

  const handleResetPassword = (e) => {
    e.preventDefault();

    // Displays an error message if the email field is empty
    if (!email) {
      setErrorMessage("Please enter your email.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      // Displays a success message if the password reset email is sent successfully
      .then(() => {
        setSuccessMessage("Password reset email sent successfully.");
      })
      // Displays an error message if there is an error sending the password reset email
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {errorMessage && <div>{errorMessage}</div>}
      {successMessage && <div>{successMessage}</div>}
      <button type="submit" onClick={handleResetPassword}>
        Reset Password
      </button>
    </div>
  );
};

export default ResetPassword;
