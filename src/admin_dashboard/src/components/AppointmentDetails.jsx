import React from "react";
import "../styles/AppointmentDetails.css";

const AppointmentDetails = ({ appointment, onClose }) => {
  if (!appointment) return null;

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    if (isNaN(d)) return "—";
    return d.toLocaleDateString("vi-VN");
  };

  // Map fallback nếu backend chưa map, cho linh hoạt
  const hospital = appointment.hospital || appointment.registeredHospital || "—";
  const birthday = appointment.birthday || appointment.birthDate;
  const date = appointment.date || appointment.examinationDate;

  return (
    <div className="AppointmentDetails-container">
      <h3>Thông tin khách hàng</h3>
      <p><strong>Họ tên:</strong> {appointment.name || "—"}</p>
      <p><strong>Ngày sinh:</strong> {formatDate(birthday)}</p>
      <p><strong>Số điện thoại:</strong> {appointment.phone || "—"}</p>
      <p><strong>Email:</strong> {appointment.email || "—"}</p>
      {appointment.note && <p><strong>Ghi chú:</strong> {appointment.note}</p>}
      {appointment.service && <p><strong>Dịch vụ:</strong> {appointment.service}</p>}
      <p><strong>Cơ sở khám:</strong> {hospital}</p>
      <p><strong>Chuyên khoa:</strong> {appointment.department || "—"}</p>
      <p><strong>Bác sĩ:</strong> {appointment.doctor || "—"}</p>
      <p><strong>Ngày khám:</strong> {formatDate(date)}</p>
      <p><strong>Khung giờ:</strong> {appointment.slot || "—"}</p>
      <p><strong>Giới tính:</strong> {appointment.gender || "—"}</p>

      <button className="btn-close" onClick={onClose} type="button">
        Đóng
      </button>
    </div>
  );
};

export default AppointmentDetails;
