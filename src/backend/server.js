import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./config/connectDB.js";
// import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Skyemec", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connectDB();

const scheduleSchema = new mongoose.Schema({
  month: Number,
  year: Number,
  day: String,
  task: String,
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

app.get("/schedule", async (req, res) => {
  const { month, year } = req.query;
  const data = await Schedule.find({
    month: parseInt(month),
    year: parseInt(year),
  });
  res.json(data);
});

app.listen(5000, () => console.log("Server chạy trên cổng 5000"));
