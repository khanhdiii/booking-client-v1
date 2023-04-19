import { useState } from "react";
import React from "react";
import "./signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmnedPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("auth/signup", {
        email,
        username,
        password,
      });
      if (res) {
        alert("Created Account");
        navigate("/signin");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <section className="signup-form-container">
      <h2 className="form-title">Create an Account</h2>
      <form className="signup-form">
        <div className="form-group">
          <label htmlFor="name">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmedpassword">Confirm Password</label>
          <input
            type="password"
            id="confirmedpassword"
            name="confirmedpassword"
            value={confirmedPassword}
            onChange={(e) => setConfirmnedPassword(e.target.value)}
            placeholder="Confirm your password"
          />
        </div>

        <button type="submit" className="submit-btn" onClick={handleSubmit}>
          Create Account
        </button>
      </form>
    </section>
  );
};

export default SignupForm;
