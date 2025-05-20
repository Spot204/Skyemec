import "../styles/Body_Search_doctor.css";
import image1 from "../assets/image1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import Oder_doctor from "./Oder_Doctor";
import Search_doctor from "./Search_doctor";
import { useState } from "react";

const Body_Search_doctor = ({ activeComponent, setCurrentPage }) => {
  const [topText, setTopText] = useState("DANH SÁCH BÁC SĨ - CHUYÊN GIA");
  return (
    <section className="Bodysd-container">
      <div className="Bodysd-top">
        <img className="Bodysd-top-image" src={image1} alt="doctor" />
        <div className="Bodysd-top-text"> {topText}</div>
        <div className="Bodysd-top-extension">
          <div className="Bodysd-top-exten-item" id="Phone">
            <FontAwesomeIcon className="icon" icon={faPhone} />
            <p className="Bodysd-top-exten-item-text">Gọi tổng đài</p>{" "}
          </div>
          <div
            className="Bodysd-top-exten-item"
            id="Calendar"
            onClick={() => setCurrentPage("oder_doctor")}
          >
            <FontAwesomeIcon className="icon" icon={faCalendar} />
            <p className="Bodysd-top-exten-item-text">Đặt lịch hẹn</p>
          </div>
          <div
            className="Bodysd-top-exten-item"
            id="Doctor"
            onClick={() => {
              setCurrentPage("search_doctor");
              setTopText("ĐẶT LỊCH KHÁM BỆNH");
            }}
          >
            <FontAwesomeIcon className="icon" icon={faUserDoctor} />
            <p className="Bodysd-top-exten-item-text">Tìm bác sĩ</p>
          </div>
        </div>
      </div>
      {activeComponent === "oder_doctor" && <Oder_doctor />}
      {activeComponent === "search_doctor" && <Search_doctor />}
    </section>
  );
};
export default Body_Search_doctor;
