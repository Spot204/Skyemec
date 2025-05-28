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

  // Render menu với dropdown bên dưới item
  const renderMenu = (title, items) => (
    <li
      className="Header-nav-item"
      onMouseEnter={() => handleMouseEnter(title)}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative" }} // Đảm bảo li là relative để dropdown position absolute hoạt động đúng
    >
      <span>{title}</span>
      <FontAwesomeIcon icon={faAngleDown} />
      {isOpen === title && (
        <div
          className="dropdown-container"
          style={{ position: "absolute", top: "100%", left: 0 }}
          ref={dropdownRef}
        >
          <div className="triangle"></div>
          <ul className="Header-dropdown-list">
            {items.map(({ label, page }) => (
              <li
                key={label}
                className="Header-dropdown-item"
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
    <nav className="Header-navbar">
      <img
        className="Header-logo"
        src={logo}
        alt="logo"
        onClick={() => setCurrentPage("admin_dashboard")}
      />
      <ul className="Header-navbar-list">
        {renderMenu("Quản lý tài khoản", [
          { label: "Danh sách người dùng", page: "user_list" },
          { label: "Xem / chỉnh sửa / khóa tài khoản", page: "edit_user" },
          { label: "Phân quyền (user, admin)", page: "permissions" },
        ])}
        {renderMenu("Quản lý lịch khám", [
          { label: "Quản lý lịch hẹn", page: "appointment_management" },
        ])}
        {renderMenu("Quản lý bác sĩ", [
          { label: "Thêm / sửa / xóa bác sĩ", page: "doctor_management" },
          { label: "Thêm / sửa / xóa chuyên khoa", page: "specialty_management" },
          { label: "Bộ lọc tìm kiếm", page: "doctor_filter" },
        ])}
        {renderMenu("Quản lý tin tức", [
          { label: "Tạo / sửa / xóa tin tức", page: "news_management" },
          { label: "Lên lịch đăng bài", page: "schedule_post" },
          { label: "Phân loại tin (ưu đãi / sự kiện)", page: "news_category" },
        ])}
        {renderMenu("Quản lý liên hệ", [
          { label: "Danh sách liên hệ từ người dùng", page: "contact_list" },
          { label: "Trả lời hoặc chuyển tiếp", page: "reply_contact" },
          { label: "Gửi thông báo cho khách hàng", page: "notify_customer" },
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
      <div className="Header-navbar-right">
        <div className="Header-login">
          <FontAwesomeIcon icon={faUser} />
          <span className="login">Đăng xuất</span>
        </div>
        <div className="Header-search">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
      </div>
    </nav>
  );
};

export default Header;
