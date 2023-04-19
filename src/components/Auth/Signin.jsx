import { useContext, useState } from "react";
import "./signin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";

const SigninForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { user, loading, error, dispatch } = useContext(AuthContext);
  // const { data: ata, loading, error } = useFetch(`/auth/signin`);

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
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAIL", payload: err });
      console.log("Errr", err);
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

          <button className="btn_submit" type="submit" onClick={handleSignin}>
            Sign In
          </button>
          {error && (
            <span className="error">{error.response.data.message}</span>
          )}
          {/* <span>
        Not have account,{" "}
        <button onClick={() => navigate("/signup")}>create here</button>
      </span> */}
        </div>
      </form>
    </div>
  );
};

export default SigninForm;
