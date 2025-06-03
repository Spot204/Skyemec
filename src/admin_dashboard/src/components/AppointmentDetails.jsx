import React from "react";
import "../styles/AppointmentDetails.css";

const AppointmentDetails = ({ appointment, onClose }) => {
  if (!appointment) return null;

  return (
    <div className="AppointmentDetails-container">
      <h3>Thông tin khách hàng</h3>
      <p><strong>Họ tên:</strong> {appointment.name || "—"}</p>
      <p><strong>Ngày sinh:</strong> {appointment.birthday || "—"}</p>
      <p><strong>Số điện thoại:</strong> {appointment.phone || "—"}</p>
      <p><strong>Email:</strong> {appointment.email || "—"}</p>
      {/* Nếu bạn có thêm trường note, service trong backend thì giữ, nếu không thì bỏ hoặc thay đổi */}
      {appointment.note && <p><strong>Ghi chú:</strong> {appointment.note}</p>}
      {appointment.service && <p><strong>Dịch vụ:</strong> {appointment.service}</p>}
      <p><strong>Cơ sở khám:</strong> {appointment.hospital || "—"}</p>
      <p><strong>Chuyên khoa:</strong> {appointment.department || "—"}</p>
      <p><strong>Bác sĩ:</strong> {appointment.doctor || "—"}</p>
      <p><strong>Ngày khám:</strong> {appointment.date || "—"}</p>
      <p><strong>Khung giờ:</strong> {appointment.slot || "—"}</p>
      <p><strong>Giới tính:</strong> {appointment.gender || "—"}</p>

      <button className="btn-close" onClick={onClose} type="button">
        Đóng
      </button>
    </div>
  );
};

export default AppointmentDetails;
