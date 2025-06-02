import mongoose from "mongoose";
import bcrypt from "bcrypt";

const drSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  schedules: [
    {
      month: Number,
      year: Number,
      day: Number,
      time: String,
      task: String,
    },
  ],
});

drSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const Dr = mongoose.model("Dr", drSchema);
export default Dr;
