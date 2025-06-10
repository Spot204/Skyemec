import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../user_fontend/assets/Skyemec.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import "../styles/Header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleMouseEnter = (menu) => {
    setIsOpen(menu);
  };

  const handleMouseLeave = () => {
    setIsOpen(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("doctorId");

    // Reload trang và điều hướng về login
    window.location.href = "/user/home";
  };

  const renderMenu = (title, items) => (
    <li
      className="ad-Header-nav-item"
      onMouseEnter={() => handleMouseEnter(title)}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative" }}
    >
      <span>{title}</span>
      <FontAwesomeIcon icon={faAngleDown} />
      {isOpen === title && (
        <div
          className="ad-dropdown-container"
          style={{ position: "absolute", top: "100%", left: 0 }}
          ref={dropdownRef}
        >
          <div className="ad-triangle"></div>
          <ul className="ad-Header-dropdown-list">
            {items.map(({ label, path }) => (
              <li
                key={label}
                className="ad-Header-dropdown-item"
                onClick={() => navigate(path)}
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );

  return (
    <nav className="ad-Header-navbar">
      <img
        className="ad-Header-logo"
        src={logo}
        alt="logo"
        onClick={() => navigate("/admin")}
        style={{ cursor: "pointer" }}
      />
      <ul className="ad-Header-navbar-list">
        {renderMenu("Quản lý tài khoản", [
          { label: "Danh sách người dùng", path: "/admin/users" },
        ])}
        {renderMenu("Quản lý lịch khám", [
          { label: "Quản lý lịch hẹn", path: "/admin/appointments" },
        ])}
        {renderMenu("Quản lý bác sĩ", [
          { label: "Thêm / sửa / xóa bác sĩ", path: "/admin/doctors" },
        ])}
        {renderMenu("Quản lý tin tức", [
          { label: "Tạo / sửa / xóa tin tức", path: "/admin/news" },
        ])}
        {renderMenu("Hóa đơn", [
          { label: "Quản lý hóa đơn", path: "/admin/invoices" },
          { label: "Tạo biên lai", path: "/admin/invoices/create" },
        ])}
        {renderMenu("Thống kê", [
          { label: "Lịch khám theo tuần/tháng", path: "/admin/start-appointment" },
        ])}
      </ul>
      <div className="ad-Header-navbar-right">
        <div className="ad-Header-login" style={{ cursor: "pointer" }}>
          <FontAwesomeIcon icon={faUser} />
          <span className="ad-login" onClick={handleLogout}>
            Đăng xuất
          </span>
        </div>
        <div className="ad-Header-search">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
      </div>
    </nav>
  );
};

export default Header;
