// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";

// Import routes
import loginRoutes from "./routes/loginRoutes.js";
import createAccountRoutes from "./routes/CreateAccountRoutes.js";
import deleteAccountRoutes from "./routes/DeleteAccountRoutes.js";
import updateAccountRoutes from "./routes/UpdateAccountRoutes.js";
import getUserRoutes from "./routes/GetUser.js";
import Patients from "./routes/patientRoutes.js";
import drRoutes from "./routes/drRoutes.js";
import drScheRoutes from "./routes/drScheRoutes.js";
import drNews from "./routes/drNewsRoutes.js";
import MedRoutes from "./routes/drMedRoutes.js";
//import userRoutes from "./routes/userRoutes.js"; // appointments

import reportRoutes from "./routes/GetreportsRoutes.js";
import newsRoutes from "./routes/NewsRoutes.js";
import DoctorListRoutes from "./routes/DoctorListRoutes.js";
import getAppointmentRoutes from "./routes/GetAppointmentRoutes.js";


dotenv.config();

if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.error(
    "Biến môi trường MONGO_URI hoặc JWT_SECRET chưa được thiết lập!"
  );
  process.exit(1);
}

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
connectDB();

// Đăng ký routes
app.use("/api/users", getUserRoutes);
app.use("/api/create-account", createAccountRoutes);
app.use("/api", deleteAccountRoutes);
app.use("/api", updateAccountRoutes);
app.use("/api/patients", Patients);
//app.use("/api/appointment", userRoutes);
app.use("/api/doctors", drRoutes);
app.use("/schedule", drScheRoutes);
app.use("/api/news", drNews);
app.use("/api/medicines", MedRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/doctor-list", DoctorListRoutes); // route mới tránh trùng
app.use("/login", loginRoutes); // Đăng ký login route
app.use("/api/appointments", getAppointmentRoutes);
app.use("/api/newss", newsRoutes); // Đăng ký route lấy tin tức



// Middleware xử lý lỗi
app.use((req, res, next) => {
  res.status(404).json({ message: "API endpoint không tồn tại" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Lỗi server nội bộ" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
