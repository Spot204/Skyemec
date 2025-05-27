import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Skyemec.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUser,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(null);
  const navigate = useNavigate();

  const handleMouseEnter = (menu) => setIsOpen(menu);
  const handleMouseLeave = () => setIsOpen(null);

  return (
    <nav className="Header-navbar">
      <img
        className="Header-logo"
        src={logo}
        alt="logo"
        onClick={() => navigate("home")}
      />
      <ul className="Header-navbar-list">
        <li
          className="Header-nav-item"
          onMouseEnter={() => handleMouseEnter("Chuyên khoa")}
          onMouseLeave={handleMouseLeave}
        >
          <span>Chuyên khoa</span>
          <FontAwesomeIcon icon={faAngleDown} />
          {isOpen === "Chuyên khoa" && (
            <div className="dropdown-container">
              <div className="triangle"></div>
              <ul className="Header-dropdown-list">
                <li
                  className="Header-dropdown-item"
                  onClick={() => navigate("emergency")}
                >
                  Cấp cứu
                </li>
                <li className="Header-dropdown-item">Trung tâm Tim mạch</li>
                <li className="Header-dropdown-item">
                  Chấn thương chỉnh hình - Y học thể thao
                </li>
                <li className="Header-dropdown-item">Trung tâm Nhi</li>
                <li className="Header-dropdown-item">Trung tâm Ung bướu</li>
                <li className="Header-dropdown-item">Tiêu hóa - Gan mật</li>
                <li className="Header-dropdown-item">
                  Trung tâm Mắt Vinmec-Alina
                </li>
                <li className="Header-dropdown-item">
                  Trung tâm Thẩm mỹ Vinmec-View
                </li>
                <li className="Header-dropdown-item">Miễn dịch - Dị ứng</li>
                <li className="Header-dropdown-item">
                  Trung tâm Công nghệ cao
                </li>
                <li className="Header-dropdown-item">
                  Trung tâm sức khỏe phụ nữ
                </li>
                <li className="Header-dropdown-item">Sức khỏe tổng quát</li>
                <li className="Header-dropdown-item">
                  Viện nghiên cứu Tế bào gốc và Công nghệ Gen
                </li>
                <li className="Header-dropdown-item">Trung tâm Vacxin</li>
                <li className="Header-dropdown-item">
                  Trung tâm Y Học Cổ Truyền Skyemec - Sao Phương Đông
                </li>
              </ul>
            </div>
          )}
        </li>
        <li className="Header-nav-item">
          <span onClick={() => navigate("oder_doctor")}>Đặt lịch</span>
        </li>
        <li className="Header-nav-item">
          <span onClick={() => navigate("search_doctor")}>Tìm bác sĩ</span>
        </li>
        <li
          className="Header-nav-item"
          onMouseEnter={() => handleMouseEnter("Liên hệ")}
          onMouseLeave={handleMouseLeave}
        >
          <span>Liên hệ</span>
          <FontAwesomeIcon icon={faAngleDown} />
          {isOpen === "Liên hệ" && (
            <div className="dropdown-container">
              <div className="triangle"></div>
              <ul className="Header-dropdown-list" id="Header-dropmenu-contact">
                <li className="Header-dropdown-item">Đặt lịch khám</li>
                <li className="Header-dropdown-item">Tư vấn sức khỏe</li>
                <li className="Header-dropdown-item">Hỗ trợ kỹ thuật</li>
              </ul>
            </div>
          )}
        </li>
        <li
          className="Header-nav-item"
          id="Header-nav-item-about"
          onMouseEnter={() => handleMouseEnter("Về Skyemec")}
          onMouseLeave={handleMouseLeave}
        >
          <span>Về Skyemec</span>
          <FontAwesomeIcon icon={faAngleDown} />
          {isOpen === "Về Skyemec" && (
            <div className="dropdown-container">
              <div className="triangle"></div>
              <ul className="Header-dropdown-list" id="Header-dropmenu-about">
                <li className="Header-dropdown-item">Giới thiệu</li>
                <li className="Header-dropdown-item">Tin tức</li>
                <li className="Header-dropdown-item">Sự kiện</li>
                <li className="Header-dropdown-item">Tuyển dụng</li>
              </ul>
            </div>
          )}
        </li>
      </ul>
      <div className="Header-navbar-right">
        <div className="Header-login">
          <FontAwesomeIcon icon={faUser} />
          <span className="login" onClick={() => navigate("login")}>
            Đăng nhập
          </span>
        </div>
        <div className="Header-search">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
      </div>
    </nav>
  );
};
export default Header;
