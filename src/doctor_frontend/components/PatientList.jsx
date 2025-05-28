import "../styles/PatientList.css";
import patient1 from "../assets/empty-ava.jpg";
import patient2 from "../assets/empty-ava-1.jpg";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import topimage from "../assets/Docimage1.jpg";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const PatientList = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/patients")
      .then((res) => setPatients(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="palist-cover">
      <div className="palist-top-text">
        <a>DANH SÁCH BỆNH NHÂN</a>
      </div>
      <img className="palist-top-img" src={topimage} alt="topimage" />
      <span onClick={() => navigate("")} className="palist-navigator">
        Trang chủ <FontAwesomeIcon icon={faAngleRight} /> {"  "}
      </span>
      <span className="palist-navigator-2">
        {"  "}
        Danh sách bệnh nhân
      </span>
      <div className="palist-container">
        <span>
          <input
            className="palist-search-bar"
            type="text"
            placeholder="Tìm bệnh nhân..."
          />
          <button className="delete-selected-profiles">Xóa hồ sơ</button>
        </span>
        <div className="patient-main-list">
          <div className="palist-grid">
            {patients.map((patient) => (
              <div
                className="palist-card"
                key={patient._id}
                onClick={() => navigate(`/patients/${patient._id}`)}
              >
                <img
                  src={patient.gender === "Nữ" ? patient2 : patient1}
                  alt="avatar"
                  className="palist-avatar"
                />{" "}
                <div className="palist-info">
                  <h4>{patient.name}</h4>
                  <p>Ngày sinh: {patient.birthDate}</p>
                  <p>Giới tính: {patient.gender}</p>
                  <p>SĐT: {patient.phone}</p>
                  {/* Thêm các thông tin khác nếu muốn */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientList;
