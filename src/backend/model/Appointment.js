import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  hospital: { type: String }, // Cơ sở khám
  department: { type: String }, // Chuyên khoa
  doctor: { type: String }, // Bác sĩ được chọn (bổ sung)
  date: { type: String }, // Ngày khám
  slot: { type: String }, // Khung giờ khám
  gender: { type: String }, // Giới tính
  name: { type: String }, // Họ tên
  phone: { type: String }, // Số điện thoại
  birthday: { type: String }, // Ngày sinh
  email: { type: String }, // Email
  reason: { type: String }, // Lý do khám
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);
export default Appointment;
