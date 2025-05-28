import "../styles/PatientProfile.css";
import patient1 from "../assets/empty-ava.jpg";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import topimage from "../assets/Docimage1.jpg";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const PatientProfile = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/patients")
      .then((res) => {
        console.log("DATA:", res.data);
        setPatients(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const patient = patients[0];

  if (!patient) return <div>Đang tải dữ liệu...</div>;

  return (
    // bổ sung onClick
    <div className="papro-cover">
      <div className="papro-top-text">
        <a>THÔNG TIN BỆNH NHÂN</a>
      </div>
      <img className="papro-top-image" src={topimage} alt="patient" />
      <span onClick={() => navigate("")} className="papro-navigator">
        Trang chủ <FontAwesomeIcon icon={faAngleRight} /> {"  "}
      </span>
      <span onClick={() => navigate("")} className="papro-navigator-2">
        Hồ sơ bệnh án <FontAwesomeIcon icon={faAngleRight} />
      </span>
      <span className="papro-navigator-3">
        {"  "}
        Bệnh nhân {patient.name}
      </span>
      <div className="main-papro-container">
        <div className="patient">
          <div className="papro-col1">
            <div className="papro-img">
              <img src={patient1} alt="Ảnh 1" />
            </div>
            <div className="papro-info">
              <h6>Bệnh nhân</h6>
              <h4>{patient.name}</h4>
              <button>Sửa thông tin</button>
            </div>
          </div>
          <div className="papro-general">
            <h5>Thông tin cơ bản</h5>
            <p>Số điện thoại: {patient.phone}</p>
            <p>Ngày sinh: {patient.birthDate}</p>
            <p>CMND/CCCD: {patient.idNumber}</p>
            <p>Giới tính: {patient.gender}</p>
            <p>Dân tộc: {patient.ethnicity}</p>
            <p>Địa chỉ thường trú: {patient.address}</p>
            <p>Số thẻ BHYT: {patient.insuranceNumber}</p>
            <p>
              Ngày khám:{" "}
              {new Date(patient.examinationDate).toLocaleDateString()}
            </p>
            <p>
              Nơi đăng kí khám chữa bệnh ban đầu: {patient.registeredHospital}
            </p>
            <p>Nghề nghiệp: {patient.job}</p>
          </div>
          <div className="line"></div>
          <h5>Thông tin người thân</h5>
          {patient.relatives &&
            patient.relatives.map((r, idx) => (
              <div key={idx}>
                <p>Họ tên: {r.name}</p>
                <p>Số điện thoại: {r.phone}</p>
                <p>Quan hệ với bệnh nhân: {r.relation}</p>
                <p>Địa chỉ thường trú: {r.address}</p>
              </div>
            ))}
        </div>

        <div className="papro-info">
          <h5>Tiền sử bệnh lý</h5>
          {patient.medicalHistory &&
            patient.medicalHistory.map((item, idx) => (
              <p key={idx}>• {item}</p>
            ))}
          <div className="line"></div>

          <h5>Lý do đến khám</h5>
          {patient.examinationReasons &&
            patient.examinationReasons.map((item, idx) => (
              <p key={idx}>• {item}</p>
            ))}
          <div className="line"></div>

          <h5>Liệu trình chữa trị</h5>
          {patient.treatmentPlan &&
            patient.treatmentPlan.map((item, idx) => <p key={idx}>• {item}</p>)}
          <div className="line"></div>

          <h5>Tình trạng hiện tại</h5>
          {patient.currentStatus &&
            patient.currentStatus.map((item, idx) => <p key={idx}>• {item}</p>)}
          <div className="line"></div>

          <h5>Xét nghiệm đã thực hiện</h5>
          {patient.tests &&
            patient.tests.map((item, idx) => <p key={idx}>• {item}</p>)}
          <div className="line"></div>

          <h5>Nhật ký theo dõi</h5>
          {patient.diary &&
            patient.diary.map((item, idx) => <p key={idx}>• {item}</p>)}
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
