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
        onClick={() => navigate("/user/home")}
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
                  onClick={() => navigate("/user/emergency")}
                >
                  Cấp cứu
                </li>
                <li
                  className="Header-dropdown-item"
                  onClick={() => navigate("/user/emergency")}
                >
                  Trung tâm Tim mạch
                </li>
                <li
                  className="Header-dropdown-item"
                  onClick={() => navigate("/user/emergency")}
                >
                  Chấn thương chỉnh hình - Y học thể thao
                </li>
                <li
                  className="Header-dropdown-item"
                  onClick={() => navigate("/user/emergency")}
                >
                  Trung tâm Nhi
                </li>
                <li
                  className="Header-dropdown-item"
                  onClick={() => navigate("/user/emergency")}
                >
                  Trung tâm Ung bướu
                </li>
                <li
                  className="Header-dropdown-item"
                  onClick={() => navigate("/user/emergency")}
                >
                  Tiêu hóa - Gan mật
                </li>
                <li
                  className="Header-dropdown-item"
                  onClick={() => navigate("/user/emergency")}
                >
                  Trung tâm Mắt Vinmec-Alina
                </li>
                <li
                  className="Header-dropdown-item"
                  onClick={() => navigate("/user/emergency")}
                >
                  Trung tâm Thẩm mỹ Vinmec-View
                </li>
                <li
                  className="Header-dropdown-item"
                  onClick={() => navigate("/user/emergency")}
                >
                  Miễn dịch - Dị ứng
                </li>
                <li
                  className="Header-dropdown-item"
                  onClick={() => navigate("/user/emergency")}
                >
                  Trung tâm Công nghệ cao
                </li>
                <li
                  className="Header-dropdown-item"
                  onClick={() => navigate("/user/emergency")}
                >
                  Trung tâm sức khỏe phụ nữ
                </li>
                <li
                  className="Header-dropdown-item"
                  onClick={() => navigate("/user/emergency")}
                >
                  Sức khỏe tổng quát
                </li>
                <li
                  className="Header-dropdown-item"
                  onClick={() => navigate("/user/emergency")}
                >
                  Viện nghiên cứu Tế bào gốc và Công nghệ Gen
                </li>
                <li
                  className="Header-dropdown-item"
                  onClick={() => navigate("/user/emergency")}
                >
                  Trung tâm Vacxin
                </li>
                <li
                  className="Header-dropdown-item"
                  onClick={() => navigate("emergency")}
                >
                  Trung tâm Y Học Cổ Truyền Skyemec - Sao Phương Đông
                </li>
              </ul>
            </div>
          )}
        </li>
        <li className="Header-nav-item">
          <span onClick={() => navigate("/user/oder_doctor")}>Đặt lịch</span>
        </li>
        <li className="Header-nav-item">
          <span onClick={() => navigate("/user/search_doctor")}>Tìm bác sĩ</span>
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
                <li className="Header-dropdown-item"onClick={() => navigate("/user/oder_doctor")}>Đặt lịch khám</li>
                <li className="Header-dropdown-item"onClick={() => navigate("/user/customer_service")}>Chăm sóc khác hàng</li>
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
                <li className="Header-dropdown-item"onClick={() => navigate("/user/information")}>Giới thiệu</li>
                <li className="Header-dropdown-item"onClick={() => navigate("/user/news")}>Tin tức</li>
              </ul>
            </div>
          )}
        </li>
      </ul>
      <div className="Header-navbar-right">
        <div className="Header-login">
          <FontAwesomeIcon icon={faUser} />
          <span className="login" onClick={() => navigate("/login/login")}> 
            Đăng nhập
          </span>
        </div>
        {/* <div className="Header-search">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div> */}
      </div>
    </nav>
  );
};
export default Header;
