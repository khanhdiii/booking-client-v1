import { useState } from "react";
import "./signin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SigninForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("auth/signin", {
        username,
        password,
      });
      if (res) {
        alert("Login successfully");
        navigate("/");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login Form</h1>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Sign In</button>
      <span>
        Not have account,{" "}
        <button onClick={() => navigate("/signup")}>create here</button>
      </span>
    </form>
  );
};

export default SigninForm;
