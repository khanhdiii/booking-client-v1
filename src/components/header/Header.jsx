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
  const currentUser = useSelector((state) => state.auth.currentUser); // Thay vì sử dụng state.auth.login.currentUser

  // ...

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
              {/* ... */}
              {currentUser ? (
                <p className="headerCurrentUser">
                  Welcome, {currentUser.username}!
                </p> // Hiển thị tên người dùng đã đăng nhập
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
