import "../styles/Body_Search_doctor.css";
import image1 from "../assets/Docimage1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faCalendar,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import Oder_doctor from "./Oder_doctor";
import Search_doctor from "./Search_doctor";
import { useState } from "react";
import Department from "./Department";
import { useNavigate } from "react-router-dom";

const Body_Search_doctor = ({ topText, setTopText }) => {
  const navigate = useNavigate();

  return (
    <section className="Bodysd-container">
      <div className="Bodysd-top">
        <img className="Bodysd-top-image" src={image1} alt="doctor" />
        <div className="Bodysd-top-text">{topText}</div>
        <div className="Bodysd-top-extension">
          <div className="Bodysd-top-exten-item" id="Phone">
            <FontAwesomeIcon className="icon" icon={faPhone} />
            <p className="Bodysd-top-exten-item-text">Gọi tổng đài</p>
          </div>
          <div
            className="Bodysd-top-exten-item"
            id="Calendar"
            onClick={() => {
              navigate("/user/oder_doctor");
              setTopText("ĐẶT LỊCH KHÁM BỆNH");
            }}
          >
            <FontAwesomeIcon className="icon" icon={faCalendar} />
            <p className="Bodysd-top-exten-item-text">Đặt lịch hẹn</p>
          </div>
          <div
            className="Bodysd-top-exten-item"
            id="Doctor"
            onClick={() => {
              setTopText("DANH SÁCH BÁC SĨ - CHUYÊN GIA");
              navigate("/user/search_doctor");
            }}
          >
            <FontAwesomeIcon className="icon" icon={faUserDoctor} />
            <p className="Bodysd-top-exten-item-text">Tìm bác sĩ</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Body_Search_doctor;
