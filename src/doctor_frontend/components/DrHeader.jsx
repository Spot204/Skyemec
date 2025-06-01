import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Skyemec.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faHospitalUser } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import "../styles/DrHeader.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <nav className="Header-navbar">
      <img
        className="Header-logo"
        src={logo}
        alt="logo"
        onClick={() => navigate("/doctor")}
      />
      <ul className="Header-navbar-list">
        <li className="Header-nav-item">
          <span onClick={() => navigate("/doctor/drschedule")}>
            <FontAwesomeIcon icon={faCalendarDays} /> Lịch trình
          </span>
        </li>
        <li className="Header-nav-item">
          <span onClick={() => navigate("/doctor/patientlist")}>
            <FontAwesomeIcon icon={faHospitalUser} /> Bệnh nhân
          </span>
        </li>
        <li className="Header-nav-item">
          <span onClick={() => navigate("/doctor/medicines")}>
            <FontAwesomeIcon icon={faSearch} /> Tra cứu thuốc
          </span>
        </li>
        <li className="Header-nav-item">
          <span onClick={() => navigate("         ")}>
            <FontAwesomeIcon icon={faRightFromBracket} /> Đăng xuất
          </span>
        </li>
      </ul>
    </nav>
  );
};
export default Header;
