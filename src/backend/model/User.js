import mongoose from "mongoose";

const workScheduleSchema = new mongoose.Schema({
  day: String,
  start: String,
  end: String,
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "doctor"], required: true }, // ❌ loại bỏ "user"
  fullName: { type: String, required: true },
  phoneNumber: String,
  gender: String,
  dateOfBirth: Date,
  address: String,
  doctorInfo: {
    specialty: String,
    licenseNumber: String,
    workSchedule: [workScheduleSchema],
    department: String,
  },
  // ❌ Bỏ userInfo
});

const User = mongoose.model("Account", userSchema, "Account");
export default User;
