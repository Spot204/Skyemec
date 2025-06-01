import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/User.js";

const router = express.Router();

router.post("/dangnhap", async (req, res) => {
  const { username, password } = req.body;

  // Kiểm tra đầu vào
  if (!username || !password) {
    return res.status(400).json({ message: "Username và mật khẩu không được để trống" });
  }

  try {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    // Tìm người dùng theo username (không phân biệt chữ hoa/thường)
    const user = await User.findOne({
      username: { $regex: new RegExp("^" + trimmedUsername + "$", "i") },
    });

    if (!user) {
      return res.status(401).json({ message: "Tài khoản không tồn tại" });
    }

    // So sánh mật khẩu với hash trong DB
    const isMatch = await bcrypt.compare(trimmedPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mật khẩu không đúng" });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Trả về user info (ẩn password)
    const { password: pw, ...userWithoutPassword } = user._doc;
    res.json({ token, user: userWithoutPassword });

  } catch (err) {
    console.error("Lỗi khi xử lý đăng nhập:", err);
    res.status(500).json({ message: "Lỗi server nội bộ" });
  }
});

export default router;
