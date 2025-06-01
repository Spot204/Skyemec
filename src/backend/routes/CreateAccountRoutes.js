import express from "express";
import bcrypt from "bcryptjs";
import User from "../model/User.js";

const router = express.Router();

// POST /api/create-account
router.post("/", async (req, res) => {
  const {
    username,
    password,
    fullName,
    phoneNumber,
    gender,
    dateOfBirth,
    address,
    role,
    doctorInfo,
    userInfo,
  } = req.body;

  try {
    // Kiểm tra username đã tồn tại chưa
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username đã tồn tại" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user mới
    const newUser = new User({
      username,
      password: hashedPassword,
      fullName,
      phoneNumber,
      gender,
      dateOfBirth,
      address,
      role,
      doctorInfo,
      userInfo,
    });

    // Lưu vào database
    await newUser.save();

    return res.status(201).json({
      message: "Tạo tài khoản thành công",
      user: newUser,
    });
  } catch (error) {
    console.error("Lỗi tạo tài khoản:", error);
    return res.status(500).json({
      message: "Lỗi khi tạo tài khoản",
      error: error.message,
    });
  }
});

export default router;
