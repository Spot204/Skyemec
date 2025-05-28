import "../styles/Oder_doctor.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Dropdown1 from "./Dropdown1";
import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";

const Oder_doctor = () => {
  const options = ["dfasdf", "dafsdfasdf", "dafsdfasdf"];

  const [formData, setFormData] = useState({
    gender: "",
  });

  const handleGenderChange = useCallback((e) => {
    setFormData((prevState) => ({
      ...prevState,
      gender: e.target.value,
    }));
  }, []);

 const [users, setUsers] = useState([]);
    useEffect(() => {
      axios
        .get("http://localhost:3000/api/users") // Gọi API từ server Node.js
        .then((response) => setUsers(response.data)) // Lưu dữ liệu vào state
        .catch((error) => console.error("Lỗi khi lấy danh sách user:", error));
    }, []);

  return (
    <div className="Bodysd-middle">
      <div className="Bodysd-navigation">
        <span className="Bodysd-home">
          Trang chủ <FontAwesomeIcon icon={faAngleRight} />
        </span>
        <span className="Bodysd-search-doctor">Đặt phòng khám</span>
      </div>
      <div className="Bodysd-oder-doctor">
        <h2 className="Bodysd-oder-doctor-text">Nội dung đặt lịch hẹn</h2>
        <div className="Bodysd-oder">
          <div className="Bodysd-oder-left">
            <div className="Bodysd-oder-item">
              <label htmlFor="Oder-local" className="discription">
                Bệnh viện/ phòng khám Skyemec
              </label>
              <Dropdown1
                id="Oder-local"
                options={options}
                label="Chọn cơ sở khám"
              />
            </div>
            <div className="Bodysd-oder-item">
              <label htmlFor="Oder-specialty" className="discription">
                Chuyên khoa
              </label>
              <Dropdown1
                id="Oder-specialty"
                options={options}
                label="Chọn chuyên khoa"
              ></Dropdown1>
            </div>
            <div className="Bodysd-oder-item">
              <label htmlFor="" className="discription">
                Bác sĩ
              </label>
              <Dropdown1
                id="Oder-doctor"
                options={options}
                label="Chọn bác sĩ muốn khám"
              ></Dropdown1>
            </div>
          </div>
          <div className="discription">
            <label className="Bodysd-oder-date">Thời gian khám</label>
            <div className="Bodysd-oder-date">
              <div className="Bodysd-oder-boxdate">
                <h3 className="date-of-month"></h3>
                <label className="date-of-week">today</label>
              </div>
              <div className="Bodysd-oder-boxdate">
                <h3 className="date-of-month"></h3>
                <label className="date-of-week">tomorrow</label>
              </div>
              <div className="Bodysd-oder-boxdate">
                <h3 className="date-of-month"></h3>
                <label className="date-of-week">day after tomorrow</label>
              </div>
              <div className="Bodysd-oder-boxdate">
                <label className="date-of-week">ngày khác</label>
              </div>
            </div>
            <label className="Bodysd-oder-note">
              Lưu ý: Tổng đài viên Vinmec sẽ gọi lại cho quý khách để xác nhận
              thông tin thời gian dựa theo đăng ký và điều chỉnh nếu cần thiết.
            </label>
          </div>
        </div>
        <h2 className="Bodysd-oder-doctor-text">Thông tin khách hàng</h2>
        <div className="Bodysd-information-customer">
          <div className="Bodysd-information-left">
            <div className="Bodysd-information-name-sex">
              <p className="discription">Họ và tên </p>
              <div>
                <input
                  placeholder="Nhập họ và tên"
                  className="Bodysd-input-field"
                  id="Bodysd-input-name"
                  type="text"
                />
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Nam"
                    checked={formData.gender === "Nam"}
                    onChange={handleGenderChange}
                  />
                  Nam
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Nữ"
                    checked={formData.gender === "Nữ"}
                    onChange={handleGenderChange}
                  />
                  Nữ
                </label>
              </div>
            </div>
            <p className="discription"> Số điện thoại</p>
            <input
              className="Bodysd-input-field"
              placeholder="Nhập số điện thoại"
              type="text"
            />

            <p className="Bodysd-information-item-note">
              *Lưu ý: Hệ thống chỉ gửi SMS được cho Thuê bao nội địa, nếu quý
              khách sử dụng thuê bao quốc tế, vui lòng bổ sung email chính xác
              để nhận mã xác nhận và thông tin xác nhận đặt lịch.
            </p>
          </div>
          <div className="Bodysd-information-right">
            <p className="discription">Ngày tháng năm sinh </p>
            <input
              className="Bodysd-input-field"
              placeholder="Nhập ngày tháng năm sinh"
              type="date"
            />
            <p></p>
            <p className="discription">Email </p>
            <input
              className="Bodysd-input-field"
              placeholder="Nhập email"
              type="text"
            />
          </div>
        </div>
        <div className="Bodysd-reason">
          <p className="discription">Lý do khám/ nguyên nhân</p>
          <textarea
            type="note"
            className="Bodysd-inp-reason"
            placeholder="Nguyên nhân"
          />
          <br />
          <input type="checkbox" className="Bodysd-inp-agree" /> Tôi đã đọc và
          đồng ý với Chính sách bảo vệ dữ liệu cá nhân của Vinmec và chấp thuận
          để Vinmec xử lý dữ liệu cá nhân của tôi theo quy định của pháp luật về
          bảo vệ dữ liệu cá nhân.
          <br />
        </div>
        <button className="btn-supmit">Gửi thông tin</button>
      </div>
    </div>
  );
};

export default Oder_doctor;
