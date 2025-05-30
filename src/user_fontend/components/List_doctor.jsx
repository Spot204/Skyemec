import React, { useState } from "react";
import "../styles/List_doctor.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStethoscope } from "@fortawesome/free-solid-svg-icons";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons/faGraduationCap";
import { faHospital } from "@fortawesome/free-regular-svg-icons";
import { Navigate } from "react-router-dom";

const DoctorList = ({ doctors }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 10;

  // Chia danh sách bác sĩ theo từng trang
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  // Tính tổng số trang
  const totalPages = Math.ceil(doctors.length / doctorsPerPage);

  // Chuyển đến trang được chọn
  const goToPage = (page) => setCurrentPage(page);
  const navigate = Navigate()
  return (
    <div className="Form-list-doctor">
      <ul className="List-doctor">
        {currentDoctors.map((doctor, index) => (
          <li className="List-doctor-item" key={index}>
            <div className="List-doctor-item-left">
              <img src="" alt="" className="img-doctor" />
              <button className="btn-register-for-examination" onClick={()=>navigate("/user/oder_doctor")} >
                Đăng ký khám
              </button>
            </div>
            <div className="List-doctor-item-right">
              <p className="Doctor-name"onClick={() => navigate("/doctor/drprofile")}>{doctor.name}</p>
              <div className="Doctor-rank">
                <FontAwesomeIcon icon={faGraduationCap} />
                {doctor.rank}
              </div>
              <div className="Doctor-expertise">
                <FontAwesomeIcon icon={faStethoscope} />
                {doctor.specialty}
              </div>
              <div className="Doctor-location">
                <FontAwesomeIcon icon={faHospital} />
                {doctor.hospital}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="List-number">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            className={`btn-List-number $ {currentPage ===i+? "active":""}`}
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
