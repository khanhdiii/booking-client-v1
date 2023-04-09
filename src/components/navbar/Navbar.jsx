import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const isAuthRoute =
    path.indexOf("signin") > -1 || path.indexOf("signup") > -1;
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">
          <Link to="/">
            <h2 className="titlePage">Booking</h2>
          </Link>
        </span>
        {isAuthRoute && (
          <div className="navItems">
            <button className="navButton">Register</button>
            <button className="navButton">Login</button>
          </div>
        )}
        <button className="navButton" onClick={() => navigate("/signin")}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
