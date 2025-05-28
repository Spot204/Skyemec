import mongoose from "mongoose";

const UserShema = new mongoose.Schema({
  location: { type: String, require: true },
  specialty: { type: String, require: true },
  doctorname: { type: String, require: true },
  date: { type: Date, require: true },
  username: { type: String, require: true },
  sex: { type: String, enum: ["Nam", "Nữ"] },
  phonenumber: { type: String, require: true },
  dateofbrith: { type: Date, require: true },
});

const User = mongoose.model("User", UserShema);
export default User;
