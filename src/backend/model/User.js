import mongoose from "mongoose";

const workScheduleSchema = new mongoose.Schema({
  day: String, // Thay đổi từ [Object] thành schema cụ thể nếu cần
  start: String,
  end: String,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String, // 'admin', 'doctor', 'user'
  fullName: String,
  phoneNumber: String,
  gender: String,
  dateOfBirth: Date,
  address: String,
  doctorInfo: {
    specialty: String,
    licenseNumber: String,
    workSchedule: [workScheduleSchema], // Sử dụng schema thay vì [Object]
    department: String,
  },
  userInfo: {
    medicalHistory: String,
    insuranceInfo: String,
  },
});

const User = mongoose.model("Account", userSchema,"Account");

export default User;