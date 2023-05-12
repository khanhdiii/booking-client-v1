import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");

    // Navigate to signin
    navigate("/signin");
    window.location.reload();
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">
          <Link to="/">
            <h2 className="titlePage">Booking</h2>
          </Link>
        </span>
        {user ? (
          <div className="navItems">
            <span className="navUsername">
              Hi, <p> {user.username} </p>
            </span>

            <button
              className="navButton"
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="navItems">
            <button
              className="navButton"
              onClick={() => navigate("/signup")}
            >
              Register
            </button>
            <button
              className="navButton"
              onClick={() => navigate("/signin")}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
