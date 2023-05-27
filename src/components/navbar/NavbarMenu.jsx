import {
  faBars,
  faXmar,
  faUser,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import "./navbarmenu.css";

const NavbarMenu = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const navigate = useNavigate();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");

    navigate("/signin");
    window.location.reload();
  };

  return (
    <div className="navMenuWrapper">
      <>
        <Navbar expand="lg" className="nav">
          <div className="container">
            <Navbar.Brand>
              <div className="logo">
                <Link to="/">
                  <h2 className="titlePage">Booking</h2>
                </Link>
              </div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" bg="dark" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {user ? (
                  <>
                    <div to="/">
                      <div className="navUsername">
                        Have a good trip, <p> {user.username} </p>
                        <NavDropdown
                          title={
                            <FontAwesomeIcon
                              icon={faCircleUser}
                              color="white"
                              fontSize="23px"
                            />
                          }
                          id="navbarScrollingDropdown"
                          color="light"
                        >
                          <NavDropdown.Item
                            onClick={() => {
                              handleLogout();
                            }}
                          >
                            Logout
                          </NavDropdown.Item>
                        </NavDropdown>{" "}
                      </div>{" "}
                    </div>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar>
      </>
    </div>
  );
};

export default NavbarMenu;
