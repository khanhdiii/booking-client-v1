import { useContext, useState } from "react";
import "./signin.css";
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
import { loginUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";

const SigninForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignin = async (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
    };
    const handleSignin = async (e) => {
      e.preventDefault();
      const newUser = {
        username: username,
        password: password,
      };

      try {
        const response = await loginUser(newUser, dispatch, navigate);
        if (response && response.success) {
          localStorage.setItem("user", JSON.stringify(response.user));
          checkLoggedIn();
        }
      } catch (error) {
        console.log(error);
        // Xử lý lỗi nếu cần thiết
      }
    };
  };

  const checkLoggedIn = () => {
    const user = localStorage.getItem("user");
    if (user) {
      // Đã đăng nhập
      navigate("/");
    }
  };

  return (
    <div className="signin-form-container">
      <h1 className="form-title">Login Form</h1>
      <form className="signin-form" onSubmit={handleSignin}>
        <div className="form-group">
          <label className="label_username" htmlFor="username">
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

          <span>
            Not have account,{" "}
            <button className="btn_create" onClick={() => navigate("/signup")}>
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
  );
};

export default SigninForm;
