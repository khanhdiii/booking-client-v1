import {
  faBed,
  faCalendarDays,
  faPerson,
  faPlane,
  faFaceSmile,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { destinationOptions } from "../../lib/destinationOptions";
import { newSearch } from "../../redux/searchSlice";
import "./header.css";
import NavbarMenu from "../navbar/NavbarMenu";

const Header = ({ type }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser);

  const HandleMoveSignin = (e) => {
    navigate(`/signin`);
  };

  return (
    <div className="headerContainerWrapper">
      <div className="header">
        <div
          className={
            type === "list" ? "headerContainer listMode" : "headerContainer"
          }
        >
          <div className="headerList">{/* ... */}</div>
          {type !== "list" && (
            <>
              {user ? (
                <p className="headerCurrentUser">Welcome, {user.username}!</p>
              ) : (
                <button className="headerBtn" onClick={HandleMoveSignin}>
                  Sign in / Register
                </button>
              )}
              {/* ... */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
