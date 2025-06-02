import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "doctor"], required: true },
  fullName: { type: String, required: true },
  phoneNumber: { type: String },
  gender: { type: String },
  dateOfBirth: { type: Date },
  address: { type: String },
  // Lịch trình cho bác sĩ
  schedules: [
    {
      month: Number,
      year: Number,
      day: Number,
      time: String,
      task: String,
    },
  ],
  // Thông tin riêng cho bác sĩ
  doctorInfo: {
    specialty: { type: String },
    licenseNumber: { type: String },
    department: { type: String },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("Account", userSchema, "Account");
export default User;
