import mongoose from "mongoose";

// Schema cho lịch làm việc của bác sĩ
const workScheduleSchema = new mongoose.Schema({
  day: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
});

// Schema chính cho tài khoản
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "doctor"], required: true }, // Không có role "user"
  fullName: { type: String, required: true },
  phoneNumber: { type: String },
  gender: { type: String },
  dateOfBirth: { type: Date },
  address: { type: String },

  // Thông tin riêng cho bác sĩ
  doctorInfo: {
    specialty: { type: String },
    licenseNumber: { type: String },
    workSchedule: [workScheduleSchema], // Mảng các buổi làm việc
    department: { type: String },
  },
});

// Khai báo model với collection tên "Account"
const User = mongoose.model("Account", userSchema, "Account");

export default User;
