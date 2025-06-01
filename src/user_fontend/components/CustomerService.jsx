import "../styles/CustomerService.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Dropdown1 from "./Dropdown1";
import { useState } from "react";
import { createReport } from "../services/Oder_doctor";

const options = [
  "Skyemec Hà Đông",
  "Skyemec Thanh Xuân",
  "Skyemec Cầu Giấy",
  "Skyemec Tuyên Quang",
  "Skyemec Hà Tĩnh",
  "Skyemec Bắc Ninh",
];
const services = [
  "Tư vấn thông tin",
  "Hỗ trợ - Giấy tờ",
  "Hỗ trợ - Thủ tục",
  "Khiếu nại - Phản ánh",
  "Khác",
];

const CustomerService = () => {
  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pid, setPid] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate bắt buộc nhập
    if (!name.trim() || !birthday.trim() || !phone.trim() || !email.trim() || !selectedHospital.trim() || !selectedService.trim() || !note.trim()) {
      alert("Vui lòng nhập đầy đủ tất cả các trường bắt buộc!");
      return;
    }
    // Validate số điện thoại
    const phoneRegex = /^\d{9,11}$/;
    if (!phoneRegex.test(phone)) {
      alert("Số điện thoại phải là số và có độ dài từ 9 đến 11 ký tự!");
      return;
    }
    // Validate email
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      alert("Email không đúng định dạng!");
      return;
    }
    // Nếu hợp lệ, gửi dữ liệu lên backend
    const data = {
      name,
      birthday,
      phone,
      email,
      pid,
      hospital: selectedHospital,
      service: selectedService,
      note,
    };
    try {
      await createReport(data);
      alert("Gửi yêu cầu thành công!");
      setName(""); setBirthday(""); setPhone(""); setEmail(""); setPid(""); setSelectedHospital(""); setSelectedService(""); setNote("");
    } catch (err) {
      alert("Có lỗi khi gửi yêu cầu!");
      console.log("Lỗi khi gửi yêu cầu:", err?.response?.data || err);
    }
  };

  return (
    <div className="CS-container">
      <div className="Bodysd-navigation">
        <span className="Bodysd-home" onClick={() => navigate("/user/home")}> 
          Trang chủ <FontAwesomeIcon icon={faAngleRight} />
        </span>
        <span className="Bodysd-search-doctor">chắm sóc khác hàng</span>
      </div>
      <form className="CS-middle-container" onSubmit={handleSubmit}>
        <p className="CS-p-text">Họ và tên</p>
        <input type="text" className="CS-ipt-item" placeholder="Họ và tên" value={name} onChange={e => setName(e.target.value)} />
        <p className="CS-p-text">Ngày tháng năm sinh</p>
        <input
          type="date"
          className="CS-ipt-item"
          placeholder="Ngày tháng năm sinh"
          value={birthday}
          onChange={e => setBirthday(e.target.value)}
        />
        <p className="CS-p-text">Số điện thoại</p>
        <input
          type="text"
          className="CS-ipt-item"
          placeholder="Số điện thoại"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <p className="CS-p-text">Email</p>
        <input type="text" className="CS-ipt-item" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <p className="CS-p-text">PID</p>
        <input type="text" className="CS-ipt-item" placeholder="PID nếu có" value={pid} onChange={e => setPid(e.target.value)} />
        <p className="CS-p-text">Bệnh viện/ phòng khám Skyemec</p>
        <Dropdown1
          id="Oder-local"
          options={options}
          label="Chọn cơ sở khám"
          value={selectedHospital}
          onChange={(val) => {
            const v = typeof val === "string" ? val : val?.value || val?.label || "";
            setSelectedHospital(v.trim());
          }}
        />
        <p className="CS-p-text">Vấn đề cần hỗ trợ</p>
        <Dropdown1
          id="Oder-local"
          options={services}
          label="Vân đề cần hỗ trợ"
          value={selectedService}
          onChange={(val) => {
            const v = typeof val === "string" ? val : val?.value || val?.label || "";
            setSelectedService(v.trim());
          }}
        />
        <p className="CS-p-text">Chi tiết yêu cầu của bạn</p>
        <textarea
          id="CS-Note"
          placeholder="Ví dụ bấn đề về thủ tục làm việc"
          value={note}
          onChange={e => setNote(e.target.value)}
        ></textarea>
        <div className="CS-button-container">
          <button className="CS-button" type="submit">Gửi yêu cầu</button>
        </div>
      </form>
    </div>
  );
};

export default CustomerService;
