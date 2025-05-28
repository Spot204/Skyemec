import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/connectDB.js";
import Patients from "./routes/patientRoutes.js";
import drRoutes from "./routes/drRoutes.js";
import DrSchedule from "./model/drSchedule.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/patients", Patients);
app.use("/api/doctors", drRoutes);

// mongoose.connect("mongodb://localhost:27017/Skyemec", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

connectDB();

app.get("/schedule", async (req, res) => {
  const { month, year, day } = req.query;
  const query = {};
  if (month) query.month = parseInt(month);
  if (year) query.year = parseInt(year);
  console.log("Query:", query);
  const data = await DrSchedule.find(query);
  res.json(data);
});

app.listen(5000, () => console.log("Server chạy trên cổng 5000"));
