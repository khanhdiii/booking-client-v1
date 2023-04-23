import { useContext, useState } from "react";
import "./signin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";

const SigninForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN" });
    try {
      const res = await axios.post(
        "https://bookingapiv1.onrender.com/api/auth/signin",
        {
          username,
          password,
        }
      );
      //Save data user in localStorage
      localStorage.setItem("user", JSON.stringify(res.data));
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
      window.location.reload();
    } catch (err) {
      dispatch({ type: "LOGIN_FAIL", payload: err });
    }
  };

  return (
    <div className="signin-form-container">
      <h1 className="form-title">Login Form</h1>
      <form className="signin-form">
        <div className="form-group">
          <label className="label_username" htmlFor="username">
            Username
          </label>
          <input
            className="input_username"
            type="text"
            id="username"
            placeholder="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password" className="label_password">
            Password
          </label>
          <input
            className="input_password"
            type="password"
            id="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            disabled={loading}
            className="btn_submit"
            type="submit"
            onClick={handleSignin}
          >
            Sign In
          </button>

          <span>
            Not have account,{" "}
            <button onClick={() => navigate("/signup")}>create here</button>
          </span>

          {error && (
            <span className="error">{error.response.data.message}</span>
          )}
        </div>
      </form>
    </div>
  );
};

export default SigninForm;
