import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";

// Import các routes
import loginRoutes from "./routes/loginRoutes.js";

// Load biến môi trường
dotenv.config();

// Kiểm tra biến môi trường
if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.error("Biến môi trường MONGO_URI hoặc JWT_SECRET chưa được thiết lập!");
  process.exit(1); // Dừng server nếu không có các biến quan trọng
}

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json()); // Middleware parse JSON, cần nằm trước routes

// Kết nối MongoDB
connectDB();

// Đăng ký các routes
app.use("/login", loginRoutes); // Đăng ký login route

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
