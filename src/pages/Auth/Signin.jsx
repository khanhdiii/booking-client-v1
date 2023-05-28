import { useContext, useState } from "react";
import "./signin.css";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import NavbarMenu from "../../components/navbar/NavbarMenu";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";

const SigninForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignin = async (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
    };

    loginUser(newUser, dispatch, navigate);
  };

  return (
    <>
      <NavbarMenu />
      <div className="signin-form-container">
        <form className="signin-form" onSubmit={handleSignin}>
          <h1 className="form-title">Login user</h1>
          <div className="form-group">
            <label className="label" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            {/* {usernameError && (
            <span className="error-message">{usernameError}</span>
          )} */}

            <label htmlFor="password" className="label">
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

            <span>
              Not have account,
              <button
                className="btn_create"
                onClick={() => navigate("/signup")}
              >
                create here
              </button>
            </span>

            {/* {error && (
            <span className="error">
              {error.response.data.message}
            </span>
          )} */}
          </div>
        </form>
      </div>
      <MailList />
    </>
  );
};

export default SigninForm;
