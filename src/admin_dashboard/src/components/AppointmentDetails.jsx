import React from "react";
import "../styles/AppointmentDetails.css";

const AppointmentDetails = ({ appointment, onClose }) => {
  if (!appointment) return null;

  return (
    <div className="AppointmentDetails-container">
      <h3>Thông tin khách hàng</h3>
      <p>
        <strong>Bệnh nhân:</strong> {appointment.patientName}
      </p>
      <p>
        <strong>Thời gian hẹn:</strong> {appointment.time}
      </p>
      <p>
        <strong>Số điện thoại:</strong> {appointment.phone}
      </p>
      <p>
        <strong>Email:</strong> {appointment.email}
      </p>
      <p>
        <strong>Ghi chú:</strong> {appointment.notes}
      </p>
      <button className="btn-close" onClick={onClose}>
        Đóng
      </button>
    </div>
  );
};

export default AppointmentDetails;
