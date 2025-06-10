import express from "express";
import bcrypt from "bcryptjs";
import User from "../model/AccountModel.js";

const router = express.Router();

// POST /api/create-account
router.post("/", async (req, res) => {
  const {
    username,
    password,
    fullName,
    phoneNumber = "",
    gender = "",
    dateOfBirth,
    address = "",
    role,
    doctorInfo = {},
  } = req.body;

  // Validate required fields
  if (!username || !password || !fullName || !role) {
    return res.status(400).json({ message: "Thiếu trường bắt buộc" });
  }

  try {
    // Kiểm tra username đã tồn tại chưa
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username đã tồn tại" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Chuyển dateOfBirth về Date nếu có
    const dob = dateOfBirth ? new Date(dateOfBirth) : null;

    const newUser = new User({
      username,
      password: hashedPassword,
      fullName,
      phoneNumber,
      gender,
      dateOfBirth: dob,
      address,
      role,
      doctorInfo,
    });

    await newUser.save();

    // Không trả về password
    const userToReturn = newUser.toObject();
    delete userToReturn.password;

    return res.status(201).json({
      message: "Tạo tài khoản thành công",
      user: userToReturn,
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
