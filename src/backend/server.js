// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";

// Import các routes quản lý tài khoản
=======
import Patients from "./routes/patientRoutes.js";
import drRoutes from "./routes/drRoutes.js";
import drScheRoutes from "./routes/drScheRoutes.js";
import drNews from "./routes/drNewsRoutes.js";
import MedRoutes from "./routes/drMedRoutes.js";
import userRoutes from "./routes/userRoutes.js";
>>>>>>> f93f5459a1b51b8fff91e3883a6acbf4ad4634b5
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

dotenv.config();

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
connectDB();

<<<<<<< HEAD
// Đăng ký các routes cho quản lý tài khoản
app.use("/login", loginRoutes);  // ==> POST /login
app.use("/api/users", getUserRoutes);
app.use("/api/create-account", createAccountRoutes);
app.use("/api", deleteAccountRoutes); // <-- phải khai báo cái này
app.use("/api", updateAccountRoutes);
app.use("/api/patients", Patients);
app.use("/api/doctors", drRoutes);
app.use("/api/appointment", userRoutes);
app.use("/schedule", drScheRoutes);
app.use("/api/news", drNews);
app.use("/api/medicines", MedRoutes);

// Đăng ký các routes
app.use("/api/login", loginRoutes); // Đăng ký login route
>>>>>>> f93f5459a1b51b8fff91e3883a6acbf4ad4634b5

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
