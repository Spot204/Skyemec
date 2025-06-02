import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  day: Number,
  time: String,
  task: String,
  month: Number,
  year: Number,
});

const Schedule = mongoose.model("Schedule", scheduleSchema, "DrSchedule");

export default Schedule;
