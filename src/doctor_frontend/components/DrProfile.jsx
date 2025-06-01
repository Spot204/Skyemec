import "../styles/DrProfile.css";
import dr1 from "../assets/dr-pho-hoang-dang-mich.PNG";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import topimage from "../assets/Docimage1.jpg";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const avatarMap = {
  dr1: dr1,
};

const DrProfile = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5050/api/doctors")
      .then((res) => setDoctor(res.data[0]))
      .catch((err) => console.error(err));
  }, []);

  if (!doctor) return <div>Đang tải dữ liệu...</div>;

  return (
    <div className="drprofile-cover">
      <div className="drprofile-top-text">
        <a>THÔNG TIN BÁC SĨ</a>
      </div>
      <img className="drprofile-top-img" src={topimage} alt="doctor" />
      <span
        onClick={() => navigate("/doctor/drhome")}
        className="drprofile-navigator"
      >
        Trang chủ <FontAwesomeIcon icon={faAngleRight} /> {"  "}
      </span>
      <span
        onClick={() => navigate("/search_doctor")}
        className="drprofile-navigator-2"
      >
        Tìm bác sĩ <FontAwesomeIcon icon={faAngleRight} />
      </span>
      <span className="drprofile-navigator-3">
        {"  "}
        {doctor.role} {doctor.name}
      </span>
      <div className="drpro-container">
        <div className="doctor">
          <div className="drpro-col1">
            <div className="drpro-img">
              <img src={avatarMap[doctor.avatar]} alt="Ảnh bác sĩ" />
            </div>
            <div className="dr-role">
              <h3>
                {doctor.degree}, {doctor.role}
              </h3>
              <h1>
                {doctor.role} {doctor.name}
              </h1>
              <button className="patient-signin">Đăng ký khám</button>
            </div>
          </div>
          <div className="drpro-general">
            <h2>Giới thiệu</h2>
            {doctor.introduction.map((item, idx) => (
              <p key={idx}>{item}</p>
            ))}
          </div>
        </div>

        <div className="dr-info">
          <h2>Chuyên môn</h2>
          {doctor.specialty.map((item, idx) => (
            <p key={idx}>{item}</p>
          ))}
          <div className="drprofile-line"></div>

          <h2>Nơi làm việc</h2>
          <p>{doctor.workplace}</p>
          <div className="drprofile-line"></div>

          <h2>Quá trình đào tạo</h2>
          {doctor.education.map((item, idx) => (
            <p key={idx}>{item}</p>
          ))}
          <div className="drprofile-line"></div>

          <h2>Kinh nghiệm làm việc</h2>
          {doctor.experience.map((item, idx) => (
            <p key={idx}>{item}</p>
          ))}
          <div className="drprofile-line"></div>

          <h2>Thành viên của các tổ chức</h2>
          {doctor.organizations.map((item, idx) => (
            <p key={idx}>{item}</p>
          ))}
          <div className="drprofile-line"></div>

          <h2>Sách, báo và công trình nghiên cứu</h2>
          {doctor.publications.map((item, idx) => (
            <p key={idx}>{item}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrProfile;
