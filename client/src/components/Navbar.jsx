import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/userActions";
import "../css/navbar.css";
const Navbar = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const [visible, setVisible] = useState(false);
  const { user: userLoginInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
    setVisible(false);
  };

  return (
    <nav>
      <div className="container nav__container">
        <Link className="nav__brand" to="/">
          {
            [
              "sunday",
              "monday",
              "tuesday",
              "wednesday",
              "thursday",
              "friday",
              "saturday",
            ][new Date().getDay()]
          }
        </Link>
        <ul className="nav__menu">
          {userLoginInfo ? (
            <li className="nav-item">
              <button
                className="sub__nav-trigger"
                onClick={() => setVisible(!visible)}
              >
                {userLoginInfo.name}
                <i className="fas fa-chevron-down"></i>
              </button>
              <ul className={visible ? "sub__nav visible" : "sub__nav"}>
                <li className="sub__nav-item">
                  <Link className="sub__nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
                <li className="sub__nav-item">
                  <button className="sub__nav-link" onClick={logoutHandler}>
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          ) : (
            <li className="navItem">
              <Link className="nav-link" to="/login">
                Get Started
              </Link>
            </li>
          )}

          {/* <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Welcome {userRegisterInfo.name}
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={() => dispatch(logout())}>
                  logout
                </button>
              </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
