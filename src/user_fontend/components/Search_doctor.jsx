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
import { useNavigate } from "react-router-dom";

const Search_doctor = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedExpertise, setSelectedExpertise] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [selectedJob, setSelectedJob] = useState([]);
  const [selectedRank, setSelectedRank] = useState([]);
  const [selectedDegree, setSelectedDegree] = useState([]);
  const [selectedRate, setSelectedRate] = useState([]);

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
          <span className="Bodysd-home" onClick={() => navigate("/user/home")}>
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
                "Skyemec Hà Đông",
                "Skyemec Thanh Xuân",
                "Skyemec Cầu Giấy",
                "Skyemec Tuyên Quang",
                "Skyemec Tuyên Quang",
                "Skyemec Bắc Ninh",
              ]}
              onChange={setSelectedLocation}
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
              onChange={setSelectedExpertise}
            />
          </div>
          <div className="Bodysd-filter-item" id="icon-language">
            <FontAwesomeIcon icon={faGlobe} className="Bodysd-filter-icon" />
            <Dropdown
              label="Ngôn ngữ"
              options={["Tiếng Việt", "Tiếng Anh"]}
              onChange={setSelectedLanguage}
            />
          </div>
          <div className="Bodysd-filter-item" id="icon-job">
            <FontAwesomeIcon
              icon={faBriefcaseMedical}
              className="Bodysd-filter-icon"
            />
            <Dropdown
              label="Nghề nghiệp"
              options={["Bác sĩ", "Chuyên gia"]}
              onChange={setSelectedJob}
            />
          </div>
          <div className="Bodysd-filter-item" id="icon-rank">
            <FontAwesomeIcon
              icon={faGraduationCap}
              className="Bodysd-filter-icon"
            />
            <Dropdown
              label="Học hàm"
              options={["Giáo sư", "Phó Giáo sư"]}
              onChange={setSelectedRank}
            />
          </div>
          <div className="Bodysd-filter-item" id="icon-degree">
            <FontAwesomeIcon
              icon={faGraduationCap}
              className="Bodysd-filter-icon"
            />
            <Dropdown
              label="Học vị"
              options={["Tiến sĩ", "Thạc sĩ", "Cử nhân"]}
              onChange={setSelectedDegree}
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
              onChange={setSelectedRate}
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
            <button
              id="bun-search"
              onClick={() => {
                // Xử lý lọc hoặc gửi dữ liệu tìm kiếm ở đây
                console.log({
                  selectedLocation,
                  selectedExpertise,
                  selectedLanguage,
                  selectedJob,
                  selectedRank,
                  selectedDegree,
                  selectedRate,
                  searchValue,
                });
              }}
            >
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>
      <div className="Bodysd-bottom">
        <label id="Bodysd-header">Danh sách Bác sĩ - Chuyên gia</label>
        <DoctorList doctors={doctors} />
      </div>
    </div>
  );
};

export default Search_doctor;
