import React from "react";
import { Link } from "react-router-dom";
import "./SideNavMenu.css"; // optional CSS file for styling
import logo from "../images/NeutroGuard2.png";

function SideNavMenu() {

  function logout() {
    localStorage.removeItem("token");
  }
  return (
    <div className="sidenav">
      <div className="sidenav-header">
        <Link to="/user">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <ul className="sidenav-links">
        <li>
          <Link to="/user" replace>
            Home
          </Link>
        </li>
        <li>
          <Link to="/user/patients" replace>
            Patients
          </Link>
        </li>
        <li>
          <Link to="/user/exam" replace>
            Exam
          </Link>
        </li>
        <li>
          <Link to="/" onClick={logout} replace>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SideNavMenu;
