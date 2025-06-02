import React from "react";
import "../styles/AppointmentDetails.css";

const AppointmentDetails = ({ appointment, onClose }) => {
  if (!appointment) return null;

  return (
    <div className="AppointmentDetails-container">
      <h3>Thông tin khách hàng</h3>
      <p>
        <strong>Họ tên:</strong> {appointment.name}
      </p>
      <p>
        <strong>Ngày sinh:</strong> {appointment.birthday || "—"}
      </p>
      <p>
        <strong>Số điện thoại:</strong> {appointment.phone}
      </p>
      <p>
        <strong>Email:</strong> {appointment.email || "—"}
      </p>
      <p>
        <strong>Chi tiết yêu cầu:</strong> {appointment.note || "—"}
      </p>
      <p>
        <strong>Dịch vụ:</strong> {appointment.service || "—"}
      </p>
      <p>
        <strong>Cơ sở khám:</strong> {appointment.hospital || "—"}
      </p>

      <button className="btn-close" onClick={onClose}>
        Đóng
      </button>
    </div>
  );
};

export default AppointmentDetails;
