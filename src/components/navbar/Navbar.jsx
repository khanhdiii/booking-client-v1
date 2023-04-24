import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    // Xóa dữ liệu user trong localStorage
    localStorage.removeItem("user");
    // Set lại user trong AuthContext thành null
    setUser(null);
    // Navigate đến trang đăng nhập sau khi logout
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
              Have a good day <p>{user.username}</p>
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
            <button className="navButton" onClick={() => navigate("/signup")}>
              Register
            </button>
            <button className="navButton" onClick={() => navigate("/signin")}>
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
