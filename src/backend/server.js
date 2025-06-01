// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";

// Import các routes quản lý tài khoản
import loginRoutes from "./routes/loginRoutes.js";
import createAccountRoutes from "./routes/CreateAccountRoutes.js";
import deleteAccountRoutes from "./routes/DeleteAccountRoutes.js";
import updateAccountRoutes from "./routes/UpdateAccountRoutes.js";
import getUserRoutes from "./routes/GetUser.js";

// Import các routes bác sĩ, bệnh nhân, lịch khám, thuốc
import Patients from "./routes/patientRoutes.js";
import drRoutes from "./routes/drRoutes.js";
import drScheRoutes from "./routes/drScheRoutes.js";
//import drNews from "./routes/drNewsRoutes.js";
import MedRoutes from "./routes/drMedRoutes.js";
import userRoutes from "./routes/userRoutes.js"; // appointments

// Load biến môi trường
dotenv.config();

// Kiểm tra biến môi trường
if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.error("Biến môi trường MONGO_URI hoặc JWT_SECRET chưa được thiết lập!");
  process.exit(1); // Dừng server nếu không có các biến quan trọng
}

const PORT = process.env.PORT || 5050;
const app = express();

// Sử dụng các middleware
app.use(cors());
app.use(express.json()); // Middleware để phân tích dữ liệu JSON từ body, cần nằm trước các routes

// Kết nối MongoDB
connectDB();

// Đăng ký các routes cho quản lý tài khoản
app.use("/login", loginRoutes);  // ==> POST /login
app.use("/api/users", getUserRoutes);
app.use("/api/create-account", createAccountRoutes);
app.use("/api", deleteAccountRoutes); // <-- phải khai báo cái này
app.use("/api", updateAccountRoutes);

// Đăng ký các routes cho bệnh nhân, bác sĩ, thuốc, lịch hẹn
app.use("/api/patients", Patients);
app.use("/api/doctor", drRoutes);
app.use("/api/appointment", userRoutes);
app.use("/schedule", drScheRoutes);
//app.use("/api/news", drNews);
app.use("/api/medicines", MedRoutes);

// Middleware xử lý lỗi 404
app.use((req, res, next) => {
  res.status(404).json({ message: "API endpoint không tồn tại" });
});

// Middleware xử lý lỗi chung
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Lỗi server nội bộ" });
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
