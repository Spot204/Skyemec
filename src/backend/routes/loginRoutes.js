import express from "express";
// import jwt from "jsonwebtoken";
import User from "../model/User.js";

const router = express.Router();

// Đăng nhập (login)
router.post("/dangnhap", async (req, res) => {
  const { username, password } = req.body;  // Lấy username và password từ body request

  // Kiểm tra dữ liệu đầu vào
  if (!username || !password) {
    return res.status(400).json({ message: "Username và mật khẩu không được để trống" });
  }

  try {
    // Tìm user trong database theo username
    const user = await User.findOne({ username });  // Tìm theo username

    if (!user) {
      return res.status(401).json({ message: "Không có tài khoản" });
    }

    // So sánh mật khẩu thuần
    if (user.password !== password) {
      return res.status(401).json({ message: "Mật khẩu không đúng" });
    }

    // Kiểm tra biến môi trường JWT_SECRET
    // if (!process.env.JWT_SECRET) {
    //   console.error("JWT_SECRET chưa được thiết lập trong biến môi trường!");
    //   return res.status(500).json({ message: "Lỗi server nội bộ: JWT_SECRET không có" });
    // }

    // // Tạo JWT token
    // const token = jwt.sign(
    //   { id: user._id, role: user.role, username: user.username },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1h" }  
    // );

    // const { password: pw, ...userWithoutPassword } = user._doc;
    // res.json({ token, user: userWithoutPassword });  // Gửi token và thông tin user (không có mật khẩu)
  } catch (err) {
    console.error("Lỗi khi xử lý đăng nhập:", err);
    res.status(500).json({ message: "Lỗi server nội bộ" });
  }
});

export default router;
