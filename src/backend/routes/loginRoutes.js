import express from "express";
import bcrypt from "bcryptjs";
import User from "../model/AccountModel.js";

const router = express.Router();

// POST /login/dangnhap - Xử lý đăng nhập người dùng
router.post("/dangnhap", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username và mật khẩu không được để trống" });
    }

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    const user = await User.findOne({
      username: { $regex: new RegExp("^" + trimmedUsername + "$", "i") },
    });

    if (!user) {
      return res.status(401).json({ message: "Tài khoản không tồn tại" });
    }

    const isMatch = await bcrypt.compare(trimmedPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mật khẩu không đúng" });
    }

    const userObj = user.toObject();
    delete userObj.password;

    return res.json({
      message: "Đăng nhập thành công",
      user: userObj,
    });
  } catch (error) {
    console.error("Lỗi khi xử lý đăng nhập:", error);
    return res.status(500).json({ message: "Lỗi server nội bộ" });
  }
});

export default router;
