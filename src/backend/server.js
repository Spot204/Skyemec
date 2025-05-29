import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/connectDB.js";
import Patients from "./routes/patientRoutes.js";
import drRoutes from "./routes/drRoutes.js";
import DrSchedule from "./model/drSchedule.js";

import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5050;

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/patients", Patients);
app.use("/api/doctors", drRoutes);
app.use("/api/appointment", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

console.log("Lỗi khi gửi thông tin:", err?.response?.data || err);
