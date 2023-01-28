import React, { useEffect, useState } from "react";
import { useAuth } from "../../lib/AuthContext";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    setMessage("");
    setError("");
    e.preventDefault();
    forgotPassword(email)
      .then(() => {
        setMessage("Check your email for a reset link");
        setEmail("");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <div>{message}</div>}
      {error && <div>{error}</div>}
      <p>
        <Link to="/login">Back to login</Link>
      </p>
    </div>
  );
};