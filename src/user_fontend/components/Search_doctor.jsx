import React, { useState } from "react";
import "../styles/Body_Search_doctor.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faGlobe,
  faStethoscope,
  faBriefcaseMedical,
  faStar,
  faGraduationCap,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import DoctorList from "./List_doctor";
import Dropdown from "./Dropdown";

const Search_doctor = () => {
  const [searchValue, setSearchValue] = useState("");

  const doctors = [];

  const handleFocus = () => setSearchValue("");
  const handleBlur = (e) => {
    if (!e.target.value) {
      setSearchValue("Nhập tên bác sĩ/chuyên gia...");
    }
  };

  return (
    <div>
      <div className="Bodysd-middle">
        <div className="Bodysd-navigation">
          <span className="Bodysd-home">
            Trang chủ <FontAwesomeIcon icon={faAngleRight} />
          </span>
          <span className="Bodysd-search-doctor">Chuyên gia y tế</span>
        </div>
        <div className="Bodysd-filter">
          <div className="Bodysd-filter-item" id="icon-local">
            <FontAwesomeIcon
              icon={faLocationDot}
              className="Bodysd-filter-icon"
            />
            <Dropdown
              label="Lựa chọn cơ sở"
              options={[
                "Vinmec Hạ Long",
                "Vinmec Smart City",
                "Vinmec Central Park",
                "Vinmec Phú Quốc",
                "Vinmec Đà Nẵng",
                "Vinmec Nha Trang",
              ]}
            />
          </div>
          <div className="Bodysd-filter-item" id="icon-expertise">
            <FontAwesomeIcon
              icon={faStethoscope}
              className="Bodysd-filter-icon"
            />
            <Dropdown
              label="Yêu cầu chuyên môn"
              options={[
                "Nội tiết",
                "Tim mạch",
                "Nhi",
                "Ngoại chấn thương chỉnh hình",
                "Gây mê - điều trị đau",
                "Nội tổng quát",
                "Thần kinh",
                "Mắt",
                "Tai-Mũi-Họng",
                "Da liễu",
              ]}
            />
          </div>
          <div className="Bodysd-filter-item" id="icon-language">
            <FontAwesomeIcon icon={faGlobe} className="Bodysd-filter-icon" />
            <Dropdown label="Ngôn ngữ" options={["Tiếng Việt", "Tiếng Anh"]} />
          </div>
          <div className="Bodysd-filter-item" id="icon-job">
            <FontAwesomeIcon
              icon={faBriefcaseMedical}
              className="Bodysd-filter-icon"
            />
            <Dropdown label="Nghề nghiệp" options={["Bác sĩ", "Chuyên gia"]} />
          </div>
          <div className="Bodysd-filter-item" id="icon-rank">
            <FontAwesomeIcon
              icon={faGraduationCap}
              className="Bodysd-filter-icon"
            />
            <Dropdown label="Học hàm" options={["Giáo sư", "Phó Giáo sư"]} />
          </div>
          <div className="Bodysd-filter-item" id="icon-degree">
            <FontAwesomeIcon
              icon={faGraduationCap}
              className="Bodysd-filter-icon"
            />
            <Dropdown
              label="Học vị"
              options={["Tiến sĩ", "Thạc sĩ", "Cử nhân"]}
            />
          </div>
          <div className="Bodysd-filter-item" id="icon-rate">
            <FontAwesomeIcon
              icon={faStar}
              className="Bodysd-filter-icon"
              id="star"
            />
            <Dropdown
              label="Số điểm đánh giá"
              options={["5", "4", "3", "2", "1"]}
            />
          </div>
          <div className="Bodysd-filter-item" id="icon-search">
            <FontAwesomeIcon
              icon={faStethoscope}
              className="Bodysd-filter-icon"
            />
            <input
              type="search"
              id="box-search"
              placeholder="Nhập tên bác sĩ/chuyên gia..."
              value={searchValue}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button id="bun-search">Tìm kiếm</button>
          </div>
        </div>
      </div>
      <p id="Bodysd-header">Danh sách Bác sĩ - Chuyên gia</p>
      <div className="Bodysd-bottom">
        <DoctorList doctors={doctors} />
      </div>
    </div>
  );
};

export default Search_doctor;
