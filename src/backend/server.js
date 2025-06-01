import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import Patients from "./routes/patientRoutes.js";
import drRoutes from "./routes/drRoutes.js";
import drScheRoutes from "./routes/drScheRoutes.js";
import drNews from "./routes/drNewsRoutes.js";
import MedRoutes from "./routes/drMedRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";

dotenv.config();

// Kiểm tra biến môi trường
if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.error(
    "Biến môi trường MONGO_URI hoặc JWT_SECRET chưa được thiết lập!"
  );
  process.exit(1); // Dừng server nếu không có các biến quan trọng
}

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.json()); // Middleware parse JSON, cần nằm trước routes
// app.use(bodyParser.json()); // Middleware parse JSON body
// Kết nối MongoDB

connectDB();

app.use("/api/patients", Patients);
app.use("/api/doctors", drRoutes);
app.use("/api/appointment", userRoutes);
app.use("/schedule", drScheRoutes);
app.use("/api/news", drNews);
app.use("/api/medicines", MedRoutes);

// Đăng ký các routes
app.use("/api/login", loginRoutes); // Đăng ký login route

app.use("/api/patients", Patients); // Đăng ký routes cho bệnh nhân
app.use("/api/doctor", drRoutes); // Đăng ký routes cho bác sĩ
app.use("/api/doctor-schedules", drScheRoutes); // Đăng ký routes cho lịch bác sĩ
app.use("/api/appointment", userRoutes);

// // Middleware xử lý lỗi 404
// app.use((req, res, next) => {
//   res.status(404).json({ message: "API endpoint không tồn tại" });
// });

// // Middleware xử lý lỗi chung
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: "Lỗi server nội bộ" });
// });

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
