import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  location: { type: String, required: true },
  specialty: { type: String, required: true },
  doctorname: { type: String, required: true },
  date: { type: Date, required: true },
  username: { type: String, required: true },
  sex: { type: String, enum: ["Nam", "Nữ"] },
  phonenumber: { type: String, required: true },
  dateofbirth: { type: Date, required: true },
});

const User = mongoose.model("User", UserSchema);
export default User;
