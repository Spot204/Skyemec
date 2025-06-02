import logo from "../../../user_fontend/assets/Skyemec.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";
import "../styles/Header.css";
import React from "react";

const Header = ({ setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(null);
  const dropdownRef = useRef(null);

  const handleMouseEnter = (menu) => {
    setIsOpen(menu);
  };

  const handleMouseLeave = () => {
    setIsOpen(null);
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
            {items.map(({ label, page }) => (
              <li
                key={label}
                className="ad-Header-dropdown-item"
                onClick={() => setCurrentPage(page)}
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
        onClick={() => setCurrentPage("admin_dashboard")}
      />
      <ul className="ad-Header-navbar-list">
        {renderMenu("Quản lý tài khoản", [
          { label: "Danh sách người dùng", page: "user_list" },
        ])}
        {renderMenu("Quản lý lịch khám", [
          { label: "Quản lý lịch hẹn", page: "appointment_management" },
        ])}
        {renderMenu("Quản lý bác sĩ", [
          { label: "Thêm / sửa / xóa bác sĩ", page: "doctor_management" },
        ])}
        {renderMenu("Quản lý tin tức", [
          { label: "Tạo / sửa / xóa tin tức", page: "news_management" },
          { label: "Lên lịch đăng bài", page: "schedule_post" },
          { label: "Phân loại tin (ưu đãi / sự kiện)", page: "news_category" },
        ])}
        {renderMenu("Hóa đơn", [
          { label: "Tạo biên lai tự động", page: "auto_receipt" },
          { label: "Gửi hóa đơn qua email", page: "send_invoice" },
          { label: "Tải về dạng PDF", page: "download_pdf" },
        ])}
        {renderMenu("Thống kê", [
          { label: "Lịch khám theo tuần/tháng", page: "schedule_stats" },
          { label: "Số lượt đặt khám, lượt xem bác sĩ", page: "appointment_stats" },
          { label: "Doanh thu và lượt sử dụng ưu đãi", page: "revenue_stats" },
        ])}
      </ul>
      <div className="ad-Header-navbar-right">
        <div className="ad-Header-login">
          <FontAwesomeIcon icon={faUser} />
          <span className="ad-login"onClick={()=>setCurrentPage("logout")}>Đăng xuất</span>
        </div>
        <div className="ad-Header-search">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
      </div>
    </nav>
  );
};

export default Header;
