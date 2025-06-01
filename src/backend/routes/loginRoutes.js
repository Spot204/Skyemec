import express from "express";
// import jwt from "jsonwebtoken";
import User from "../model/User.js"; // Import model User

const router = express.Router();

// Đăng nhập (login)
router.post("/dangnhap", async (req, res) => {
  const { username, password } = req.body; // Lấy username và password từ body request

  // Kiểm tra dữ liệu đầu vào
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username và mật khẩu không được để trống" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Không có tài khoản" });
    }

    // So sánh mật khẩu thuần
    if (user.password !== password) {
      return res.status(401).json({ message: "Mật khẩu không đúng" });
    }

    res.json({ message: "Đăng nhập thành công", user });
  } catch (err) {
    console.error("Lỗi khi xử lý đăng nhập:", err);
    res.status(500).json({ message: "Lỗi server nội bộ" });
  }
});

export default router;
