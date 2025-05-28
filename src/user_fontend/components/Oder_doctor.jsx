import "../styles/Oder_doctor.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Dropdown1 from "./Dropdown1";
import { useState, useCallback, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createAppointment } from "../services/Oder_doctor";

const Oder_doctor = () => {
  // Hàm xử lý gửi form đặt lịch
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      hospital: selectedHospital,
      department: selectedDepartment,
      date: selectedDate ? selectedDate.toISOString().split("T")[0] : "",
      slot: selectedSlot,
      gender: formData.gender,
      name: document.getElementById("Bodysd-input-name")?.value || "",
      phone: document.querySelector('input[placeholder="Nhập số điện thoại"]')?.value || "",
      birthday: document.querySelector('input[placeholder="Nhập ngày tháng năm sinh"]')?.value || "",
      email: document.querySelector('input[placeholder="Nhập email"]')?.value || "",
      reason: document.querySelector(".Bodysd-inp-reason")?.value || "",
    };
    try {
      await createAppointment(data);
      alert("Đặt lịch thành công!");
      // Có thể reset form tại đây nếu muốn
    } catch (err) {
      alert("Có lỗi khi gửi thông tin!");
      console.error("Lỗi khi gửi thông tin:", err);
    }
  };
  const navigate = useNavigate();
  const options = [
    "Skyemec Hà Đông",
    "Skyemec Thanh Xuân",
    "Skyemec Cầu Giấy",
    "Skyemec Tuyên Quang",
    "Skyemec Tuyên Quang",
    "Skyemec Bắc Ninh",
  ];
  const khoa = [
    "Cấp cứu",
    "Trung tâm Tim mạch",
    "Chấn thương chỉnh hình - Y học thể thao",
    "Trung tâm Nhi",
    "Trung tâm Ung bướu",
    "Tiêu hóa - Gan mật",
    "Trung tâm Mắt Vinmec-Alina",
    "Trung tâm Thẩm mỹ Vinmec-View",
    "Miễn dịch - Dị ứng",
    "Trung tâm Công nghệ cao",
    " Trung tâm sức khỏe phụ nữ",
    "Sức khỏe tổng quát",
    "Viện nghiên cứu Tế bào gốc và Công nghệ Gen",
    "Trung tâm Vacxin",
    "Trung tâm Y Học Cổ Truyền Skyemec - Sao Phương Đông",
  ];

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const [agree, setAgree] = useState(false);
  const [formData, setFormData] = useState({
    gender: "",
  });

  const handleGenderChange = useCallback((e) => {
    setFormData((prevState) => ({
      ...prevState,
      gender: e.target.value,
    }));
  }, []);
  const [selectedDate, setSelectedDate] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false); // Ẩn Date Picker mặc định

  const handleSelectDate = (dayType) => {
    let today = new Date();
    let selected = new Date(today);

    if (dayType === "tomorrow") selected.setDate(today.getDate() + 1);
    if (dayType === "dayAfterTomorrow") selected.setDate(today.getDate() + 2);
    if (dayType === "custom") {
      setShowDatePicker(true); // Hiển thị Date Picker khi chọn "Ngày khác"
      return;
    }

    setShowDatePicker(false); // Ẩn Date Picker nếu chọn một ngày cụ thể
    setSelectedDate(selected);
    generateSchedule(selected);
  };

  const generateSchedule = (date) => {
    let schedule = [];
    let dayOfWeek = date.getDay();
    let now = new Date();
    let currentHour = now.getHours() + now.getMinutes() / 60; // Lấy giờ hiện tại

    if (dayOfWeek === 0) {
      setSchedule(["Chủ Nhật nghỉ làm"]);
      return;
    }

    let startTime = 8;
    let endTime = dayOfWeek === 6 ? 11.5 : 16.5; // Thứ 7 kết thúc lúc 11h30, ngày thường lúc 16h30

    for (let time = startTime; time <= endTime; time += 0.5) {
      let isPast =
        date.toDateString() === now.toDateString()
          ? time <= currentHour
          : false;
      schedule.push({
        time: `${Math.floor(time)}:${time % 1 === 0 ? "00" : "30"}`,
        isPast,
      });
    }

    setSchedule(schedule);
  };

  return (
    <div className="Bodysd-middle">
      <div className="Bodysd-navigation">
        <span className="Bodysd-home" onClick={() => navigate("/home")}>
          Trang chủ
          <FontAwesomeIcon icon={faAngleRight} />
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
                value={selectedHospital}
                onChange={(val) => {
                  // Nếu Dropdown1 trả về object, lấy .value hoặc .label, loại bỏ khoảng trắng
                  const v =
                    typeof val === "string"
                      ? val
                      : val?.value || val?.label || "";
                  setSelectedHospital(v.trim());
                }}
              />
            </div>
            <div className="Bodysd-oder-item">
              <label htmlFor="Oder-specialty" className="discription">
                Chuyên khoa
              </label>
              <Dropdown1
                id="Oder-specialty"
                options={khoa}
                label="Chọn chuyên khoa"
                value={selectedDepartment}
                onChange={(val) => {
                  const v =
                    typeof val === "string"
                      ? val
                      : val?.value || val?.label || "";
                  setSelectedDepartment(v.trim());
                }}
              />
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
              <div
                className={`Bodysd-oder-boxdate${
                  selectedDate &&
                  selectedDate.toDateString() === new Date().toDateString()
                    ? " selected-date"
                    : ""
                }`}
                onClick={() => handleSelectDate("today")}
              >
                <div>
                  <h3>{new Date().getDate()}</h3>
                  <label>
                    {
                      [
                        "Chủ Nhật",
                        "Thứ Hai",
                        "Thứ Ba",
                        "Thứ Tư",
                        "Thứ Năm",
                        "Thứ Sáu",
                        "Thứ Bảy",
                      ][new Date().getDay()]
                    }
                  </label>
                </div>
              </div>
              <div
                className={`Bodysd-oder-boxdate${
                  selectedDate &&
                  selectedDate.toDateString() ===
                    (() => {
                      let d = new Date();
                      d.setDate(d.getDate() + 1);
                      return d.toDateString();
                    })()
                    ? " selected-date"
                    : ""
                }`}
                onClick={() => handleSelectDate("tomorrow")}
              >
                <div>
                  <h3>{new Date().getDate() + 1}</h3>
                  <label>
                    {
                      [
                        "Chủ Nhật",
                        "Thứ Hai",
                        "Thứ Ba",
                        "Thứ Tư",
                        "Thứ Năm",
                        "Thứ Sáu",
                        "Thứ Bảy",
                      ][(new Date().getDay() + 1) % 7]
                    }
                  </label>
                </div>
              </div>
              <div
                className={`Bodysd-oder-boxdate${
                  selectedDate &&
                  selectedDate.toDateString() ===
                    (() => {
                      let d = new Date();
                      d.setDate(d.getDate() + 2);
                      return d.toDateString();
                    })()
                    ? " selected-date"
                    : ""
                }`}
                onClick={() => handleSelectDate("dayAfterTomorrow")}
              >
                <div>
                  <h3>{new Date().getDate() + 2}</h3>
                  <label>
                    {
                      [
                        "Chủ Nhật",
                        "Thứ Hai",
                        "Thứ Ba",
                        "Thứ Tư",
                        "Thứ Năm",
                        "Thứ Sáu",
                        "Thứ Bảy",
                      ][(new Date().getDay() + 2) % 7]
                    }
                  </label>
                </div>
              </div>
              <div
                className={`Bodysd-oder-boxdate${
                  selectedDate &&
                  (() => {
                    const today = new Date();
                    return (
                      selectedDate > today &&
                      selectedDate.toDateString() !== today.toDateString() &&
                      selectedDate.toDateString() !==
                        (() => {
                          let d = new Date();
                          d.setDate(d.getDate() + 1);
                          return d.toDateString();
                        })() &&
                      selectedDate.toDateString() !==
                        (() => {
                          let d = new Date();
                          d.setDate(d.getDate() + 2);
                          return d.toDateString();
                        })()
                    );
                  })()
                    ? " selected-date"
                    : ""
                }`}
                onClick={() => handleSelectDate("custom")}
                style={{ position: "relative" }}
              >
                <div>
                  <input
                    className="date-picker-container"
                    type="date"
                    min={new Date().toISOString().split("T")[0]} // Chỉ cho phép chọn ngày hiện tại trở đi
                    onChange={(e) => {
                      setSelectedDate(new Date(e.target.value));
                      generateSchedule(new Date(e.target.value));
                      setShowDatePicker(false); // Ẩn Date Picker sau khi chọn
                    }}
                    value={
                      selectedDate
                        ? selectedDate.toISOString().split("T")[0]
                        : ""
                    }
                  />
                  <br />
                  <label>Ngày khác</label>
                </div>
              </div>
            </div>

            {/* Hiển thị lịch làm việc */}
            {selectedDate && (
              <div
                className="schedule"
                style={{
                  zIndex: 20,
                  background: "#fff",
                  borderRadius: 8,
                  boxShadow: "0 2px 8px #0001",
                  padding: 16,
                  position: "relative",
                }}
              >
                <h4>Lịch làm việc ngày {selectedDate?.toLocaleDateString()}</h4>
                {/* Không cần chọn cơ sở khám và chuyên khoa để chọn khung giờ */}
                <ul>
                  {schedule.map((slot, index) => {
                    const canSelect = !slot.isPast;
                    const disabled = slot.isPast;
                    return (
                      <li
                        key={index}
                        className={`slot-item${
                          disabled
                            ? " disabled-slot"
                            : canSelect
                            ? " active-slot"
                            : ""
                        }${selectedSlot === slot.time ? " selected-slot" : ""}`}
                        onClick={() => {
                          if (canSelect) setSelectedSlot(slot.time);
                        }}
                        style={{
                          cursor: canSelect ? "pointer" : "not-allowed",
                        }}
                      >
                        {slot.time}
                      </li>
                    );
                  })}
                </ul>
                {selectedSlot && (
                  <div
                    style={{ marginTop: 8, color: "#51be9d", fontWeight: 500 }}
                  >
                    Đã chọn khung giờ: {selectedSlot}
                  </div>
                )}
              </div>
            )}
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
          <input
            type="checkbox"
            className="Bodysd-inp-agree"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />{" "}
          Tôi đã đọc và đồng ý với Chính sách bảo vệ dữ liệu cá nhân của Vinmec
          và chấp thuận để Vinmec xử lý dữ liệu cá nhân của tôi theo quy định
          của pháp luật về bảo vệ dữ liệu cá nhân.
          <br />
        </div>
        <button
          className="btn-supmit"
          onClick={handleSubmit}
          disabled={!agree}
          style={{
            opacity: agree ? 1 : 0.5,
            cursor: agree ? "pointer" : "not-allowed",
          }}
        >
          Gửi thông tin
        </button>
      </div>
    </div>
  );
};
export default Oder_doctor;
