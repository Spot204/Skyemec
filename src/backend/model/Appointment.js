import mongoose from "mongoose";

const RelativeSchema = new mongoose.Schema({
  name: String,
  phone: String,
  relation: String,
  address: String,
});

const AppointmentSchema = new mongoose.Schema(
  {
    hospital: { type: String }, // Cơ sở khám
    department: { type: String }, // Chuyên khoa
    doctor: { type: String }, // Bác sĩ được chọn
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    date: { type: String }, // Ngày khám
    slot: { type: String }, // Khung giờ khám
    gender: { type: String }, // Giới tính
    name: { type: String }, // Họ tên
    phone: { type: String }, // Số điện thoại
    birthday: { type: String }, // Ngày sinh
    email: { type: String }, // Email
    reason: { type: String }, // Lý do khám
    birthDate: String,
    idNumber: String,
    ethnicity: String,
    address: String,
    insuranceNumber: String,
    examinationDate: { type: date }, // Sử dụng kiểu Date thay vì String
    registeredHospital: String,
    job: String,
    relatives: [RelativeSchema],
    medicalHistory: [String],
    examinationReasons: [String],
    treatmentPlan: [String],
    currentStatus: [String],
    tests: [String],
    diary: [String],
  },
  { collection: "Appointments" }
);

const Appointment = mongoose.model("Appointment", AppointmentSchema);
export default Appointment;
