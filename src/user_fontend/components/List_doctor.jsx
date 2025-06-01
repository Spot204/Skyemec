import React, { useState } from "react";
import "../styles/List_doctor.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStethoscope } from "@fortawesome/free-solid-svg-icons";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons/faGraduationCap";
import { faHospital } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";


const DoctorList = ({ doctors }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 14;

  // Đảm bảo doctors luôn là mảng
  const safeDoctors = Array.isArray(doctors) ? doctors : [];

  // Chia danh sách bác sĩ theo từng trang
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = safeDoctors.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );

  // Tính tổng số trang
  const totalPages = Math.ceil(safeDoctors.length / doctorsPerPage);

  // Chuyển đến trang được chọn
  const goToPage = (page) => setCurrentPage(page);
  const navigate = useNavigate();
  return (
    <div className="Form-list-doctor">
      <ul className="List-doctor">
        {currentDoctors.map((doctor, index) => (
          <li className="List-doctor-item" key={index}>
            <div className="List-doctor-item-left">
              {/* Hiển thị ảnh đúng từ assets nếu avatar là tên file, hoặc fallback ảnh mặc định */}
              <img src={`/assets/${doctor.avatar}`} alt={doctor.avatar} className="img-doctor" />
              <button
                className="btn-register-for-examination"
                onClick={() => navigate("/user/oder_doctor")}
              >
                Đăng ký khám
              </button>
            </div>
            <div className="List-doctor-item-right">
              <p
                className="Doctor-name"
                onClick={() => navigate(`/user/drprofile/${doctor._id}`)}
              >
                {doctor.name}
              </p>
              <div className="Doctor-rank">
                <FontAwesomeIcon className="Doctor-icon" icon={faGraduationCap} />
                {doctor.degree}
              </div>
              <div className="Doctor-expertise">
                <FontAwesomeIcon className="Doctor-icon" icon={faStethoscope} />
                {doctor.role}
              </div>
              <div className="Doctor-location">
                <FontAwesomeIcon className="Doctor-icon" icon={faHospital} />
                {doctor.workplace}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="List-number">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            className={`btn-List-number ${
              currentPage === i + 1 ? "active" : ""
            }`}
            key={i}
            onClick={() => goToPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
